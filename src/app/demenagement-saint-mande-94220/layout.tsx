
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Saint-Mandé (94220) - Expert Déménageur | DemDuVexin",
  description: "Déménageur professionnel à Saint-Mandé (94220). Service haut de gamme pour appartements de standing et demeures de caractère. Discrétion et efficacité. Devis gratuit.",
};


export default function SaintMandePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
