'use server';

import { db, admin } from '@/lib/firebase';
import { Resend } from 'resend';
import { getQuoteById } from './quoteService';

const { Timestamp } = admin.firestore;
const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;

export type InvoiceStatus = 'Brouillon' | 'Émise' | 'Partiellement payée' | 'Payée' | 'En retard';

export interface Invoice {
  id: string;
  quoteId: string;
  clientName: string;
  amountTTC: number;
  amountPaid: number;
  dueDate: string; // ISO String
  status: InvoiceStatus;
  createdAt: string; // ISO String
}

export type CreateInvoiceData = Omit<Invoice, 'id' | 'createdAt' | 'status' | 'amountPaid'>;

export async function createInvoice(data: CreateInvoiceData): Promise<{ id: string }> {
  try {
    const newInvoiceRef = db.collection('invoices').doc();
    await newInvoiceRef.set({
      ...data,
      amountPaid: 0,
      status: 'Brouillon' as InvoiceStatus,
      createdAt: Timestamp.now(),
      dueDate: Timestamp.fromDate(new Date(data.dueDate)),
    });
    return { id: newInvoiceRef.id };
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice.");
  }
}

export async function getInvoices(): Promise<Invoice[]> {
  try {
    const snapshot = await db.collection('invoices').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        dueDate: (data.dueDate as admin.firestore.Timestamp).toDate().toISOString(),
      } as Invoice;
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function updateInvoicePayment(id: string, newAmountPaid: number, totalAmount: number): Promise<void> {
  try {
    let status: InvoiceStatus = 'Partiellement payée';
    if (newAmountPaid >= totalAmount) {
      status = 'Payée';
    } else if (newAmountPaid <= 0) {
      status = 'Émise';
    }

    const invoiceRef = db.collection('invoices').doc(id);
    await invoiceRef.update({ 
        amountPaid: newAmountPaid,
        status 
    });
  } catch (error) {
    console.error('Error updating invoice payment:', error);
    throw new Error('Failed to update invoice payment.');
  }
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
  try {
    const invoiceRef = db.collection('invoices').doc(id);
    await invoiceRef.update({ status });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    throw new Error('Failed to update invoice status.');
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  if (!db) return null;
  try {
    const docSnap = await db.collection('invoices').doc(id).get();
    if (!docSnap.exists) return null;
    
    const data = docSnap.data()!;
    return {
        id: docSnap.id,
        ...data,
        createdAt: (data.createdAt as admin.firestore.Timestamp).toDate().toISOString(),
        dueDate: (data.dueDate as admin.firestore.Timestamp).toDate().toISOString(),
    } as Invoice;
  } catch (error) {
    console.error('Error fetching invoice by ID:', error);
    return null;
  }
}

export async function sendInvoiceByEmail(invoiceId: string, base64Pdf: string): Promise<void> {
  const invoice = await getInvoiceById(invoiceId);
  if (!invoice) throw new Error("Facture introuvable");
  
  const quote = await getQuoteById(invoice.quoteId);
  if (!quote) throw new Error("Devis associé introuvable");
  
  if (!resend) throw new Error("Clé API Resend non configurée");
  if (!quote.clientEmail) throw new Error("Email du client manquant");

  try {
    const pdfBuffer = Buffer.from(base64Pdf.split(',')[1] || base64Pdf, 'base64');
    
    // Formatting variables
    const shortRef = invoiceId.substring(0, 5).toUpperCase();
    const invoiceNumber = `FAC-${new Date().getFullYear()}-${shortRef}`;
    
    await resend.emails.send({
      from: 'Déménagement Du Vexin <contact@demenagementduvexin.fr>', 
      to: [quote.clientEmail],
      subject: `Votre facture ${invoiceNumber} - Déménagement du Vexin`,
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
            .summary-label { color: #64748b; font-weight: 500; }
            .summary-value { color: #0f172a; font-weight: 600; text-align: right; }
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
              <p>Votre Facture</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              <h2 class="greeting">Bonjour ${invoice.clientName},</h2>
              
              <p class="message">
                Nous vous prions de bien vouloir trouver en <strong>pièce jointe de cet e-mail</strong> votre facture au format PDF, correspondant à notre prestation de déménagement.
              </p>
              
              <!-- Summary Box -->
              <div class="summary-box">
                <div class="summary-row">
                  <span class="summary-label">Numéro de facture :</span>
                  <span class="summary-value">${invoiceNumber}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Montant Total :</span>
                  <span class="summary-value">${invoice.amountTTC.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
                <div class="summary-row">
                  <span class="summary-label">Reste à payer :</span>
                  <span class="summary-value" style="color: #00ad9f;">${(invoice.amountTTC - invoice.amountPaid).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                </div>
              </div>
              
              <p class="message">
                Nous restons à votre entière disposition pour toute question relative à cette facture.
                Merci de votre confiance.
              </p>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p>
                <strong>Déménagement Du Vexin</strong><br/>
                L'excellence pour votre mobilité<br/><br/>
                Cet e-mail a été envoyé automatiquement.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: `${invoiceNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (invoice.status === 'Brouillon') {
        await updateInvoiceStatus(invoiceId, 'Émise');
    }
  } catch (error) {
    console.error('Error sending invoice email:', error);
    throw new Error('Failed to send invoice email.');
  }
}
