
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Franconville (95130) - Expert Val-d'Oise | DemDuVexin",
  description: "Déménageur professionnel à Franconville (95130). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure.",
};


export default function FranconvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
