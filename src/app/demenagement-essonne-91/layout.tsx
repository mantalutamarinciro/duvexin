
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Essonne (91) - Évry, Corbeil, Saclay | DemDuVexin",
  description: "Déménagement professionnel en Essonne (91). Service expert à Évry, Corbeil-Essonnes, Massy, Palaiseau, sur le plateau de Saclay et tout le 91. Devis gratuit.",
};


export default function EssonnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
