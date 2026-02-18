import Link from "next/link";
import { Logo } from "@/components/logo";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-20 pb-10">
            <div className="container">
                
                {/* Top Section : Call to Action intégré */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/50 p-8 rounded-3xl mb-16 border border-white/5">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold text-white mb-2">Un projet de déménagement ?</h3>
                        <p className="text-slate-400">Recevez votre estimation détaillée en moins de 24h.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white" asChild>
                            <Link href="tel:+33130751235">Nous appeler</Link>
                        </Button>
                        <Button className="rounded-full bg-white text-slate-950 hover:bg-slate-200 font-bold" asChild>
                            <Link href="/demande-devis">Devis en ligne <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </div>
                </div>

                {/* Grid Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
                    
                    {/* Brand */}
                    <div className="md:col-span-4 lg:col-span-4">
                        <div className="bg-white rounded-lg p-2 w-fit mb-6">
                            <Logo /> 
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 mb-8 max-w-sm">
                            Expert du déménagement en Île-de-France et Normandie depuis plus de 10 ans. 
                            Une entreprise familiale qui privilégie la qualité, la protection de vos biens et le contact humain.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-800">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-800">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-slate-800">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-bold text-white mb-6">Services</h4>
                            <ul className="space-y-4 text-sm">
                                {[
                                    { name: "Particuliers", href: "/demenagement-particuliers" },
                                    { name: "Entreprises", href: "/demenagement-entreprise-bureau" },
                                    { name: "Garde-Meubles", href: "/demenagement-garde-meubles" },
                                    { name: "Objets Lourds", href: "/demenagement-objets-lourds" },
                                    { name: "National", href: "/demenagement-national" }
                                ].map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-primary transition-colors flex items-center group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2 group-hover:bg-primary transition-colors"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-white mb-6">Agences</h4>
                            <ul className="space-y-6 text-sm">
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Val-d'Oise (Siège)</span>
                                    <div className="flex items-start gap-2 text-slate-300">
                                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                                        9 Rue de Pontoise,<br/>95540 Méry-sur-Oise
                                    </div>
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Normandie</span>
                                    <div className="flex items-start gap-2 text-slate-300">
                                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                                        22 Rue Isambard,<br/>27000 Évreux
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-6">Ressources</h4>
                            <ul className="space-y-4 text-sm">
                                <li><Link href="/calculateur-volume" className="hover:text-white transition-colors text-slate-500">Calculateur volume</Link></li>
                                <li><Link href="/zones-intervention" className="hover:text-white transition-colors text-slate-500">Zones d'intervention</Link></li>
                                <li><Link href="/blog" className="hover:text-white transition-colors text-slate-500">Blog & Conseils</Link></li>
                                <li><Link href="/nos-realisations" className="hover:text-white transition-colors text-slate-500">Réalisations</Link></li>
                                <li><Link href="/login" className="hover:text-white transition-colors text-slate-500">Espace Client</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Déménagement Du Vexin. Tous droits réservés.</p>
                    <p className="flex items-center gap-1">
                        Conçu avec passion par <span className="text-slate-400">Agence Creow</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}