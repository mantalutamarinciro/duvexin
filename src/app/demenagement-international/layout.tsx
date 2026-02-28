import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement International en Europe | Expert Logistique | DemDuVexin",
  description: "Organisez votre déménagement international en Europe en toute sérénité. Liaisons régulières vers la Belgique, Suisse, Luxembourg, UK, Espagne, Italie et plus. Devis gratuit.",
};

export default function InternationalHubLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
