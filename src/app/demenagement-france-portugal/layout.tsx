import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Portugal | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers le Portugal (Lisbonne, Porto, Faro). Service fiable, solutions de groupage et gestion logistique longue distance. Devis gratuit.",
};

export default function PortugalPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
