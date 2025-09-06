
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Les Mureaux (78130) - Expert Yvelines | DemDuVexin",
  description: "Déménageur professionnel aux Mureaux (78130). Service fiable pour particuliers et entreprises. Devis gratuit, rapide et sur-mesure pour votre projet.",
};


export default function LesMureauxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
