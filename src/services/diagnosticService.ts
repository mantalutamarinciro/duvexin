
'use server';

import { db, admin } from '@/lib/firebase';
import { isBefore, addDays, subDays } from 'date-fns';

const { Timestamp } = admin.firestore;

export interface OperationalAlert {
  id: string;
  type: 'maintenance' | 'insurance' | 'quote_followup' | 'high_volume';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  link?: string;
}

export interface DbStatus {
  ok: boolean;
  firestore: boolean;
  message: string;
  checkedAt: string;
}

interface DashboardRevenuePoint {
  name: string;
  total: number;
}

interface DashboardQuotePoint {
  name: string;
  value: number;
}

function isAuthCredentialError(error: unknown) {
  return typeof error === 'object' && error !== null && 'code' in error && (error as { code?: unknown }).code === 16;
}

function logServiceError(context: string, error: unknown) {
  if (isAuthCredentialError(error)) {
    console.warn(`${context}: Firebase Admin credentials invalides en local. Donnees de repli utilisees.`);
    return;
  }

  console.error(context, error);
}
type QuoteDiagnosticRow = {
  id: string;
  status?: string;
};

/**
 * Vérifie l’état minimal de la connexion Firestore
 */
export async function getDbStatus(): Promise<DbStatus> {
  try {
    await db.collection('quotes').limit(1).get();

    return {
      ok: true,
      firestore: true,
      message: 'Connexion Firestore opérationnelle.',
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    logServiceError('Error checking Firestore status', error);

    return {
      ok: false,
      firestore: false,
      message: 'Impossible de joindre Firestore.',
      checkedAt: new Date().toISOString(),
    };
  }
}

/**
 * Récupère les alertes pour l'accueil du dashboard
 */
export async function getOperationalAlerts(): Promise<OperationalAlert[]> {
  const alerts: OperationalAlert[] = [];
  const today = new Date();
  const criticalThreshold = today;
  const warningThreshold = addDays(today, 15);

  try {
    const vehiclesSnap = await db.collection('vehicles').get();

    vehiclesSnap.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const v = doc.data();
      const reg = v.registration ?? 'Véhicule';

      if (v.nextMaintenanceDate) {
        const date = (v.nextMaintenanceDate as admin.firestore.Timestamp).toDate();

        if (isBefore(date, criticalThreshold)) {
          alerts.push({
            id: `maint-crit-${doc.id}`,
            type: 'maintenance',
            severity: 'critical',
            title: 'Entretien en retard',
            description: `Le camion ${reg} a dépassé sa date d'entretien.`,
            link: '/dashboard/vehicles',
          });
        } else if (isBefore(date, warningThreshold)) {
          alerts.push({
            id: `maint-warn-${doc.id}`,
            type: 'maintenance',
            severity: 'warning',
            title: 'Entretien proche',
            description: `Entretien à prévoir pour ${reg} sous 15 jours.`,
            link: '/dashboard/vehicles',
          });
        }
      }

      if (v.insuranceExpiryDate) {
        const date = (v.insuranceExpiryDate as admin.firestore.Timestamp).toDate();

        if (isBefore(date, criticalThreshold)) {
          alerts.push({
            id: `ins-crit-${doc.id}`,
            type: 'insurance',
            severity: 'critical',
            title: 'Assurance expirée',
            description: `L'assurance du véhicule ${reg} est arrivée à échéance !`,
            link: '/dashboard/vehicles',
          });
        } else if (isBefore(date, warningThreshold)) {
          alerts.push({
            id: `ins-warn-${doc.id}`,
            type: 'insurance',
            severity: 'warning',
            title: 'Échéance assurance',
            description: `Renouvellement assurance pour ${reg} sous 15 jours.`,
            link: '/dashboard/vehicles',
          });
        }
      }
    });

    const quoteFollowupLimit = subDays(today, 2);

    const quotesSnap = await db
      .collection('quotes')
      .where('status', '==', 'En attente')
      .where('createdAt', '<=', Timestamp.fromDate(quoteFollowupLimit))
      .get();

    quotesSnap.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const q = doc.data();

      alerts.push({
        id: `quote-${doc.id}`,
        type: 'quote_followup',
        severity: 'info',
        title: 'Relance devis',
        description: `Le devis de ${q.clientName} attend une réponse depuis 48h.`,
        link: `/dashboard/quote/${doc.id}`,
      });
    });

    return alerts;
  } catch (error) {
    logServiceError('Error fetching alerts', error);
    return [];
  }
}

/**
 * Calcule les indicateurs de performance (KPIs) réels pour le dashboard
 */
export async function getDashboardStats() {
  try {
    const [bookingsSnapshot, quotesSnapshot, expensesSnapshot, invoicesSnapshot, requestsSnapshot] = await Promise.all([
      db.collection('bookings').get(),
      db.collection('quotes').get(),
      db.collection('expenses').get(),
      db.collection('invoices').get(),
      db.collection('requests').get(),
    ]);

    const totalRevenue = invoicesSnapshot.docs.reduce(
      (sum: number, doc: admin.firestore.QueryDocumentSnapshot) => sum + Number(doc.data().amountPaid || 0),
      0
    );

    const totalExpenses = expensesSnapshot.docs.reduce(
      (sum: number, doc: admin.firestore.QueryDocumentSnapshot) => sum + Number(doc.data().amount || 0),
      0
    );

    const quotesData: QuoteDiagnosticRow[] = quotesSnapshot.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => {
      const data = doc.data() as { status?: string };
      return {
        id: doc.id,
        status: data.status,
      };
    });

    const acceptedQuotes = quotesData.filter(
      (q) => q.status === 'Accepté' || q.status === 'Converti' || q.status === 'Facturé'
    ).length;

    const totalProcessedQuotes = quotesData.filter(
      (q) => q.status && q.status !== 'Chiffré'
    ).length;

    const conversionRate =
      totalProcessedQuotes > 0 ? (acceptedQuotes / totalProcessedQuotes) * 100 : 0;

    const monthlyRevenue: Record<string, number> = {};

    invoicesSnapshot.docs
      .filter((doc: admin.firestore.QueryDocumentSnapshot) => doc.data().status !== 'Brouillon')
      .forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
        const data = doc.data();
        const dateField = data.createdAt as admin.firestore.Timestamp | undefined;
        if (!dateField) return;

        const date = dateField.toDate();
        const monthKey = date.toLocaleString('fr-FR', {
          month: 'short',
          year: 'numeric',
        });

        monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + Number(data.amountTTC || 0);
      });

    const revenueChartData: DashboardRevenuePoint[] = Object.entries(monthlyRevenue)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const quoteStatusCounts = quotesData.reduce<Record<string, number>>((acc, quote) => {
      const status = quote.status || 'Non défini';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const quoteChartData: DashboardQuotePoint[] = Object.entries(quoteStatusCounts).map(
      ([name, value]) => ({ name, value })
    );

    return {
      totalRevenue,
      netProfit: totalRevenue - totalExpenses,
      bookingsCount: bookingsSnapshot.size,
      quotesCount: requestsSnapshot.docs.filter(doc => doc.data().status === 'À traiter').length,
      conversionRate: Math.round(conversionRate),
      charts: {
        revenue: revenueChartData,
        quotes: quoteChartData,
      },
    };
  } catch (error) {
    logServiceError('Error fetching dashboard stats', error);

    return {
      totalRevenue: 0,
      netProfit: 0,
      bookingsCount: 0,
      quotesCount: 0,
      conversionRate: 0,
      charts: {
        revenue: [] as DashboardRevenuePoint[],
        quotes: [] as DashboardQuotePoint[],
      },
    };
  }
}

// ─── Financial Dashboard ──────────────────────────────────────────────────────

export interface MonthlyFinancialPoint {
  month: string;      // "Jan 2026"
  ca: number;         // Chiffre d'affaires facturé
  encaisse: number;   // Montant réellement encaissé
  depenses: number;   // Dépenses du mois
  marge: number;      // CA - dépenses
}

export interface FinancialKPIs {
  caTotalAnnuel: number;
  encaisseTotal: number;
  margeBrute: number;
  margeRate: number;
  panierMoyen: number;
  tauxConversion: number;
  nbFactures: number;
  nbFacturesPayees: number;
  nbDevisTotal: number;
  nbDevisConverti: number;
  monthly: MonthlyFinancialPoint[];
}

export async function getFinancialDashboardStats(): Promise<FinancialKPIs> {
  try {
    const now = new Date();
    // Build last 12 months labels
    const months: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d.toLocaleString('fr-FR', { month: 'short', year: 'numeric' }));
    }

    const [invoicesSnap, quotesSnap, expensesSnap] = await Promise.all([
      db.collection('invoices').get(),
      db.collection('quotes').get(),
      db.collection('expenses').get(),
    ]);

    // ── Monthly CA & encaissé ──
    const caByMonth: Record<string, number> = {};
    const encaisseByMonth: Record<string, number> = {};
    months.forEach(m => { caByMonth[m] = 0; encaisseByMonth[m] = 0; });

    let caTotalAnnuel = 0;
    let encaisseTotal = 0;
    let nbFactures = 0;
    let nbFacturesPayees = 0;

    invoicesSnap.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const d = doc.data();
      if (d.status === 'Brouillon') return;
      const dateField = d.createdAt as admin.firestore.Timestamp | undefined;
      if (!dateField) return;
      const date = dateField.toDate();
      const key = date.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });

      const amtTTC = Number(d.amountTTC || 0);
      const amtPaid = Number(d.amountPaid || 0);

      if (caByMonth[key] !== undefined) {
        caByMonth[key] += amtTTC;
        encaisseByMonth[key] += amtPaid;
      }
      caTotalAnnuel += amtTTC;
      encaisseTotal += amtPaid;
      nbFactures++;
      if (d.status === 'Payée') nbFacturesPayees++;
    });

    // ── Monthly Dépenses ──
    const depensesByMonth: Record<string, number> = {};
    months.forEach(m => { depensesByMonth[m] = 0; });
    let totalDepenses = 0;

    expensesSnap.docs.forEach((doc: admin.firestore.QueryDocumentSnapshot) => {
      const d = doc.data();
      const dateField = d.date as admin.firestore.Timestamp | undefined;
      if (!dateField) return;
      const date = dateField.toDate();
      const key = date.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
      const amt = Number(d.amount || 0);
      if (depensesByMonth[key] !== undefined) depensesByMonth[key] += amt;
      totalDepenses += amt;
    });

    // ── Quotes conversion ──
    const allQuotes = quotesSnap.docs.map((doc: admin.firestore.QueryDocumentSnapshot) => ({
      status: doc.data().status as string | undefined,
    }));
    const nbDevisTotal = allQuotes.length;
    const nbDevisConverti = allQuotes.filter(q =>
      q.status === 'Accepté' || q.status === 'Converti' || q.status === 'Facturé'
    ).length;
    const tauxConversion = nbDevisTotal > 0 ? Math.round((nbDevisConverti / nbDevisTotal) * 100) : 0;

    // ── Panier moyen ──
    const panierMoyen = nbFactures > 0 ? caTotalAnnuel / nbFactures : 0;

    // ── Marge brute ──
    const margeBrute = caTotalAnnuel - totalDepenses;
    const margeRate = caTotalAnnuel > 0 ? Math.round((margeBrute / caTotalAnnuel) * 100) : 0;

    // ── Assemble monthly array ──
    const monthly: MonthlyFinancialPoint[] = months.map(m => ({
      month: m,
      ca: Math.round(caByMonth[m] || 0),
      encaisse: Math.round(encaisseByMonth[m] || 0),
      depenses: Math.round(depensesByMonth[m] || 0),
      marge: Math.round((caByMonth[m] || 0) - (depensesByMonth[m] || 0)),
    }));

    return {
      caTotalAnnuel: Math.round(caTotalAnnuel),
      encaisseTotal: Math.round(encaisseTotal),
      margeBrute: Math.round(margeBrute),
      margeRate,
      panierMoyen: Math.round(panierMoyen),
      tauxConversion,
      nbFactures,
      nbFacturesPayees,
      nbDevisTotal,
      nbDevisConverti,
      monthly,
    };
  } catch (error) {
    logServiceError('Error fetching financial dashboard stats', error);
    return {
      caTotalAnnuel: 0, encaisseTotal: 0, margeBrute: 0, margeRate: 0,
      panierMoyen: 0, tauxConversion: 0, nbFactures: 0, nbFacturesPayees: 0,
      nbDevisTotal: 0, nbDevisConverti: 0, monthly: [],
    };
  }
}


/**
 * Crée des données de démonstration
 */
export async function createTestData() {
  try {
    const batch = db.batch();

    const teamRef = db.collection('teams').doc();
    batch.set(teamRef, {
      name: `Équipe Test ${Math.floor(Math.random() * 100)}`,
      members: [{ name: 'John Doe' }, { name: 'Jane Smith' }],
      createdAt: Timestamp.now(),
    });

    const quoteRef = db.collection('quotes').doc();
    batch.set(quoteRef, {
      clientName: 'Client de Test',
      clientEmail: 'test@example.com',
      originAddress: '1 Rue du Test, 75001 Paris',
      destinationAddress: '2 Avenue du Test, 13001 Marseille',
      moveDate: Timestamp.fromDate(new Date()),
      distance: 100,
      volume: 25,
      serviceType: 'full',
      quote: 1250.5,
      status: 'En attente',
      createdAt: Timestamp.now(),
    });

    await batch.commit();

    return {
      success: true,
      teamId: teamRef.id,
      quoteId: quoteRef.id,
    };
  } catch (error) {
    console.error('Error creating test data:', error);
    throw new Error('Failed to create test data.');
  }
}
