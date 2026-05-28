'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

export interface FirebaseSdkBundle {
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

function hasValidFirebaseConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "");
}

/**
 * Initializes Firebase client SDKs. 
 * During build time (prerendering), if config is missing, it returns nulls 
 * instead of throwing an error to prevent deployment failure.
 */
export function initializeFirebase(): FirebaseSdkBundle {
  if (!hasValidFirebaseConfig()) {
    console.warn('Firebase client configuration is incomplete. This is expected during build if environment variables are not set.');
    return {
      firebaseApp: null,
      auth: null,
      firestore: null,
    };
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
export * from './non-blocking-login';
export * from './non-blocking-updates';
export * from './errors';
export * from './error-emitter';
