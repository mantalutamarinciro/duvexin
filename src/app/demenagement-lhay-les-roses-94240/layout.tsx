
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement L'Haÿ-les-Roses (94240) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à L'Haÿ-les-Roses (94240). Service fiable pour particuliers et entreprises. Devis gratuit et rapide pour votre projet.",
};


export default function LhayLesRosesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
