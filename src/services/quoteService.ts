
'use server';

import { db, admin } from '@/lib/firebase';
import { QuoteRequestFormData, serviceTypeLabels } from '@/components/quote-form';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

// Initialisation ultra-sécurisée pour le build
// Si la clé est absente ou invalide, on n'instancie pas Resend pour éviter de faire planter le build Next.js
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

    // Envoi des emails via Resend uniquement si configuré avec une clé valide
    if (resend) {
      try {
        const serviceLabel = serviceTypeLabels[quoteData.serviceType as keyof typeof serviceTypeLabels];

        // 1. NOTIFICATION ADMIN
        await resend.emails.send({
          from: 'DemDuVexin <contact@demenagementduvexin.fr>',
          to: 'mantalutamarinciro@gmail.com',
          subject: `⚡️ Nouveau Devis : ${quoteData.clientName}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="background-color: ${PRIMARY_COLOR}; padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">Nouveau Devis Reçu</h1>
              </div>
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Vous avez reçu une nouvelle demande de devis via le site internet.</p>
                
                <h3 style="color: ${PRIMARY_COLOR}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 15px;">Informations Client</h3>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                  <p style="margin: 0 0 10px 0;"><strong>Client :</strong> ${quoteData.clientName}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Email :</strong> ${quoteData.clientEmail}</p>
                  <p style="margin: 0;"><strong>Tél :</strong> ${quoteData.clientPhone || 'Non renseigné'}</p>
                </div>

                <h3 style="color: ${PRIMARY_COLOR}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 15px;">Détails du Projet</h3>
                <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 40px;">
                  <p style="margin: 0 0 10px 0;"><strong>Départ :</strong> ${quoteData.originAddress}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Arrivée :</strong> ${quoteData.destinationAddress}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Date :</strong> ${formattedDate}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Volume :</strong> ${quoteData.volume} m³</p>
                  <p style="margin: 0;"><strong>Formule :</strong> ${serviceLabel}</p>
                </div>

                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://demenagementduvexin.fr'}/dashboard/quote/${quoteId}" 
                     style="background-color: ${PRIMARY_COLOR}; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; display: inline-block; box-shadow: 0 10px 15px -3px rgba(0, 169, 157, 0.3);">
                     Traiter la demande
                  </a>
                </div>
              </div>
              <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
                Ceci est une notification automatique générée par votre plateforme DemDuVexin.
              </div>
            </div>
          `
        });

        // 2. CONFIRMATION CLIENT
        await resend.emails.send({
          from: 'Déménagement du Vexin <contact@demenagementduvexin.fr>',
          to: quoteData.clientEmail,
          subject: `Confirmation de votre demande de devis - DemDuVexin`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
              <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                <h1 style="color: ${PRIMARY_COLOR}; margin: 0; font-size: 28px; font-weight: 800;">Merci de votre confiance</h1>
              </div>
              <div style="padding: 40px 30px;">
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">Bonjour ${quoteData.clientName},</p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Nous avons bien reçu votre demande de devis pour votre déménagement prévu le <strong>${formattedDate}</strong>.</p>
                
                <div style="background-color: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid ${PRIMARY_COLOR};">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b;">Rappel de votre projet :</p>
                  <p style="margin: 0 0 5px 0;"><strong>Itinéraire :</strong> ${quoteData.originAddress} ➔ ${quoteData.destinationAddress}</p>
                  <p style="margin: 0;"><strong>Volume estimé :</strong> ${quoteData.volume} m³</p>
                </div>

                <div style="margin-bottom: 40px;">
                  <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 15px;">Quelle est la suite ?</h3>
                  <ul style="padding-left: 20px; color: #475569; line-height: 1.8;">
                    <li>Un de nos experts analyse actuellement vos informations.</li>
                    <li>Nous vous contacterons par téléphone si des précisions sont nécessaires.</li>
                    <li>Vous recevrez votre devis détaillé par e-mail sous <strong>24 heures ouvrées</strong>.</li>
                  </ul>
                </div>

                <p style="font-size: 14px; color: #64748b; text-align: center; margin-bottom: 0;">L'équipe Déménagement du Vexin reste à votre entière disposition.</p>
              </div>
              <div style="background-color: #f8fafc; padding: 30px; text-align: center;">
                <p style="margin: 0; font-weight: bold; color: #1e293b;">Déménagement du Vexin</p>
                <p style="margin: 5px 0 0 0; font-size: 13px; color: #64748b;">01 30 75 12 35 | contact@demenagementduvexin.fr</p>
              </div>
            </div>
          `
        });

        console.log('Dual notification emails sent successfully');
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
