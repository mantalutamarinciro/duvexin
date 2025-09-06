
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Sartrouville (78500) - Votre Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Sartrouville (78500). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure pour votre projet.",
};


export default function SartrouvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
