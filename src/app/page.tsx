
import type { Metadata } from "next";
import { LandingPageClient } from "./(home)/landing-page-client";
import type { FormattedReview } from "@/app/api/reviews/route";
import LandingLayout from "@/app/landing/layout";
import { realReviews } from "@/lib/reviews-data";

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

async function getReviews(): Promise<FormattedReview[]> {
  // On utilise les avis réels centralisés
  return realReviews;
}

export default async function HomePage() {
  const reviews = await getReviews();
  return (
    <LandingLayout>
      <LandingPageClient reviews={reviews} />
    </LandingLayout>
  );
}
