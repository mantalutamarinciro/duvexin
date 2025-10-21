
import { FormattedReview } from "@/app/api/reviews/route";
import { LandingPageClient } from "./client-page";
import type { Metadata } from 'next';
import { getGoogleReviews } from "@/services/reviewService";

// SEO Metadata for the Landing Page
export const metadata: Metadata = {
  title: "Déménagement Vexin - Particuliers & Entreprises | Val-d'Oise, Oise, Eure",
  description: "Déménagement Du Vexin, votre partenaire de confiance pour déménager sans stress dans le Val-d’Oise (95), l’Oise (60), l’Eure (27) et toute la France. Devis gratuit.",
  keywords: "déménagement, déménageur, Val-d'Oise, 95, Oise, 60, Eure, 27, Paris, Ile-de-France, devis déménagement, entreprise de déménagement",
};


const fallbackTestimonials: FormattedReview[] = [
    {
        id: "fallback-1",
        name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Clotilde`
    },
    {
        id: "fallback-2",
        name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel`
    },
     {
        id: "fallback-3",
        name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        rating: 5,
        createTime: "il y a 19 jours",
        avatarUrl: `https://i.pravatar.cc/48?u=Robert`
    },
    {
        id: "fallback-4",
        name: "Nadine Mirlier",
        text: "Un très grand merci à toute l'équipe. Ravie d'avoir fait appel à eux. Tout était parfait. Tout était bien emballé et protéger.L'équipe très professionnelle. Très bon rapport qualité prix.Je recommande à 200 %.",
        rating: 5,
        createTime: "il y a environ un mois",
        avatarUrl: `https://i.pravatar.cc/48?u=Nadine`
    }
];

export default async function LandingPage() {
    let reviews: FormattedReview[] = fallbackTestimonials;
    
    // Pour l'instant, nous utilisons les données de secours pour éviter l'erreur.
    // L'étape suivante consistera à dé-commenter ce bloc une fois les variables d'environnement
    // GOOGLE_ACCOUNT_ID, GOOGLE_LOCATION_ID, et GOOGLE_API_KEY correctement configurées.
    /*
    try {
        const googleReviews = await getGoogleReviews();
        if (googleReviews.length > 0) {
            reviews = googleReviews;
        } else {
            console.warn("No Google Reviews found, using fallback testimonials.");
        }
    } catch (error) {
        console.error("Could not fetch Google Reviews, using fallback testimonials:", error);
    }
    */

    return <LandingPageClient reviews={reviews} />;
}
