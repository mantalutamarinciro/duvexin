
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Cergy (95000) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménagement professionnel à Cergy (95000) et Cergy-Pontoise. Service expert pour particuliers, étudiants et entreprises. Devis gratuit et rapide.",
};


export default function CergyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
