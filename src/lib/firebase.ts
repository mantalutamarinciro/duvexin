import admin from "firebase-admin";

/**
 * @fileOverview Configuration du SDK Firebase Admin.
 */

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;

  return key
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/\\n/g, "\n");
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
    console.warn("Firebase Admin SDK: Missing credentials. This is expected during build time.");
  }
}

// On exporte db avec un type explicite pour éviter les erreurs "any" implicites
export const db: admin.firestore.Firestore = admin.apps.length 
  ? admin.firestore() 
  : null as unknown as admin.firestore.Firestore;

export const auth = admin.apps.length ? admin.auth() : null;
export { admin };
