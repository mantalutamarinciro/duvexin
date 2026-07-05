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
    const adminUid = "pX1lZpfrylf9VBMd1UO8gT4HRU13";
    const email = "mantalutamarinciro@gmail.com";

    // 1. Create document in roles_admin
    const adminRef = db.collection("roles_admin").doc(adminUid);
    await adminRef.set({
      email,
      role: "super-admin",
      enabled: true,
      updatedAt: new Date(),
    });

    // 2. Create document in employees
    const employeeRef = db.collection("employees").doc(adminUid);
    await employeeRef.set({
      email,
      firstName: "Super",
      lastName: "Admin",
      role: "admin",
      active: true,
      updatedAt: new Date(),
    });

    // 3. Create document in users (to be safe)
    const userRef = db.collection("users").doc(adminUid);
    await userRef.set({
      firstName: "Super",
      lastName: "Admin",
      email,
      role: "admin",
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: `User ${email} successfully promoted to Admin and Employee.`,
    });
  } catch (error: any) {
    console.error("Bootstrap error:", error);
    return NextResponse.json({ error: "Bootstrap failed", details: error.message }, { status: 500 });
  }
}
