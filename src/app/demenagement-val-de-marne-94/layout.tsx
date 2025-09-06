
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Val-de-Marne (94) - Créteil, Vincennes | DemDuVexin",
  description: "Déménagement professionnel dans le Val-de-Marne (94). Service expert à Créteil, Vitry, Champigny, Saint-Maur, Vincennes et tout le 94. Devis gratuit.",
};


export default function ValDeMarnePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
