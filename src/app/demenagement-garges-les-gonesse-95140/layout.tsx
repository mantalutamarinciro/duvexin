
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Garges-lès-Gonesse (95140) | DemDuVexin",
  description: "Déménageur professionnel à Garges-lès-Gonesse (95140). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et adapté.",
};


export default function GargesLesGonessePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
