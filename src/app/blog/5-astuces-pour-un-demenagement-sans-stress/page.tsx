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
  Calculator,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/**
 * ✅ SEO notes:
 * - Canonical : adapte l’URL à ta vraie route (ex: /blog/demenagement-sans-stress)
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
              Retour aux Conseils
            </Link>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              5 astuces pour un <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                déménagement sans stress.
              </span>
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                7–8 min de lecture
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              
              <div className="bg-slate-50 p-8 rounded-3xl mb-12 border border-slate-100 flex flex-col md:flex-row gap-8 items-center not-prose">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Calculator className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 m-0">Avant de lire, estimez votre volume !</h3>
                  <p className="text-slate-500 text-sm leading-relaxed m-0">La première étape pour un déménagement zen est de connaître la taille de son inventaire.</p>
                  <Button asChild size="sm" className="rounded-full">
                    <Link href="/calculateur-volume">Accéder au calculateur <ChevronRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">
                Pourquoi un déménagement devient stressant (et comment l’éviter)
              </h2>
              <p>
                Dans 90% des cas, le stress vient de trois causes :{" "}
                <strong>manque d’anticipation</strong>, <strong>surplus d’affaires</strong>{" "}
                et <strong>logistique floue</strong>.
              </p>

              {/* --- ASTUCE 1 --- */}
              <h2 id="astuce-1" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6">
                1. Anticipez les démarches administratives
              </h2>
              <p>
                Commencez par les préavis : internet, énergie, assurance habitation. Pour vous aider, nous avons conçu une <Link href="/blog/checklist-demenagement" className="text-primary font-bold hover:underline">checklist complète 30 jours, 7 jours et Jour J</Link>.
              </p>

              {/* --- ASTUCE 2 --- */}
              <h2 id="astuce-2" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6">
                2. Faites un tri drastique avant de demander un devis
              </h2>
              <p>
                Déménager, c’est payer du <strong>volume</strong>. Si vous gardez “au cas où”, vous augmentez le cubage et donc le tarif. Utilisez notre <Link href="/tarif-demenagement" className="text-primary font-bold hover:underline">estimateur de prix</Link> pour voir l'impact du volume sur votre budget.
              </p>

              {/* --- ASTUCE 5 --- */}
              <h2 id="astuce-5" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6">
                5. Choisissez la bonne formule professionnelle
              </h2>
              <p>
                Le plus gros facteur de stress est la crainte d’un incident. En choisissant une formule adaptée à vos besoins (Économique, Standard ou Prestige), vous déléguez les tâches les plus lourdes. Découvrez notre <Link href="/formules-de-demenagement" className="text-primary font-bold hover:underline">comparatif des formules</Link> pour trouver la vôtre.
              </p>

              {/* ✅ CTA Final Dynamique */}
              <div className="mt-20 p-10 rounded-[3rem] bg-[#0f172a] text-white relative overflow-hidden not-prose">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Prêt pour une estimation ?</h3>
                <p className="text-slate-400 mb-8 font-light relative z-10 leading-relaxed">
                  Maintenant que vous avez les clés d'un projet zen, obtenez votre chiffrage précis sous 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <Button className="rounded-full h-14 px-8 bg-primary hover:bg-primary/90 font-bold" asChild>
                    <Link href="/demande-devis">Démarrer mon devis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-14 px-8 border-slate-700 hover:bg-white hover:text-slate-900 font-bold" asChild>
                    <Link href="/tarif-demenagement">Simuler mon tarif</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* --- FOOTER NAV --- */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
              <Button size="icon" variant="ghost" className="rounded-full hover:text-primary"><Share2 className="h-4 w-4" /></Button>
            </div>
            <Link href="/blog" className="text-sm font-black text-slate-900 hover:text-primary transition-colors flex items-center gap-2">
              Lire d’autres conseils <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
