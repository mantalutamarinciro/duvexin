
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Paris (75) - Expert Déménageur | DemDuVexin",
  description: "Déménagement professionnel à Paris (75). Service expert tous arrondissements, gestion des autorisations, monte-meubles. Devis gratuit.",
};


export default function ParisPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
