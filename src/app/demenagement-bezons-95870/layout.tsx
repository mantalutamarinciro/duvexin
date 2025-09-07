
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Bezons (95870) - Expert Déménageur | DemDuVexin",
  description: "Déménageur professionnel à Bezons (95870). Service fiable pour particuliers et entreprises aux portes de La Défense. Devis gratuit et rapide.",
};


export default function BezonsPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
