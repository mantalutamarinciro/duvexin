import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Tarifs Déménagement 2026 : Estimateur & Prix m³ | DemDuVexin",
  description: "Découvrez nos tarifs de déménagement. Utilisez notre estimateur précis en ligne pour calculer le prix de votre projet selon le volume, la distance et les accès. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/tarif-demenagement",
  }
};

export default function TarifsPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
