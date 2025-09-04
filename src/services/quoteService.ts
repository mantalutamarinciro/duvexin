
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, orderBy, query, doc, updateDoc, writeBatch, deleteDoc } from 'firebase/firestore';

export type QuoteStatus = 'pending' | 'accepted' | 'refused' | 'invoiced' | 'converted';

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
  status: QuoteStatus;
  createdAt: Timestamp;
}


export async function saveQuote(
  quoteData: Omit<Quote, 'createdAt' | 'id' | 'status'> & { moveDate: string }
): Promise<{ id: string }> {
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      status: 'pending',
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

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  try {
    const quoteRef = doc(db, 'quotes', id);
    await updateDoc(quoteRef, { status });
    console.log(`Quote ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating quote status: ', error);
    throw new Error('Failed to update quote status.');
  }
}

export async function deleteQuote(id: string): Promise<void> {
  try {
    const quoteRef = doc(db, 'quotes', id);
    await deleteDoc(quoteRef);
    console.log(`Quote ${id} has been deleted.`);
  } catch (error) {
    console.error('Error deleting quote: ', error);
    throw new Error('Failed to delete quote.');
  }
}
