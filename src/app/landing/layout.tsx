
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, ChevronDown } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
                    <nav className="hidden lg:flex items-center gap-2">
                        <Button variant="ghost" asChild><Link href="/landing">Accueil</Link></Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    À propos
                                    <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href="/a-propos-de-demenagement-du-vexin">Notre entreprise</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/demenagement-du-vexin-evreux">Agence d'Évreux</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    Services
                                    <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href="/services">Tous nos services</Link>
                                </DropdownMenuItem>
                                 <DropdownMenuItem asChild>
                                    <Link href="/demenagement-entreprise-bureau">Déménagement d'entreprise</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="ghost" asChild><Link href="/landing#contact">Contact</Link></Button>
                    </nav>
                     <Button asChild>
                        <Link href="/dashboard/quote">Obtenir un devis</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t bg-muted/50">
                <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                   <div className="md:col-span-1">
                     <Logo />
                     <p className="text-sm text-muted-foreground mt-4">
                        Votre partenaire de confiance pour un déménagement sans stress.
                     </p>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Agence Île-de-France</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> 9 Rue de Pontoise, 95540 Méry-sur-Oise</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0"/> (+33)1 30 75 12 35</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/> contact@demenagementduvexin.fr</p>
                        </div>
                   </div>
                    <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Agence Normandie</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0"/> 22 Rue Isambard, 27000 Évreux, Normandie</p>
                            <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0"/> (+33) 3 74 47 44 77</p>
                            <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0"/> demenagementduvexin@evreux.fr</p>
                            <Link href="/demenagement-du-vexin-evreux" className="text-primary font-semibold hover:underline text-xs pt-1">En savoir plus...</Link>
                        </div>
                   </div>
                   <div className="md:col-span-1">
                        <h4 className="font-semibold mb-2">Navigation</h4>
                        <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                           <Link href="/landing" className="hover:text-primary">Accueil</Link>
                           <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">A propos</Link>
                           <Link href="/services" className="hover:text-primary">Services</Link>
                           <Link href="/landing#contact" className="hover:text-primary">Contact</Link>
                           <Link href="/dashboard/quote" className="hover:text-primary">Devis</Link>
                        </div>
                   </div>
                </div>
                <div className="border-t">
                    <div className="container py-4 text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Déménagement Du Vexin. Réalisé avec ❤️ par Creow.
                    </div>
                </div>
            </footer>
        </div>
    );
}
