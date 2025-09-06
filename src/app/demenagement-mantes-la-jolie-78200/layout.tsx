
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Mantes-la-Jolie (78200) - Expert Yvelines | DemDuVexin",
  description: "Déménageur professionnel à Mantes-la-Jolie (78200). Service expert pour particuliers et entreprises dans le Mantois. Devis gratuit, rapide et adapté.",
};


export default function MantesLaJoliePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
