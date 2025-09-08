
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Évreux (27000) - Votre Agence Locale | DemDuVexin",
  description: "Déménageur professionnel à Évreux (27000). Service expert depuis notre agence locale pour les particuliers et les entreprises de l'Eure. Devis gratuit.",
};


export default function EvreuxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
