import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, LogIn } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import * as React from "react";
import { MainNav } from "@/components/main-nav";

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
             {/* TOP INFO BAR */}
             <div className="bg-primary text-primary-foreground">
                <div className="container h-10 flex items-center justify-center">
                    <a href="tel:+33130751235" className="flex items-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity">
                       <Phone className="h-4 w-4" />
                       <span>Appelez-nous maintenant (+33)1 30 75 12 35</span>
                    </a>
                </div>
            </div>

            {/* HEADER */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between gap-4">
                    <Logo />
                    <MainNav />
                     <div className="hidden lg:flex items-center gap-2">
                        <Button asChild variant="ghost">
                           <Link href="/login">
                                <LogIn className="mr-2 h-4 w-4" />
                                Dashboard
                           </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/demande-devis">Obtenir un devis</Link>
                        </Button>
                     </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="border-t bg-gray-900 text-gray-300">
                <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="md:col-span-1">
                     <Logo />
                     <p className="text-sm text-gray-400 mt-4">
                        Votre partenaire de confiance pour un déménagement sans stress, réalisé par nos équipes salariées.
                     </p>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-4 text-white uppercase text-xs tracking-widest">Agence Île-de-France</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary"/> 9 Rue de Pontoise, 95540 Méry-sur-Oise</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary"/> (+33)1 30 75 12 35</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary"/> contact@demenagementduvexin.fr</p>
                        </div>
                   </div>
                    <div className="md:col-span-1">
                        <h4 className="font-semibold mb-4 text-white uppercase text-xs tracking-widest">Agence Normandie</h4>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary"/> 22 Rue Isambard, 27000 Évreux</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary"/> (+33) 3 74 47 44 77</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary"/> demenagementduvexin@evreux.fr</p>
                            <Link href="/demenagement-du-vexin-evreux" className="text-primary font-semibold hover:underline text-xs pt-1 inline-block">En savoir plus sur l'agence d'Évreux</Link>
                        </div>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-4 text-white uppercase text-xs tracking-widest">Navigation</h4>
                        <div className="flex flex-col space-y-2 text-sm text-gray-400">
                           <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                           <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary transition-colors">À propos</Link>
                           <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
                           <Link href="/calculateur-volume" className="hover:text-primary transition-colors">Calculateur de volume</Link>
                           <Link href="/zones-intervention" className="hover:text-primary transition-colors">Zones d'intervention</Link>
                           <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                           <Link href="/demande-devis" className="hover:text-primary transition-colors font-bold text-white">Demander un devis</Link>
                        </div>
                   </div>
                </div>
                <div className="border-t border-gray-800 bg-black/20">
                    <div className="container py-6 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} Déménagement Du Vexin. Réalisé avec ❤️ par Creow.
                    </div>
                </div>
            </footer>
        </div>
    );
}
