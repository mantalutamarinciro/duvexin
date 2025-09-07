
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Créteil (94000) - Expert Val-de-Marne | DemDuVexin",
  description: "Déménageur professionnel à Créteil (94000). Service expert pour particuliers et entreprises. Gestion des accès, solutions monte-meubles. Devis gratuit.",
};


export default function CreteilPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
