import admin from "firebase-admin";

/**
 * @fileOverview Configuration du SDK Firebase Admin.
 * 
 * NOTE: Les variables d'environnement FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL 
 * et FIREBASE_PRIVATE_KEY doivent être configurées dans les secrets de votre 
 * projet pour le fonctionnement en production.
 */

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;
  return key.replace(/\\n/g, "\n");
}

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("Firebase Admin SDK initialized with Service Account.");
    } catch (error) {
      console.error("Firebase Admin SDK initialization error:", error);
    }
  } else {
    // Pendant le build Next.js, on évite d'initialiser si les credentials manquent
    console.warn("Firebase Admin SDK: No credentials found. Skipping initialization during build.");
  }
}

// Export safe accessors
export const db = admin.apps.length ? admin.firestore() : null as any;
export const auth = admin.apps.length ? admin.auth() : null as any;
export { admin };
