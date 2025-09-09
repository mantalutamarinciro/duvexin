
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Les Andelys (27700) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel aux Andelys (27700). Service expert au pied de Château-Gaillard, en bord de Seine. Devis gratuit et rapide depuis notre agence d'Évreux.",
};


export default function LesAndelysPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
