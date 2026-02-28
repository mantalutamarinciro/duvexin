import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Royaume-Uni | Expert Douanes & Brexit | DemDuVexin",
  description: "Déménagement professionnel de la France vers le Royaume-Uni (Londres, Manchester, Bristol). Expertise douanière post-Brexit, liaisons régulières et service premium. Devis gratuit.",
};

export default function UKPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
