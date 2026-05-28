'use server';

import { db, admin } from '@/lib/firebase';
import type { QuoteRequestFormData, Quote, QuoteStatus } from '@/types/quote';
import { serviceTypeLabels } from '@/lib/quote-constants';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

const QUOTES_COLLECTION = 'quotes';
const ADMIN_RECIPIENT_EMAIL = 'contact@demenagementduvexin.fr';

const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;

const PRIMARY_COLOR = '#00ad9f';
const SECONDARY_COLOR = '#0f172a';

type SaveQuoteInput = Omit<QuoteRequestFormData, 'moveDate'> & {
  moveDate?: string;
  quote: number;
};

function toFirestoreMoveDate(moveDate?: string | null) {
  if (!moveDate) return null;

  const parsed = new Date(moveDate);
  if (Number.isNaN(parsed.getTime())) return null;

  return Timestamp.fromDate(parsed);
}

function mapDocToQuote(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Quote {
  const data = doc.data()!;

  return {
    id: doc.id,
    clientName: data.clientName ?? '',
    clientEmail: data.clientEmail ?? '',
    clientPhone: data.clientPhone ?? undefined,
    originAddress: data.originAddress ?? '',
    destinationAddress: data.destinationAddress ?? '',
    moveDate: data.moveDate
      ? (data.moveDate as admin.firestore.Timestamp).toDate().toISOString()
      : null,
    volume: Number(data.volume ?? 0),
    distance: Number(data.distance ?? 0),
    serviceType: data.serviceType ?? 'basic',
    details: data.details ?? undefined,
    quote: Number(data.quote ?? 0),
    status: (data.status ?? 'pending') as QuoteStatus,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function saveQuote(quoteData: SaveQuoteInput): Promise<{ id: string }> {
  try {
    const docRef = await db.collection(QUOTES_COLLECTION).add({
      ...quoteData,
      status: 'pending' as QuoteStatus,
      moveDate: toFirestoreMoveDate(quoteData.moveDate),
      createdAt: Timestamp.now(),
    });

    const formattedDate = quoteData.moveDate
      ? new Date(quoteData.moveDate).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : 'À définir';

    if (resend) {
      try {
        const serviceLabel =
          serviceTypeLabels[
            quoteData.serviceType as keyof typeof serviceTypeLabels
          ] ||
          quoteData.serviceType ||
          'Standard';

        await resend.emails.send({
          from: 'DemDuVexin <contact@demenagementduvexin.fr>',
          to: ADMIN_RECIPIENT_EMAIL,
          subject: `⚡️ Nouveau Devis : ${quoteData.clientName}`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
              <div style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
                <div style="background-color: ${PRIMARY_COLOR}; padding: 40px 30px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em;">Nouveau Devis Reçu</h1>
                  <p style="color: rgba(255,255,255,0.9); margin-top: 10px; font-size: 16px;">Une nouvelle demande vient d'arriver via le site.</p>
                </div>
                
                <div style="padding: 30px;">
                  <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 15px;">Informations Client</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9;">
                      <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>👤 Nom :</strong> ${quoteData.clientName}</p>
                      <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>✉️ Email :</strong> <a href="mailto:${quoteData.clientEmail}" style="color: ${PRIMARY_COLOR}; text-decoration: none;">${quoteData.clientEmail}</a></p>
                      <p style="margin: 0; font-size: 15px;"><strong>📞 Tél :</strong> ${quoteData.clientPhone || 'Non renseigné'}</p>
                    </div>
                  </div>

                  <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 15px;">Détails logistiques</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9;">
                      <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;"><strong>📍 Départ :</strong><br/>${quoteData.originAddress}</p>
                      <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 1.5;"><strong>🏁 Arrivée :</strong><br/>${quoteData.destinationAddress}</p>
                      <div style="border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 10px;">
                        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>📦 Volume :</strong> ${quoteData.volume || '?'} m³</p>
                        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>🛣️ Distance :</strong> ${quoteData.distance || '?'} km</p>
                        <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>🗓️ Date :</strong> ${formattedDate}</p>
                        <p style="margin: 0; font-size: 14px;"><strong>✨ Formule :</strong> ${serviceLabel}</p>
                      </div>
                    </div>
                  </div>

                  ${quoteData.details ? `
                  <div style="margin-bottom: 30px;">
                    <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 15px;">Notes complémentaires</h2>
                    <div style="background-color: #fff7ed; padding: 20px; border-radius: 16px; border: 1px solid #ffedd5; color: #9a3412; font-size: 14px; line-height: 1.6;">
                      ${quoteData.details}
                    </div>
                  </div>
                  ` : ''}

                  <div style="text-align: center; margin-top: 40px;">
                    <a href="https://demenagementduvexin.fr/dashboard/quotes" style="background-color: ${PRIMARY_COLOR}; color: #ffffff; padding: 18px 35px; border-radius: 100px; text-decoration: none; font-weight: 800; font-size: 16px; display: inline-block;">
                      Traiter la demande sur le Dashboard
                    </a>
                  </div>
                </div>
                
                <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Généré par Déménagement du Vexin</p>
                </div>
              </div>
            </div>
          `,
        });

        await resend.emails.send({
          from: 'Déménagement du Vexin <contact@demenagementduvexin.fr>',
          to: quoteData.clientEmail,
          subject: `Confirmation de votre demande de devis - DemDuVexin`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
              <div style="background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
                <div style="background-color: #ffffff; padding: 40px 30px; text-align: center; border-bottom: 1px solid #f1f5f9;">
                  <h1 style="color: ${PRIMARY_COLOR}; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.025em;">Merci de votre confiance !</h1>
                  <p style="color: #64748b; margin-top: 10px; font-size: 16px;">Nous avons bien reçu votre demande de devis.</p>
                </div>
                
                <div style="padding: 35px 30px;">
                  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #475569;">
                    Bonjour <strong>${quoteData.clientName}</strong>,<br/><br/>
                    Nous vous confirmons la bonne réception de votre demande pour votre déménagement. 
                    Un conseiller expert analyse actuellement vos informations pour vous proposer l'offre la plus adaptée.
                  </p>

                  <div style="background-color: #f8fafc; padding: 25px; border-radius: 20px; margin-bottom: 35px; border: 1px solid #f1f5f9;">
                    <h2 style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 15px; margin-top: 0;">Récapitulatif de votre projet</h2>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #1e293b;"><strong>📍 Départ :</strong> ${quoteData.originAddress}</p>
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #1e293b;"><strong>🏁 Arrivée :</strong> ${quoteData.destinationAddress}</p>
                  </div>

                  <div style="margin-bottom: 35px;">
                    <h2 style="font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 20px;">Quelle est la suite ?</h2>
                    <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                      <div style="background-color: ${PRIMARY_COLOR}; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; margin-right: 12px; flex-shrink: 0;">1</div>
                      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Étude technique</strong> : Nous vérifions les accès et les possibilités de transport.</p>
                    </div>
                    <div style="margin-bottom: 15px; display: flex; align-items: flex-start;">
                      <div style="background-color: ${PRIMARY_COLOR}; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; margin-right: 12px; flex-shrink: 0;">2</div>
                      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Contact expert</strong> : Un conseiller vous appellera pour estimer le volume et affiner les détails techniques.</p>
                    </div>
                    <div style="display: flex; align-items: flex-start;">
                      <div style="background-color: ${PRIMARY_COLOR}; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; margin-right: 12px; flex-shrink: 0;">3</div>
                      <p style="margin: 0; font-size: 14px; color: #475569;"><strong>Devis sous 24h</strong> : Vous recevrez votre proposition ferme directement par email.</p>
                    </div>
                  </div>

                  <p style="font-size: 14px; color: #64748b; font-style: italic; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                    Besoin d'une réponse urgente ? Contactez-nous au <a href="tel:+33130751235" style="color: ${PRIMARY_COLOR}; font-weight: bold; text-decoration: none;">01 30 75 12 35</a>.
                  </p>
                </div>
                
                <div style="background-color: ${SECONDARY_COLOR}; padding: 30px; text-align: center;">
                  <p style="margin: 0; font-size: 15px; color: #ffffff; font-weight: 800; letter-spacing: 0.02em;">L'équipe Déménagement du Vexin</p>
                  <p style="margin: 5px 0 0 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Artisans de votre mobilité</p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification emails:', emailError);
      }
    }

    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving quote:', error);
    throw new Error('Failed to save quote.');
  }
}

export async function getQuotes(): Promise<Quote[]> {
  try {
    const querySnapshot = await db
      .collection(QUOTES_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return querySnapshot.docs.map(mapDocToQuote);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw new Error('Failed to fetch quotes.');
  }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  try {
    const docSnap = await db.collection(QUOTES_COLLECTION).doc(id).get();
    if (!docSnap.exists) return null;
    return mapDocToQuote(docSnap);
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    throw new Error('Failed to fetch quote.');
  }
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).update({ status });
  } catch (error) {
    console.error('Error updating quote status:', error);
    throw new Error('Failed to update quote status.');
  }
}

export async function updateQuote(
  id: string,
  data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate?: string | null }
): Promise<void> {
  try {
    const updateData: Record<string, unknown> = { ...data };

    if ('moveDate' in data) {
      updateData.moveDate = toFirestoreMoveDate(data.moveDate ?? null);
    }

    await db.collection(QUOTES_COLLECTION).doc(id).update(updateData);
  } catch (error) {
    console.error('Error updating quote:', error);
    throw new Error('Failed to update quote.');
  }
}

export async function deleteQuote(id: string): Promise<void> {
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).delete();
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw new Error('Failed to delete quote.');
  }
}
