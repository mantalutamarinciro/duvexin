
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Seine-Maritime (76) - Rouen, Le Havre | DemDuVexin",
  description: "Déménagement professionnel en Seine-Maritime (76). Service expert à Rouen, Le Havre, Dieppe et sur toute la côte normande. Devis gratuit depuis notre agence d'Évreux.",
};


export default function SeineMaritimePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
