import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Suisse | Expert Douanes & Prestige | DemDuVexin",
  description: "Déménagement professionnel de la France vers la Suisse (Genève, Lausanne, Zurich). Expertise douanière complète, transport sécurisé et service premium. Devis gratuit.",
};

export default function SwitzerlandPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
