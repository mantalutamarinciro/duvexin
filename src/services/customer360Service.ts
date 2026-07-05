'use server';

import { db, admin } from '@/lib/firebase';
import type { MoveRequest } from '@/services/requestService';
import type { Visit } from '@/services/visitService';
import type { Booking } from '@/services/bookingService';
import type { Invoice } from '@/services/invoiceService';
import type { Quote } from '@/types/quote';
import type { Customer } from '@/services/customerService';

type TimelineType = 'request' | 'visit' | 'quote' | 'booking' | 'invoice';

export interface Customer360TimelineItem {
  id: string;
  type: TimelineType;
  title: string;
  status?: string;
  date: string;
  description?: string;
  amount?: number;
  href?: string;
}

export interface Customer360Stage {
  label: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  nextActionLabel: string;
  nextActionHref: string;
}

export interface Customer360Data {
  identity: {
    name: string;
    email: string;
    phone?: string;
    customerId?: string;
    firstSeenAt?: string;
    lastActivityAt?: string;
    totalSpent: number;
    bookingsCount: number;
  };
  stage: Customer360Stage;
  requests: MoveRequest[];
  visits: Visit[];
  quotes: Quote[];
  bookings: Booking[];
  invoices: Invoice[];
  timeline: Customer360TimelineItem[];
}

function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof admin.firestore.Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    const maybeDate = (value as { toDate?: () => Date }).toDate?.();
    return maybeDate instanceof Date ? maybeDate.toISOString() : undefined;
  }
  const parsed = new Date(value as string);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getEmailCandidates(email: string) {
  const trimmed = email.trim();
  return Array.from(new Set([trimmed, normalizeEmail(trimmed)].filter(Boolean)));
}

function mapRequest(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): MoveRequest {
  const data = doc.data();
  return {
    id: doc.id,
    clientName: data.clientName ?? '',
    clientEmail: data.clientEmail ?? '',
    clientPhone: data.clientPhone ?? undefined,
    originAddress: data.originAddress ?? '',
    destinationAddress: data.destinationAddress ?? '',
    moveDate: toIsoDate(data.moveDate),
    volume: Number(data.volume ?? 0),
    details: data.details ?? undefined,
    status: data.status ?? 'A traiter',
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
  } as MoveRequest;
}

function mapVisit(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Visit {
  const data = doc.data();
  return {
    id: doc.id,
    commercialName: data.commercialName ?? '',
    clientName: data.clientName ?? '',
    clientAddress: data.clientAddress ?? '',
    visitDateTime: toIsoDate(data.visitDateTime) ?? new Date().toISOString(),
    type: data.type ?? 'domicile',
    details: data.details ?? '',
    status: data.status ?? 'Planifiee',
    quoteId: data.quoteId ?? undefined,
    requestId: data.requestId ?? undefined,
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
  } as Visit;
}

function mapQuote(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Quote {
  const data = doc.data();
  return {
    id: doc.id,
    clientName: data.clientName ?? '',
    clientEmail: data.clientEmail ?? '',
    clientPhone: data.clientPhone ?? undefined,
    originAddress: data.originAddress ?? '',
    destinationAddress: data.destinationAddress ?? '',
    moveDate: toIsoDate(data.moveDate) ?? null,
    volume: Number(data.volume ?? 0),
    distance: Number(data.distance ?? 0),
    serviceType: data.serviceType ?? 'basic',
    details: data.details ?? undefined,
    quote: Number(data.quote ?? 0),
    status: data.status ?? 'Chiffre',
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
  } as Quote;
}

function mapBooking(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Booking {
  const data = doc.data();
  return {
    id: doc.id,
    clientName: data.clientName ?? '',
    clientEmail: data.clientEmail ?? '',
    clientPhone: data.clientPhone ?? undefined,
    originAddress: data.originAddress ?? '',
    destinationAddress: data.destinationAddress ?? '',
    moveDate: toIsoDate(data.moveDate) ?? new Date().toISOString(),
    total: Number(data.total ?? 0),
    volume: data.volume != null ? Number(data.volume) : undefined,
    distance: data.distance != null ? Number(data.distance) : undefined,
    details: data.details ?? undefined,
    serviceType: data.serviceType ?? undefined,
    status: data.status ?? 'Programme',
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
    quoteId: data.quoteId ?? '',
    assignedTeam: data.assignedTeam ?? null,
    assignedTeamId: data.assignedTeamId ?? null,
    assignedVehicleId: data.assignedVehicleId ?? null,
    assignedVehicleRegistration: data.assignedVehicleRegistration ?? null,
  } as Booking;
}

function mapInvoice(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Invoice {
  const data = doc.data();
  return {
    id: doc.id,
    quoteId: data.quoteId ?? '',
    clientName: data.clientName ?? '',
    amountTTC: Number(data.amountTTC ?? 0),
    amountPaid: Number(data.amountPaid ?? 0),
    dueDate: toIsoDate(data.dueDate) ?? new Date().toISOString(),
    status: data.status ?? 'Brouillon',
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
  } as Invoice;
}

function mapCustomer(
  doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>
): Customer {
  const data = doc.data();
  return {
    id: doc.id,
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    email: data.email ?? '',
    phoneNumber: data.phoneNumber ?? undefined,
    totalSpent: Number(data.totalSpent ?? 0),
    bookingsCount: Number(data.bookingsCount ?? 0),
    lastBookingDate: toIsoDate(data.lastBookingDate),
    createdAt: toIsoDate(data.createdAt) ?? new Date().toISOString(),
  };
}

async function getByEmail<T>(
  collectionName: string,
  emailField: string,
  email: string,
  mapper: (doc: admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData>) => T
) {
  if (!db) return [];
  const results = new Map<string, T>();
  for (const candidate of getEmailCandidates(email)) {
    const snapshot = await db.collection(collectionName).where(emailField, '==', candidate).get();
    snapshot.docs.forEach((doc) => results.set(doc.id, mapper(doc)));
  }
  return Array.from(results.values());
}

async function getInvoicesForQuotes(quoteIds: string[]) {
  if (!db || quoteIds.length === 0) return [];
  const results: Invoice[] = [];
  for (let i = 0; i < quoteIds.length; i += 10) {
    const chunk = quoteIds.slice(i, i + 10);
    const snapshot = await db.collection('invoices').where('quoteId', 'in', chunk).get();
    results.push(...snapshot.docs.map(mapInvoice));
  }
  return results;
}

async function getVisitsForCustomer(requestIds: string[], clientName?: string) {
  if (!db) return [];
  const byId = new Map<string, Visit>();

  for (let i = 0; i < requestIds.length; i += 10) {
    const chunk = requestIds.slice(i, i + 10);
    if (chunk.length === 0) continue;
    const snapshot = await db.collection('visits').where('requestId', 'in', chunk).get();
    snapshot.docs.map(mapVisit).forEach((visit) => byId.set(visit.id, visit));
  }

  if (clientName) {
    const snapshot = await db.collection('visits').where('clientName', '==', clientName).get();
    snapshot.docs.map(mapVisit).forEach((visit) => byId.set(visit.id, visit));
  }

  return Array.from(byId.values());
}

function normalizeStatus(value?: string) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function statusIncludes(status: string | undefined, keywords: string[]) {
  const normalized = normalizeStatus(status);
  return keywords.some((keyword) => normalized.includes(keyword));
}
function buildStage(data: {
  requests: MoveRequest[];
  visits: Visit[];
  quotes: Quote[];
  bookings: Booking[];
  invoices: Invoice[];
}): Customer360Stage {
  const activeInvoice = data.invoices.find((invoice) => {
    const status = normalizeStatus(invoice.status);
    return !statusIncludes(status, ['payee', 'paid']);
  });
  if (activeInvoice) {
    return {
      label: 'Recouvrement',
      description: 'Une facture reste a suivre ou a encaisser.',
      priority: statusIncludes(activeInvoice.status, ['retard']) ? 'high' : 'medium',
      nextActionLabel: 'Voir les factures',
      nextActionHref: '/dashboard/invoices',
    };
  }

  const activeBooking = data.bookings.find((booking) => {
    const status = normalizeStatus(booking.status);
    return !statusIncludes(status, ['termine', 'annule', 'facture', 'cancelled', 'done']);
  });
  if (activeBooking) {
    return {
      label: 'Operation planifiee',
      description: 'Le dossier est gagne et doit etre pilote cote terrain.',
      priority: 'medium',
      nextActionLabel: 'Voir le planning',
      nextActionHref: '/dashboard/planning',
    };
  }

  const quoteToFollow = data.quotes.find((quote) =>
    statusIncludes(quote.status, ['envoye', 'attente', 'chiffre', 'priced', 'sent', 'pending'])
  );
  if (quoteToFollow) {
    return {
      label: 'Devis a suivre',
      description: 'Un devis existe et doit etre envoye, relance ou converti.',
      priority: statusIncludes(quoteToFollow.status, ['attente', 'pending']) ? 'high' : 'medium',
      nextActionLabel: 'Ouvrir le devis',
      nextActionHref: `/dashboard/quote/${quoteToFollow.id}`,
    };
  }

  const plannedVisit = data.visits.find((visit) =>
    statusIncludes(visit.status, ['planifiee', 'prevue', 'scheduled'])
  );
  if (plannedVisit) {
    return {
      label: 'Visite commerciale',
      description: 'Une visite est prevue ou doit etre transformee en devis.',
      priority: 'medium',
      nextActionLabel: 'Voir les visites',
      nextActionHref: '/dashboard/visits',
    };
  }

  const pendingRequest = data.requests.find((request) =>
    statusIncludes(request.status, ['traiter', 'pending', 'todo'])
  );
  if (pendingRequest) {
    return {
      label: 'Nouveau lead',
      description: 'La demande doit etre qualifiee rapidement.',
      priority: 'high',
      nextActionLabel: 'Traiter la demande',
      nextActionHref: '/dashboard/requests',
    };
  }

  return {
    label: 'Client actif',
    description: 'Le dossier est a jour. Surveiller les prochaines opportunites.',
    priority: 'low',
    nextActionLabel: 'Voir les clients',
    nextActionHref: '/dashboard/customers',
  };
}

function buildTimeline(data: {
  requests: MoveRequest[];
  visits: Visit[];
  quotes: Quote[];
  bookings: Booking[];
  invoices: Invoice[];
}) {
  const items: Customer360TimelineItem[] = [
    ...data.requests.map((request) => ({
      id: request.id,
      type: 'request' as const,
      title: 'Demande entrante',
      status: request.status,
      date: request.createdAt,
      description: `${request.originAddress} -> ${request.destinationAddress}`,
      href: '/dashboard/requests',
    })),
    ...data.visits.map((visit) => ({
      id: visit.id,
      type: 'visit' as const,
      title: 'Visite commerciale',
      status: visit.status,
      date: visit.visitDateTime,
      description: visit.clientAddress,
      href: '/dashboard/visits',
    })),
    ...data.quotes.map((quote) => ({
      id: quote.id,
      type: 'quote' as const,
      title: 'Devis',
      status: quote.status,
      date: quote.createdAt,
      amount: quote.quote,
      description: `${quote.volume} m3 - ${quote.distance} km`,
      href: `/dashboard/quote/${quote.id}`,
    })),
    ...data.bookings.map((booking) => ({
      id: booking.id,
      type: 'booking' as const,
      title: 'Demenagement',
      status: booking.status,
      date: booking.moveDate,
      amount: booking.total,
      description: `${booking.originAddress} -> ${booking.destinationAddress}`,
      href: '/dashboard/planning',
    })),
    ...data.invoices.map((invoice) => ({
      id: invoice.id,
      type: 'invoice' as const,
      title: 'Facture',
      status: invoice.status,
      date: invoice.createdAt,
      amount: invoice.amountTTC,
      description: `Reste a payer: ${Math.max(invoice.amountTTC - invoice.amountPaid, 0)} EUR`,
      href: '/dashboard/invoices',
    })),
  ];

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getCustomer360ByEmail(email: string): Promise<Customer360Data | null> {
  if (!db || !email) return null;

  const requestedEmail = email.trim();
  const normalizedEmail = normalizeEmail(requestedEmail);

  const [customers, requests, quotes, bookings] = await Promise.all([
    getByEmail('users', 'email', requestedEmail, mapCustomer),
    getByEmail('requests', 'clientEmail', requestedEmail, mapRequest),
    getByEmail('quotes', 'clientEmail', requestedEmail, mapQuote),
    getByEmail('bookings', 'clientEmail', requestedEmail, mapBooking),
  ]);

  const primaryCustomer = customers[0];
  const primaryRequest = requests[0];
  const primaryQuote = quotes[0];
  const primaryBooking = bookings[0];
  const displayName =
    [primaryCustomer?.firstName, primaryCustomer?.lastName].filter(Boolean).join(' ') ||
    primaryRequest?.clientName ||
    primaryQuote?.clientName ||
    primaryBooking?.clientName ||
    normalizedEmail;
  const knownEmail =
    primaryCustomer?.email ||
    primaryRequest?.clientEmail ||
    primaryQuote?.clientEmail ||
    primaryBooking?.clientEmail ||
    normalizedEmail;

  const requestIds = requests.map((request) => request.id);
  const quoteIds = Array.from(new Set([
    ...quotes.map((quote) => quote.id),
    ...bookings.map((booking) => booking.quoteId).filter(Boolean),
  ]));

  const [visits, invoices] = await Promise.all([
    getVisitsForCustomer(requestIds, displayName),
    getInvoicesForQuotes(quoteIds),
  ]);

  if (!primaryCustomer && requests.length === 0 && quotes.length === 0 && bookings.length === 0 && visits.length === 0 && invoices.length === 0) {
    return null;
  }

  const phone =
    primaryCustomer?.phoneNumber ||
    primaryRequest?.clientPhone ||
    primaryQuote?.clientPhone ||
    primaryBooking?.clientPhone;

  const timeline = buildTimeline({ requests, visits, quotes, bookings, invoices });
  const lastActivityAt = timeline[0]?.date || primaryCustomer?.lastBookingDate || primaryCustomer?.createdAt;
  const firstSeenAt = [...timeline]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.date || primaryCustomer?.createdAt;

  return {
    identity: {
      name: displayName,
      email: knownEmail,
      phone,
      customerId: primaryCustomer?.id,
      firstSeenAt,
      lastActivityAt,
      totalSpent:
        primaryCustomer?.totalSpent ??
        bookings.reduce((sum, booking) => sum + Number(booking.total || 0), 0),
      bookingsCount: primaryCustomer?.bookingsCount ?? bookings.length,
    },
    stage: buildStage({ requests, visits, quotes, bookings, invoices }),
    requests,
    visits,
    quotes,
    bookings,
    invoices,
    timeline,
  };
}
