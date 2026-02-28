import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Le Journal du Déménagement | Conseils & Actualités | DemDuVexin",
  description: "Découvrez nos conseils d'experts pour préparer votre déménagement sans stress. Astuces emballage, guides administratifs et actualités du secteur.",
};

export default function BlogLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
