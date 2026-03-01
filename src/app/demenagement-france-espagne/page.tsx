import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

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
  title: "Déménagement France → Espagne | Devis Gratuit & Sécurisé",
  description: "Déménageur expert sur l'axe France-Espagne. Liaisons régulières vers Madrid, Barcelone, Valence. Groupage et transfert d'entreprise. Devis sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-france-espagne",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Garcia", text: "Déménagement de Paris à Madrid réalisé avec une efficacité incroyable. L'équipe a géré le transport sur 1200 km avec un soin total. Nos meubles sont arrivés impeccables. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=GarciaES` },
  { id: "fallback-2", name: "Julie M.", text: "Service parfait pour mon installation à Barcelone. La formule groupage m'a permis de faire de vraies économies. Équipe ponctuelle et matériel de protection de haute qualité. Je recommande vivement.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulieES` },
  { id: "fallback-3", name: "Export-Solutions SL", text: "Le transfert de nos bureaux vers Valence a été orchestré de main de maître. Discrétion, respect des délais et maîtrise des enjeux internationaux. Des vrais pros du transfert transfrontalier.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=ExportES` },
];

const SPAIN_CITIES = [
  { name: "Madrid", desc: "La capitale et ses quartiers dynamiques (Salamanca, Chamberí...)" },
  { name: "Barcelone", desc: "Gestion experte des accès en zone dense et quartiers historiques." },
  { name: "Valence", desc: "Liaisons régulières vers le Levant espagnol." },
  { name: "Séville", desc: "Logistique dédiée vers le cœur de l'Andalousie." },
  { name: "Bilbao", desc: "Expertise des accès au Pays Basque espagnol." },
  { name: "Malaga", desc: "Service premium vers la Costa del Sol." },
  { name: "Alicante", desc: "Liaisons fréquentes vers la province d'Alicante." },
  { name: "Saragosse", desc: "Logistique optimisée via l'axe Aragonais." }
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons France-Espagne",
    description: "Nous assurons des navettes régulières entre l'Île-de-France et les grandes métropoles espagnoles via l'axe A10 / AP-7."
  },
  {
    icon: Sun,
    title: "Expertise Ibérique",
    description: "Nos équipes maîtrisent les spécificités d'accès locales et les réglementations de stationnement des grandes villes espagnoles."
  },
  {
    icon: Scale,
    title: "Groupage Économique",
    description: "Divisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients pour vos volumes entre 5 et 20m³."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Totale",
    description: "Votre patrimoine est couvert par une assurance Ad Valorem (valeur déclarée) incluse sur l'intégralité du trajet européen."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement vers l'Espagne ?", 
    answer: "Pour un trajet comme Paris-Barcelone (environ 1000 km), il faut compter entre 48h et 72h. Le premier jour est dédié au chargement très minutieux en France. Le transport s'effectue ensuite (dans le strict respect des temps de conduite réglementaires), suivi du déchargement et de l'installation complète à l'arrivée." 
  },
  { 
    question: "Comment fonctionne le groupage vers l'Espagne ?", 
    answer: "Le groupage est la solution idéale pour les volumes inférieurs à 15m³. Nous mutualisons le transport dans un grand camion avec d'autres clients allant dans la même direction (Catalogne, Andalousie...). Cela permet de partager les frais de route (péages très nombreux, carburant) et de vous offrir un tarif extrêmement avantageux." 
  },
  { 
    question: "Gérez-vous le stationnement à Madrid ou Barcelone ?", 
    answer: "Absolument. Les villes espagnoles sont très denses et la 'multa' (amende) peut vite arriver. Nous coordonnons avec nos partenaires locaux ou les services de voirie (Ayuntamiento) pour réserver les emplacements nécessaires et garantir que le camion puisse stationner au plus proche de votre adresse." 
  },
  { 
    question: "Quelles sont les formalités administratives ?", 
    answer: "Pour un déménagement au sein de l'Union Européenne (Espace Schengen), les formalités douanières sont simplifiées. Il nous faudra principalement établir ensemble un inventaire détaillé et vous demander vos justificatifs de changement de résidence (contrat de travail, NIE, bail) pour l'assurance et les éventuels contrôles routiers." 
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

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
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
            <Link href="/services" className="hover:text-white transition-colors">International</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Espagne</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Sun className="h-4 w-4" />
              Liaison Internationale France → Espagne
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                vers l'Espagne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap sur la péninsule ibérique en toute sérénité. De la France vers Madrid, Barcelone ou l'Andalousie, profitez d'une logistique rodée pour un déménagement international fluide.
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
                Une logistique sans frontières <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour votre nouveau départ</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer en Espagne est un projet de vie majeur, que ce soit pour le dynamisme économique de Madrid, l'effervescence culturelle de Barcelone ou la douceur de vivre méditerranéenne d'Alicante. Pour réussir cette transition, la maîtrise totale des liaisons longue distance européennes est impérative.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons fait de l'axe France-Espagne une véritable spécialité. Nous gérons aussi bien les accès très denses des grandes métropoles espagnoles que les livraisons complexes dans les zones résidentielles escarpées (Costa Blanca, Costa del Sol) ou les parcs d'activités tertiaires.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Timer className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Rapidité & Fiabilité</h3>
                   <p className="text-slate-500 font-light">Des départs réguliers chaque semaine pour garantir une flexibilité de vos dates d'emménagement.</p>
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
              L'excellence pour votre expatriation
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-Espagne parfaitement maîtrisée.
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
              Nous couvrons <span className="text-[#00ad9f]">toute l'Espagne.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De la Castille à l'Andalousie en passant par la Catalogne, nos camions assurent des liaisons régulières vers les plus grandes métropoles espagnoles.
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
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil international.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Particuliers</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet (mise en caisse), le déballage et la réinstallation de votre intérieur pour une transition immédiate sous le soleil.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Économique Européen</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Divisez vos frais de péages internationaux et de transport par deux en mutualisant le trajet avec d'autres clients vers Madrid ou Barcelone.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux (B2B)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique B2B experte : transfert de serveurs informatiques, d'archives sécurisées et de mobiliers professionnels entre la France et l'Espagne.</p>
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
      <TestimonialsSection reviews={fallbackTestimonials} />

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
                    Ne laissez pas les frontières ou les kilomètres compliquer votre projet. Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-5 w-5" />
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