
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Gaillon (27600) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Gaillon (27600). Service expert pour particuliers et entreprises près de l'A13. Devis gratuit depuis notre agence d'Évreux.",
};


export default function GaillonPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
