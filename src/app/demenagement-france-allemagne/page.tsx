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
  FileText,
  BadgeCheck,
  Building,
  Languages,
  Map as MapIcon
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement France → Allemagne | Devis Gratuit & Sécurisé",
  description: "Déménageur expert sur l'axe France-Allemagne. Liaisons hebdomadaires vers Berlin, Munich, Francfort. Groupage et transfert d'entreprise. Devis sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-france-allemagne",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Schmidt", text: "Déménagement de Paris vers Berlin parfaitement orchestré. L'équipe a été d'une ponctualité exemplaire et a géré tout le transport de nos meubles fragiles avec un soin incroyable sur 1000 km. Un service d'élite.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=SchmidtDE` },
  { id: "fallback-2", name: "Marc-Antoine H.", text: "Très bonne expérience pour mon installation à Munich. Le devis était clair et l'option groupage m'a permis de faire de vraies économies sur le trajet. Équipe efficace et parlant anglais, ce qui a facilité le déchargement sur place.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=MAHDE` },
  { id: "fallback-3", name: "Logistique-Tech GmbH", text: "Le transfert de nos bureaux vers Francfort a été mené avec une rigueur et une discrétion totales. Des experts de la logistique internationale capables de gérer des volumes industriels.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=LogitechDE` },
];

const GERMANY_CITIES = [
  { name: "Berlin", desc: "La capitale fédérale et ses quartiers dynamiques (Mitte, Charlottenburg...)" },
  { name: "Munich (München)", desc: "Gestion logistique du pôle bavarois et technologique." },
  { name: "Hambourg (Hamburg)", desc: "Expertise des accès portuaires et du Nord de l'Allemagne." },
  { name: "Francfort (Frankfurt)", desc: "Service premium pour le centre financier et bancaire." },
  { name: "Cologne (Köln)", desc: "Liaisons rapides et directes via l'axe rhénan." },
  { name: "Stuttgart", desc: "Accompagnement pour les transferts vers le pôle industriel automobile." },
  { name: "Düsseldorf", desc: "Soin particulier et logistique pour le pôle mode et design." },
  { name: "Leipzig", desc: "Logistique dédiée à la Saxe en plein essor économique." }
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons France-Allemagne",
    description: "Nous assurons des navettes régulières et fluides entre l'Île-de-France et les grandes métropoles allemandes via l'A4 / A5."
  },
  {
    icon: Languages,
    title: "Accompagnement Interculturel",
    description: "Nos équipes maîtrisent les codes locaux et les réglementations de stationnement spécifiques à chaque Land allemand."
  },
  {
    icon: Scale,
    title: "Groupage Économique",
    description: "Optimisez considérablement votre budget en mutualisant le transport avec d'autres clients pour vos volumes entre 5 et 20m³."
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & Assurance",
    description: "Une protection totale via notre assurance Ad Valorem (valeur déclarée) incluse pour vos biens sur tout le trajet européen."
  }
];

const FAQS = [
  { 
    question: "Combien de temps faut-il prévoir pour un déménagement vers l'Allemagne ?", 
    answer: "Pour un trajet comme Paris-Berlin (environ 1050 km), il faut compter entre 48h et 72h. Le premier jour est dédié au chargement soigneux en France et au début du transit. Le second jour est consacré au transport final et à la livraison, garantissant ainsi le respect strict des temps de repos de nos conducteurs et la sécurité de vos biens." 
  },
  { 
    question: "Gérez-vous le stationnement à Berlin ou Munich ?", 
    answer: "Absolument. Les grandes villes allemandes sont très strictes sur le 'Halteverbot' (l'interdiction de stationner). Nous nous chargeons de commander et de faire poser les panneaux de signalisation officiels par les autorités locales au moins 72h avant l'intervention pour garantir un emplacement réservé au camion." 
  },
  { 
    question: "Proposez-vous des services pour les transferts de bureaux B2B ?", 
    answer: "Oui, nous accompagnons de nombreuses entreprises pour des transferts de sièges sociaux, de bureaux et de matériel informatique lourd entre la France et l'Allemagne. Nous établissons une planification millimétrée, souvent réalisée le week-end, pour éviter toute perte d'exploitation." 
  },
  { 
    question: "Quelles sont les formalités administratives ?", 
    answer: "En tant qu'échange au sein de l'Espace Schengen (Union Européenne), les formalités douanières sont grandement simplifiées. Il nous faudra principalement établir ensemble un inventaire détaillé et vous demander vos justificatifs de changement de domicile pour l'assurance et les éventuels contrôles routiers." 
  }
];

export default function GermanyPage() {
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
          alt="Déménageur professionnel préparant une logistique internationale vers l'Europe"
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
            <span className="text-[#00ad9f]">France - Allemagne</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Allemagne
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                outre-Rhin.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap vers l'Allemagne en toute sérénité. De la France vers Berlin, Munich, Hambourg ou la Ruhr, profitez d'une logistique rodée et d'un service premium.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis Allemagne <ArrowRight className="ml-2 h-5 w-5" />
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
                L'expertise d'un axe <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">européen stratégique</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer en Allemagne est un projet de vie (ou d'entreprise) ambitieux qui demande une maîtrise absolument parfaite de la logistique longue distance. Que vous rejoigniez le formidable dynamisme de la capitale berlinoise, la puissance industrielle de Stuttgart ou le grand pôle financier de Francfort, votre déménagement doit être géré avec une rigueur absolue.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous sommes des spécialistes reconnus de la liaison France-Allemagne. Nous gérons pour vous l'intégralité du processus : de l'emballage aux standards internationaux (caisses d'export) à la gestion très stricte du stationnement ("Halteverbot") dans les quartiers denses des grandes métropoles allemandes.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Timer className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Ponctualité & Rigueur</h3>
                   <p className="text-slate-500 font-light">Des départs très réguliers pour une flexibilité totale de votre calendrier d'expatriation.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-france-allemagne.webp"
                  alt="Logistique de déménagement international vers l'Allemagne"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-de" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence pour votre mobilité
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation rigoureuse et normée pour une liaison transfrontalière parfaitement maîtrisée.
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
      <section id="cities-de" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">toute l'Allemagne.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De Berlin aux rives du Rhin en passant par la Bavière, nos camions interviennent de manière hebdomadaire sur tout le territoire allemand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GERMANY_CITIES.map((city) => (
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
                  alt="Déménageur protégeant du mobilier pour une exportation internationale"
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
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Institutionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium ("gants blancs") incluant l'emballage complet, le déballage et la réinstallation de votre intérieur pour une transition immédiate et sereine vers Berlin ou Munich.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Malin Européen</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Divisez vos frais de transport et de péage par deux en mutualisant le trajet avec d'autres clients allant vers les mêmes grandes métropoles allemandes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts B2B & Bureaux</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique B2B experte : transfert de votre infrastructure informatique, de vos archives et de vos mobiliers de bureau de la France vers l'Allemagne.</p>
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
      <section id="faq-de" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation sereine vers l'Allemagne.</p>
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
                      départ pour l'Allemagne ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez nos experts internationaux pour une étude personnalisée de vos volumes et recevez un devis ferme et gratuit sous 24h.
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