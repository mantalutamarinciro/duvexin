
'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export type StorageStatus = 'Stocké' | 'Sorti';

// Représente un "contrat" de stockage pour un client
export interface StorageContract {
  id: string;
  clientName: string;
  itemsDescription: string;
  volumeM3: number;
  entryDate: string; // ISO String
  exitDate: string | null; // ISO String or null
  status: StorageStatus;
  createdAt: string; // ISO String
}

// Données venant du formulaire pour créer un nouveau contrat
export interface StorageContractFormData {
  clientName: string;
  itemsDescription: string;
  volumeM3: number;
  entryDate: string; // ISO String
}

export async function createStorageContract(formData: StorageContractFormData): Promise<{ id: string }> {
    try {
        const newContractRef = db.collection('storage_contracts').doc();
        const newContractData = {
            ...formData,
            entryDate: Timestamp.fromDate(new Date(formData.entryDate)),
            exitDate: null,
            status: 'Stocké' as StorageStatus,
            createdAt: Timestamp.now(),
        };
        await newContractRef.set(newContractData);
        return { id: newContractRef.id };
    } catch (error) {
        console.error("Error creating storage contract:", error);
        throw new Error("Failed to create storage contract.");
    }
}

export async function getStorageContracts(): Promise<StorageContract[]> {
    try {
        const snapshot = await db.collection('storage_contracts').orderBy('entryDate', 'desc').get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                entryDate: (data.entryDate as admin.firestore.Timestamp).toDate().toISOString(),
                exitDate: data.exitDate ? (data.exitDate as admin.firestore.Timestamp).toDate().toISOString() : null,
                createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
            } as StorageContract;
        });
    } catch (error) {
        console.error("Error fetching storage contracts:", error);
        throw new Error("Failed to fetch storage contracts.");
    }
}

export async function markContractAsExited(contractId: string): Promise<void> {
    try {
        const contractRef = db.collection('storage_contracts').doc(contractId);
        await contractRef.update({
            status: 'Sorti',
            exitDate: Timestamp.now(),
        });
    } catch (error) {
        console.error("Error marking contract as exited:", error);
        throw new Error("Failed to update contract status.");
    }
}
