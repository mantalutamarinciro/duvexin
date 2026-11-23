import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Formules de déménagement | Économique, Standard, Prestige",
  description: "Comparez les prestations incluses dans nos formules Économique, Standard et Prestige : transport, cartons, mobilier, objets fragiles et déballage.",
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
