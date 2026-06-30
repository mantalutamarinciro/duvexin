
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
    console.error('Error checking Firestore status:', error);

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
    console.error('Error fetching alerts:', error);
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
    console.error('Error fetching dashboard stats:', error);

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
