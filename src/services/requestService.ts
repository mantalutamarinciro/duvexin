'use server';

import { db, admin } from '@/lib/firebase';
import { Resend } from 'resend';
import { syncCustomerFromRequest } from '@/services/customerService';

const { Timestamp } = admin.firestore;

const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'contact@demenagementduvexin.fr';
const ADMIN_RECIPIENT_EMAIL = process.env.ADMIN_RECIPIENT_EMAIL || 'contact@demenagementduvexin.fr';
const BRAND_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Demenagement du Vexin';

export type RequestStatus = string;

export interface MoveRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate?: string;
  volume: number;
  details?: string;
  status: RequestStatus;
  createdAt: string;
}

export type CreateRequestData = Omit<MoveRequest, 'id' | 'status' | 'createdAt'>;

function isAuthCredentialError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 16;
}
function formatDate(value?: string) {
  if (!value) return 'Non precisee';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

function escapeHtml(value?: string | number) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function removeUndefinedValues<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined)
  ) as Partial<T>;
}


function buildSummaryRows(data: CreateRequestData, requestId: string) {
  const rows = [
    ['Reference', requestId.slice(0, 8).toUpperCase()],
    ['Client', data.clientName],
    ['Email', data.clientEmail],
    ['Telephone', data.clientPhone || 'Non renseigne'],
    ['Depart', data.originAddress],
    ['Arrivee', data.destinationAddress],
    ['Date souhaitee', formatDate(data.moveDate)],
    ['Volume estime', `${data.volume || 0} m3`],
  ];

  if (data.details) {
    rows.push(['Details', data.details]);
  }

  return rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:10px 0;color:#64748b;font-size:14px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:10px 0;color:#0f172a;font-size:14px;font-weight:700;text-align:right;vertical-align:top;">${escapeHtml(value)}</td>
      </tr>
    `)
    .join('');
}

function emailLayout(title: string, intro: string, content: string) {
  return `
    <!doctype html>
    <html>
      <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <div style="max-width:640px;margin:32px auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
          <div style="background:#0f172a;padding:28px 32px;border-bottom:4px solid #00ad9f;">
            <div style="color:#ffffff;font-size:22px;font-weight:800;">${escapeHtml(BRAND_NAME)}</div>
            <div style="color:#94a3b8;font-size:13px;margin-top:8px;">${escapeHtml(title)}</div>
          </div>
          <div style="padding:32px;">
            <p style="font-size:16px;line-height:1.6;margin:0 0 24px;color:#334155;">${escapeHtml(intro)}</p>
            ${content}
          </div>
          <div style="background:#f8fafc;padding:22px 32px;color:#64748b;font-size:12px;line-height:1.5;border-top:1px solid #e2e8f0;">
            ${escapeHtml(BRAND_NAME)} - message automatique.
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildAdminEmail(data: CreateRequestData, requestId: string) {
  return emailLayout(
    'Nouvelle demande de devis',
    'Une nouvelle demande vient d etre envoyee depuis le site. Elle est deja disponible dans le backoffice.',
    `
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">${buildSummaryRows(data, requestId)}</table>
      <div style="text-align:center;margin-top:26px;">
        <a href="https://demenagementduvexin.fr/dashboard/requests" style="display:inline-block;background:#00ad9f;color:#ffffff;text-decoration:none;padding:13px 22px;border-radius:999px;font-weight:800;">Ouvrir le backoffice</a>
      </div>
    `
  );
}

function buildClientEmail(data: CreateRequestData, requestId: string) {
  return emailLayout(
    'Votre demande de devis est bien recue',
    `Bonjour ${data.clientName}, nous avons bien recu votre demande de devis. Un conseiller va etudier votre projet et revenir vers vous rapidement.`,
    `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin-bottom:24px;">
        <div style="font-size:13px;color:#64748b;margin-bottom:6px;">Reference de votre demande</div>
        <div style="font-size:22px;font-weight:900;color:#0f172a;">#${escapeHtml(requestId.slice(0, 8).toUpperCase())}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">${buildSummaryRows(data, requestId)}</table>
      <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;">Si une information doit etre completee, vous pouvez repondre directement a cet e-mail ou nous contacter a ${escapeHtml(ADMIN_RECIPIENT_EMAIL)}.</p>
    `
  );
}

async function notifyNewRequest(data: CreateRequestData, requestId: string) {
  if (!resend) {
    console.warn('Resend is not configured. Quote request emails were not sent.');
    return;
  }

  const from = `${BRAND_NAME} <${FROM_EMAIL}>`;
  const shortRef = requestId.slice(0, 8).toUpperCase();

  const results = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [ADMIN_RECIPIENT_EMAIL],
      replyTo: data.clientEmail,
      subject: `Nouvelle demande de devis - ${data.clientName} - ${shortRef}`,
      html: buildAdminEmail(data, requestId),
    }),
    resend.emails.send({
      from,
      to: [data.clientEmail],
      replyTo: ADMIN_RECIPIENT_EMAIL,
      subject: `Votre demande de devis ${BRAND_NAME} - ${shortRef}`,
      html: buildClientEmail(data, requestId),
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(index === 0 ? 'Failed to send admin quote request email:' : 'Failed to send client quote request email:', result.reason);
    }
  });
}

export async function createRequest(data: CreateRequestData): Promise<{ id: string }> {
  try {
    if (!db) throw new Error('Database not initialized');
    const newRequestRef = db.collection('requests').doc();
    await newRequestRef.set({
      ...removeUndefinedValues(data),
      status: 'À traiter',
      createdAt: Timestamp.now(),
    });

    try {
      await syncCustomerFromRequest({
        name: data.clientName,
        email: data.clientEmail,
        phone: data.clientPhone,
      });
    } catch (syncError) {
      console.error('Failed to sync customer profile from request:', syncError);
    }

    try {
      await notifyNewRequest(data, newRequestRef.id);
    } catch (notificationError) {
      console.error('Quote request saved but notification emails failed:', notificationError);
    }

    return { id: newRequestRef.id };
  } catch (error) {
    console.error("Error creating request:", error);
    throw new Error("Failed to create request.");
  }
}

export async function getRequests(): Promise<MoveRequest[]> {
  try {
    if (!db) return [];
    const snapshot = await db.collection('requests').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      let status = data.status || 'À traiter';

      // Self-healing pour corriger les statuts sans accent restants en base
      if (status === 'A traiter') {
        status = 'À traiter';
        db.collection('requests').doc(doc.id).update({ status: 'À traiter' }).catch(err => {
          console.error(`Failed to self-heal status for request ${doc.id}:`, err);
        });
      }

      return {
        id: doc.id,
        ...data,
        status,
        moveDate: data.moveDate?.toDate
          ? (data.moveDate as admin.firestore.Timestamp).toDate().toISOString()
          : data.moveDate?._seconds
            ? new Date(data.moveDate._seconds * 1000).toISOString()
            : data.moveDate
              ? new Date(data.moveDate).toISOString()
              : undefined,
        createdAt: data.createdAt?.toDate 
          ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
          : data.createdAt?._seconds 
            ? new Date(data.createdAt._seconds * 1000).toISOString()
            : data.createdAt 
              ? new Date(data.createdAt).toISOString() 
              : new Date().toISOString(),
      } as MoveRequest;
    });
  } catch (error) {
    if (isAuthCredentialError(error)) {
      console.warn("Error fetching requests: Firebase Admin credentials invalides en local. Liste vide utilisee.");
      return [];
    }

    console.error("Error fetching requests:", error);
    throw new Error("Failed to fetch requests.");
  }
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
  try {
    if (!db) return;
    const requestRef = db.collection('requests').doc(id);
    await requestRef.update({ status });
  } catch (error) {
    console.error('Error updating request status:', error);
    throw new Error('Failed to update request status.');
  }
}

export async function updateRequestVolume(id: string, volume: number, details?: string): Promise<void> {
  try {
    if (!db) return;
    const requestRef = db.collection('requests').doc(id);
    const updateData: any = { volume };
    if (details) {
      updateData.details = details;
    }
    await requestRef.update(updateData);
  } catch (error) {
    console.error('Error updating request volume:', error);
    throw new Error('Failed to update request volume.');
  }
}
