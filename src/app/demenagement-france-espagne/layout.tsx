import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Espagne | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers l'Espagne (Madrid, Barcelone, Valence, Séville). Service fiable, solutions de groupage et gestion logistique. Devis gratuit.",
};

export default function SpainPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
