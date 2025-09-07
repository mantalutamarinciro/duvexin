
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Charenton-le-Pont (94220) | Expert Val-de-Marne | DemDuVexin",
  description: "Déménageur professionnel à Charenton-le-Pont (94220). Service fiable pour particuliers et entreprises aux portes de Paris. Devis gratuit et sur-mesure.",
};


export default function CharentonLePontPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
