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
  MapPin, 
  ShieldCheck, 
  Truck, 
  Users, 
  Globe, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  Sun,
  Map as MapIcon,
  FileText,
  Palmtree
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement France Espagne | Devis international",
  description: "Préparez votre déménagement entre la France et l'Espagne : volume, accès, inventaire, transport direct ou groupage. Demandez un devis personnalisé.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-france-espagne",
  }
};


const SPAIN_CITIES = [
  { name: "Madrid", desc: "La capitale et ses quartiers dynamiques (Salamanca, Chamberí...)" },
  { name: "Barcelone", desc: "Accès en zone dense et quartiers historiques à vérifier selon l'adresse." },
  { name: "Valence", desc: "Projet étudié selon l'adresse exacte, le volume et le calendrier." },
  { name: "Séville", desc: "Organisation à définir selon les accès et la distance jusqu'à l'adresse." },
  { name: "Bilbao", desc: "Accès au logement et stationnement vérifiés avant le départ." },
  { name: "Malaga", desc: "Transport longue distance dimensionné selon le volume à livrer." },
  { name: "Alicante", desc: "Solution dédiée ou mutualisée étudiée selon les contraintes du projet." },
  { name: "Saragosse", desc: "Planification personnalisée du chargement à la livraison." }
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons France-Espagne",
    description: "Le trajet et son calendrier sont étudiés selon les adresses, le volume et les contraintes de livraison."
  },
  {
    icon: Sun,
    title: "Accès aux deux adresses",
    description: "Étages, ascenseurs, portage et possibilités de stationnement sont vérifiés au départ comme à l'arrivée."
  },
  {
    icon: Scale,
    title: "Groupage Économique",
    description: "Le transport mutualisé peut être étudié lorsque le volume, la destination et les dates sont compatibles."
  },
  {
    icon: ShieldCheck,
    title: "Protection contractuelle",
    description: "L'inventaire et la déclaration de valeur permettent de cadrer contractuellement les biens confiés."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement vers l'Espagne ?", 
    answer: "Pour un trajet comme Paris-Barcelone, le calendrier dépend du volume, des accès et des temps de conduite réglementaires. Le devis précise les dates prévues ainsi que les prestations à l'arrivée."
  },
  { 
    question: "Comment fonctionne le groupage vers l'Espagne ?", 
    answer: "Le groupage peut être étudié lorsque le volume, la destination et les dates sont compatibles avec une tournée mutualisée. Une livraison dédiée reste préférable lorsqu'un calendrier précis ou un volume important l'exige."
  },
  { 
    question: "Gérez-vous le stationnement à Madrid ou Barcelone ?", 
    answer: "Les étages, l'ascenseur, la largeur des voies, la distance de portage et les règles de stationnement doivent être vérifiés aux deux adresses. Ces informations servent à étudier le véhicule et les moyens de manutention adaptés."
  },
  { 
    question: "Quelles sont les formalités administratives ?", 
    answer: "Un inventaire détaillé et une déclaration de valeur sont généralement utiles à la préparation du transport. Les justificatifs et démarches complémentaires dépendent de votre situation, des biens transportés et des exigences applicables aux adresses concernées."
  }
];

export default function SpainPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Déménagement France Espagne",
    serviceType: "Déménagement international entre la France et l'Espagne",
    url: "https://demenagementduvexin.fr/demenagement-france-espagne",
    provider: {
      "@type": "MovingCompany",
      name: "Déménagement du Vexin",
      url: "https://demenagementduvexin.fr",
    },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Espagne" },
    ],
  };

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une logistique internationale vers la péninsule ibérique"
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
            <Link href="/demenagement-international" className="hover:text-white transition-colors">Déménagement international</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Espagne</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Sun className="h-4 w-4" />
              Liaison Internationale France → Espagne
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                France–Espagne
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Préparez votre départ ou votre retour avec une étude précise du volume, des accès aux deux adresses et de la solution de transport adaptée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis Espagne <ArrowRight className="ml-2 h-5 w-5" />
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
                Bien cadrer chaque étape <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">entre la France et l'Espagne</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Une longue distance ne se résume pas au nombre de kilomètres. Le volume réel, les accès au logement, les règles de stationnement et les dates souhaitées déterminent l'organisation du transport.
                </p>
                <p>
                  L'étude commence par les deux adresses et l'inventaire des biens. Elle permet de comparer une prestation dédiée avec une solution de groupage lorsqu'elle est compatible avec le projet, sans arrêter un calendrier avant vérification.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Timer className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Un devis lisible</h3>
                   <p className="text-slate-500 font-light">Les prestations, les options et les contraintes identifiées sont précisées avant validation.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-france-espagne.webp"
                  alt="Logistique de déménagement international longue distance vers la péninsule ibérique"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-es" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Les points qui structurent votre devis
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une préparation fondée sur le volume, les accès, le calendrier et le niveau de prestation souhaité.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
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

      {/* --- CITIES GRID --- */}
      <section id="cities-es" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Préparer votre arrivée <span className="text-[#00ad9f]">selon la destination.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Chaque projet est étudié à partir de l'adresse exacte plutôt qu'à partir d'une promesse générique par ville.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SPAIN_CITIES.map((city) => (
              <div 
                key={city.name} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm cursor-default"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors mb-2 text-lg">{city.name}</span>
                <span className="text-sm text-slate-400 font-light group-hover:text-slate-300 transition-colors leading-relaxed">{city.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur protégeant du mobilier pour une exportation internationale vers l'Espagne"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une prestation adaptée <br/> <span className="text-[#00ad9f]">à votre projet international.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Particuliers</h4>
                    <p className="text-slate-500 font-light leading-relaxed">L'emballage, le démontage, le remontage et la protection spécifique peuvent être intégrés selon la formule retenue.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Économique Européen</h4>
                    <p className="text-slate-500 font-light leading-relaxed">La mutualisation peut être étudiée selon le volume, la destination et la compatibilité des dates de chargement et de livraison.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux (B2B)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Le transfert de mobilier, d'archives ou d'équipements est défini selon l'inventaire, les accès et les contraintes de continuité propres à l'entreprise.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Comparer toutes nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <VerifiedTestimonialsSection />

      {/* --- FAQ --- */}
      <section id="faq-es" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour préparer votre installation sereine vers l'Espagne.</p>
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
                      départ pour l'Espagne ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Indiquez vos adresses, votre volume estimé et vos contraintes de dates pour recevoir une proposition adaptée après étude.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Demander mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
