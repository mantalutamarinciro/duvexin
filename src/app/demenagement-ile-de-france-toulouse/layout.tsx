
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Toulouse (31) | Spécialiste Sud-Ouest | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Toulouse (31). Service fiable et optimisé pour particuliers et entreprises vers la Ville Rose. Devis gratuit.",
};


export default function ToulousePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
