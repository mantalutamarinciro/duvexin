
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Déménagement du Vexin",
  description: "Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée conformément au RGPD.",
};

export default function PrivacyLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
