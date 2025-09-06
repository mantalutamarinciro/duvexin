
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Le Chesnay-Rocquencourt (78150) | DemDuVexin",
  description: "Déménageur professionnel au Chesnay-Rocquencourt (78150). Service expert pour particuliers et entreprises, proche de Versailles. Devis gratuit et rapide.",
};


export default function LeChesnayRocquencourtPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
