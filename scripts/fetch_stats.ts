import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import admin from "firebase-admin";

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;

  return key
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = getPrivateKey();

if (!projectId || !clientEmail || !privateKey) {
  console.error("Missing credentials to connect to Firebase Admin");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const db = admin.firestore();

async function run() {
  const stats: any = {};

  try {
    // 1. Requests
    const requestsSnap = await db.collection('requests').get();
    stats.requests = {
      count: requestsSnap.size,
      byStatus: {},
      list: []
    };
    requestsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Unknown';
      stats.requests.byStatus[status] = (stats.requests.byStatus[status] || 0) + 1;
      stats.requests.list.push({ id: doc.id, name: data.clientName, email: data.clientEmail, volume: data.volume, origin: data.originAddress, destination: data.destinationAddress, status });
    });

    // 2. Quotes
    const quotesSnap = await db.collection('quotes').get();
    stats.quotes = {
      count: quotesSnap.size,
      totalValue: 0,
      byStatus: {},
      list: []
    };
    quotesSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Unknown';
      const value = Number(data.quote || 0);
      stats.quotes.totalValue += value;
      stats.quotes.byStatus[status] = (stats.quotes.byStatus[status] || 0) + 1;
      stats.quotes.list.push({ id: doc.id, name: data.clientName, value, volume: data.volume, status });
    });

    // 3. Bookings
    const bookingsSnap = await db.collection('bookings').get();
    stats.bookings = {
      count: bookingsSnap.size,
      totalValue: 0,
      byStatus: {},
      list: []
    };
    bookingsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Unknown';
      const value = Number(data.total || 0);
      stats.bookings.totalValue += value;
      stats.bookings.byStatus[status] = (stats.bookings.byStatus[status] || 0) + 1;
      stats.bookings.list.push({ id: doc.id, name: data.clientName, value, volume: data.volume, status, date: data.moveDate ? data.moveDate.toDate().toISOString() : null });
    });

    // 4. Invoices
    const invoicesSnap = await db.collection('invoices').get();
    stats.invoices = {
      count: invoicesSnap.size,
      totalTTC: 0,
      totalPaid: 0,
      byStatus: {},
      list: []
    };
    invoicesSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Unknown';
      const amountTTC = Number(data.amountTTC || 0);
      const amountPaid = Number(data.amountPaid || 0);
      stats.invoices.totalTTC += amountTTC;
      stats.invoices.totalPaid += amountPaid;
      stats.invoices.byStatus[status] = (stats.invoices.byStatus[status] || 0) + 1;
      stats.invoices.list.push({ id: doc.id, name: data.clientName, amountTTC, amountPaid, status });
    });

    // 5. Expenses
    const expensesSnap = await db.collection('expenses').get();
    stats.expenses = {
      count: expensesSnap.size,
      totalAmount: 0,
      byCategory: {}
    };
    expensesSnap.forEach(doc => {
      const data = doc.data();
      const amount = Number(data.amount || 0);
      const category = data.category || 'Other';
      stats.expenses.totalAmount += amount;
      stats.expenses.byCategory[category] = (stats.expenses.byCategory[category] || 0) + amount;
    });

    // 6. Visits
    const visitsSnap = await db.collection('visits').get();
    stats.visits = {
      count: visitsSnap.size,
      byStatus: {},
      list: []
    };
    visitsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Unknown';
      stats.visits.byStatus[status] = (stats.visits.byStatus[status] || 0) + 1;
      stats.visits.list.push({ id: doc.id, client: data.clientName, type: data.type, status });
    });

    // 7. Customers (users)
    const usersSnap = await db.collection('users').get();
    stats.customers = {
      count: usersSnap.size
    };

    // 8. Teams
    const teamsSnap = await db.collection('teams').get();
    stats.teams = {
      count: teamsSnap.size,
      list: []
    };
    teamsSnap.forEach(doc => {
      stats.teams.list.push({ id: doc.id, name: doc.data().name });
    });

    // 9. Vehicles
    const vehiclesSnap = await db.collection('vehicles').get();
    stats.vehicles = {
      count: vehiclesSnap.size,
      byStatus: {}
    };
    vehiclesSnap.forEach(doc => {
      const status = doc.data().status || 'Unknown';
      stats.vehicles.byStatus[status] = (stats.vehicles.byStatus[status] || 0) + 1;
    });

    console.log("===STATS_START===");
    console.log(JSON.stringify(stats, null, 2));
    console.log("===STATS_END===");
  } catch (err) {
    console.error("Error executing query:", err);
  }
}

run();
