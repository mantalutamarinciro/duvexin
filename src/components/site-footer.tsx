"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  ArrowRight, 
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  // Stabilisation de l'année pour éviter les erreurs d'hydratation
  const [year, setYear] = React.useState<number>(2026);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-900 pt-24 pb-12 relative overflow-hidden">
      {/* Effet de lumière subtil en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-20" />
      
      <div className="container relative z-10">
        
        {/* --- TOP SECTION : PRE-FOOTER CTA --- */}
        <div className="relative group mb-24">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-teal-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative flex flex-col lg:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-sm p-10 md:p-14 rounded-[2rem] border border-white/5 shadow-2xl">
            <div className="max-w-xl text-center lg:text-left mb-8 lg:mb-0">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                Prêt pour votre <span className="text-primary">nouveau départ ?</span>
              </h3>
              <p className="text-lg text-slate-400 font-light">
                Obtenez une étude personnalisée et gratuite de votre projet sous 24h ouvrées.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button variant="outline" size="lg" className="rounded-full border-slate-700 text-primary hover:bg-slate-800 h-14 px-8 font-bold" asChild>
                <Link href="tel:+33130751235">
                  <Phone className="mr-2 h-4 w-4" /> Nous appeler
                </Link>
              </Button>
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 h-14 px-8 font-black transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Estimation en ligne <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Social */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <Link href="/" className="inline-block transition-transform hover:scale-105">
                <div className="bg-transparent rounded-xl p-2.5 shadow-lg shadow-white/5">
                  <Logo />
                </div>
              </Link>
              <p className="text-base leading-relaxed text-slate-400 max-w-sm font-light">
                L&apos;excellence du déménagement en Île-de-France et Normandie. 
                Une maison familiale qui cultive l&apos;art du soin et de la rigueur logistique.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "Linkedin" }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  aria-label={social.label}
                  className="h-11 w-11 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-500">
               <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Assurance incluse</div>
               <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certifié Pro</div>
            </div>
          </div>

          {/* Links Groups */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            
            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-wider uppercase text-xs">Nos Services</h4>
              <ul className="space-y-4">
                {[
                  { label: "Particuliers", href: "/demenagement-particuliers" },
                  { label: "Entreprises", href: "/demenagement-entreprise-bureau" },
                  { label: "National", href: "/demenagement-national" },
                  { label: "Garde-Meubles", href: "/demenagement-garde-meubles" },
                  { label: "Objets Lourds", href: "/demenagement-objets-lourds" },
                ].map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-400 hover:text-primary transition-all duration-300 flex items-center group text-sm">
                      <ChevronRight className="h-3 w-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agences */}
            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-wider uppercase text-xs">Nos Agences</h4>
              <div className="space-y-6">
                <div className="group cursor-default">
                  <span className="block text-[10px] font-black uppercase text-primary mb-2 tracking-[0.2em]">Val-d&apos;Oise</span>
                  <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-start gap-2 leading-relaxed">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-600 mt-1" />
                    9 Rue de Pontoise,<br/>95540 Méry-sur-Oise
                  </p>
                </div>
                <div className="group cursor-default">
                  <span className="block text-[10px] font-black uppercase text-primary mb-2 tracking-[0.2em]">Normandie</span>
                  <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors flex items-start gap-2 leading-relaxed">
                    <MapPin className="h-4 w-4 shrink-0 text-slate-600 mt-1" />
                    22 Rue Isambard,<br/>27000 Évreux
                  </p>
                </div>
              </div>
            </div>

            {/* Société */}
            <div className="space-y-6 col-span-2 md:col-span-1">
              <h4 className="text-white font-bold tracking-wider uppercase text-xs">Informations</h4>
              <ul className="space-y-4">
                {[
                  { label: "À propos", href: "/a-propos-de-demenagement-du-vexin" },
                  { label: "Zones d'intervention", href: "/zones-intervention" },
                  { label: "Actualités / Blog", href: "/blog" },
                  { label: "Nos réalisations", href: "/nos-realisations" },
                  { label: "Mentions légales", href: "/mentions-legales" },
                ].map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-slate-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-1 group">
                      {item.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-[11px] font-medium uppercase tracking-widest text-slate-500">
            <p>© {year} Déménagement Du Vexin</p>
            <span className="hidden md:block h-1 w-1 rounded-full bg-slate-800" />
            <Link href="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
            <span className="hidden md:block h-1 w-1 rounded-full bg-slate-800" />
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-8 w-12 rounded-md bg-slate-900 border border-white/5 flex items-center justify-center">
                    <div className="h-2 w-6 bg-slate-800 rounded-full" />
                  </div>
                ))}
             </div>
             <p className="text-[11px] text-slate-600 font-bold uppercase tracking-tighter">
                Création par <a href="mailto:vsw.contact@gmail.com" className="text-slate-400 hover:text-primary transition-colors">A Hachour</a>
             </p>
          </div>
        </div>

      </div>
    </footer>
  );
}