
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Lille (59) | Spécialiste Hauts-de-France | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Lille (59). Service fiable et optimisé pour les particuliers et les entreprises. Devis gratuit.",
};


export default function LillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
