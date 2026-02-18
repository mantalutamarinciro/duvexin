"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Users,
  ShieldCheck,
  Check,
  MapPin,
  Truck,
  Globe,
  Palette,
  Briefcase,
  LayoutTemplate,
  Armchair,
  Box,
  BadgeCheck,
  CalendarClock,
  ArrowUpRight,
  Calculator,
  PhoneCall,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import placeholders from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

/* ================== Data Structure ================== */

const USP = [
  { label: "Sans sous-traitance", icon: Users },
  { label: "Aucun intérimaire", icon: ShieldCheck },
  { label: "Équipe dédiée", icon: BadgeCheck },
];

// Nouvelle structure pour les départements IDF
const IDF_ZONES = [
    { name: "Val-d’Oise (95)", href: "/demenagement-val-d-oise-95", image: "https://images.unsplash.com/photo-1569342197408-22845f537633?q=80&w=600" }, // Exemple: Cergy
    { name: "Yvelines (78)", href: "/demenagement-yvelines-78", image: "https://images.unsplash.com/photo-1543429788-2b2b49605245?q=80&w=600" }, // Exemple: Versailles
    { name: "Paris (75)", href: "/demenagement-paris-75", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600" },
    { name: "Hauts-de-Seine (92)", href: "/demenagement-hauts-de-seine-92", image: "https://images.unsplash.com/photo-1565062340847-db19716d31bc?q=80&w=600" }, // Exemple: La Défense
    { name: "Eure (27)", href: "/zones/eure-27", image: placeholders["service-national"].url }, // Fallback image si pas de photo spécifique
    { name: "Oise (60)", href: "/zones/oise-60", image: placeholders["service-entreprise"].url },
];

const SERVICES = [
  {
    title: "Local & Régional",
    desc: "Intervention rapide dans tout le Val-d'Oise et l'Île-de-France.",
    href: "/demenagement-local",
    icon: MapPin,
    image: placeholders["service-particuliers"].url,
    colSpan: "md:col-span-6",
  },
  {
    title: "National",
    desc: "Partout en France, logistique sécurisée.",
    href: "/demenagement-national",
    icon: Truck,
    image: placeholders["service-national"].url,
    colSpan: "md:col-span-6",
  },
  {
    title: "International",
    desc: "Vers l'Europe et le monde. Expertise douanière.",
    href: "/demenagement-international",
    icon: Globe,
    image: placeholders["service-national"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Œuvres d'Art",
    desc: "Transport haute protection pour objets précieux.",
    href: "/transport-oeuvres-art",
    icon: Palette,
    image: placeholders["service-stockage"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Entreprises",
    desc: "Transfert de bureaux sans arrêt d'activité.",
    href: "/demenagement-entreprise",
    icon: Briefcase,
    image: placeholders["service-entreprise"].url,
    colSpan: "md:col-span-4",
  },
];

const FORMULAS = [
  {
    title: "Économique",
    desc: "Vous emballez, nous transportons.",
    features: ["Protection mobilier", "Chargement / Déchargement", "Transport sécurisé"],
    icon: Box,
    popular: false,
  },
  {
    title: "Standard",
    desc: "Le compromis idéal qualité/prix.",
    features: ["Formule Économique +", "Emballage du fragile", "Démontage meubles"],
    icon: LayoutTemplate,
    popular: true,
  },
  {
    title: "Clé en Main",
    desc: "Laissez-vous porter, on gère tout.",
    features: ["Formule Standard +", "Emballage complet", "Déballage du fragile"],
    icon: Armchair,
    popular: false,
  },
  {
    title: "Total Confort",
    desc: "Le luxe absolu : zéro contrainte.",
    features: ["Formule Clé en main +", "Débranchement appareils", "Remise en place"],
    icon: Star,
    popular: false,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Contact & Évaluation",
    desc: "Échange téléphonique ou visite pour estimer votre volume.",
  },
  {
    step: "02",
    title: "Devis Rapide",
    desc: "Proposition claire sous 24h, adaptée à votre budget.",
  },
  {
    step: "03",
    title: "Jour J : Action",
    desc: "Protection, chargement et transport par nos équipes salariées.",
  },
  {
    step: "04",
    title: "Installation",
    desc: "Déchargement et mise en place dans votre nouveau foyer.",
  },
];

const ARTICLES = [
  {
    title: "Combien de temps pour déménager ? Planning optimal",
    date: "Mai 2025",
    category: "Conseils",
    href: "/blog/planning-demenagement",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800",
  },
  {
    title: "Coût d'un déménagement : réduire les frais",
    date: "Mai 2025",
    category: "Budget",
    href: "/blog/cout-demenagement",
    image: "https://images.unsplash.com/photo-1556740758-90de2929e79a?q=80&w=800",
  },
  {
    title: "5 étapes pour un déménagement réussi",
    date: "Avr 2025",
    category: "Guide",
    href: "/blog/guide-pratique",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const safeReviews = reviews || [];

  return (
    <div className="bg-[#FAFAFA] text-slate-900 selection:bg-primary/10 selection:text-primary">
      
      {/* --- HERO SECTION WITH BACKGROUND IMAGE --- */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-48 overflow-hidden px-4">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
            <Image 
                src={placeholders.hero.url} // Utilisez une belle photo de déménagement ici
                alt="Déménagement professionnel en Île-de-France" 
                fill 
                className="object-cover scale-105"
                priority
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Subtle bottom gradient blend */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
        </div>

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge Google (White version) */}
            <a href="#avis" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 shadow-sm hover:bg-white/20 transition-colors cursor-pointer">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold text-white">4.9/5</span>
              <span className="text-sm text-white/70 border-l border-white/30 pl-2">249 avis Google</span>
            </a>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 text-white leading-[1.1]">
              Déménagez <br className="hidden md:block" />
              {/* Lighter gradient for dark background */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 font-serif italic">
                sans sous-traitance.
              </span>
            </h1>

            <p className="text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Basée dans le Val-d'Oise, nous intervenons dans toute l'Île-de-France et vers toute la France. 
              <strong className="text-white font-bold block mt-2">
                100% réalisé par nos équipes salariées. Zéro intérim.
              </strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="h-14 px-10 rounded-full text-lg font-bold shadow-xl shadow-blue-900/20 bg-white text-slate-900 hover:bg-blue-50 hover:scale-105 transition-all" asChild>
                <Link href="/devis">
                  Calculer mon volume
                  <Calculator className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-semibold bg-transparent text-white border-white/50 hover:bg-white/10 backdrop-blur-sm" asChild>
                <Link href="/contact">
                  Devis gratuit
                </Link>
              </Button>
            </div>

            {/* USP Grid (Transparent background) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {USP.map((item) => (
                <div key={item.label} className="flex items-center justify-center gap-3 bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <item.icon className="w-5 h-5 text-blue-300" />
                  <span className="font-bold text-sm text-white">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Solutions sur mesure.</h2>
              <p className="text-lg text-slate-500">Du déménagement local au transfert international, nous maîtrisons chaque kilomètre.</p>
            </div>
            <Button variant="ghost" className="font-bold hover:bg-slate-100 rounded-full" asChild>
              <Link href="/services">Tout voir <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 min-h-[320px]",
                  service.colSpan
                )}
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 text-white border border-white/10">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm mb-6 line-clamp-2">{service.desc}</p>
                  
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center gap-2 text-white font-bold text-sm bg-white/20 hover:bg-white text-slate-900 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
                  >
                    Découvrir <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORMULAS --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[3rem] mx-2 lg:mx-8">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black mb-6">4 niveaux de confort.</h2>
            <p className="text-lg text-slate-400">
              De la formule économique au service "Total Confort", choisissez l'implication que vous souhaitez avoir dans votre déménagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORMULAS.map((formula, i) => (
              <motion.div
                key={formula.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative bg-slate-800/50 border border-white/5 rounded-3xl p-8 hover:bg-slate-800 transition-colors flex flex-col",
                  formula.popular && "ring-2 ring-primary bg-slate-800 shadow-2xl shadow-primary/20"
                )}
              >
                {formula.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Le plus choisi
                  </div>
                )}
                <div className="mb-6 bg-slate-900/50 w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10">
                  <formula.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{formula.title}</h3>
                <p className="text-sm text-slate-400 mb-8 min-h-[40px]">{formula.desc}</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {formula.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm font-medium text-slate-300">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button className="w-full rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 text-white border-none" variant="outline" asChild>
                  <Link href="/devis">Choisir</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NOUVELLE SECTION : ZONES IDF --- */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-primary font-bold mb-4 bg-primary/10 px-4 py-2 rounded-full text-sm uppercase tracking-wider">
                    <MapPin className="w-4 h-4" /> Ancrage Local
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    Au cœur de l'Île-de-France.
                </h2>
                <p className="text-lg text-slate-500">
                    Notre parfaite connaissance du terrain nous permet d'intervenir rapidement et efficacement dans tous les départements franciliens.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {IDF_ZONES.map((zone, idx) => (
                    <motion.div 
                        key={zone.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                        <Link 
                            href={zone.href}
                            className="group relative block aspect-square rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                             <Image
                                src={zone.image}
                                alt={`Déménagement ${zone.name}`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 w-full flex items-end justify-between">
                                <h3 className="text-white font-bold text-lg leading-tight">{zone.name.split(' ')[0]} <br/><span className="text-sm opacity-80">{zone.name.split(' ').slice(1).join(' ')}</span></h3>
                                <ArrowRight className="text-white opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>


      {/* --- PROCESS --- */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Simple comme bonjour.</h2>
              <p className="text-lg text-slate-500 mb-12">
                Un processus rodé en 4 étapes pour garantir zéro stress et zéro surprise le jour J.
              </p>
              
              <div className="space-y-8">
                {PROCESS.map((step) => (
                  <div key={step.step} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-sm font-bold text-slate-400 group-hover:border-primary group-hover:text-primary transition-colors">
                        {step.step}
                      </div>
                      <div className="w-px h-full bg-slate-200 my-2 group-last:hidden" />
                    </div>
                    <div className="pb-8">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] bg-slate-200 rounded-[3rem] overflow-hidden hidden lg:block shadow-xl">
              <Image 
                 src={placeholders.hero.url} // Image illustrative du process
                 alt="Processus de déménagement"
                 fill
                 className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (Dynamic) --- */}
      <section id="avis" className="py-20">
        <TestimonialsSection reviews={safeReviews} />
      </section>

      {/* --- BLOG --- */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Conseils d'experts</h2>
              <p className="text-slate-500">Pour préparer votre départ sereinement.</p>
            </div>
            <Button variant="link" className="text-primary font-bold hidden md:flex" asChild>
              <Link href="/blog">Voir tous les articles</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <Link key={article.title} href={article.href} className="group block">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-sm">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800">
                    {article.category}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm mb-3">
                  <CalendarClock className="w-4 h-4" />
                  {article.date}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA AMÉLIORÉ --- */}
      <section className="py-10 px-4 md:px-10 pb-24 relative">
        {/* Conteneur principal avec image de fond */}
        <div className="container max-w-6xl relative rounded-[3rem] overflow-hidden shadow-2xl md:min-h-[500px] flex items-center">
          {/* Image de fond */}
          <Image
             src={placeholders.hero.url} // Utilisez une image inspirante ici (ex: nouvelle maison)
             alt="Nouveau départ"
             fill
             className="object-cover"
          />
          {/* Gradient Overlay Profond */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-blue-900/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 p-12 md:p-24 w-full md:w-2/3 lg:w-1/2">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                  <BadgeCheck className="w-5 h-5 text-blue-300" /> Assurance incluse
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Prêt à franchir<br/> le pas ?
                </h2>
                <p className="text-blue-50 text-lg mb-10 leading-relaxed font-medium">
                Obtenez une estimation précise en moins de 24h. Nos équipes salariées sont prêtes à vous accompagner.
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                <Button size="lg" className="h-16 px-10 rounded-full bg-white text-primary hover:bg-blue-50 text-lg font-bold shadow-lg hover:-translate-y-1 transition-all" asChild>
                    <Link href="/devis">Demander mon devis</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/40 text-white hover:bg-white/10 text-lg font-semibold flex items-center gap-3 backdrop-blur-sm" asChild>
                    <Link href="/contact">
                        <PhoneCall className="w-5 h-5" /> Nous contacter
                    </Link>
                </Button>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}