
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Mondeville (14200) - Expert Caen la Mer | DemDuVexin",
  description: "Déménageur professionnel à Mondeville (14200). Service fiable pour particuliers et entreprises. Devis gratuit depuis notre agence d'Évreux.",
};


export default function MondevillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
