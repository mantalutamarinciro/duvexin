
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Bernay (27300) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Bernay (27300). Service fiable pour particuliers et entreprises au cœur de la Normandie. Devis gratuit depuis notre agence d'Évreux.",
};


export default function BernayPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
