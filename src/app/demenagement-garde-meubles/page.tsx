import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Icons
import { 
  CheckCircle2, 
  ShieldCheck, 
  Box, 
  CalendarDays, 
  Lock, 
  Truck, 
  Search, 
  Package, 
  Warehouse,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  Clock
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Garde-Meubles Sécurisé & Stockage Flexible | Marne Transdem",
  description: "Solution de garde-meubles professionnelle et sécurisée. Conteneurs individuels scellés, surveillance 24/7 et flexibilité totale. Devis stockage gratuit.",
};

const features = [
  {
    icon: ShieldCheck,
    title: "Sécurité 24/7",
    description: "Nos entrepôts sont sous télésurveillance permanente, avec systèmes d'alarmes et détection incendie de pointe."
  },
  {
    icon: Clock,
    title: "Flexibilité Totale",
    description: "Une semaine, un mois ou plusieurs années : nous ajustons nos contrats à la durée réelle de votre besoin de stockage."
  },
  {
    icon: Box,
    title: "Conteneurs Scellés",
    description: "Vos biens sont isolés dans des conteneurs en bois ventilés, préservés de la poussière, de la lumière et de l'humidité."
  },
  {
    icon: Lock,
    title: "Accès Contrôlé",
    description: "L'accès à votre espace est strictement réglementé et toujours accompagné, garantissant une confidentialité absolue."
  }
];

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: "Estimation",
    description: "Calcul précis du cubage et du nombre de conteneurs nécessaires pour optimiser votre budget de stockage."
  },
  {
    step: "02",
    icon: Package,
    title: "Emballage Spécifique",
    description: "Protection dédiée pour le stockage longue durée (housses respirantes, bullkraft, couvertures)."
  },
  {
    step: "03",
    icon: Truck,
    title: "Transfert",
    description: "Enlèvement à votre domicile et transport entièrement sécurisé vers nos entrepôts dédiés."
  },
  {
    step: "04",
    icon: Warehouse,
    title: "Plombage",
    description: "Mise en conteneur individuel, réalisation d'un inventaire précis et pose de scellés de sécurité."
  }
];

const faqItems = [
  {
    question: "Quelle est la différence entre garde-meubles et self-stockage ?",
    answer: "Le garde-meubles est une solution beaucoup plus sûre : vos biens sont stockés dans des conteneurs plombés accessibles uniquement sur rendez-vous. C'est la solution idéale pour la conservation longue durée car la manutention est réduite au strict minimum, contrairement au self-stockage classique où les passages et les mouvements sont très fréquents dans les couloirs."
  },
  {
    question: "Mes meubles et affaires sont-ils à l'abri de l'humidité ?",
    answer: "Absolument. Nos entrepôts répondent aux normes les plus strictes de conservation. L'utilisation de conteneurs en bois spécifiques permet aux matériaux de 'respirer', évitant tout risque de condensation, de moisissure ou de détérioration, même sur plusieurs années de stockage."
  },
  {
    question: "Puis-je récupérer une partie de mes affaires en cours de stockage ?",
    answer: "Oui, c'est tout à fait possible. Il vous suffit de nous contacter au minimum 48h à l'avance. Nous préparons votre conteneur en l'amenant dans une zone de visite sécurisée de l'entrepôt pour que vous puissiez y accéder confortablement."
  },
  {
    question: "Comment est calculé le prix mensuel du stockage ?",
    answer: "Le tarif dépend principalement du volume à stocker (qui détermine le nombre de conteneurs de 8m³ ou 12m³ nécessaires) et de la valeur déclarée pour l'assurance. Nous proposons également des tarifs dégressifs très avantageux selon la durée d'engagement. Votre devis est transparent, sans aucun frais de dossier caché."
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function GardeMeublesPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/services/entete-pages.webp"
          alt="Entrepôt logistique de garde-meubles hautement sécurisé"
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
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Garde-Meubles</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <ShieldAlert className="h-4 w-4" />
              Protection & Surveillance 24/7
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Garde-Meubles & <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Stockage.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Travaux de rénovation, déménagement ou simple manque de place ? Conservez vos biens dans nos entrepôts de très haute sécurité. Vos meubles méritent l'excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Réserver mon espace <ArrowRight className="ml-2 h-5 w-5" />
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
                Besoin d'espace ? <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">Nous avons la clé.</u>
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Le stockage n'est pas qu'une question de mètres carrés. C'est avant tout une question de <strong>préservation et de confiance</strong>. Que ce soit pour faire la transition entre deux logements, un départ de longue durée à l'étranger ou des travaux de rénovation chez vous, nos solutions s'adaptent à vos besoins.
                </p>
                <p>
                  Confiez-nous vos biens les plus précieux. Nous les conservons dans des conteneurs plombés, au sein d'entrepôts respectant des conditions optimales de stockage (température régulée, hygrométrie stable, traitement anti-nuisibles régulier) jusqu'à ce que vous soyez prêt à les retrouver.
                </p>
              </div>
              
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-14 w-14 rounded-full border-4 border-white bg-slate-200 overflow-hidden relative shadow-sm">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Avis client garde-meuble" fill />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-light text-slate-500 leading-relaxed">
                  <span className="text-slate-900 font-bold text-base">+500 particuliers</span> nous confient <br />leur patrimoine chaque année.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/garde-meubles.webp"
                  alt="Zone de stockage sécurisée et conteneurs plombés"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              La tranquillité <span className="text-[#00ad9f]">absolue.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Un environnement professionnel conçu pour une conservation sans faille de vos biens.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#00ad9f]/30 hover:bg-[#00ad9f]/5 transition-all duration-500 backdrop-blur-sm">
                <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-[#00ad9f] transition-colors duration-500">
                  <feature.icon className="h-7 w-7 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS STEPS --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Un processus <span className="text-[#00ad9f]">transparent</span>.
            </h2>
            <p className="text-lg text-slate-500 font-light">De la mise en carton au scellé du conteneur, nous gérons tout.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative p-10 rounded-[2.5rem] bg-white border border-slate-100 group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <span className="absolute top-8 right-8 text-5xl font-black text-slate-100 group-hover:text-[#00ad9f]/10 transition-colors duration-500">
                  {step.step}
                </span>
                <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                  <step.icon className="h-8 w-8 text-[#00ad9f]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light relative z-10">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Vos questions sur <span className="text-[#00ad9f]">le stockage</span>
            </h2>
            <p className="text-slate-500 text-lg font-light">Tout ce que vous devez savoir avant de nous confier vos meubles.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline hover:text-[#00ad9f] py-6 transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6 font-light">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                Libérez de l'espace <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                  sans compromis.
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Nos conseillers évaluent votre volume par téléphone ou via une visite technique gratuite à domicile pour vous proposer le meilleur tarif de stockage.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)] hover:scale-105" asChild>
                  <Link href="/demande-devis">
                    Calculer mon volume de stockage <ArrowRight className="ml-2 h-5 w-5" />
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