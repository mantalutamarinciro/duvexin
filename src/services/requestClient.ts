'use client';

import { initializeFirebase } from '@/firebase';
import * as actions from '@/services/requestService';
export type { MoveRequest } from '@/services/requestService';

async function token() {
  const { auth } = initializeFirebase();
  if (!auth) throw new Error('Connexion indisponible.');
  await auth.authStateReady();
  if (!auth.currentUser) throw new Error('Reconnectez-vous au CRM.');
  return auth.currentUser.getIdToken();
}

export async function getRequests() {
  return actions.getRequests(await token());
}
export async function updateRequestStatus(id: string, status: string) {
  return actions.updateRequestStatus(id, status, await token());
}
export async function updateRequestVolume(id: string, volume: number, details?: string) {
  return actions.updateRequestVolume(id, volume, details, await token());
}
export async function setRequestTest(id: string, isTest: boolean) {
  return actions.setRequestTest(id, isTest, await token());
}
