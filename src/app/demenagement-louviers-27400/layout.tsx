
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Louviers (27400) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Louviers (27400). Service fiable pour particuliers et entreprises. Devis gratuit et rapide depuis notre agence d'Évreux.",
};


export default function LouviersPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
