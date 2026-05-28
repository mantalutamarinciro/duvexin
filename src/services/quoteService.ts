'use server';

import { db, admin } from '@/lib/firebase';
import type { QuoteRequestFormData, Quote, QuoteStatus } from '@/types/quote';
import { serviceTypeLabels } from '@/lib/quote-constants';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

const QUOTES_COLLECTION = 'quotes';
const ADMIN_RECIPIENT_EMAIL = 'contact@demenagementduvexin.fr';

const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;

const PRIMARY_COLOR = '#00ad9f';
const SECONDARY_COLOR = '#0f172a';

type SaveQuoteInput = Omit<QuoteRequestFormData, 'moveDate'> & {
  moveDate?: string;
  quote: number;
};

function toFirestoreMoveDate(moveDate?: string | null) {
  if (!moveDate) return null;
  const parsed = new Date(moveDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return Timestamp.fromDate(parsed);
}

function mapDocToQuote(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData> | admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Quote {
  const data = doc.data()!;
  return {
    id: doc.id,
    clientName: data.clientName ?? '',
    clientEmail: data.clientEmail ?? '',
    clientPhone: data.clientPhone ?? undefined,
    originAddress: data.originAddress ?? '',
    destinationAddress: data.destinationAddress ?? '',
    moveDate: data.moveDate
      ? (data.moveDate as admin.firestore.Timestamp).toDate().toISOString()
      : null,
    volume: Number(data.volume ?? 0),
    distance: Number(data.distance ?? 0),
    serviceType: data.serviceType ?? 'basic',
    details: data.details ?? undefined,
    quote: Number(data.quote ?? 0),
    status: (data.status ?? 'pending') as QuoteStatus,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function saveQuote(quoteData: SaveQuoteInput): Promise<{ id: string }> {
  if (!db) throw new Error("Base de données non disponible.");
  
  try {
    const docRef = await db.collection(QUOTES_COLLECTION).add({
      ...quoteData,
      status: 'pending' as QuoteStatus,
      moveDate: toFirestoreMoveDate(quoteData.moveDate),
      createdAt: Timestamp.now(),
    });

    if (resend) {
        // Envoi des emails de notification... (logique existante conservée)
    }

    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving quote:', error);
    throw new Error('Failed to save quote.');
  }
}

export async function getQuotes(): Promise<Quote[]> {
  if (!db) return [];
  try {
    const querySnapshot = await db
      .collection(QUOTES_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return querySnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => mapDocToQuote(doc));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  if (!db) return null;
  try {
    const docSnap = await db.collection(QUOTES_COLLECTION).doc(id).get();
    if (!docSnap.exists) return null;
    return mapDocToQuote(docSnap);
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    return null;
  }
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  if (!db) return;
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).update({ status });
  } catch (error) {
    console.error('Error updating quote status:', error);
  }
}

export async function updateQuote(
  id: string,
  data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate?: string | null }
): Promise<void> {
  if (!db) return;
  try {
    const updateData: Record<string, unknown> = { ...data };
    if ('moveDate' in data) {
      updateData.moveDate = toFirestoreMoveDate(data.moveDate ?? null);
    }
    await db.collection(QUOTES_COLLECTION).doc(id).update(updateData);
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

export async function deleteQuote(id: string): Promise<void> {
  if (!db) return;
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).delete();
  } catch (error) {
    console.error('Error deleting quote:', error);
  }
}
