import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Italie | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers l'Italie (Rome, Milan, Turin, Florence). Service fiable, solutions de groupage et gestion logistique transalpine. Devis gratuit.",
};

export default function ItalyPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
