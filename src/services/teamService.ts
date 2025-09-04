'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

export interface TeamMember {
  name: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: any;
}

export async function createTeam(teamData: Omit<Team, 'id' | 'createdAt'>): Promise<{ id: string }> {
  try {
    const docRef = await addDoc(collection(db, 'teams'), {
      ...teamData,
      createdAt: serverTimestamp(),
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
    const teamsCol = collection(db, 'teams');
    const q = query(teamsCol, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

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
