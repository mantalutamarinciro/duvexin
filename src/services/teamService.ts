
'use server';

import { db, admin } from '@/lib/firebase';

const { Timestamp } = admin.firestore;

export interface TeamMember {
  name: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: admin.firestore.Timestamp;
}

export async function createTeam(teamData: Omit<Team, 'id' | 'createdAt'>): Promise<{ id: string }> {
  try {
    const docRef = await db.collection('teams').add({
      ...teamData,
      createdAt: Timestamp.now(),
    });
    console.log('Team created with ID: ', docRef.id);
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating team: ', error);
    throw new Error('Failed to create team.');
  }
}

export async function getTeams(): Promise<Team[]> {
  try {
    const teamsCol = db.collection('teams');
    const q = teamsCol.orderBy('createdAt', 'desc');
    const querySnapshot = await q.get();

    const teams = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Team));

    return teams;
  } catch (error) {
    console.error('Error fetching teams: ', error);
    throw new Error('Failed to fetch teams.');
  }
}
