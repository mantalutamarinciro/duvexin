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
  Palette,
  ArrowRight, 
  ChevronRight, 
  Map,
  Anchor,
  Home,
  Waves
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Honfleur (14) | Expert local & Côte Fleurie | Devis Gratuit",
  description: "Déménageur de confiance à Honfleur (14600). Spécialiste du centre historique, du Vieux Bassin et des galeries d'art. Devis gratuit sous 24h et visite technique.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-honfleur-14600",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Le Gall", text: "Déménagement dans le centre de Honfleur parfaitement géré. L'équipe a été très professionnelle et a su s'adapter aux rues étroites et à l'affluence du Vieux Bassin. Un service exemplaire.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=LeGall14` },
  { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience. Devis clair, équipe ponctuelle et surtout très soigneuse. Un déménagement sans stress dans cette ville magnifique. Je recommande pour le Calvados.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14H` },
  { id: "fallback-3", name: "Galerie du Port", text: "Le transport de nos œuvres a été mené avec un soin et une rigueur exemplaires. Une équipe de confiance pour manipuler des pièces de valeur. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Galerie14` },
];

const WHY_US_ITEMS = [
  {
    icon: Anchor,
    title: "Expertise de Honfleur",
    description: "Du Vieux Bassin aux hauteurs de la Côte de Grâce, nous maîtrisons chaque accès et plan de circulation du 14600."
  },
  {
    icon: Palette,
    title: "Respect du Patrimoine",
    description: "Protection spécifique pour les maisons à colombages et manipulation experte de votre mobilier précieux ou œuvres d'art."
  },
  {
    icon: Truck,
    title: "Logistique de Standing",
    description: "Utilisation de monte-meubles silencieux et de véhicules adaptés aux rues pittoresques du centre historique."
  },
  {
    icon: ShieldCheck,
    title: "Hub Normandie",
    description: "Grâce à notre agence régionale, nous offrons une réactivité maximale et des tarifs compétitifs sur toute la Côte Fleurie."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement dans le centre ancien de Honfleur ?", 
    answer: "Le centre médiéval demande une planification millimétrée. Nous réalisons une visite technique pour choisir le véhicule adapté aux rues pavées. Nous gérons également l'autorisation de stationnement auprès de la mairie de Honfleur pour sécuriser l'emplacement au plus près de votre porte." 
  },
  { 
    question: "Assurez-vous le transport d'objets d'art et tableaux ?", 
    answer: "Oui, c'est l'une de nos spécialités dans la cité des peintres. Nous utilisons des emballages spécifiques (bullkraft renforcé, caisses sur-mesure) et nos équipes sont formées au portage délicat pour garantir une sécurité totale de vos œuvres." 
  },
  { 
    question: "Intervenez-vous pour les résidences secondaires sur la Côte Fleurie ?", 
    answer: "Absolument. Nous couvrons tout le littoral, de Honfleur à Deauville-Trouville. Nous pouvons coordonner l'intégralité de l'opération avec votre gardien ou un mandataire si vous n'êtes pas sur place." 
  },
  { 
    question: "Quelles sont les formules pour les appartements de ville ?", 
    answer: "La formule 'Économique' est parfaite pour les studios ou résidences secondaires. Vous emballez vos cartons, et nos déménageurs pros s'occupent de la protection du mobilier, de la manutention lourde et du transport sécurisé." 
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

export default function HonfleurPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/honfleur-harbor/1920/1080"
          alt="Le Vieux Bassin de Honfleur sous le soleil"
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
            <Link href="/demenagement-calvados-14" className="hover:text-white transition-colors">Calvados (14)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Honfleur</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Palette className="h-4 w-4" />
              Cité des Peintres & Standing
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Honfleur.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour vos projets dans le joyau de l'estuaire (14600). Soin infini, discrétion et respect du patrimoine normand.
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
                L'expertise d'un pro <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour le joyau de la Côte Fleurie</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Honfleur séduit par son charme intemporel, ses ruelles étroites et ses maisons historiques. Mais ce cadre exceptionnel impose des défis logistiques réels. Déménager dans ce secteur demande une agilité et un respect du patrimoine que seuls des spécialistes maîtrisent.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous connaissons chaque recoin de la cité médiévale. Que vous emménagiez dans une demeure de caractère du centre-ville ou un appartement sur les hauteurs, nous planifions chaque détail pour garantir une prestation fluide et sécurisée.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Waves className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Littoral,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès portuaires et saisonniers.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/honfleur-team-move/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Honfleur"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-honfleur" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix en Normandie
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance du terrain calvadosien est votre meilleure garantie de ponctualité.
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
                  src="https://picsum.photos/seed/honfleur-art-packing/800/600"
                  alt="Déménageur protégeant une peinture précieuse à Honfleur"
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
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Centre-Ville</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et utilisation de monte-meubles pour les accès complexes du centre historique.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Palette className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Galeries d'Art & Antiquités</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée au transport d'œuvres précieuses avec emballage spécifique et assurance Ad Valorem sur-mesure.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre 'Éco' à la prestation 'Confort' incluant l'emballage intégral pour un gain de temps total.</p>
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
      <section id="faq-honfleur" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour préparer votre installation réussie à Honfleur.</p>
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
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Honfleur ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les rues étroites vous stresser. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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
