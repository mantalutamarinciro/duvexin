
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Cormeilles-en-Parisis (95240) | DemDuVexin",
  description: "Déménageur professionnel à Cormeilles-en-Parisis (95240). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure.",
};


export default function CormeillesEnParisisPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
