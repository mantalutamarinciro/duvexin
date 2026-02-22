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
  ShieldCheck, Truck, Piano, Gem, Square, 
  ScanSearch, Cog, Users, ArrowRight, Weight, 
  HardHat, ChevronRight, AlertTriangle, Box
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement d'Objets Lourds | Pianos, Coffres-forts & Billards",
  description: "Spécialistes de la manutention lourde. Déménagement sécurisé de pianos, coffres-forts, billards et équipements industriels. Matériel pro et assurance incluse.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-objets-lourds",
  }
};

// --- DATA ---
const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Conservatoire de Musique", text: "Déplacement de deux pianos à queue de concert. Une équipe d'un calme et d'une précision remarquables. Du grand art logistique.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Conservatoire` },
  { id: "fallback-2", name: "Marc Deschamp", text: "Ils ont réussi à monter un coffre-fort de 300kg au 2ème étage avec leur robot monte-escalier sans faire la moindre égratignure aux boiseries. Impressionnant.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD` },
  { id: "fallback-3", name: "Sophie L.", text: "Démontage, transport et remontage complet de notre billard en ardoise. L'équipe a été très minutieuse pour la mise à niveau finale. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieL` },
];

const HEAVY_OBJECTS = [
  {
    icon: Piano,
    title: "Pianos",
    description: "Pianos droits ou à queue de concert. Utilisation de luges spécifiques, housses capitonnées et sangles de portage pour un équilibre parfait sans désaccordage."
  },
  {
    icon: ShieldCheck,
    title: "Coffres-forts",
    description: "Descellement, levage hydraulique et transport de coffres-forts blindés ou armoires ignifuges, quel que soit leur tonnage ou leur emplacement."
  },
  {
    icon: Gem,
    title: "Billards",
    description: "Démontage soigné de la structure et des plaques d'ardoise, emballage spécifique, transport et remontage avec mise à niveau millimétrée."
  },
  {
    icon: Box,
    title: "Équipement Industriel",
    description: "Machines-outils, matériel médical, ou baies de serveurs informatiques lourdes nécessitant un transport technique sans aucune vibration."
  },
];

const METHODOLOGY = [
  {
    step: "01",
    icon: ScanSearch,
    title: "Audit & Ingénierie",
    description: "Visite technique obligatoire pour évaluer la charge, le centre de gravité et calculer la résistance des accès (sols, trémies, escaliers)."
  },
  {
    step: "02",
    icon: Cog,
    title: "Déploiement Matériel",
    description: "Mise en place de notre parc technique : monte-meubles grande capacité, grues, palans, ou chariots robotisés à chenilles pour les escaliers."
  },
  {
    step: "03",
    icon: Users,
    title: "Portage Hyper-Spécialisé",
    description: "Intervention de nos 'Porteurs Lourds', des techniciens d'élite coordonnés au millimètre, équipés d'EPI pour une sécurité absolue."
  }
];

const FAQS = [
  { question: "Comment déplacez-vous un piano dans un escalier étroit ?", answer: "C'est une opération délicate. Si la cage d'escalier le permet, nous utilisons un chariot robotisé à chenilles ou des sangles de levage. En cas d'incompatibilité, nous préconisons un levage par l'extérieur (passage par fenêtre) à l'aide d'un monte-meubles ou d'une grue." },
  { question: "Mon coffre-fort est scellé au sol ou au mur, que faire ?", answer: "Nos équipes peuvent gérer le descellement. Cette prestation est étudiée rigoureusement lors de la visite technique préalable pour prévoir l'outillage de perforation adéquat et l'impact sur le support d'origine." },
  { question: "Cette prestation est-elle plus coûteuse qu'un déménagement classique ?", answer: "Oui, car la manutention lourde nécessite du personnel hautement qualifié (formation spécifique 'porteurs lourds'), un matériel de levage onéreux et des assurances 'Ad Valorem' renforcées. Un devis transparent vous est fourni après étude." },
  { question: "Allez-vous abîmer le parquet de ma nouvelle maison ?", answer: "Absolument pas. Lors du repérage, nous évaluons la charge au sol. Le jour J, nous installons des plaques de répartition de charge (contreplaqué marine ou acier) et utilisons des roues en polyuréthane non marquantes pour protéger vos sols (parquets, marbres)." }
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
      
      {/* --- HERO SECTION (Padding supérieur augmenté) --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Manutention et levage d'objets lourds"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[40%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services Spécialisés</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Objets Lourds</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-8 shadow-sm backdrop-blur-md">
              <Weight className="h-4 w-4" />
              Manutention de l'extrême
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              La force brute, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                la précision en plus.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Pianos de concert, coffres-forts blindés ou équipements industriels. Confiez le déplacement de vos objets hors-normes à nos experts en levage et manutention.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
                  Demander une étude technique <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (Robuste) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Ne prenez <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">aucun risque</u>.
              </h2>
              
              <div className="space-y-6 text-lg text-slate-500 leading-relaxed font-light">
                <p>
                  Déplacer une charge de plusieurs centaines de kilos dans un environnement contraint (escaliers, fenêtres) ne s'improvise pas. Une erreur peut entraîner des dommages irréversibles sur l'objet, détruire vos locaux, ou pire, causer de graves blessures.
                </p>
                <p>
                  C'est pourquoi nous mettons à votre disposition nos <strong>"Porteurs Lourds"</strong>. Ces techniciens spécialisés allient force physique, maîtrise des lois de la physique (centres de gravité, leviers) et utilisation d'un matériel de levage de haute technologie.
                </p>
              </div>

              <div className="flex items-start gap-5 pt-6 p-6 rounded-3xl bg-red-50/50 border border-red-100">
                 <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="h-7 w-7 text-red-600" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900 text-lg mb-1">Prévention des risques</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Nos méthodes garantissent la sécurité absolue de l'objet, de l'intégrité de vos bâtiments et des personnes présentes.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform transition-transform duration-700 group-hover:rotate-1 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/demenagement-objets-lourds.webp"
                  alt="Équipe technique préparant une manutention lourde"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATÉGORIES D'OBJETS --- */}
      <section id="objects" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Une solution pour chaque <br className="hidden sm:block"/>
              <span className="text-[#00ad9f]">cargaison exceptionnelle.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Des instruments de musique aux équipements industriels blindés, nous adaptons notre matériel à la nature de la charge.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {HEAVY_OBJECTS.map((item, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <item.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- METHODOLOGIE (Dark Premium Style) --- */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden">
        {/* Lueur de fond */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00ad9f]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Ingénierie & <span className="text-[#00ad9f]">Sécurité</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              La force physique ne suffit pas. Le déplacement d'objets extrêmes est avant tout une affaire de calcul, de physique et de technique.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {METHODOLOGY.map((step, index) => (
              <div key={index} className="relative bg-white/5 border border-white/10 p-10 rounded-[2.5rem] overflow-hidden group hover:bg-white/10 transition-colors backdrop-blur-sm">
                {/* Numéro géant en filigrane */}
                <div className="absolute -right-4 -bottom-10 text-[12rem] font-black text-white/5 group-hover:text-[#00ad9f]/10 transition-colors duration-500 select-none pointer-events-none leading-none">
                  {step.step}
                </div>
                
                <div className="relative z-10">
                   <div className="mb-8 flex flex-col gap-4">
                      <step.icon className="h-10 w-10 text-[#00ad9f]" strokeWidth={1.5} />
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Étape {step.step}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                   <p className="text-base text-slate-300 leading-relaxed font-light">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-heavy" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">Techniques</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Clarifiez vos doutes avant l'intervention de nos experts.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-[1.5rem] px-4 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed px-4 pb-6 font-light">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] -z-20 pointer-events-none mix-blend-overlay" />
               
               <div className="relative z-10 space-y-8">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white mb-4 border border-white/5 backdrop-blur-md">
                   <HardHat className="h-4 w-4 text-[#00ad9f]" />
                   Intervention Spécialisée
                 </div>

                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Un objet <span className="text-[#00ad9f]">hors-norme</span> <br className="hidden md:block"/>
                    à déplacer ?
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Chaque cas est unique. Demandez une étude de faisabilité technique gratuite à nos experts pour sécuriser votre projet.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/dashboard/quote">
                          Demander une étude technique <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-slate-700 text-primary hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm" asChild>
                       <a href="tel:+33130751235">Parler à un expert levage</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}