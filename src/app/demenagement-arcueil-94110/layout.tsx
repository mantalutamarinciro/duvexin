
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Arcueil (94110) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Arcueil (94110). Service fiable pour particuliers et entreprises. Devis gratuit, proche de la Vache Noire.",
};


export default function ArcueilPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
