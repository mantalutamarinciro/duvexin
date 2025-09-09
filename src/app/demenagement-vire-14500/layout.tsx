
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Vire (14500) - Expert Bocage Normand | DemDuVexin",
  description: "Déménageur professionnel à Vire (14500). Service fiable pour particuliers et entreprises au cœur du Bocage Virois. Devis gratuit depuis notre agence d'Évreux.",
};


export default function VirePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
