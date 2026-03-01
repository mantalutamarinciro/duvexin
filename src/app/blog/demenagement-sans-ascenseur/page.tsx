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
  Building2,
  AlertTriangle,
  Truck,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/* ================= SEO ================= */

const SITE_URL = "https://demenagementduvexin.fr";
const SLUG = "demenagement-sans-ascenseur";
const CANONICAL = `${SITE_URL}/blog/${SLUG}`;

export const metadata: Metadata = {
  title:
    "Déménagement sans ascenseur : solutions efficaces pour les étages élevés",
  description:
    "5ème étage sans ascenseur ? Découvrez comment réussir votre déménagement en étage élevé : portage sécurisé, monte-meubles, calcul du coût et erreurs à éviter.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title:
      "Déménagement sans ascenseur : solutions efficaces pour les étages élevés",
    description:
      "Monte-meubles, portage, accès difficiles : notre méthode professionnelle pour les déménagements en étage.",
    images: [placeholders["blog-team"].url],
  },
};

/* ================= JSON-LD ================= */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "Déménagement sans ascenseur : solutions efficaces pour les étages élevés",
  description:
    "Guide complet pour réussir un déménagement en étage sans ascenseur : portage, sécurité, coûts et monte-meubles.",
  author: {
    "@type": "Organization",
    name: "Déménagement du Vexin",
  },
  publisher: {
    "@type": "Organization",
    name: "Déménagement du Vexin",
  },
  datePublished: "2026-03-01",
  mainEntityOfPage: CANONICAL,
};

/* ================= PAGE ================= */

export default function ArticleNoElevator() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script
        id="jsonld-no-elevator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
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
          <Link
            href="/blog"
            className="inline-flex items-center text-xs uppercase tracking-widest text-[#00ad9f] mb-8 group hover:text-white transition-colors"
          >
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
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#00ad9f]" />
              01 Mars 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#00ad9f]" />
              8 min de lecture
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] p-10 md:p-16 bg-white overflow-hidden">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">

              <p className="text-xl text-slate-600 italic border-l-4 border-[#00ad9f] pl-6 mb-10">
                Un 4ème ou 5ème étage sans ascenseur peut transformer un déménagement classique en véritable défi physique. Pourtant, avec la bonne organisation et les bonnes techniques, tout devient fluide.
              </p>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">Les vrais défis d’un déménagement en étage</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                  <span><strong>Fatigue physique importante :</strong> les allers-retours dans les escaliers multiplient l'effort par 4.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                  <span><strong>Risque de blessure :</strong> sans le bon matériel de portage, le dos est très sollicité.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                  <span><strong>Détérioration des lieux :</strong> les murs et les rambardes sont souvent victimes de chocs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-1" />
                  <span><strong>Temps multiplié :</strong> sans ascenseur, la durée de manutention peut être doublée.</span>
                </li>
              </ul>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">Quand faut-il louer un monte-meubles ?</h2>
              <p>
                À partir du 3ème étage avec un volume important ou des meubles lourds (canapé, frigo américain, armoire massive), le monte-meubles devient souvent indispensable.
              </p>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl border-l-4 border-[#00ad9f] my-8">
                <p className="font-bold flex items-center gap-2 text-slate-900">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Conseil expert :
                </p>
                <p className="text-sm mt-2 mb-0">
                  Un monte-meubles réduit le temps de portage de 40 à 60 % et limite considérablement les risques de casse et de fatigue pour les équipes.
                </p>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">Comment est calculé le coût en étage ?</h2>
              <p>Le tarif d'un déménagement en étage dépend de plusieurs facteurs précis analysés lors de la visite technique :</p>
              <ul className="space-y-2">
                <li>Le nombre d’étages exact (départ et arrivée).</li>
                <li>La largeur et la configuration de l’escalier (colimaçon, marches étroites).</li>
                <li>La distance entre le camion et l’entrée de l’immeuble (distance de portage).</li>
                <li>Le volume total en m³ et la présence d'objets lourds (> 80kg).</li>
              </ul>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">Les erreurs à éviter absolument</h2>
              <ul className="space-y-2">
                <li><strong>Sous-estimer le temps :</strong> ne prévoyez pas de finir en 2h si vous êtes au 5ème sans ascenseur.</li>
                <li><strong>Ne pas réserver le stationnement :</strong> si le camion est loin, la fatigue de l'équipe sera fatale à l'organisation.</li>
                <li><strong>Choisir des amis non expérimentés :</strong> les risques de blessures et de casse sont réels sur les charges lourdes en escalier.</li>
              </ul>

              <h2 className="text-2xl font-extrabold text-slate-900 mt-10 mb-4">Notre méthode pour les accès difficiles</h2>
              <p>Chez Déménagement du Vexin, nous avons rodé un protocole spécifique :</p>
              <ul className="space-y-4 my-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span><strong>Visite technique préalable :</strong> obligatoire pour valider le passage et les accès.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span><strong>Équipe renforcée :</strong> nous prévoyons plus de bras pour assurer des rotations et limiter la fatigue.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span><strong>Protection des parties communes :</strong> nous protégeons les sols et les angles morts de la cage d'escalier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span><strong>Monte-meubles sécurisé :</strong> si la configuration le permet, c'est notre priorité n°1.</span>
                </li>
              </ul>

              {/* CTA */}
              <div className="mt-20 p-10 bg-slate-900 text-white rounded-[2.5rem] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">
                  Accès difficile ? Nous avons la solution.
                </h3>
                <p className="text-slate-400 mb-8 font-light relative z-10">
                  Ne vous épuisez pas. Demandez votre devis gratuit avec une étude technique personnalisée par nos experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Obtenir un devis gratuit</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-700 hover:bg-white hover:text-slate-900" asChild>
                    <Link href="/services">Voir nos services</Link>
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* FOOTER SHARE */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
              <Button size="icon" variant="ghost" className="rounded-full hover:text-[#00ad9f]">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Link href="/blog" className="text-sm font-black text-slate-900 hover:text-[#00ad9f] transition-colors flex items-center gap-2">
              Lire d'autres articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
