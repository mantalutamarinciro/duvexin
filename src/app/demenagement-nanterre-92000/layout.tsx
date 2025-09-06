
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Nanterre (92000) - Expert Local | DemDuVexin",
  description: "Déménagement professionnel à Nanterre (92000). Service expert pour particuliers et entreprises. Préfecture, quartier de l'Université, La Défense. Devis gratuit.",
};


export default function NanterrePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
