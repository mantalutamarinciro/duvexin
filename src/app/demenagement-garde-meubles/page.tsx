import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

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
    description: "Une semaine, un mois ou plusieurs années : nous ajustons nos contrats à la durée réelle de votre besoin."
  },
  {
    icon: Box,
    title: "Conteneurs Scellés",
    description: "Vos biens sont isolés dans des conteneurs en bois ventilés, à l'abri de la poussière et de l'humidité."
  },
  {
    icon: Lock,
    title: "Accès Contrôlé",
    description: "L'accès à votre espace est strictement réglementé et accompagné, garantissant une confidentialité absolue."
  }
];

const processSteps = [
  {
    step: "01",
    icon: Search,
    title: "Estimation",
    description: "Calcul précis du cubage nécessaire pour optimiser votre budget de stockage."
  },
  {
    step: "02",
    icon: Package,
    title: "Emballage",
    description: "Protection spécifique pour le stockage longue durée (housses, bullkraft)."
  },
  {
    step: "03",
    icon: Truck,
    title: "Transfert",
    description: "Enlèvement à domicile et transport sécurisé vers nos entrepôts dédiés."
  },
  {
    step: "04",
    icon: Warehouse,
    title: "Plombage",
    description: "Mise en conteneur individuel, inventaire et scellés de sécurité posés devant vous."
  }
];

const faqItems = [
  {
    question: "Quelle est la différence entre garde-meubles et self-stockage ?",
    answer: "Le garde-meubles est une solution plus sûre : vos biens sont stockés dans des conteneurs plombés accessibles uniquement sur rendez-vous. C'est idéal pour la conservation longue durée car la manutention est réduite au strict minimum, contrairement au self-stockage où les passages sont fréquents dans les couloirs."
  },
  {
    question: "Mes meubles sont-ils à l'abri de l'humidité ?",
    answer: "Absolument. Nos entrepôts répondent aux normes strictes de conservation. L'utilisation de conteneurs en bois permet aux matériaux de 'respirer', évitant tout risque de condensation ou de moisissure, même sur plusieurs années."
  },
  {
    question: "Puis-je récupérer une partie de mes affaires seulement ?",
    answer: "Oui. Il vous suffit de nous contacter 48h à l'avance. Nous préparons votre conteneur dans une zone de visite sécurisée pour que vous puissiez y accéder en toute simplicité."
  },
  {
    question: "Comment est calculé le prix du stockage ?",
    answer: "Le tarif dépend du volume (nombre de conteneurs de 8m³ ou 12m³) et de la valeur assurée. Nous proposons des tarifs dégressifs selon la durée d'engagement. Le devis est transparent, sans frais de dossier cachés."
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
      <section className="relative h-[450px] flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/storage-pro/1920/1080"
          alt="Entrepôt logistique sécurisé"
          fill
          priority
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#00ad9f]/20 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-[#00ad9f] backdrop-blur-md border border-[#00ad9f]/30">
              <ShieldAlert className="h-4 w-4" />
              Protection & Surveillance 24/7
            </div>
            <SectionTitle as="h1" className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
              Garde-Meubles & <u>Stockage</u>
            </SectionTitle>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Travaux, déménagement ou manque de place ? Conservez vos biens dans nos entrepôts de haute sécurité. Vos meubles méritent une protection d'expert.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-xl transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">Réserver mon espace <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- BREADCRUMB --- */}
      <div className="bg-white border-b">
        <div className="container py-4 text-xs font-medium text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-[#00ad9f] transition-colors">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/services" className="hover:text-[#00ad9f] transition-colors">Services</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">Garde-Meubles</span>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Besoin d'espace ? <br />
                <span className="text-[#00ad9f]">Nous avons la clé.</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-lg font-light leading-relaxed">
                <p>
                  Le stockage n'est pas qu'une question de mètres carrés. C'est une question de **préservation**. Que ce soit pour une transition entre deux logements, un départ à l'étranger ou des travaux, nos solutions pro s'adaptent à votre vie.
                </p>
                <p>
                  Confiez-nous vos biens en toute confiance. Nous les conservons dans des conditions optimales (température contrôlée, hygrométrie stable) jusqu'à ce que vous soyez prêt à les retrouver.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden relative">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="client" fill />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium text-slate-500">
                  <span className="text-slate-900 font-bold">+500 particuliers</span> nous confient <br />leurs souvenirs chaque année.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-50 rounded-[3rem] rotate-2 transform -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://picsum.photos/seed/storage-boxes/800/600"
                  alt="Stockage sécurisé"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">La tranquillité <span className="text-[#00ad9f]">garantie</span></h2>
            <p className="text-slate-400 text-lg font-light">Un environnement pro pour une conservation sans faille.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 rounded-[2rem] bg-slate-800/50 border border-slate-700 hover:border-[#00ad9f]/50 hover:bg-slate-800 transition-all">
                <div className="h-12 w-12 rounded-xl bg-[#00ad9f]/10 flex items-center justify-center mb-6 group-hover:bg-[#00ad9f] transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-[#00ad9f] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESS STEPS --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Un processus <span className="text-[#00ad9f]">simple</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl transition-all">
                <span className="absolute top-6 right-8 text-4xl font-black text-slate-200/50 group-hover:text-[#00ad9f]/20 transition-colors">
                  {step.step}
                </span>
                <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7 text-[#00ad9f]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight italic">Vos questions sur le stockage</h2>
            <p className="text-slate-500 font-light">Tout ce que vous devez savoir avant de nous confier vos meubles.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border-none rounded-3xl px-6 shadow-sm overflow-hidden">
                <AccordionTrigger className="text-left font-bold text-slate-900 hover:no-underline hover:text-[#00ad9f] py-6 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6 font-light">
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
          <div className="relative rounded-[3.5rem] bg-slate-900 p-12 md:p-24 text-center overflow-hidden isolate shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#00ad9f]/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
              Libérez de l'espace <br />
              <span className="text-[#00ad9f]">sans compromis.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Nos conseillers évaluent votre volume par téléphone ou via une visite gratuite pour vous proposer le meilleur tarif de stockage.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.5)]" asChild>
                <Link href="/demande-devis">Calculer mon cubage de stockage</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}