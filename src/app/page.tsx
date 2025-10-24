
import { LandingPageClient } from "./landing/client-page";
import { getGoogleReviews, FormattedReview } from "@/services/reviewService";
import LandingLayout from "./landing/layout";

// Données de secours si l'API Google ne répond pas
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

export default async function Home() {
    let reviews: FormattedReview[] = fallbackTestimonials;
    
    // try {
    //     // Cette ligne tente de récupérer les avis frais depuis l'API.
    //     // Si elle échoue (par exemple, clé API non configurée), le bloc catch prendra le relais.
    //     const googleReviews = await getGoogleReviews();
    //     if (googleReviews.length > 0) {
    //         reviews = googleReviews;
    //     }
    // } catch (error) {
    //     // L'erreur est journalisée sur le serveur pour le débogage.
    //     console.error("Impossible de récupérer les avis Google, utilisation des données de secours. Erreur:", error);
    //     // L'application continue de fonctionner avec les 'fallbackTestimonials', assurant qu'il n'y a pas de crash.
    // }

    return (
        <LandingLayout>
            <LandingPageClient reviews={reviews} />
        </LandingLayout>
    );
}
