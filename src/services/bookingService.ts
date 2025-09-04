'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, orderBy, query, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { Quote } from './quoteService';

export type BookingStatus = 'Programmé' | 'En cours' | 'Terminé' | 'Annulé';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string; 
  total: number;
  status: BookingStatus;
  createdAt: Timestamp;
  quoteId: string;
}

export async function createBookingFromQuote(quote: Quote): Promise<{ id: string }> {
  try {
    const batch = writeBatch(db);

    // 1. Create new booking
    const newBookingRef = doc(collection(db, 'bookings'));
    const newBookingData = {
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        originAddress: quote.originAddress,
        destinationAddress: quote.destinationAddress,
        moveDate: new Date(quote.moveDate),
        total: quote.quote,
        status: 'Programmé',
        quoteId: quote.id,
        createdAt: serverTimestamp(),
    };
    
    batch.set(newBookingRef, newBookingData);

    // 2. Update quote status to 'converted'
    const quoteRef = doc(db, 'quotes', quote.id);
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
        const bookingsCol = collection(db, 'bookings');
        const q = query(bookingsCol, orderBy('moveDate', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const bookings = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                moveDate: (data.moveDate as Timestamp).toDate().toISOString(),
                createdAt: data.createdAt as Timestamp,
            } as Booking;
        });
        
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings: ', error);
        throw new Error('Failed to fetch bookings.');
    }
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, { status });
    console.log(`Booking ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating booking status: ', error);
    throw new Error('Failed to update booking status.');
  }
}
