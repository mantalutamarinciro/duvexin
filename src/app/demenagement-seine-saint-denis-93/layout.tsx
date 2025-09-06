
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Seine-Saint-Denis (93) - St-Denis, Montreuil | DemDuVexin",
  description: "Déménageur professionnel en Seine-Saint-Denis (93). Service expert à Saint-Denis, Montreuil, Aubervilliers et tout le 93. Devis gratuit et rapide.",
};


export default function SeineSaintDenisPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
