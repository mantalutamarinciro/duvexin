
"use client";

import * as React from "react";
import Link from "next/image";
import LinkNext from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { 
    ChevronDown, 
    Building2, 
    Globe, 
    Package, 
    Calculator, 
    MapPin, 
    ArrowRight,
    Paintbrush,
    Warehouse,
    Menu,
    Phone,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    const pathname = usePathname();

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
                    ? "bg-white/95 backdrop-blur-md border-slate-200 py-2 shadow-sm" 
                    : "bg-white border-transparent py-4"
            )}
        >
            <div className="container flex items-center justify-between gap-4 h-14">
                
                <LinkNext href="/" className="flex-shrink-0 group">
                    <Logo />
                </LinkNext>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    <div className="group relative">
                        <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors focus:outline-none">
                            Nos Services <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
                        </button>
                        
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 w-[600px]">
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 grid grid-cols-2 gap-4">
                                {MENU_SERVICES.map((item) => (
                                    <LinkNext key={item.title} href={item.href} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group/item">
                                        <div className="bg-primary/5 text-primary p-2.5 rounded-lg group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">{item.title}</div>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </LinkNext>
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
                                    <LinkNext key={item.title} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="bg-slate-50 text-slate-400 p-2 rounded-lg">
                                            <item.icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900 text-sm">{item.title}</div>
                                            <div className="text-[11px] text-slate-400">{item.desc}</div>
                                        </div>
                                    </LinkNext>
                                ))}
                            </div>
                        </div>
                    </div>

                    <LinkNext href="/a-propos-de-demenagement-du-vexin" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                        L'entreprise
                    </LinkNext>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <a href="tel:+33130751235" className="hidden lg:flex flex-col items-end text-right mr-2 group">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assistance 7j/7</span>
                        <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors font-mono">01 30 75 12 35</span>
                    </a>
                    
                    <div className="w-px h-8 bg-slate-200 hidden lg:block" />

                    <Button asChild variant="default" className="rounded-full px-6 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 hidden sm:flex">
                        <LinkNext href="/demande-devis">
                            Devis Gratuit
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </LinkNext>
                    </Button>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-left flex justify-start">
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 h-[calc(100vh-120px)]">
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Nos Services</h4>
                                    <div className="grid gap-1">
                                        {MENU_SERVICES.map(item => (
                                            <LinkNext key={item.title} href={item.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <item.icon className="h-5 w-5 text-primary" />
                                                <span className="text-sm font-medium">{item.title}</span>
                                            </LinkNext>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Outils & Ressources</h4>
                                    <div className="grid gap-1">
                                        {MENU_OUTILS.map(item => (
                                            <LinkNext key={item.title} href={item.href} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                                                <item.icon className="h-5 w-5 text-slate-400" />
                                                <span className="text-sm font-medium">{item.title}</span>
                                            </LinkNext>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t space-y-1">
                                    <LinkNext href="/a-propos-de-demenagement-du-vexin" className="flex items-center gap-3 p-2 text-sm font-medium hover:text-primary">
                                        <Info className="h-5 w-5 text-slate-400" />
                                        L'entreprise
                                    </LinkNext>
                                </div>
                                <div className="mt-auto space-y-4 pb-6">
                                    <Button asChild className="w-full rounded-full h-12 font-bold shadow-lg">
                                        <LinkNext href="/demande-devis">Obtenir mon devis</LinkNext>
                                    </Button>
                                    <a href="tel:+33130751235" className="flex items-center justify-center gap-2 text-primary font-bold p-2 bg-primary/5 rounded-xl">
                                        <Phone className="h-4 w-4" />
                                        01 30 75 12 35
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
