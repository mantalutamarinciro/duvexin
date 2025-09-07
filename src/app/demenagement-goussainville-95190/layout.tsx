
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Goussainville (95190) | Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Goussainville (95190). Service fiable pour particuliers et entreprises. Proximité Roissy CDG. Devis gratuit et rapide.",
};


export default function GoussainvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
