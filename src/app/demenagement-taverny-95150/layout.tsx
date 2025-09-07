
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Taverny (95150) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Taverny (95150). Service fiable pour particuliers et entreprises, à l'orée de la forêt de Montmorency. Devis gratuit et rapide.",
};


export default function TavernyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
