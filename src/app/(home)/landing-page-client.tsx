"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
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
  Phone,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import placeholders from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

/* ================== Data ================== */

const TRUST_POINTS = [
  { label: "Personnels salariés uniquement", icon: Users },
  { label: "Zéro sous-traitance", icon: ShieldCheck },
  { label: "Accompagnement VIP", icon: BadgeCheck },
];

const IDF_ZONES = [
  {
    name: "Val-d’Oise (95)",
    href: "/demenagement-val-d-oise-95",
    image: placeholders["zone-val-doise"].url,
  },
  {
    name: "Yvelines (78)",
    href: "/demenagement-yvelines-78",
    image: placeholders["zone-yvelines"].url,
  },
  {
    name: "Paris (75)",
    href: "/demenagement-paris-75",
    image: placeholders["zone-paris"].url,
  },
  {
    name: "Hauts-de-Seine (92)",
    href: "/demenagement-hauts-de-seine-92",
    image: placeholders["zone-hauts-de-seine"].url,
  },
  {
    name: "Eure (27)",
    href: "/demenagement-eure-27",
    image: placeholders["service-national"].url,
  },
  {
    name: "Seine-Maritime (76)",
    href: "/demenagement-seine-maritime-76",
    image: placeholders["service-entreprise"].url,
  },
];

const SERVICES = [
  {
    title: "Local & Régional",
    desc: "Intervention rapide dans tout le Val-d'Oise et l'Île-de-France.",
    href: "/demenagement-val-d-oise-95",
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
    href: "/demenagement-national",
    icon: Globe,
    image: placeholders["service-national"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Œuvres d'Art",
    desc: "Transport haute protection pour objets précieux.",
    href: "/demenagement-oeuvres-art",
    icon: Palette,
    image: placeholders["service-art"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Entreprises",
    desc: "Transfert de bureaux sans arrêt d'activité.",
    href: "/demenagement-entreprise-bureau",
    icon: Briefcase,
    image: placeholders["service-entreprise"].url,
    colSpan: "md:col-span-4",
  },
];

const FORMULAS = [
  {
    title: "Économique",
    desc: "L'essentiel, maîtrisé.",
    features: [
      "Protection mobilier",
      "Chargement / Déchargement",
      "Transport sécurisé",
    ],
    icon: Box,
    popular: false,
  },
  {
    title: "Standard",
    desc: "Le choix de la sérénité.",
    features: ["Formule Économique +", "Emballage du fragile", "Démontage meubles"],
    icon: LayoutTemplate,
    popular: true,
  },
  {
    title: "Clé en Main",
    desc: "Zéro effort, 100% confort.",
    features: ["Formule Standard +", "Emballage complet", "Déballage du fragile"],
    icon: Armchair,
    popular: false,
  },
  {
    title: "Total Confort",
    desc: "L'excellence absolue.",
    features: ["Formule Clé en main +", "Débranchement appareils", "Remise en place"],
    icon: Star,
    popular: false,
  },
];

const ARTICLES = [
  {
    title: "Combien de temps pour déménager ? Planning optimal",
    date: "Mai 2025",
    category: "Conseils",
    href: "/blog",
    image: placeholders["article-planning"].url,
  },
  {
    title: "Coût d'un déménagement : réduire les frais",
    date: "Mai 2025",
    category: "Budget",
    href: "/blog",
    image: placeholders["article-cost"].url,
  },
  {
    title: "5 étapes pour un déménagement réussi",
    date: "Avr 2025",
    category: "Guide",
    href: "/blog",
    image: placeholders["article-steps"].url,
  },
];

/* ================== Motion presets ================== */

const fadeInUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function formatZoneTitle(name: string) {
  const parts = name.split(" ");
  return { first: parts[0] ?? name, rest: parts.slice(1).join(" ") };
}

/* ================== Component ================== */

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const safeReviews = reviews || [];
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-primary/20 selection:text-primary">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={placeholders.hero.url}
            alt="Déménagement premium : organisation et équipes salariées"
            fill
            className="object-cover brightness-[0.4] contrast-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-white/10 dark:to-slate-950/10" />
          <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[110px]" />
          <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-[110px]" />
        </div>

        <div className="container relative py-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* Badge Google Premium */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white shadow-xl">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-bold">4.9/5</span>
                <span className="text-sm text-white/70 font-medium">• 249 avis Google</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white/90 shadow-lg">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Devis sous 24h</span>
              </div>
            </div>

            <h1 className="mt-8 text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95]">
              L'art du <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-200">
                déménagement
              </span>.
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-slate-100/90 leading-relaxed font-light max-w-2xl">
              Organisation millimétrée, soin constant, équipes{" "}
              <span className="text-white font-semibold underline decoration-primary/50 underline-offset-4">100% salariées</span>.
              Zéro sous-traitance. Zéro stress.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start">
              <Button
                size="lg"
                className="h-16 px-10 rounded-2xl text-lg font-black bg-primary text-white hover:bg-primary/90 shadow-[0_20px_50px_-12px_rgba(0,169,157,0.5)] transition-all hover:scale-105 active:scale-95"
                asChild
              >
                <Link href="/demande-de-devis">
                  Estimer mon projet <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-16 px-8 rounded-2xl bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 text-lg font-bold"
                asChild
              >
                <Link href="tel:+33130751235">
                  <Phone className="mr-2 h-5 w-5" />
                  01 30 75 12 35
                </Link>
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TRUST_POINTS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-white leading-tight">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent" />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
                Nos Expertises
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                Solutions sur mesure.
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Chaque projet est unique. Nos solutions s&apos;adaptent à vos exigences, du studio parisien au transfert industriel.
              </p>
            </div>
            <Button variant="link" className="text-slate-900 dark:text-white font-bold hover:no-underline group text-lg" asChild>
              <Link href="/services">
                Découvrir tous nos services{" "}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                {...fadeInUp}
                transition={{ delay: idx * 0.08, ...fadeInUp.transition }}
                className={cn(
                  "group relative overflow-hidden rounded-[3rem] bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 min-h-[420px]",
                  service.colSpan
                )}
              >
                <Link href={service.href} className="absolute inset-0 z-[1]" aria-label={`Voir ${service.title}`} />
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                </div>

                <div className="absolute bottom-0 left-0 p-10 w-full z-[2] pointer-events-none">
                  <div className="w-14 h-14 bg-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-primary border border-primary/20 shadow-lg">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-white/80 text-base mb-8 max-w-sm font-medium leading-relaxed">{service.desc}</p>
                  <div className="inline-flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1 group-hover:border-white transition-colors">
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMULAS ================= */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-4 block">
              Nos Formules
            </span>
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-tight">
              4 niveaux de <br/> sérénité.
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light">
              Du strict essentiel à l&apos;accompagnement gants blancs : choisissez la formule qui correspond à votre rythme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORMULAS.map((formula, i) => (
              <motion.div
                key={formula.title}
                {...fadeInUp}
                transition={{ delay: i * 0.08, ...fadeInUp.transition }}
                className={cn(
                  "relative rounded-[2.5rem] p-8 border-2 bg-white dark:bg-slate-900 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group",
                  formula.popular 
                    ? "border-primary/30 ring-4 ring-primary/5" 
                    : "border-slate-100 dark:border-slate-800"
                )}
              >
                {formula.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-xl">
                    Le plus choisi
                  </div>
                )}

                <div
                  className={cn(
                    "mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                    formula.popular
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  )}
                >
                  <formula.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white tracking-tight">{formula.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 min-h-[44px] font-medium leading-relaxed">
                  {formula.desc}
                </p>

                <ul className="space-y-5 mb-10 flex-1">
                  {formula.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2",
                          formula.popular ? "border-primary/30 bg-primary/10" : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                        )}
                      >
                        <Check className={cn("w-2.5 h-2.5", formula.popular ? "text-primary" : "text-slate-500")} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
                    formula.popular
                      ? "bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
                  )}
                  asChild
                >
                  <Link href="/demande-de-devis">Choisir</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ZONES ================= */}
      <section className="py-32 bg-slate-900 dark:bg-slate-900/20 rounded-[4rem] mx-4 my-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-3xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-4">
                Territoires
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                Ancrage local,<br/>portée nationale.
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Basés historiquement dans le Val-d&apos;Oise, nous rayonnons sur toute l&apos;Île-de-France et la Normandie.
              </p>
            </div>
            <Button variant="outline" className="rounded-full border-slate-700 text-white hover:bg-slate-800 h-14 px-8 font-bold" asChild>
                <Link href="/zones-intervention">Voir toutes les villes</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {IDF_ZONES.map((zone, idx) => {
              const t = formatZoneTitle(zone.name);
              return (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={zone.href}
                    className="group relative block aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-800 shadow-2xl transition-all duration-500"
                  >
                    <Image
                      src={zone.image}
                      alt={`Déménagement ${zone.name}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                        Secteur
                      </p>
                      <h3 className="text-white font-black text-xl leading-tight group-hover:-translate-y-1 transition-transform duration-500">
                        {t.first}
                        {t.rest ? (
                          <span className="block text-sm font-medium text-slate-400 mt-1">{t.rest}</span>
                        ) : null}
                      </h3>
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="avis" className="py-20 bg-white dark:bg-slate-950">
        <TestimonialsSection reviews={safeReviews} />
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
                Magazine
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                Le Journal.
              </h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Conseils pratiques et actualités pour préparer votre départ en toute sérénité.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-slate-200 dark:border-slate-700 h-14 px-8 font-bold hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all hidden md:flex"
              asChild>
              <Link href="/blog">Lire tous les articles</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article, i) => (
              <motion.div
                key={article.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1, ...fadeInUp.transition }}
              >
                <Link href={article.href} className="group block h-full">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-700">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-white/20 shadow-xl">
                        {article.category}
                      </div>
                    </div>

                    <div className="px-4 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
                        <CalendarClock className="w-3.5 h-3.5" />
                        {article.date}
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 dark:text-white transition-colors leading-tight mb-6 tracking-tight group-hover:text-primary">
                        {article.title}
                      </h3>

                      <div className="mt-auto flex items-center text-slate-500 dark:text-slate-400 text-sm font-bold group-hover:text-primary transition-colors">
                        Lire l&apos;article <ArrowRight className="ml-2 h-4 w-4" group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
