
'use server';

import { db, admin } from '@/lib/firebase';
import type { VehicleType } from '@/app/dashboard/vehicles/page';

const { Timestamp } = admin.firestore;


export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
  createdAt: string;
}

export interface VehicleFormData {
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
}

export async function createVehicle(vehicleData: VehicleFormData): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('vehicles').add({
      ...vehicleData,
      createdAt: Timestamp.now(),
    });
    console.log('Vehicle created with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating vehicle: ', error);
    throw new Error('Failed to create vehicle.');
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const vehiclesCol = db.collection('vehicles');
    const q = vehiclesCol.orderBy('createdAt', 'desc');
    const querySnapshot = await q.get();

    const vehicles = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      } as Vehicle;
    });

    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles: ', error);
    throw new Error('Failed to fetch vehicles.');
  }
}
