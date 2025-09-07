
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Eaubonne (95600) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Eaubonne (95600). Service fiable pour particuliers et entreprises. Proximité gare d'Ermont-Eaubonne. Devis gratuit.",
};


export default function EaubonnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
