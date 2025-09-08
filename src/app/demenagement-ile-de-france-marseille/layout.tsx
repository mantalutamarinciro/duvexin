
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Marseille (13) | Spécialiste Longue Distance | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Marseille (13). Service fiable et optimisé pour les particuliers et les entreprises. Devis gratuit.",
};


export default function MarseillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
