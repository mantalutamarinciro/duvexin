
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Levallois-Perret (92300) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Levallois-Perret (92300). Service sur-mesure pour particuliers et entreprises. Devis gratuit, rapide et transparent.",
};


export default function LevalloisPerretPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
