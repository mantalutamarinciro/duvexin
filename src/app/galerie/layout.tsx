
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Galerie Photos - Notre Équipe et Matériel | DemDuVexin",
  description: "Découvrez en images le professionnalisme de nos équipes, la qualité de notre matériel et de nos camions de déménagement.",
};


export default function GaleriePageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
