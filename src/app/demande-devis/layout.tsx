
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: "https://demenagementduvexin.fr/demande-devis" },
  title: "Devis déménagement gratuit | Demande personnalisée",
  description: "Demandez un devis de déménagement gratuit et sans engagement. Indiquez vos adresses, vos accès et votre inventaire pour obtenir une proposition adaptée.",
};


export default function QuotePageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
    
