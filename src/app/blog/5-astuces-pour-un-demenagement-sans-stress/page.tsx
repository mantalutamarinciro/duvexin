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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/**
 * ✅ SEO notes:
 * - Canonical : adapte l’URL à ta vraie route (ex: /blog/demenagement-sans-stress)
 * - Images OG : idéalement une image hébergée sur ton domaine (plus fiable que Unsplash)
 */
const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "5-astuces-demenagement-sans-stress";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "5 astuces pour un déménagement sans stress (checklist + conseils de pros)";
const ARTICLE_DESCRIPTION =
  "Checklist, organisation, tri, cartons, démarches : découvrez 5 astuces concrètes pour un déménagement sans stress. Conseils de déménageurs pros + erreurs à éviter.";

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
        // ✅ Idéalement remplace par une image sur ton domaine: `${SITE_URL}/og/blog/${ARTICLE_SLUG}.jpg`
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920",
        width: 1920,
        height: 1080,
        alt: "Déménagement organisé : cartons étiquetés et planification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920",
    ],
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
    image: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920",
    ],
    articleSection: "Conseils déménagement",
    keywords: [
      "déménagement sans stress",
      "checklist déménagement",
      "organisation déménagement",
      "cartons déménagement",
      "démarches déménagement",
      "tri avant déménagement",
      "déménageur professionnel",
    ],
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "5 astuces pour un déménagement sans stress",
        item: CANONICAL_URL,
      },
    ],
  };

  return [blogPosting, breadcrumb];
}

export default function ArticleStressFree() {
  const jsonLd = buildJsonLd();

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* ✅ JSON-LD */}
      <Script
        id="jsonld-article-stress-free"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920"
            alt="Déménagement organisé : cartons, planning et check-list"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
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
              5 astuces pour un <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                déménagement sans stress.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Organisation, cartons, démarches, tri, kit de survie : voici une méthode
              simple (et éprouvée sur le terrain) pour que votre déménagement se passe
              sans panique — même avec un timing serré.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                7–8 min de lecture
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                Checklist incluse
              </span>
            </div>

            {/* ✅ Mini sommaire (SEO + UX) */}
            <nav className="mt-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  ["#astuce-1", "Démarches"],
                  ["#astuce-2", "Tri"],
                  ["#astuce-3", "Cartons"],
                  ["#astuce-4", "Kit J+1"],
                  ["#astuce-5", "Choix du déménageur"],
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
      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                “Le jour J approche et la liste des tâches semble s’allonger à l’infini ?
                Pas de panique. En tant que professionnels, nous avons accompagné des
                déménagements de toutes tailles : studios, maisons, bureaux, longues
                distances… Voici 5 secrets simples pour garder le contrôle — et le sourire.”
              </p>

              {/* ✅ Intro SEO : couvre intentions + mots-clés */}
              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">
                Pourquoi un déménagement devient stressant (et comment l’éviter)
              </h2>
              <p>
                Dans 90% des cas, le stress vient de trois causes :{" "}
                <strong>manque d’anticipation</strong>, <strong>surplus d’affaires</strong>{" "}
                et <strong>logistique floue</strong> (cartons non étiquetés, accès difficiles,
                ascenseur réservé trop tard, stationnement non prévu, etc.).
                La bonne nouvelle : avec une méthode claire, vous réduisez les imprévus,
                donc la fatigue… et les coûts.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">
                  🎯 Objectif de cet article
                </p>
                <p className="text-sm text-slate-700 mb-0">
                  Vous donner une checklist ultra concrète pour organiser votre déménagement,
                  éviter les oublis administratifs, gagner du temps au chargement et réussir
                  l’installation sans chaos.
                </p>
              </div>

              {/* --- ASTUCE 1 --- */}
              <h2
                id="astuce-1"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">
                  1
                </span>
                Anticipez les démarches administratives (sans vous disperser)
              </h2>

              <p>
                La charge mentale d’un déménagement explose quand vous avez “100 petites
                choses” en tête. La solution : regrouper les démarches par priorité et délai.
                Commencez par ce qui exige un préavis : <strong>internet</strong>,{" "}
                <strong>énergie</strong>, <strong>assurance habitation</strong>, et{" "}
                <strong>écoles / crèches</strong> si besoin.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Checklist rapide (à faire 2 à 4 semaines avant)
              </h3>
              <ul className="space-y-2">
                <li>Résiliation / transfert box internet et abonnement mobile si nécessaire</li>
                <li>Électricité / gaz : ouverture compteur + relevés</li>
                <li>Assurance habitation : nouveau contrat ou avenant</li>
                <li>Banque, impôts, employeur, mutuelle : changement d’adresse</li>
                <li>Réservation ascenseur / créneau déménagement si copropriété</li>
              </ul>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-packing"].url}
                  alt={placeholders["blog-packing"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-packing"].hint}
                />
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Astuce de pro :
                </p>
                <p className="text-sm mt-2 mb-0">
                  Activez le <strong>transfert de courrier</strong> (La Poste) environ 15 jours
                  avant : c’est une sécurité énorme pour les organismes que vous auriez oubliés.
                </p>
              </div>

              {/* --- ASTUCE 2 --- */}
              <h2
                id="astuce-2"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">
                  2
                </span>
                Faites un tri drastique (et libérateur) avant de demander un devis
              </h2>

              <p>
                Déménager, c’est payer du <strong>volume</strong> et du <strong>temps</strong>.
                Si vous gardez “au cas où”, vous augmentez le cubage, le nombre de cartons, la
                manutention… donc le tarif et la fatigue. Le bon moment pour trier, c’est{" "}
                <strong>avant</strong> l’estimation (ou au minimum avant l’emballage).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Une règle simple : “12 mois = décision”
              </h3>
              <p>
                Si un objet n’a pas été utilisé depuis 12 mois (hors saisonnier), posez-vous :
                est-ce que je le garde vraiment ? Sinon : <strong>don</strong>,{" "}
                <strong>vente</strong>, <strong>recyclage</strong>.
              </p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-team"].url}
                  alt={placeholders["blog-team"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-team"].hint}
                />
              </div>

              {/* --- ASTUCE 3 --- */}
              <h2
                id="astuce-3"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">
                  3
                </span>
                Adoptez un marquage “intelligent” pour vos cartons (gain de temps énorme)
              </h2>

              <p>
                Un carton mal identifié = pertes de temps + énervement au déballage.
                Ne vous contentez pas de “Cuisine” : soyez précis et standardisez un système
                compris par tout le monde (vous, vos proches, ou l’équipe de déménageurs).
              </p>

              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>
                    Écrivez sur <strong>2 côtés + dessus</strong> (visible même empilé).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>
                    Indiquez la pièce <strong>précise</strong> : “Chambre parentale”,
                    “Cuisine – placards”, “Salle de bain – tiroirs”.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>
                    Ajoutez une mention : <strong>Fragile</strong>, <strong>Haut/Bas</strong>,
                    ou <strong>Ouvrir en premier</strong>.
                  </span>
                </li>
              </ul>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">📦 Bonus : le carton “Essentiels”</p>
                <p className="text-sm text-slate-700 mb-0">
                  Faites un carton unique “Essentiels – Jour J” : scotch, cutter, sacs poubelle,
                  multiprise, chargeurs, eau, papiers, rouleau essuie-tout. Il doit être accessible
                  en dernier… donc chargé en dernier.
                </p>
              </div>

              {/* --- ASTUCE 4 --- */}
              <h2
                id="astuce-4"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">
                  4
                </span>
                Préparez votre “Kit de survie J+1” (la première nuit compte)
              </h2>

              <p>
                Le vrai stress arrive souvent… le soir. Vous êtes épuisé, vous ne trouvez pas
                les draps, plus de chargeur, pas de café. Le kit J+1 évite ce scénario.
                Gardez-le avec vous (pas dans le camion).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Que mettre dans le kit J+1 ?
              </h3>
              <ul className="space-y-2">
                <li>Draps + serviettes + nécessaire toilette</li>
                <li>Chargeurs, multiprise, lampe / veilleuse</li>
                <li>Documents importants (papiers, clés, contrats, ordonnance si besoin)</li>
                <li>Une tenue complète + vêtements confort</li>
                <li>Café/thé + bouteille d’eau + encas</li>
                <li>Outils basiques : tournevis, cutter, scotch, gants</li>
              </ul>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-new-home"].url}
                  alt={placeholders["blog-new-home"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-new-home"].hint}
                />
              </div>

              {/* --- ASTUCE 5 --- */}
              <h2
                id="astuce-5"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">
                  5
                </span>
                Choisissez des professionnels (et réduisez le risque d’imprévus)
              </h2>

              <p>
                Le plus gros facteur de stress, ce n’est pas “les cartons”… c’est la crainte
                d’un incident : casse, retard, mauvaise organisation, effectif insuffisant,
                protection fragile, ou sous-traitance inconnue.
              </p>

              <p>
                En choisissant une entreprise comme <strong>Déménagement du Vexin</strong>,
                qui travaille avec des <strong>équipes salariées</strong> formées, vous sécurisez
                le process : coordination, protection du mobilier, manutention, respect des accès
                et des consignes (ascenseur, stationnement, créneaux).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                3 critères pour comparer deux devis (sans se tromper)
              </h3>
              <ul className="space-y-2">
                <li>Le niveau de protection (housses, couvertures, bulles, penderies…)</li>
                <li>La transparence (détails, options, assurances, conditions d’accès)</li>
                <li>La fiabilité (salariés, expérience, avis, process de suivi)</li>
              </ul>

              {/* ✅ FAQ SEO */}
              <h2
                id="faq"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-20 mb-6"
              >
                FAQ — Les questions fréquentes sur le déménagement sans stress
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Combien de temps à l’avance faut-il préparer un déménagement ?
              </h3>
              <p>
                Idéalement 3 à 6 semaines avant : tri, démarches, cartons. Si vous êtes pressé,
                concentrez-vous sur : démarches essentielles, kit J+1 et marquage intelligent.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Comment réduire le coût d’un déménagement ?
              </h3>
              <p>
                Le trio gagnant : <strong>tri</strong> (moins de volume),{" "}
                <strong>accessibilité</strong> (stationnement, ascenseur, accès), et{" "}
                <strong>organisation</strong> (cartons prêts, étiquetés, fragiles séparés).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quels sont les pires oublis le jour J ?
              </h3>
              <p>
                Chargeurs, papiers, clés, draps, produits d’entretien, scotch/cutter,
                et… la réservation d’ascenseur ou l’autorisation de stationner si nécessaire.
              </p>

              {/* ✅ CTA Final */}
              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">
                  Besoin d’un accompagnement personnalisé ?
                </h3>
                <p className="text-slate-400 mb-8 font-light relative z-10">
                  On vous aide à cadrer votre déménagement (volume, accès, protection, planning)
                  avec une étude gratuite et sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <Button
                    className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]"
                    asChild
                  >
                    <Link href="/demande-devis">Demander un devis</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full h-12 px-8 border-slate-700 hover:bg-white hover:text-slate-900"
                    asChild
                  >
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>

                {/* ✅ Maillage interne doux */}
                <div className="mt-6 text-sm text-slate-400 relative z-10">
                  À lire aussi :{" "}
                  <Link className="underline hover:text-white" href="/blog">
                    nos autres conseils déménagement
                  </Link>
                  {" • "}
                  <Link className="underline hover:text-white" href="/demande-devis">
                    estimation rapide
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- FOOTER NAV --- */}
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