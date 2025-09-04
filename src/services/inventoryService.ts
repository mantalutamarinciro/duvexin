'use server';

import { db } from '@/lib/firebase';
import { admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export interface InventoryItem {
  id: string;
  objectType: string;
  estimatedDimensions?: string;
  estimatedWeightKg?: number;
  fragility?: string;
  objectCharacteristics: string;
  createdAt: string;
}

export interface InventoryItemCreate {
  objectType: string;
  estimatedDimensions?: string;
  estimatedWeightKg?: number;
  fragility?: string;
  objectCharacteristics: string;
}

export async function addInventoryItem(itemData: InventoryItemCreate): Promise<{ id: string }> {
  try {
    const docRef = db.collection('inventory').doc();
    await docRef.set({
      ...itemData,
      createdAt: Timestamp.now(),
    });
    console.log('Inventory item added with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error adding inventory item: ', error);
    throw new Error('Failed to add inventory item.');
  }
}

export async function getInventoryItems(): Promise<InventoryItem[]> {
  try {
    const inventoryCol = db.collection('inventory');
    const q = inventoryCol.orderBy('createdAt', 'desc');
    const querySnapshot = await q.get();

    const items = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      } as InventoryItem;
    });

    return items;
  } catch (error) {
    console.error('Error fetching inventory items: ', error);
    throw new Error('Failed to fetch inventory items.');
  }
}

export async function deleteInventoryItem(id: string): Promise<void> {
    try {
        const itemRef = db.collection('inventory').doc(id);
        await itemRef.delete();
        console.log(`Inventory item ${id} has been deleted.`);
    } catch (error) {
        console.error('Error deleting inventory item: ', error);
        throw new Error('Failed to delete inventory item.');
    }
}
