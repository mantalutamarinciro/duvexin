
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Antony (92160) - Expert Local du Sud 92 | DemDuVexin",
  description: "Déménageur professionnel à Antony (92160). Service expert pour particuliers et entreprises. Devis gratuit, rapide et adapté à votre projet.",
};


export default function AntonyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
