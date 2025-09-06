
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Asnières-sur-Seine (92600) | DemDuVexin",
  description: "Déménageur professionnel à Asnières-sur-Seine (92600). Service expert pour particuliers et entreprises, gestion des quais de Seine, devis gratuit.",
};


export default function AsnieresPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
