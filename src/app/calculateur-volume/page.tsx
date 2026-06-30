import type { Metadata } from "next";
import { Calculator, Sparkles } from "lucide-react";

import { roomCategories } from "@/lib/predefined-items";
import { VolumeCalculatorClient } from "@/components/volume-calculator-client";
import { getInventoryList } from "@/services/inventoryService";

// SEO
export const metadata: Metadata = {
  title: "Calculateur de volume déménagement (m³) | Gratuit",
  description:
    "Estimez le volume de votre déménagement pièce par pièce. Outil gratuit avec aide IA pour gagner du temps.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/calculateur-volume",
  },
};

export const dynamic = 'force-dynamic';

export default async function VolumeCalculatorPage() {
  const initialInventory = await getInventoryList();

  return (
    <main className="min-h-screen bg-white">
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
              vous aide à accélérer la saisie pour obtenir une estimation plus fiable.
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
                initialItems={initialInventory?.items || []}
              />
            </div>
          </div>

          {/* Optional bottom helper (kept minimal) */}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
            Astuce : une estimation précise du volume facilite le choix du camion et réduit les imprévus le jour J.
          </p>
        </div>
      </section>
    </main>
  );
}