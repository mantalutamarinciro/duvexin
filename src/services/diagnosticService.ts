
'use server';

import { db } from '@/lib/firebase';
import { admin } from '@/lib/firebase';
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

/**
 * Récupère les alertes pour l'accueil du dashboard
 */
export async function getOperationalAlerts(): Promise<OperationalAlert[]> {
    const alerts: OperationalAlert[] = [];
    const today = new Date();
    const criticalThreshold = today;
    const warningThreshold = addDays(today, 15);

    try {
        // 1. Alertes Flotte (Maintenance & Assurance)
        const vehiclesSnap = await db.collection('vehicles').get();
        vehiclesSnap.forEach(doc => {
            const v = doc.data();
            const reg = v.registration;

            if (v.nextMaintenanceDate) {
                const date = (v.nextMaintenanceDate as admin.firestore.Timestamp).toDate();
                if (isBefore(date, criticalThreshold)) {
                    alerts.push({ id: `maint-crit-${doc.id}`, type: 'maintenance', severity: 'critical', title: 'Entretien en retard', description: `Le camion ${reg} a dépassé sa date d'entretien.`, link: '/dashboard/vehicles' });
                } else if (isBefore(date, warningThreshold)) {
                    alerts.push({ id: `maint-warn-${doc.id}`, type: 'maintenance', severity: 'warning', title: 'Entretien proche', description: `Entretien à prévoir pour ${reg} sous 15 jours.`, link: '/dashboard/vehicles' });
                }
            }

            if (v.insuranceExpiryDate) {
                const date = (v.insuranceExpiryDate as admin.firestore.Timestamp).toDate();
                if (isBefore(date, criticalThreshold)) {
                    alerts.push({ id: `ins-crit-${doc.id}`, type: 'insurance', severity: 'critical', title: 'Assurance expirée', description: `L'assurance du véhicule ${reg} est arrivée à échéance !`, link: '/dashboard/vehicles' });
                } else if (isBefore(date, warningThreshold)) {
                    alerts.push({ id: `ins-warn-${doc.id}`, type: 'insurance', severity: 'warning', title: 'Échéance assurance', description: `Renouvellement assurance pour ${reg} sous 15 jours.`, link: '/dashboard/vehicles' });
                }
            }
        });

        // 2. Alertes Commerciales (Devis en attente > 48h)
        const quoteFollowupLimit = subDays(today, 2);
        const quotesSnap = await db.collection('quotes')
            .where('status', '==', 'pending')
            .where('createdAt', '<=', Timestamp.fromDate(quoteFollowupLimit))
            .get();
        
        quotesSnap.forEach(doc => {
            const q = doc.data();
            alerts.push({
                id: `quote-${doc.id}`,
                type: 'quote_followup',
                severity: 'info',
                title: 'Relance Devis',
                description: `Le devis de ${q.clientName} attend une réponse depuis 48h.`,
                link: `/dashboard/quote/${doc.id}`
            });
        });

        return alerts;
    } catch (error) {
        console.error("Error fetching alerts: ", error);
        return [];
    }
}

/**
 * Calcule les indicateurs de performance (KPIs) réels pour le dashboard
 */
export async function getDashboardStats() {
    try {
        const [bookingsSnapshot, quotesSnapshot, expensesSnapshot] = await Promise.all([
            db.collection('bookings').get(),
            db.collection('quotes').get(),
            db.collection('expenses').get(),
        ]);

        // 1. Calcul du Chiffre d'Affaires (Réservations terminées ou facturées)
        const totalRevenue = bookingsSnapshot.docs
            .filter(doc => {
                const status = doc.data().status;
                return status === 'Terminé' || status === 'Facturé';
            })
            .reduce((sum, doc) => sum + (doc.data().total || 0), 0);
            
        // 2. Calcul des Dépenses Totales
        const totalExpenses = expensesSnapshot.docs
            .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

        // 3. Calcul du Taux de Conversion
        const quotesData = quotesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const acceptedQuotes = quotesData.filter((q: any) => q.status === 'accepted' || q.status === 'converted').length;
        const totalProcessedQuotes = quotesData.filter((q: any) => q.status !== 'pending').length;
        const conversionRate = totalProcessedQuotes > 0 ? (acceptedQuotes / totalProcessedQuotes) * 100 : 0;

        // 4. Préparation des données du graphique de revenus (par mois)
        const monthlyRevenue: { [key: string]: number } = {};
        bookingsSnapshot.docs
            .filter(doc => doc.data().status === 'Terminé' || doc.data().status === 'Facturé')
            .forEach(doc => {
                const data = doc.data();
                const date = (data.moveDate as admin.firestore.Timestamp).toDate();
                const monthKey = date.toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
                monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + data.total;
            });
        
        const revenueChartData = Object.entries(monthlyRevenue)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => {
                const dateA = new Date(a.name.split(' ').reverse().join(' '));
                const dateB = new Date(b.name.split(' ').reverse().join(' '));
                return dateA.getTime() - dateB.getTime();
            });

        // 5. Répartition des statuts des devis
        const quoteStatusCounts = quotesData.reduce((acc: any, quote: any) => {
            const status = quote.status;
            if (status === 'accepted' || status === 'refused' || status === 'converted') {
                 acc[status] = (acc[status] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const quoteChartData = Object.entries(quoteStatusCounts).map(([name, value]) => ({
            name: name === 'converted' ? 'Accepté (Converti)' : name === 'accepted' ? 'Accepté (Non converti)' : 'Refusé',
            value: value as number,
        }));

        return {
            totalRevenue: totalRevenue,
            netProfit: totalRevenue - totalExpenses,
            bookingsCount: bookingsSnapshot.size,
            quotesCount: quotesSnapshot.docs.filter(doc => doc.data().status === 'pending').length,
            conversionRate: Math.round(conversionRate),
            charts: {
                revenue: revenueChartData,
                quotes: quoteChartData,
            }
        }

    } catch (error) {
         console.error("Error fetching dashboard stats: ", error);
        return {
            totalRevenue: 0,
            netProfit: 0,
            bookingsCount: 0,
            quotesCount: 0,
            conversionRate: 0,
            charts: {
                revenue: [],
                quotes: [],
            }
        }
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
            members: [{ name: "John Doe" }, { name: "Jane Smith" }],
            createdAt: Timestamp.now(),
        });

        const quoteRef = db.collection('quotes').doc();
        batch.set(quoteRef, {
            clientName: "Client de Test",
            clientEmail: "test@example.com",
            originAddress: "1 Rue du Test, 75001 Paris",
            destinationAddress: "2 Avenue du Test, 13001 Marseille",
            moveDate: Timestamp.fromDate(new Date()),
            distance: 100,
            volume: 25,
            serviceType: "full",
            quote: 1250.50,
            status: 'pending',
            createdAt: Timestamp.now(),
        });
        
        await batch.commit();
        
        return { success: true, teamId: teamRef.id, quoteId: quoteRef.id };

    } catch (error) {
        console.error('Error creating test data: ', error);
        throw new Error('Failed to create test data.');
    }
}
