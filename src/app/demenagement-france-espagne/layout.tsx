import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: "https://demenagementduvexin.fr/demenagement-france-espagne" },
  title: "Déménagement France Espagne | Devis international",
  description: "Préparez votre déménagement entre la France et l'Espagne : volume, accès, inventaire, transport direct ou groupage. Demandez un devis personnalisé.",
};

export default function SpainPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
