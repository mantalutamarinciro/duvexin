import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== "Marin2026") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!db) {
    return NextResponse.json({ error: "Database not initialized on server" }, { status: 500 });
  }

  try {
    const stats: any = {};

    // 1. Requests
    const requestsSnap = await db.collection("requests").get();
    stats.requests = {
      count: requestsSnap.size,
      byStatus: {},
      list: []
    };
    requestsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'À traiter';
      stats.requests.byStatus[status] = (stats.requests.byStatus[status] || 0) + 1;
      stats.requests.list.push({
        id: doc.id,
        clientName: data.clientName,
        email: data.clientEmail,
        volume: data.volume || 0,
        origin: data.originAddress,
        destination: data.destinationAddress,
        status,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null
      });
    });

    // 2. Quotes
    const quotesSnap = await db.collection("quotes").get();
    stats.quotes = {
      count: quotesSnap.size,
      totalValue: 0,
      byStatus: {},
      list: []
    };
    quotesSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Chiffré';
      const value = Number(data.quote || 0);
      stats.quotes.totalValue += value;
      stats.quotes.byStatus[status] = (stats.quotes.byStatus[status] || 0) + 1;
      stats.quotes.list.push({
        id: doc.id,
        clientName: data.clientName,
        value,
        volume: data.volume || 0,
        status,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null
      });
    });

    // 3. Bookings
    const bookingsSnap = await db.collection("bookings").get();
    stats.bookings = {
      count: bookingsSnap.size,
      totalValue: 0,
      byStatus: {},
      list: []
    };
    bookingsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Programmé';
      const value = Number(data.total || 0);
      stats.bookings.totalValue += value;
      stats.bookings.byStatus[status] = (stats.bookings.byStatus[status] || 0) + 1;
      stats.bookings.list.push({
        id: doc.id,
        clientName: data.clientName,
        value,
        volume: data.volume || 0,
        status,
        date: data.moveDate ? (data.moveDate.toDate ? data.moveDate.toDate().toISOString() : data.moveDate) : null
      });
    });

    // 4. Invoices
    const invoicesSnap = await db.collection("invoices").get();
    stats.invoices = {
      count: invoicesSnap.size,
      totalTTC: 0,
      totalPaid: 0,
      byStatus: {},
      list: []
    };
    invoicesSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Brouillon';
      const amountTTC = Number(data.amountTTC || 0);
      const amountPaid = Number(data.amountPaid || 0);
      stats.invoices.totalTTC += amountTTC;
      stats.invoices.totalPaid += amountPaid;
      stats.invoices.byStatus[status] = (stats.invoices.byStatus[status] || 0) + 1;
      stats.invoices.list.push({
        id: doc.id,
        clientName: data.clientName,
        amountTTC,
        amountPaid,
        status,
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : null
      });
    });

    // 5. Expenses
    const expensesSnap = await db.collection("expenses").get();
    stats.expenses = {
      count: expensesSnap.size,
      totalAmount: 0,
      byCategory: {},
      list: []
    };
    expensesSnap.forEach(doc => {
      const data = doc.data();
      const amount = Number(data.amount || 0);
      const category = data.category || 'Autre';
      stats.expenses.totalAmount += amount;
      stats.expenses.byCategory[category] = (stats.expenses.byCategory[category] || 0) + amount;
      stats.expenses.list.push({
        id: doc.id,
        amount,
        category,
        description: data.description || '',
        date: data.date ? (data.date.toDate ? data.date.toDate().toISOString() : data.date) : null
      });
    });

    // 6. Visits
    const visitsSnap = await db.collection("visits").get();
    stats.visits = {
      count: visitsSnap.size,
      byStatus: {},
      list: []
    };
    visitsSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Planifiée';
      stats.visits.byStatus[status] = (stats.visits.byStatus[status] || 0) + 1;
      stats.visits.list.push({
        id: doc.id,
        client: data.clientName,
        commercial: data.commercialName,
        type: data.type || 'domicile',
        status,
        date: data.visitDateTime ? (data.visitDateTime.toDate ? data.visitDateTime.toDate().toISOString() : data.visitDateTime) : null
      });
    });

    // 7. Customers (users)
    const usersSnap = await db.collection("users").get();
    stats.customers = {
      count: usersSnap.size
    };

    // 8. Teams
    const teamsSnap = await db.collection("teams").get();
    stats.teams = {
      count: teamsSnap.size,
      list: []
    };
    teamsSnap.forEach(doc => {
      stats.teams.list.push({ id: doc.id, name: doc.data().name });
    });

    // 9. Vehicles
    const vehiclesSnap = await db.collection("vehicles").get();
    stats.vehicles = {
      count: vehiclesSnap.size,
      byStatus: {},
      list: []
    };
    vehiclesSnap.forEach(doc => {
      const data = doc.data();
      const status = data.status || 'Disponible';
      stats.vehicles.byStatus[status] = (stats.vehicles.byStatus[status] || 0) + 1;
      stats.vehicles.list.push({ id: doc.id, brand: data.brand, registration: data.registration, status });
    });

    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error: any) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Report failed", details: error.message }, { status: 500 });
  }
}
