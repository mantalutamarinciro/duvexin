import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
            <div className="bg-primary text-primary-foreground">
                <div className="container h-10 flex items-center justify-center">
                     <a href="tel:+33130751235" className="flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
                        <Phone className="h-4 w-4" />
                        <span>Appelez-nous maintenant (+33)1 30 75 12 35</span>
                    </a>
                </div>
            </div>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Logo />
                    <nav className="hidden sm:flex items-center gap-4">
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
