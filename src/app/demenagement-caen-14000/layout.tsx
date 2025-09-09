
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Caen (14000) - Expert Calvados | DemDuVexin",
  description: "Déménageur professionnel à Caen (14000). Service fiable pour particuliers et entreprises dans la capitale normande. Devis gratuit depuis notre agence d'Évreux.",
};


export default function CaenPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
