import 'server-only'

import { admin, db } from '@/lib/firebase'

type LifecycleEventName = 'qualify_lead' | 'close_convert_lead'

type TrackLifecycleOptions = {
  requestId?: string
  eventName: LifecycleEventName
  quoteId?: string
  value?: number
}

const measurementId = process.env.GA4_MEASUREMENT_ID || 'G-8XBX4X0R4Y'
const apiSecret = process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET || ''

export async function trackLeadLifecycleEvent(options: TrackLifecycleOptions) {
  if (!db || !options.requestId || !apiSecret) {
    if (!apiSecret) console.warn('GA4 Measurement Protocol secret is not configured; lifecycle event skipped.')
    return false
  }

  const requestRef = db.collection('requests').doc(options.requestId)
  const markerPath = `analyticsEvents.${options.eventName}`
  const eventId = `${options.eventName}_${options.requestId}_${options.quoteId || 'request'}`

  const attribution = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(requestRef)
    if (!snapshot.exists) return null
    const data = snapshot.data() || {}
    if (data.analyticsEvents?.[options.eventName]?.status === 'sent' || data.analyticsEvents?.[options.eventName]?.status === 'sending') {
      return null
    }

    const analyticsAttribution = data.analyticsAttribution || {}
    if (!analyticsAttribution.clientId) return null

    transaction.update(requestRef, {
      [markerPath]: {
        status: 'sending',
        eventId,
        updatedAt: admin.firestore.Timestamp.now(),
      },
    })
    return analyticsAttribution as { clientId: string; sessionId?: string; gclid?: string }
  })

  if (!attribution) return false

  const params: Record<string, string | number> = {
    engagement_time_msec: 1,
    event_id: eventId,
    request_id: options.requestId,
  }
  if (attribution.sessionId) params.session_id = attribution.sessionId
  if (attribution.gclid) params.gclid = attribution.gclid
  if (options.quoteId) params.quote_id = options.quoteId
  if (typeof options.value === 'number' && Number.isFinite(options.value)) {
    params.value = options.value
    params.currency = 'EUR'
  }

  try {
    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: attribution.clientId,
          events: [{ name: options.eventName, params }],
        }),
      }
    )

    if (!response.ok) throw new Error(`GA4 Measurement Protocol returned ${response.status}`)

    await requestRef.update({
      [markerPath]: {
        status: 'sent',
        eventId,
        sentAt: admin.firestore.Timestamp.now(),
      },
    })
    return true
  } catch (error) {
    await requestRef.update({ [markerPath]: admin.firestore.FieldValue.delete() }).catch(() => undefined)
    console.error(`Failed to send ${options.eventName} to GA4:`, error)
    return false
  }
}
