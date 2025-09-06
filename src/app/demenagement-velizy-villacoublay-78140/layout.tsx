
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Vélizy-Villacoublay (78140) | DemDuVexin",
  description: "Déménageur professionnel à Vélizy-Villacoublay (78140). Service expert pour particuliers et entreprises de la zone d'affaires. Devis gratuit et rapide.",
};


export default function VelizyVillacoublayPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
