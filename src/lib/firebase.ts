
import admin from 'firebase-admin';

// Check if the environment variable is set
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('The FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please add it to your .env file.');
}

// Parse the service account key from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize the Firebase Admin SDK
// We check if the app is already initialized to prevent errors in Next.js's hot-reloading environment.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
  }
}

// Export the initialized Firestore database instance
const db = admin.firestore();

export { db, admin };
