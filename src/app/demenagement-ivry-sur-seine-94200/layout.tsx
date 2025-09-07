
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Ivry-sur-Seine (94200) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Ivry-sur-Seine (94200). Service fiable pour particuliers et entreprises aux portes de Paris. Devis gratuit et efficace.",
};


export default function IvrySurSeinePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
