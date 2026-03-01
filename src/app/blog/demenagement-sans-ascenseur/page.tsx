
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
const SLUG = "demenagement-sans-ascenseur";
const CANONICAL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title: "Déménagement sans ascenseur : solutions efficaces pour les étages élevés",
  description: "5ème étage sans ascenseur ? Découvrez comment réussir votre déménagement en étage élevé.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "Déménagement sans ascenseur",
    images: [placeholders["blog-team"].url],
  },
};

export default function ArticleNoElevator() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Déménagement sans ascenseur",
    image: [placeholders["blog-team"].url],
    datePublished: "2026-03-01",
    author: { "@type": "Organization", name: "Déménagement du Vexin" }
  };

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="jsonld-no-elevator" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative pt-32 pb-16 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-team"].url}
            alt="Déménagement sans ascenseur"
            fill
            className="object-cover opacity-20"
            priority
            data-ai-hint={placeholders["blog-team"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-xs uppercase tracking-widest text-[#00ad9f] mb-8 group hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Retour au Journal
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Déménagement sans ascenseur : <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
              comment éviter la galère ?
            </span>
          </h1>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#00ad9f]" /> 01 Mars 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#00ad9f]" /> 8 min</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] p-10 md:p-16 bg-white overflow-hidden">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none">
              <p className="text-xl text-slate-600 italic border-l-4 border-[#00ad9f] pl-6 mb-10">
                Un 4ème ou 5ème étage sans ascenseur peut transformer un déménagement classique en véritable défi physique.
              </p>

              <h2>Quand faut-il louer un monte-meubles ?</h2>
              <p>À partir du 3ème étage avec un volume important, le monte-meubles devient souvent indispensable.</p>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl border-l-4 border-[#00ad9f] my-8">
                <p className="font-bold flex items-center gap-2 text-slate-900"><Lightbulb className="h-5 w-5 text-[#00ad9f]" /> Conseil expert :</p>
                <p className="text-sm mt-2">Un monte-meubles réduit le temps de portage de 40 à 60 %.</p>
              </div>

              <div className="mt-20 p-10 bg-slate-900 text-white rounded-[2.5rem] text-center relative overflow-hidden">
                <h3 className="text-2xl font-bold mb-4">Accès difficile ? Nous avons la solution.</h3>
                <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                  <Link href="/demande-devis">Obtenir un devis gratuit</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
