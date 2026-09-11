"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type LeadTrackingParams = {
  formName: string
}

export type LeadAttribution = {
  clientId?: string
  sessionId?: string
  gclid?: string
  source?: string
  medium?: string
  campaign?: string
  landingPage?: string
}

const PENDING_LEAD_KEY = "analytics:pending-generate-lead"
export const GOOGLE_ANALYTICS_READY_EVENT = "google-analytics-ready"
const ATTRIBUTION_KEY = "analytics:lead-attribution"

export function captureLeadAttribution() {
  if (typeof window === "undefined") return

  const params = new URLSearchParams(window.location.search)
  const previous = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}") as LeadAttribution
  const attribution: LeadAttribution = {
    ...previous,
    gclid: params.get("gclid") || previous.gclid,
    source: params.get("utm_source") || previous.source,
    medium: params.get("utm_medium") || previous.medium,
    campaign: params.get("utm_campaign") || previous.campaign,
    landingPage: previous.landingPage || window.location.href,
  }

  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
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

    window.gtag("get", "G-8XBX4X0R4Y", field, finish)
    window.setTimeout(() => finish(), 800)
  })
}

export async function getLeadAttribution(): Promise<LeadAttribution> {
  if (typeof window === "undefined") return {}

  captureLeadAttribution()
  const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}") as LeadAttribution
  const [clientId, sessionId] = await Promise.all([
    getGoogleAnalyticsField("client_id"),
    getGoogleAnalyticsField("session_id"),
  ])

  const attribution = { ...stored, clientId, sessionId }
  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution))
  return attribution
}

export function trackGenerateLead({ formName }: LeadTrackingParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false

  window.gtag("event", "generate_lead", {
    form_name: formName,
    transport_type: "beacon",
  })

  return true
}

export function markGenerateLeadPending({ formName }: LeadTrackingParams) {
  if (typeof window === "undefined") return

  sessionStorage.setItem(PENDING_LEAD_KEY, formName)
}

export function flushPendingGenerateLead() {
  if (typeof window === "undefined") return false

  const formName = sessionStorage.getItem(PENDING_LEAD_KEY)
  if (!formName) return false

  const sent = trackGenerateLead({ formName })
  if (sent) {
    sessionStorage.removeItem(PENDING_LEAD_KEY)
  }

  return sent
}
