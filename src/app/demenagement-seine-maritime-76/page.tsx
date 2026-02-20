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
  ArrowRight, 
  ChevronRight, 
  Map,
  Anchor,
  Home,
  Briefcase,
  LayoutGrid,
  Ship
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Seine-Maritime (76) | Expert Normand & Devis Gratuit",
  description: "Marne Transdem : votre expert pour déménager en Seine-Maritime (76). Rouen, Le Havre, Dieppe. Réactivité via notre agence d'Évreux. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-seine-maritime-76",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lefevre", text: "Le déménagement de notre maison de Paris vers Le Havre a été une vraie réussite. L'équipe a été très professionnelle et a parfaitement géré la longue distance. Une organisation sans faille !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre76` },
  { id: "fallback-2", name: "Sophie G.", text: "Un service client au top et une équipe de déménageurs très efficace pour mon appartement à Rouen. Ils connaissent bien les rues étroites du centre. Je recommande vivement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG76` },
  { id: "fallback-3", name: "Marc D.", text: "Devis clair, pas de surprise. Mon transfert de bureaux vers Dieppe s'est déroulé sans stress grâce à leur rigueur. Une entreprise normande fiable.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD76` },
];

const SEINE_MARITIME_CITIES = [
  "Le Havre", "Rouen", "Dieppe", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", 
  "Le Grand-Quevilly", "Le Petit-Quevilly", "Fécamp", "Elbeuf", "Mont-Saint-Aignan", 
  "Barentin", "Yvetot"
];

const WHY_US_ITEMS = [
  {
    icon: Ship,
    title: "Expertise Portuaire",
    description: "De Rouen au Havre, nous maîtrisons les défis logistiques des grandes zones portuaires et des centres historiques."
  },
  {
    icon: Truck,
    title: "Proximité Évreux",
    description: "Notre agence régionale nous permet une réactivité maximale pour vos visites techniques et interventions dans tout le 76."
  },
  {
    icon: ShieldCheck,
    title: "Soin Côte d'Albâtre",
    description: "Protection spécifique pour le mobilier lors de transferts littoraux (vent, humidité) pour une sécurité absolue."
  },
  {
    icon: Users,
    title: "Équipes Qualifiées",
    description: "Déménageurs salariés formés aux standards Marne Transdem pour un service respectueux et professionnel."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous les accès difficiles à Rouen ou Dieppe ?", 
    answer: "Les centres historiques normands ont des rues étroites. Nous réalisons une visite technique pour choisir le véhicule adapté (petit porteur) et gérons les autorisations de stationnement auprès de la mairie pour sécuriser l'opération." 
  },
  { 
    question: "Effectuez-vous des déménagements entre Paris et Le Havre ?", 
    answer: "Oui, c'est un axe majeur de notre activité. Nous organisons des voyages réguliers en direct ou en groupage (selon le volume) pour vous offrir un tarif compétitif sur cette liaison nationale." 
  },
  { 
    question: "Proposez-vous des solutions pour les entreprises en Seine-Maritime ?", 
    answer: "Absolument. Nous accompagnons les professionnels pour des transferts de bureaux, d'ateliers ou de commerces avec une planification qui minimise l'impact sur votre production." 
  },
  { 
    question: "Quelles sont vos garanties en cas de dommage ?", 
    answer: "Chaque déménagement est couvert par notre assurance contractuelle. Pour vos objets de grande valeur, nous proposons également des extensions d'assurance Ad Valorem personnalisées." 
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

export default function SeineMaritimePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/seine-maritime-76/1920/1080"
          alt="Falaises de la Seine-Maritime"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Seine-Maritime (76)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Anchor className="h-4 w-4" />
              L'expert Déménagement en Haute-Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                en Seine-Maritime.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Rouen au Havre, bénéficiez de l'expertise d'un déménageur local pour vos projets résidentiels et professionnels au meilleur prix.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
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
                Une logistique agile <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour la Vallée de la Seine</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                La Seine-Maritime est un département de caractère, alliant la densité urbaine de Rouen, la puissance portuaire du Havre et le charme de la Côte d'Albâtre. Déménager dans le 76 demande une parfaite connaissance des axes routiers (A13, A29) et des spécificités locales.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre agence d'Évreux, <strong>Déménagement du Vexin</strong> vous offre la réactivité d'un voisin et la force d'un leader. Nous gérons chaque étape, de la protection de votre patrimoine à la réservation du stationnement, pour un emménagement sans accroc.
              </p>
              
              <div className="pt-6">
                <Button asChild variant="outline" className="rounded-full border-[#00ad9f] text-[#00ad9f] hover:bg-[#00ad9f] hover:text-white transition-all">
                  <Link href="/notre-agence-evreux">Découvrir notre base opérationnelle</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/normandy-76/800/600"
                  alt="Déménageur pro à Rouen"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES GRID --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Nous couvrons l'ensemble du département
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Nos équipes d'Évreux rayonnent sur toutes les communes du 76.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {SEINE_MARITIME_CITIES.map((city) => (
              <div key={city} className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm font-bold text-slate-700 shadow-sm hover:border-[#00ad9f] hover:text-[#00ad9f] transition-all cursor-default">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grille d'avantages) --- */}
      <section id="why-us-76" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
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
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2rem] opacity-10 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/76-packing/800/600"
                  alt="Protection mobilier en Seine-Maritime"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque profil résidentiel.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements en Centre Historique</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection des parties communes et utilisation de monte-meubles pour les rues étroites de Rouen ou Dieppe.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts d'Entreprises & Commerces</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux bureaux et magasins : planification optimisée pour limiter l'arrêt de votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles sécurisé</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Besoin de stockage temporaire ? Profitez de nos solutions de box sécurisés à proximité immédiate.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
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
      <section id="faq-76" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout savoir pour préparer votre installation réussie dans le 76.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-200"
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
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ vers le 76 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Contactez nos experts régionaux pour une visite gratuite et obtenez un devis complet sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/dashboard/quote">
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