import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { 
  ShieldCheck, 
  Euro, 
  ChevronRight, 
  LayoutGrid,
  CheckCircle2,
  Info,
  ArrowRight,
  Calculator,
  Truck,
  MapPin,
  Sparkles,
  Route
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Peut-on connaître le prix d'un déménagement uniquement avec la surface du logement ?",
    a: "La surface donne seulement un premier ordre de grandeur. Un devis fiable nécessite un inventaire du mobilier et des cartons, ainsi que les informations sur les deux adresses, les étages, les ascenseurs, le portage et les prestations souhaitées."
  },
  {
    q: "Le prix au m³ suffit-il pour comparer deux devis ?",
    a: "Non. Deux projets de même volume peuvent demander des moyens différents selon la distance, les accès, le stationnement, le démontage ou l'emballage. Comparez le périmètre détaillé de chaque proposition, pas seulement un prix ramené au m³."
  },
  {
    q: "Quels éléments transmettre pour obtenir un devis précis ?",
    a: "Préparez l'inventaire, les deux adresses, les dates envisagées, les étages, les ascenseurs, les distances de portage, les objets lourds et les tâches que vous souhaitez confier à l'équipe. Des photos peuvent aider à qualifier les accès."
  },
  {
    q: "Pourquoi le stationnement influence-t-il le coût ?",
    a: "Si le véhicule ne peut pas approcher de l'entrée, la manutention demande davantage de temps et de portage. Une réservation ou une autorisation peut aussi être nécessaire selon la commune et l'emplacement."
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a }
  }))
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
    { "@type": "ListItem", position: 2, name: "Prix d'un déménagement", item: "https://demenagementduvexin.fr/tarif-demenagement" }
  ]
};

export default function TarifsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="tarif-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <Script id="tarif-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <nav className="flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Tarifs & Devis</span>
            </nav>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Tarif déménagement : <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                Estimer son budget.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Comprenez comment est calculé le <strong>prix d'un déménagement professionnel</strong> et préparez les informations nécessaires pour comparer des devis portant sur le même service.
            </p>
          </div>
        </div>
      </section>

      {/* --- QUICK INDICATIONS --- */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 lg:-mt-20 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 group hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center text-[#00ad9f] mb-6">
              <Euro className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Volume inventorié</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Le volume influence le véhicule, la manutention et les fournitures, mais il ne suffit pas à déterminer seul le prix.
            </p>
          </Card>
          <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 group hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Distance et trajet</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              La distance, les péages, les temps de conduite et l'organisation du transport sont intégrés à l'étude.
            </p>
          </Card>
          <Card className="rounded-[2.5rem] border-none shadow-2xl bg-white p-8 group hover:-translate-y-1 transition-transform">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Conditions détaillées</h3>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Le devis doit préciser les prestations, les responsabilités, les conditions d'assurance et les éventuelles options.
            </p>
          </Card>
        </div>
      </section>

      {/* --- PRICING TABLE --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Préparer l’estimation du <span className="text-[#00ad9f]">volume</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Ces volumes sont des repères de préparation, pas des tarifs. Seul l’inventaire réel permet d’évaluer le projet.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none">
                  <TableHead className="font-bold text-slate-900 h-16 px-8">Type de logement</TableHead>
                  <TableHead className="font-bold text-slate-900">Volume estimé</TableHead>
                  <TableHead className="text-right font-bold text-slate-900 px-8 text-primary">À vérifier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { label: "Studio / Chambre", vol: "Souvent petit volume", price: "Cave, étage, ascenseur" },
                  { label: "Appartement T2 / T3", vol: "Inventaire nécessaire", price: "Accès et stationnement" },
                  { label: "Appartement T4 / T5", vol: "Mobilier à détailler", price: "Portage et démontage" },
                  { label: "Maison familiale", vol: "Dépendances à inclure", price: "Garage, jardin, objets lourds" },
                ].map((row, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                    <TableCell className="font-bold text-slate-700 py-6 px-8">{row.label}</TableCell>
                    <TableCell className="text-slate-500">{row.vol}</TableCell>
                    <TableCell className="text-right font-black text-slate-900 px-8">{row.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button size="lg" className="rounded-full bg-slate-900 h-12 px-8 font-bold text-white" asChild>
              <Link href="/calculateur-volume">
                <Calculator className="mr-2 h-4 w-4" /> Estimer mon volume
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- FACTORS SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Les 4 piliers du <br/> <span className="text-[#00ad9f]">coût final.</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Truck className="h-6 w-6 text-[#00ad9f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Le volume total (m³)</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Il contribue au choix du véhicule, à la préparation de la manutention et aux fournitures nécessaires.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Route className="h-6 w-6 text-[#00ad9f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">La distance (km)</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Inclut le carburant, les péages et le temps de trajet des équipes.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <LayoutGrid className="h-6 w-6 text-[#00ad9f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Les accès et étages</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">L'absence d'ascenseur ou un portage long augmente le temps de travail.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-[#00ad9f]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">La formule choisie</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">Du simple transport (Éco) au service tout-compris (Prestige).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-white rounded-[3rem] rotate-3 -z-10 shadow-xl" />
              <div className="relative bg-[#0f172a] rounded-[2.5rem] p-10 md:p-14 text-white overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 blur-3xl rounded-full" />
                <h3 className="text-2xl font-bold mb-8">Comment économiser ?</h3>
                <ul className="space-y-6">
                  {[
                    "Déménager en milieu de semaine ou de mois",
                    "Opter pour une formule 'Économique' et faire vos cartons",
                    "Faire un tri drastique avant l'estimation",
                    "Anticiper pour disposer de davantage de choix dans les dates"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0" />
                      <span className="text-slate-300 font-light leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <Button asChild variant="link" className="text-[#00ad9f] p-0 font-bold hover:no-underline">
                    <Link href="/blog/5-astuces-pour-un-demenagement-sans-stress">Lire nos conseils complets <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq-tarifs" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions sur les <span className="text-[#00ad9f]">prix</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Les informations à réunir avant de demander ou de comparer un devis.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base font-light leading-relaxed px-4 pb-6">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Votre devis personnalisé <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      après étude de votre demande.
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Transmettez votre inventaire, vos deux adresses et les prestations souhaitées pour recevoir une proposition adaptée à votre projet.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Demander mon devis <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
