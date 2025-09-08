
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nos Réalisations - Déménagements d'Exception | DemDuVexin",
  description: "Découvrez nos études de cas et exemples de déménagements complexes réalisés avec succès pour des particuliers et entreprises en Île-de-France et Normandie.",
};


export default function RealisationsPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
