
'use server';

import { db, admin } from '@/lib/firebase';
import type { QuoteRequestFormData } from '@/types/quote';
const { Timestamp } = admin.firestore;

export type VisitStatus = 'Planifiée' | 'Effectuée' | 'Annulée';
export type VisitType = 'domicile' | 'téléphone' | 'visio';

export interface Visit {
  id: string;
  commercialName: string;
  clientName: string;
  clientAddress: string;
  visitDateTime: string; // ISO String
  type: VisitType;
  details: string;
  status: VisitStatus;
  quoteId?: string;
  requestId?: string; // Link to the original request
  clientEmail?: string;
  clientPhone?: string;
  originAddress?: string;
  destinationAddress?: string;
  moveDate?: string;
  volume?: number;
  createdAt: string; // ISO String
}

export interface VisitFormData {
  commercialName: string;
  clientName: string;
  clientAddress: string;
  visitDateTime: Date;
  type: VisitType;
  details: string;
  requestId?: string;
  clientEmail?: string;
  clientPhone?: string;
  originAddress?: string;
  destinationAddress?: string;
  moveDate?: string;
  volume?: number;
}

export type VisitQuotePrefillData = Partial<QuoteRequestFormData> & {
  visitId: string;
  requestId?: string;
  sourceLabel?: string;
}

export async function createVisit(formData: VisitFormData): Promise<{ id: string }> {
  try {
    if (!db) throw new Error('Database not initialized');
    const newVisitRef = db.collection('visits').doc();
    await newVisitRef.set({
      ...formData,
      visitDateTime: Timestamp.fromDate(formData.visitDateTime),
      status: 'Planifiée' as VisitStatus,
      createdAt: Timestamp.now(),
    });
    return { id: newVisitRef.id };
  } catch (error) {
    console.error("Error creating visit:", error);
    throw new Error("Failed to create visit.");
  }
}

export async function getVisits(): Promise<Visit[]> {
  try {
    if (!db) return [];
    const snapshot = await db.collection('visits').orderBy('visitDateTime', 'desc').get();
    return snapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        visitDateTime: (data.visitDateTime as admin.firestore.Timestamp).toDate().toISOString(),
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      } as Visit;
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    throw new Error("Failed to fetch visits.");
  }
}

export async function updateVisitStatus(id: string, status: VisitStatus): Promise<void> {
  try {
    if (!db) return;
    const visitRef = db.collection('visits').doc(id);
    await visitRef.update({ status });
    console.log(`Visit ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating visit status: ', error);
    throw new Error('Failed to update visit status.');
  }
}

export async function deleteVisit(id: string): Promise<void> {
  try {
    if (!db) return;
    const visitRef = db.collection('visits').doc(id);
    await visitRef.delete();
    console.log(`Visit ${id} deleted`);
  } catch (error) {
    console.error('Error deleting visit: ', error);
    throw new Error('Failed to delete visit.');
  }
}

function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return value;
  const timestamp = value as admin.firestore.Timestamp;
  if (typeof timestamp.toDate === 'function') return timestamp.toDate().toISOString();
  const seconds = (value as { _seconds?: number })._seconds;
  if (typeof seconds === 'number') return new Date(seconds * 1000).toISOString();
  return undefined;
}

function asNumber(value: unknown): number | undefined {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
}

function buildVisitQuoteDetails(visit: Visit, request?: Record<string, unknown> | null): string {
  const rows = [
    'Source: visite commerciale',
    visit.commercialName ? 'Commercial: ' + visit.commercialName : '',
    visit.visitDateTime ? 'Date de visite: ' + new Date(visit.visitDateTime).toLocaleString('fr-FR') : '',
    visit.type ? 'Type de visite: ' + visit.type : '',
    visit.clientAddress ? 'Adresse visite: ' + visit.clientAddress : '',
    visit.details ? 'Notes visite: ' + visit.details : '',
    request?.details ? 'Notes demande initiale: ' + String(request.details) : '',
  ].filter(Boolean);

  return rows.join('\n');
}

export async function getVisitById(id: string): Promise<Visit | null> {
  try {
    if (!db || !id) return null;
    const docSnap = await db.collection('visits').doc(id).get();
    if (!docSnap.exists) return null;
    const data = docSnap.data()!;
    return {
      id: docSnap.id,
      ...data,
      visitDateTime: toIsoDate(data.visitDateTime) || new Date().toISOString(),
      createdAt: toIsoDate(data.createdAt) || new Date().toISOString(),
    } as Visit;
  } catch (error) {
    console.error('Error fetching visit by ID:', error);
    return null;
  }
}

export async function getQuotePrefillFromVisit(visitId: string): Promise<VisitQuotePrefillData | null> {
  if (!db || !visitId) return null;

  const visit = await getVisitById(visitId);
  if (!visit) return null;

  let request: Record<string, unknown> | null = null;
  if (visit.requestId) {
    const requestSnap = await db.collection('requests').doc(visit.requestId).get();
    request = requestSnap.exists ? requestSnap.data() || null : null;
  }

  const originAddress = visit.originAddress || visit.clientAddress || String(request?.originAddress || '');
  const destinationAddress = visit.destinationAddress || String(request?.destinationAddress || '');
  const moveDate = visit.moveDate || toIsoDate(request?.moveDate) || String(request?.moveDate || '') || undefined;
  const volume = asNumber(visit.volume) ?? asNumber(request?.volume) ?? 0;

  return {
    visitId: visit.id,
    requestId: visit.requestId,
    sourceLabel: 'visite',
    clientName: visit.clientName || String(request?.clientName || ''),
    clientEmail: visit.clientEmail || String(request?.clientEmail || ''),
    clientPhone: visit.clientPhone || String(request?.clientPhone || ''),
    originAddress,
    destinationAddress,
    moveDate,
    volume,
    distance: 0,
    serviceType: 'basic',
    details: buildVisitQuoteDetails(visit, request),
  };
}

export async function linkVisitToQuote(visitId: string, quoteId: string): Promise<void> {
  try {
    if (!db || !visitId || !quoteId) return;
    await db.collection('visits').doc(visitId).update({
      quoteId,
      status: "Effectu\u00e9e" as VisitStatus,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error linking visit to quote:', error);
    throw new Error('Failed to link visit to quote.');
  }
}
