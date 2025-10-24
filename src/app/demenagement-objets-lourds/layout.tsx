
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Objets Lourds et Pianos | DemDuVexin",
  description: "Service de transport spécialisé pour objets lourds, volumineux et fragiles : pianos, coffres-forts, œuvres d'art. Manutention experte et sécurisée.",
};


export default function ObjetsLourdsPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
