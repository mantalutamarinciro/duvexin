import admin from "firebase-admin";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}`);
  }
  return value;
}

function getPrivateKey(): string {
  return getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: getPrivateKey(),
      }),
    });

    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Firebase Admin SDK initialization error:", error);
    throw error;
  }
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth, admin };