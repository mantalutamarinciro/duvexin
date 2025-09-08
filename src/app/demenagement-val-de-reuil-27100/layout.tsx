
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Val-de-Reuil (27100) - Expert Eure | DemDuVexin",
  description: "Déménageur professionnel à Val-de-Reuil (27100). Service fiable pour particuliers et entreprises dans la plus jeune commune de France. Devis gratuit et rapide.",
};


export default function ValDeReuilPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
