import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Logo />
                    <nav className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link href="#features">Services</Link>
                        </Button>
                         <Button variant="ghost" asChild>
                            <Link href="#contact">Contact</Link>
                        </Button>
                         <Button asChild>
                            <Link href="/dashboard">Espace Client</Link>
                        </Button>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t">
                <div className="container py-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} DemDuVexin. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
