'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Note: Omiting QuoteFormData from '@/app/dashboard/quote/page'
// to prevent client components from being bundled with server components.
export interface Quote {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string; // Changed from Date to string
  distance: number;
  volume: number;
  serviceType: "basic" | "full" | "premium";
  quote: number;
  status: 'pending' | 'accepted' | 'invoiced';
  createdAt: any;
}

export async function saveQuote(
  quoteData: Omit<Quote, 'createdAt' | 'id'>
): Promise<{ id: string }> {
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      moveDate: Timestamp.fromDate(new Date(quoteData.moveDate)),
      createdAt: serverTimestamp(),
    });
    console.log('Quote saved with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving quote: ', error);
    throw new Error('Failed to save quote.');
  }
}
