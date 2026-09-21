"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type LeadTrackingParams = {
  formName: string
  requestId: string
}

export type LeadAttribution = {
  clientId?: string
  sessionId?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
  source?: string
  medium?: string
  campaign?: string
  landingPage?: string
  referrerHost?: string
}

const PENDING_LEAD_KEY = "analytics:pending-generate-lead"
export const GOOGLE_ANALYTICS_READY_EVENT = "google-analytics-ready"
const ATTRIBUTION_KEY = "analytics:lead-attribution"

// Analytics must remain optional, including when browser storage is blocked.
export function hasAnalyticsConsent() {
  try {
    return typeof window !== "undefined" && window.localStorage.getItem("cookie-consent") === "accepted"
  } catch {
    return false
  }
}

function readAttribution(): LeadAttribution {
  try {
    const value = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || "{}")
    if (!value || typeof value !== "object" || Array.isArray(value)) return {}
    const result: LeadAttribution = {}
    const limits = { clientId: 100, sessionId: 100, gclid: 500, gbraid: 500, wbraid: 500, source: 200, medium: 200, campaign: 300, landingPage: 2000, referrerHost: 253 }
    for (const key of Object.keys(limits) as (keyof LeadAttribution)[]) {
      if (typeof value[key] === "string" && value[key].length <= limits[key] &&
          (key !== "referrerHost" || /^[a-z0-9.-]+$/.test(value[key]))) result[key] = value[key]
    }
    // Keep only the page path, not arbitrary query parameters or fragments.
    if (result.landingPage) {
      const url = new URL(result.landingPage)
      result.landingPage = url.origin === window.location.origin ? url.origin + url.pathname : undefined
    }
    return result
  } catch {
    return {}
  }
}

function storeAttribution(value: LeadAttribution) {
  try { window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value)) } catch { /* optional */ }
}

export function captureLeadAttribution() {
  if (!hasAnalyticsConsent()) return

  try {
    const params = new URLSearchParams(window.location.search)
    const previous = readAttribution()
    const attribution: LeadAttribution = {
      ...previous,
      gclid: params.get("gclid")?.slice(0, 500) || previous.gclid,
      gbraid: params.get("gbraid")?.slice(0, 500) || previous.gbraid,
      wbraid: params.get("wbraid")?.slice(0, 500) || previous.wbraid,
      source: params.get("utm_source")?.slice(0, 200) || previous.source,
      medium: params.get("utm_medium")?.slice(0, 200) || previous.medium,
      campaign: params.get("utm_campaign")?.slice(0, 300) || previous.campaign,
      landingPage: previous.landingPage || window.location.origin + window.location.pathname,
      referrerHost: previous.referrerHost,
    }

    if (!attribution.referrerHost && document.referrer) {
      try {
        const referrer = new URL(document.referrer)
        const host = referrer.hostname.toLowerCase()
        const siteHost = window.location.hostname.toLowerCase().replace(/^www\./, "")
        if ((referrer.protocol === "https:" || referrer.protocol === "http:") &&
            host.replace(/^www\./, "") !== siteHost && host.length <= 253 &&
            /^[a-z0-9.-]+$/.test(host)) attribution.referrerHost = host
      } catch { /* A malformed referrer must not discard valid campaign markers. */ }
    }

    storeAttribution(attribution)
  } catch { /* Attribution must never block a quote request. */ }
}

function getGoogleAnalyticsField(field: "client_id" | "session_id") {
  return new Promise<string | undefined>((resolve) => {
    if (typeof window.gtag !== "function") return resolve(undefined)

    let settled = false
    const finish = (value?: unknown) => {
      if (settled) return
      settled = true
      resolve(typeof value === "string" || typeof value === "number" ? String(value) : undefined)
    }

    window.setTimeout(() => finish(), 800)
    try { window.gtag("get", "G-8XBX4X0R4Y", field, finish) } catch { finish() }
  })
}

export async function getLeadAttribution(): Promise<LeadAttribution> {
  if (!hasAnalyticsConsent()) return {}

  try {
    captureLeadAttribution()
    const stored = readAttribution()
    const [clientId, sessionId] = await Promise.all([
      getGoogleAnalyticsField("client_id"),
      getGoogleAnalyticsField("session_id"),
    ])

    if (!hasAnalyticsConsent()) return {}
    const attribution = { ...stored, clientId: clientId?.slice(0, 100), sessionId: sessionId?.slice(0, 100) }
    storeAttribution(attribution)
    return attribution
  } catch { return {} }
}

function trackGenerateLead({ formName, requestId }: LeadTrackingParams) {
  if (!hasAnalyticsConsent() || typeof window.gtag !== "function") return false

  try {
    window.gtag("event", "generate_lead", {
      form_name: formName,
      request_id: requestId,
      transport_type: "beacon",
    })

    return true
  } catch { return false }
}

type PendingLead = LeadTrackingParams & { createdAt: number }
let pendingLead: PendingLead | null = null
const emittedRequests = new Set<string>()
const PENDING_MAX_AGE = 30 * 60 * 1000

export function markGenerateLeadPending({ formName, requestId }: LeadTrackingParams) {
  if (!hasAnalyticsConsent() || !requestId || emittedRequests.has(requestId)) return
  pendingLead = { formName, requestId, createdAt: Date.now() }
  try { window.sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(pendingLead)) } catch { /* SPA memory fallback */ }
}

export function flushPendingGenerateLead() {
  if (typeof window === "undefined") return false

  let candidate: unknown = pendingLead
  if (!candidate) {
    try { candidate = JSON.parse(window.sessionStorage.getItem(PENDING_LEAD_KEY) || "null") } catch { /* invalid or blocked */ }
  }
  const clear = () => {
    pendingLead = null
    try { window.sessionStorage.removeItem(PENDING_LEAD_KEY) } catch { /* optional */ }
  }
  if (!hasAnalyticsConsent()) { clear(); return false }
  const lead = candidate as Partial<PendingLead> | null
  if (!lead || typeof lead.formName !== "string" || typeof lead.requestId !== "string" ||
      !lead.requestId || lead.requestId.length > 100 || typeof lead.createdAt !== "number" ||
      !Number.isFinite(lead.createdAt) || Date.now() - lead.createdAt < 0 || Date.now() - lead.createdAt > PENDING_MAX_AGE) {
    clear()
    return false
  }
  if (emittedRequests.has(lead.requestId)) { clear(); return false }
  if (typeof window.gtag !== "function") return false

  // Consume before dispatch so repeated effects cannot emit the same pending lead.
  try {
    window.sessionStorage.removeItem(PENDING_LEAD_KEY)
  } catch {
    // A persisted marker that cannot be removed could replay after a reload.
    // Only use the memory fallback if storage cannot be read either.
    try { if (window.sessionStorage.getItem(PENDING_LEAD_KEY)) return false } catch { /* memory only */ }
  }
  pendingLead = null
  emittedRequests.add(lead.requestId)
  return trackGenerateLead(lead as PendingLead)
}
