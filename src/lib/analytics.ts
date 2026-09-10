"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type LeadTrackingParams = {
  formName: string
}

export function trackGenerateLead({ formName }: LeadTrackingParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return

  window.gtag("event", "generate_lead", {
    form_name: formName,
    transport_type: "beacon",
  })
}
