
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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      "Studio, appartement, maison : une organisation fluide, des protections irréprochables et une équipe fiable du début à la fin.",
    link: "/demenagement-particuliers",
    icon: Package,
    imageUrl: "https://picsum.photos/seed/demenagement-particuliers/1200/900",
    imageAlt: "Déménageurs protégeant des meubles pour un déménagement de particulier",
    aiHint: "professional movers furniture protection",
  },
  {
    title: "Déménagement d’Entreprise",
    description:
      "Transfert de bureaux, archives, matériel sensible : continuité d’activité, planning maîtrisé, exécution propre.",
    link: "/demenagement-entreprise-bureau",
    icon: BriefcaseBusiness,
    imageUrl: "https://picsum.photos/seed/demenagement-entreprise/1200/900",
    imageAlt: "Cartons et mobilier de bureau préparés pour un transfert d’entreprise",
    aiHint: "modern office moving boxes",
  },
  {
    title: "Déménagement National",
    description:
      "Longue distance partout en France : logistique solide, chargement sécurisé, livraison au bon timing.",
    link: "/demenagement-national",
    icon: Truck,
    imageUrl: "https://picsum.photos/seed/demenagement-national/1200/900",
    imageAlt: "Camion de déménagement sur route, trajet national",
    aiHint: "moving truck highway france",
  },
  {
    title: "Garde-Meubles & Stockage",
    description:
      "Stockage propre et sécurisé : solution idéale entre deux logements ou pour libérer de l’espace en toute sérénité.",
    link: "/demenagement-garde-meubles",
    icon: Warehouse,
    imageUrl: "https://picsum.photos/seed/garde-meubles/1200/900",
    imageAlt: "Espace de stockage garde-meubles sécurisé et organisé",
    aiHint: "clean storage facility",
  },
];

const ENGAGEMENTS = [
  {
    icon: Users,
    title: "Équipes fiables",
    description: "Des déménageurs formés, ponctuels et soigneux. Une exécution propre, sans approximation.",
  },
  {
    icon: FileText,
    title: "Devis clair & détaillé",
    description: "Tarification lisible, options transparentes, aucune zone d’ombre. Vous gardez le contrôle.",
  },
  {
    icon: ShieldCheck,
    title: "Protection premium",
    description: "Couvertures, housses, sangles, emballages adaptés. Assurance et méthode pro.",
  },
  {
    icon: Lightbulb,
    title: "Organisation millimétrée",
    description: "Accès, portage, stationnement, autorisations : on anticipe pour éviter les imprévus.",
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
  { label: "Vexin", href: "/zones-intervention" },
  { label: "Val-d’Oise (95)", href: "/demenagement-val-d-oise-95" },
  { label: "Yvelines (78)", href: "/demenagement-yvelines-78" },
  { label: "Île-de-France", href: "/zones-intervention" },
  { label: "Paris", href: "/demenagement-paris-75" },
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
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}

function buildLocalBusinessJsonLd() {
  // ⚠️ Remplace ces champs avec tes données réelles (adresse, téléphone, zone).
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

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const faqJsonLd = React.useMemo(() => buildFaqJsonLd(FAQ), []);
  const businessJsonLd = React.useMemo(() => buildLocalBusinessJsonLd(), []);

  return (
    <div className="bg-background text-foreground">
      {/* JSON-LD (SEO) */}
      <Script id="ldjson-faq" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="ldjson-localbusiness" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(businessJsonLd)}
      </Script>

      {/* HERO */}
      <section className="relative min-h-[82vh] flex items-center py-16 md:py-24">
        <Image
          src="https://picsum.photos/seed/hero-demenagement-vexin/2400/1600"
          alt="Déménageurs professionnels chargeant un camion avec protection des meubles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 ring-1 ring-white/15">
              <Clock3 className="h-4 w-4" />
              Intervention Vexin • Île-de-France • National
            </div>

            <SectionTitle
              as="h1"
              className="mt-6 text-white text-4xl md:text-6xl leading-tight drop-shadow-md"
            >
              Déménagez l’esprit <u>tranquille</u>.
              <br />
              Organisation premium, exécution <u>irréprochable</u>.
            </SectionTitle>

            <p className="mt-6 text-lg md:text-xl text-white/90 drop-shadow">
              Particuliers & entreprises. Équipes fiables, protection pro, devis clair.
              On anticipe chaque détail pour un déménagement fluide — sans stress.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
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

            {/* Proof */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-white/85">
                  Noté <span className="font-semibold text-white">5/5</span> (avis clients)
                </p>
              </div>
              <div className="hidden sm:block h-5 w-px bg-white/25" />
              <p className="text-sm text-white/85">
                Devis détaillé • Protection premium • Organisation complète
              </p>
            </div>

            {/* Quick internal links (maillage intelligent) */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {ZONES.map((z) => (
                <Link
                  key={z.label}
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

      {/* TRUST STRIP */}
      <section className="border-y bg-muted/30">
        <div className="container py-10">
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
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle>Un savoir-faire pour <u>chaque projet</u></SectionTitle>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        En savoir plus <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
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

      {/* PROCESS */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionTitle>
                Une méthode simple.
                <br />
                Un résultat <u>parfait</u>.
              </SectionTitle>
              <p className="mt-5 text-muted-foreground text-lg">
                Le “sans stress” n’est pas une promesse marketing : c’est une procédure.
                Chaque étape réduit le risque, améliore la fluidité et protège vos biens.
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
                <Button asChild>
                  <Link href="/demande-devis">Demander un devis</Link>
                </Button>
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/calculateur-volume">
                    Estimer mon volume <Calculator className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://picsum.photos/seed/method-demenagement/1200/1500"
                  alt="Protection professionnelle des meubles avec couvertures et housses"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-semibold">Ce qui change vraiment</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary" />
                    Protection adaptée à chaque bien (fragile, lourd, volumineux).
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary" />
                    Anticipation des accès & stationnement (moins de stress, plus de vitesse).
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary" />
                    Chargement sécurisé (réduction maximale du risque de casse).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection reviews={reviews} />

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center">
            <SectionTitle>
              Vos <u>questions</u>, nos <u>réponses</u>
            </SectionTitle>
            <p className="mt-4 text-muted-foreground text-lg">
              L’objectif : vous donner les bons repères pour décider sereinement et éviter les erreurs classiques.
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
              <Link href="/blog">Conseils déménagement (guides)</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-20 md:py-24">
        <div className="container">
          <div className="rounded-2xl border bg-primary text-primary-foreground p-8 md:p-14 shadow-2xl shadow-primary/20">
            <div className="mx-auto max-w-3xl text-center">
              <SectionTitle className="text-primary-foreground">
                Prêt pour un déménagement <u>sans stress</u> ?
              </SectionTitle>
              <p className="mt-4 text-lg text-primary-foreground/85">
                Dites-nous votre ville de départ, votre destination et une estimation du volume.
                On vous répond avec une proposition claire et une organisation propre.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                </Button>
                <Button size="lg" variant="outline" className={cn("border-white/35 text-white hover:bg-white/10")} asChild>
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

      {/* FOOTER LINKS (maillage interne stratégique) */}
      <section className="pb-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Pages services</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link className="hover:text-foreground" href="/demenagement-particuliers">Déménagement particuliers</Link></li>
                  <li><Link className="hover:text-foreground" href="/demenagement-entreprise-bureau">Déménagement entreprise</Link></li>
                  <li><Link className="hover:text-foreground" href="/demenagement-national">Déménagement national</Link></li>
                  <li><Link className="hover:text-foreground" href="/demenagement-garde-meubles">Garde-meubles</Link></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Zones couvertes</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {ZONES.map((z) => (
                    <li key={z.label}>
                      <Link className="hover:text-foreground" href={z.href}>{z.label}</Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <p className="font-semibold">Ressources</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><Link className="hover:text-foreground" href="/blog">Guides & conseils</Link></li>
                  <li><Link className="hover:text-foreground" href="/calculateur-volume">Simulateur de volume</Link></li>
                  <li><Link className="hover:text-foreground" href="/demande-devis">Demande de devis</Link></li>
                  <li><Link className="hover:text-foreground" href="/contact">Contact</Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
