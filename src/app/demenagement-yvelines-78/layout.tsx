
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménageur Yvelines (78) - Versailles, St-Germain-en-Laye | DemDuVexin",
  description: "Déménagement professionnel dans les Yvelines (78). Service expert à Versailles, Saint-Germain-en-Laye, Rambouillet et tout le 78. Devis gratuit.",
};


export default function YvelinesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
