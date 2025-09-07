
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Alfortville (94140) - Expert Confluence | DemDuVexin",
  description: "Déménageur professionnel à Alfortville (94140). Service fiable pour particuliers et entreprises au confluent de la Seine et de la Marne. Devis gratuit.",
};


export default function AlfortvillePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
