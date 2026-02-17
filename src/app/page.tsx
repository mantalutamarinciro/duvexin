import type { Metadata } from "next";
import { LandingPageClient } from "./(home)/landing-page-client";
import type { FormattedReview } from "@/app/api/reviews/route";
import { getGoogleReviews } from "@/services/reviewService";


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

const fallbackTestimonials: FormattedReview[] = [
    {
        id: "fallback-1", name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde`
    },
    {
        id: "fallback-2", name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel`
    },
     {
        id: "fallback-3", name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert`
    },
    {
        id: "fallback-4", name: "Nadine Mirlier",
        text: "Un très grand merci à toute l'équipe. Ravie d'avoir fait appel à eux. Tout était parfait. Tout était bien emballé et protéger.L'équipe très professionnelle. Très bon rapport qualité prix.Je recommande à 200 %.",
        rating: 5, createTime: "il y a environ un mois", avatarUrl: `https://i.pravatar.cc/48?u=Nadine`
    }
];


export default async function HomePage() {
  let reviews: FormattedReview[] = fallbackTestimonials;
    
    // La récupération des avis Google est temporairement désactivée pour résoudre une erreur d'API.
    // try {
    //     const googleReviews = await getGoogleReviews();
    //     if (googleReviews.length > 0) {
    //         reviews = googleReviews;
    //     }
    // } catch (error) {
    //     console.error("Impossible de récupérer les avis Google, utilisation des données de secours. Erreur:", error);
    // }
  return <LandingPageClient reviews={reviews} />;
}
