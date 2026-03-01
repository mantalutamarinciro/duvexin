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
    <article className="bg-white min-h-screen pb-20">
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
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-xs uppercase tracking-widest text-[#00ad9f] mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au Blog
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
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] p-10 md:p-16">
            <CardContent className="p-0 prose prose-lg max-w-none">

              <p className="text-xl text-slate-600 italic border-l-4 border-[#00ad9f] pl-6">
                Un 4ème ou 5ème étage sans ascenseur peut transformer un déménagement classique en véritable défi physique. Pourtant, avec la bonne organisation et les bonnes techniques, tout devient fluide.
              </p>

              <h2>Les vrais défis d’un déménagement en étage</h2>
              <ul>
                <li>Fatigue physique importante</li>
                <li>Risque de blessure</li>
                <li>Détérioration des murs et escaliers</li>
                <li>Temps multiplié par 2 ou 3</li>
              </ul>

              <h2>Quand faut-il louer un monte-meubles ?</h2>
              <p>
                À partir du 3ème étage avec un volume important ou des meubles lourds (canapé, frigo américain, armoire massive), le monte-meubles devient souvent indispensable.
              </p>

              <div className="bg-[#00ad9f]/5 p-6 rounded-xl border-l-4 border-[#00ad9f]">
                <p className="font-bold flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Conseil expert :
                </p>
                <p className="text-sm">
                  Un monte-meubles réduit le temps de portage de 40 à 60 % et limite considérablement les risques.
                </p>
              </div>

              <h2>Comment est calculé le coût en étage ?</h2>
              <ul>
                <li>Nombre d’étages</li>
                <li>Largeur et configuration de l’escalier</li>
                <li>Distance camion → entrée</li>
                <li>Volume total en m³</li>
              </ul>

              <h2>Les erreurs à éviter absolument</h2>
              <ul>
                <li>Sous-estimer le temps nécessaire</li>
                <li>Ne pas réserver le stationnement</li>
                <li>Choisir une équipe non expérimentée</li>
              </ul>

              <h2>Notre méthode pour les accès difficiles</h2>
              <ul>
                <li>Visite technique préalable</li>
                <li>Équipe adaptée au volume</li>
                <li>Protection des parties communes</li>
                <li>Monte-meubles sécurisé si nécessaire</li>
              </ul>

              {/* CTA */}
              <div className="mt-16 p-10 bg-slate-900 text-white rounded-[2rem] text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Accès difficile ? Nous avons la solution.
                </h3>
                <p className="text-slate-400 mb-6">
                  Demandez votre devis gratuit avec étude technique personnalisée.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Obtenir un devis gratuit</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/services">Voir nos services</Link>
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* FOOTER SHARE */}
          <div className="mt-10 flex justify-between items-center">
            <Button size="icon" variant="ghost">
              <Share2 className="h-4 w-4" />
            </Button>
            <Link href="/blog" className="flex items-center gap-2 font-bold hover:text-[#00ad9f]">
              Lire d'autres articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}