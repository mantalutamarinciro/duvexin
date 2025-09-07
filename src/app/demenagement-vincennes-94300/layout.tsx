
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Vincennes (94300) - Expert Déménageur | DemDuVexin",
  description: "Déménagement professionnel à Vincennes (94300). Service haut de gamme pour appartements et demeures de caractère. Gestion des accès et monte-meubles. Devis gratuit.",
};


export default function VincennesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
