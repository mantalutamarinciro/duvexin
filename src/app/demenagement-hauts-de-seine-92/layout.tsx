
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Hauts-de-Seine (92) - La Défense, Boulogne | DemDuVexin",
  description: "Déménagement professionnel dans les Hauts-de-Seine (92). Service expert à Boulogne, Nanterre, Courbevoie, Neuilly et tout le 92. Devis gratuit.",
};


export default function HautsDeSeinePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
