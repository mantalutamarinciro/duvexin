
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Ermont (95120) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Ermont (95120). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure pour votre projet.",
};


export default function ErmontPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
