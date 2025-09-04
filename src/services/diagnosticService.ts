
'use server';

import { db, admin } from '@/lib/firebase';

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
        // It's possible the error is because the DB hasn't been created yet.
        // We'll pass the specific error message to the frontend to guide the user.
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
