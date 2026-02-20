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
  Waves,
  Gem,
  ArrowRight, 
  ChevronRight, 
  Map,
  Anchor,
  Home,
  Sparkles
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Le Perreux-sur-Marne (94) | Expert Bords de Marne",
  description: "Déménageur de confiance au Perreux-sur-Marne (94170). Spécialiste belles demeures, bords de Marne et résidences de standing. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-le-perreux-sur-marne-94170",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Garnier", text: "Déménagement de notre maison au Perreux géré avec un soin et un professionnalisme remarquables. L'équipe a été attentive à chaque détail, notamment pour nos tableaux. Un vrai service premium.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Garnier94` },
  { id: "fallback-2", name: "Isabelle L.", text: "Très satisfaite de la prestation. Ils ont géré les accès complexes sur les bords de Marne avec une grande efficacité malgré le camion de 50m3. Je recommande cette entreprise fiable.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=IsabelleL94` },
  { id: "fallback-3", name: "M. et Mme Bernard", text: "Ponctualité, efficacité et une équipe très respectueuse de notre intérieur. Notre installation près de l'avenue Ledru-Rollin a été une réussite totale. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Bernard94` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise du 94170",
    description: "Des Joncs-Marins au centre-ville, nous maîtrisons chaque rue et plan de circulation du Perreux-sur-Marne."
  },
  {
    icon: Gem,
    title: "Soin Belles Demeures",
    description: "Protection spécifique pour les maisons meulières et résidences de standing : emballage 'gants blancs' pour vos biens précieux."
  },
  {
    icon: Waves,
    title: "Accès Bords de Marne",
    description: "Spécialiste des accès riverains étroits. Nous adaptons nos véhicules pour une logistique sans accroc le long de l'eau."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des demandes d'autorisation de stationnement auprès de la mairie du Perreux pour sécuriser le jour J."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement dans une rue étroite du Perreux ?", 
    answer: "C'est une situation courante le long de la Marne. Nous réalisons une visite technique préalable pour choisir le gabarit de camion idéal. Nous gérons l'arrêté municipal de stationnement pour bloquer l'espace nécessaire et éviter tout blocage de rue." 
  },
  { 
    question: "Proposez-vous l'emballage complet pour les maisons de standing ?", 
    answer: "Oui, notre formule 'Prestige' inclut l'emballage intégral de vos effets (vaisselle, livres, vêtements sur cintres) et le déballage à l'arrivée. Nous utilisons du matériel renforcé pour préserver l'intégrité de votre patrimoine." 
  },
  { 
    question: "Comment protégez-vous mon mobilier de valeur ?", 
    answer: "Nous utilisons des couvertures professionnelles de fort grammage, des housses matelassées pour la literie et les canapés, et du bullkraft renforcé pour les miroirs, tableaux et pièces d'antiquité." 
  },
  { 
    question: "Intervenez-vous également pour les appartements récents à Ivry ou Nogent ?", 
    answer: "Absolument. Nous couvrons l'ensemble de la boucle de la Marne. Que ce soit pour une résidence moderne avec ascenseur ou un immeuble ancien, nous adaptons nos techniques (dont l'usage de monte-meubles) à chaque configuration." 
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

export default function LePerreuxSurMarnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/le-perreux-94/1920/1080"
          alt="Vue paisible sur les bords de Marne au Perreux"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/zones" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Le Perreux-sur-Marne</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Sparkles className="h-4 w-4" />
              La Perle de l'Est Parisien
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                au Perreux-sur-Marne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour vos projets résidentiels au Perreux (94170). Un service haute protection pour des demeures d'exception.
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
                Une approche délicate <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour un cadre de vie prisé</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Le Perreux-sur-Marne se distingue par son élégance architecturale et la quiétude de ses bords de rivière. Déménager dans ce secteur demande bien plus qu'un simple transport : c'est une mission de protection de votre patrimoine dans un environnement urbain délicat.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité perreuxienne. Que vous emménagiez dans une maison meulière traditionnelle ou un appartement de standing en centre-ville, nous coordonnons chaque étape (visite technique, stationnement, levage) pour garantir une installation fluide et sans fausse note.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Anchor className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Bords de Marne,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès restreints et stationnements complexes.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/perreux-move-pro/800/600"
                  alt="Équipe de déménagement professionnelle en intervention au Perreux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-le-perreux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous choisir pour le 94 ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une logistique d'orfèvre adaptée au prestige du Perreux-sur-Marne.
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
                  src="https://picsum.photos/seed/perreux-packing-box/800/600"
                  alt="Déménageur protégeant du mobilier fragile au Perreux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil résidentiel.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Belles Demeures & Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique pour grands volumes avec protection maximale des sols, parquets et escaliers en bois.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Intervention soignée dans les immeubles denses du centre-ville avec monte-meubles extérieur si nécessaire.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formule "Clefs en main"</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Emballage complet de vos effets fragiles, déballage et remise en place pour une sérénité absolue.</p>
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
      <section id="faq-le-perreux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie au Perreux-sur-Marne.</p>
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
                    <span className="text-[#00ad9f]">départ du Perreux ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les accès complexes ternir votre projet. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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