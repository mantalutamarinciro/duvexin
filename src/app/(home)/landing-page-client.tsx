// src/app/(home)/landing-page-client.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Star,
  Users,
  FileText,
  ShieldCheck,
  Lightbulb,
  Check,
  Clock3,
  MapPin,
  PhoneCall,
  BriefcaseBusiness,
  Package,
  Warehouse,
  Calculator,
  Truck,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";
import { cn } from "@/lib/utils";

import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

type ServiceCard = {
  title: string;
  description: string;
  link: string;
  icon: React.ElementType;
  imageUrl: string;
  imageAlt: string;
  aiHint?: string;
};

const SERVICES: ServiceCard[] = [
  {
    title: "Déménagement Particuliers",
    description:
      "Studio, appartement, maison : méthode claire, protections irréprochables, équipe fiable du début à la fin.",
    link: "/demenagement-particuliers",
    icon: Package,
    imageUrl: "https://picsum.photos/seed/demenagement-particuliers/1400/1050",
    imageAlt:
      "Déménageurs protégeant des meubles pour un déménagement de particulier",
    aiHint: "professional movers furniture protection",
  },
  {
    title: "Déménagement d’Entreprise",
    description:
      "Transfert de bureaux, archives, matériel sensible : continuité d’activité, planning maîtrisé, exécution propre.",
    link: "/demenagement-entreprise-bureau",
    icon: BriefcaseBusiness,
    imageUrl: "https://picsum.photos/seed/demenagement-entreprise/1400/1050",
    imageAlt:
      "Cartons et mobilier de bureau préparés pour un transfert d’entreprise",
    aiHint: "modern office moving boxes",
  },
  {
    title: "Déménagement National",
    description:
      "Longue distance partout en France : logistique solide, chargement sécurisé, livraison au bon timing.",
    link: "/demenagement-national",
    icon: Truck,
    imageUrl: "https://picsum.photos/seed/demenagement-national/1400/1050",
    imageAlt: "Camion de déménagement sur route, trajet national",
    aiHint: "moving truck highway france",
  },
  {
    title: "Garde-Meubles & Stockage",
    description:
      "Stockage propre et sécurisé : solution idéale entre deux logements ou pour libérer de l’espace en toute sérénité.",
    link: "/garde-meubles",
    icon: Warehouse,
    imageUrl: "https://picsum.photos/seed/garde-meubles/1400/1050",
    imageAlt: "Espace de stockage garde-meubles sécurisé et organisé",
    aiHint: "clean storage facility",
  },
];

const ENGAGEMENTS = [
  {
    icon: Users,
    title: "Équipes fiables",
    description:
      "Déménageurs formés, ponctuels et soigneux. Une exécution propre, sans approximation.",
  },
  {
    icon: FileText,
    title: "Devis clair & détaillé",
    description:
      "Tarification lisible, options transparentes, aucune zone d’ombre. Vous gardez le contrôle.",
  },
  {
    icon: ShieldCheck,
    title: "Protection premium",
    description:
      "Couvertures, housses, sangles, emballages adaptés. Assurance et méthode pro.",
  },
  {
    icon: Lightbulb,
    title: "Organisation millimétrée",
    description:
      "Accès, portage, stationnement, autorisations : on anticipe pour éviter les imprévus.",
  },
] as const;

const PROCESS = [
  {
    title: "Évaluation rapide",
    desc: "Volume, accès, contraintes. Visite technique si nécessaire (recommandée dès ~20–25 m³).",
    icon: Calculator,
  },
  {
    title: "Devis & plan d’action",
    desc: "Formule adaptée, planning, protections, options. Vous savez exactement ce qui est prévu.",
    icon: FileText,
  },
  {
    title: "Jour J : exécution propre",
    desc: "Protection, manutention, chargement sécurisé, respect des délais et des lieux.",
    icon: ShieldCheck,
  },
  {
    title: "Livraison & installation",
    desc: "Déchargement, mise en place, remontage si prévu, contrôle final : on termine parfaitement.",
    icon: Check,
  },
] as const;

const ZONES = [
  { label: "Vexin", href: "/zones/vexin" },
  { label: "Val-d’Oise (95)", href: "/zones/val-doise" },
  { label: "Yvelines (78)", href: "/zones/yvelines" },
  { label: "Île-de-France", href: "/zones/ile-de-france" },
  { label: "Paris", href: "/zones/paris" },
  { label: "National", href: "/demenagement-national" },
] as const;

const FAQ = [
  {
    q: "Quand dois-je commencer à organiser mon déménagement ?",
    a: "Idéalement 4 à 8 semaines à l’avance en haute saison (mai à septembre). En basse saison ou pour un petit volume, 2 à 3 semaines peuvent suffire. Plus vous anticipez, plus on sécurise les créneaux et l’organisation (stationnement, accès, autorisations).",
  },
  {
    q: "Comment est calculé le prix d’un déménagement ?",
    a: "Le prix dépend du volume (m³), de la distance, de la formule choisie, et des accès (étage, ascenseur, portage, stationnement). Nous détaillons chaque poste dans un devis clair pour éviter toute surprise.",
  },
  {
    q: "La visite technique est-elle obligatoire et payante ?",
    a: "La visite technique est gratuite et sans engagement. Elle n’est pas obligatoire pour les petits volumes, mais fortement recommandée dès ~20–25 m³, pour évaluer précisément le volume et les contraintes d’accès.",
  },
  {
    q: "Protégez-vous les meubles fragiles et l’électroménager ?",
    a: "Oui. Nous utilisons housses, couvertures, bulles, cartons renforcés, protections d’angles et sangles. Chaque type de bien a sa méthode : le but est d’éviter les chocs, frottements et compressions.",
  },
  {
    q: "Pouvez-vous gérer l’autorisation de stationnement ?",
    a: "Oui, selon la commune. On vous guide sur les démarches, et on peut prendre en charge la demande si le périmètre le permet. C’est souvent ce qui évite 80% des galères le jour J.",
  },
] as const;

function buildFaqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Déménagement du Vexin",
    url: "https://demenagementduvexin.fr",
    areaServed: ["Vexin", "Val-d’Oise", "Yvelines", "Île-de-France", "France"],
    serviceType: [
      "Déménagement particuliers",
      "Déménagement entreprise",
      "Déménagement national",
      "Garde-meubles",
    ],
  };
}

function classNames(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function useHeaderOffset() {
  // Si tu as un header sticky ailleurs, ajuste ici
  return 84;
}

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const faqJsonLd = React.useMemo(() => buildFaqJsonLd(FAQ), []);
  const businessJsonLd = React.useMemo(() => buildLocalBusinessJsonLd(), []);
  const headerOffset = useHeaderOffset();

  const scrollToId = React.useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y =
        el.getBoundingClientRect().top + window.scrollY - (headerOffset ?? 0);
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [headerOffset]
  );

  return (
    <div className="bg-background text-foreground">
      {/* JSON-LD (SEO) */}
      <Script id="ldjson-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script
        id="ldjson-localbusiness"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(businessJsonLd)}
      </Script>

      {/* Sticky mini-nav (UX + conversion) */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Déménagement du Vexin</span>
              <span className="sm:hidden">DV</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              <button
                onClick={() => scrollToId("services")}
                className="rounded-full px-3 py-1.5 hover:bg-muted/60 hover:text-foreground transition"
              >
                Services
              </button>
              <button
                onClick={() => scrollToId("process")}
                className="rounded-full px-3 py-1.5 hover:bg-muted/60 hover:text-foreground transition"
              >
                Méthode
              </button>
              <button
                onClick={() => scrollToId("avis")}
                className="rounded-full px-3 py-1.5 hover:bg-muted/60 hover:text-foreground transition"
              >
                Avis
              </button>
              <button
                onClick={() => scrollToId("faq")}
                className="rounded-full px-3 py-1.5 hover:bg-muted/60 hover:text-foreground transition"
              >
                FAQ
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => scrollToId("devis")}
              >
                Devis
              </Button>
              <Button size="sm" asChild className="gap-2">
                <Link href="/demande-devis">
                  Devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO (plus premium, plus “editorial”, moins “banner”) */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/hero-demenagement-vexin/2600/1700"
            alt="Déménageurs professionnels chargeant un camion avec protection des meubles"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/70" />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-white/15">
                <Clock3 className="h-4 w-4" />
                Vexin • Île-de-France • National
              </div>

              <SectionTitle
                as="h1"
                className="mt-6 text-white text-4xl md:text-6xl leading-tight drop-shadow-md"
              >
                Déménagez l’esprit <u>tranquille</u>.
                <br />
                Une exécution <u>propre</u>, sans stress.
              </SectionTitle>

              <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
                Particuliers & entreprises. Protection premium, devis clair,
                organisation millimétrée. On anticipe chaque détail pour une
                expérience fluide.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/demande-devis">
                    Obtenir mon devis gratuit <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <Link href="/contact">
                    Être rappelé <PhoneCall className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Proof + zones quick links */}
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-amber-400 fill-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/85">
                      Noté <span className="font-semibold text-white">5/5</span> (avis clients)
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">
                    Devis détaillé • Protection premium • Planning maîtrisé
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                  <p className="text-sm font-semibold text-white">
                    Zones couvertes
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ZONES.map((z) => (
                      <Link
                        key={z.href}
                        href={z.href}
                        className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 hover:bg-white/15"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        {z.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: “Quote card” (conversion + lisibilité) */}
            <div className="rounded-2xl bg-background/90 text-foreground ring-1 ring-white/10 shadow-2xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  Réponse rapide • Devis gratuit • Sans engagement
                </div>
                <p className="mt-3 text-xl font-semibold">
                  Obtenez une estimation claire en 1 minute
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Indiquez votre besoin, nous vous recontactons avec un devis détaillé et un plan d’exécution.
                </p>

                <div className="mt-6 grid gap-3">
                  <Button asChild className="w-full gap-2" size="lg">
                    <Link href="/demande-devis">
                      Demander un devis <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="/simulateur-volume">
                      Estimer mon volume <Calculator className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Protection</p>
                    <p className="mt-1 text-sm font-semibold">Premium</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Devis</p>
                    <p className="mt-1 text-sm font-semibold">Détaillé</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">Timing</p>
                    <p className="mt-1 text-sm font-semibold">Maîtrisé</p>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border bg-card p-4">
                  <p className="text-sm font-semibold">Astuce qualité</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Pour un devis précis, la visite technique est recommandée dès{" "}
                    <span className="font-medium text-foreground">20–25 m³</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Anchor chips */}
          <div className="mt-10 flex flex-wrap gap-2 text-sm">
            {[
              { id: "services", label: "Voir les services" },
              { id: "process", label: "Notre méthode" },
              { id: "avis", label: "Avis clients" },
              { id: "faq", label: "FAQ" },
              { id: "devis", label: "Demander un devis" },
            ].map((x) => (
              <button
                key={x.id}
                onClick={() => scrollToId(x.id)}
                className="rounded-full border bg-background/40 px-4 py-2 text-white/90 backdrop-blur hover:bg-white/10 transition"
              >
                {x.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP (plus épuré + plus “premium”) */}
      <section className="border-y bg-muted/30">
        <div className="container py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENGAGEMENTS.map((e) => (
              <Card key={e.title} className="rounded-2xl">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{e.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* micro-cta */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild>
              <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">Voir les prestations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES (carte premium + hover discret) */}
      <section id="services" className="py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle>
              Un savoir-faire pour <u>chaque projet</u>
            </SectionTitle>
            <p className="mt-4 text-muted-foreground text-lg">
              Particulier, entreprise, national ou stockage : on adapte la méthode, le matériel et le planning.
              Objectif : une exécution propre, sans mauvaise surprise.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {SERVICES.map((s) => (
              <Link
                href={s.link}
                key={s.title}
                className="group relative block overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.imageUrl}
                    alt={s.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-95" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15">
                    <s.icon className="h-4 w-4" />
                    Service
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    En savoir plus{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Découvrir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS (plus “story” + visuel + points différenciants) */}
      <section id="process" className="py-20 md:py-24 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionTitle>
                Une méthode simple.
                <br />
                Un résultat <u>parfait</u>.
              </SectionTitle>
              <p className="mt-5 text-muted-foreground text-lg">
                Le “sans stress” n’est pas un slogan : c’est une procédure. Chaque étape réduit le risque,
                améliore la fluidité et protège vos biens.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {PROCESS.map((p) => (
                  <Card key={p.title} className="rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                          <p.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">{p.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="gap-2">
                  <Link href="/demande-devis">
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/simulateur-volume">
                    Estimer mon volume <Calculator className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 grid gap-3">
                <div className="rounded-2xl border bg-card p-4">
                  <p className="text-sm font-semibold">Ce qui fait la différence</p>
                  <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-primary" />
                      Protection adaptée à chaque bien (fragile, lourd, volumineux).
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-primary" />
                      Anticipation des accès & stationnement pour éviter les blocages.
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-0.5 text-primary" />
                      Chargement sécurisé pour réduire le risque de casse.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://picsum.photos/seed/method-demenagement/1400/1750"
                  alt="Protection professionnelle des meubles avec couvertures et housses"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-semibold">Qualité visible, dès le premier geste</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  On protège avant de déplacer. On planifie avant d’exécuter. Et on contrôle avant de partir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="avis" className="scroll-mt-24">
        <TestimonialsSection reviews={reviews} />
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <SectionTitle>
              Vos <u>questions</u>, nos <u>réponses</u>
            </SectionTitle>
            <p className="mt-4 text-muted-foreground text-lg">
              Les bons repères pour décider sereinement et éviter les erreurs classiques.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mt-12">
            {FAQ.map((item, i) => (
              <AccordionItem value={`faq-${i}`} key={i}>
                <AccordionTrigger className="text-left text-base md:text-lg hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">Guides & conseils</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="devis" className="py-20 md:py-24">
        <div className="container">
          <div className="rounded-2xl border bg-primary text-primary-foreground p-8 md:p-14 shadow-2xl shadow-primary/20">
            <div className="mx-auto max-w-3xl text-center">
              <SectionTitle className="text-primary-foreground">
                Prêt pour un déménagement <u>sans stress</u> ?
              </SectionTitle>
              <p className="mt-4 text-lg text-primary-foreground/85">
                Ville de départ, destination, volume estimé : on vous répond avec une proposition claire
                et un plan d’exécution propre.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn("border-white/35 text-white hover:bg-white/10")}
                  asChild
                >
                  <Link href="/contact">Contact rapide</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  <ShieldCheck className="h-4 w-4" /> Protection pro
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  <FileText className="h-4 w-4" /> Devis détaillé
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  <Clock3 className="h-4 w-4" /> Planning maîtrisé
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer maillage interne (utile SEO + UX) */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Pages services</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link className="hover:text-foreground" href="/demenagement-particuliers">
                      Déménagement particuliers
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/demenagement-entreprise-bureau">
                      Déménagement entreprise
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/demenagement-national">
                      Déménagement national
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/garde-meubles">
                      Garde-meubles
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Zones couvertes</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {ZONES.map((z) => (
                    <li key={z.href}>
                      <Link className="hover:text-foreground" href={z.href}>
                        {z.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Ressources</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link className="hover:text-foreground" href="/blog">
                      Guides & conseils
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/simulateur-volume">
                      Simulateur de volume
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/demande-devis">
                      Demande de devis
                    </Link>
                  </li>
                  <li>
                    <Link className="hover:text-foreground" href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Déménagement du Vexin — Qualité, méthode, sérénité.
          </div>
        </div>
      </section>
    </div>
  );
}
