
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Villejuif (94800) - Expert Déménageur | DemDuVexin",
  description: "Déménageur professionnel à Villejuif (94800). Service fiable pour particuliers, chercheurs et professionnels de santé. Devis gratuit et rapide.",
};


export default function VillejuifPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
