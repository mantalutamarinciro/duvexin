
import { NextResponse } from "next/server";
import { z } from "zod";

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
    const ratings: Record<string, number> = { 'ONE': 1, 'TWO': 2, 'THREE': 3, 'FOUR': 4, 'FIVE': 5 };
    return ratings[rating] || 0;
}


export async function GET() {
  const accountId = process.env.GOOGLE_ACCOUNT_ID;
  const locationId = process.env.GOOGLE_LOCATION_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!accountId || !locationId || !apiKey || accountId === "VOTRE_ID_DE_COMPTE" || locationId === "VOTRE_ID_DE_LIEU" || apiKey === "VOTRE_CLÉ_API") {
     console.error("Les informations d'identification Google API ne sont pas définies ou sont des placeholders dans les variables d'environnement.");
     return NextResponse.json({ error: "Configuration du serveur incomplète pour récupérer les avis." }, { status: 500 });
  }

  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews?key=${apiKey}&pageSize=10&orderBy=updateTime desc`;

  try {
    const apiResponse = await fetch(url, {
        next: { revalidate: 3600 } 
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.json();
      console.error("Erreur de l'API Google My Business:", errorBody);
      return NextResponse.json({ error: `Erreur ${apiResponse.status}: Impossible de récupérer les avis Google.`, details: errorBody }, { status: apiResponse.status });
    }

    const data = await apiResponse.json();
    const parsedData = googleApiResponseSchema.safeParse(data);

    if (!parsedData.success || !parsedData.data.reviews) {
        console.error("Données invalides reçues de l'API Google:", parsedData.error);
        return NextResponse.json({ error: "Données invalides reçues de Google.", details: parsedData.error }, { status: 500 });
    }
    
    const formattedReviews: FormattedReview[] = parsedData.data.reviews
        .filter(review => review.comment && review.comment.trim() !== '' && review.starRating !== 'STAR_RATING_UNSPECIFIED')
        .map(review => ({
            id: review.reviewId,
            name: review.reviewer.displayName,
            avatarUrl: review.reviewer.profilePhotoUrl,
            rating: convertRatingToNumber(review.starRating),
            text: review.comment || '',
            createTime: review.createTime, // Gardons la date ISO pour un éventuel formatage
        }));

     return NextResponse.json({ reviews: formattedReviews });

  } catch (error) {
    console.error("Erreur interne lors de la récupération des avis Google:", error);
    return NextResponse.json({ error: "Erreur interne du serveur.", details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
