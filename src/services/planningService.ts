
'use server';

import { db, admin } from '@/lib/firebase';
import type { Quote } from './quoteService';
import type { Booking } from './bookingService';

export interface PlanningEvent {
    id: string;
    title: string;
    date: string; // ISO String
    type: 'move' | 'commercial';
}

export async function getPlanningData(): Promise<PlanningEvent[]> {
    try {
        const bookingsPromise = db.collection('bookings')
            .where('status', 'in', ['Programmé', 'En cours'])
            .get();
            
        const quotesPromise = db.collection('quotes')
            .where('status', '==', 'pending')
            .get();

        const [bookingsSnapshot, quotesSnapshot] = await Promise.all([bookingsPromise, quotesPromise]);

        const moveEvents: PlanningEvent[] = bookingsSnapshot.docs.map(doc => {
            const data = doc.data() as Booking;
            return {
                id: `move-${doc.id}`,
                title: `${data.clientName} (${data.volume || '?'}m³)`,
                date: (data.moveDate as any).toDate().toISOString(),
                type: 'move'
            };
        });

        const commercialEvents: PlanningEvent[] = quotesSnapshot.docs.map(doc => {
            const data = doc.data() as Quote;
            // We use the quote's creation date as a proxy for a follow-up/visit date.
            // In a real scenario, quotes might have a specific "visitDate" field.
            return {
                id: `comm-${doc.id}`,
                title: `Visite ${data.clientName}`,
                date: (data.moveDate as any).toDate().toISOString(),
                type: 'commercial'
            };
        });

        return [...moveEvents, ...commercialEvents];

    } catch (error) {
        console.error('Error fetching planning data:', error);
        throw new Error('Failed to fetch planning data.');
    }
}
