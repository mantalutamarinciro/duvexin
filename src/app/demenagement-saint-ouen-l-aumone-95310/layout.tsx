
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Saint-Ouen-l'Aumône (95310) | DemDuVexin",
  description: "Déménageur professionnel à Saint-Ouen-l'Aumône (95310). Service expert pour particuliers et entreprises (Parc des Béthunes...). Devis gratuit.",
};


export default function SaintOuenLAumonePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
