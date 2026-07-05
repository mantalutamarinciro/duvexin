import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

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
    const uid = userCredential.user.uid;
    console.log("Logged in as UID:", uid);

    // Check roles_admin doc
    const adminDocRef = doc(db, 'roles_admin', uid);
    const adminDoc = await getDoc(adminDocRef);
    console.log("Is Admin Doc Exists:", adminDoc.exists());
    if (adminDoc.exists()) {
      console.log("Admin Doc Data:", adminDoc.data());
    }

    // Check employees doc
    const empDocRef = doc(db, 'employees', uid);
    const empDoc = await getDoc(empDocRef);
    console.log("Is Employee Doc Exists:", empDoc.exists());
    if (empDoc.exists()) {
      console.log("Employee Doc Data:", empDoc.data());
    }

    // Try reading serviceTypes
    try {
      const serviceTypesSnap = await getDocs(collection(db, 'serviceTypes'));
      console.log("Service Types count:", serviceTypesSnap.size);
    } catch (e: any) {
      console.log("Failed to read serviceTypes:", e.message);
    }

  } catch (err) {
    console.error("Error:", err);
  }
}

run();
