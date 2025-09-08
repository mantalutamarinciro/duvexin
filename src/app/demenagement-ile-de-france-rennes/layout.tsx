
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Rennes (35) | Spécialiste Bretagne | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Rennes (35). Service fiable et optimisé pour les particuliers et les entreprises vers la Bretagne. Devis gratuit.",
};


export default function RennesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
