import type { Metadata } from "next";
import { LandingPageClient } from "./(home)/landing-page-client";
import type { FormattedReview } from "@/app/api/reviews/route";
import LandingLayout from "@/app/landing/layout";
import Script from "next/script";
import { reviewSummary } from "@/lib/review-summary";

export const metadata: Metadata = {
  title: "Déménageur Val-d’Oise (95) | Déménagement du Vexin",
  description:
    "Préparez votre déménagement dans le Val-d’Oise avec Déménagement du Vexin : Méry-sur-Oise, Cergy, Pontoise et départs en France. Découvrez nos formules et demandez un devis.",
  alternates: { canonical: "https://demenagementduvexin.fr" },
  openGraph: {
    title: "Déménageur Val-d’Oise (95) | Déménagement du Vexin",
    description:
      "Déménagements de particuliers et d’entreprises dans le Val-d’Oise et au départ du Vexin. Comparez les formules et préparez votre devis.",
    url: "https://demenagementduvexin.fr",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "Déménagement du Vexin",
  "image": "https://demenagementduvexin.fr/images/logo.png",
  "@id": "https://demenagementduvexin.fr",
  "url": "https://demenagementduvexin.fr",
  "telephone": "+33130751235",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "9 Rue de Pontoise",
    "addressLocality": "Méry-sur-Oise",
    "postalCode": "95540",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.0633924,
    "longitude": 2.1858115
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "19:00"
  }
};

interface ReviewsApiResponse {
  reviews: FormattedReview[];
  globalRating: number;
  totalReviews: number;
}

async function getReviews(): Promise<ReviewsApiResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://demenagementduvexin.fr";
    const res = await fetch(`${baseUrl}/api/reviews`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) throw new Error("API reviews failed");
    return await res.json();
  } catch {
    // Fallback gracieux si l'API est indisponible
    return { reviews: [], globalRating: 0, totalReviews: 0 };
  }
}

export default async function HomePage() {
  const { reviews, globalRating, totalReviews } = await getReviews();
  const summary = reviewSummary(globalRating, totalReviews);
  const schema = {
    ...localBusinessSchema,
    ...(summary ? { aggregateRating: { '@type': 'AggregateRating', ...summary } } : {}),
  };
  return (
    <LandingLayout>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LandingPageClient reviews={reviews} globalRating={globalRating} totalReviews={totalReviews} />
    </LandingLayout>
  );
}
