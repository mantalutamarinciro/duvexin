
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Colombes (92700) - Votre expert local | DemDuVexin",
  description: "Service de déménagement professionnel à Colombes (92700). Spécialiste des zones pavillonnaires et des nouveaux quartiers. Devis rapide et gratuit.",
};


export default function ColombesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
