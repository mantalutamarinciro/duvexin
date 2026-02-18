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
    imageUrl: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=800",
    imageAlt: "Déménageurs professionnels chargeant un camion",
    aiHint: "professional movers",
  },
  {
    title: "Déménagement d’Entreprise",
    description:
      "Transfert de bureaux, archives, matériel sensible : continuité d’activité, planning maîtrisé, exécution propre.",
    link: "/demenagement-entreprise-bureau",
    icon: BriefcaseBusiness,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    imageAlt: "Bureaux modernes en cours de déménagement",
    aiHint: "office relocation",
  },
  {
    title: "Déménagement National",
    description:
      "Longue distance partout en France : logistique solide, chargement sécurisé, livraison au bon timing.",
    link: "/demenagement-national",
    icon: Truck,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800",
    imageAlt: "Camion de transport sur l'autoroute",
    aiHint: "delivery truck highway",
  },
  {
    title: "Garde-Meubles & Stockage",
    description:
      "Stockage propre et sécurisé : solution idéale entre deux logements ou pour libérer de l’espace en toute sérénité.",
    link: "/demenagement-garde-meubles",
    icon: Warehouse,
    imageUrl: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800",
    imageAlt: "Entrepôt de stockage sécurisé",
    aiHint: "storage facility",
  },
];

const ENGAGEMENTS = [
  {
    icon: Users,
    title: "Équipes fiables",
    description: "Des déménageurs formés, salariés et soigneux. Une exécution propre, sans approximation.",
  },
  {
    icon: FileText,
    title: "Devis clair & détaillé",
    description: "Tarification lisible, options transparentes, aucune surprise. Vous gardez le contrôle.",
  },
  {
    icon: ShieldCheck,
    title: "Protection premium",
    description: "Couvertures, housses, sangles, emballages adaptés. Assurance et méthode pro.",
  },
  {
    icon: Lightbulb,
    title: "Organisation millimétrée",
    description: "Accès, portage, stationnement : on anticipe tout pour éviter les imprévus le jour J.",
  },
] as const;

const PROCESS = [
  {
    title: "Évaluation rapide",
    desc: "Volume, accès, contraintes. Visite technique si nécessaire pour un chiffrage précis.",
    icon: Calculator,
  },
  {
    title: "Devis & plan d’action",
    desc: "Formule adaptée, planning, protections. Vous savez exactement ce qui est prévu.",
    icon: FileText,
  },
  {
    title: "Jour J : exécution propre",
    desc: "Protection, manutention, chargement sécurisé, respect des délais et des lieux.",
    icon: ShieldCheck,
  },
  {
    title: "Livraison & installation",
    desc: "Déchargement, mise en place, remontage : on termine parfaitement votre installation.",
    icon: Check,
  },
] as const;

const ZONES = [
  { label: "Val-d’Oise (95)", href: "/demenagement-val-d-oise-95" },
  { label: "Yvelines (78)", href: "/demenagement-yvelines-78" },
  { label: "Eure (27)", href: "/demenagement-eure-27" },
  { label: "Paris (75)", href: "/demenagement-paris-75" },
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
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Déménagement du Vexin",
    url: "https://demenagementduvexin.fr",
    areaServed: ["Vexin", "Val-d’Oise", "Yvelines", "Eure", "Île-de-France", "France"],
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
          src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2000&auto=format&fit=crop"
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
              <Button size="lg" asChild className="gap-2 rounded-full h-14 px-8 text-lg">
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild className="gap-2 rounded-full h-14 px-8 text-lg bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/20">
                <Link href="/#contact">
                  Nous contacter <PhoneCall className="h-4 w-4" />
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
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white/90 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
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
              <Card key={e.title} className="rounded-2xl border-none bg-transparent shadow-none">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary shrink-0">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold">{e.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{e.description}</p>
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
                    <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-primary shrink-0">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-snug">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{s.description}</p>
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
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/services">Découvrir tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-24 bg-muted/40">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle>
                Une méthode simple.
                <br />
                Un résultat <u>parfait</u>.
              </SectionTitle>
              <p className="mt-5 text-muted-foreground text-lg">
                Le “sans stress” n’est pas une promesse marketing : c’est une procédure éprouvée.
                Chaque étape réduit le risque et améliore la fluidité de votre installation.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {PROCESS.map((p) => (
                  <Card key={p.title} className="rounded-2xl border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2 text-primary shrink-0">
                          <p.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold">{p.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="rounded-full px-8">
                  <Link href="/demande-devis">Demander un devis</Link>
                </Button>
                <Button variant="outline" asChild className="gap-2 rounded-full px-8">
                  <Link href="/calculateur-volume">
                    Estimer mon volume <Calculator className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border bg-card shadow-2xl rotate-1">
              <div className="relative aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=1200"
                  alt="Protection professionnelle des meubles avec couvertures et housses"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="p-8">
                <p className="font-bold text-xl mb-4">Ce qui change vraiment</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Protection adaptée à chaque bien (fragile, lourd, volumineux).</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Anticipation des accès & stationnement (vitesse et sérénité).</span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                    <span>Chargement sécurisé avec du matériel de capitonnage pro.</span>
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
              L’objectif : vous donner les bons repères pour décider sereinement.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full mt-12 space-y-4">
            {FAQ.map((item, i) => (
              <AccordionItem value={`faq-${i}`} key={i} className="border rounded-2xl px-6 hover:bg-slate-50 transition-colors border-slate-100">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-muted-foreground leading-relaxed pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/blog">Conseils déménagement</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="py-20 md:py-24">
        <div className="container">
          <div className="rounded-[3rem] border bg-primary text-primary-foreground p-8 md:p-20 shadow-2xl shadow-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32" />
            
            <div className="mx-auto max-w-3xl text-center relative z-10">
              <SectionTitle className="text-primary-foreground text-4xl md:text-6xl">
                Prêt pour un déménagement <u>sans stress</u> ?
              </SectionTitle>
              <p className="mt-6 text-xl text-primary-foreground/85 leading-relaxed">
                Dites-nous votre ville de départ, votre destination et le volume estimé.
                On vous répond avec une proposition claire et une organisation parfaite.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="rounded-full h-16 px-10 text-lg shadow-xl">
                  <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                </Button>
                <Button size="lg" variant="outline" className={cn("rounded-full h-16 px-10 text-lg border-white/35 text-white hover:bg-white/10")} asChild>
                  <Link href="/#contact">Contact rapide</Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/85">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                  <ShieldCheck className="h-4 w-4" /> Protection pro
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                  <FileText className="h-4 w-4" /> Devis détaillé
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">
                  <Clock3 className="h-4 w-4" /> Planning maîtrisé
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER LINKS (maillage interne stratégique) */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="rounded-[2rem] border-slate-100 bg-slate-50/50">
              <CardContent className="p-8">
                <p className="font-bold text-lg mb-4">Pages services</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link className="hover:text-primary transition-colors" href="/demenagement-particuliers">Déménagement particuliers</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/demenagement-entreprise-bureau">Déménagement entreprise</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/demenagement-national">Déménagement national</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/demenagement-garde-meubles">Garde-meubles</Link></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-slate-100 bg-slate-50/50">
              <CardContent className="p-8">
                <p className="font-bold text-lg mb-4">Zones couvertes</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {ZONES.map((z) => (
                    <li key={z.label}>
                      <Link className="hover:text-primary transition-colors" href={z.href}>{z.label}</Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-slate-100 bg-slate-50/50">
              <CardContent className="p-8">
                <p className="font-bold text-lg mb-4">Ressources</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li><Link className="hover:text-primary transition-colors" href="/blog">Guides & conseils</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/calculateur-volume">Calculateur de volume</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/demande-devis">Demande de devis</Link></li>
                  <li><Link className="hover:text-primary transition-colors" href="/a-propos-de-demenagement-du-vexin">À propos de nous</Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
