import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Pays-Bas | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers les Pays-Bas (Amsterdam, Rotterdam, Utrecht). Service fiable, solutions de groupage et gestion logistique experte. Devis gratuit.",
};

export default function NetherlandsPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
