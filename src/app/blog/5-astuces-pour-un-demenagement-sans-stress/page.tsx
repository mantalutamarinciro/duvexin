
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

const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "5-astuces-demenagement-sans-stress";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE = "5 astuces pour un déménagement sans stress (checklist + conseils de pros)";
const ARTICLE_DESCRIPTION = "Checklist, organisation, tri, cartons, démarches : découvrez 5 astuces concrètes pour un déménagement sans stress. Conseils de déménageurs pros + erreurs à éviter.";

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
        url: placeholders["article-steps"].url,
        width: 1920,
        height: 1080,
        alt: "Déménagement organisé : cartons étiquetés et planification",
      },
    ],
  },
};

export default function ArticleStressFree() {
  const publishedTime = "2026-03-01T08:00:00+01:00";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: ARTICLE_TITLE,
    image: [placeholders["article-steps"].url],
    datePublished: publishedTime,
    author: { "@type": "Organization", name: "Déménagement du Vexin" }
  };

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script
        id="jsonld-article-stress-free"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["article-steps"].url}
            alt="Déménagement organisé"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["article-steps"].hint}
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
              5 astuces pour un <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                déménagement sans stress.
              </span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#00ad9f]" /> 01 Mars 2026</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#00ad9f]" /> 7–8 min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                “Le jour J approche et la liste des tâches semble s’allonger à l’infini ? Pas de panique. Voici 5 secrets simples pour garder le contrôle.”
              </p>

              <h2 id="astuce-1" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">1</span>
                Anticipez les démarches administratives
              </h2>
              <p>Commencez par ce qui exige un préavis : internet, énergie, assurance habitation, et écoles.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-packing"].url}
                  alt={placeholders["blog-packing"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-packing"].hint}
                />
              </div>

              <h2 id="astuce-2" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">2</span>
                Faites un tri drastique
              </h2>
              <p>Déménager, c’est payer du volume et du temps. Le bon moment pour trier, c’est avant l’estimation.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-team"].url}
                  alt={placeholders["blog-team"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-team"].hint}
                />
              </div>

              <h2 id="astuce-3" className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">3</span>
                Adoptez un marquage intelligent
              </h2>
              <p>Un carton mal identifié = pertes de temps + énervement au déballage. Écrivez sur 2 côtés + le dessus.</p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg">
                <Image
                  src={placeholders["blog-new-home"].url}
                  alt={placeholders["blog-new-home"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-new-home"].hint}
                />
              </div>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4 relative z-10">Besoin d’un accompagnement ?</h3>
                <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                  <Link href="/demande-devis">Demander un devis</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
