
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Package,
  Truck,
  Warehouse,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  PhoneCall,
  BriefcaseBusiness,
  Calculator,
  FileText,
  Lightbulb,
  Check,
  Clock,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import placeholders from "@/app/lib/placeholder-images.json";

/* ================== Animations ================== */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
};

/* ================== Data ================== */
const TRUST_POINTS = [
  {
    icon: Users,
    title: "Équipes fiables",
    desc: "Des déménageurs salariés, formés et ponctuels.",
  },
  {
    icon: FileText,
    title: "Devis clair",
    desc: "Tarification transparente sans frais cachés.",
  },
  {
    icon: ShieldCheck,
    title: "Protection premium",
    desc: "Matériel de protection et assurance inclus.",
  },
  {
    icon: Lightbulb,
    title: "Organisation pro",
    desc: "Planification rigoureuse de chaque étape.",
  },
] as const;

const SERVICES = [
  {
    title: "Particuliers",
    desc: "Studio, appartement ou maison : nous protégeons vos souvenirs.",
    href: "/demenagement-particuliers",
    icon: Package,
    image: placeholders["service-particuliers"].url,
    aiHint: placeholders["service-particuliers"].hint,
  },
  {
    title: "Entreprises",
    desc: "Transfert de bureaux et archives avec continuité d'activité.",
    href: "/demenagement-entreprise-bureau",
    icon: BriefcaseBusiness,
    image: placeholders["service-entreprise"].url,
    aiHint: placeholders["service-entreprise"].hint,
  },
  {
    title: "National",
    desc: "Longue distance partout en France avec logistique optimisée.",
    href: "/demenagement-national",
    icon: Truck,
    image: placeholders["service-national"].url,
    aiHint: placeholders["service-national"].hint,
  },
  {
    title: "Garde-Meubles",
    desc: "Stockage sécurisé et propre pour vos biens en transition.",
    href: "/demenagement-garde-meubles",
    icon: Warehouse,
    image: placeholders["service-stockage"].url,
    aiHint: placeholders["service-stockage"].hint,
  },
];

const PROCESS = [
  {
    title: "Évaluation rapide",
    desc: "Volume et accès analysés par nos experts.",
    icon: Calculator,
  },
  {
    title: "Devis détaillé",
    desc: "Une proposition claire adaptée à votre budget.",
    icon: FileText,
  },
  {
    title: "Exécution propre",
    desc: "Protection et chargement avec soin le jour J.",
    icon: ShieldCheck,
  },
  {
    title: "Installation",
    desc: "Déchargement et mise en place dans votre nouveau foyer.",
    icon: Check,
  },
] as const;

const ZONES = [
  { name: "Val-d'Oise (95)", desc: "Notre cœur d'activité", href: "/demenagement-val-d-oise-95" },
  { name: "Yvelines (78)", desc: "Versailles et environs", href: "/demenagement-yvelines-78" },
  { name: "Hauts-de-Seine (92)", desc: "Zones urbaines denses", href: "/demenagement-hauts-de-seine-92" },
  { name: "Paris (75)", desc: "Tous arrondissements", href: "/demenagement-paris-75" },
] as const;

const ARTICLES = [
  {
    title: "5 astuces pour un déménagement sans stress",
    category: "Conseils",
    readTime: "5 min",
    excerpt: "Découvrez comment préparer vos cartons efficacement...",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=800",
    href: "/blog",
  },
  {
    title: "Comment choisir sa formule de déménagement ?",
    category: "Guide",
    readTime: "4 min",
    excerpt: "Économique, Standard ou Confort : faites le bon choix...",
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800",
    href: "/blog",
  },
  {
    title: "Déménager avec des enfants : le guide complet",
    category: "Famille",
    readTime: "6 min",
    excerpt: "Accompagnez vos enfants dans cette nouvelle aventure...",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=800",
    href: "/blog",
  },
];

const FAQ = [
  {
    q: "Quand dois-je commencer à organiser mon déménagement ?",
    a: "Idéalement 4 à 8 semaines à l'avance en haute saison (mai à septembre). Plus vous anticipez, plus on sécurise les créneaux et l'organisation.",
  },
  {
    q: "Comment est calculé le prix d'un déménagement ?",
    a: "Le prix dépend du volume (m³), de la distance, de la formule choisie, et des accès (étage, ascenseur, stationnement).",
  },
  {
    q: "La visite technique est-elle obligatoire ?",
    a: "Elle est gratuite et recommandée dès 20m³ pour évaluer précisément les contraintes d'accès.",
  },
  {
    q: "Gérez-vous l'autorisation de stationnement ?",
    a: "Oui, selon la commune, nous pouvons prendre en charge la demande auprès de la mairie pour vous libérer de cette contrainte.",
  },
] as const;

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  return (
    <div className="bg-white selection:bg-primary/10">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image */}
        <Image
          src={placeholders.hero.url}
          alt={placeholders.hero.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={placeholders.hero.hint}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

        <div className="container relative z-10 py-20 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-white/90">L'art du déménagement sans effort</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
              Déménagez avec <span className="text-primary italic">clarté</span> et sérénité.
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
              Une expertise artisanale alliée à une logistique moderne pour vos transferts dans le Vexin et toute l'Île-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-8 rounded-full text-md font-semibold transition-all hover:scale-105 shadow-xl shadow-primary/20" asChild>
                <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
              </Button>
              <Button size="lg" variant="secondary" className="h-14 px-8 rounded-full text-md font-medium" asChild>
                <Link href="/contact"><Phone className="mr-2 h-4 w-4" /> Nous appeler</Link>
              </Button>
            </div>

            {/* Micro maillage Hero */}
            <div className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/60">
              {ZONES.slice(0, 4).map((zone) => (
                <Link key={zone.name} href={zone.href} className="hover:text-primary transition-colors flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {zone.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- REASSURANCE (Floating Bar) --- */}
      <section className="container -mt-12 mb-24 relative z-20">
        <div className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[32px] p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {TRUST_POINTS.map((item) => (
            <div key={item.title} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="bg-primary/5 p-2.5 rounded-xl">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div {...fadeInUp} className="max-w-xl text-left">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Une solution pour chaque départ.</h2>
              <p className="text-lg text-slate-500 leading-relaxed">Du simple transport au pack sérénité complet, nous protégeons ce qui compte pour vous.</p>
            </motion.div>
            <Button variant="outline" className="rounded-full border-slate-200" asChild>
              <Link href="/services">Explorer tous les services</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                <Link href={s.href} className="group block h-full overflow-hidden rounded-[32px] border border-slate-100 bg-white hover:border-primary/20 hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                  <div className="relative h-48 w-full">
                    <Image src={s.image} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={s.aiHint} />
                  </div>
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{s.desc}</p>
                    <span className="text-primary font-semibold text-sm inline-flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Détails <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS --- */}
      <section className="py-24 bg-slate-50/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Une méthode éprouvée.</h2>
            <p className="text-lg text-slate-500">Chaque étape est pensée pour votre confort.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <motion.div key={p.title} {...fadeInUp} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ZONES --- */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Expertise locale,<br/> portée régionale.</h2>
              <div className="space-y-4">
                {ZONES.map((zone) => (
                  <Link key={zone.name} href={zone.href} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:scale-[1.02] transition-transform group">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <div>
                        <h4 className="font-bold text-slate-900">{zone.name}</h4>
                        <p className="text-xs text-slate-500">{zone.desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
            <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl shadow-slate-200">
               <Image 
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1400" 
                alt="Zones d'intervention" fill className="object-cover" 
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <TestimonialsSection reviews={reviews} />

      {/* --- FAQ --- */}
      <section className="py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Des questions ? On a les réponses.</h2>
            <p className="text-slate-500">Anticipez chaque détail de votre déménagement.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-slate-100 rounded-2xl px-6 bg-white overflow-hidden shadow-sm">
                <AccordionTrigger className="hover:no-underline font-semibold py-6 text-slate-900">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 pb-6 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- ARTICLES --- */}
      <section className="py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Derniers conseils</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {ARTICLES.map((post) => (
              <Link key={post.title} href={post.href} className="group flex flex-col">
                <div className="relative aspect-[16/11] rounded-[32px] overflow-hidden mb-6">
                  <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-wider mb-3">
                  {post.category} • {post.readTime}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 bg-slate-50">
        <div className="container text-center">
          <motion.div {...fadeInUp} className="max-w-3xl mx-auto p-12 lg:p-20 bg-white rounded-[60px] border border-slate-100 shadow-xl shadow-slate-200/50">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Prêt à franchir le pas ?
            </h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Estimation précise sous 24h. Zéro engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-lg" asChild>
                <Link href="/demande-devis">Demander mon devis</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
            <p className="mt-8 text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" /> Assurance incluse dans tous nos forfaits
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
