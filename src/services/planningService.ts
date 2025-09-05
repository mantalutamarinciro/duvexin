
'use server';

import { db } from '@/lib/firebase';
import type { Quote } from './quoteService';
import type { Booking } from './bookingService';
import type { Visit } from './visitService';


export interface PlanningEvent {
    id: string;
    title: string;
    date: string; // ISO String
    type: 'move' | 'commercial';
    details?: string;
}

export async function getPlanningData(): Promise<PlanningEvent[]> {
    try {
        const bookingsPromise = db.collection('bookings')
            .where('status', 'in', ['Programmé', 'En cours'])
            .get();
            
        // Let's keep quotes on the planning for now, but visits are more important
        const quotesPromise = db.collection('quotes')
            .where('status', '==', 'pending')
            .get();

        const visitsPromise = db.collection('visits')
            .where('status', '==', 'Prévue')
            .get();

        const [bookingsSnapshot, quotesSnapshot, visitsSnapshot] = await Promise.all([bookingsPromise, quotesPromise, visitsPromise]);

        const moveEvents: PlanningEvent[] = bookingsSnapshot.docs.map(doc => {
            const data = doc.data() as Booking;
            return {
                id: `move-${doc.id}`,
                title: `${data.clientName} (${data.volume || '?'}m³)`,
                date: (data.moveDate as any).toDate().toISOString(),
                type: 'move'
            };
        });

        // We can phase out quotes from calendar later if visits replace them
        const quoteEvents: PlanningEvent[] = quotesSnapshot.docs.map(doc => {
            const data = doc.data() as Quote;
            return {
                id: `comm-${doc.id}`,
                title: `Devis ${data.clientName}`,
                date: (data.moveDate as any).toDate().toISOString(),
                type: 'commercial'
            };
        });

        const visitEvents: PlanningEvent[] = visitsSnapshot.docs.map(doc => {
            const data = doc.data() as Visit;
            return {
                id: `visit-${doc.id}`,
                title: `Visite ${data.clientName}`,
                date: (data.visitDateTime as any).toDate().toISOString(),
                type: 'commercial',
                details: `Commercial: ${data.commercialName}`
            }
        });


        return [...moveEvents, ...quoteEvents, ...visitEvents];

    } catch (error) {
        console.error('Error fetching planning data:', error);
        throw new Error('Failed to fetch planning data.');
    }
}
