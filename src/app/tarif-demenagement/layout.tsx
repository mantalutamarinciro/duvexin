import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Prix d’un déménagement | Volume, distance et devis",
  description: "Comprenez le prix d’un déménagement : volume, distance, accès, stationnement et formule. Préparez les mêmes informations pour comparer vos devis.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/tarif-demenagement",
  },
  keywords: [
    "tarif déménagement",
    "prix déménagement",
    "estimation déménagement",
    "devis déménagement",
    "prix m3 déménagement",
    "coût déménagement",
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
