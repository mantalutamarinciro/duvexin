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
  Gem,
  Package,
  ShieldCheck,
  GlassWater,
  Monitor,
  Lamp,
  Wine,
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
const ARTICLE_SLUG = "emballer-objets-fragiles-demenagement";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE =
  "Emballer des objets fragiles : le guide ultime (vaisselle, verres, miroirs, TV)";
const ARTICLE_DESCRIPTION =
  "Matériel, techniques pro et erreurs à éviter : apprenez à emballer vaisselle, verres, tableaux, miroirs et objets précieux pour éviter la casse pendant un déménagement.";

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
        url: placeholders["blog-fragile-hero"].url,
        width: 1920,
        height: 1080,
        alt: "Emballer les objets fragiles pour un déménagement sans casse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ARTICLE_TITLE,
    description: ARTICLE_DESCRIPTION,
    images: [placeholders["blog-fragile-hero"].url],
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
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
    author: { "@type": "Organization", name: "Déménagement du Vexin", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Déménagement du Vexin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime,
    image: [placeholders["blog-fragile-hero"].url],
    articleSection: "Emballage & protection",
    keywords: [
      "emballer objets fragiles déménagement",
      "emballer vaisselle déménagement",
      "emballer verres déménagement",
      "emballer miroir déménagement",
      "emballer tableau déménagement",
      "emballer TV déménagement",
      "papier bulle déménagement",
      "carton double cannelure",
    ],
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: "Emballer vos objets fragiles", item: CANONICAL_URL },
    ],
  };

  return [blogPosting, breadcrumb];
}

export default function ArticleFragilePacking() {
  const jsonLd = buildJsonLd();

  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* ✅ JSON-LD */}
      <Script
        id="jsonld-article-fragile-packing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-fragile-hero"].url}
            alt={placeholders["blog-fragile-hero"].alt}
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-fragile-hero"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
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
              Le guide ultime pour emballer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                vos objets fragiles.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Vaisselle, verres, miroirs, tableaux, TV… Avec les bons matériaux et une méthode simple,
              vous réduisez drastiquement le risque de casse. Voici les techniques de pros.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                8–10 min de lecture
              </span>
            </div>

            {/* ✅ Sommaire */}
            <nav className="mt-10">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs">
                {[
                  ["#materiel", "Matériel"],
                  ["#vaisselle", "Vaisselle"],
                  ["#verres", "Verres"],
                  ["#miroirs", "Miroirs & cadres"],
                  ["#tv", "TV & écrans"],
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
                “La hantise d’un déménagement : ouvrir un carton et retrouver sa vaisselle ou un miroir en morceaux.
                Pourtant, avec le bon calage et la bonne logique d’empilement, on peut viser… zéro casse.”
              </p>

              {/* --- Matériel --- */}
              <h2
                id="materiel"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Package className="h-5 w-5" />
                </span>
                Le matériel indispensable (et ce qu’il faut éviter)
              </h2>

              <p>
                Oubliez les journaux : ils tachent et protègent mal. Pour emballer du fragile correctement,
                vous avez besoin de matériaux propres, réguliers et résistants.
              </p>

              <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Papier blanc / papier de soie
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Papier bulle ou bullkraft
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Cartons double cannelure
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Adhésif de qualité + marqueur
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Intercalaires / croisillons (verres)
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Coins mousse / carton plié (cadres)
                </li>
              </ul>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2">Règle simple :</p>
                <p className="text-sm m-0">
                  Un carton de fragile doit être <strong>petit à moyen</strong> (pas trop lourd),
                  et <strong>plein</strong> (pas d’espace vide). Le vide = mouvement = casse.
                </p>
              </div>

              {/* --- Vaisselle --- */}
              <h2
                id="vaisselle"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <GlassWater className="h-5 w-5" />
                </span>
                Vaisselle : la règle d’or (assiettes à la verticale)
              </h2>

              <p>
                Contrairement à une idée reçue, <strong>les assiettes ne s’empilent pas à plat</strong>.
                Placez-les <strong>sur la tranche</strong>, comme dans un lave-vaisselle : elles résistent
                mieux aux chocs dans ce sens.
              </p>

              <ol className="space-y-4">
                <li>Tapissez le fond du carton avec une couche épaisse (papier froissé / bullkraft).</li>
                <li>Emballez chaque assiette individuellement (papier + éventuellement bulle).</li>
                <li>Rangez les assiettes <strong>debout</strong>, bien serrées, sans flottement.</li>
                <li>Comblez les vides (papier froissé, torchons, linge) : aucun bruit ne doit se faire entendre.</li>
              </ol>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image
                  src={placeholders["blog-glass-packing"].url}
                  alt={placeholders["blog-glass-packing"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-glass-packing"].hint}
                />
              </div>

              {/* --- Verres --- */}
              <h2
                id="verres"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                  <Wine className="h-5 w-5" />
                </span>
                Verres et verrerie : la méthode “cocon”
              </h2>

              <p>
                Le verre casse surtout par micro-chocs répétés. Objectif : éviter tout contact direct
                entre pièces, et empêcher le moindre mouvement.
              </p>

              <ul className="space-y-3">
                <li>Emballez chaque verre (papier + bulle) en insistant sur le pied et le bord.</li>
                <li>Si possible, utilisez un carton à croisillons / compartiments.</li>
                <li>Placez les verres bien serrés, puis comblez le haut du carton (calage).</li>
              </ul>

              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Règle pro :
                </p>
                <p className="text-sm m-0">
                  Un carton de verres ne doit <strong>jamais</strong> dépasser un poids “inconfortable”.
                  Mieux vaut 2 cartons légers qu’un seul trop lourd (risque de chute + écrasement).
                </p>
              </div>

              {/* --- Miroirs / tableaux --- */}
              <h2
                id="miroirs"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Gem className="h-5 w-5" />
                </span>
                Miroirs & tableaux : la méthode du “X” + transport debout
              </h2>

              <p>
                Pour un miroir ou un cadre sous verre, appliquez la méthode “X” pour limiter les vibrations
                et stabiliser le verre en cas de choc.
              </p>

              <ol className="space-y-4">
                <li>Posez un grand <strong>“X” en adhésif</strong> sur le verre (sans trop serrer).</li>
                <li>Protégez les <strong>angles</strong> (coins mousse ou carton plié).</li>
                <li>Enveloppez dans du <strong>bullkraft</strong> puis ajoutez une couche de carton si besoin.</li>
                <li>Transportez toujours <strong>debout sur la tranche</strong>, jamais à plat sous d’autres cartons.</li>
              </ol>

              {/* --- TV / écrans --- */}
              <h2
                id="tv"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Monitor className="h-5 w-5" />
                </span>
                TV, écrans et électronique : priorité aux chocs et à l’humidité
              </h2>

              <p>
                Pour une TV, le meilleur carton est… <strong>celui d’origine</strong>. Sinon, utilisez un carton TV
                adapté, avec protections d’angles. Évitez de poser un écran à plat.
              </p>

              <ul className="space-y-3">
                <li>Nettoyez et protégez l’écran (microfibre) + film/bulle sans pression.</li>
                <li>Bloquez la TV avec des cales (angles) pour qu’elle ne bouge pas.</li>
                <li>Transportez-la <strong>verticalement</strong> et indiquez “HAUT / FRAGILE”.</li>
              </ul>

              <div className="bg-slate-50 p-6 rounded-2xl my-8 border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Lamp className="h-5 w-5 text-slate-700" /> Bonus : lampes & abat-jour
                </p>
                <p className="text-sm m-0">
                  Retirez l’ampoule, protégez l’abat-jour avec du papier (pas de bulle qui le déforme),
                  et transportez les pieds séparément si possible.
                </p>
              </div>

              {/* --- Erreurs --- */}
              <h2
                id="erreurs"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-16 mb-6"
              >
                Les erreurs qui provoquent 80% des casses
              </h2>
              <ul className="space-y-3">
                <li>Laisser des vides dans le carton (ça bouge → ça casse).</li>
                <li>Faire des cartons trop lourds (chute, écrasement, mauvaise prise).</li>
                <li>Empiler du lourd au-dessus du fragile.</li>
                <li>Transporter miroirs / TV à plat.</li>
                <li>Étiquetage flou (pas de “Fragile”, pas de “Haut”).</li>
              </ul>

              <div className="bg-[#00ad9f]/5 p-8 rounded-[2rem] my-12 border-l-4 border-[#00ad9f]">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-[#00ad9f]" />
                  L’astuce “Secouez-moi”
                </h3>
                <p className="text-sm leading-relaxed m-0">
                  Fermez le carton et secouez-le très légèrement. Si vous entendez un frottement ou un mouvement,
                  il manque du calage. Un carton fragile ne doit pas “chanter”.
                </p>
              </div>

              {/* --- CTA Standard --- */}
              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                La sérénité totale : confier le fragile à des pros
              </h2>

              <p>
                Vous avez peur de mal faire ? C’est normal. Notre <strong>Formule Standard</strong> est pensée
                pour ça : emballage du fragile par nos équipes, techniques pro, caisses compartimentées,
                et assurance encadrée. Vos souvenirs sont protégés, de l’emballage à la livraison.
              </p>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-[#0f172a] text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Confiez le fragile à des pros.</h3>
                <p className="text-slate-400 mb-8 font-light relative z-10 max-w-xl mx-auto">
                  Matériel professionnel, méthodologie, assurance : dormez sur vos deux oreilles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Estimer ma formule Standard</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full h-12 px-8 border-slate-700 hover:bg-white hover:text-slate-900"
                    asChild
                  >
                    <Link href="/services">Voir tous nos services</Link>
                  </Button>
                </div>
                <div className="mt-6 text-sm text-slate-400 relative z-10">
                  À lire aussi :{" "}
                  <Link className="underline hover:text-white" href="/blog">
                    nos autres conseils déménagement
                  </Link>
                </div>
              </div>

              {/* --- FAQ --- */}
              <h2
                id="faq"
                className="scroll-mt-28 text-3xl font-extrabold text-slate-900 mt-20 mb-6"
              >
                FAQ — Emballage des objets fragiles
              </h2>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Faut-il mettre les assiettes à plat ou à la verticale ?
              </h3>
              <p>
                À la verticale, sur la tranche : c’est plus résistant aux chocs, à condition qu’elles soient bien calées.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Quel est le meilleur carton pour les verres ?
              </h3>
              <p>
                Un carton à croisillons/compartiments. Sinon, carton double cannelure + emballage individuel + calage parfait.
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">
                Comment transporter un miroir ou un tableau sous verre ?
              </h3>
              <p>
                “X” d’adhésif sur le verre, angles protégés, bullkraft, et transport <strong>debout</strong> sur la tranche.
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full hover:text-[#00ad9f]">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Link
              href="/blog"
              className="text-sm font-black text-slate-900 hover:text-[#00ad9f] transition-colors flex items-center gap-2"
            >
              Lire d&apos;autres articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}