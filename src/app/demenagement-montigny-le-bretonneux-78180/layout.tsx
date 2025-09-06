
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Montigny-le-Bretonneux (78180) | DemDuVexin",
  description: "Déménageur professionnel à Montigny-le-Bretonneux (78180). Service expert pour particuliers et entreprises à Saint-Quentin-en-Yvelines. Devis gratuit.",
};


export default function MontignyLeBretonneuxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
