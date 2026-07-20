import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for Google Places API reviews response
const googlePlacesReviewSchema = z.object({
  author_name: z.string(),
  profile_photo_url: z.string().url().optional(),
  rating: z.number(),
  text: z.string().optional(),
  relative_time_description: z.string(),
  time: z.number(),
});

const googlePlacesApiResponseSchema = z.object({
  result: z.object({
    reviews: z.array(googlePlacesReviewSchema).optional(),
    rating: z.number().optional(),
    user_ratings_total: z.number().optional(),
  }).optional(),
  status: z.string(),
  error_message: z.string().optional(),
});

export interface FormattedReview {
  id: string;
  name: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  createTime: string;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey || apiKey === "VOTRE_CLÉ_API") {
     console.error("La clé API Google (GOOGLE_API_KEY) n'est pas configurée.");
     return NextResponse.json({ error: "Configuration de la clé API Google manquante." }, { status: 500 });
  }

  try {
    // 1. Resolve Place ID dynamically if not provided as an environment variable
    let placeId = process.env.GOOGLE_PLACE_ID;
    
    if (!placeId || placeId === "VOTRE_PLACE_ID") {
      const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Demenagement%20du%20Vexin%20Mery%20sur%20Oise&inputtype=textquery&fields=place_id&key=${apiKey}`;
      const searchRes = await fetch(searchUrl, { next: { revalidate: 86400 } }); // Cache Place ID resolution for 24h
      
      if (!searchRes.ok) {
        throw new Error(`Failed to resolve Place ID: ${searchRes.statusText}`);
      }
      
      const searchData = await searchRes.json();
      if (searchData.candidates && searchData.candidates.length > 0) {
        placeId = searchData.candidates[0].place_id;
      } else {
        throw new Error("Déménagement du Vexin location could not be found on Google Places.");
      }
    }

    // 2. Fetch place reviews and rating details
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=fr`;
    const detailsRes = await fetch(detailsUrl, {
        next: { revalidate: 3600 } // Cache reviews for 1 hour
    });

    if (!detailsRes.ok) {
      throw new Error(`Google Places Details API error: ${detailsRes.statusText}`);
    }

    const data = await detailsRes.json();
    const parsedData = googlePlacesApiResponseSchema.safeParse(data);

    if (!parsedData.success) {
        console.error("Invalid response format from Google Places API:", parsedData.error);
        return NextResponse.json({ error: "Format de réponse Google invalide.", details: parsedData.error }, { status: 500 });
    }

    const result = parsedData.data.result;
    
    if (parsedData.data.status !== "OK" || !result) {
        console.error("Google Places API error status:", parsedData.data.status, parsedData.data.error_message);
        return NextResponse.json({ error: `Erreur API Google Places: ${parsedData.data.status}`, message: parsedData.data.error_message }, { status: 500 });
    }

    // 3. Format and return reviews
    const formattedReviews: FormattedReview[] = (result.reviews || [])
        .filter(review => review.text && review.text.trim() !== '')
        .map((review, index) => ({
            id: `gplace-${review.time}-${index}`,
            name: review.author_name,
            avatarUrl: review.profile_photo_url,
            rating: review.rating,
            text: review.text || '',
            createTime: review.relative_time_description,
        }));

     return NextResponse.json({ 
       reviews: formattedReviews,
       globalRating: result.rating || 4.9,
       totalReviews: result.user_ratings_total || 250
     });

  } catch (error) {
    console.error("Erreur interne de la route reviews:", error);
    return NextResponse.json({ error: "Erreur interne du serveur.", details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
