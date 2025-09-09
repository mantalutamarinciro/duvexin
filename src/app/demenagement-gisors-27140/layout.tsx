
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Gisors (27140) - Expert Vexin Normand | DemDuVexin",
  description: "Déménageur professionnel à Gisors (27140). Service fiable pour particuliers et entreprises. Devis gratuit et rapide depuis notre agence d'Évreux.",
};


export default function GisorsPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
