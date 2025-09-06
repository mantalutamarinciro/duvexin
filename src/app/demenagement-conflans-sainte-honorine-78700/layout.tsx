
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Conflans-Sainte-Honorine (78700) | DemDuVexin",
  description: "Déménageur professionnel à Conflans-Sainte-Honorine (78700). Service expert pour particuliers et entreprises. Devis gratuit, rapide et adapté.",
};


export default function ConflansPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
