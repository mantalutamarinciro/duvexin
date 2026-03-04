import type { Metadata } from "next";
import { LandingPageClient } from "./(home)/landing-page-client";
import type { FormattedReview } from "@/app/api/reviews/route";
import LandingLayout from "@/app/landing/layout";
import { realReviews } from "@/lib/reviews-data";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Déménagement du Vexin | Déménageur premium, fiable et sans stress",
  description:
    "Déménagement du Vexin : particuliers & entreprises. Équipes salariées, protection pro, devis clair, organisation millimétrée. Intervention Vexin, Val-d’Oise, Yvelines, Île-de-France et national.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Déménagement du Vexin | Déménageur premium",
    description:
      "Une organisation parfaite, une protection pro, des équipes fiables. Devis gratuit, accompagnement complet.",
    url: "/",
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
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "254"
  }
};

async function getReviews(): Promise<FormattedReview[]> {
  return realReviews;
}

export default async function HomePage() {
  const reviews = await getReviews();
  return (
    <LandingLayout>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LandingPageClient reviews={reviews} />
    </LandingLayout>
  );
}
