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
  Gem,
  Waves,
  Building,
  ShieldAlert,
  Navigation
} from "lucide-react";

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille de Saint-Albin", text: "Déménagement de Neuilly vers Monaco parfaitement orchestré. L'équipe a géré l'accès complexe à la tour avec une discrétion et une efficacité remarquables. Un service à la hauteur du prestige de la Principauté.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=StAlbin` },
  { id: "fallback-2", name: "Jean-Christophe M.", text: "Excellente prestation pour mon installation à Fontvieille. Le monte-meubles a été installé dans un espace très réduit avec une maîtrise technique impressionnante. Devis respecté et équipe très polie.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JCMonaco` },
  { id: "fallback-3", name: "Cabinet Finance-MC", text: "Le transfert de nos bureaux vers le quartier de Monte-Carlo a été mené avec une rigueur et une confidentialité totales. Un partenaire de confiance pour les entreprises exigeantes.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=FinanceMC` },
];

const MONACO_DISTRICTS = [
  { name: "Monte-Carlo", desc: "Le cœur battant, ses résidences de luxe et ses accès prestigieux." },
  { name: "Fontvieille", desc: "Gestion logistique du quartier d'affaires et résidentiel sur la mer." },
  { name: "La Condamine", desc: "Expertise des accès autour du port et des zones commerçantes." },
  { name: "Larvotto", desc: "Service premium pour les résidences du front de mer." },
  { name: "Moneghetti", desc: "Maîtrise des accès escarpés sur les hauteurs de la principauté." },
  { name: "Le Jardin Exotique", desc: "Logistique adaptée aux pentes et aux vues panoramiques." }
];

const WHY_US_ITEMS = [
  {
    icon: Building2,
    title: "Expertise IGH",
    description: "Nous maîtrisons les protocoles d'accès complexes des immeubles de grande hauteur monégasques (monte-charges, sécurité)."
  },
  {
    icon: ShieldAlert,
    title: "Discrétion Absolue",
    description: "Nos équipes sont formées pour intervenir avec la plus grande réserve, respectant l'intimité des résidences les plus exclusives."
  },
  {
    icon: Navigation,
    title: "Maîtrise de la Voirie",
    description: "Nous gérons en direct avec la Direction de l'Aménagement Urbain les arrêtés de stationnement et les autorisations de levage."
  },
  {
    icon: Gem,
    title: "Service Gants Blancs",
    description: "Un standard de qualité supérieur pour vos objets d'art, mobilier de créateur et patrimoine de haute valeur."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous le stationnement très complexe à Monaco ?", 
    answer: "À Monaco, le stationnement est un défi majeur. Nous déposons les demandes d'autorisation auprès de la Sûreté Publique et de la voirie au minimum 3 semaines avant l'intervention. Nous balisons l'emplacement pour garantir que le camion puisse stationner au plus proche de votre entrée, souvent dès l'aube." 
  },
  { 
    question: "Déménagez-vous dans les étages élevés des tours ?", 
    answer: "C'est l'une de nos spécialités. Nous coordonnons l'utilisation des ascenseurs de service avec les conciergeries et, si nécessaire, nous installons des monte-meubles capables d'atteindre des hauteurs importantes, tout en protégeant scrupuleusement les parties communes." 
  },
  { 
    question: "Quelles sont les formalités douanières pour Monaco ?", 
    answer: "Bien que Monaco ne soit pas dans l'UE, il existe une union douanière avec la France. Il n'y a donc pas de droits de douane pour un déménagement de résidence principale. Il nous faudra cependant établir un inventaire détaillé et vous demander vos justificatifs de changement de domicile pour les contrôles de police frontaliers." 
  },
  { 
    question: "Proposez-vous un service de déballage complet ?", 
    answer: "Oui, notre formule 'Prestige' est la plus plébiscitée vers Monaco. Elle inclut l'emballage complet du fragile et des livres, ainsi que le déballage et la remise en place de votre intérieur selon vos souhaits pour un emménagement sans aucun effort." 
  }
];

export default function MonacoPage() {
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
          alt="Vue prestigieuse de la Principauté de Monaco"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Monaco</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Gem className="h-4 w-4" />
              Liaison Nationale de Prestige France → Monaco
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                sur le Rocher.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour votre installation en Principauté. Discrétion absolue, soin infini et maîtrise totale des contraintes urbaines de Monaco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Étude personnalisée gratuite <ArrowRight className="ml-2 h-5 w-5" />
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
                L'orfèvrerie logistique <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour un cadre d'exception</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer à Monaco est un projet exclusif qui demande une rigueur logistique et un niveau de service irréprochables. La verticalité de la ville, ses accès souvent confinés et la réglementation très stricte de circulation imposent de faire appel à un déménageur habitué aux plus hauts standards.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous traitons chaque transfert vers Monaco comme une opération de précision. De la coordination avec les conciergeries des tours les plus prestigieuses à la gestion minutieuse des accès quais et monte-charges, nous vous garantissons une transition d'une discrétion et d'une efficacité absolues.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Building className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste IGH</h3>
                   <p className="text-slate-500 font-light">Une maîtrise totale des accès en immeubles de grande hauteur et des protocoles de sécurité.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
          src="/images/zones/demenagement-france-monaco.webp"
                  alt="Déménagement prestigieux à Monaco"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-mc" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence pour la Principauté
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Un savoir-faire rodé pour une liaison France-Monaco parfaitement sécurisée et confidentielle.
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

      {/* --- DISTRICTS GRID --- */}
      <section id="districts-mc" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous intervenons dans <span className="text-[#00ad9f]">tout Monaco.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De l'effervescence de Monte-Carlo à la modernité de Fontvieille, nos équipes maîtrisent chaque accès de la principauté.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {MONACO_DISTRICTS.map((district) => (
              <div 
                key={district.name} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm cursor-default"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors mb-2 text-lg">{district.name}</span>
                <span className="text-sm text-slate-400 font-light group-hover:text-slate-300 transition-colors leading-relaxed">{district.desc}</span>
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
                  alt="Déménageur protégeant du mobilier de très haute valeur pour Monaco"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil exclusif.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Résidences & Appartements de Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet, la protection des parties communes et la gestion experte des monte-charges IGH.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Gem className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expertise Biens de Valeur</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Mise en caisse bois sur-mesure pour les objets d'art, protection renforcée du mobilier de créateur et manutention gants blancs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formule "Prestige" (Full Service)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Une prise en charge totale de votre départ à votre arrivée : emballage, transport, déballage et réinstallation immédiate.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir le détail de l'offre Prestige</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-mc" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie en Principauté.</p>
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
                      départ pour Monaco ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Confiez votre projet aux experts de la logistique de prestige. Contactez nos conseillers pour une étude personnalisée et recevez un devis ferme sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis Prestige en 24h <ArrowRight className="ml-2 h-5 w-5" />
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
