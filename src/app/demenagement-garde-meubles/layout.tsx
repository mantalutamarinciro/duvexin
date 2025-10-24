
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Garde-Meubles et Stockage Sécurisé | DemDuVexin",
  description: "Solutions de garde-meubles flexibles et sécurisées pour particuliers et entreprises. Stockez vos biens en toute sérénité. Devis gratuit.",
};


export default function GardeMeublesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
