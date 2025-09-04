
'use server';

import { db, admin } from '@/lib/firebase';
import type { Quote } from './quoteService';

const { Timestamp } = admin.firestore;

export type BookingStatus = 'Programmé' | 'En cours' | 'Terminé' | 'Annulé';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string; 
  total: number;
  volume?: number;
  serviceType?: "basic" | "full" | "premium";
  status: BookingStatus;
  createdAt: admin.firestore.Timestamp;
  quoteId: string;
  assignedTeam?: string | null;
  assignedTeamId?: string | null;
}

export async function createBookingFromQuote(quote: Quote): Promise<{ id: string }> {
  try {
    const batch = db.batch();

    // 1. Create new booking
    const newBookingRef = db.collection('bookings').doc();
    const newBookingData = {
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        clientPhone: quote.clientPhone,
        originAddress: quote.originAddress,
        destinationAddress: quote.destinationAddress,
        moveDate: Timestamp.fromDate(new Date(quote.moveDate)),
        total: quote.quote,
        volume: quote.volume,
        serviceType: quote.serviceType,
        status: 'Programmé',
        quoteId: quote.id,
        createdAt: Timestamp.now(),
        assignedTeam: null,
        assignedTeamId: null,
    };
    
    batch.set(newBookingRef, newBookingData);

    // 2. Update quote status to 'converted'
    const quoteRef = db.collection('quotes').doc(quote.id);
    batch.update(quoteRef, { status: 'converted' });

    await batch.commit();

    console.log(`Booking created with ID: ${newBookingRef.id} from quote ${quote.id}`);
    return { id: newBookingRef.id };
  } catch (error) {
    console.error('Error creating booking from quote: ', error);
    throw new Error('Failed to create booking from quote.');
  }
}


export async function getBookings(): Promise<Booking[]> {
    try {
        const bookingsCol = db.collection('bookings');
        const q = bookingsCol.orderBy('moveDate', 'desc');
        const querySnapshot = await q.get();
        
        const bookings = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
                createdAt: data.createdAt as admin.firestore.Timestamp,
            } as Booking;
        });
        
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings: ', error);
        throw new Error('Failed to fetch bookings.');
    }
}

export async function getBookingById(id: string): Promise<Booking | null> {
    try {
        const bookingRef = db.collection('bookings').doc(id);
        const docSnap = await bookingRef.get();

        if (!docSnap.exists) {
            console.log('No such booking found!');
            return null;
        }

        const data = docSnap.data()!;
        return {
            id: docSnap.id,
            ...data,
            moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
            createdAt: data.createdAt as admin.firestore.Timestamp,
        } as Booking;

    } catch (error) {
        console.error('Error fetching booking by ID: ', error);
        throw new Error('Failed to fetch booking.');
    }
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  try {
    const bookingRef = db.collection('bookings').doc(id);
    await bookingRef.update({ status });
    console.log(`Booking ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating booking status: ', error);
    throw new Error('Failed to update booking status.');
  }
}

export async function assignTeamToBooking(bookingId: string, teamId: string, teamName: string): Promise<void> {
  try {
    const bookingRef = db.collection('bookings').doc(bookingId);
    await bookingRef.update({ 
      assignedTeamId: teamId,
      assignedTeam: teamName 
    });
    console.log(`Team ${teamName} (${teamId}) assigned to booking ${bookingId}`);
  } catch (error) {
    console.error('Error assigning team to booking: ', error);
    throw new Error('Failed to assign team to booking.');
  }
}
