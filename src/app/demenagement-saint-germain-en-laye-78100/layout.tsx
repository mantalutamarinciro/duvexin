
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Saint-Germain-en-Laye (78100) | Expert Local | DemDuVexin",
  description: "Déménagement professionnel à Saint-Germain-en-Laye (78100). Service expert pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure.",
};


export default function SaintGermainPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
