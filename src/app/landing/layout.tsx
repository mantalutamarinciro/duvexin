import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            <SiteHeader />
            <main className="flex-1 relative z-0">
                {children}
            </main>
            <SiteFooter />
        </div>
    );
}