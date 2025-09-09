
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Falaise (14700) - Expert Pays de Falaise | DemDuVexin",
  description: "Déménageur professionnel à Falaise (14700). Service fiable pour particuliers et entreprises au cœur du pays de Guillaume le Conquérant. Devis gratuit.",
};


export default function FalaisePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
