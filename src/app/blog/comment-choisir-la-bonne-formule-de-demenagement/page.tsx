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
  Wallet,
  Settings,
  Star,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/**
 * ✅ SEO notes:
 * - Adapte SITE_URL + slug à ta vraie route.
 * - Idéal : une image OG sur ton domaine (plus fiable qu’un CDN externe).
 */
const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "choisir-formule-demenagement";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "Comment choisir la bonne formule de déménagement ? (Économique, Standard, Prestige)";
const ARTICLE_DESCRIPTION =
  "Économique, Standard ou Prestige : comparez les formules de déménagement selon votre budget, votre temps et la fragilité de vos biens. Guide clair + FAQ + conseils de pros.";

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
        url: placeholders["blog-formulas-hero"].url,
        width: 1920,
        height: 1080,
        alt: "Choisir une formule de déménagement : budget, sécurité et confort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [placeholders["blog-formulas-hero"].url],
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL_URL,
    },
    author: {
      "@type": "Organization",
      name: "Déménagement du Vexin",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Déménagement du Vexin",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    image: [placeholders["blog-formulas-hero"].url],
    articleSection: "Formules & tarifs",
    keywords: [
      "formule déménagement",
      "déménagement économique",
      "déménagement standard",
      "déménagement prestige",
      "prix déménagement",
      "devis déménagement",
      "emballage fragile",
      "démontage remontage meubles",
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
        name: "Choisir une formule de déménagement",
        item: CANONICAL_URL,
      },
    ],
  };

  return [blogPosting, breadcrumb];
}

export default function ArticleFormulas() {
  const jsonLd = buildJsonLd();

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* ✅ JSON-LD */}
      <Script
        id="jsonld-article-formulas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-formulas-hero"].url}
            alt={placeholders["blog-formulas-hero"].alt}
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-formulas-hero"].hint}
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
              Comment choisir la bonne <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                formule de déménagement ?
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Économique, Standard ou Prestige : la bonne formule dépend surtout de votre
              <strong> temps</strong>, du <strong>niveau de fragilité</strong> de vos biens,
              et de l’<strong>accessibilité</strong> de vos logements. Voici un guide clair pour décider sans vous tromper.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                6–7 min de lecture
              </span>
            </div>

            {/* ✅ Mini sommaire */}
            <nav className="mt-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  ["#comparatif-rapide", "Comparatif"],
                  ["#eco", "Économique"],
                  ["#standard", "Standard"],
                  ["#prestige", "Prestige"],
                  ["#criteres", "Critères"],
                  ["#erreurs", "Erreurs"],
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
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                “Pour s’adapter à chaque situation, nous proposons trois niveaux de service.
                Mais le meilleur choix n’est pas toujours ‘le moins cher’ : il faut comparer
                le prix… et la charge mentale. Voici comment décider vite et bien.”
              </p>

              {/* ✅ Intro SEO */}
              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">
                La bonne formule = le bon équilibre entre budget, temps et sécurité
              </h2>
              <p>
                Avant de choisir une formule de déménagement, posez-vous 3 questions :
                <strong> avez-vous du temps pour emballer ?</strong> Avez-vous{" "}
                <strong>beaucoup de fragile</strong> ? Et vos accès sont-ils{" "}
                <strong>simples</strong> (stationnement, ascenseur, étage, portage) ?
                Plus l’accès est compliqué et le fragile important, plus une formule
                encadrée devient rentable — même si elle semble plus chère au départ.
              </p>

              {/* ✅ Comparatif rapide */}
              <h2
                id="comparatif-rapide"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Info className="h-5 w-5" />
                </span>
                Comparatif rapide des 3 formules
              </h2>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <ul className="list-none p-0 space-y-3 m-0">
                  <li className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-black">
                      €
                    </span>
                    <span>
                      <strong>Économique</strong> : vous emballez + démontez, nous transportons.
                      Idéal pour petits budgets et biens simples.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-teal-800 font-black">
                      ✓
                    </span>
                    <span>
                      <strong>Standard</strong> : nous gérons le fragile + démontage/remontage.
                      L’équilibre parfait sécurité / budget.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-black">
                      ★
                    </span>
                    <span>
                      <strong>Prestige</strong> : emballage intégral + confort maximum.
                      Vous gagnez du temps et vous évitez la fatigue.
                    </span>
                  </li>
                </ul>
              </div>

              {/* --- ECO --- */}
              <h2
                id="eco"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Wallet className="h-5 w-5" />
                </span>
                Formule Économique : pour les budgets maîtrisés
              </h2>
              <p>
                C’est l’option la plus directe : <strong>vous préparez tout, nous transportons tout</strong>.
                Vous gérez l’emballage des cartons (y compris fragile) et le démontage des meubles.
                Nous assurons le chargement, le transport, et la livraison.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">Idéal si :</p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Vous avez un budget serré.
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Vous avez du temps pour emballer à l’avance.
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Peu de fragile “sensible” (verrerie, objets de valeur…).
                  </li>
                </ul>
              </div>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Point d’attention :
                </p>
                <p className="text-sm m-0">
                  Si vous avez beaucoup de fragile, une formule Économique peut coûter “moins cher”
                  mais augmenter le risque de casse et le stress. Dans ce cas, Standard devient souvent
                  le meilleur investissement.
                </p>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-packing"].url}
                  alt="Préparation des cartons de déménagement"
                  fill
                  className="object-cover"
                  data-ai-hint="boxes packing"
                />
              </div>

              {/* --- STANDARD --- */}
              <h2
                id="standard"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Settings className="h-5 w-5" />
                </span>
                Formule Standard : le meilleur équilibre (notre plus demandée)
              </h2>
              <p>
                La formule Standard est souvent la plus pertinente : vous gardez la main sur
                l’emballage “simple”, et nous prenons en charge le plus risqué :
                <strong> l’emballage du fragile</strong> (vaisselle, verrerie, bibelots, miroirs)
                + <strong>démontage/remontage du mobilier</strong>.
              </p>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 mb-2">Le vrai plus :</p>
                <p className="text-sm m-0">
                  Le fragile est la première source de stress et de casse. Avec la Standard,
                  vous profitez de techniques d’emballage pro, d’un calage adapté, et d’une
                  responsabilité clairement encadrée.
                </p>
              </div>

              {/* --- PRESTIGE --- */}
              <h2
                id="prestige"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Star className="h-5 w-5" />
                </span>
                Formule Prestige : le service “gants blancs”
              </h2>
              <p>
                Vous voulez arriver au jour J sans avoir vécu “3 semaines de cartons” ?
                La Prestige est faite pour vous : nos équipes gèrent
                <strong> l’emballage intégral</strong> (livres, vêtements, linge, déco…)
                et déballent le fragile à l’arrivée, avec méthode et efficacité.
              </p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-team"].url}
                  alt="Équipe de déménagement professionnelle en action"
                  fill
                  className="object-cover"
                  data-ai-hint="moving team working"
                />
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-[#00ad9f]" />
                  Le conseil de l’expert
                </h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed m-0">
                  “Ne comparez pas seulement le prix : comparez votre énergie et votre temps.
                  La formule Prestige permet de rester focus sur le travail, les enfants, et
                  l’organisation globale. C’est un investissement en tranquillité.”
                </p>
              </div>

              {/* --- CRITERES --- */}
              <h2
                id="criteres"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6"
              >
                Les 4 critères pour trancher sans regret
              </h2>
              <ol className="space-y-6">
                <li>
                  <strong className="text-slate-900">Le volume (m³) :</strong> plus le volume est important,
                  plus l’emballage est long. Au-delà de ~30 m³, la Standard devient souvent
                  indispensable pour éviter l’épuisement.
                </li>
                <li>
                  <strong className="text-slate-900">La fragilité :</strong> vaisselle, objets de valeur,
                  miroirs, collections… si le fragile est important, Standard/Prestige sécurise.
                </li>
                <li>
                  <strong className="text-slate-900">Le temps disponible :</strong> si vous êtes débordé,
                  la Prestige vous “rend” des heures (et de la sérénité).
                </li>
                <li>
                  <strong className="text-slate-900">Les accès :</strong> étages, absence d’ascenseur,
                  distance portage, stationnement compliqué… plus c’est difficile, plus une formule
                  encadrée est rentable.
                </li>
              </ol>

              {/* --- ERREURS --- */}
              <h2
                id="erreurs"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6"
              >
                5 erreurs fréquentes lors du choix d’une formule
              </h2>
              <ul className="space-y-3">
                <li>Choisir le moins cher sans prendre en compte le fragile et les accès.</li>
                <li>Sous-estimer le temps d’emballage (et finir la veille, épuisé).</li>
                <li>Oublier le démontage/remontage (lit, armoire, table…) et perdre des heures.</li>
                <li>Ne pas anticiper le stationnement et la réservation d’ascenseur.</li>
                <li>Ne pas clarifier les options (cartons, protection, assurance, objets lourds).</li>
              </ul>

              {/* --- FAQ --- */}
              <h2
                id="faq"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-20 mb-6"
              >
                FAQ — Formules de déménagement : questions fréquentes
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quelle formule est la plus rentable ?
              </h3>
              <p>
                La plus “rentable” est celle qui réduit les risques (casse), la fatigue et le temps.
                Pour la majorité des clients, la <strong>Standard</strong> est le meilleur compromis.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quand choisir la formule Prestige ?
              </h3>
              <p>
                Quand vous manquez de temps, que votre logement est grand, que vous avez beaucoup de fragile,
                ou que vous souhaitez un service très confortable (emballage intégral + déballage du fragile).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Comment savoir mon volume (m³) avant un devis ?
              </h3>
              <p>
                Le plus fiable est une <strong>visite technique</strong> (ou un inventaire guidé).
                Cela évite les mauvaises surprises et permet d’estimer la formule la plus adaptée.
              </p>

              {/* ✅ CTA final + maillage interne */}
              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">Besoin d’un devis comparatif ?</h3>
                <p className="text-slate-500 mb-8 font-light max-w-xl mx-auto">
                  Lors de notre visite technique gratuite, nous pouvons chiffrer plusieurs options
                  (Économique / Standard / Prestige) pour vous aider à choisir en toute confiance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Estimer mon projet</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                    <Link href="/services">Voir le détail des formules</Link>
                  </Button>
                </div>

                <div className="mt-6 text-sm text-slate-500">
                  À lire aussi :{" "}
                  <Link className="underline hover:text-slate-900" href="/blog">
                    nos conseils déménagement
                  </Link>
                  {" • "}
                  <Link className="underline hover:text-slate-900" href="/contact">
                    poser une question
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Partager :
              </span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full hover:text-[#00ad9f]"
                  aria-label="Partager l’article"
                >
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