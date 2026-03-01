import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions Légales | Déménagement du Vexin",
  description: "Consultez les mentions légales de Déménagement du Vexin : informations éditoriales, hébergement et conditions d'utilisation.",
};

export default function MentionsLegalesLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
