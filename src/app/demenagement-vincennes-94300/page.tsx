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
  Lock,
  Building2,
  Briefcase
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
  { id: "fallback-1", name: "Famille Chevalier", text: "Déménager à Vincennes, près du château, demande des vrais pros. L'équipe a été exceptionnelle : discrète, efficace et très soigneuse avec notre mobilier ancien. Un service irréprochable.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Chevalier94` },
  { id: "fallback-2", name: "Hélène B.", text: "Le service était parfait. Ils ont géré les accès très difficiles de ma rue et ont protégé les parties communes de l'immeuble avec un soin impressionnant. Je recommande à 100%.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB94` },
  { id: "fallback-3", name: "Cabinet d'avocats", text: "Le transfert de notre cabinet vincennois s'est déroulé à la perfection. Ponctualité, efficacité et confidentialité absolue pour nos dossiers. Une entreprise sur qui l'on peut compter.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Avocats94` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Vincennes",
    description: "Du Carré Magique au quartier des Vignerons, nous connaissons les rues, les accès et les réglementations strictes de voirie."
  },
  {
    icon: Castle,
    title: "Respect du Patrimoine",
    description: "Nous intervenons avec un soin infini dans les immeubles de caractère, en protégeant les parquets, moulures et parties communes."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Monte-meubles électriques, véhicules légers... Nous avons les solutions pour les rues étroites et les cours intérieures pavées."
  },
  {
    icon: Lock,
    title: "Confidentialité & Sécurité",
    description: "Nous garantissons une discrétion absolue et une sécurité maximale, indispensable pour le déplacement de vos biens les plus précieux."
  }
];

const FAQS = [
  { question: "Comment gérez-vous un déménagement dans les rues étroites près du château ?", answer: "C'est une situation que nous maîtrisons parfaitement. La clé est une visite technique en amont. Nous utilisons des véhicules de taille adaptée et nous nous chargeons de la demande d'autorisation de stationnement auprès de la mairie de Vincennes bien à l'avance." },
  { question: "Le monte-meubles est-il souvent nécessaire à Vincennes ?", answer: "Oui, c'est un outil très fréquent. Beaucoup d'immeubles haussmanniens ou de prestige n'ont pas d'ascenseur adapté aux meubles. Le monte-meubles garantit la sécurité de vos biens, protège les superbes cages d'escalier et optimise le temps d'intervention." },
  { question: "Faites-vous preuve de discrétion pendant vos interventions ?", answer: "La discrétion est l'une de nos priorités absolues, surtout dans un secteur exigeant comme Vincennes. Nos équipes sont formées pour travailler de manière efficace, silencieuse et toujours respectueuse de votre voisinage et des copropriétés." },
  { question: "Quelles garanties offrez-vous pour le mobilier de valeur ou les œuvres d'art ?", answer: "Nous proposons des assurances sur-mesure (Ad Valorem) pour couvrir vos biens à leur juste valeur déclarée. De plus, nos équipes utilisent des techniques d'emballage 'gants blancs' avec du matériel de pointe (caisses bois sur-mesure, bullkraft, papier de soie) pour une protection maximale." }
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
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménagement haut de gamme avec soin"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Vincennes</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Crown className="h-4 w-4" />
              Service Premium 94300
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Vincennes.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Un service haut de gamme pour votre déménagement dans la cité royale. Discrétion, soin absolu de vos biens et maîtrise parfaite des contraintes locales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                L'exigence d'un <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">service d'excellence</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Déménager à Vincennes, ville prestigieuse au patrimoine historique exceptionnel, requiert un niveau de soin et de savoir-faire bien supérieur à la moyenne. Les immeubles de caractère et les copropriétés exigent de faire appel à de véritables professionnels.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous planifions chaque intervention avec une rigueur absolue. De l'obtention des stationnements dans les rues étroites du centre à l'installation d'un monte-meubles sans abîmer les façades classées, nous préservons votre patrimoine tout en garantissant un déménagement sans stress.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Confiance & Discrétion</h3>
                   <p className="text-slate-500 font-light">Des équipes de confiance pour le transport de vos biens de valeur.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-vincennes.webp"
                  alt="Équipe professionnelle gérant un déménagement de prestige à Vincennes"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-vincennes" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le partenaire de confiance
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance de Vincennes et notre équipement premium sont vos meilleures garanties.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <item.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur emballant avec soin une œuvre d'art ou un meuble précieux"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations <br/> <span className="text-[#00ad9f]">haute couture.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements de Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Une expertise pointue pour la protection de vos intérieurs et des parties communes (ascenseurs étroits, boiseries).</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Crown className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formule "Prestige" (Confort)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déléguez absolument tout. Nous emballons votre vaisselle et vos biens, les transportons et les réinstallons à l'arrivée.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déménagement de cabinets, études et bureaux avec une confidentialité absolue de vos dossiers et archives.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-vincennes" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Nos réponses pour préparer votre installation en toute quiétude.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-4 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base font-light leading-relaxed px-4 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Organisez votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      départ de Vincennes.
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez nos conseillers pour une étude technique personnalisée de votre projet et obtenez un devis gratuit à la hauteur de vos attentes.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Devis gratuit pour Vincennes <ArrowRight className="ml-2 h-5 w-5" />
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