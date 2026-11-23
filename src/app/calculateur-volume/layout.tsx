
import LandingLayout from "@/app/landing/layout";
import type { PropsWithChildren } from "react";


export default function VolumeCalculatorPageLayout({ children }: PropsWithChildren) {
    return (
        <LandingLayout>
            {children}
        </LandingLayout>
    )
}
