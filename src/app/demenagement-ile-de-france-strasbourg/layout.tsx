
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Strasbourg (67) | Expert Grand Est | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Strasbourg (67). Service fiable pour particuliers et entreprises vers la capitale européenne. Devis gratuit.",
};


export default function StrasbourgPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
