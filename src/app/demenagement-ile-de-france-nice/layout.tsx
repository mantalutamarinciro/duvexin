
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Île-de-France → Nice (06) | Spécialiste Côte d'Azur | DemDuVexin",
  description: "Déménagement longue distance entre l'Île-de-France et Nice (06). Service fiable pour particuliers et entreprises vers la Côte d'Azur. Devis gratuit.",
};


export default function NicePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
