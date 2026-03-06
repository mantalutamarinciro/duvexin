import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tarifs Déménagement 2026 : Quel est le prix au m³ ? | DemDuVexin",
  description: "Découvrez les tarifs de déménagement en 2026. Guide complet sur le prix au m³, l'estimation de budget selon la distance et les formules. Obtenez votre devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/tarif-demenagement",
  },
  keywords: [
    "tarif déménagement",
    "prix déménagement",
    "estimation déménagement",
    "devis déménagement",
    "prix m3 déménagement",
    "coût déménagement paris",
    "tarif déménageur professionnel"
  ]
};

export default function TarifsPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
