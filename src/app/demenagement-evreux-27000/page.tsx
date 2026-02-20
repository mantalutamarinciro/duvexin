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
  Star, 
  Users, 
  Building, 
  Truck,
  ArrowRight,
  ChevronRight,
  Map,
  Home,
  Briefcase,
  Store
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Évreux (27) | Votre Agence Locale de Confiance",
  description: "Déménageur expert basé à Évreux (27000). Service de proximité pour particuliers et entreprises dans l'Eure. Devis gratuit sous 24h et visite à domicile.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-evreux-27000",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle à Évreux, vraiment rien à dire, du très bon travail ! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés !", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Déménagement parfaitement réalisé au départ d'Évreux. Professionnel du début jusqu'à la livraison finale. Équipe efficace, rapide et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé par la réactivité de l'agence d'Évreux. Je recommande totalement. MERCI !", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Ancrage local total",
    description: "Basés à Évreux, nous connaissons chaque quartier, de Navarre à Nétreville, pour une logistique sans faille."
  },
  {
    icon: Users,
    title: "Équipes Ébroïciennes",
    description: "Nos déménageurs sont des professionnels locaux, salariés de l'entreprise, engagés pour leur communauté."
  },
  {
    icon: Truck,
    title: "Agilité Urbaine",
    description: "Maîtrise des accès du centre-ville historique et gestion des autorisations de stationnement auprès de la mairie."
  },
  {
    icon: ShieldCheck,
    title: "Qualité & Réactivité",
    description: "Un interlocuteur unique dans notre agence locale pour un suivi personnalisé de A à Z."
  }
];

const FAQS = [
  { question: "Quels sont les avantages de passer par votre agence d'Évreux ?", answer: "La proximité est notre force : nous réalisons des visites techniques gratuites sous 24h, nous pouvons vous livrer vos cartons immédiatement et nous gérons les imprévus avec une flexibilité totale. C'est l'assurance d'un service 'voisin' avec la rigueur d'un grand pro." },
  { question: "Comment gérez-vous le stationnement dans le centre d'Évreux ?", answer: "Nous connaissons parfaitement les règles de la ville. Nous déposons les demandes d'arrêtés municipaux 15 jours avant le déménagement pour réserver l'emplacement exact au pied de votre domicile, garantissant sécurité et rapidité." },
  { question: "Intervenez-vous dans les communes autour d'Évreux ?", answer: "Oui, nous couvrons toute l'agglomération Évreux Portes de Normandie : Guichainville, Arnières-sur-Iton, Gravigny, Saint-Sébastien-de-Morsent, etc. Nous sommes votre partenaire numéro 1 dans tout le département de l'Eure." },
  { question: "Je quitte l'Eure pour une autre région, est-ce possible ?", answer: "Absolument. Spécialistes du déménagement national, nous organisons votre départ d'Évreux vers n'importe quelle destination en France (Bretagne, Sud, Alpes...) avec des tournées optimisées pour des tarifs compétitifs." }
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

export default function EvreuxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/evreux-cathedral/1920/1080"
          alt="La cathédrale Notre-Dame d'Évreux, cœur de la ville"
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
            <Link href="/zones" className="hover:text-white transition-colors">Eure (27)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Évreux</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Agence Régionale Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Évreux.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Profitez d'un service de proximité inégalé avec notre agence au cœur de l'Eure. Savoir-faire, réactivité et expertise locale pour une transition en toute sérénité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Estimation gratuite à domicile <ArrowRight className="ml-2 h-4 w-4" />
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
                Le cœur de l'Eure, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">notre terrain de jeu quotidien</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Capitale de l'Eure, Évreux allie patrimoine historique et dynamisme économique. En tant qu'entreprise implantée localement, nous ne sommes pas seulement vos déménageurs : nous sommes vos voisins.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité ébroïcienne. Que vous emménagiez dans un appartement du centre-ville ou un pavillon dans les nouveaux quartiers, nous garantissons une logistique fluide, rapide et parfaitement sécurisée.
              </p>
              
              <div className="pt-6">
                 <Button asChild variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:text-[#00ad9f] hover:border-[#00ad9f]">
                    <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence locale</Link>
                 </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/evreux-team-action/800/600"
                  alt="Équipe professionnelle de déménagement à Évreux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-evreux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'avantage de la proximité
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Être basé à Évreux nous permet de vous offrir une flexibilité et une réactivité que les entreprises nationales ne peuvent égaler.
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
                  src="https://picsum.photos/seed/evreux-packing-furniture/800/600"
                  alt="Déménageur protégeant du mobilier fragile"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Déménagement Particuliers</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la formule Éco au service Tout Confort incluant l'emballage de vos objets fragiles et objets d'art.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux entreprises de l'Eure : transfert d'archives, informatique et mobilier pro.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Store className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles Sécurisé</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution de stockage flexible dans nos entrepôts ébroïciens pour vos périodes de transition.</p>
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
      <section id="faq-evreux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout savoir pour déménager sereinement à Évreux.</p>
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
                    <span className="text-[#00ad9f]">départ d'Évreux ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne confiez pas votre projet à n'importe qui. Contactez vos voisins experts pour un devis gratuit, transparent et sans engagement.
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