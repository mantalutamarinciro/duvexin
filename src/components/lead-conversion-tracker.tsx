"use client"

import { useEffect } from "react"

import {
  flushPendingGenerateLead,
  GOOGLE_ANALYTICS_READY_EVENT,
  markGenerateLeadPending,
} from "@/lib/analytics"

export function LeadConversionTracker() {
  useEffect(() => {
    const isConfirmedSubmission = new URLSearchParams(window.location.search).get("lead") === "submitted"

    if (isConfirmedSubmission) {
      markGenerateLeadPending({ formName: "public_quote_request" })
    }

    const flush = () => {
      const sent = flushPendingGenerateLead()

      if (sent && isConfirmedSubmission) {
        window.history.replaceState(null, "", "/remerciements")
      }
    }

    flush()
    window.addEventListener(GOOGLE_ANALYTICS_READY_EVENT, flush)

    return () => {
      window.removeEventListener(GOOGLE_ANALYTICS_READY_EVENT, flush)
    }
  }, [])

  return null
}
