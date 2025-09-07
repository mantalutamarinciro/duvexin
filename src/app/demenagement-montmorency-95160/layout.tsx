
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Montmorency (95160) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Montmorency (95160). Service fiable pour particuliers et entreprises au cœur de la forêt de Montmorency. Devis gratuit et rapide.",
};


export default function MontmorencyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
