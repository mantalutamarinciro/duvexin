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
  Castle, 
  ArrowRight, 
  ChevronRight, 
  Crown,
  Lock
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Vincennes (94) | Service Premium & Devis Gratuit",
  description: "Votre déménageur de confiance à Vincennes (94300). Experts en immeubles de standing, passages difficiles et protection de mobilier de valeur. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-vincennes-94300",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Chevalier", text: "Déménager à Vincennes, près du château, demande des pros. L'équipe a été exceptionnelle : discrète, efficace et très soigneuse. Un service irréprochable.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier94` },
  { id: "fallback-2", name: "Hélène B.", text: "Le service était parfait. Ils ont géré les accès difficiles de ma rue et protégé les parties communes de l'immeuble avec un soin impressionnant. Je recommande à 100%.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB94` },
  { id: "fallback-3", name: "Cabinet d'avocats", text: "Le transfert de notre cabinet s'est déroulé à la perfection. Ponctualité, efficacité et confidentialité. Une entreprise sur qui l'on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Avocats94` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Vincennes",
    description: "Du Carré Magique au quartier des Vignerons, nous connaissons les rues, les accès et les réglementations de voirie."
  },
  {
    icon: Castle,
    title: "Respect du Patrimoine",
    description: "Nous intervenons avec un soin infini dans les immeubles de caractère, en protégeant les parquets, moulures et parties communes."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Monte-meubles, véhicules légers... Nous avons les solutions pour les rues étroites et les cours intérieures du centre-ville."
  },
  {
    icon: Lock,
    title: "Confidentialité & Sécurité",
    description: "Nous garantissons une discrétion absolue et une sécurité maximale pour le déplacement de vos biens les plus précieux."
  }
];

const FAQS = [
  { question: "Comment gérez-vous un déménagement dans le rues étroites près du château ?", answer: "C'est une situation que nous maîtrisons parfaitement. La clé est une visite technique en amont. Nous utilisons des véhicules de taille adaptée et nous nous chargeons de la demande d'autorisation de stationnement auprès de la mairie de Vincennes." },
  { question: "Le monte-meubles est-il souvent nécessaire à Vincennes ?", answer: "Oui, c'est un outil très fréquent. Beaucoup d'immeubles haussmanniens ou de prestige n'ont pas d'ascenseur adapté. Le monte-meubles garantit la sécurité de vos meubles, protège les superbes cages d'escalier et optimise le temps d'intervention." },
  { question: "Faites-vous preuve de discrétion pendant vos interventions ?", answer: "La discrétion est l'une de nos priorités absolues, surtout dans une ville exigeante comme Vincennes. Nos équipes sont formées pour travailler de manière efficace, silencieuse et respectueuse de votre voisinage." },
  { question: "Quelles garanties offrez-vous pour le mobilier de valeur ?", answer: "Nous proposons des assurances sur-mesure (Ad Valorem) pour couvrir vos biens à leur juste valeur. De plus, nos équipes utilisent des techniques d'emballage 'gants blancs' avec du matériel de pointe (caisses pour tableaux, papier de soie) pour une protection maximale." }
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

export default function VincennesPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/vincennes-chateau/1920/1080"
          alt="Le Château de Vincennes et son architecture majestueuse"
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
            <Link href="/demenagement-val-de-marne-94" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Vincennes</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Crown className="h-4 w-4" />
              Service Premium
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Vincennes.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Un service haut de gamme pour votre déménagement dans la cité royale. Discrétion, soin absolu de vos biens et maîtrise parfaite des contraintes locales.
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
                L'exigence d'un <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">service d'excellence</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Vincennes, ville prestigieuse au patrimoine historique exceptionnel, requiert un niveau de soin et de savoir-faire bien supérieur à la moyenne. Les immeubles de caractère et le voisinage exigeant imposent de faire appel à des experts locaux.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Nous planifions chaque intervention avec une rigueur absolue. De l'obtention des stationnements dans les rues étroites à l'installation d'un monte-meubles sans abîmer les façades classées, nous préservons votre patrimoine tout en garantissant un déménagement sans stress.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Confiance & Discrétion,<br/> <span className="text-slate-500 font-normal text-sm">les maîtres-mots de nos équipes.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/vincennes-movers/800/600"
                  alt="Équipe professionnelle gérant un déménagement de prestige"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-vincennes" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le partenaire de confiance
            </h2>
            <p className="text-lg text-slate-500">
              Notre connaissance des rues vincennoises et notre équipement premium sont vos meilleures garanties.
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
                  src="https://picsum.photos/seed/vincennes-packing/800/600"
                  alt="Déménageur emballant avec soin une œuvre d'art"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations <br/> <span className="text-[#00ad9f]">haute couture.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une expertise pointue pour la protection de vos intérieurs et des parties communes (ascenseurs, boiseries).</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formule \"Prestige\" (Confort)</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Déléguez absolument tout. Nous emballons, transportons et réinstallons l'intégralité de vos effets personnels.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une logistique parfaitement adaptée aux grands volumes, intégrant la manipulation d'objets lourds ou fragiles.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/formules-de-demenagement">Voir le détail de nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-vincennes" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="border border-slate-100 px-6 rounded-2xl bg-white shadow-sm data-[state=open]:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 leading-relaxed pb-6">
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none corrigés */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Organisez votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Vincennes</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez nos conseillers pour une étude technique personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Devis gratuit pour Vincennes <ArrowRight className="ml-2 h-4 w-4" />
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
