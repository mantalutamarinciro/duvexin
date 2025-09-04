'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { QuoteFormData } from '@/app/dashboard/quote/page';

export interface Quote extends QuoteFormData {
  quote: number;
  status: 'pending' | 'accepted' | 'invoiced';
  createdAt: any; // serverTimestamp will handle this
}

export async function saveQuote(
  quoteData: Omit<Quote, 'createdAt' | 'id'>
): Promise<{ id: string }> {
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      createdAt: serverTimestamp(),
    });
    console.log('Quote saved with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving quote: ', error);
    throw new Error('Failed to save quote.');
  }
}
