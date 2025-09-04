'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, orderBy, query } from 'firebase/firestore';

export interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string;
  distance: number;
  volume: number;
  serviceType: "basic" | "full" | "premium";
  quote: number;
  status: 'pending' | 'accepted' | 'invoiced';
  createdAt: Timestamp;
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

export async function getQuotes(): Promise<Quote[]> {
    try {
        const quotesCol = collection(db, 'quotes');
        const q = query(quotesCol, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const quotes = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Firestore Timestamps need to be converted to serializable format
                moveDate: (data.moveDate as Timestamp).toDate().toISOString(),
                createdAt: data.createdAt as Timestamp, 
            } as Quote;
        });
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes: ', error);
        throw new Error('Failed to fetch quotes.');
    }
}
