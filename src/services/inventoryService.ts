'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

// Represents an item within a specific inventory list for a quote/booking
export interface InventoryItem {
  id: string; // id of the predefined item
  name: string;
  volume: number;
  quantity: number;
  icon: string;
}

// This represents the entire inventory document for a specific entity (e.g., a quote)
export interface InventoryList {
  id: string;
  items: InventoryItem[];
  totalVolume: number;
  createdAt: string;
  updatedAt: string;
}

// We will use a fixed ID for now to simulate a single inventory list.
// In a real app, this would be linked to a quote or booking ID.
const SINGLE_INVENTORY_ID = "main_inventory";


export async function getInventoryList(): Promise<InventoryList | null> {
  try {
    if (!db) return null;
    const docRef = db.collection('inventories').doc(SINGLE_INVENTORY_ID);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      // If it doesn't exist, create an empty one
      const newList: Omit<InventoryList, 'id' | 'createdAt' | 'updatedAt'> = { items: [], totalVolume: 0 };
      const now = Timestamp.now();
      await docRef.set({ 
        ...newList,
        createdAt: now,
        updatedAt: now,
       });
      return { 
        id: docRef.id, 
        ...newList, 
        createdAt: now.toDate().toISOString(), 
        updatedAt: now.toDate().toISOString() 
      };
    }

    const data = docSnap.data()!;
    return {
      id: docSnap.id,
      items: data.items || [],
      totalVolume: data.totalVolume || 0,
      createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      updatedAt: (data.updatedAt as admin.firestore.Timestamp).toDate().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching inventory list: ', error);
    throw new Error('Failed to fetch inventory list.');
  }
}

export async function updateInventoryList(items: InventoryItem[]): Promise<void> {
  try {
    if (!db) return;
    const docRef = db.collection('inventories').doc(SINGLE_INVENTORY_ID);
    const totalVolume = items.reduce((acc, item) => acc + item.volume * item.quantity, 0);

    await docRef.set({
      items: items,
      totalVolume: totalVolume,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating inventory list: ', error);
    throw new Error('Failed to update inventory list.');
  }
}

// The following functions are no longer used with the new visual inventory model,
// but are kept for reference or potential future use.

export interface OldInventoryItem {
  id: string;
  objectType: string;
  estimatedDimensions?: string;
  estimatedWeightKg?: number;
  fragility?: string;
  objectCharacteristics: string;
  createdAt: string;
}

export interface OldInventoryItemCreate {
  objectType: string;
  estimatedDimensions?: string;
  estimatedWeightKg?: number;
  fragility?: string;
  objectCharacteristics: string;
}

export async function addInventoryItem(itemData: OldInventoryItemCreate): Promise<{ id: string }> {
  try {
    if (!db) throw new Error('Database not initialized');
    const docRef = db.collection('inventory_items_old').doc();
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

export async function deleteInventoryItem(id: string): Promise<void> {
    try {
        if (!db) throw new Error('Database not initialized');
        const itemRef = db.collection('inventory_items_old').doc(id);
        await itemRef.delete();
        console.log(`Inventory item ${id} has been deleted.`);
    } catch (error) {
        console.error('Error deleting inventory item: ', error);
        throw new Error('Failed to delete inventory item.');
    }
}
