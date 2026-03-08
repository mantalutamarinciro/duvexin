
'use server';

import { db } from '@/lib/firebase';
import { admin } from '@/lib/firebase';
import { Booking } from './bookingService';
import { Quote } from './quoteService';
import { Expense } from './expenseService';

const { Timestamp } = admin.firestore;

/**
 * Vérifie l'état de la connexion à la base de données
 */
export async function getDbStatus() {
    try {
        const quotesCol = db.collection('quotes');
        const bookingsCol = db.collection('bookings');
        const teamsCol = db.collection('teams');

        const [quotesSnapshot, bookingsSnapshot, teamsSnapshot] = await Promise.all([
            quotesCol.count().get(),
            bookingsCol.count().get(),
            teamsCol.count().get(),
        ]);

        return {
            status: 'connected',
            quotesCount: quotesSnapshot.data().count,
            bookingsCount: bookingsSnapshot.data().count,
            teamsCount: teamsSnapshot.data().count,
        };
    } catch (error) {
        console.error("Error connecting to Firestore: ", error);
        if (error instanceof Error) {
           return {
                status: 'error',
                message: error.message,
            };
        }
        return {
            status: 'error',
            message: 'An unknown error occurred.',
        };
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
            // Tri par date pour l'affichage chronologique
            .sort((a, b) => {
                const dateA = new Date(a.name.split(' ').reverse().join(' '));
                const dateB = new Date(b.name.split(' ').reverse().join(' '));
                return dateA.getTime() - dateB.getTime();
            });

        // 5. Répartition des statuts des devis pour le graphique camembert
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

        // Créer une équipe de test
        const teamRef = db.collection('teams').doc();
        batch.set(teamRef, {
            name: `Équipe Test ${Math.floor(Math.random() * 100)}`,
            members: [{ name: "John Doe" }, { name: "Jane Smith" }],
            createdAt: Timestamp.now(),
        });

        // Créer un devis de test
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
        
        console.log(`Test data created. Team ID: ${teamRef.id}, Quote ID: ${quoteRef.id}`);
        return { success: true, teamId: teamRef.id, quoteId: quoteRef.id };

    } catch (error) {
        console.error('Error creating test data: ', error);
        throw new Error('Failed to create test data.');
    }
}
