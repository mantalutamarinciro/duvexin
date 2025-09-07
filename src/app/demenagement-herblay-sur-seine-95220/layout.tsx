
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Herblay-sur-Seine (95220) | Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Herblay-sur-Seine (95220). Service fiable pour particuliers et entreprises en bord de Seine. Devis gratuit et rapide.",
};


export default function HerblaySurSeinePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
