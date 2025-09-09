
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Ifs (14123) - Expert Sud de Caen | DemDuVexin",
  description: "Déménageur professionnel à Ifs (14123). Service fiable pour particuliers et entreprises au sud de Caen. Devis gratuit depuis notre agence d'Évreux.",
};


export default function IfsPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
