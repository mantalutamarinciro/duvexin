
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Demande de Devis Déménagement | DemDuVexin",
  description: "Obtenez un devis gratuit et personnalisé pour votre déménagement. Remplissez notre formulaire en quelques minutes et recevez une estimation rapide.",
};


export default function QuotePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
    
