
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Saint-Maur-des-Fossés (94100) | Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Saint-Maur-des-Fossés (94100). Service haut de gamme pour maisons et appartements sur les bords de Marne. Devis gratuit.",
};


export default function SaintMaurPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
