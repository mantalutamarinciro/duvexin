
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Verneuil d'Avre et d'Iton (27130) | DemDuVexin",
  description: "Déménageur professionnel à Verneuil-sur-Avre et d'Iton (27130). Service expert au sud de l'Eure, aux portes du Perche. Devis gratuit et rapide.",
};


export default function VerneuilPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
