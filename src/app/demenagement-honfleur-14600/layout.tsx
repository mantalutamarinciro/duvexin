
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Honfleur (14600) - Expert Calvados | DemDuVexin",
  description: "Déménageur professionnel à Honfleur (14600). Service fiable pour particuliers et entreprises dans la cité des peintres. Devis gratuit et rapide.",
};


export default function HonfleurPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
