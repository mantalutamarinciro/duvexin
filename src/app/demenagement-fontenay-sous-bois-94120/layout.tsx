
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Fontenay-sous-Bois (94120) | Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Fontenay-sous-Bois (94120). Service expert pour appartements et maisons. Proximité Bois de Vincennes. Devis gratuit.",
};


export default function FontenaySousBoisPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
