
'use server';

import { db } from '@/lib/firebase';
import { admin } from '@/lib/firebase';
import { Booking } from './bookingService';
import { Quote } from './quoteService';

const { Timestamp } = admin.firestore;

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

export async function getDashboardStats() {
    try {
        const bookingsSnapshot = await db.collection('bookings').get();
        const quotesSnapshot = await db.collection('quotes').where('status', '==', 'pending').get();
        const teamsSnapshot = await db.collection('teams').get();

        const totalRevenue = bookingsSnapshot.docs
            .filter(doc => doc.data().status === 'Terminé')
            .reduce((sum, doc) => sum + doc.data().total, 0);

        const bookingsData = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
        const quotesData = (await db.collection('quotes').get()).docs.map(doc => ({ id: doc.id, ...doc.data() as any })) as Quote[];


        // Monthly Revenue
        const monthlyRevenue: { [key: string]: number } = {};
        bookingsData
            .filter(b => b.status === 'Terminé')
            .forEach(b => {
                const month = new Date(b.moveDate).toLocaleString('fr-FR', { month: 'short', year: 'numeric' });
                if (!monthlyRevenue[month]) {
                    monthlyRevenue[month] = 0;
                }
                monthlyRevenue[month] += b.total;
            });
        
        const revenueChartData = Object.entries(monthlyRevenue)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());


        // Quote Statuses
        const quoteStatusCounts = quotesData.reduce((acc, quote) => {
            const status = quote.status;
            if (status === 'accepted' || status === 'refused' || status === 'converted') {
                 acc[status] = (acc[status] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        const quoteChartData = Object.entries(quoteStatusCounts).map(([name, value]) => ({
            name: name === 'converted' ? 'Accepté (Converti)' : name === 'accepted' ? 'Accepté (Non converti)' : 'Refusé',
            value: value,
        }));


        return {
            totalRevenue: totalRevenue,
            bookingsCount: bookingsSnapshot.size,
            quotesCount: quotesSnapshot.size,
            teamsCount: teamsSnapshot.size,
            charts: {
                revenue: revenueChartData,
                quotes: quoteChartData,
            }
        }

    } catch (error) {
         console.error("Error fetching dashboard stats: ", error);
        // Return zeroed stats on error to prevent UI crash
        return {
            totalRevenue: 0,
            bookingsCount: 0,
            quotesCount: 0,
            teamsCount: 0,
            charts: {
                revenue: [],
                quotes: [],
            }
        }
    }
}

export async function createTestData() {
    try {
        const batch = db.batch();

        // Create a test team
        const teamRef = db.collection('teams').doc();
        batch.set(teamRef, {
            name: `Équipe Test ${Math.floor(Math.random() * 100)}`,
            members: [{ name: "John Doe" }, { name: "Jane Smith" }],
            createdAt: Timestamp.now(),
        });

        // Create a test quote
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
