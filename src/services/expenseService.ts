'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export type ExpenseCategory = 'Carburant' | 'Matériel' | 'Salaires' | 'Assurance' | 'Marketing' | 'Autre';

export interface ExpenseFormData {
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  bookingId?: string;
}

export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  bookingId?: string;
  createdAt: string;
}

export async function createExpense(expenseData: ExpenseFormData): Promise<{ id: string }> {
  if (!db) throw new Error("Base de données non disponible.");
  try {
    const docRef = await db.collection('expenses').add({
      ...expenseData,
      date: Timestamp.fromDate(new Date(expenseData.date)),
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating expense: ', error);
    throw new Error('Failed to create expense.');
  }
}

export async function getExpenses(): Promise<Expense[]> {
  if (!db) return [];
  try {
    const expensesCol = db.collection('expenses');
    const q = expensesCol.orderBy('date', 'desc');
    const querySnapshot = await q.get();

    return querySnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: data.date ? (data.date as admin.firestore.Timestamp).toDate().toISOString() : new Date().toISOString(),
        createdAt: data.createdAt ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString() : new Date().toISOString(),
      } as Expense;
    });
  } catch (error) {
    console.error('Error fetching expenses: ', error);
    return [];
  }
}
