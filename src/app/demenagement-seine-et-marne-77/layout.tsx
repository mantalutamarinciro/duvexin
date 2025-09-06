
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Seine-et-Marne (77) - Meaux, Melun | DemDuVexin",
  description: "Déménagement professionnel en Seine-et-Marne (77). Service expert à Meaux, Melun, Chelles, Fontainebleau et tout le 77. Devis gratuit et rapide.",
};


export default function SeineEtMarnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
