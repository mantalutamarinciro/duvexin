
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Versailles (78000) - Expert Local | DemDuVexin",
  description: "Déménagement professionnel à Versailles (78000). Service expert pour appartements et maisons, gestion des accès. Devis gratuit et rapide.",
};


export default function VersaillesPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
