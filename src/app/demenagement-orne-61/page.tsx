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
  Trees,
  ArrowRight, 
  ChevronRight, 
  Map,
  Home,
  Briefcase,
  Compass
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Orne (61) | Expert Normand & Devis Gratuit",
  description: "Marne Transdem : votre expert pour déménager dans l'Orne (61). Alençon, Flers, Argentan et le Perche. Réactivité via notre agence d'Évreux. Devis gratuit.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-orne-61",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Gauthier", text: "Un déménagement de l'Île-de-France vers notre nouvelle maison dans le Perche qui s'est déroulé à merveille. L'équipe a parfaitement géré les accès difficiles du chemin rural. Professionnels et attentionnés.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gauthier61` },
  { id: "fallback-2", name: "Sophie D.", text: "Installation à Alençon réussie. La proximité de leur agence d'Évreux est un vrai plus pour la réactivité. Devis respecté à l'euro près et personnel très poli.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieD61` },
  { id: "fallback-3", name: "Marc L.", text: "Transfert de mes bureaux vers Argentan. Organisation sans faille, ponctualité et protection impeccable du matériel informatique. Une entreprise de confiance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcL61` },
];

const ORNE_CITIES = [
  "Alençon", "Flers", "Argentan", "L'Aigle", "La Ferté-Macé", 
  "Mortagne-au-Perche", "Sées", "Domfront en Poiraie", "Vimoutiers", "Gacé"
];

const WHY_US_ITEMS = [
  {
    icon: Compass,
    title: "Expertise du 61",
    description: "Du Perche aux collines de la Suisse Normande, nous maîtrisons la logistique rurale et urbaine du département."
  },
  {
    icon: Truck,
    title: "Proximité Évreux",
    description: "Notre ancrage régional nous permet d'intervenir rapidement pour les visites techniques et le jour J dans toute l'Orne."
  },
  {
    icon: Home,
    title: "Spécialiste Longères",
    description: "Habitués aux contraintes des maisons de campagne : chemins étroits, cours de ferme et protection des extérieurs."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Sérénité",
    description: "Assurance contractuelle incluse et interlocuteur unique pour coordonner votre projet de A à Z."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous les accès difficiles en campagne ornaise ?", 
    answer: "C'est notre spécialité. Nous réalisons une visite technique (physique ou visio) pour évaluer l'étroitesse des chemins. Si besoin, nous utilisons des véhicules légers ou organisons un transbordement pour garantir l'arrivée de vos biens sans dommage." 
  },
  { 
    question: "Intervenez-vous sur tout le département de l'Orne ?", 
    answer: "Oui, nous couvrons l'intégralité du 61 : les pôles urbains comme Alençon, Flers ou Argentan, mais aussi les zones les plus reculées du Perche ou du Bocage." 
  },
  { 
    question: "Proposez-vous des formules pour les petits budgets ?", 
    answer: "Notre formule 'Économique' est idéale pour maîtriser les coûts. Vous emballez vos cartons, et nos déménageurs professionnels s'occupent de la protection du mobilier, du chargement et du transport sécurisé." 
  },
  { 
    question: "Quel est le délai pour obtenir un devis dans le 61 ?", 
    answer: "Grâce à notre agence régionale, nous sommes très réactifs. Vous obtenez généralement votre devis détaillé sous 24h à 48h après notre premier contact ou visite technique." 
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

export default function OrnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/orne-nature/1920/1080"
          alt="Paysage de l'Orne en Normandie"
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
            <span className="text-white">Orne (61)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Trees className="h-4 w-4" />
              Expert Déménagement Basse-Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans l'Orne (61).
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              D'Alençon au Perche, profitez de la force logistique de notre agence régionale pour un déménagement sans stress et au meilleur prix.
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
                L'ancrage local d'un pro <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour le cœur de la Normandie</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager dans l'Orne, c'est choisir un département entre nature préservée et dynamisme local. Que vous emménagiez dans un appartement en centre-ville à Alençon ou dans une longère isolée dans le Perche, la réussite de votre projet dépend d'une logistique adaptée au terrain.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre agence d'Évreux, Marne Transdem est votre partenaire privilégié. Nous combinons la puissance d'un déménageur national et la réactivité d'une équipe locale qui connaît parfaitement chaque recoin du 61.
              </p>
              
              <div className="pt-6">
                <Button asChild variant="outline" className="rounded-full border-[#00ad9f] text-[#00ad9f] hover:bg-[#00ad9f] hover:text-white transition-all">
                  <Link href="/notre-agence-evreux">Découvrir notre agence régionale</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/orne-moving-pro/800/600"
                  alt="Équipe de déménagement professionnelle dans l'Orne"
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
              Nous intervenons dans toute l'Orne
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Nos équipes d'Évreux rayonnent sur l'ensemble du département 61.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {ORNE_CITIES.map((city) => (
              <div key={city} className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm font-bold text-slate-700 shadow-sm hover:border-[#00ad9f] hover:text-[#00ad9f] transition-all cursor-default">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grille d'avantages) --- */}
      <section id="why-us-orne" className="py-20 lg:py-32 bg-white">
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
                  src="https://picsum.photos/seed/orne-packing/800/600"
                  alt="Protection du mobilier pour un déménagement dans l'Orne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque projet ornais.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Résidentiel & Maisons de campagne</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Emballage premium de vos objets fragiles et protection spécifique pour le mobilier massif des maisons normandes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts d'Entreprises</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux bureaux et commerces de l'Orne : planification optimisée pour limiter l'arrêt de votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles sécurisé</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Besoin de stocker vos biens ? Profitez de nos solutions de stockage sécurisées à proximité immédiate du département.</p>
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
      <section id="faq-orne" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout savoir pour préparer votre installation réussie dans le 61.</p>
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
                    <span className="text-[#00ad9f]">départ vers l'Orne ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Contactez nos experts régionaux pour une visite gratuite et obtenez un devis détaillé sous 24h.
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