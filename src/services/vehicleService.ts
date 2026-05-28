'use server';

import { db, admin } from '@/lib/firebase';
import type { Vehicle, VehicleFormData } from '@/types/vehicle';

const { Timestamp } = admin.firestore;

const VEHICLES_COLLECTION = 'vehicles';

function toTimestampOrNull(value?: string | null) {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return Timestamp.fromDate(parsed);
}

function mapDocToVehicle(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Vehicle {
  const data = doc.data()!;

  return {
    id: doc.id,
    type: data.type,
    brand: data.brand ?? '',
    registration: data.registration ?? '',
    volume: Number(data.volume ?? 0),
    lastMaintenanceDate: data.lastMaintenanceDate
      ? (data.lastMaintenanceDate as admin.firestore.Timestamp).toDate().toISOString()
      : undefined,
    nextMaintenanceDate: data.nextMaintenanceDate
      ? (data.nextMaintenanceDate as admin.firestore.Timestamp).toDate().toISOString()
      : undefined,
    insuranceExpiryDate: data.insuranceExpiryDate
      ? (data.insuranceExpiryDate as admin.firestore.Timestamp).toDate().toISOString()
      : undefined,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function createVehicle(
  vehicleData: VehicleFormData
): Promise<{ id: string }> {
  try {
    const docRef = await db.collection(VEHICLES_COLLECTION).add({
      ...vehicleData,
      lastMaintenanceDate: toTimestampOrNull(vehicleData.lastMaintenanceDate),
      nextMaintenanceDate: toTimestampOrNull(vehicleData.nextMaintenanceDate),
      insuranceExpiryDate: toTimestampOrNull(vehicleData.insuranceExpiryDate),
      createdAt: Timestamp.now(),
    });

    console.log('Vehicle created with ID:', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw new Error('Failed to create vehicle.');
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const querySnapshot = await db
      .collection(VEHICLES_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return querySnapshot.docs.map(mapDocToVehicle);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error('Failed to fetch vehicles.');
  }
}