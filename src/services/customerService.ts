'use server';

import { db, admin } from '@/lib/firebase';

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
  if (!db) return [];
  try {
    const customersSnapshot = await db.collection('users').orderBy('createdAt', 'desc').get();
    return customersSnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString() : new Date().toISOString(),
        lastBookingDate: data.lastBookingDate ? (data.lastBookingDate as admin.firestore.Timestamp).toDate().toISOString() : undefined,
      } as Customer;
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}

export async function syncCustomerFromBooking(data: { name: string, email: string, phone?: string, amount?: number, date?: string }) {
  if (!db) return;
  try {
    const customersCol = db.collection('users');
    const query = await customersCol.where('email', '==', data.email).limit(1).get();
    
    const names = data.name.split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    if (query.empty) {
      await customersCol.add({
        firstName,
        lastName,
        email: data.email,
        phoneNumber: data.phone || '',
        totalSpent: data.amount || 0,
        bookingsCount: data.amount ? 1 : 0,
        lastBookingDate: data.date ? admin.firestore.Timestamp.fromDate(new Date(data.date)) : null,
        createdAt: admin.firestore.Timestamp.now(),
      });
    } else {
      const customerDoc = query.docs[0];
      const currentData = customerDoc.data();
      
      const updateData: any = {
        phoneNumber: data.phone || currentData.phoneNumber,
      };

      if (data.amount) {
        updateData.totalSpent = (currentData.totalSpent || 0) + data.amount;
        updateData.bookingsCount = (currentData.bookingsCount || 0) + 1;
      }

      if (data.date) {
        updateData.lastBookingDate = admin.firestore.Timestamp.fromDate(new Date(data.date));
      }

      await customerDoc.ref.update(updateData);
    }
  } catch (error) {
    console.error('Error syncing customer:', error);
  }
}

export async function syncCustomerFromRequest(data: { name: string, email: string, phone?: string }) {
  if (!db) return;
  try {
    const customersCol = db.collection('users');
    const query = await customersCol.where('email', '==', data.email.toLowerCase().trim()).limit(1).get();
    
    const names = data.name.trim().split(/\s+/);
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    if (query.empty) {
      await customersCol.add({
        firstName,
        lastName,
        email: data.email.toLowerCase().trim(),
        phoneNumber: data.phone || '',
        totalSpent: 0,
        bookingsCount: 0,
        createdAt: admin.firestore.Timestamp.now(),
      });
      console.log(`Created new customer profile for request email: ${data.email}`);
    } else {
      const customerDoc = query.docs[0];
      const currentData = customerDoc.data();
      
      const updateData: any = {
        phoneNumber: data.phone || currentData.phoneNumber || '',
      };
      await customerDoc.ref.update(updateData);
      console.log(`Updated phone for existing customer: ${data.email}`);
    }
  } catch (error) {
    console.error('Error syncing customer from request:', error);
  }
}
export async function updateCustomer(id: string, data: Partial<Pick<Customer, 'firstName' | 'lastName' | 'email' | 'phoneNumber'>>): Promise<void> {
  if (!db) throw new Error('Base de donnees non disponible.');
  try {
    const updateData: Record<string, unknown> = {
      updatedAt: admin.firestore.Timestamp.now(),
    };

    if (data.firstName !== undefined) updateData.firstName = data.firstName.trim();
    if (data.lastName !== undefined) updateData.lastName = data.lastName.trim();
    if (data.email !== undefined) updateData.email = data.email.toLowerCase().trim();
    if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber.trim();

    await db.collection('users').doc(id).update(updateData);
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Impossible de mettre a jour le client.');
  }
}

export async function deleteCustomer(id: string): Promise<void> {
  if (!db) throw new Error('Base de donnees non disponible.');
  try {
    await db.collection('users').doc(id).delete();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw new Error('Impossible de supprimer le client.');
  }
}
