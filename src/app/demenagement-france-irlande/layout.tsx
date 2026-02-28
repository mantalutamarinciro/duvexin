import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Irlande | Expert International & Ferry | DemDuVexin",
  description: "Déménagement professionnel de la France vers l'Irlande (Dublin, Cork, Galway). Service fiable, liaisons régulières en ferry et solutions de groupage. Devis gratuit.",
};

export default function IrelandPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
