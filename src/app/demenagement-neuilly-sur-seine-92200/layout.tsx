
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Neuilly-sur-Seine (92200) - Déménageur Prestige | DemDuVexin",
  description: "Déménageur professionnel à Neuilly-sur-Seine (92200). Service haut de gamme pour appartements et hôtels particuliers. Discrétion et efficacité. Devis gratuit.",
};


export default function NeuillySurSeinePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
