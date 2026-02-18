// src/app/(home)/landing-page-client.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  FileText,
  Users,
  MapPin,
  Clock3,
  PhoneCall,
  Check,
  Package,
  BriefcaseBusiness,
  Truck,
  Warehouse,
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

import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

/**
 * ✅ Version épurée / aérée / premium
 * - Hero captivant, minimal, respirant
 * - 1 message clair + 2 CTA max
 * - 3 preuves (max) au-dessus de la ligne de flottaison
 * - Sections peu nombreuses, ultra lisibles
 * - Maillage interne discret (zones + services)
 * - SEO : FAQ + MovingCompany JSON-LD
 */

type LinkChip = { label: string; href: string };
type ServiceMini = {
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
};

const ZONES: LinkChip[] = [
  { label: "Vexin", href: "/zones/vexin" },
  { label: "Val-d’Oise (95)", href: "/zones/val-doise" },
  { label: "Yvelines (78)", href: "/zones/yvelines" },
  { label: "Île-de-France", href: "/zones/ile-de-france" },
  { label: "Paris", href: "/zones/paris" },
];

const SERVICES: ServiceMini[] = [
  {
    title: "Particuliers",
    desc: "Protection premium, exécution soignée, zéro stress.",
    href: "/demenagement-particuliers",
    icon: Package,
  },
  {
    title: "Entreprise",
    desc: "Transfert maîtrisé, planning net, continuité d’activité.",
    href: "/demenagement-entreprise-bureau",
    icon: BriefcaseBusiness,
  },
  {
    title: "National",
    desc: "Longue distance, logistique solide, timing précis.",
    href: "/demenagement-national",
    icon: Truck,
  },
  {
    title: "Garde-meubles",
    desc: "Stockage propre et sécurisé, solution entre deux dates.",
    href: "/garde-meubles",
    icon: Warehouse,
  },
];

const HIGHLIGHTS = [
  {
    icon: Users,
    title: "Équipe fiable",
    desc: "Ponctualité, soin, méthode. Pas d’approximation.",
  },
  {
    icon: ShieldCheck,
    title: "Protection pro",
    desc: "Housses, couvertures, sangles, angles, cartons adaptés.",
  },
  {
    icon: FileText,
    title: "Devis clair",
    desc: "Détaillé, transparent, sans surprise.",
  },
] as const;

const FAQ = [
  {
    q: "Quand réserver mon déménagement ?",
    a: "En haute saison (mai–septembre), idéalement 4 à 8 semaines à l’avance. En basse saison, 2 à 3 semaines peuvent suffire. Plus vous anticipez, plus on sécurise les créneaux et l’organisation (accès, stationnement, autorisations).",
  },
  {
    q: "Comment est calculé le prix ?",
    a: "Le tarif dépend du volume (m³), de la distance, de la formule choisie et des accès (étage, ascenseur, portage, stationnement). Le devis est détaillé pour que chaque poste soit compréhensible.",
  },
  {
    q: "La visite technique est-elle payante ?",
    a: "Non, elle est gratuite et sans engagement. Recommandée dès ~20–25 m³ pour un chiffrage précis et pour anticiper les contraintes d’accès.",
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

function useHeaderOffset() {
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
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
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

      {/* HERO — minimal, aéré, captivant */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/dv-hero-min/2400/1500"
            alt="Déménageurs professionnels, ambiance premium et rassurante"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/70" />
        </div>

        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-white/15">
              <Clock3 className="h-4 w-4" />
              Vexin • Île-de-France • National
            </div>

            <SectionTitle
              as="h1"
              className="mt-6 text-white text-4xl md:text-6xl leading-tight tracking-tight"
            >
              Un déménagement
              <br />
              <u>fluide</u>, <u>soigné</u>, <u>sans stress</u>.
            </SectionTitle>

            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl">
              Devis clair. Protection premium. Une équipe fiable — et une organisation
              qui évite les mauvaises surprises.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="gap-2">
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/contact">
                  Être rappelé <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Proof — ultra minimal */}
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/85">
              <div className="inline-flex items-center gap-2">
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </span>
                <span>
                  <span className="font-semibold text-white">5/5</span> (avis clients)
                </span>
              </div>

              <div className="hidden sm:block h-4 w-px bg-white/25" />

              <button
                onClick={() => scrollToId("services")}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15 hover:bg-white/15 transition"
              >
                Voir les services <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Zones chips — discret */}
            <div className="mt-8 flex flex-wrap gap-2">
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
      </section>

      {/* HIGHLIGHTS — 3 cartes max, très aérées */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <Card key={h.title} className="rounded-2xl">
                <CardContent className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <h.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{h.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — minimal, lisible, pas de bruit */}
      <section id="services" className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle>
              Des services <u>clairs</u>, adaptés à votre situation
            </SectionTitle>
            <p className="mt-4 text-muted-foreground text-lg">
              Choisissez votre cas — on vous explique simplement comment ça se passe.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-2xl border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <p className="text-lg font-semibold">{s.title}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Découvrir <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Voir toutes les prestations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MÉTHODE — une seule section, ultra simple */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionTitle>
                Une méthode courte.
                <br />
                Un résultat <u>propre</u>.
              </SectionTitle>
              <p className="mt-4 text-muted-foreground text-lg">
                On évite l’imprévu avec une organisation nette : protéger, déplacer,
                sécuriser, contrôler.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Évaluation (volume + accès + contraintes)",
                  "Devis détaillé + planning clair",
                  "Jour J : protections + manutention soignée",
                  "Contrôle final + installation si prévue",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 rounded-2xl border bg-card p-4"
                  >
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="gap-2">
                  <Link href="/demande-devis">
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/simulateur-volume">Estimer mon volume</Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://picsum.photos/seed/dv-method-min/1200/1500"
                  alt="Déménageur protégeant un meuble avec une couverture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-semibold">Le détail qui change tout</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  On protège avant de porter. On sécurise avant de rouler. On contrôle avant de partir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVIS — garder l’espace / respirer */}
      <section id="avis" className="py-10">
        <TestimonialsSection reviews={reviews} />
      </section>

      {/* FAQ — courte */}
      <section id="faq" className="py-16 md:py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <SectionTitle>
              FAQ (court, utile)
            </SectionTitle>
            <p className="mt-4 text-muted-foreground text-lg">
              Juste l’essentiel pour décider sereinement.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mt-10">
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

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA FINAL — simple */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="rounded-2xl border bg-primary text-primary-foreground p-8 md:p-14 text-center shadow-2xl shadow-primary/20">
            <SectionTitle className="text-primary-foreground">
              Prêt à déménager <u>sans stress</u> ?
            </SectionTitle>
            <p className="mt-4 text-lg text-primary-foreground/85 mx-auto max-w-2xl">
              Une demande simple → un devis clair → une organisation propre.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/demande-devis">
                  Devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 border-white/35 text-white hover:bg-white/10">
                <Link href="/contact">
                  Être rappelé <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Déménagement du Vexin
          </div>
        </div>
      </section>
    </div>
  );
}
