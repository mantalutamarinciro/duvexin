
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, orderBy, query, writeBatch, doc, updateDoc, getDoc } from 'firebase/firestore';
import { Quote } from './quoteService';

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
  createdAt: Timestamp;
  quoteId: string;
  assignedTeam?: string | null;
  assignedTeamId?: string | null;
}

export async function createBookingFromQuote(quote: Quote): Promise<{ id: string }> {
  try {
    const batch = writeBatch(db);

    // 1. Create new booking
    const newBookingRef = doc(collection(db, 'bookings'));
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
        createdAt: serverTimestamp(),
        assignedTeam: null,
        assignedTeamId: null,
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

export async function getBookingById(id: string): Promise<Booking | null> {
    try {
        const bookingRef = doc(db, 'bookings', id);
        const docSnap = await getDoc(bookingRef);

        if (!docSnap.exists()) {
            console.log('No such booking found!');
            return null;
        }

        const data = docSnap.data();
        return {
            id: docSnap.id,
            ...data,
            moveDate: (data.moveDate as Timestamp).toDate().toISOString(),
            createdAt: data.createdAt as Timestamp,
        } as Booking;

    } catch (error) {
        console.error('Error fetching booking by ID: ', error);
        throw new Error('Failed to fetch booking.');
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

export async function assignTeamToBooking(bookingId: string, teamId: string, teamName: string): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { 
      assignedTeamId: teamId,
      assignedTeam: teamName 
    });
    console.log(`Team ${teamName} (${teamId}) assigned to booking ${bookingId}`);
  } catch (error) {
    console.error('Error assigning team to booking: ', error);
    throw new Error('Failed to assign team to booking.');
  }
}
