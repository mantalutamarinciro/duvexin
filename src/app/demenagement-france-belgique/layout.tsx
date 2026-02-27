
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Belgique | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers la Belgique (Bruxelles, Anvers, Liège). Service fiable, solutions de groupage et gestion logistique. Devis gratuit.",
};

export default function BelgiumPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
