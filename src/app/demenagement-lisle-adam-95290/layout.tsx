
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement L'Isle-Adam (95290) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à L'Isle-Adam (95290). Service haut de gamme pour maisons et appartements de caractère. Devis gratuit et rapide.",
};


export default function LisleAdamPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
