
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Vernon (27200) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Vernon (27200). Service expert pour particuliers et entreprises aux portes de la Normandie. Devis gratuit et rapide.",
};


export default function VernonPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
