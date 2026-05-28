'use server';

import { db, admin } from '@/lib/firebase';
import type { Booking } from './bookingService';

const { Timestamp } = admin.firestore;

const TEAMS_COLLECTION = 'teams';

export interface TeamMember {
  name: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
}

export interface TeamWithBookings extends Team {
  bookings: Booking[];
}

type CreateTeamInput = {
  name: string;
  members: TeamMember[];
};

function mapDocToTeam(
  doc: admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>
): Team {
  const data = doc.data()!;

  return {
    id: doc.id,
    name: data.name ?? '',
    members: Array.isArray(data.members) ? data.members : [],
    createdAt: data.createdAt
      ? (data.createdAt as admin.firestore.Timestamp).toDate().toISOString()
      : new Date().toISOString(),
  };
}

export async function createTeam(
  teamData: CreateTeamInput
): Promise<{ id: string }> {
  try {
    const docRef = await db.collection(TEAMS_COLLECTION).add({
      name: teamData.name,
      members: Array.isArray(teamData.members) ? teamData.members : [],
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