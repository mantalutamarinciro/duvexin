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
  Building, 
  Truck, 
  Waves,
  ArrowRight, 
  ChevronRight, 
  Map,
  Home,
  Anchor
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Herblay-sur-Seine (95) | Expert local & Devis Gratuit",
  description: "Déménageur de confiance à Herblay (95220). Spécialiste des bords de Seine, pavillons et appartements. Devis gratuit sous 24h et visite technique.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-herblay-sur-seine-95220",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Gaudin", text: "Notre déménagement à Herblay s'est déroulé à merveille. L'équipe a été très professionnelle et a su s'adapter aux accès étroits des quais de Seine. Un service de grande qualité.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gaudin95` },
  { id: "fallback-2", name: "Antoine C.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et matériel de qualité. Déménager à Herblay a été bien plus simple que prévu grâce à leur monte-meubles.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=AntoineC95` },
  { id: "fallback-3", name: "Mme. Rousseau", text: "Efficacité et bonne humeur. Je recommande Déménagement du Vexin pour tout projet à Herblay-sur-Seine. Des vrais pros qui connaissent le 95 !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Rousseau95` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise d'Herblay",
    description: "Des bords de Seine aux hauteurs de la ville, nous maîtrisons chaque accès et plan de circulation du 95220."
  },
  {
    icon: Anchor,
    title: "Spécialiste Quais",
    description: "Habitués aux berges de Seine, nous adaptons notre logistique aux contraintes de stationnement et de trafic fluvial."
  },
  {
    icon: Truck,
    title: "Logistique Agile",
    description: "Véhicules de tailles variées et monte-meubles performants pour les rues étroites du centre-ville ou les pavillons."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons les demandes d'autorisation de stationnement auprès de la mairie d'Herblay pour sécuriser le jour J."
  }
];

const FAQS = [
  { 
    question: "Comment organisez-vous un déménagement sur les quais d'Herblay ?", 
    answer: "Les bords de Seine sont magnifiques mais exigeants. Nous réalisons une visite technique pour évaluer la largeur de rue et le portage. Nous gérons l'arrêté municipal pour bloquer l'emplacement du camion et planifions l'intervention pour minimiser la gêne sur ce secteur très fréquenté." 
  },
  { 
    question: "Déménagez-vous les maisons avec des jardins ou accès compliqués ?", 
    answer: "C'est notre spécialité. Pour les pavillons herblaysiens, nous utilisons si besoin des échelles électriques ou des monte-meubles pour passer par les fenêtres, protégeant ainsi vos parquets, escaliers et portails." 
  },
  { 
    question: "Intervenez-vous dans la zone commerciale d'Herblay ?", 
    answer: "Oui, nous accompagnons les entreprises et commerces de la Patte d'Oie d'Herblay pour leurs transferts. Nous proposons des interventions rapides en dehors des flux de clientèle pour ne pas impacter votre activité." 
  },
  { 
    question: "Quelles sont les formules pour les jeunes actifs ?", 
    answer: "La formule 'Économique' est idéale pour les petits volumes (studios/T2). Vous gérez l'emballage, et nos déménageurs pro s'occupent de la protection du mobilier sous couvertures, de la manutention lourde et du transport sécurisé." 
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

export default function HerblaySurSeinePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/herblay-seine/1920/1080"
          alt="Vue sur les bords de Seine à Herblay-sur-Seine"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-val-d-oise-95" className="hover:text-white transition-colors">Val-d'Oise (95)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Herblay-sur-Seine</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Waves className="h-4 w-4" />
              Spécialiste Bords de Seine
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Herblay-sur-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique experte pour les pavillons et résidences herblaysiennes (95220). Maîtrise des accès et service de proximité pour une transition sereine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
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
                L'expertise d'un pro <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour le cadre de vie herblaysien</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Herblay-sur-Seine séduit par son équilibre entre charme fluvial et dynamisme commercial. Que vous emménagiez dans une maison de caractère sur les quais ou un pavillon moderne sur les hauteurs, les défis logistiques sont réels.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité locale. De la gestion du stationnement en centre-ville à la préservation de vos extérieurs lors du portage, nous planifions chaque detail pour garantir une prestation fluide et sécurisée.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Home className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Habitat,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès pavillonnaires et urbains.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/herblay-move-team/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Herblay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-herblay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 95
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance du terrain herblaysien est votre meilleure garantie de ponctualité.
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

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2rem] opacity-10 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/herblay-packing/800/600"
                  alt="Déménageur protégeant du mobilier avec soin à Herblay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes (ascenseurs, sols) et utilisation de monte-meubles pour les étages élevés.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Pavillons & Villas Seine</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les jardins et entrées étroites avec emballage scrupuleux de vos objets précieux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre 'Éco' à la prestation 'Confort' (emballage complet), nous nous adaptons à vos besoins et budget.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/services">Voir tous nos services</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-herblay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie à Herblay.</p>
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Prêt pour votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ d'Herblay ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les accès pavillonnaires vous stresser. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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
