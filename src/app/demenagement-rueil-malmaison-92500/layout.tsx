
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Rueil-Malmaison (92500) | Expert Local | DemDuVexin",
  description: "Déménagement professionnel à Rueil-Malmaison (92500). Service expert pour particuliers et entreprises. Devis rapide, gratuit et personnalisé.",
};


export default function RueilMalmaisonPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
