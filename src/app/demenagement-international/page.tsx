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
  Globe, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  FileText,
  BadgeCheck,
  Gem,
  Ship,
  Plane,
  Languages,
  Navigation,
  Waves
} from "lucide-react";

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Roussel", text: "Un déménagement vers le Luxembourg géré à la perfection. L'équipe a été d'une ponctualité exemplaire et a su s'adapter aux accès restreints. Un service international de grande qualité.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=RousselLux` },
  { id: "fallback-2", name: "Marc-Antoine D.", text: "Excellente prestation pour mon installation à Londres. Le dédouanement post-Brexit a été très rapide grâce à la préparation du dossier par leurs soins. Je recommande vivement !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=MALux` },
  { id: "fallback-3", name: "Mme. Schmidt", text: "Déménagement Paris-Berlin sans aucune fausse note. Nos meubles fragiles sont arrivés impeccables après 1000km de route. Une équipe de confiance.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SchmidtDE` },
];

const INTERNATIONAL_DESTINATIONS = [
  { name: "Royaume-Uni", href: "/demenagement-france-royaume-uni", desc: "Expertise Brexit & Douanes", icon: Ship },
  { name: "Suisse", href: "/demenagement-france-suisse", desc: "Spécialiste Douanes Hors UE", icon: Navigation },
  { name: "Belgique", href: "/demenagement-france-belgique", desc: "Liaisons Hebdomadaires", icon: Truck },
  { name: "Luxembourg", href: "/demenagement-france-luxembourg", desc: "Service Expatriés Premium", icon: Building2 },
  { name: "Allemagne", href: "/demenagement-france-allemagne", desc: "Axe Paris - Berlin - Munich", icon: Globe },
  { name: "Espagne", href: "/demenagement-france-espagne", desc: "Liaisons France - Péninsule", icon: Route },
  { name: "Portugal", href: "/demenagement-france-portugal", desc: "Longue Distance Sécurisée", icon: MapPin },
  { name: "Italie", href: "/demenagement-france-italie", desc: "Expertise Transalpine", icon: Route },
  { name: "Pays-Bas", href: "/demenagement-france-pays-bas", desc: "Gestion Accès Canaux", icon: Ship },
  { name: "Irlande", href: "/demenagement-france-irlande", desc: "Logistique Maritime & Ferry", icon: Waves },
  { name: "Andorre", href: "/demenagement-france-andorre", desc: "Haute Montagne & Douanes", icon: Navigation },
];

const WHY_US_ITEMS = [
  {
    icon: FileText,
    title: "Ingénierie Douanière",
    description: "Nous gérons l'intégralité des formalités d'export et d'import (UK, Suisse, Andorre) pour vous assurer une franchise de taxes totale."
  },
  {
    icon: Scale,
    title: "Solutions de Groupage",
    description: "Optimisez votre budget en mutualisant le transport avec d'autres clients vers les grandes capitales européennes."
  },
  {
    icon: BadgeCheck,
    title: "Standards Européens",
    description: "Emballages haute protection aux normes internationales et personnel bilingue pour une coordination fluide sur place."
  },
  {
    icon: ShieldCheck,
    title: "Assurance Ad Valorem",
    description: "Votre patrimoine est couvert à sa valeur réelle sur tout le trajet européen, incluant les traversées maritimes."
  }
];

const FAQS = [
  { 
    question: "Quels sont les documents nécessaires pour un déménagement international ?", 
    answer: "Pour l'UE, un inventaire détaillé et vos justificatifs de changement de domicile suffisent. Pour les pays hors UE (UK, Suisse, Andorre), nous montons un dossier complet incluant les formulaires de douane spécifiques pour obtenir l'exonération des taxes d'importation." 
  },
  { 
    question: "Comment est calculé le prix d'un déménagement en Europe ?", 
    answer: "Le tarif dépend du volume (m³), de la distance kilométrique, des frais de péages/tunnels/ferrys et de la formule choisie. Le groupage est souvent la solution la plus économique pour les volumes inférieurs à 15m³." 
  },
  { 
    question: "Proposez-vous un service de déballage à l'arrivée ?", 
    answer: "Oui, notre formule 'Prestige' inclut le déballage du fragile et la remise en place de votre intérieur, vous permettant une installation immédiate sans effort dans votre nouveau pays." 
  },
  { 
    question: "Gérez-vous le stationnement à l'étranger ?", 
    answer: "Absolument. Nous coordonnons avec nos correspondants locaux ou les autorités municipales (Berlin, Londres, Madrid...) pour réserver les emplacements de stationnement nécessaires au pied de votre porte." 
  }
];

export default function InternationalHubPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920"
          alt="Déménagement international en Europe"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Déménagement International</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Réseau Logistique Européen
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                sans frontières.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'expertise logistique pour votre expatriation en Europe. Profitez d'un accompagnement sur-mesure, d'une maîtrise des douanes et de liaisons régulières vers toutes les capitales.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Demander un devis international <ArrowRight className="ml-2 h-5 w-5" />
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
                L'Europe à votre portée <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">avec un expert dédié</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Un déménagement international est un projet complexe qui demande une rigueur logistique et administrative sans compromis. Que vous partiez pour le dynamisme de Londres, la quiétude des cantons suisses ou le soleil de l'Algarve, chaque kilomètre compte.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons structuré nos services pour répondre aux exigences des expatriés, des diplomates et des entreprises. Nous gérons l'intégralité de la chaîne : emballage aux normes export, gestion des douanes, transport sécurisé et réinstallation à l'arrivée.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Languages className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Accompagnement Multilingue</h3>
                   <p className="text-slate-500 font-light">Une coordination fluide avec les autorités locales et les syndics de copropriété partout en Europe.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/demenagement-international.webp"
                  alt="Logistique internationale européenne"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS GRID --- */}
      <section id="destinations" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nos destinations <span className="text-[#00ad9f]">privilégiées.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Cliquez sur votre destination pour découvrir nos services spécifiques, nos conseils douaniers et nos options logistiques locales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INTERNATIONAL_DESTINATIONS.map((dest) => (
              <Link 
                key={dest.name} 
                href={dest.href}
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-[#00ad9f] mb-4 group-hover:scale-110 transition-transform">
                  <dest.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors mb-1">{dest.name}</h3>
                <p className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors mb-4">{dest.desc}</p>
                <div className="mt-auto flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] group-hover:text-white transition-colors">
                  Voir l'expertise <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-international" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence sans frontières
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour sécuriser votre transition à l'autre bout de l'Europe.
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

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ HUB --- */}
      <section id="faq-international" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">Déménagement International</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Préparez votre départ avec les conseils de nos experts logistiques.</p>
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
                    Votre vie change <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      de pays ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme et détaillé sous 24h ouvrées.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis international gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
