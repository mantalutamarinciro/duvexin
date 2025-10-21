
'use server';

import { db, admin } from '@/lib/firebase';
import { QuoteRequestFormData } from '@/components/quote-form';

const { Timestamp } = admin.firestore;

export type QuoteStatus = 'pending' | 'accepted' | 'refused' | 'invoiced' | 'converted';

export interface Quote extends Omit<QuoteRequestFormData, 'moveDate'> {
  id: string;
  moveDate: string; // ISO string
  quote: number;
  status: QuoteStatus;
  createdAt: string; // ISO string
}

export async function saveQuote(
  quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'> & { moveDate: string }
): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('quotes').add({
      ...quoteData,
      status: 'pending',
      moveDate: Timestamp.fromDate(new Date(quoteData.moveDate)),
      createdAt: Timestamp.now(),
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
        const quotesCol = db.collection('quotes');
        const q = quotesCol.orderBy('createdAt', 'desc');
        const querySnapshot = await q.get();
        const quotes = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
                createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(), 
            } as Quote;
        });
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes: ', error);
        throw new Error('Failed to fetch quotes.');
    }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
    try {
        const docRef = db.collection('quotes').doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return null;
        }
        const data = docSnap.data()!;
        return {
            id: docSnap.id,
            ...data,
            moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        } as Quote;
    } catch (error) {
        console.error('Error fetching quote by ID: ', error);
        throw new Error('Failed to fetch quote.');
    }
}


export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  try {
    const quoteRef = db.collection('quotes').doc(id);
    await quoteRef.update({ status });
    console.log(`Quote ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating quote status: ', error);
    throw new Error('Failed to update quote status.');
  }
}

export async function updateQuote(id: string, data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate: string }): Promise<void> {
    try {
        const quoteRef = db.collection('quotes').doc(id);
        await quoteRef.update({
            ...data,
            moveDate: Timestamp.fromDate(new Date(data.moveDate))
        });
        console.log(`Quote ${id} has been updated.`);
    } catch (error) {
        console.error('Error updating quote: ', error);
        throw new Error('Failed to update quote.');
    }
}

export async function deleteQuote(id: string): Promise<void> {
  try {
    const quoteRef = db.collection('quotes').doc(id);
    await quoteRef.delete();
    console.log(`Quote ${id} has been deleted.`);
  } catch (error) {
    console.error('Error deleting quote: ', error);
    throw new Error('Failed to delete quote.');
  }
}
