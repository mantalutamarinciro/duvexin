
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Calvados (14) - Caen, Deauville, Côte Fleurie | DemDuVexin",
  description: "Déménagement professionnel dans le Calvados (14). Service expert à Caen, Lisieux, Deauville et sur toute la Côte Fleurie. Devis gratuit depuis notre agence d'Évreux.",
};


export default function CalvadosPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
