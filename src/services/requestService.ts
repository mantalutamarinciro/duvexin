'use server';

import { db, admin } from '@/lib/firebase';
const { Timestamp } = admin.firestore;

export type RequestStatus = 'À traiter' | 'Converti en visite' | 'Archivé';

export interface MoveRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate?: string;
  volume: number;
  details?: string;
  status: RequestStatus;
  createdAt: string;
}

export type CreateRequestData = Omit<MoveRequest, 'id' | 'status' | 'createdAt'>;

export async function createRequest(data: CreateRequestData): Promise<{ id: string }> {
  try {
    if (!db) throw new Error('Database not initialized');
    const newRequestRef = db.collection('requests').doc();
    await newRequestRef.set({
      ...data,
      status: 'À traiter',
      createdAt: Timestamp.now(),
    });
    return { id: newRequestRef.id };
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request.");
  }
}

export async function getRequests(): Promise<MoveRequest[]> {
  try {
    if (!db) return [];
    const snapshot = await db.collection('requests').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        moveDate: data.moveDate?.toDate
          ? (data.moveDate as admin.firestore.Timestamp).toDate().toISOString()
          : data.moveDate?._seconds
            ? new Date(data.moveDate._seconds * 1000).toISOString()
            : data.moveDate
              ? new Date(data.moveDate).toISOString()
              : undefined,
        createdAt: data.createdAt?.toDate 
          ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
          : data.createdAt?._seconds 
            ? new Date(data.createdAt._seconds * 1000).toISOString()
            : data.createdAt 
              ? new Date(data.createdAt).toISOString() 
              : new Date().toISOString(),
      } as MoveRequest;
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw new Error("Failed to fetch requests.");
  }
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
  try {
    if (!db) return;
    const requestRef = db.collection('requests').doc(id);
    await requestRef.update({ status });
  } catch (error) {
    console.error('Error updating request status:', error);
    throw new Error('Failed to update request status.');
  }
}

export async function updateRequestVolume(id: string, volume: number, details?: string): Promise<void> {
  try {
    if (!db) return;
    const requestRef = db.collection('requests').doc(id);
    const updateData: any = { volume };
    if (details) {
      updateData.details = details;
    }
    await requestRef.update(updateData);
  } catch (error) {
    console.error('Error updating request volume:', error);
    throw new Error('Failed to update request volume.');
  }
}
