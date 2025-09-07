
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Déménagement Lyon (69) | Île-de-France <> Lyon | DemDuVexin",
  description: "Déménagement longue distance entre Lyon (69) et l'Île-de-France. Service fiable pour particuliers et entreprises. Devis gratuit et rapide.",
};


export default function LyonPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
