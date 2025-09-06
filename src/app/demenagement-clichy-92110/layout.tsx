
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Clichy (92110) - Déménageur Expert | DemDuVexin",
  description: "Déménageur professionnel à Clichy (92110). Service expert pour particuliers et entreprises aux portes de Paris. Devis gratuit, rapide et adapté.",
};


export default function ClichyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
