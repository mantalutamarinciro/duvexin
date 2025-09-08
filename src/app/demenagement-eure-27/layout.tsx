
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Eure (27) - Évreux et Normandie | DemDuVexin",
  description: "Déménagement professionnel dans l'Eure (27). Service expert à Évreux, Vernon, Louviers et dans toute la Normandie grâce à notre agence locale. Devis gratuit.",
};


export default function EurePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
