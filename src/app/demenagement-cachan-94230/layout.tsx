
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Cachan (94230) - Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Cachan (94230). Service fiable pour particuliers et étudiants de l'ENS. Devis gratuit et rapide.",
};


export default function CachanPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
