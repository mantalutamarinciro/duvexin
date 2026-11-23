import type { Metadata } from "next";
import { Calculator, Sparkles } from "lucide-react";
import Link from "next/link";

import { roomCategories } from "@/lib/predefined-items";
import { VolumeCalculatorClient } from "@/components/volume-calculator-client";

// SEO
export const metadata: Metadata = {
  title: "Calculateur de volume déménagement (m³) | Gratuit",
  description:
    "Estimez gratuitement le volume de votre déménagement en m³, pièce par pièce. Ajoutez vos meubles et préparez les informations utiles à votre devis.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/calculateur-volume",
  },
};

const VOLUME_FAQS = [
  {
    question: "Comment calculer le volume d’un déménagement ?",
    answer: "Ajoutez chaque meuble, appareil et carton à l’inventaire, puis ajustez les quantités. Le calculateur additionne les volumes indicatifs pour produire une estimation en mètres cubes.",
  },
  {
    question: "L’estimation en m³ remplace-t-elle une visite technique ?",
    answer: "Non. Les dimensions réelles, le démontage, les objets atypiques et les accès peuvent modifier l’évaluation. L’inventaire sert à préparer le projet et doit être confirmé pour établir un devis.",
  },
  {
    question: "À quoi sert le volume estimé ?",
    answer: "Le volume aide à préparer les moyens de transport et la manutention. Il fait partie des informations examinées avec la distance, les accès, le stationnement et la formule demandée.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
      { "@type": "ListItem", position: 2, name: "Calculateur de volume", item: "https://demenagementduvexin.fr/calculateur-volume" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculateur de volume de déménagement",
    url: "https://demenagementduvexin.fr/calculateur-volume",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VOLUME_FAQS.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default async function VolumeCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* HERO */}
      <section className="relative border-b border-slate-100 bg-white pt-24 pb-14 sm:pt-28 sm:pb-16">
        {/* Subtle background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background:radial-gradient(600px_circle_at_50%_0%,rgba(59,130,246,0.55),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background:linear-gradient(to_bottom,rgba(15,23,42,0.06),transparent_30%)]"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
              <Calculator className="h-4 w-4 text-slate-600" />
              Calculateur gratuit • estimation en m³
            </div>

            {/* Title */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Calculez le volume de votre déménagement{" "}
              <span className="text-primary">en quelques minutes</span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Ajoutez vos meubles pièce par pièce, ou décrivez votre logement : notre assistant IA
              vous aide à accélérer la saisie. Le résultat reste indicatif jusqu’à la vérification de l’inventaire et des accès.
            </p>

            {/* Trust line */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Résultat clair
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Pièce par pièce
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                Aide IA optionnelle
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="container mx-auto px-4 md:px-6 py-10 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Soft card wrapper to look premium */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)]">
            {/* Card header */}
            <div className="flex flex-col gap-2 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">Votre estimation</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">
                  Ajoutez vos éléments, ajustez les quantités, puis exportez ou demandez un devis.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Assistant IA
                </span>
              </div>
            </div>

            {/* Client app */}
            <div className="p-4 sm:p-6">
              <VolumeCalculatorClient
                roomCategories={roomCategories}
              />
            </div>
          </div>

          {/* Optional bottom helper (kept minimal) */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Astuce : détaillez aussi les caves, garages, balcons et objets lourds. Ils peuvent modifier le volume et les moyens de manutention nécessaires.
          </p>
        </div>
      </section>

      <section aria-labelledby="volume-guide-title" className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Comprendre votre estimation</p>
              <h2 id="volume-guide-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Du volume estimé au devis de déménagement</h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Le cubage ne suffit pas à déterminer le coût d’un déménagement. La distance, les étages, l’ascenseur, le portage, le stationnement et les prestations choisies comptent également. Consultez notre <Link href="/tarif-demenagement" className="font-semibold text-primary underline underline-offset-4">guide sur le prix d’un déménagement</Link>, puis comparez les <Link href="/formules-de-demenagement" className="font-semibold text-primary underline underline-offset-4">formules de prestation</Link> avant de transmettre votre <Link href="/demande-devis" className="font-semibold text-primary underline underline-offset-4">demande de devis</Link>.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {VOLUME_FAQS.map(({ question, answer }) => (
                <article key={question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-bold leading-snug text-slate-900">{question}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
