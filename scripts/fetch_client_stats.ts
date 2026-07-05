import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcNok1eIVn8osweM3JBAW7xZMjqs6fGME",
  authDomain: "movesmart-dashboard.firebaseapp.com",
  projectId: "movesmart-dashboard",
  storageBucket: "movesmart-dashboard.firebasestorage.app",
  messagingSenderId: "167776442405",
  appId: "1:167776442405:web:b73ef5b4d57bf3b453c7cc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function run() {
  try {
    console.log("Attempting login...");
    const userCredential = await signInWithEmailAndPassword(auth, "mantalutamarinciro@gmail.com", "Marin@2026");
    console.log("Logged in successfully as UID:", userCredential.user.uid);

    const stats: any = {};

    // 1. Requests
    try {
      const requestsSnap = await getDocs(collection(db, 'requests'));
      stats.requests = { count: requestsSnap.size };
    } catch (e: any) {
      stats.requests = { error: e.message };
    }

    // 2. Quotes
    try {
      const quotesSnap = await getDocs(collection(db, 'quotes'));
      stats.quotes = { count: quotesSnap.size };
    } catch (e: any) {
      stats.quotes = { error: e.message };
    }

    // 3. Bookings
    try {
      const bookingsSnap = await getDocs(collection(db, 'bookings'));
      stats.bookings = { count: bookingsSnap.size };
    } catch (e: any) {
      stats.bookings = { error: e.message };
    }

    // 4. Invoices
    try {
      const invoicesSnap = await getDocs(collection(db, 'invoices'));
      stats.invoices = { count: invoicesSnap.size };
    } catch (e: any) {
      stats.invoices = { error: e.message };
    }

    // 5. Expenses
    try {
      const expensesSnap = await getDocs(collection(db, 'expenses'));
      stats.expenses = { count: expensesSnap.size };
    } catch (e: any) {
      stats.expenses = { error: e.message };
    }

    // 6. Visits
    try {
      const visitsSnap = await getDocs(collection(db, 'visits'));
      stats.visits = { count: visitsSnap.size };
    } catch (e: any) {
      stats.visits = { error: e.message };
    }

    // 7. Customers (users)
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      stats.customers = { count: usersSnap.size };
    } catch (e: any) {
      stats.customers = { error: e.message };
    }

    // 8. Teams
    try {
      const teamsSnap = await getDocs(collection(db, 'teams'));
      stats.teams = { count: teamsSnap.size };
    } catch (e: any) {
      stats.teams = { error: e.message };
    }

    // 9. Vehicles
    try {
      const vehiclesSnap = await getDocs(collection(db, 'vehicles'));
      stats.vehicles = { count: vehiclesSnap.size };
    } catch (e: any) {
      stats.vehicles = { error: e.message };
    }

    console.log("===STATS_START===");
    console.log(JSON.stringify(stats, null, 2));
    console.log("===STATS_END===");
    process.exit(0);
  } catch (err) {
    console.error("Login failed:", err);
    process.exit(1);
  }
}

run();
