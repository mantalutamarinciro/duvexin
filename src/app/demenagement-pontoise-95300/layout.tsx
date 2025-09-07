
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Pontoise (95300) - Expert Local Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Pontoise (95300). Service expert pour appartements et maisons. Maîtrise du centre historique. Devis gratuit et rapide.",
};


export default function PontoisePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
