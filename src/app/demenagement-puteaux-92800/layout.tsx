
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Puteaux (92800) - Expert La Défense | DemDuVexin",
  description: "Déménagement professionnel à Puteaux (92800). Service expert pour particuliers et entreprises à La Défense. Monte-meubles, gestion des accès. Devis gratuit.",
};


export default function PuteauxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
