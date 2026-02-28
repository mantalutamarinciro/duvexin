import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Allemagne | Expert International | DemDuVexin",
  description: "Déménagement professionnel de la France vers l'Allemagne (Berlin, Munich, Francfort, Hambourg). Service fiable, liaisons régulières et groupage. Devis gratuit.",
};

export default function GermanyPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
