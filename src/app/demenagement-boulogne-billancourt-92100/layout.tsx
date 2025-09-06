
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Boulogne-Billancourt (92100) - Expert Local | DemDuVexin",
  description: "Déménagement professionnel à Boulogne-Billancourt. Service expert pour particuliers et entreprises. Gestion des accès, monte-meubles. Devis gratuit et rapide.",
};


export default function BoulogneBillancourtPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
