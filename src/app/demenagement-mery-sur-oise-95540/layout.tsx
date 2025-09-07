
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Méry-sur-Oise (95540) - Siège Social | DemDuVexin",
  description: "Déménageur professionnel à Méry-sur-Oise (95540), notre siège social. Service expert pour particuliers et entreprises. Devis gratuit et rapide.",
};


export default function MerySurOisePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
