
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Rambouillet (78120) - Expert Forêt de Rambouillet | DemDuVexin",
  description: "Déménagement professionnel à Rambouillet (78120). Service expert pour maisons et appartements, gestion des accès en centre-ville et en forêt. Devis gratuit.",
};


export default function RambouilletPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
