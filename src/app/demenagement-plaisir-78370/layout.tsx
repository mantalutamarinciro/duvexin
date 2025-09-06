
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Plaisir (78370) - Expert Yvelines | DemDuVexin",
  description: "Déménageur professionnel à Plaisir (78370). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure pour votre projet.",
};


export default function PlaisirPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
