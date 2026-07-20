'use server';

import { db, admin } from '@/lib/firebase';
import type { Quote } from '@/types/quote';
import { syncCustomerFromBooking } from './customerService';
import { Resend } from 'resend';

const ADMIN_RECIPIENT_EMAIL = 'contact@demenagementduvexin.fr';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || ADMIN_RECIPIENT_EMAIL;
const apiKey = process.env.RESEND_API_KEY || '';
const resend = apiKey && apiKey.startsWith('re_') ? new Resend(apiKey) : null;

const { Timestamp } = admin.firestore;

export type BookingStatus =
  | 'Programmé'
  | 'En route'
  | 'Arrivé chez le client'
  | 'En cours'
  | 'Terminé'
  | 'Annulé'
  | 'Facturé';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  originAddress: string;
  destinationAddress: string;
  moveDate: string;
  total: number;
  volume?: number;
  distance?: number;
  details?: string;
  serviceType?: "eco" | "standard" | "comfort" | "luxury" | "basic" | "full" | "premium";
  status: BookingStatus;
  createdAt: string;
  quoteId: string;
  assignedTeam?: string | null;
  assignedTeamId?: string | null;
  assignedVehicleId?: string | null;
  assignedVehicleRegistration?: string | null;
}

function isAuthCredentialError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 16;
}
function mapDocToBooking(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Booking {
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
      : new Date().toISOString(),
    total: Number(data.total ?? 0),
    volume: data.volume != null ? Number(data.volume) : undefined,
    serviceType: data.serviceType ?? undefined,
    status: (data.status ?? 'Programmé') as BookingStatus,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
    quoteId: data.quoteId ?? '',
    assignedTeam: data.assignedTeam ?? null,
    assignedTeamId: data.assignedTeamId ?? null,
    assignedVehicleId: data.assignedVehicleId ?? null,
    assignedVehicleRegistration: data.assignedVehicleRegistration ?? null,
  };
}

export async function createBookingFromQuote(quote: Quote): Promise<{ id: string }> {
  if (!db) throw new Error("Base de données non disponible.");
  
  try {
    if (!quote.moveDate) {
      throw new Error('Le devis ne contient pas de date de déménagement.');
    }

    const parsedMoveDate = new Date(quote.moveDate);
    if (Number.isNaN(parsedMoveDate.getTime())) {
      throw new Error('La date du devis est invalide.');
    }

    const existingBookingSnapshot = await db
      .collection('bookings')
      .where('quoteId', '==', quote.id)
      .limit(1)
      .get();

    if (!existingBookingSnapshot.empty) {
      return { id: existingBookingSnapshot.docs[0].id };
    }

    const batch = db.batch();
    const newBookingRef = db.collection('bookings').doc();

    const newBookingData = {
      clientName: quote.clientName,
      clientEmail: quote.clientEmail,
      clientPhone: quote.clientPhone ?? null,
      originAddress: quote.originAddress,
      destinationAddress: quote.destinationAddress,
      moveDate: Timestamp.fromDate(parsedMoveDate),
      total: Number(quote.quote ?? 0),
      volume: quote.volume ?? null,
      serviceType: quote.serviceType ?? null,
      status: 'Programmé' as BookingStatus,
      quoteId: quote.id,
      createdAt: Timestamp.now(),
      assignedTeam: null,
      assignedTeamId: null,
      assignedVehicleId: null,
      assignedVehicleRegistration: null,
    };

    batch.set(newBookingRef, newBookingData);

    const quoteRef = db.collection('quotes').doc(quote.id);
    batch.update(quoteRef, { status: 'Accepté' });

    await batch.commit();

    void syncCustomerFromBooking({
      name: quote.clientName,
      email: quote.clientEmail,
      phone: quote.clientPhone,
      amount: quote.quote,
      date: quote.moveDate,
    });

    return { id: newBookingRef.id };
  } catch (error) {
    console.error('Error creating booking from quote: ', error);
    throw new Error('Failed to create booking.');
  }
}

export async function getBookings(): Promise<Booking[]> {
  if (!db) return [];
  try {
    const querySnapshot = await db
      .collection('bookings')
      .orderBy('moveDate', 'desc')
      .get();

    return querySnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => mapDocToBooking(doc));
  } catch (error) {
    if (isAuthCredentialError(error)) {
      console.warn('Error fetching bookings: Firebase Admin credentials invalides en local. Agenda vide utilise.');
      return [];
    }

    console.error('Error fetching bookings: ', error);
    throw new Error('Failed to fetch bookings.');
  }
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (!db) return null;
  try {
    const docSnap = await db.collection('bookings').doc(id).get();
    if (!docSnap.exists) return null;
    return mapDocToBooking(docSnap);
  } catch (error) {
    console.error('Error fetching booking by ID: ', error);
    throw new Error('Failed to fetch booking.');
  }
}

export async function getBookingsByTeam(teamId: string): Promise<Booking[]> {
  if (!db) return [];
  try {
    const querySnapshot = await db
      .collection('bookings')
      .where('assignedTeamId', '==', teamId)
      .where('status', 'in', [
        'Programmé',
        'En route',
        'Arrivé chez le client',
        'En cours',
      ])
      .orderBy('moveDate', 'asc')
      .get();

    return querySnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => mapDocToBooking(doc));
  } catch (error) {
    console.error(`Error fetching bookings for team ${teamId}:`, error);
    throw new Error('Failed to fetch team bookings.');
  }
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<void> {
  if (!db) return;
  try {
    await db.collection('bookings').doc(id).update({ status });
  } catch (error) {
    console.error('Error updating booking status: ', error);
    throw new Error('Failed to update booking status.');
  }
}

export async function assignTeamToBooking(
  bookingId: string,
  teamId: string,
  teamName: string
): Promise<void> {
  if (!db) return;
  try {
    await db.collection('bookings').doc(bookingId).update({
      assignedTeamId: teamId,
      assignedTeam: teamName,
    });
  } catch (error) {
    console.error('Error assigning team to booking: ', error);
    throw new Error('Failed to assign team to booking.');
  }
}

export async function assignVehicleToBooking(
  bookingId: string,
  vehicleId: string,
  vehicleRegistration: string
): Promise<void> {
  if (!db) return;
  try {
    await db.collection('bookings').doc(bookingId).update({
      assignedVehicleId: vehicleId,
      assignedVehicleRegistration: vehicleRegistration,
    });
  } catch (error) {
    console.error('Error assigning vehicle to booking: ', error);
    throw new Error('Failed to assign vehicle to booking.');
  }
}

export async function sendReminderEmailDirectly(
  bookingId: string,
  subject: string,
  htmlBody: string
): Promise<void> {
  if (!db) throw new Error("Base de données non disponible.");
  
  const bookingSnap = await db.collection('bookings').doc(bookingId).get();
  if (!bookingSnap.exists) throw new Error("Réservation introuvable.");
  const booking = bookingSnap.data()!;
  
  if (!resend) throw new Error("Service d'envoi d'e-mail (Resend) non configuré.");
  const clientEmail = booking.clientEmail?.trim();
  if (!clientEmail) throw new Error("L'e-mail du client est manquant.");

  try {
    const { data, error } = await resend.emails.send({
      from: `Déménagement Du Vexin <${FROM_EMAIL}>`,
      to: [clientEmail],
      replyTo: ADMIN_RECIPIENT_EMAIL,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
            .header { background-color: #0f172a; padding: 30px; text-align: center; border-bottom: 4px solid #00ad9f; }
            .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; }
            .content { padding: 40px 30px; font-size: 15px; line-height: 1.6; color: #475569; }
            .footer { background-color: #f8fafc; padding: 25px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Déménagement Du Vexin</h1>
            </div>
            <div class="content">
              ${htmlBody.replace(/\n/g, '<br/>')}
            </div>
            <div class="footer">
              <strong>Déménagement Du Vexin</strong><br/>
              Votre partenaire mobilité au quotidien<br/><br/>
              Si vous avez des questions, répondez directement à cet e-mail.
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error("Resend reminder email error:", error);
      throw new Error(error.message || "L'envoi du mail a échoué.");
    }

    console.log("Reminder email sent successfully:", bookingId, data?.id);
  } catch (error) {
    console.error("Error in sendReminderEmailDirectly:", error);
    throw error instanceof Error ? error : new Error("Échec de l'envoi de l'e-mail de rappel.");
  }
}

