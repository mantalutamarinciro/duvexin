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
  Train,
  ArrowRight,
  ChevronRight,
  Map,
  Home,
  Briefcase
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Eaubonne (95) | Expert local & Devis Gratuit",
  description: "Déménageur de confiance à Eaubonne (95600). Spécialiste de la Vallée de Montmorency : pavillons, appartements gare Ermont-Eaubonne et pros. Devis en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-eaubonne-95600",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Chevalier", text: "Déménagement de notre maison à Eaubonne parfaitement géré. L'équipe a été efficace, ponctuelle et très soigneuse avec nos meubles anciens. Un service de grande qualité.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier95` },
  { id: "fallback-2", name: "Pauline V.", text: "Service impeccable pour mon appartement près de la gare. Le devis était clair, l'équipe sympathique et professionnelle. Zéro stress pour mon premier déménagement seule !", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=PaulineV95` },
  { id: "fallback-3", name: "M. Lefort", text: "Efficacité et professionnalisme. Ils ont géré le stationnement en plein centre-ville sans aucun souci. Je recommande pour tout déménagement dans le 95.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lefort95E` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise d'Eaubonne",
    description: "Du centre-ville aux quartiers du Clos de l'Olive ou de l'Alliance, nous maîtrisons chaque accès du 95600."
  },
  {
    icon: Train,
    title: "Maîtrise Pôle Gare",
    description: "Spécialistes du secteur Ermont-Eaubonne : nous gérons les flux de trafic denses pour une ponctualité garantie."
  },
  {
    icon: Home,
    title: "Tout Type d'Habitat",
    description: "Des pavillons avec accès étroits aux résidences modernes avec étages, nous adaptons notre matériel (monte-meubles)."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des autorisations de stationnement auprès de la mairie d'Eaubonne pour sécuriser votre déménagement."
  }
];

const FAQS = [
  { question: "Comment organisez-vous un déménagement près de la gare d'Ermont-Eaubonne ?", answer: "C'est un secteur névralgique du Val-d'Oise. L'anticipation est notre priorité : nous déposons la demande d'arrêté municipal 15 jours avant pour réserver l'emplacement. Nous planifions l'arrivée de nos camions en dehors des pics de fréquentation de la gare pour garantir une logistique fluide." },
  { question: "Est-ce difficile de stationner à Eaubonne ?", answer: "En centre-ville ou près des commerces, le stationnement est réglementé. Notre forfait inclut la démarche administrative : nous installons la signalétique 48h à l'avance pour libérer l'espace nécessaire au camion et au monte-meubles, vous évitant tout stress le jour J." },
  { question: "Déménagez-vous les maisons avec des jardins ou accès difficiles ?", answer: "Oui, c'est fréquent à Eaubonne. Lors de la visite technique (physique ou vidéo), nous évaluons le portage. Nous utilisons des véhicules de petits volumes pour les rues étroites ou des monte-meubles pour passer par les fenêtres, protégeant ainsi vos sols et escaliers." },
  { question: "Proposez-vous des formules pour les petits budgets ?", answer: "La formule 'Économique' est idéale. Vous préparez vos cartons, et nos déménageurs professionnels s'occupent de la manutention lourde, du mobilier fragile et du transport sécurisé. Un excellent rapport qualité/prix pour les studios et petits appartements." }
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

export default function EaubonnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/eaubonne-park/1920/1080"
          alt="Vue urbaine et verdoyante de la ville d'Eaubonne"
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
            <Link href="/zones" className="hover:text-white transition-colors">Val-d'Oise (95)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Eaubonne</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Cœur de la Vallée de Montmorency
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Eaubonne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique experte pour les pavillons et résidences d'Eaubonne (95600). Maîtrise des accès et service de proximité pour une transition sans stress.
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
                L'expertise d'un pro <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour le cadre de vie eaubonnais</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Eaubonne séduit par son équilibre entre calme résidentiel et dynamisme urbain. Que vous emménagiez dans une maison avec jardin dans le quartier de l'Alliance ou dans un appartement moderne près du centre, les défis logistiques sont réels.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité locale. De la gestion du trafic près de la gare Ermont-Eaubonne aux accès délicats des zones pavillonnaires, nous planifions chaque détail pour garantir une prestation fluide et sécurisée.
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
                  src="https://picsum.photos/seed/eaubonne-move-team/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Eaubonne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-eaubonne" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 95
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance du terrain eaubonnais est votre meilleure garantie de ponctualité.
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
                  src="https://picsum.photos/seed/eaubonne-packing/800/600"
                  alt="Déménageur protégeant du mobilier fragile à Eaubonne"
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
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes (ascenseurs, sols) et utilisation de monte-meubles pour les accès difficiles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Pavillons & Villas</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les jardins et entrées étroites avec emballage scrupuleux de vos objets de valeur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre 'Économique' à la prestation 'Confort' clé en main (emballage complet), nous nous adaptons à vos besoins.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/formules-de-demenagement">Comparer les formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-eaubonne" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie à Eaubonne.</p>
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
                    Prêt pour votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ d'Eaubonne ?</span>
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