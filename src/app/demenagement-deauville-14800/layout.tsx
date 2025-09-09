
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Deauville (14800) - Expert Côte Fleurie | DemDuVexin",
  description: "Déménageur professionnel à Deauville (14800). Service haut de gamme pour résidences secondaires et appartements de standing. Devis gratuit.",
};


export default function DeauvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}

