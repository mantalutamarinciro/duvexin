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
  ShieldCheck, Truck, Piano, Gem, Square, 
  ScanSearch, Cog, Users, ArrowRight, Weight, 
  HardHat, ChevronRight, AlertTriangle
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement d'Objets Lourds | Pianos, Coffres-forts & Billards",
  description: "Spécialistes de la manutention lourde. Déménagement sécurisé de pianos, coffres-forts, billards et objets hors-normes. Équipement professionnel et assurance incluse.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-objets-lourds", // À adapter
  }
};

const HEAVY_OBJECTS = [
  {
    icon: Piano,
    title: "Pianos",
    description: "Pianos droits ou à queue. Utilisation de luges spécifiques, de housses capitonnées et de sangles de portage pour un équilibre parfait."
  },
  {
    icon: ShieldCheck,
    title: "Coffres-forts",
    description: "Descellement, levage hydraulique et transport de coffres-forts blindés ou armoires fortes, quel que soit leur tonnage."
  },
  {
    icon: Gem,
    title: "Billards & Baby-foot",
    description: "Démontage soigné (y compris l'ardoise des billards), emballage, transport et remontage millimétré à l'arrivée."
  },
  {
    icon: Square,
    title: "Équipement Industriel",
    description: "Machines-outils, matériel médical ou serveurs informatiques lourds nécessitant un transport sans aucune vibration."
  },
];

const METHODOLOGY = [
  {
    step: "01",
    icon: ScanSearch,
    title: "Repérage & Ingénierie",
    description: "Visite technique obligatoire pour évaluer le poids, le centre de gravité, et surtout calculer la résistance des accès (escaliers, sols)."
  },
  {
    step: "02",
    icon: Cog,
    title: "Déploiement Technique",
    description: "Mise en place du matériel lourd : monte-meubles de grande capacité, grues, palans, chariots à chenilles pour escaliers."
  },
  {
    step: "03",
    icon: Users,
    title: "Manutention Sécurisée",
    description: "Intervention d'une équipe de 'Porteurs Lourds' expérimentés, équipés d'EPI (Équipements de Protection Individuelle) et coordonnés au millimètre."
  }
];

const FAQS = [
  { question: "Comment déplacez-vous un piano dans un escalier étroit ?", answer: "C'est une opération délicate qui nécessite une expertise. Si l'escalier le permet, nous utilisons des techniques de portage spécifiques avec des sangles. Si l'escalier est trop étroit ou fragile, nous préconisons le passage par fenêtre à l'aide d'un monte-meubles, ce qui est souvent plus sûr." },
  { question: "Mon coffre-fort est scellé au sol, pouvez-vous le déménager ?", answer: "Oui, nous pouvons gérer le descellement. Cette prestation est étudiée lors de la visite technique pour prévoir l'outillage adéquat et évaluer la remise en état du support d'origine." },
  { question: "Le transport d'objets lourds est-il plus cher qu'un déménagement classique ?", answer: "Oui, car il nécessite du personnel hyper-spécialisé (porteurs lourds), du matériel technique onéreux (grues, chenilles) et des assurances spécifiques. Un devis transparent vous est toujours fourni après évaluation." },
  { question: "Que se passe-t-il si le sol de ma nouvelle maison est fragile (parquet ancien) ?", answer: "Lors de notre repérage, nous évaluons la charge au sol. Le jour J, nous posons des plaques de répartition de charge (contreplaqué ou acier) pour protéger vos sols (parquets, marbres, carrelages) lors du roulage de l'objet lourd." }
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

export default function ObjetsLourdsPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION (Industriel / Puissant) --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/heavy-move-piano/1920/1080"
          alt="Déménagement d'un piano à queue avec monte-meubles"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="#services" className="hover:text-white transition-colors">Services Spécialisés</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Objets Lourds</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Weight className="h-4 w-4" />
              Manutention Spécialisée
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              La force brute, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                la précision en plus.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Pianos de concert, coffres-forts blindés ou équipements industriels. Confiez le déplacement de vos objets hors-normes à nos experts en levage et manutention.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Demander une étude technique <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (Robuste) --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <SectionTitle as="h2" className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Ne prenez <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">aucun risque</u>.
              </SectionTitle>
              
              <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
                <p>
                  Déplacer une charge de plusieurs centaines de kilos dans un environnement contraint (escaliers, fenêtres) ne s'improvise pas. Une erreur peut entraîner des dommages irréversibles sur l'objet, détruire vos locaux, ou pire, causer de graves blessures corporelles.
                </p>
                <p>
                  C'est pourquoi nous mettons à votre disposition nos <strong>"Porteurs Lourds"</strong>. Ces techniciens spécialisés allient force physique, maîtrise des lois de la physique (centres de gravité, leviers) et utilisation de matériel de levage de haute technologie.
                </p>
              </div>

              <div className="flex items-center gap-5 pt-4">
                 <div className="h-16 w-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900">Prévention des risques</p>
                    <p className="text-sm text-slate-500">Nos méthodes garantissent la sécurité absolue de l'objet, des bâtiments et des personnes.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Fond technique façon "plaque d'acier" */}
              <div className="absolute inset-0 bg-slate-200 transform translate-x-4 translate-y-4 rounded-3xl -z-10 bg-[url('/noise.png')] opacity-50" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
                <Image
                  src="https://picsum.photos/seed/safe-moving/800/600"
                  alt="Équipe technique déplaçant un coffre-fort lourd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATÉGORIES D'OBJETS --- */}
      <section id="objects" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Une solution pour chaque <br className="hidden sm:block"/>
              <span className="text-[#00ad9f]">cargaison exceptionnelle.</span>
            </h2>
            <p className="text-lg text-slate-500">
              Des instruments de musique aux équipements blindés, nous adaptons notre matériel à la nature de la charge.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {HEAVY_OBJECTS.map((item, i) => (
              <div key={i} className="group bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center mb-6 group-hover:bg-[#00ad9f] transition-colors duration-300">
                   <item.icon className="h-7 w-7 text-[#00ad9f] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- METHODOLOGIE (Cartes Techniques) --- */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Ingénierie & <span className="text-[#00ad9f]">Sécurité</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              La force physique ne suffit pas. Le déplacement d'objets lourds est avant tout une affaire de calcul et de technique.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {METHODOLOGY.map((step, index) => (
              <div key={index} className="relative bg-slate-800 border border-slate-700 p-8 rounded-[2rem] overflow-hidden group">
                {/* Numéro géant en filigrane */}
                <div className="absolute -right-4 -bottom-10 text-9xl font-black text-slate-700/30 group-hover:text-[#00ad9f]/10 transition-colors duration-500 select-none pointer-events-none">
                  {step.step}
                </div>
                
                <div className="relative z-10">
                   <div className="mb-6 flex items-center gap-4">
                      <step.icon className="h-10 w-10 text-[#00ad9f]" strokeWidth={1.5} />
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Étape {step.step}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                   <p className="text-base text-slate-300 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq-heavy" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">Techniques</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Clarifiez vos doutes avant l'intervention de nos experts.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed px-4 pb-6">
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
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco Technique (Ajout de pointer-events-none) */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               
               {/* Pattern de fond technique (Ajout de pointer-events-none) */}
               <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] -z-20 pointer-events-none" />
               
               {/* CONTENU AU PREMIER PLAN (Ajout de relative et z-10) */}
               <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white mb-8 border border-white/5 backdrop-blur-md">
                   <HardHat className="h-4 w-4 text-[#00ad9f]" />
                   Intervention Spécialisée
                 </div>

                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Un objet <span className="text-[#00ad9f]">hors-norme</span> <br className="hidden md:block"/>
                    à déplacer ?
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Chaque cas est unique. Demandez une étude de faisabilité gratuite à nos techniciens pour sécuriser votre projet.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Demander une étude technique <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-base font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-20" asChild>
                       <a href="tel:+33144935486">Parler à un expert manutention</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}