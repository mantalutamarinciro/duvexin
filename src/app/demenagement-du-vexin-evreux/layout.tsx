
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "https://demenagementduvexin.fr/demenagement-du-vexin-evreux" },
};

export default function EvreuxPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
