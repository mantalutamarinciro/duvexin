
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement National Longue Distance | DemDuVexin",
  description: "Déménageur professionnel pour vos projets longue distance partout en France. Service fiable et optimisé depuis l'Île-de-France. Devis gratuit.",
};


export default function NationalPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
