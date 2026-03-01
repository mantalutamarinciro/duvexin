import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Share2,
  ListChecks,
  CalendarDays,
  AlarmClock,
  Truck,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/**
 * ✅ SEO notes:
 * - Adapte SITE_URL + slug à ta vraie route.
 */
const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "checklist-demenagement";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "Checklist déménagement : la liste complète (30 jours, 7 jours, 48h, jour J)";
const ARTICLE_DESCRIPTION =
  "La checklist déménagement la plus simple : quoi faire 30 jours, 7 jours, 48h avant et le jour J. Démarches, cartons, accès, kit J+1 + FAQ.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Déménagement",
  authors: [{ name: "Déménagement du Vexin" }],
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    siteName: "Déménagement du Vexin",
    locale: "fr_FR",
    images: [
      {
        url: placeholders["blog-packing"].url,
        width: 1920,
        height: 1080,
        alt: "Checklist déménagement : cartons, planning et organisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [placeholders["blog-packing"].url],
  },
};

function buildJsonLd() {
  const publishedTime = "2026-03-01T08:00:00+01:00";
  const modifiedTime = "2026-03-01T08:00:00+01:00";

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
    author: { "@type": "Organization", name: "Déménagement du Vexin", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Déménagement du Vexin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    image: [placeholders["blog-packing"].url],
    articleSection: "Organisation & checklist",
    keywords: [
      "checklist déménagement",
      "liste déménagement",
      "que faire avant déménagement",
      "démarches déménagement",
      "cartons déménagement",
      "jour J déménagement",
      "kit J+1 déménagement",
      "réservation ascenseur déménagement",
    ],
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Checklist déménagement",
        item: CANONICAL_URL,
      },
    ],
  };

  return [blogPosting, breadcrumb];
}

function ChecklistBlock({
  title,
  icon,
  items,
  tone = "default",
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone?: "default" | "accent" | "dark";
}) {
  const base =
    "rounded-[1.75rem] border border-slate-200 bg-white p-6 md:p-7";
  const accent =
    "rounded-[1.75rem] border border-[#00ad9f]/30 bg-[#00ad9f]/5 p-6 md:p-7";
  const dark =
    "rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 md:p-7 text-white";

  const cls = tone === "accent" ? accent : tone === "dark" ? dark : base;

  return (
    <section className={cls}>
      <div className="flex items-start gap-3">
        <div
          className={
            tone === "dark"
              ? "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"
              : "mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
          }
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className={tone === "dark" ? "m-0 text-xl font-extrabold text-white" : "m-0 text-xl font-extrabold text-slate-900"}>
            {title}
          </h3>
          <p className={tone === "dark" ? "mt-1 text-sm text-slate-300" : "mt-1 text-sm text-slate-600"}>
            Coche mentalement (ou imprime) : ces tâches évitent 90% des oublis.
          </p>
        </div>
      </div>

      <ul className={tone === "dark" ? "mt-5 space-y-3 list-none p-0" : "mt-5 space-y-3 list-none p-0"}>
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2
              className={
                tone === "dark"
                  ? "h-5 w-5 shrink-0 mt-0.5 text-teal-300"
                  : "h-5 w-5 shrink-0 mt-0.5 text-[#00ad9f]"
              }
            />
            <span className={tone === "dark" ? "text-sm text-slate-200" : "text-sm text-slate-700"}>
              {it}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ArticleChecklistMoving() {
  const jsonLd = buildJsonLd();

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* ✅ JSON-LD */}
      <Script
        id="jsonld-article-checklist-moving"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-packing"].url}
            alt="Checklist déménagement : cartons, planning et organisation"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-packing"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] mb-8 hover:text-white transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Retour au Journal
            </Link>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              Checklist déménagement <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                (30 jours, 7 jours, 48h, jour J)
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Une liste claire, dans le bon ordre, pour éviter le stress : démarches, cartons, accès,
              kit J+1, et les actions à faire après l’arrivée.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                9–11 min de lecture
              </span>
            </div>

            {/* ✅ Sommaire */}
            <nav className="mt-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  ["#intro", "Pourquoi ça marche"],
                  ["#30j", "30 jours"],
                  ["#7j", "7 jours"],
                  ["#48h", "48h"],
                  ["#jourj", "Jour J"],
                  ["#apres", "Après"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <a
                    key={href}
                    href={href}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              <p
                id="intro"
                className="scroll-mt-28 text-xl text-slate-600 font-light leading-relaxed mb-10 italic border-l-4 border-[#00ad9f] pl-8"
              >
                “Le stress vient rarement du transport… Il vient des oublis. Une checklist bien ordonnée
                supprime l’effet ‘to-do infini’ et sécurise les démarches, les accès et l’installation.”
              </p>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">
                Comment utiliser cette checklist
              </h2>
              <ul className="space-y-2">
                <li>Commence par la section <strong>30 jours</strong> (démarches + organisation).</li>
                <li>Ne saute pas les <strong>accès</strong> (ascenseur, stationnement, portage) : c’est un piège classique.</li>
                <li>Prépare un <strong>kit J+1</strong> : c’est le meilleur “anti-crise” le soir.</li>
              </ul>

              <div className="not-prose mt-10 grid gap-6">
                {/* 30 jours */}
                <div id="30j" className="scroll-mt-28" />
                <ChecklistBlock
                  title="À faire 30 jours avant"
                  icon={<CalendarDays className="h-5 w-5" />}
                  items={[
                    "Faire un tri sérieux (don / vente / recyclage) pour réduire le volume et le coût.",
                    "Demander 1 à 3 devis (ou planifier une visite technique) pour estimer le m³ et les besoins.",
                    "Prévenir / transférer : box internet, électricité/gaz, assurance habitation, banque, mutuelle.",
                    "Informer l’école/crèche si besoin et récupérer les documents de transfert.",
                    "Réserver des congés si nécessaire et choisir une date évitant fin de mois si possible.",
                    "Commencer à récupérer/acheter : cartons solides, papier bulle/bullkraft, ruban, marqueur.",
                  ]}
                />

                {/* 7 jours */}
                <div id="7j" className="scroll-mt-28" />
                <ChecklistBlock
                  title="À faire 7 jours avant"
                  icon={<ListChecks className="h-5 w-5" />}
                  items={[
                    "Emballer progressivement : pièces secondaires puis pièces principales (en gardant l’essentiel).",
                    "Étiqueter intelligemment : pièce précise + “fragile” + “haut” + “ouvrir en premier” si besoin.",
                    "Démonter les meubles non indispensables (ou préparer la liste si démontage prévu).",
                    "Confirmer les accès : réservation ascenseur, autorisation de stationnement, codes, badges, clés.",
                    "Préparer un carton ‘Essentiels’ (scotch, cutter, sacs poubelle, multiprise, chargeurs, eau).",
                    "Planifier le nettoyage (sortie/entrée) et faire un point sur les documents importants.",
                  ]}
                />

                {/* 48h */}
                <div id="48h" className="scroll-mt-28" />
                <ChecklistBlock
                  title="À faire 48h avant"
                  icon={<AlarmClock className="h-5 w-5" />}
                  items={[
                    "Constituer le kit J+1 : draps, serviettes, toilette, médicaments, chargeurs, papiers, café/thé.",
                    "Vider/ dégivrer le congélateur si nécessaire, consommer les produits frais, prévoir une glacière.",
                    "Sécuriser les objets très fragiles/valeur (bijoux, documents, PC) : à garder avec vous.",
                    "Regrouper les clés, télécommandes, papiers (bail, état des lieux, contrats) dans une pochette.",
                    "Prévoir un sac pour enfants (doudou/pyjama/jouets essentiels) si vous déménagez en famille.",
                  ]}
                  tone="accent"
                />

                {/* Jour J */}
                <div id="jourj" className="scroll-mt-28" />
                <ChecklistBlock
                  title="Le jour J (check opérationnel)"
                  icon={<Truck className="h-5 w-5" />}
                  items={[
                    "Protéger les sols/angles si besoin (couvertures, cartons) et dégager les passages.",
                    "Garder le kit J+1 avec vous (pas dans le camion) + documents + clés.",
                    "Faire un état rapide : photos des compteurs / pièces si nécessaire.",
                    "Identifier les cartons ‘fragile’ et indiquer l’ordre de déchargement (priorité : chambre / cuisine).",
                    "À l’arrivée : remonter en priorité lit(s), éclairage, et ouvrir le carton essentiels.",
                  ]}
                  tone="dark"
                />

                {/* Après */}
                <div id="apres" className="scroll-mt-28" />
                <ChecklistBlock
                  title="Après l’arrivée (J+1 à J+7)"
                  icon={<Home className="h-5 w-5" />}
                  items={[
                    "Vérifier l’ouverture des compteurs + connexion internet (ou date d’intervention).",
                    "Déballer d’abord : cuisine, salle de bain, chambre (ordre = confort immédiat).",
                    "Mettre à jour l’adresse auprès des organismes restants (et activer le transfert de courrier si pas fait).",
                    "Faire le point sur les cartons manquants/abîmés et signaler rapidement si nécessaire.",
                    "Ranger et recycler les cartons progressivement pour retrouver un espace ‘vivable’.",
                  ]}
                />
              </div>

              {/* Astuce pro */}
              <div className="not-prose mt-12 rounded-[2rem] border-l-4 border-[#00ad9f] bg-[#00ad9f]/5 p-7">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#00ad9f] shadow-sm">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="m-0 text-base font-extrabold text-slate-900">
                      Astuce de pro : “un carton = une logique”
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      Évite les cartons “fourre-tout”. Regroupe par usage (ex : “Cuisine – placards”,
                      “Salle de bain – tiroirs”). Tu déballes plus vite, tu perds moins d’énergie.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <h2 id="faq" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6">
                FAQ — Checklist déménagement
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quand commencer les cartons ?
              </h3>
              <p>
                Idéalement 2 à 3 semaines avant, en commençant par ce que vous utilisez peu.
                Gardez une “zone de vie” fonctionnelle jusqu’au dernier moment.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Qu’est-ce qui est prioritaire le jour J ?
              </h3>
              <p>
                Le kit J+1, l’accès (stationnement/ascenseur), puis à l’arrivée : chambre(s) et cuisine.
                Le confort immédiat réduit le stress du premier soir.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Comment éviter la casse ?
              </h3>
              <p>
                Cartons adaptés, calage sans vide, étiquetage “fragile”, et transport des miroirs/TV debout.
                Si vous avez beaucoup de fragile, une formule Standard est souvent plus sûre.
              </p>

              {/* CTA */}
              <div className="not-prose mt-14 rounded-[2.5rem] bg-slate-50 border border-slate-200 p-10 text-center">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                  Besoin d’aide pour estimer le volume et choisir la bonne formule ?
                </h3>
                <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                  Une estimation juste (m³ + accès + fragile) évite les surprises. Vous pouvez utiliser notre outil
                  ou demander un devis gratuit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Obtenir un devis gratuit</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                    <Link href="/calculateur-volume">Estimer mon volume (m³)</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer share/nav */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Partager :
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full hover:text-[#00ad9f]">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Link
              href="/blog"
              className="text-sm font-black text-slate-900 hover:text-[#00ad9f] transition-colors flex items-center gap-2"
            >
              Lire d’autres articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
