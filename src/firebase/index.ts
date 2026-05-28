'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseSdkBundle {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

function hasValidFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId
  );
}

export function initializeFirebase(): FirebaseSdkBundle {
  if (!hasValidFirebaseConfig()) {
    throw new Error(
      'Configuration Firebase client incomplète. Vérifie les variables NEXT_PUBLIC_FIREBASE_*.'
    );
  }

  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export function getSdks(firebaseApp: FirebaseApp): FirebaseSdkBundle {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';