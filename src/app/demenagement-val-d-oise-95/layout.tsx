
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménageur Val-d'Oise (95) - Cergy, Argenteuil | DemDuVexin",
  description: "Déménagement professionnel dans le Val-d'Oise (95). Votre expert local à Cergy, Pontoise, Argenteuil, Sarcelles et dans tout le 95. Devis gratuit.",
};


export default function ValDOisePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
