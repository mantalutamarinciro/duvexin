import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Monaco | Service Prestige & IGH | DemDuVexin",
  description: "Déménagement professionnel de la France vers Monaco. Expertise logistique pour immeubles de grande hauteur, accès complexes et service premium. Devis gratuit.",
};

export default function MonacoPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
