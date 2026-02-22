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
  Users, 
  Building2, 
  Truck, 
  TreePine,
  Gem,
  ArrowRight, 
  ChevronRight, 
  Map,
  Sparkles,
  ShieldAlert,
  Briefcase,
  Home,
  MoveUp
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Saint-Mandé (94) | Service Prestige & Devis Gratuit",
  description: "Déménageur de confiance à Saint-Mandé (94220). Spécialiste immeubles de standing, bordure du Bois de Vincennes et objets de valeur. Devis sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-saint-mande-94220",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dufresne", text: "Un déménagement géré avec un professionnalisme rare. L'équipe a été particulièrement soigneuse avec nos meubles anciens et a respecté la quiétude de l'immeuble. Service impeccable à Saint-Mandé.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufresne94` },
  { id: "fallback-2", name: "Charles E.", text: "Très satisfait. Ils ont obtenu l'autorisation de stationnement dans une rue complexe près de la mairie et le déménagement s'est déroulé rapidement. Une logistique parfaite.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=CharlesE94` },
  { id: "fallback-3", name: "Cabinet Médical", text: "Le transfert de notre matériel s'est fait avec discrétion et efficacité. Une équipe très professionnelle et à l'écoute de nos contraintes de planning. À recommander pour le B2B.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MedicalSM` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise du 94220",
    description: "Nous maîtrisons chaque rue, sens unique et zone de stationnement complexe de Saint-Mandé pour une logistique chirurgicale."
  },
  {
    icon: Gem,
    title: "Soin Bâtis de Standing",
    description: "Protection intégrale des parties communes, moulures et parquets dans les immeubles de caractère saint-mandéens."
  },
  {
    icon: TreePine,
    title: "Bordure Bois de Vincennes",
    description: "Expertise des accès spécifiques sur l'Avenue Daumesnil et l'ensemble des rues riveraines du bois."
  },
  {
    icon: ShieldAlert,
    title: "Discrétion & Sécurité",
    description: "Interventions confidentielles et ultra-sécurisées pour le transport de votre patrimoine et de vos objets de grande valeur."
  }
];

const FAQS = [
  { 
    question: "Le stationnement est-il garanti devant mon domicile à Saint-Mandé ?", 
    answer: "Oui, Saint-Mandé est une ville dense où le stationnement est un défi. Nous gérons intégralement la demande d'arrêté municipal de stationnement (environ 15 jours à l'avance) pour bloquer l'espace nécessaire au pied de votre immeuble." 
  },
  { 
    question: "Comment protégez-vous les objets d'art et le mobilier fragile ?", 
    answer: "Nous utilisons des matériaux de protection premium : couvertures lourdes, housses matelassées spécifiques pour matelas et canapés, et bullkraft pour les pièces délicates. Pour le mobilier de designer ou l'art, nous effectuons un emballage 'gants blancs'." 
  },
  { 
    question: "L'utilisation d'un monte-meubles est-elle indispensable ?", 
    answer: "À Saint-Mandé, beaucoup d'immeubles possèdent des cages d'escalier étroites, des boiseries fragiles ou des ascenseurs interdits au transport de meubles. Le monte-meubles extérieur est souvent la solution la plus sûre et la plus rapide." 
  },
  { 
    question: "Quels sont vos délais pour obtenir un devis ?", 
    answer: "Nous sommes très réactifs. Nous réalisons une visite technique sous 48h (physique ou en visio, selon vos disponibilités). Votre devis détaillé, transparent et sans aucun frais caché, vous est ensuite envoyé sous 24h ouvrées." 
  }
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

export default function SaintMandePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménagement haut de gamme en préparation"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Saint-Mandé</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Service Déménagement Haute Protection
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Déménager à <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Saint-Mandé.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour l'écrin du Val-de-Marne (94220). Une maîtrise absolue des résidences de standing et de la proximité du Bois de Vincennes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
                Une logistique d'orfèvre <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour une ville d'exception</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Saint-Mandé est un territoire unique où l'élégance architecturale rencontre la sérénité du Bois de Vincennes. Déménager dans ce secteur demande bien plus qu'une simple manutention : c'est un engagement de discrétion, de respect du voisinage et de protection absolue du patrimoine.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons chaque spécificité de la commune. Que vous emménagiez dans un appartement de standing surplombant le bois ou un immeuble bourgeois du centre, nous planifions chaque détail pour garantir une transition fluide et hautement confidentielle.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Gem className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste Biens de Valeur</h3>
                   <p className="text-slate-500 font-light">Protection d'œuvres d'art, pianos et mobilier de créateur ou d'époque.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-saint-mande.webp"
                  alt="Équipe de déménagement professionnelle intervenant à Saint-Mandé"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-saint-mande" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence pour le 94
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance des exigences de Saint-Mandé est votre meilleure garantie de sérénité.
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

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur protégeant un objet de valeur avec un soin extrême"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque exigence.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements de Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection totale des parties communes (parquets, boiseries) et utilisation de monte-meubles pour préserver les cages d'escalier historiques.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formule "Prestige" Intégrale</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déléguez tout. Nous emballons vos effets les plus fragiles, vos vêtements, transportons le tout et réinstallons votre intérieur pour un confort absolu.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels & Cabinets</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déménagement de cabinets médicaux ou juridiques avec une confidentialité totale de vos dossiers et archives sensibles.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir le détail de nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-saint-mande" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Saint-Mandé.</p>
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
                      départ de Saint-Mandé ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne confiez pas votre patrimoine au hasard. Contactez nos experts pour une étude technique confidentielle et recevez un devis détaillé sous 24h.
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