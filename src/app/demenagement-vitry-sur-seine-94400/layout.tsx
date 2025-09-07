
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Vitry-sur-Seine (94400) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Vitry-sur-Seine (94400). Service fiable et efficace pour particuliers et entreprises. Devis gratuit et sur-mesure.",
};


export default function VitrySurSeinePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
