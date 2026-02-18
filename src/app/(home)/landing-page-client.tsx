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
  MapPin,
  Clock,
  Phone,
  Check,
  Package,
  Building2,
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

// Types
type Zone = { label: string; href: string };
type Service = {
  title: string;
  desc: string;
  href: string;
  icon: React.ElementType;
};

// Données statiques
const ZONES: Zone[] = [
  { label: "Vexin", href: "/zones/vexin" },
  { label: "Val-d'Oise", href: "/zones/val-doise" },
  { label: "Yvelines", href: "/zones/yvelines" },
  { label: "Paris", href: "/zones/paris" },
  { label: "Île-de-France", href: "/zones/ile-de-france" },
];

const SERVICES: Service[] = [
  {
    title: "Particuliers",
    desc: "Protection premium, exécution soignée, zéro stress.",
    href: "/demenagement-particuliers",
    icon: Package,
  },
  {
    title: "Entreprises",
    desc: "Transfert maîtrisé, planning net, continuité d'activité.",
    href: "/demenagement-entreprise-bureau",
    icon: Building2,
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
    icon: ShieldCheck,
    title: "Équipe fiable",
    desc: "Ponctualité, soin, méthode — une organisation sans approximation.",
  },
  {
    icon: FileText,
    title: "Devis clair",
    desc: "Détaillé, transparent, sans surprise ni frais cachés.",
  },
  {
    icon: Star,
    title: "Avis clients",
    desc: "Note moyenne de 5/5 — des retours authentiques et vérifiés.",
  },
] as const;

const FAQ = [
  {
    q: "Quand réserver mon déménagement ?",
    a: "En haute saison (mai-septembre), idéalement 4 à 8 semaines à l'avance. En basse saison, 2 à 3 semaines suffisent. Plus vous anticipez, plus on sécurise vos dates.",
  },
  {
    q: "Comment est calculé le prix ?",
    a: "Le tarif dépend du volume (m³), de la distance, de la formule choisie et des accès (étage, ascenseur, stationnement). Le devis est détaillé poste par poste.",
  },
  {
    q: "La visite technique est-elle payante ?",
    a: "Non, elle est gratuite et sans engagement. Recommandée dès 20-25 m³ pour un chiffrage précis.",
  },
] as const;

// SEO JSON-LD
const buildFaqJsonLd = (items: readonly typeof FAQ[number][]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

const buildLocalBusinessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Déménagement du Vexin",
  url: "https://demenagementduvexin.fr",
  logo: "https://demenagementduvexin.fr/logo.png",
  image: "https://demenagementduvexin.fr/og-image.jpg",
  description: "Déménageur professionnel dans le Vexin et l'Île-de-France. Devis gratuit, équipe fiable, protection premium.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vexin",
    addressRegion: "Île-de-France",
    addressCountry: "FR",
  },
  areaServed: ["Vexin", "Val-d'Oise", "Yvelines", "Île-de-France", "France"],
  priceRange: "€€",
  telephone: "+33123456789",
  openingHours: "Mo-Fr 08:00-19:00",
});

// Hook personnalisé
const useHeaderOffset = () => 84;

export function LandingPageClient({ reviews }: { reviews: FormattedReview[] }) {
  const headerOffset = useHeaderOffset();

  const scrollToSection = React.useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [headerOffset]);

  return (
    <div className="bg-background text-foreground">
      {/* SEO JSON-LD */}
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(FAQ)) }}
      />
      <Script
        id="jsonld-business"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessJsonLd()) }}
      />

      {/* Hero - Épuré et immersif */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background avec overlay minimal */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?q=80&w=2000&auto=format&fit=crop"
            alt="Déménageurs professionnels préparant un déménagement avec soin"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl text-white">
            {/* Badge de localisation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Vexin • Île-de-France • National</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">
              Déménagement
              <br />
              <span className="font-semibold">sans accroc</span>
            </h1>

            <p className="mt-6 text-xl text-white/80 max-w-xl">
              Devis transparent, équipe experte, protection soignée. 
              On s'occupe de tout pour que vous ne pensiez à rien.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="gap-2 text-base px-8">
                <Link href="/demande-devis">
                  Devis gratuit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="gap-2 text-base border-white/20 text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  <Phone className="h-4 w-4" /> Être rappelé
                </Link>
              </Button>
            </div>

            {/* Preuve sociale minimaliste */}
            <div className="mt-12 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  <strong className="text-white font-semibold">5/5</strong> (avis vérifiés)
                </span>
              </div>
              
              <div className="h-4 w-px bg-white/20" />
              
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Découvrir nos services →
              </button>
            </div>

            {/* Zones - Liens internes discrets */}
            <div className="mt-12 flex flex-wrap gap-2">
              {ZONES.map((zone) => (
                <Link
                  key={zone.href}
                  href={zone.href}
                  className="px-3 py-1.5 text-xs bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:bg-white/20 transition-colors"
                >
                  {zone.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights - 3 cartes aérées */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="border-0 shadow-none bg-muted/30">
                  <CardContent className="p-8">
                    <div className="rounded-2xl bg-primary/5 w-12 h-12 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services - Grille claire */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTitle>
              Des services <span className="text-primary">sur mesure</span>
            </SectionTitle>
            <p className="text-lg text-muted-foreground mt-4">
              Particuliers, entreprises, longue distance ou stockage — 
              on a la solution adaptée à votre situation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="rounded-xl bg-primary/5 w-12 h-12 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        En savoir plus <ArrowRight className="h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Méthode - Section épurée */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle>
                Une méthode <span className="text-primary">simple</span> en 4 étapes
              </SectionTitle>
              <p className="text-lg text-muted-foreground mt-4 mb-10">
                De l'évaluation à l'installation finale, on vous guide à chaque étape.
              </p>

              <div className="space-y-6">
                {[
                  { step: "01", title: "Évaluation précise", desc: "Volume, accès, contraintes — on analyse tout" },
                  { step: "02", title: "Devis détaillé", desc: "Tarif transparent, planning clair" },
                  { step: "03", title: "Exécution soignée", desc: "Protections, manutention, transport" },
                  { step: "04", title: "Installation finale", desc: "Mise en place et contrôle qualité" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-2xl font-light text-primary/50">{item.step}</div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/demande-devis">
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop"
                alt="Déménageur protégeant soigneusement un meuble"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Avis */}
      <section id="avis" className="py-10">
        <TestimonialsSection reviews={reviews} />
      </section>

      {/* FAQ - Compacte et utile */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <SectionTitle>
              Questions <span className="text-primary">fréquentes</span>
            </SectionTitle>
            <p className="text-muted-foreground">
              Les réponses dont vous avez besoin pour avancer sereinement
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Vous avez d'autres questions ? Notre équipe est là pour vous répondre.
            </p>
            <Button asChild variant="outline">
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final - Minimal */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Prêt à déménager <span className="font-semibold text-primary">sereinement</span> ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Demandez votre devis gratuit en 2 minutes. Sans engagement.
            </p>
            <Button size="lg" asChild className="gap-2 text-base px-8">
              <Link href="/demande-devis">
                Commencer <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} Déménagement du Vexin</div>
            <div className="flex gap-6">
              <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-foreground transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}