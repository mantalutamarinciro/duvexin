"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type LeadTrackingParams = {
  formName: string
}

const PENDING_LEAD_KEY = "analytics:pending-generate-lead"
export const GOOGLE_ANALYTICS_READY_EVENT = "google-analytics-ready"

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
