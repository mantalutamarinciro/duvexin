
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Enghien-les-Bains (95880) | Déménageur Prestige | DemDuVexin",
  description: "Déménageur professionnel à Enghien-les-Bains (95880). Service haut de gamme pour appartements et maisons de prestige. Devis gratuit.",
};


export default function EnghienLesBainsPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
