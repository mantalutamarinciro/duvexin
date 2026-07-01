// Firebase App Hosting injecte automatiquement FIREBASE_WEBAPP_CONFIG en BUILD
// On l'utilise comme fallback si les variables NEXT_PUBLIC_ ne sont pas définies.
// Note : ces valeurs sont publiques par conception Firebase.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAcNok1eIVn8osweM3JBAW7xZMjqs6fGME",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "movesmart-dashboard.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "movesmart-dashboard",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "movesmart-dashboard.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "167776442405",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:167776442405:web:b73ef5b4d57bf3b453c7cc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};