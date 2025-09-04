
'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export type ExpenseCategory = 'Carburant' | 'Matériel' | 'Salaires' | 'Assurance' | 'Marketing' | 'Autre';

// This is the type for the data coming from the form, before it hits the server.
// Dates are still strings.
export interface ExpenseFormData {
  date: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  bookingId?: string;
}

// This is the type for the data as it is stored in Firestore and retrieved in server-side functions.
// Dates are properly typed.
export interface Expense {
  id: string;
  date: string; // Kept as string for simplicity on the client
  amount: number;
  category: ExpenseCategory;
  description: string;
  bookingId?: string;
  createdAt: string;
}

export async function createExpense(expenseData: ExpenseFormData): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('expenses').add({
      ...expenseData,
      date: Timestamp.fromDate(new Date(expenseData.date)),
      createdAt: Timestamp.now(),
    });
    console.log('Expense created with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating expense: ', error);
    throw new Error('Failed to create expense.');
  }
}

export async function getExpenses(): Promise<Expense[]> {
  try {
    const expensesCol = db.collection('expenses');
    const q = expensesCol.orderBy('date', 'desc');
    const querySnapshot = await q.get();

    const expenses = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        date: (data.date as admin.firestore.Timestamp).toDate().toISOString(),
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
      } as Expense;
    });

    return expenses;
  } catch (error) {
    console.error('Error fetching expenses: ', error);
    throw new Error('Failed to fetch expenses.');
  }
}
