
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Villiers-le-Bel (95400) | Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Villiers-le-Bel (95400). Service fiable pour appartements et maisons. Devis gratuit, rapide et sur-mesure.",
};


export default function VilliersLeBelPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
