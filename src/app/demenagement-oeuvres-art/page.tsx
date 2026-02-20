import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";

// Icons
import { 
  ShieldCheck, Truck, Palette, Box, 
  Layers, ScanSearch, Package, Hand, 
  ArrowRight, ShieldAlert, ChevronRight 
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement d'Œuvres d'Art & Objets de Valeur | Transport Sécurisé",
  description: "Transport spécialisé d'œuvres d'art, antiquités et mobilier design. Emballage sur-mesure, caisses en bois et assurance Ad Valorem. Devis confidentiel.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-oeuvres-art",
  }
};

const ART_TYPES = [
  {
    icon: Palette,
    title: "Tableaux & Toiles",
    description: "Emballage avec papier de soie neutre, protection des coins, tamponnage et caisses sur-mesure pour les œuvres les plus précieuses."
  },
  {
    icon: Hand,
    title: "Sculptures & Statues",
    description: "Caisses de transport capitonnées, calage en mousse usinée sur-mesure et techniques de levage adaptées au poids de l'œuvre."
  },
  {
    icon: Layers,
    title: "Mobilier Ancien & Design",
    description: "Protection des marqueteries, dorures et structures fragiles. Manipulation experte pour éviter toute tension sur les assemblages anciens."
  },
  {
    icon: Box,
    title: "Objets de Collection",
    description: "Emballage individuel méticuleux pour la verrerie, la céramique, les lustres en cristal ou tout autre objet d'art de petite taille."
  },
];

const METHODOLOGY = [
  {
    step: "01",
    icon: ScanSearch,
    title: "Audit & Ingénierie",
    description: "Une visite technique minutieuse (ou étude sur photos) pour évaluer la fragilité, les dimensions et les accès. Nous définissons le cahier des charges de l'emballage."
  },
  {
    step: "02",
    icon: Package,
    title: "Emballage d'Exception",
    description: "Fabrication de caisses en bois (tamponnage, caisse claire-voie ou pleine), utilisation de matériaux chimiquement neutres (Tyvek, Bullkraft) et anti-vibrations."
  },
  {
    step: "03",
    icon: Truck,
    title: "Transport Haute Sécurité",
    description: "Manutention 'gants blancs'. Transport dans nos véhicules équipés de suspensions pneumatiques, de capitonnage intégral et de systèmes d'arrimage spécifiques."
  }
];

const FAQS = [
  { question: "Comment emballez-vous un tableau de grande valeur ?", answer: "Nous utilisons une technique multi-couches : papier de soie neutre (sans acide) en contact direct avec l'œuvre, puis un emballage bullkraft ou Melinex. Enfin, la toile est placée dans une caisse en bois sur-mesure (souvent capitonnée de mousse) pour créer une coque rigide." },
  { question: "Quelle assurance proposez-vous pour le transport d'art ?", answer: "Au-delà de notre garantie de base, nous mettons systématiquement en place une assurance 'Ad Valorem'. Cette assurance spécifique couvre vos œuvres de 'clou à clou' à leur valeur réelle agréée (sur présentation de certificats ou factures)." },
  { question: "Gérez-vous les formalités douanières pour un transport à l'international ?", answer: "Oui, notre réseau de partenaires nous permet de gérer les formalités douanières spécifiques aux œuvres d'art (certificats d'exportation, passeports culturels) pour un transit fluide hors des frontières." },
  { question: "Faut-il des conditions de température particulières pour le transport ?", answer: "Pour le patrimoine particulièrement sensible aux variations climatiques (bois anciens, peintures spécifiques), nous pouvons affréter des véhicules à température et hygrométrie contrôlées." }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function OeuvresArtPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION (Atmosphère Luxe/Galerie) --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/art-transport/1920/1080"
          alt="Emballage soigné d'une sculpture pour un transport"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        {/* Gradient pour assurer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="#services" className="hover:text-white transition-colors">Services Spécialisés</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Œuvres d'Art</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-8 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Logistique d'Excellence
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Le transport <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-100">
                qui devient un art.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Tableaux de maîtres, sculptures, antiquités ou mobilier design. Nous déployons un savoir-faire d'exception et une discrétion absolue pour préserver vos biens les plus précieux.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Demander un devis confidentiel <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (Éditorial) --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <SectionTitle as="h2" className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Une manipulation <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">gants blancs</u>.
              </SectionTitle>
              
              <div className="space-y-6 text-lg text-slate-500 leading-relaxed font-light">
                <p>
                  Le déplacement d'œuvres d'art, de mobilier de designer ou d'antiquités exige une expertise, une minutie et un niveau de soin qui vont bien au-delà de la simple manutention. Chaque objet possède une histoire, une fragilité unique et une valeur inestimable.
                </p>
                <p>
                  Chez Marne Transdem, notre branche spécialisée maîtrise les techniques d'emballage les plus avancées (tamponnage, caisserie sur-mesure) et les protocoles de manipulation les plus stricts pour vous garantir un risque zéro, de "clou à clou".
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                 <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <ShieldAlert className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900">Assurance Ad Valorem</p>
                    <p className="text-sm text-slate-500">Couverture totale à la valeur déclarée de l'œuvre.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Cadre de type "tableau" pour l'image */}
              <div className="absolute inset-0 bg-[#00ad9f] transform translate-x-4 translate-y-4 rounded-xl -z-10 opacity-10" />
              <div className="relative aspect-[3/4] lg:aspect-square rounded-xl overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                <Image
                  src="https://picsum.photos/seed/packing-painting/800/1000"
                  alt="Emballeur d'art manipulant une toile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATÉGORIES D'OBJETS (Museum Cards) --- */}
      <section id="expertise" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Une protection étudiée pour <br/> <span className="text-[#00ad9f]">chaque type d'œuvre.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Il n'y a pas d'emballage standard dans l'art. La matière dicte la méthode.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ART_TYPES.map((item, i) => (
              <div key={i} className="group relative bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors duration-300">
                <div className="mb-8">
                   <item.icon className="h-10 w-10 text-[#00ad9f] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- METHODOLOGIE (Timeline Horizontale) --- */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Notre protocole d'intervention
            </h2>
            <p className="text-lg text-slate-500 font-light">
              De l'audit initial à l'accrochage final, la logistique est millimétrée.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
             {/* Ligne connectrice */}
             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-200 -z-10" />

            {METHODOLOGY.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-white border border-slate-100 shadow-xl flex items-center justify-center mb-8 relative z-10">
                   <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                     {step.step}
                   </div>
                   <step.icon className="h-10 w-10 text-[#00ad9f]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-base text-slate-500 leading-relaxed font-light px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq-art" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all duration-200"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed font-light px-4 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0b0f19] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco Luxe */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#00ad9f]/50 to-transparent" />
               
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                  Confiez-nous vos <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-100">
                    trésors en toute sérénité.
                  </span>
               </h2>
               <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                  Contactez nos spécialistes pour une consultation technique, confidentielle et sans engagement.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                     <Link href="/demande-de-devis">
                        Obtenir une étude personnalisée <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-base font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all" asChild>
                     <a href="tel:+33144935486">Appeler un spécialiste</a>
                  </Button>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}