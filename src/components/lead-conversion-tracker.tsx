"use client"

import { useEffect } from "react"

import {
  flushPendingGenerateLead,
  GOOGLE_ANALYTICS_READY_EVENT,
} from "@/lib/analytics"

export function LeadConversionTracker() {
  useEffect(() => {
    const flush = () => {
      flushPendingGenerateLead()
    }

    flush()
    window.addEventListener(GOOGLE_ANALYTICS_READY_EVENT, flush)

    return () => {
      window.removeEventListener(GOOGLE_ANALYTICS_READY_EVENT, flush)
    }
  }, [])

  return null
}
