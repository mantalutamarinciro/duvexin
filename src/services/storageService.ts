
'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export type StorageUnitStatus = 'Occupé' | 'Disponible' | 'En maintenance';

export interface StorageUnit {
  id: string;
  unitNumber: string;
  clientName?: string;
  status: StorageUnitStatus;
  size: string; // e.g. "5m³"
  startDate?: string;
  createdAt: string;
}

export interface StorageUnitFormData {
  unitNumber: string;
  size: string;
}

export type MovementType = 'Entrée' | 'Sortie';

export interface Movement {
    id: string;
    type: MovementType;
    date: string;
    itemsDescription: string;
    notes?: string;
}

export interface MovementFormData {
    unitId: string;
    type: MovementType;
    itemsDescription: string;
    notes?: string;
}


export async function createStorageUnit(formData: StorageUnitFormData): Promise<{ id: string }> {
    try {
        const newUnitRef = db.collection('storage_units').doc();
        const newUnitData = {
            ...formData,
            status: 'Disponible' as StorageUnitStatus,
            clientName: null,
            startDate: null,
            createdAt: Timestamp.now(),
        };
        await newUnitRef.set(newUnitData);
        return { id: newUnitRef.id };
    } catch (error) {
        console.error("Error creating storage unit:", error);
        throw new Error("Failed to create storage unit.");
    }
}

export async function getStorageUnits(): Promise<StorageUnit[]> {
    try {
        const snapshot = await db.collection('storage_units').orderBy('unitNumber', 'asc').get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                startDate: data.startDate ? (data.startDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
                createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
            } as StorageUnit;
        });
    } catch (error) {
        console.error("Error fetching storage units:", error);
        throw new Error("Failed to fetch storage units.");
    }
}

export async function addMovement(formData: MovementFormData): Promise<{ id: string }> {
    try {
        const unitRef = db.collection('storage_units').doc(formData.unitId);
        const movementRef = unitRef.collection('movements').doc();

        const newMovementData = {
            type: formData.type,
            itemsDescription: formData.itemsDescription,
            notes: formData.notes || null,
            date: Timestamp.now(),
        };

        await movementRef.set(newMovementData);
        return { id: movementRef.id };
    } catch (error) {
        console.error("Error adding movement:", error);
        throw new Error("Failed to add movement.");
    }
}

export async function getUnitMovements(unitId: string): Promise<Movement[]> {
    try {
        const movementsRef = db.collection('storage_units').doc(unitId).collection('movements');
        const snapshot = await movementsRef.orderBy('date', 'desc').get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                date: (data.date as admin.firestore.Timestamp).toDate().toISOString(),
            } as Movement;
        });

    } catch (error) {
        console.error("Error fetching movements:", error);
        throw new Error("Failed to fetch movements for unit.");
    }
}

export async function getStorageUnitById(unitId: string): Promise<StorageUnit | null> {
    try {
        const doc = await db.collection('storage_units').doc(unitId).get();
        if (!doc.exists) return null;
        
        const data = doc.data()!;
        return {
            id: doc.id,
            ...data,
            startDate: data.startDate ? (data.startDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        } as StorageUnit;

    } catch (error) {
         console.error("Error fetching unit by id:", error);
        throw new Error("Failed to fetch unit details.");
    }
}
