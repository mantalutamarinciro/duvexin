
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Nantes (44) | Spécialiste Grand Ouest | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Nantes (44). Service fiable et optimisé pour les particuliers et les entreprises. Devis gratuit.",
};


export default function NantesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
