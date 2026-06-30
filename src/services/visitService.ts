
'use server';

import { db, admin } from '@/lib/firebase';
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
