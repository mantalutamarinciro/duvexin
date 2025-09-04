'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getCountFromServer, Timestamp } from 'firebase/firestore';
import { serviceTypeLabels } from '@/app/dashboard/quote/page';

export async function getDbStatus() {
    try {
        const quotesCol = collection(db, 'quotes');
        const bookingsCol = collection(db, 'bookings');
        const teamsCol = collection(db, 'teams');

        const [quotesSnapshot, bookingsSnapshot, teamsSnapshot] = await Promise.all([
            getCountFromServer(quotesCol),
            getCountFromServer(bookingsCol),
            getCountFromServer(teamsCol),
        ]);

        return {
            status: 'connected',
            quotesCount: quotesSnapshot.data().count,
            bookingsCount: bookingsSnapshot.data().count,
            teamsCount: teamsSnapshot.data().count,
        };
    } catch (error) {
        console.error("Error connecting to Firestore: ", error);
        return {
            status: 'error',
            message: (error as Error).message,
        };
    }
}

export async function createTestData() {
    try {
        // Create a test team
        const teamRef = await addDoc(collection(db, 'teams'), {
            name: `Équipe Test ${Math.floor(Math.random() * 100)}`,
            members: [{ name: "John Doe" }, { name: "Jane Smith" }],
            createdAt: Timestamp.now(),
        });

        // Create a test quote
        const quoteRef = await addDoc(collection(db, 'quotes'), {
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
        
        console.log(`Test data created. Team ID: ${teamRef.id}, Quote ID: ${quoteRef.id}`);
        return { success: true, teamId: teamRef.id, quoteId: quoteRef.id };

    } catch (error) {
        console.error('Error creating test data: ', error);
        throw new Error('Failed to create test data.');
    }
}
