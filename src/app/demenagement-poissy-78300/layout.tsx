
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Poissy (78300) - Expert Local Yvelines | DemDuVexin",
  description: "Déménagement professionnel à Poissy (78300). Service expert pour particuliers et entreprises. Devis gratuit, rapide et adapté à votre projet.",
};


export default function PoissyPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
