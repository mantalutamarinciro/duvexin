
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Sarcelles (95200) - Expert Déménageur | DemDuVexin",
  description: "Déménageur professionnel à Sarcelles (95200). Service fiable pour appartements et maisons dans le Val-d'Oise. Devis gratuit, rapide et sur-mesure.",
};


export default function SarcellesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
