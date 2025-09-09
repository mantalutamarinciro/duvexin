
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Pont-Audemer (27500) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Pont-Audemer (27500). Service expert pour particuliers et entreprises dans la Venise Normande. Devis gratuit et rapide.",
};


export default function PontAudemerPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
