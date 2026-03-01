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
  Smile,
  Heart,
  Home,
  MessageSquare,
  Baby,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

/**
 * ✅ SEO notes:
 * - Adapte SITE_URL + slug à ta vraie route.
 * - Idéal : image OG sur ton domaine.
 */
const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "demenager-avec-enfants-transition-douce";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "Déménager avec des enfants : conseils concrets pour une transition en douceur";
const ARTICLE_DESCRIPTION =
  "Annonce, routines, école, carton doudou, jour J : découvrez nos conseils pratiques et psychologiques pour déménager sereinement avec bébé, enfant ou ado.";

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
        url: placeholders["blog-kids-hero"].url,
        width: 1920,
        height: 1080,
        alt: "Déménager avec des enfants : une transition en douceur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [placeholders["blog-kids-hero"].url],
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
    image: [placeholders["blog-kids-hero"].url],
    articleSection: "Déménagement en famille",
    keywords: [
      "déménager avec des enfants",
      "déménagement bébé",
      "déménagement avec enfant",
      "déménagement ado",
      "changement d'école déménagement",
      "déménagement stress enfant",
      "carton doudou",
      "routines déménagement",
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
        name: "Déménager avec des enfants",
        item: CANONICAL_URL,
      },
    ],
  };

  return [blogPosting, breadcrumb];
}

export default function ArticleKidsMoving() {
  const jsonLd = buildJsonLd();

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* ✅ JSON-LD */}
      <Script
        id="jsonld-article-kids-moving"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-kids-hero"].url}
            alt={placeholders["blog-kids-hero"].alt}
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-kids-hero"].hint}
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
              Déménager avec des enfants : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                une transition en douceur.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Un déménagement peut bousculer les repères : chambre, école, habitudes, amis.
              Mais avec une bonne préparation, vous transformez ce changement en
              <strong> aventure familiale</strong> — et vous limitez le stress du jour J.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                8–9 min de lecture
              </span>
            </div>

            {/* ✅ Sommaire */}
            <nav className="mt-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  ["#communication", "Communication"],
                  ["#impliquer", "Les impliquer"],
                  ["#quartier", "Nouveau quartier"],
                  ["#routines", "Routines"],
                  ["#jour-j", "Jour J"],
                  ["#selon-age", "Selon l’âge"],
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
                “Pour un enfant, déménager, c’est perdre des repères : sa chambre, son trajet,
                parfois ses amis. Mais c’est aussi une opportunité de grandir. Voici nos clés
                pour transformer ce stress en transition positive.”
              </p>

              {/* --- 1 Communication --- */}
              <h2
                id="communication"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                  <MessageSquare className="h-5 w-5" />
                </span>
                La règle d’or : annoncer tôt et rassurer (sans mentir)
              </h2>

              <p>
                Ne cachez pas le déménagement. Dès que le projet est certain, expliquez-le
                avec des mots simples : <strong>où</strong> vous allez, <strong>quand</strong>,
                et ce qui restera identique (vos habitudes, vos moments ensemble, ses objets).
                L’enfant n’a pas besoin de “grands discours” : il a besoin de repères clairs.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">À éviter :</p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-red-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-1" />
                    Annoncer le départ au dernier moment.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-red-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-1" />
                    Dire “ne t’inquiète pas” sans écouter ses peurs.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-red-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-1" />
                    Promettre des choses incertaines (ex: “tu vas te faire des amis tout de suite”).
                  </li>
                </ul>
              </div>

              {/* --- Image 1 --- */}
              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-kids-packing"].url}
                  alt="Enfants participant à la préparation du déménagement"
                  fill
                  className="object-cover"
                  data-ai-hint="kids helping packing"
                />
              </div>

              {/* --- 2 Impliquer --- */}
              <h2
                id="impliquer"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Smile className="h-5 w-5" />
                </span>
                Impliquez-les : transformer l’angoisse en action
              </h2>

              <p>
                Donnez-leur un rôle adapté à leur âge : décorer des cartons, choisir une affiche
                pour la nouvelle chambre, trier les jouets à donner, ou créer un “plan” de leur
                futur espace. Participer = reprendre du contrôle.
              </p>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Astuce qui change tout : le “carton doudou” (ou sac J+1)
                </p>
                <p className="text-sm m-0">
                  Préparez un sac pour chaque enfant : doudou, pyjama, brosse à dents,
                  chargeur/tablette si besoin, un livre, 2–3 jouets clés. Il doit être
                  <strong> le dernier chargé</strong> et <strong>le premier ouvert</strong>.
                </p>
              </div>

              {/* --- 3 Quartier --- */}
              <h2
                id="quartier"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Home className="h-5 w-5" />
                </span>
                Visitez le futur quartier : rendre l’inconnu concret
              </h2>

              <p>
                Si possible, faites une “visite repères” : future école, parc, trajet,
                commerces, bibliothèque, terrain de sport. L’objectif : que l’enfant puisse
                imaginer un quotidien agréable. Transformez ça en jeu (chasse au trésor,
                photos des endroits favoris).
              </p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-new-home"].url}
                  alt="Découverte de la nouvelle maison en famille"
                  fill
                  className="object-cover"
                  data-ai-hint="family new house"
                />
              </div>

              {/* --- 4 Routines --- */}
              <h2
                id="routines"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Heart className="h-5 w-5" />
                </span>
                Maintenez les routines : le meilleur anti-stress
              </h2>

              <p>
                Les routines rassurent : horaires de repas, rituel du coucher, histoire du soir,
                temps calme. Même si tout change autour, garder le “cadre” aide l’enfant à
                se sentir en sécurité.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-400">
                  <Lightbulb className="h-6 w-6" />
                  Conseil DemDuVexin
                </h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed m-0">
                  Priorité à l’arrivée : remonter la chambre des enfants en premier (lit + veilleuse + doudou + rideaux).
                  Retrouver “son univers” dans un lieu inconnu calme immédiatement l’anxiété du premier soir.
                </p>
              </div>

              {/* --- 5 Jour J --- */}
              <h2
                id="jour-j"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Baby className="h-5 w-5" />
                </span>
                Le jour J : protéger les enfants de l’agitation
              </h2>

              <p>
                Le jour du déménagement est intense : bruits, passages, fatigue, stress logistique.
                Si vos enfants sont petits, l’idéal est de les confier à un proche quelques heures.
                Si ce n’est pas possible, créez une “zone refuge” : une pièce calme avec quelques jeux,
                le sac J+1, et un adulte référent.
              </p>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">Mini-checklist jour J (famille)</p>
                <ul className="list-none p-0 space-y-2 m-0">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f] shrink-0 mt-1" />
                    Sac J+1 enfants + parents (chargeurs, documents, eau, encas).
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f] shrink-0 mt-1" />
                    Veilleuse / doudou / pyjama accessibles.
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#00ad9f] shrink-0 mt-1" />
                    Plan simple : “où dormir / où manger / où se laver” dès l’arrivée.
                  </li>
                </ul>
              </div>

              {/* --- Selon l’âge --- */}
              <h2
                id="selon-age"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6"
              >
                Adapter selon l’âge : bébé, enfant, ado
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Avec un bébé (0–2 ans)</h3>
              <p>
                Priorité au rythme : siestes, repas, rituel du coucher. Gardez les objets
                familiers (turbulette, doudou, odeur) et évitez de “tout chambouler” la
                même semaine (nouveau lit + nouvelle nounou + nouvelle maison).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Avec un enfant (3–10 ans)</h3>
              <p>
                Il a besoin de comprendre et de participer. Donnez une mission simple,
                valorisez les émotions (“je comprends que tu sois triste”), et organisez
                un petit rituel d’au revoir (photo, dessin, “carnet de souvenirs”).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Avec un ado (11+)</h3>
              <p>
                L’enjeu, c’est souvent le lien social. Proposez-lui de co-construire certains
                choix (organisation de la chambre, bureau, déco) et facilitez la continuité
                (rester en contact avec ses amis, planifier une visite).
              </p>

              {/* --- FAQ --- */}
              <h2
                id="faq"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-20 mb-6"
              >
                FAQ — Déménager avec des enfants
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quand annoncer un déménagement à un enfant ?
              </h3>
              <p>
                Dès que le projet est certain. Plus l’enfant a du temps pour intégrer l’idée,
                plus la transition est simple.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Comment éviter une crise le jour du déménagement ?
              </h3>
              <p>
                Préparez un sac J+1, maintenez les routines, et évitez l’exposition à l’agitation
                (garde par un proche ou zone refuge).
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quelle est la priorité à l’arrivée ?
              </h3>
              <p>
                La chambre des enfants : lit, doudou, veilleuse, quelques repères. Ensuite, cuisine / salle de bain.
              </p>

              {/* --- CTA --- */}
              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Une famille sereine, un déménagement réussi.
                </h3>
                <p className="text-slate-500 mb-8 font-light max-w-xl mx-auto">
                  Besoin d’aide pour estimer le volume des chambres et de la salle de jeux ?
                  Utilisez notre outil — ou demandez un devis gratuit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/calculateur-volume">Estimer mon volume (m³)</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                    <Link href="/demande-devis">Obtenir un devis gratuit</Link>
                  </Button>
                </div>

                <div className="mt-6 text-sm text-slate-500">
                  À lire aussi :{" "}
                  <Link className="underline hover:text-slate-900" href="/blog">
                    d’autres conseils déménagement
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
              Lire d’autres conseils <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}