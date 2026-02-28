import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Luxembourg | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers le Luxembourg. Service fiable pour particuliers et entreprises. Solutions de groupage hebdomadaires. Devis gratuit.",
};

export default function LuxembourgPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
