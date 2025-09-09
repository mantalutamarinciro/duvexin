
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Hérouville-Saint-Clair (14200) | Expert Calvados | DemDuVexin",
  description: "Déménageur professionnel à Hérouville-Saint-Clair (14200). Service fiable pour particuliers et entreprises. Devis gratuit depuis notre agence d'Évreux.",
};


export default function HerouvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
