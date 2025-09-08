
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Orne (61) - Alençon, Flers, Argentan | DemDuVexin",
  description: "Déménagement professionnel dans l'Orne (61). Service expert à Alençon, Flers, Argentan et dans toute la Normandie. Devis gratuit depuis notre agence d'Évreux.",
};


export default function OrnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
