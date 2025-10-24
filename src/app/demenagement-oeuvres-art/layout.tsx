
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement d'Œuvres d'Art et Objets de Valeur | DemDuVexin",
  description: "Service de transport spécialisé pour œuvres d'art, sculptures et objets de collection. Emballage sur-mesure, transport sécurisé et manutention experte.",
};


export default function OeuvresArtPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
