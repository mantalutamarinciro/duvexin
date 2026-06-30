'use server';

import { db, admin } from '@/lib/firebase';
import type { Booking } from './bookingService';

const { Timestamp } = admin.firestore;

const TEAMS_COLLECTION = 'teams';

export type TeamMemberRole = 'Chef d\'équipe' | 'Chauffeur' | 'Déménageur';

export interface TeamMember {
  name: string;
  role: TeamMemberRole;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  vehicleRegistration?: string;
  createdAt: string;
}

export interface TeamWithBookings extends Team {
  bookings: Booking[];
}

type CreateTeamInput = {
  name: string;
  members: TeamMember[];
  vehicleRegistration?: string;
};

function mapDocToTeam(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Team {
  const data = doc.data()!;

  return {
    id: doc.id,
    name: data.name ?? '',
    members: Array.isArray(data.members) ? data.members : [],
    vehicleRegistration: data.vehicleRegistration || undefined,
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function createTeam(
  teamData: CreateTeamInput
): Promise<{ id: string }> {
  try {
    if (!db) throw new Error('Database not initialized');
    const docRef = await db.collection(TEAMS_COLLECTION).add({
      name: teamData.name,
      members: Array.isArray(teamData.members) ? teamData.members : [],
      vehicleRegistration: teamData.vehicleRegistration || null,
      createdAt: Timestamp.now(),
    });

    console.log('Team created with ID:', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating team:', error);
    throw new Error('Failed to create team.');
  }
}

export async function getTeams(): Promise<Team[]> {
  try {
    if (!db) return [];
    const querySnapshot = await db
      .collection(TEAMS_COLLECTION)
      .orderBy('createdAt', 'desc')
      .get();

    return querySnapshot.docs.map(mapDocToTeam);
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw new Error('Failed to fetch teams.');
  }
}

export async function getTeamById(teamId: string): Promise<Team | null> {
  try {
    if (!db) return null;
    const docSnap = await db.collection(TEAMS_COLLECTION).doc(teamId).get();

    if (!docSnap.exists) {
      return null;
    }

    return mapDocToTeam(docSnap);
  } catch (error) {
    console.error('Error fetching team by ID:', error);
    throw new Error('Failed to fetch team details.');
  }
}

export async function deleteTeam(teamId: string): Promise<void> {
  try {
    if (!db) throw new Error('Database not initialized');
    await db.collection(TEAMS_COLLECTION).doc(teamId).delete();
    console.log(`Team ${teamId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting team:', error);
    throw new Error('Failed to delete team.');
  }
}