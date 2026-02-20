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
  Truck, 
  Gem, 
  Waves,
  ArrowRight, 
  ChevronRight, 
  Map,
  Anchor,
  Star
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Deauville (14) | Service Prestige & Standing",
  description: "Déménageur expert à Deauville (14800). Spécialiste des villas de la Côte Fleurie, mobilier de luxe et résidences secondaires. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-deauville-14800",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dufour", text: "Notre déménagement de Paris à notre résidence secondaire de Deauville a été géré de main de maître. L'équipe a été très professionnelle et discrète. Un service à la hauteur du lieu.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour14` },
  { id: "fallback-2", name: "H. de la Roche", text: "Excellent service. Ils ont su gérer le stationnement en pleine saison et le déménagement de mon appartement s'est fait sans une égratignure. Je recommande vivement.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HdeLaRoche14` },
  { id: "fallback-3", name: "Boutique de Luxe", text: "Le transfert de notre boutique a été réalisé avec un soin infini pour notre stock et notre mobilier. Une équipe de confiance pour le transport d'objets précieux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Luxe14` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Deauville",
    description: "Des Planches au centre-ville, nous maîtrisons les accès et les réglementations de la plus célèbre des stations balnéaires."
  },
  {
    icon: Gem,
    title: "Prestations Prestige",
    description: "Soin extrême pour vos villas et appartements de standing. Protection renforcée de vos œuvres d'art et mobilier de créateur."
  },
  {
    icon: Waves,
    title: "Gestion Saisonnière",
    description: "Nous planifions nos interventions selon l'affluence estivale et gérons les autorisations de voirie complexes en haute saison."
  },
  {
    icon: ShieldCheck,
    title: "Hub Normandie",
    description: "Grâce à notre base d'Évreux, nous offrons une réactivité totale pour vos projets sur toute la Côte Fleurie."
  }
];

const FAQS = [
  { question: "Comment organisez-vous un déménagement en haute saison à Deauville ?", answer: "La clé est l'anticipation. Nous déposons les demandes de stationnement 3 semaines à l'avance. Nous privilégions les interventions matinales pour éviter les flux touristiques et garantissons un périmètre sécurisé pour le camion et le monte-meubles." },
  { question: "Déménagez-vous les résidences secondaires ?", answer: "C'est notre cœur de métier dans le Calvados. Nous pouvons coordonner l'intégralité de l'opération avec votre gardien ou un mandataire si vous n'êtes pas sur place. Nous réalisons des reportages photos avant/après pour une sérénité totale." },
  { question: "Comment protégez-vous le mobilier de très haute valeur ?", answer: "Nous utilisons des techniques d'emballage muséales : papier de soie, bullkraft, caisses en bois sur-mesure pour les tableaux et housses capitonnées pour le mobilier fragile. Nos équipes sont spécifiquement formées à la manutention d'objets d'art." },
  { question: "Proposez-vous des prestations clé en main (Full Service) ?", answer: "Oui, notre formule 'Prestige' inclut l'emballage complet (vaisselle, livres, vêtements sur penderies), le démontage, le transport, le remontage et même le déballage pour une installation immédiate." }
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

export default function DeauvillePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/deauville-planches/1920/1080"
          alt="Les célèbres planches de Deauville et ses parasols colorés"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-calvados-14" className="hover:text-white transition-colors">Calvados (14)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Deauville</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Gem className="h-4 w-4" />
              Service Excellence & Standing
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Deauville.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Un service d'exception pour votre projet dans la plus glamour des stations normandes. Discrétion, soin infini et logistique de haut standing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis Prestige <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                L'élégance exige <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">une logistique impeccable</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Deauville, c'est intégrer un cadre de vie prestigieux. Ce standing exige un déménageur capable de manipuler des pièces de designer, des antiquités et des œuvres d'art avec une précision chirurgicale.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre antenne normande, nous sommes l'expert de référence sur la Côte Fleurie. Que vous emménagiez dans une villa anglo-normande historique ou un appartement avec vue mer, nous assurons une organisation millimétrée pour une transition en toute discrétion.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Star className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Biens de Valeur,<br/> <span className="text-slate-500 font-normal text-sm">protection muséale pour vos intérieurs.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/deauville-villa-move/800/600"
                  alt="Déménagement d'une villa de standing à Deauville"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-deauville" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le luxe du sur-mesure
            </h2>
            <p className="text-lg text-slate-500">
              Une connaissance absolue de la Côte Fleurie pour une installation sans le moindre accroc.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
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

      {/* --- SERVICES STANDING --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2rem] opacity-10 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/deauville-art-pack/800/600"
                  alt="Emballage haute protection pour œuvres d'art"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations <br/> <span className="text-[#00ad9f]">haute couture.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Anchor className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Villas & Résidences Secondaires</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Gestion complète en votre absence, coordination avec le personnel de maison et remise en place à l'identique.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Gem className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Objets d'Art & Mobiliers Précieux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Mise en caisse bois sur-mesure, transport climatisé si requis et assurance Ad Valorem haut de gamme.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formule \"Prestige\"</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service gants blancs incluant l'emballage complet de vos effets, déballage et aide à l'aménagement.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/services">Explorer nos services</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-deauville" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour une installation sereine dans le 14.</p>
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
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">arrivée à Deauville ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Confiez votre mobilier et vos objets précieux à des professionnels du standing. Contactez-nous pour une étude personnalisée et recevez un devis détaillé sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-4 w-4" />
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
