import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement France → Andorre | Expert Douanes & Montagne | DemDuVexin",
  description: "Déménagement professionnel de la France vers l'Andorre. Expertise douanière complète, transport sécurisé en zone de montagne et service premium. Devis gratuit.",
};

export default function AndorraPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
