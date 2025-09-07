
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Nogent-sur-Marne (94130) | Expert Local | DemDuVexin",
  description: "Déménageur professionnel à Nogent-sur-Marne (94130). Service haut de gamme pour appartements et maisons de caractère en bord de Marne. Devis gratuit.",
};


export default function NogentSurMarnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
