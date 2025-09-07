
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Champigny-sur-Marne (94500) | DemDuVexin",
  description: "Déménageur professionnel à Champigny-sur-Marne (94500). Service fiable pour particuliers et entreprises sur les bords de Marne. Devis gratuit.",
};


export default function ChampignySurMarnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
