
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  Smile,
  Heart,
  ArrowRight,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "demenager-avec-enfants-transition-douce";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE = "Déménager avec des enfants : conseils concrets pour une transition en douceur";
const ARTICLE_DESCRIPTION = "Annonce, routines, école, carton doudou, jour J : découvrez nos conseils pour déménager sereinement en famille.";

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
        url: placeholders["blog-kids-hero"].url,
        width: 1920,
        height: 1080,
        alt: "Déménager avec des enfants",
      },
    ],
  },
};

export default function ArticleKidsMoving() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: ARTICLE_TITLE,
    image: [placeholders["blog-kids-hero"].url],
    datePublished: "2026-03-01T08:00:00+01:00",
    author: { "@type": "Organization", name: "Déménagement du Vexin" }
  };

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="jsonld-article-kids-moving" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-kids-hero"].url}
            alt="Enfants et déménagement"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-kids-hero"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] mb-8 hover:text-white transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Retour au Journal
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            Déménager avec des enfants : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
              une transition en douceur.
            </span>
          </h1>
          <div className="flex justify-center gap-6 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#00ad9f]" /> 01 Mars 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#00ad9f]" /> 8–9 min</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                “Pour un enfant, déménager, c’est perdre des repères. Mais c’est aussi une opportunité de grandir.”
              </p>

              <h2 id="impliquer" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600"><Smile className="h-5 w-5" /></span>
                Impliquez-les
              </h2>
              <p>Donnez-leur un rôle adapté à leur âge : décorer des cartons ou choisir une affiche pour la nouvelle chambre.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-kids-packing"].url}
                  alt="Enfants qui aident"
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-kids-packing"].hint}
                />
              </div>

              <h2 id="quartier" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]"><Heart className="h-5 w-5" /></span>
                Maintenez les routines
              </h2>
              <p>Les routines rassurent : horaires de repas, rituel du coucher, histoire du soir.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-new-home"].url}
                  alt="Nouvelle maison"
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-new-home"].hint}
                />
              </div>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">Une famille sereine, un déménagement réussi.</h3>
                <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                  <Link href="/calculateur-volume">Estimer mon volume</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
