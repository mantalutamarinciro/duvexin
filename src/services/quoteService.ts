'use server';

import { db, admin } from '@/lib/firebase';
import { QuoteRequestFormData } from '@/components/quote-form';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export type QuoteStatus = 'pending' | 'accepted' | 'refused' | 'invoiced' | 'converted';

export interface Quote extends Omit<QuoteRequestFormData, 'moveDate'> {
  id: string;
  moveDate: string; // ISO string
  quote: number;
  status: QuoteStatus;
  createdAt: string; // ISO string
}

export async function saveQuote(
  quoteData: Omit<Quote, 'id' | 'createdAt' | 'status'> & { moveDate: string }
): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('quotes').add({
      ...quoteData,
      status: 'pending',
      moveDate: Timestamp.fromDate(new Date(quoteData.moveDate)),
      createdAt: Timestamp.now(),
    });

    const quoteId = docRef.id;
    console.log('Quote saved with ID: ', quoteId);

    // Send Notification Email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'DemDuVexin <onboarding@resend.dev>',
          to: 'mantalutamarinciro@gmail.com',
          subject: `Nouvelle demande de devis - ${quoteData.clientName}`,
          html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h1 style="color: #00a99d;">Nouvelle demande de devis reçue</h1>
              <p>Une nouvelle demande vient d'être soumise sur le site DemDuVexin.</p>
              
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Coordonnées Client</h3>
                <p><strong>Nom :</strong> ${quoteData.clientName}</p>
                <p><strong>Email :</strong> ${quoteData.clientEmail}</p>
                <p><strong>Téléphone :</strong> ${quoteData.clientPhone || 'Non renseigné'}</p>
              </div>

              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Détails du projet</h3>
                <p><strong>Adresse de départ :</strong> ${quoteData.originAddress}</p>
                <p><strong>Adresse d'arrivée :</strong> ${quoteData.destinationAddress}</p>
                <p><strong>Date prévue :</strong> ${new Date(quoteData.moveDate).toLocaleDateString('fr-FR')}</p>
                <p><strong>Volume estimé :</strong> ${quoteData.volume} m³</p>
                <p><strong>Type de prestation :</strong> ${quoteData.serviceType}</p>
                <p><strong>Informations complémentaires :</strong> ${quoteData.details || 'Aucune'}</p>
              </div>

              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:9002'}/dashboard/quote/${quoteId}" 
                   style="background-color: #00a99d; color: white; padding: 12px 25px; text-decoration: none; border-radius: 50px; font-weight: bold;">
                   Accéder au Devis dans le Dashboard
                </a>
              </p>
            </div>
          `
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
        // We don't throw here to avoid blocking the DB save success for the user
      }
    }

    return { id: quoteId };
  } catch (error) {
    console.error('Error saving quote: ', error);
    throw new Error('Failed to save quote.');
  }
}

export async function getQuotes(): Promise<Quote[]> {
    try {
        const quotesCol = db.collection('quotes');
        const q = quotesCol.orderBy('createdAt', 'desc');
        const querySnapshot = await q.get();
        const quotes = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
                createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(), 
            } as Quote;
        });
        return quotes;
    } catch (error) {
        console.error('Error fetching quotes: ', error);
        throw new Error('Failed to fetch quotes.');
    }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
    try {
        const docRef = db.collection('quotes').doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return null;
        }
        const data = docSnap.data()!;
        return {
            id: docSnap.id,
            ...data,
            moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
            createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        } as Quote;
    } catch (error) {
        console.error('Error fetching quote by ID: ', error);
        throw new Error('Failed to fetch quote.');
    }
}


export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  try {
    const quoteRef = db.collection('quotes').doc(id);
    await quoteRef.update({ status });
    console.log(`Quote ${id} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating quote status: ', error);
    throw new Error('Failed to update quote status.');
  }
}

export async function updateQuote(id: string, data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate: string }): Promise<void> {
    try {
        const quoteRef = db.collection('quotes').doc(id);
        await quoteRef.update({
            ...data,
            moveDate: Timestamp.fromDate(new Date(data.moveDate))
        });
        console.log(`Quote ${id} has been updated.`);
    } catch (error) {
        console.error('Error updating quote: ', error);
        throw new Error('Failed to update quote.');
    }
}

export async function deleteQuote(id: string): Promise<void> {
  try {
    const quoteRef = db.collection('quotes').doc(id);
    await quoteRef.delete();
    console.log(`Quote ${id} has been deleted.`);
  } catch (error) {
    console.error('Error deleting quote: ', error);
    throw new Error('Failed to delete quote.');
  }
}