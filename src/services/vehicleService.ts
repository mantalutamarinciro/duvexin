
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
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  insuranceExpiryDate?: string;
  createdAt: string;
}

export interface VehicleFormData {
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  insuranceExpiryDate?: string;
}

export async function createVehicle(vehicleData: VehicleFormData): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('vehicles').add({
      ...vehicleData,
      lastMaintenanceDate: vehicleData.lastMaintenanceDate ? Timestamp.fromDate(new Date(vehicleData.lastMaintenanceDate)) : null,
      nextMaintenanceDate: vehicleData.nextMaintenanceDate ? Timestamp.fromDate(new Date(vehicleData.nextMaintenanceDate)) : null,
      insuranceExpiryDate: vehicleData.insuranceExpiryDate ? Timestamp.fromDate(new Date(vehicleData.insuranceExpiryDate)) : null,
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
        lastMaintenanceDate: data.lastMaintenanceDate ? (data.lastMaintenanceDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
        nextMaintenanceDate: data.nextMaintenanceDate ? (data.nextMaintenanceDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
        insuranceExpiryDate: data.insuranceExpiryDate ? (data.insuranceExpiryDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      } as Vehicle;
    });

    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles: ', error);
    throw new Error('Failed to fetch vehicles.');
  }
}
