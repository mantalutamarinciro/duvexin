
'use server';

import { db, admin } from '@/lib/firebase';
import { z } from 'zod';

const { Timestamp } = admin.firestore;

export const expenseCategories = [
    'Carburant',
    'Matériel',
    'Salaires',
    'Assurance',
    'Marketing',
    'Autre',
] as const;

export const expenseSchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Date invalide" }),
  amount: z.coerce.number().positive("Le montant doit être positif"),
  category: z.enum(expenseCategories),
  description: z.string().min(3, "La description est trop courte"),
  bookingId: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

export interface Expense extends ExpenseFormData {
  id: string;
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
