
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Maisons-Alfort (94700) - Expert Bords de Marne | DemDuVexin",
  description: "Déménageur professionnel à Maisons-Alfort (94700). Service fiable pour particuliers, étudiants de l'école vétérinaire et entreprises. Devis gratuit.",
};


export default function MaisonsAlfortPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
