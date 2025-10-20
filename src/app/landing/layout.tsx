
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import * as React from "react";
import { MainNav } from "@/components/main-nav";


export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-svh flex flex-col bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container h-16 flex items-center justify-between">
                    <Logo />
                    <MainNav />
                     <Button asChild>
                        <Link href="/demande-devis">Obtenir un devis</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t bg-gray-900 text-gray-300">
                <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="md:col-span-1">
                     <Logo />
                     <p className="text-sm text-gray-400 mt-4">
                        Votre partenaire de confiance pour un déménagement sans stress.
                     </p>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Agence Île-de-France</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary"/> 9 Rue de Pontoise, 95540 Méry-sur-Oise</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary"/> (+33)1 30 75 12 35</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary"/> contact@demenagementduvexin.fr</p>
                        </div>
                   </div>
                    <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Agence Normandie</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary"/> 22 Rue Isambard, 27000 Évreux, Normandie</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-primary"/> (+33) 3 74 47 44 77</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-primary"/> demenagementduvexin@evreux.fr</p>
                            <Link href="/demenagement-du-vexin-evreux" className="text-primary font-semibold hover:underline text-xs pt-1">En savoir plus...</Link>
                        </div>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2 text-white">Navigation</h4>
                        <div className="flex flex-col space-y-1 text-sm text-gray-400">
                           <Link href="/landing" className="hover:text-primary">Accueil</Link>
                           <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">A propos</Link>
                           <Link href="/services" className="hover:text-primary">Services</Link>
                           <Link href="/landing#contact" className="hover:text-primary">Contact</Link>
                           <Link href="/demande-devis" className="hover:text-primary">Devis</Link>
                        </div>
                   </div>
                </div>
                <div className="border-t border-gray-800">
                    <div className="container py-4 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Déménagement Du Vexin. Réalisé avec ❤️ par Creow.
                    </div>
                </div>
            </footer>
        </div>
    );
}
    
