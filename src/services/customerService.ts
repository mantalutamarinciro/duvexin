
'use server';

import { db, admin } from '@/lib/firebase';

/**
 * Service de gestion des clients (Customers)
 * Permet de centraliser les informations des clients extraites des devis et réservations.
 */

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  totalSpent: number;
  bookingsCount: number;
  lastBookingDate?: string;
  createdAt: string;
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const customersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    return customersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        lastBookingDate: data.lastBookingDate ? (data.lastBookingDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
      } as Customer;
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers.');
  }
}

/**
 * Synchronise ou crée un client à partir d'un devis/réservation
 */
export async function syncCustomerFromBooking(data: { name: string, email: string, phone?: string }) {
  try {
    const customersCol = db.collection('users');
    const query = await customersCol.where('email', '==', data.email).limit(1).get();
    
    const names = data.name.split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    if (query.empty) {
      // Nouveau client
      await customersCol.add({
        firstName,
        lastName,
        email: data.email,
        phoneNumber: data.phone || '',
        totalSpent: 0,
        bookingsCount: 0,
        createdAt: admin.firestore.Timestamp.now(),
      });
    } else {
      // Mise à jour si nécessaire
      const customerDoc = query.docs[0];
      await customerDoc.ref.update({
        phoneNumber: data.phone || customerDoc.data().phoneNumber,
      });
    }
  } catch (error) {
    console.error('Error syncing customer:', error);
  }
}
