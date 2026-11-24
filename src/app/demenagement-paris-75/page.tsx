import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VerifiedTestimonialsSection } from "@/components/testimonials-section";

// Icons
import { 
  CheckCircle2, 
  Calculator,
  Truck, 
  Building2, 
  ArrowRight, 
  ChevronRight, 
  MoveUp,
  Landmark,
  FileText,
  Building
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménageur à Paris (75) | Accès, stationnement et devis",
  description: "Préparez votre déménagement à Paris : étage, ascenseur, portage, stationnement et éventuel monte-meubles. Demandez un devis personnalisé.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-paris-75",
  }
};


const PARIS_QUARTIERS = [
  { name: "Le Marais (3e, 4e)", id: "marais", description: "Rues étroites, cours intérieures et conditions de stationnement à préciser." },
  { name: "Montmartre (18e)", id: "montmartre", description: "Pente, escaliers et distance de portage à évaluer avant le devis." },
  { name: "Saint-Germain (6e)", id: "saint-germain", description: "Immeubles anciens, parties communes et accès du mobilier à vérifier." },
  { name: "Passy & Auteuil (16e)", id: "passy", description: "Volume, ascenseur et protection des parties communes à anticiper." },
  { name: "Batignolles (17e)", id: "batignolles", description: "Circulation, stationnement et accès à décrire aux deux adresses." },
  { name: "QCA / Opéra (8e, 9e)", id: "opera", description: "Calendrier, accès et contraintes d’activité à préciser pour un transfert professionnel." }
];

const WHY_CHOOSE_US = [
  {
    icon: Truck,
    title: "Accès parisiens",
    description: "Rues étroites, cours intérieures, sens uniques et portage sont étudiés avant de définir les moyens."
  },
  {
    icon: FileText,
    title: "Stationnement anticipé",
    description: "Les démarches nécessaires et leur répartition sont précisées selon les adresses et la formule retenue."
  },
  {
    icon: MoveUp,
    title: "Levage si nécessaire",
    description: "La possibilité d’un monte-meubles dépend de l’étage, de la façade, du mobilier et du stationnement."
  },
  {
    icon: Calculator,
    title: "Devis détaillé",
    description: "Volume, accès, trajet, formule et moyens techniques éventuels sont intégrés à la proposition."
  }
];

const FAQS = [
  { 
    question: "Comment réservez-vous le stationnement à Paris ?", 
    answer: "Selon les adresses de départ et d'arrivée, une autorisation d'occupation du domaine public peut être nécessaire. Nous vous aidons à anticiper cette démarche selon les délais et les règles indiqués par la Ville de Paris."
  },
  { 
    question: "Le monte-meubles est-il obligatoire pour un 4ème étage ?", 
    answer: "Un monte-meubles peut être recommandé lorsque l'ascenseur est absent, trop étroit ou inadapté au mobilier. Sa pertinence dépend de la façade, de l'étage, du stationnement et des autorisations nécessaires."
  },
  { 
    question: "Déménagez-vous les pianos et objets d'art ?", 
    answer: "Signalez dès l’inventaire la nature, les dimensions, le poids et la valeur des objets concernés. La faisabilité, les moyens de manutention, les protections et les conditions contractuelles sont alors précisés dans la proposition."
  },
  { 
    question: "Quels sont vos délais pour un devis à Paris ?", 
    answer: "Nous organisons une visite technique à domicile ou en visioconférence selon les besoins du projet. Le devis détaille ensuite les prestations, les accès et les éventuels moyens techniques."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
      { "@type": "ListItem", position: 2, name: "Zones d’intervention", item: "https://demenagementduvexin.fr/zones-intervention" },
      { "@type": "ListItem", position: 3, name: "Déménagement Paris (75)", item: "https://demenagementduvexin.fr/demenagement-paris-75" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Secteurs parisiens et contraintes de déménagement",
    numberOfItems: PARIS_QUARTIERS.length,
    itemListElement: PARIS_QUARTIERS.map((quartier, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: quartier.name,
      description: quartier.description,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];

export default function ParisPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="paris-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une logistique complexe en hyper-centre parisien"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Île-de-France (75)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Paris</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Landmark className="h-4 w-4" />
              Déménagement à Paris (75)
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Paris, préparé en détail.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Étages, ascenseur, portage, stationnement et mobilier encombrant : décrivez les contraintes des deux adresses pour obtenir un devis adapté.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Demander mon devis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Anticiper les contraintes <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">de l’adresse parisienne</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  À Paris, une rue étroite, un immeuble sans ascenseur ou un stationnement éloigné peuvent modifier la manutention nécessaire. Les parties communes et le passage du mobilier doivent aussi être vérifiés.
                </p>
                <p>
                  Pour préparer le projet, indiquez les étages, les dimensions de l’ascenseur, la distance de portage et les possibilités de stationnement au départ comme à l’arrivée. Ces informations déterminent les moyens à prévoir.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <FileText className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Stationnement à clarifier</h3>
                   <p className="text-slate-500 font-light">Le devis précise les démarches prévues et les informations à fournir pour chaque adresse.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-paris.webp"
                  alt="Équipe de déménagement professionnelle en pleine intervention à Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-paris" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Les points vérifiés avant le devis
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une description précise des accès permet de prévoir les moyens réellement utiles au déménagement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_CHOOSE_US.map((item, index) => (
              <div key={index} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <item.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ARRONDISSEMENTS GRID (Siloing Style) --- */}
      <section id="arrondissements-paris" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Contraintes fréquentes selon les <span className="text-[#00ad9f]">secteurs parisiens.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Ces exemples aident à identifier les informations utiles. La faisabilité reste étudiée à partir des deux adresses exactes et de leurs accès.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARIS_QUARTIERS.map((quartier) => (
              <div 
                key={quartier.id} 
                className="group flex flex-col justify-center bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white/10 rounded-xl text-[#00ad9f] group-hover:bg-[#00ad9f] group-hover:text-white transition-colors">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-100 group-hover:text-white">{quartier.name}</h4>
                </div>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{quartier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES RÉSUMÉ & MONTE-MEUBLES --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Protection du mobilier et utilisation de monte-meubles à Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des moyens techniques <br/> <span className="text-[#00ad9f]">choisis selon les accès.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Immeubles anciens</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Escalier, ascenseur, cour et parties communes sont décrits pour prévoir le passage et la protection du mobilier.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><MoveUp className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Monte-meubles éventuel</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Son utilisation dépend du mobilier, de la façade, de l’étage, du recul disponible et des conditions de stationnement.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Pro & Bureaux</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Le calendrier, les accès, le mobilier, les archives et les contraintes d’activité sont recensés avant la proposition.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/demenagement-objets-lourds">Découvrir nos solutions de manutention et de levage</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <VerifiedTestimonialsSection />

      {/* --- FAQ --- */}
      <section id="faq-paris" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Les réponses utiles pour préparer un déménagement à Paris.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base font-light leading-relaxed px-4 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      départ de Paris ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Décrivez les deux adresses, les étages, l’ascenseur, le stationnement, le volume estimé et la date souhaitée pour obtenir une proposition personnalisée.
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
