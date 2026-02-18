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
  Sparkles,
  Clock,
  CalendarCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import placeholders from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

/* ================== Data ================== */

const USP = [
  { label: "Personnels salariés uniquement", icon: Users },
  { label: "Zéro sous-traitance", icon: ShieldCheck },
  { label: "Accompagnement VIP", icon: BadgeCheck },
];

const IDF_ZONES = [
  {
    name: "Val-d’Oise (95)",
    href: "/demenagement-val-d-oise-95",
    image:
      "https://images.unsplash.com/photo-1569342197408-22845f537633?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Yvelines (78)",
    href: "/demenagement-yvelines-78",
    image:
      "https://images.unsplash.com/photo-1543429788-2b2b49605245?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Paris (75)",
    href: "/demenagement-paris-75",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Hauts-de-Seine (92)",
    href: "/demenagement-hauts-de-seine-92",
    image:
      "https://images.unsplash.com/photo-1565062340847-db19716d31bc?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Eure (27)",
    href: "/demenagement-eure-27",
    image: (placeholders as any)["service-national"].url,
  },
  {
    name: "Seine-Maritime (76)",
    href: "/demenagement-seine-maritime-76",
    image: (placeholders as any)["service-entreprise"].url,
  },
];

const SERVICES = [
  {
    title: "Local & Régional",
    desc: "Intervention rapide dans tout le Val-d'Oise et l'Île-de-France.",
    href: "/demenagement-val-d-oise-95",
    icon: MapPin,
    image: (placeholders as any)["service-particuliers"].url,
    colSpan: "md:col-span-6",
  },
  {
    title: "National",
    desc: "Partout en France, logistique sécurisée.",
    href: "/demenagement-national",
    icon: Truck,
    image: (placeholders as any)["service-national"].url,
    colSpan: "md:col-span-6",
  },
  {
    title: "International",
    desc: "Vers l'Europe et le monde. Expertise douanière.",
    href: "/demenagement-national",
    icon: Globe,
    image: (placeholders as any)["service-national"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Œuvres d'Art",
    desc: "Transport haute protection pour objets précieux.",
    href: "/demenagement-oeuvres-art",
    icon: Palette,
    image: (placeholders as any)["service-stockage"].url,
    colSpan: "md:col-span-4",
  },
  {
    title: "Entreprises",
    desc: "Transfert de bureaux sans arrêt d'activité.",
    href: "/demenagement-entreprise-bureau",
    icon: Briefcase,
    image: (placeholders as any)["service-entreprise"].url,
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

const PROCESS = [
  {
    step: "01",
    title: "Échange & cadrage",
    desc: "On comprend votre besoin (volume, accès, contraintes). Visite si nécessaire.",
  },
  {
    step: "02",
    title: "Devis clair sous 24h",
    desc: "Prix lisible, options détaillées, planning proposé. Zéro surprise.",
  },
  {
    step: "03",
    title: "Préparation carrée",
    desc: "Protection, cartons, stationnement : tout est anticipé avant le jour J.",
  },
  {
    step: "04",
    title: "Jour J maîtrisé",
    desc: "Chargement sécurisé, transport, installation : propre, efficace, serein.",
  },
];

const ARTICLES = [
  {
    title: "Combien de temps pour déménager ? Planning optimal",
    date: "Mai 2025",
    category: "Conseils",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Coût d'un déménagement : réduire les frais",
    date: "Mai 2025",
    category: "Budget",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1556740758-90de2929e79a?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "5 étapes pour un déménagement réussi",
    date: "Avr 2025",
    category: "Guide",
    href: "/blog",
    image:
      "https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=900&auto=format&fit=crop",
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

function ratingFromReviews(reviews: FormattedReview[]) {
  return { rating: "4.9/5", count: "249 avis" };
}

/* ================== Component ================== */

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const safeReviews = reviews || [];
  const reduceMotion = useReducedMotion();
  const { rating, count } = ratingFromReviews(safeReviews);

  return (
    <div className="bg-white text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={(placeholders as any).hero.url}
            alt="Déménagement premium : organisation et équipes salariées"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-slate-950/10 to-white/10" />
          <div className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[110px]" />
          <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-[110px]" />
        </div>

        <div className="container relative pt-24 md:pt-28 pb-16 md:pb-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white/90">
                <Star className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-semibold">{rating}</span>
                <span className="text-sm text-white/70">• {count}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white/90">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Devis sous 24h</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2 text-white/90">
                <CalendarCheck className="h-4 w-4" />
                <span className="text-sm">Prix clair & fixé</span>
              </div>
            </div>

            <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.02]">
              L&apos;art du{" "}
              <span className="font-serif italic font-light text-slate-100">
                déménagement
              </span>
              .
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-slate-100/90 leading-relaxed font-light">
              Organisation millimétrée, soin constant, équipes{" "}
              <span className="text-white font-medium">100% salariées</span>.
              <br className="hidden md:block" />
              Zéro sous-traitance. Zéro stress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start">
              <Button
                size="lg"
                className="h-14 px-8 rounded-full text-base font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_40px_-12px_rgba(255,255,255,0.35)]"
                asChild
              >
                <Link href="/demande-devis">
                  Estimer mon projet <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-7 rounded-full bg-transparent text-white border-white/30 hover:bg-white/10"
                asChild
              >
                <Link href="tel:+33130751235">
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler
                </Link>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="h-14 px-7 rounded-full text-white hover:bg-white/10 border border-white/10"
                asChild
              >
                <Link href="/services">
                  Voir les services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {USP.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3"
                >
                  <item.icon className="h-5 w-5 text-white/90" />
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-white/80">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm">
                Emballage • démontage/remontage • garde-meubles • options à la carte
              </p>
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-32 bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Expertise sur mesure.
              </h2>
              <p className="text-xl text-slate-500 font-light">
                Chaque projet est unique. Nos solutions s&apos;adaptent à vos exigences, du studio parisien au château normand.
              </p>
            </div>
            <Button variant="link" className="text-slate-900 font-bold hover:no-underline group text-lg" asChild>
              <Link href="/services">
                Explorer tout{" "}
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
                  "group relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_2px_40px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 min-h-[380px]",
                  service.colSpan
                )}
              >
                <Link href={service.href} className="absolute inset-0 z-[1]" aria-label={`Voir ${service.title}`} />
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />
                </div>

                <div className="absolute bottom-0 left-0 p-10 w-full z-[2] pointer-events-none">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20 shadow-lg">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-white/80 text-base mb-8 max-w-sm font-medium">{service.desc}</p>
                  <div className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest border-b border-white/30 pb-1">
                    Voir le détail <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMULAS ================= */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Nos Formules
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">
              4 niveaux de sérénité.
            </h2>
            <p className="text-xl text-slate-500 font-light">
              Du strict essentiel à l&apos;accompagnement total : choisissez la formule qui correspond à votre rythme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FORMULAS.map((formula, i) => (
              <motion.div
                key={formula.title}
                {...fadeInUp}
                transition={{ delay: i * 0.08, ...fadeInUp.transition }}
                className={cn(
                  "relative rounded-[2rem] p-8 border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col",
                  "border-slate-200",
                  formula.popular && "ring-2 ring-primary/30 border-primary/30"
                )}
              >
                {formula.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    Recommandé
                  </div>
                )}

                <div
                  className={cn(
                    "mb-7 w-14 h-14 rounded-2xl flex items-center justify-center border",
                    formula.popular
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                >
                  <formula.icon className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-slate-900">{formula.title}</h3>
                <p className="text-sm text-slate-500 mb-7 min-h-[44px] font-medium leading-normal">
                  {formula.desc}
                </p>

                <ul className="space-y-4 mb-9 flex-1">
                  {formula.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border",
                          formula.popular ? "bg-primary/10 border-primary/20" : "bg-slate-100 border-slate-200"
                        )}
                      >
                        <Check className={cn("w-3 h-3", formula.popular ? "text-primary" : "text-slate-700")} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "w-full h-12 rounded-xl font-bold",
                    formula.popular
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
                  )}
                  variant={formula.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/demande-devis">Choisir</Link>
                </Button>

                <p className="mt-4 text-xs text-slate-500">
                  Ajustable avec options (emballage, démontage, stockage).
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ZONES ================= */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Ancrage local,
                <br />
                portée nationale.
              </h2>
              <p className="text-xl text-slate-500 font-light">
                Basés historiquement dans le Val-d&apos;Oise, nous rayonnons sur toute l&apos;Île-de-France et la Normandie.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {IDF_ZONES.map((zone, idx) => {
              const t = formatZoneTitle(zone.name);
              return (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: idx * 0.04, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={zone.href}
                    className="group relative block aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  >
                    <Image
                      src={zone.image}
                      alt={`Déménagement ${zone.name}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <p className="text-white text-xs font-bold uppercase tracking-widest mb-1 opacity-70">
                        Zone
                      </p>
                      <h3 className="text-white font-bold text-lg leading-tight group-hover:-translate-y-1 transition-transform">
                        {t.first}
                        {t.rest ? (
                          <span className="block text-sm font-normal opacity-80 mt-1">{t.rest}</span>
                        ) : null}
                      </h3>
                    </div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <section id="avis" className="py-20 bg-white">
        <TestimonialsSection reviews={safeReviews} />
      </section>

      {/* ================= BLOG ================= */}
      <section className="py-32 bg-slate-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Le Journal.
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Conseils pratiques et actualités pour préparer votre départ.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-full border-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors hidden md:flex"
              asChild
            >
              <Link href="/blog">Lire tous les articles</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => (
              <Link key={article.title} href={article.href} className="group block h-full">
                <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden mb-6 bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-100 shadow-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
                      <CalendarClock className="w-3 h-3" />
                      {article.date}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4">
                      {article.title}
                    </h3>

                    <div className="mt-auto flex items-center text-slate-500 text-sm font-medium group-hover:text-slate-900">
                      Lire l&apos;article <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
