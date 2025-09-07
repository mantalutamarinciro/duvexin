
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Choisy-le-Roi (94600) - Expert Val-de-Marne | DemDuVexin",
  description: "Déménageur professionnel à Choisy-le-Roi (94600). Service fiable pour particuliers et entreprises en bord de Seine. Devis gratuit et sur-mesure.",
};


export default function ChoisyLeRoiPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
