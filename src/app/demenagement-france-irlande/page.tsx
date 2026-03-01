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
  Ship,
  FileText,
  BadgeCheck,
  Gem,
  Waves,
  Map as MapIcon
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement France → Irlande | Devis Gratuit & Sécurisé",
  description: "Déménageur expert sur l'axe France-Irlande. Liaisons régulières vers Dublin, Cork, Galway. Traversée ferry sécurisée et groupage. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-france-irlande",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille O'Sullivan", text: "Déménagement de Versailles vers Dublin (Dun Laoghaire) réalisé avec une efficacité remarquable. L'équipe a parfaitement géré la traversée en ferry et le déchargement. Un grand professionnalisme sur 1200 km.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=OSullivanIE` },
  { id: "fallback-2", name: "Pierre-Yves L.", text: "Très bonne expérience pour mon installation à Cork. Le devis était clair et l'option groupage m'a permis de faire de vraies économies sur le trajet maritime. Équipe ponctuelle et matériel de qualité. Je recommande !", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=PYLIE` },
  { id: "fallback-3", name: "IT-Global Dublin", text: "Le transfert de nos bureaux de Paris vers le quartier des Silicon Docks a été mené avec une rigueur totale. Des experts de la logistique internationale capables de gérer des contraintes de planning serrées.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=ITGlobalIE` },
];

const IRELAND_CITIES = [
  { name: "Dublin", desc: "La capitale et ses quartiers dynamiques (Silicon Docks, Rathmines, Howth...)" },
  { name: "Cork", desc: "Gestion logistique du pôle économique et portuaire du Sud." },
  { name: "Galway", desc: "Expertise des accès historiques sur la côte Ouest." },
  { name: "Limerick", desc: "Liaisons régulières vers le cœur économique de l'Irlande." },
  { name: "Waterford", desc: "Service premium vers la plus ancienne cité d'Irlande." },
  { name: "Drogheda", desc: "Logistique dédiée vers le Nord industriel de Dublin." },
  { name: "Kilkenny", desc: "Soin particulier pour le patrimoine et les ruelles historiques." },
  { name: "Sligo", desc: "Accompagnement logistique vers le Nord-Ouest sauvage." }
];

const WHY_US_ITEMS = [
  {
    icon: Ship,
    title: "Maîtrise Transmanche",
    description: "Nous gérons l'intégralité des réservations Ferry (Cherbourg-Rosslare/Dublin) pour un trajet direct, sécurisé et sans attente."
  },
  {
    icon: Globe,
    title: "Expertise Insulaire",
    description: "Nos chauffeurs sont habitués aux contraintes des routes irlandaises et aux accès spécifiques des villes de l'île d'Émeraude."
  },
  {
    icon: Scale,
    title: "Groupage Régulier",
    description: "Divisez vos frais de transport maritime par deux en mutualisant le trajet avec d'autres clients pour vos volumes réduits (< 15m³)."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Totale",
    description: "Votre patrimoine est couvert par une assurance Ad Valorem (valeur déclarée) incluse sur l'intégralité du trajet (route + mer)."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement France-Irlande ?", 
    answer: "Il faut prévoir environ 48h à 72h. Le premier jour est dédié au chargement en France et au trajet vers le port d'embarquement (généralement Cherbourg ou Roscoff). La traversée maritime dure environ 17h. Le second ou troisième jour est consacré au transport sur le sol irlandais, au déchargement et à l'installation finale." 
  },
  { 
    question: "L'Irlande est-elle impactée par le Brexit pour les déménagements ?", 
    answer: "Non, la République d'Irlande fait pleinement partie de l'Union Européenne (Espace Schengen). Les formalités douanières restent donc extrêmement simplifiées par rapport au Royaume-Uni. Nous privilégions d'ailleurs les lignes maritimes directes France-Irlande par ferry pour éviter les transit via l'Angleterre et vous épargner toute complexité administrative." 
  },
  { 
    question: "Gérez-vous le stationnement à Dublin ou dans les grandes villes ?", 
    answer: "Oui, les municipalités irlandaises ont des règles strictes. Nous nous coordonnons avec les autorités locales ou des partenaires sur place pour obtenir les permis de stationnement nécessaires, particulièrement vitaux dans les quartiers résidentiels denses comme Dublin 2, Dublin 4 ou le centre de Cork." 
  },
  { 
    question: "Comment sont protégés mes meubles pendant la traversée en mer ?", 
    answer: "Les traversées par la mer d'Irlande ou la mer Celtique peuvent parfois être agitées. Nous utilisons des techniques d'arrimage très spécifiques au transport maritime : vos meubles sont emballés sous couvertures de fort grammage et le chargement est solidement bloqué par des sangles et des barres de maintien logistiques pour éviter tout mouvement lié au roulis du navire." 
  }
];

export default function IrelandPage() {
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
          alt="Déménageur professionnel préparant une logistique internationale maritime"
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
            <span className="text-[#00ad9f]">France - Irlande</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Irlande
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                vers l'île d'Émeraude.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap sur l'Irlande en toute sérénité. De la France vers Dublin, Cork ou Galway, profitez d'une logistique intermodale rodée pour un déménagement international fluide et sécurisé.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis Irlande <ArrowRight className="ml-2 h-5 w-5" />
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
                Franchir la mer <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">avec un expert du maritime</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer en Irlande est un projet de vie exaltant qui demande une maîtrise parfaite de la logistique intermodale. Le transport routier à travers la France, couplé à la longue traversée en ferry, impose une rigueur absolue dans l'arrimage et la protection de vos biens.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous sommes des spécialistes reconnus de la liaison France-Irlande. Nous gérons pour vous l'intégralité du processus : de l'emballage répondant aux plus hauts standards internationaux, jusqu'à la gestion administrative de la traversée et du stationnement complexe dans les quartiers urbains denses de Dublin ou Cork.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Waves className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Logistique Maritime</h3>
                   <p className="text-slate-500 font-light">Arrimage spécifique pour les navires et protection renforcée contre le climat insulaire.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-france-irlande.webp"
                  alt="Déménagement international maritime vers l'Irlande"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-ie" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence au-delà des mers
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-Irlande parfaitement sécurisée.
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
      <section id="cities-ie" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">toute l'Irlande.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De la côte Est urbanisée à la côte Ouest sauvage, nos camions assurent des liaisons régulières vers toutes les grandes villes irlandaises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {IRELAND_CITIES.map((city) => (
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
                  alt="Déménageur protégeant du mobilier pour une exportation vers l'Irlande"
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
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet (mise en caisse maritime), la gestion du ferry et la réinstallation minutieuse de votre intérieur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Économique & Malin</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Optimisez considérablement vos frais de transport maritime en mutualisant le trajet avec d'autres clients vers les grandes métropoles irlandaises.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels & B2B</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique experte dédiée aux entreprises : transfert d'infrastructures informatiques, d'archives et de mobiliers de bureau entre la France et l'Irlande.</p>
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
      <section id="faq-ie" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie en Irlande.</p>
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
                      départ pour l'Irlande ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique maritime compliquer votre projet d'expatriation. Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme sous 24h.
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