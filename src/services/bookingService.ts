'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, orderBy, query, writeBatch, doc } from 'firebase/firestore';
import { Quote } from './quoteService';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string; 
  total: number;
  status: 'Programmé' | 'En cours' | 'Terminé' | 'Annulé';
  createdAt: Timestamp;
  quoteId: string;
}

export async function createBookingFromQuote(quote: Quote): Promise<{ id: string }> {
  try {
    const batch = writeBatch(db);

    // 1. Create new booking
    const newBookingRef = doc(collection(db, 'bookings'));
    const newBooking: Omit<Booking, 'id' | 'createdAt'> = {
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        originAddress: quote.originAddress,
        destinationAddress: quote.destinationAddress,
        moveDate: quote.moveDate,
        total: quote.quote,
        status: 'Programmé',
        quoteId: quote.id
    };
    
    batch.set(newBookingRef, {
        ...newBooking,
        createdAt: serverTimestamp(),
    });

    // 2. Update quote status
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
