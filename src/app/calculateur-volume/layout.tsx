
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Calculateur de Volume de Déménagement | Estimez votre besoin | DemDuVexin",
  description: "Utilisez notre calculateur de volume gratuit pour estimer précisément le volume en m³ de vos biens. Obtenez un devis de déménagement plus juste et rapide.",
};


export default function VolumeCalculatorPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
