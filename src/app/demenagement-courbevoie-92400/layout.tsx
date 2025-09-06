
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Courbevoie (92400) - Expert La Défense | DemDuVexin",
  description: "Déménagement professionnel à Courbevoie (92400). Service expert pour particuliers et entreprises, quartier La Défense, Faubourg de l'Arche. Devis gratuit.",
};


export default function CourbevoiePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
