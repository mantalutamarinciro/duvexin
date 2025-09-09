
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Trouville-sur-Mer (14360) | Expert Côte Fleurie | DemDuVexin",
  description: "Déménageur professionnel à Trouville-sur-Mer (14360). Service fiable pour villas et appartements. Devis gratuit depuis notre agence d'Évreux.",
};


export default function TrouvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
