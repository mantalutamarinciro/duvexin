
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Issy-les-Moulineaux (92130) | Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Issy-les-Moulineaux (92130). Service sur-mesure pour particuliers et entreprises. Devis gratuit, rapide et transparent.",
};


export default function IssyLesMoulineauxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
