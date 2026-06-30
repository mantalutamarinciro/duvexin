import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Home,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  OISE_CITY_LOCATIONS,
  OISE_DEPARTMENT_LOCATION,
  getOiseNearbyLocations,
  type OiseLocation,
} from "@/lib/oise-locations";

const BASE_URL = "https://demenagementduvexin.fr";

type OiseLocationPageProps = {
  location: OiseLocation;
};

const serviceCards = [
  {
    title: "Particuliers",
    text: "Appartement, maison, résidence familiale, petit volume ou départ longue distance avec une formule adaptée à votre budget.",
    href: "/demenagement-particuliers",
    icon: Home,
  },
  {
    title: "Entreprises",
    text: "Bureaux, archives, mobilier professionnel et informatique avec planning précis pour limiter l'arrêt d'activité.",
    href: "/demenagement-entreprise-bureau",
    icon: Building2,
  },
  {
    title: "Garde-meubles",
    text: "Solution de stockage sécurisée pendant une vente, une rénovation, un délai de livraison ou une transition familiale.",
    href: "/demenagement-garde-meubles",
    icon: Warehouse,
  },
  {
    title: "Objets sensibles",
    text: "Protection renforcée pour mobilier fragile, miroirs, tableaux, électroménager, pianos et pièces volumineuses.",
    href: "/demenagement-objets-lourds",
    icon: PackageCheck,
  },
];

function buildJsonLd(location: OiseLocation) {
  const breadcrumbItems = [
    { name: "Accueil", item: BASE_URL },
    { name: "Zones d'intervention", item: `${BASE_URL}/zones-intervention` },
  ];

  if (location.kind === "city") {
    breadcrumbItems.push({
      name: "Déménagement Oise (60)",
      item: `${BASE_URL}${OISE_DEPARTMENT_LOCATION.route}`,
    });
  }

  breadcrumbItems.push({
    name: location.name,
    item: `${BASE_URL}${location.route}`,
  });

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: location.title,
      description: location.description,
      serviceType: "Déménagement professionnel",
      provider: {
        "@type": "MovingCompany",
        name: "Déménagement du Vexin",
        url: BASE_URL,
        telephone: "+33130751235",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: location.kind === "department" ? "Oise (60)" : `${location.name}, Oise`,
      },
      url: `${BASE_URL}${location.route}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: location.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

export function OiseLocationPage({ location }: OiseLocationPageProps) {
  const nearbyLocations = getOiseNearbyLocations(location);
  const isDepartment = location.kind === "department";
  const heroImage = isDepartment
    ? "/images/services/demenagement-national.webp"
    : "/images/entete-pages.webp";

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-primary/20 selection:text-primary">
      <Script
        id={`oise-jsonld-${location.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(location)) }}
      />

      <section className="relative isolate overflow-hidden bg-slate-950 pt-32 text-white md:pt-40">
        <Image
          src={heroImage}
          alt={`${location.h1} avec Déménagement du Vexin`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/35" />

        <div className="container pb-20">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/55" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/zones-intervention" className="hover:text-white">
              Zones
            </Link>
            {location.kind === "city" ? (
              <>
                <ChevronRight className="h-3 w-3" />
                <Link href={OISE_DEPARTMENT_LOCATION.route} className="hover:text-white">
                  Oise 60
                </Link>
              </>
            ) : null}
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary">{location.name}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-black uppercase tracking-widest text-teal-200 backdrop-blur">
              <MapPin className="h-4 w-4" />
              {location.eyebrow}
            </div>
            <h1 className="max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
              {location.h1}
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-200 md:text-xl">
              {location.heroLead}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-black">
                <Link href="/demande-devis">
                  Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full border-white/20 bg-white/10 px-8 text-base font-bold text-white hover:bg-white/20 hover:text-white">
                <Link href="/calculateur-volume">
                  Calculer mon volume <Calculator className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="container flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
            <Truck className="h-5 w-5 text-primary" />
            <span>Maillage Oise : département, villes prioritaires, services et outils de conversion.</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/demenagement-particuliers" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-primary/40 hover:text-primary">
              Particuliers
            </Link>
            <Link href="/demenagement-entreprise-bureau" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-primary/40 hover:text-primary">
              Entreprises
            </Link>
            <Link href="/demenagement-garde-meubles" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-primary/40 hover:text-primary">
              Garde-meubles
            </Link>
            <Link href="/tarif-demenagement" className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:border-primary/40 hover:text-primary">
              Tarifs
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container grid gap-14 lg:grid-cols-[1fr_420px] lg:items-start">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Expertise locale</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              {location.introTitle}
            </h2>
            <div className="mt-8 space-y-5 text-lg font-light leading-relaxed text-slate-600">
              {location.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-3xl border border-primary/15 bg-primary/5 p-6">
              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <p className="text-base font-medium leading-relaxed text-slate-700">{location.localProof}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-950">{location.accessTitle}</h3>
            <ul className="mt-6 space-y-4">
              {location.accessPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Prestations</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Une offre complète pour {isDepartment ? "le département" : location.name}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceCards.map((service) => (
              <Link key={service.title} href={service.href} className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{service.text}</p>
                <span className="mt-6 inline-flex items-center text-sm font-black text-primary">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Maillage local</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              {isDepartment ? "Les villes prioritaires de l'Oise" : `Autour de ${location.name}`}
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-slate-300">
              {isDepartment
                ? "Chaque page ville renforce le silo Oise avec des contenus locaux, des canoniques propres et des liens utiles vers les services."
                : "Ces liens de proximité aident l'utilisateur à se repérer et renforcent la cohérence SEO du silo Oise."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(isDepartment ? OISE_CITY_LOCATIONS : nearbyLocations).map((city) => (
              <Link key={city.id} href={city.route} className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-primary/40 hover:bg-primary/15">
                <span>
                  <span className="block text-sm font-black text-white">{city.name}</span>
                  <span className="mt-1 block text-xs font-medium text-slate-400">{city.postalCode}</span>
                </span>
                <ArrowRight className="h-5 w-5 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </Link>
            ))}
            {!isDepartment ? (
              <Link href={OISE_DEPARTMENT_LOCATION.route} className="group flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 transition-colors hover:bg-primary/20 sm:col-span-2">
                <span>
                  <span className="block text-sm font-black text-white">Voir tout le département de l'Oise</span>
                  <span className="mt-1 block text-xs font-medium text-teal-100">Page pilier 60</span>
                </span>
                <ArrowRight className="h-5 w-5 text-teal-100 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl">
            <Image
              src="/images/services/emballage-demenagement.webp"
              alt={`Protection du mobilier pour un déménagement à ${location.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Conversion</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              {location.conversionTitle}
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-slate-600">
              {location.conversionText}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-5">
                <Users className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-sm font-black uppercase tracking-widest text-slate-950">Équipe salariée</h3>
                <p className="mt-2 text-sm text-slate-600">Pas de sous-traitance opaque : suivi clair et méthode stable.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <ClipboardList className="h-6 w-6 text-primary" />
                <h3 className="mt-3 text-sm font-black uppercase tracking-widest text-slate-950">Devis lisible</h3>
                <p className="mt-2 text-sm text-slate-600">Volume, accès, formule et options sont cadrés avant validation.</p>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="h-14 rounded-full px-8 font-black">
                <Link href="/demande-devis">
                  Recevoir mon devis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-full px-8 font-bold">
                <Link href="/tarif-demenagement">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">FAQ</span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Questions fréquentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {location.faqs.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border border-slate-200 bg-white px-5">
                <AccordionTrigger className="py-5 text-left text-base font-black text-slate-950 hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base font-light leading-relaxed text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <div className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-center text-white shadow-2xl md:p-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Devis gratuit</span>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              On prépare votre déménagement {isDepartment ? "dans l'Oise" : `à ${location.name}`} ?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
              Décrivez votre projet, vos adresses, votre volume estimé et la période souhaitée. Nous vous répondons avec une proposition claire et actionnable.
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-black">
                <Link href="/demande-devis">
                  Démarrer ma demande <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
