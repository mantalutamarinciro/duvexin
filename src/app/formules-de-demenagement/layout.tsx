import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Nos Formules de Déménagement : Économique, Standard, Prestige | DemDuVexin",
  description: "Comparez nos 3 formules de déménagement sur-mesure. De la manutention simple au service clé en main, trouvez l'offre adaptée à votre budget et vos besoins.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/formules-de-demenagement",
  }
};

export default function FormulesPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
