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
  Building, 
  Brush, 
  ArrowRight, 
  ChevronRight, 
  Map
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Vitry-sur-Seine (94) | Devis Gratuit & Rapide",
  description: "Déménageur expert à Vitry-sur-Seine. Nous gérons les accès difficiles, les grands ensembles et le transport de vos biens avec soin. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-vitry-sur-seine-94400",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dubois", text: "Déménagement de notre appartement à Vitry parfaitement orchestré. L'équipe a géré les accès à l'immeuble avec une grande efficacité. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois94` },
  { id: "fallback-2", name: "Marc T.", text: "Très bonne expérience. De la prise de contact au jour J, tout a été fluide et sans stress. Une entreprise sérieuse et fiable pour un déménagement à Vitry.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcT94` },
  { id: "fallback-3", name: "Atelier Créa", text: "Le transfert de notre atelier d'artiste a été une réussite. L'équipe a pris un soin particulier de nos œuvres et de notre matériel. Des vrais pros !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Crea94` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Vitry",
    description: "Du centre-ville aux zones résidentielles, nous connaissons les rues, les sens uniques et les règles de stationnement."
  },
  {
    icon: Building,
    title: "Grands Ensembles",
    description: "Nos équipes ont l'habitude d'intervenir dans les grandes résidences et de gérer la logistique des ascenseurs et couloirs."
  },
  {
    icon: Truck,
    title: "Matériel Adapté",
    description: "Si les accès sont restreints, nous déployons nos monte-meubles pour un passage par fenêtre rapide et sécurisé."
  },
  {
    icon: Brush,
    title: "Soin et Attention",
    description: "Vitry étant une ville d'art, nous sommes formés pour emballer et transporter vos œuvres et objets fragiles avec la plus grande délicatesse."
  }
];

const FAQS = [
  { question: "Comment se déroule un déménagement dans un grand immeuble à Vitry ?", answer: "La préparation est la clé. Nous effectuons une visite technique pour évaluer la situation, nous nous renseignons sur le règlement de copropriété pour les horaires et nous réservons les ascenseurs ou un emplacement pour notre monte-meubles." },
  { question: "Le stationnement est-il difficile à obtenir pour un camion à Vitry ?", answer: "Le stationnement en ville dense est un défi, mais c'est notre métier. Pour nos formules Standard et Confort, nous nous occupons de la demande d'autorisation auprès de la mairie bien à l'avance pour vous garantir un emplacement exclusif le jour J." },
  { question: "J'ai des œuvres d'art à déménager, avez-vous une expertise ?", answer: "Oui, Vitry-sur-Seine est reconnue pour son dynamisme artistique. Nous avons l'habitude de manipuler des toiles, des sculptures et du matériel d'atelier. Nous utilisons des emballages spécifiques (papier de soie, bullkraft, caisses) pour une protection maximale." },
  { question: "Quelles sont vos formules pour un petit appartement ?", answer: "Nous proposons des formules flexibles. Notre formule 'Économique' (où vous emballez vos cartons et nous gérons le portage et le transport) est très appréciée des étudiants et jeunes actifs pour maîtriser les coûts tout en ayant des pros pour les meubles lourds." }
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

export default function VitrySurSeinePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/vitry-city/1920/1080"
          alt="Vue urbaine et dynamique de Vitry-sur-Seine"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-val-de-marne-94" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Vitry-sur-Seine</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Expert Local 94
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Vitry-sur-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution efficace, locale et professionnelle pour votre projet à Vitry (94400), ville d'art et de dynamisme.
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
                Une connaissance <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">parfaite du terrain</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Vitry-sur-Seine, la plus grande ville du Val-de-Marne, demande une connaissance approfondie de son tissu urbain dense et varié. C'est une ville en pleine transformation qui présente des défis logistiques que seuls des professionnels peuvent relever avec brio.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Que vous emménagiez dans un appartement en centre-ville, un grand ensemble résidentiel ou un atelier d'artiste, nous planifions chaque détail pour garantir un déménagement fluide, rapide et sans stress.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Building className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Immeubles,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès difficiles.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/vitry-team/800/600"
                  alt="Équipe professionnelle en intervention urbaine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-vitry" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour Vitry
            </h2>
            <p className="text-lg text-slate-500">
              Notre proximité géographique est votre meilleure garantie pour un service ponctuel et réactif.
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
                  src="https://picsum.photos/seed/vitry-packing/800/600"
                  alt="Protection d'objets pour un déménagement"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque projet.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Passage délicat dans les cages d'escaliers, utilisation de monte-meubles jusqu'aux étages élevés.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Emballage de gros volumes, démontage de mobilier lourd et protection des sols.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Bureaux & Ateliers d'Artistes</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Transfert d'équipements professionnels, matériel informatique et œuvres fragiles avec un emballage premium.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-vitry" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
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
               
               {/* Deco de fond fluide (Ajout de pointer-events-none vital) */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Vitry ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit en un rien de temps.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Mon devis gratuit pour Vitry <ArrowRight className="ml-2 h-4 w-4" />
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
