"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { 
    ChevronDown, 
    Truck, 
    Building2, 
    Globe, 
    Package, 
    Calculator, 
    MapPin, 
    FileText, 
    ArrowRight,
    Paintbrush,
    Warehouse
} from "lucide-react";
import { cn } from "@/lib/utils";

const MENU_SERVICES = [
    { title: "Particuliers", href: "/demenagement-particuliers", desc: "Formules adaptées pour votre logement.", icon: Package },
    { title: "Entreprises", href: "/demenagement-entreprise-bureau", desc: "Bureaux, archives et matériel sensible.", icon: Building2 },
    { title: "Garde-Meubles", href: "/demenagement-garde-meubles", desc: "Stockage sécurisé court ou long terme.", icon: Warehouse },
    { title: "Objets Lourds", href: "/demenagement-objets-lourds", desc: "Pianos, coffres-forts et œuvres d'art.", icon: Paintbrush },
];

const MENU_OUTILS = [
    { title: "Calculateur de volume", href: "/calculateur-volume", desc: "Estimez vos m3 précisément.", icon: Calculator },
    { title: "Zones d'intervention", href: "/zones-intervention", desc: "Île-de-France et Normandie.", icon: MapPin },
    { title: "Déménagement National", href: "/demenagement-national", desc: "Trajets longue distance en France.", icon: Globe },
];

export function SiteHeader() {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header 
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-300",
                isScrolled 
                    ? "bg-white/90 backdrop-blur-xl border-slate-200 py-2 shadow-sm" 
                    : "bg-white border-transparent py-4"
            )}
        >
            <div className="container flex items-center justify-between gap-8 h-14">
                
                <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                    <Logo />
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                    <div className="group relative">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors focus:outline-none">
                            Nos Services <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                        
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-[600px]">
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-2 gap-4">
                                {MENU_SERVICES.map((item) => (
                                    <Link key={item.title} href={item.href} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                                        <div className="bg-blue-50 text-primary p-2.5 rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="group relative">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors focus:outline-none">
                            Ressources <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                         <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-[400px]">
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-2">
                                {MENU_OUTILS.map((item) => (
                                    <Link key={item.title} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <item.icon className="h-4 w-4 text-slate-400" />
                                        <div>
                                            <div className="font-medium text-slate-900 text-sm">{item.title}</div>
                                            <div className="text-[11px] text-slate-400">{item.desc}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/a-propos-de-demenagement-du-vexin" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        L'entreprise
                    </Link>
                </nav>

                <div className="flex items-center gap-3 md:gap-4">
                    <a href="tel:+33130751235" className="hidden lg:flex flex-col items-end text-right mr-2 group">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assistance 7j/7</span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors font-mono">01 30 75 12 35</span>
                    </a>
                    
                    <div className="w-px h-8 bg-slate-200 hidden lg:block" />

                    <Button asChild variant="default" className="rounded-full px-6 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                        <Link href="/demande-devis">
                            Devis Gratuit
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}