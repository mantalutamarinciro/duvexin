
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Ouistreham (14150) - Expert Côte de Nacre | DemDuVexin",
  description: "Déménageur professionnel à Ouistreham (14150). Service fiable pour particuliers et entreprises, du port à la plage. Devis gratuit depuis notre agence d'Évreux.",
};


export default function OuistrehamPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
