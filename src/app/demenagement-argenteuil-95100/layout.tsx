
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Argenteuil (95100) - Expert Local Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Argenteuil (95100). Service fiable pour particuliers et entreprises dans la ville la plus peuplée du 95. Devis gratuit et rapide.",
};


export default function ArgenteuilPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
