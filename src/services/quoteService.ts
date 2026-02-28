'use server';

import { db, admin } from '@/lib/firebase';
import { QuoteRequestFormData, serviceTypeLabels } from '@/components/quote-form';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

// Initialisation ultra-sécurisée pour le build
const apiKey = process.env.RESEND_API_KEY || '';
const resend = (apiKey && apiKey.startsWith('re_')) ? new Resend(apiKey) : null;

export type QuoteStatus = 'pending' | 'accepted' | 'refused' | 'invoiced' | 'converted';

export interface Quote extends Omit<QuoteRequestFormData, 'moveDate'> {
  id: string;
  moveDate: string; // ISO string
  quote: number;
  status: QuoteStatus;
  createdAt: string; // ISO string
}

const PRIMARY_COLOR = '#00ad9f';

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
    const formattedDate = new Date(quoteData.moveDate).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    console.log('Quote saved with ID: ', quoteId);

    if (resend) {
      try {
        const serviceLabel = serviceTypeLabels[quoteData.serviceType as keyof typeof serviceTypeLabels];

        await resend.emails.send({
          from: 'DemDuVexin <contact@demenagementduvexin.fr>',
          to: 'mantalutamarinciro@gmail.com',
          subject: `⚡️ Nouveau Devis : ${quoteData.clientName}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background-color: ${PRIMARY_COLOR}; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">Nouveau Devis Reçu</h1>
              </div>
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Vous avez reçu une nouvelle demande de devis via le site internet.</p>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                  <p><strong>Client :</strong> ${quoteData.clientName}</p>
                  <p><strong>Email :</strong> ${quoteData.clientEmail}</p>
                  <p><strong>Tél :</strong> ${quoteData.clientPhone || 'Non renseigné'}</p>
                </div>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px;">
                  <p><strong>Itinéraire :</strong> ${quoteData.originAddress} ➔ ${quoteData.destinationAddress}</p>
                  <p><strong>Volume :</strong> ${quoteData.volume} m³</p>
                  <p><strong>Formule :</strong> ${serviceLabel}</p>
                </div>
              </div>
            </div>
          `
        });

        await resend.emails.send({
          from: 'Déménagement du Vexin <contact@demenagementduvexin.fr>',
          to: quoteData.clientEmail,
          subject: `Confirmation de votre demande de devis - DemDuVexin`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="padding: 40px 30px; text-align: center;">
                <h1 style="color: ${PRIMARY_COLOR};">Merci de votre confiance</h1>
                <p>Bonjour ${quoteData.clientName}, nous avons bien reçu votre demande pour le ${formattedDate}.</p>
                <p>Un expert analyse vos informations et vous recevrez votre devis sous 24h ouvrées.</p>
              </div>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
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
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                moveDate: (data.moveDate as admin.firestore.Timestamp).toDate().toISOString(),
                createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(), 
            } as Quote;
        });
    } catch (error) {
        console.error('Error fetching quotes: ', error);
        throw new Error('Failed to fetch quotes.');
    }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
    try {
        const docRef = db.collection('quotes').doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) return null;
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
    await db.collection('quotes').doc(id).update({ status });
  } catch (error) {
    console.error('Error updating quote status: ', error);
    throw new Error('Failed to update quote status.');
  }
}

export async function updateQuote(id: string, data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate: string }): Promise<void> {
    try {
        await db.collection('quotes').doc(id).update({
            ...data,
            moveDate: Timestamp.fromDate(new Date(data.moveDate))
        });
    } catch (error) {
        console.error('Error updating quote: ', error);
        throw new Error('Failed to update quote.');
    }
}

export async function deleteQuote(id: string): Promise<void> {
  try {
    await db.collection('quotes').doc(id).delete();
  } catch (error) {
    console.error('Error deleting quote: ', error);
    throw new Error('Failed to delete quote.');
  }
}
