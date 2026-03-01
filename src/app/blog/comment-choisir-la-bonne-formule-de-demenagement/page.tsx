
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

const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "choisir-formule-demenagement";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE = "Comment choisir la bonne formule de déménagement ? (Économique, Standard, Prestige)";
const ARTICLE_DESCRIPTION = "Économique, Standard ou Prestige : comparez les formules de déménagement selon votre budget, votre temps et la fragilité de vos biens.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
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
        alt: "Choisir une formule de déménagement",
      },
    ],
  },
};

export default function ArticleFormulas() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: ARTICLE_TITLE,
    image: [placeholders["blog-formulas-hero"].url],
    datePublished: "2026-03-01T08:00:00+01:00",
    author: { "@type": "Organization", name: "Déménagement du Vexin" }
  };

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="jsonld-article-formulas" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-formulas-hero"].url}
            alt="Choisir une formule"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-formulas-hero"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/blog" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] mb-8 hover:text-white transition-colors group">
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Retour au Journal
            </Link>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              Comment choisir la bonne <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                formule de déménagement ?
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#00ad9f]" /> 01 Mars 2026</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#00ad9f]" /> 6–7 min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                “La bonne formule = le bon équilibre entre budget, temps et sécurité. Voici comment décider vite et bien.”
              </p>

              <h2 id="eco" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Wallet className="h-5 w-5" /></span>
                Formule Économique
              </h2>
              <p>C’est l’option la plus directe : vous préparez tout, nous transportons tout.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-packing"].url}
                  alt="Préparation cartons"
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-packing"].hint}
                />
              </div>

              <h2 id="standard" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]"><Settings className="h-5 w-5" /></span>
                Formule Standard
              </h2>
              <p>Le meilleur équilibre : nous gérons le fragile et le démontage/remontage du mobilier.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-team"].url}
                  alt="Équipe en action"
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-team"].hint}
                />
              </div>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">Besoin d’un devis comparatif ?</h3>
                <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                  <Link href="/demande-devis">Estimer mon projet</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
