
'use server';

import { z } from 'zod';

// Schéma de validation pour un avis individuel de l'API Google
const googleReviewSchema = z.object({
  reviewId: z.string(),
  reviewer: z.object({
    profilePhotoUrl: z.string().url().optional(),
    displayName: z.string(),
  }),
  starRating: z.enum(['STAR_RATING_UNSPECIFIED', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']),
  comment: z.string().optional(),
  createTime: z.string(),
  updateTime: z.string(),
});

// Schéma pour la réponse complète de l'API
const googleApiResponseSchema = z.object({
  reviews: z.array(googleReviewSchema).optional(),
  totalReviewCount: z.number().optional(),
});

// Type pour un avis formaté, utilisé par notre application
export interface FormattedReview {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  createTime: string;
}

// Convertit le starRating de l'API ('FIVE') en un nombre (5)
function convertRatingToNumber(rating: z.infer<typeof googleReviewSchema>['starRating']): number {
    const ratings = { 'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4, 'FIVE': 5 };
    return ratings[rating] || 0;
}

/**
 * Récupère les derniers avis depuis l'API Google My Business.
 * @returns Un tableau d'avis formatés.
 */
export async function getGoogleReviews(): Promise<FormattedReview[]> {
  const accountId = process.env.GOOGLE_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_LOCATION_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!accountId || !locationId || !apiKey) {
    console.error("Les informations d'identification Google API ne sont pas définies dans les variables d'environnement.");
    throw new Error("Configuration du serveur incomplète pour récupérer les avis.");
  }

  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?key=${apiKey}&pageSize=10&orderBy=updateTime desc`;

  try {
    const response = await fetch(url, {
        // Revalider les données toutes les heures pour avoir des avis frais
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("Erreur de l'API Google My Business:", errorBody);
      throw new Error(`Erreur ${response.status}: Impossible de récupérer les avis Google.`);
    }

    const data = await response.json();
    const parsedData = googleApiResponseSchema.safeParse(data);

    if (!parsedData.success || !parsedData.data.reviews) {
        console.error("Données invalides reçues de l'API Google:", parsedData.error);
        return [];
    }
    
    // Filtrer les avis qui n'ont pas de commentaire et formater les autres
    return parsedData.data.reviews
        .filter(review => review.comment && review.comment.trim() !== '')
        .map(review => ({
            id: review.reviewId,
            name: review.reviewer.displayName,
            avatarUrl: review.reviewer.profilePhotoUrl,
            rating: convertRatingToNumber(review.starRating),
            text: review.comment || '',
            createTime: review.createTime,
        }));

  } catch (error) {
    console.error("Erreur lors de la récupération des avis Google:", error);
    // En cas d'erreur réseau ou autre, on lance une exception pour que l'appelant puisse la gérer
    throw error;
  }
}
