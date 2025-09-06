
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";

export default function ServicesPageLayout({ children }: PropsWithChildren) {
    // We reuse the main landing page layout to keep the header and footer consistent.
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
