import type { Metadata } from "next";
import { Calculator, Box } from "lucide-react";

import { roomCategories } from "@/lib/predefined-items";
import { VolumeCalculatorClient } from "@/components/volume-calculator-client";
import { getInventoryList } from "@/services/inventoryService";

// SEO
export const metadata: Metadata = {
  title: "Calculateur de Volume Déménagement en m³ | Outil Gratuit",
  description: "Estimez précisément le volume de votre déménagement pièce par pièce. Outil gratuit avec assistant IA.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/calculateur-volume",
  }
};

export default async function VolumeCalculatorPage() {
  const initialInventory = await getInventoryList();

  return (
    <div className="min-h-screen bg-slate-50/50">
      
      {/* --- HEADER HERO --- */}
      <section className="relative overflow-hidden bg-[#0b0f19] pt-20 pb-20 lg:pt-28 lg:pb-24 text-center text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" aria-hidden="true" />
        
        <div className="container relative z-10 px-4 mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur-sm mb-6">
            <Calculator className="h-4 w-4" />
            Outil en ligne gratuit
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6 max-w-3xl">
             Calculez le volume de <br className="hidden sm:block" />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
               votre déménagement.
             </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
            Une estimation précise est la clé d'un devis juste. 
            Ajoutez vos meubles, ou laissez notre IA analyser votre texte.
          </p>
        </div>
      </section>

      {/* --- LE CALCULATEUR --- */}
      <section className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <VolumeCalculatorClient 
          roomCategories={roomCategories} 
          initialItems={initialInventory?.items || []}
        />
      </section>
      
    </div>
  );
}
