
'use server';

import { z } from 'zod';

// Ce fichier est maintenant un client pour NOTRE propre API, qui elle, appelle Google.

// Type pour un avis formaté, utilisé par notre application
export interface FormattedReview {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  createTime: string;
}

/**
 * Récupère les derniers avis depuis notre API interne, qui fait le pont avec Google.
 * @returns Un tableau d'avis formatés.
 */
export async function getGoogleReviews(): Promise<FormattedReview[]> {
  
  // URL absolue pour l'appel côté serveur
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:9002';
  const url = `${baseUrl}/api/reviews`;

  try {
    const response = await fetch(url, {
        // Revalider les données toutes les heures pour avoir des avis frais
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erreur de notre API interne:", errorBody);
      throw new Error(`Erreur ${response.status}: Impossible de récupérer les avis.`);
    }

    const data = await response.json();
    
    return data.reviews as FormattedReview[];

  } catch (error) {
    console.error("Erreur lors de la récupération des avis via l'API interne:", error);
    // En cas d'erreur réseau ou autre, on lance une exception pour que l'appelant puisse la gérer
    throw error;
  }
}
