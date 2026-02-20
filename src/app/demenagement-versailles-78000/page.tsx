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
  Castle, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Crown,
  Map
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Versailles (78) | Service Prestige & Devis Gratuit",
  description: "Déménageur expert à Versailles (78000). Nous maîtrisons les accès historiques (Saint-Louis, Notre-Dame) et protégeons votre patrimoine. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-versailles-78000",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Royer", text: "Déménager à Versailles était un rêve et grâce à vous, ça a été une expérience sans stress. L'équipe a été très respectueuse des lieux et de nos affaires.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Royer78` },
  { id: "fallback-2", name: "M. Lefèvre", text: "Très professionnels, ils ont su gérer les accès compliqués de ma rue dans le quartier Saint-Louis. Service impeccable, je recommande vivement.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre78` },
  { id: "fallback-3", name: "Cabinet d'architectes", text: "Le transfert de nos bureaux près du château s'est déroulé à la perfection. Discrétion et efficacité, une équipe au top.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Architectes78` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Versailles",
    description: "Du quartier Notre-Dame à Saint-Louis, nous connaissons les rues, les réglementations et les secrets d'un déménagement réussi."
  },
  {
    icon: Castle,
    title: "Respect du Patrimoine",
    description: "Nous intervenons avec un soin extrême dans les hôtels particuliers, en protégeant les parquets, moulures et parties communes."
  },
  {
    icon: Truck,
    title: "Gestion des Accès",
    description: "Nous maîtrisons la logistique pour les rues étroites et le déploiement de monte-meubles, indispensables dans la Cité Royale."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, une démarche essentielle et stricte à Versailles."
  }
];

const FAQS = [
  { question: "Comment gérez-vous un déménagement dans le quartier historique de Saint-Louis ?", answer: "C'est un secteur que nous connaissons très bien pour ses accès qui peuvent être compliqués. Nous effectuons toujours une visite technique en amont pour définir la meilleure stratégie. Nous utilisons des véhicules de taille adaptée et nous nous chargeons de la demande d'autorisation de stationnement." },
  { question: "Le monte-meubles est-il souvent nécessaire pour un déménagement à Versailles ?", answer: "Oui, c'est une solution que nous utilisons fréquemment. Beaucoup d'immeubles versaillais, bien que magnifiques, n'ont pas d'ascenseur ou des cages d'escalier très étroites. Le monte-meubles garantit un déménagement rapide, sécurisé pour vos biens et respectueux des parties communes." },
  { question: "Déménagez-vous les objets d'art et les meubles anciens ?", answer: "Absolument. C'est l'une de nos spécialités. Nos équipes sont formées pour l'emballage et la manipulation d'objets de valeur. Nous utilisons des matériaux de protection professionnels (caisses sur-mesure, papier de soie, bullkraft) pour assurer une sécurité maximale à votre patrimoine." },
  { question: "Quels sont les délais pour organiser un déménagement à Versailles ?", answer: "Compte tenu des démarches administratives pour le stationnement, nous recommandons de nous contacter au moins 3 à 4 semaines à l'avance. Cependant, n'hésitez pas à nous appeler pour des besoins plus urgents, nous ferons notre possible pour débloquer une solution." }
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

export default function VersaillesPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/versailles-chateau/1920/1080"
          alt="Le Château de Versailles et son architecture royale"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-yvelines-78" className="hover:text-white transition-colors">Yvelines (78)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Versailles</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Crown className="h-4 w-4" />
              Service Prestige
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Versailles.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'expertise d'un professionnel pour un déménagement d'exception dans la Cité Royale. Un service haut de gamme, discret et sur-mesure.
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
                L'excellence exigée par <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">une ville d'histoire</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Versailles, ville chargée d'histoire et de prestige, requiert un savoir-faire particulier. Les contraintes d'urbanisme, le respect absolu du patrimoine et les accès parfois complexes des quartiers historiques (comme Saint-Louis) exigent de faire appel à des professionnels aguerris.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous avons une connaissance approfondie de la ville. Nous planifions chaque intervention avec le plus grand soin pour préserver vos biens de valeur tout en vous assurant une transition d'une fluidité parfaite.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Castle className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Patrimoniale,<br/> <span className="text-slate-500 font-normal text-sm">protection des intérieurs anciens.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/versailles-move/800/600"
                  alt="Équipe de déménagement professionnelle en intervention historique"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-versailles" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le partenaire de confiance
            </h2>
            <p className="text-lg text-slate-500">
              Notre expertise locale est à la hauteur du prestige de votre adresse versaillaise.
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
                  src="https://picsum.photos/seed/versailles-packing/800/600"
                  alt="Déménageur emballant avec soin une pendule ancienne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations <br/> <span className="text-[#00ad9f]">sur-mesure.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements de caractère</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une expertise pointue pour la protection de vos biens et des parties communes des immeubles anciens.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Hôtels particuliers</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une logistique adaptée aux très grands volumes et à la manipulation d'objets de grande valeur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formule \"Prestige\"</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Nous nous occupons de tout : de l'emballage de vos œuvres les plus fragiles à la réinstallation complète de vos intérieurs.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/formules-de-demenagement">Découvrir nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-versailles" className="py-20 lg:py-32 bg-slate-50">
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Organisez votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Versailles</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez nos conseillers spécialisés pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Devis gratuit pour Versailles <ArrowRight className="ml-2 h-4 w-4" />
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
