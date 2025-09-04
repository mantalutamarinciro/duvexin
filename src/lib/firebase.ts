// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "movesmart-dashboard",
  "appId": "1:167776442405:web:efc36eba660e42eb53c7cc",
  "storageBucket": "movesmart-dashboard.firebasestorage.app",
  "apiKey": "AIzaSyDOAbetidHcbpOXEZlG9vIQVenSenF69OE",
  "authDomain": "movesmart-dashboard.firebaseapp.com",
  "messagingSenderId": "167776442405"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
