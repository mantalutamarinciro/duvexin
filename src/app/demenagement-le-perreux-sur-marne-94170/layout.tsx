
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Le Perreux-sur-Marne (94170) | Expert Bords de Marne | DemDuVexin",
  description: "Déménageur professionnel au Perreux-sur-Marne (94170). Service haut de gamme pour maisons et appartements de standing. Devis gratuit.",
};


export default function LePerreuxSurMarnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
