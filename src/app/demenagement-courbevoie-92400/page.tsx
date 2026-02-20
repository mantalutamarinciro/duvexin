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
  ArrowRight, 
  ChevronRight, 
  Map,
  Briefcase,
  Building2,
  MoveUp
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Courbevoie (92) | Expert La Défense & Devis Gratuit",
  description: "Déménageur de confiance à Courbevoie (92400). Spécialiste des tours de La Défense, du Faubourg de l'Arche et de Bécon. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-courbevoie-92400",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Société Vision IT", text: "Le transfert de notre siège dans une des tours de Courbevoie a été parfaitement orchestré. Discrétion, rapidité et professionnalisme. Je recommande pour tout déménagement d'entreprise à La Défense.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=VisionIT92` },
  { id: "fallback-2", name: "Valérie et Luc", text: "Déménagement de notre 4 pièces à Courbevoie sans le moindre souci. L'équipe a été très prudente avec nos affaires et a géré le monte-meubles de manière très pro.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=ValerieLuc92` },
  { id: "fallback-3", name: "Julien R.", text: "Excellent service pour mon déménagement au Faubourg de l'Arche. Devis respecté, équipe ponctuelle et efficace. Rien à redire.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=JulienR92` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Courbevoie",
    description: "Du Faubourg de l'Arche au quartier de Bécon, nous maîtrisons chaque accès et plan de circulation du 92400."
  },
  {
    icon: Building2,
    title: "Spécialiste La Défense",
    description: "Une grande expérience des interventions en tours (IGH) : gestion des monte-charges et protocoles de sécurité."
  },
  {
    icon: MoveUp,
    title: "Logistique & Monte-Meubles",
    description: "Déploiement de solutions de levage extérieur pour sécuriser vos biens et préserver les parties communes."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie de Courbevoie."
  }
];

const FAQS = [
  { question: "Comment organisez-vous un déménagement dans une tour à La Défense ?", answer: "La planification est la clé. Nous coordonnons l'intervention avec le PC sécurité et le régisseur de la tour pour réserver les monte-charges et définir les zones de déchargement. Nos équipes respectent scrupuleusement les horaires et les protocoles de sécurité propres aux immeubles de grande hauteur." },
  { question: "L'utilisation d'un monte-meubles est-elle indispensable à Courbevoie ?", answer: "Elle est très fréquente. Dans les résidences modernes comme au Faubourg de l'Arche ou dans l'ancien à Bécon, cela permet d'éviter les cages d'escalier étroites, de protéger vos meubles volumineux et de diviser le temps de manutention par deux." },
  { question: "Intervenez-vous dans les quartiers résidentiels comme Bécon-les-Bruyères ?", answer: "Absolument. Nous adaptons nos véhicules (petits porteurs) pour circuler facilement dans les rues résidentielles plus calmes. Nous protégeons scrupuleusement les sols et les jardins lors du portage pour les maisons individuelles." },
  { question: "Prenez-vous en charge les démarches de stationnement ?", answer: "Oui, nous nous occupons de tout. La demande d'arrêté municipal doit être déposée en mairie plusieurs jours avant. Nous balisons l'emplacement pour garantir que le camion puisse stationner au plus proche de votre entrée le jour J." }
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

export default function CourbevoiePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/courbevoie-skyline/1920/1080"
          alt="Vue panoramique de Courbevoie et des tours de La Défense"
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
            <Link href="/demenagement-hauts-de-seine-92" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Courbevoie</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Building className="h-4 w-4" />
              Spécialiste La Défense & Courbevoie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Courbevoie.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution experte pour les entreprises et les particuliers au cœur du premier quartier d'affaires européen. Logistique de précision et sécurité garantie.
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
                Maîtriser la complexité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">du tissu urbain dense</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Courbevoie est une ville de contrastes, alliant la verticalité des tours de bureaux à des quartiers résidentiels très denses. Déménager dans cet environnement exige une agilité que seuls des professionnels habitués au secteur possèdent.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons les protocoles spécifiques de La Défense comme les accès étroits de Bécon. Nous coordonnons chaque étape (autorisations mairie, monte-meubles, sécurité) pour que votre déménagement, qu'il soit professionnel ou privé, se déroule sans aucune interruption.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Briefcase className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Tertiaire,<br/> <span className="text-slate-500 font-normal text-sm">transferts de bureaux et sièges sociaux.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/courbevoie-team-92/800/600"
                  alt="Équipe de déménagement professionnelle en action à Courbevoie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-courbevoie" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 92
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une logistique de pointe adaptée aux exigences de Courbevoie et de La Défense.
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
                  src="https://picsum.photos/seed/la-defense-packing/800/600"
                  alt="Déménageur préparant du matériel informatique pour un transfert"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transfert de Bureaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux tours de La Défense : inventaire rigoureux, emballage informatique et travail en horaires décalés.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et utilisation systématique de monte-meubles pour sécuriser le portage en étage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre 'Économique' à la prestation 'Confort' (emballage complet et remise en place), nous nous adaptons à vos besoins.</p>
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
      <section id="faq-courbevoie" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Courbevoie.</p>
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
               
               {/* Deco de fond fluide */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Courbevoie ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les tours de bureaux vous stresser. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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
