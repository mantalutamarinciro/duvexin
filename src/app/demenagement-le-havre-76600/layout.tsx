import LandingLayout from "@/app/landing/layout";
import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Déménageur Le Havre (76600) | Devis personnalisé",
  description:
    "Déménagement au Havre : étude du volume, des accès, du stationnement et de la formule adaptée. Demandez un devis personnalisé pour votre projet.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-le-havre-76600",
  },
};

export default function LeHavreLayout({ children }: PropsWithChildren) {
  return <LandingLayout>{children}</LandingLayout>;
}
