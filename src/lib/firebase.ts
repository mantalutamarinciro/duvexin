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
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log("Firebase Admin SDK initialized with Service Account.");
    } else {
      // Pendant le build Next.js ou sur Firebase App Hosting, on tente d'initialiser 
      // sans certificat explicite pour éviter de faire planter la compilation.
      // Cela permet à Next.js de collecter les métadonnées des pages sans crasher.
      admin.initializeApp();
      console.log("Firebase Admin SDK initialized with application default credentials.");
    }
  } catch (error) {
    // On capture l'erreur pour ne pas bloquer le build. 
    // En runtime, si les variables manquent réellement, les appels Firestore échoueront avec un message explicite.
    console.warn("Firebase Admin SDK initialization warning (ignoring for build):", error);
  }
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth, admin };
