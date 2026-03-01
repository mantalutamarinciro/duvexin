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
  Building2, 
  ArrowRight, 
  ChevronRight, 
  Map as MapIcon,
  MoveUp,
  Landmark,
  FileText,
  BadgeCheck,
  Building
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris (75) | Expert Local & Devis Gratuit sous 24h",
  description: "Déménageur professionnel à Paris (75). Spécialiste rues étroites, haussmannien et monte-meubles. Gestion des autorisations de stationnement. Devis gratuit.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-paris-75",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Claire B.", text: "Déménager dans le Marais relevait du défi. L'équipe a été incroyable, obtenant les autorisations et utilisant un monte-meubles avec une efficacité redoutable dans une rue minuscule. Je recommande à 1000%.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireB` },
  { id: "fallback-2", name: "Julien & Marc", text: "Service impeccable pour notre déménagement dans le 15ème. Ponctuels, professionnels et surtout, ils connaissent Paris sur le bout des doigts. Rien n'a été un problème pour eux.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienMarc` },
  { id: "fallback-3", name: "Entreprise Innovatech", text: "Transfert de nos bureaux du 8ème vers le 17ème sans aucune interruption d'activité. Une planification parfaite et une discrétion totale. Bravo à toute l'équipe.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=Innovatech` },
];

const PARIS_QUARTIERS = [
  { name: "Le Marais (3e, 4e)", id: "marais", description: "Expertise rues étroites et cours pavées historiques." },
  { name: "Montmartre (18e)", id: "montmartre", description: "Spécialiste du portage en escaliers et rues en pente." },
  { name: "Saint-Germain (6e)", id: "saint-germain", description: "Soin luxe et gants blancs pour immeubles anciens." },
  { name: "Passy & Auteuil (16e)", id: "passy", description: "Grands volumes et manutention de mobilier de standing." },
  { name: "Batignolles (17e)", id: "batignolles", description: "Logistique adaptée aux zones denses et nouveaux quartiers." },
  { name: "QCA / Opéra (8e, 9e)", id: "opera", description: "Transferts de sièges sociaux et logistique B2B experte." }
];

const WHY_CHOOSE_US = [
  {
    icon: Truck,
    title: "Maîtrise de l'Hyper-Centre",
    description: "Rues étroites, cours intérieures, sens uniques... Nous possédons une flotte de petits porteurs adaptés au gabarit parisien."
  },
  {
    icon: FileText,
    title: "Autorisations Clés en Main",
    description: "Nous gérons l'intégralité des demandes de stationnement et arrêtés de voirie auprès de la Préfecture et des mairies."
  },
  {
    icon: MoveUp,
    title: "Solutions de Levage",
    description: "Déploiement de monte-meubles dernière génération pour sécuriser vos biens et protéger les cages d'escalier."
  },
  {
    icon: BadgeCheck,
    title: "Équipes Salariées",
    description: "Déménageurs 100% professionnels, formés aux techniques d'emballage les plus exigeantes (bullkraft, caisses export)."
  }
];

const FAQS = [
  { 
    question: "Comment réservez-vous le stationnement à Paris ?", 
    answer: "Nous déposons une demande d'autorisation d'occupation du domaine public (AOT) au minimum 15 jours avant votre déménagement via les services de la Mairie de Paris. Cela garantit un emplacement bloqué et légal pour nos camions au départ comme à l'arrivée." 
  },
  { 
    question: "Le monte-meubles est-il obligatoire pour un 4ème étage ?", 
    answer: "Il n'est pas légalement obligatoire, mais très fortement recommandé à Paris si l'ascenseur est absent ou trop étroit (typique du style haussmannien). Il divise par deux le temps de manutention, réduit la fatigue et élimine totalement les risques de dégradation des parties communes." 
  },
  { 
    question: "Déménagez-vous les pianos et objets d'art ?", 
    answer: "Oui, c'est l'une de nos grandes spécialités dans la capitale. Nous disposons de matériel ultra-spécifique (housses capitonnées, luges de portage) et d'une assurance Ad Valorem pour couvrir contractuellement vos œuvres et objets de grande valeur à leur prix réel." 
  },
  { 
    question: "Quels sont vos délais pour un devis à Paris ?", 
    answer: "Nous sommes extrêmement réactifs. Nous organisons une visite technique (à domicile ou en visioconférence) sous 24h à 48h. Votre devis détaillé, ferme et définitif vous est envoyé dans la foulée, sans aucun frais caché." 
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ParisPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une logistique complexe en hyper-centre parisien"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Île-de-France (75)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Paris</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Landmark className="h-4 w-4" />
              Expertise Capitale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Paris sans stress.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'expertise logistique de pointe pour la capitale : gestion totale des autorisations de voirie, flotte de monte-meubles et protection prestige pour vos biens de valeur.
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
                Maîtriser la complexité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">de l'hyper-centre</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Déménager dans la Ville Lumière est un projet exaltant, mais c'est avant tout une opération logistique de haute voltige. Circulation dense, rues étroites du centre historique, réglementation stricte de stationnement, immeubles anciens sans ascenseur...
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons fait de ces contraintes notre terrain d'expertise privilégié. Nous planifions chaque déménagement parisien avec une rigueur absolue, en anticipant chaque détail administratif et technique pour vous assurer une transition parfaitement fluide, que vous soyez un particulier ou une grande entreprise.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldCheck className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Zéro Stress Garanti</h3>
                   <p className="text-slate-500 font-light">Nous prenons en charge 100% de la gestion administrative de voirie.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-paris.webp"
                  alt="Équipe de déménagement professionnelle en pleine intervention à Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-paris" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier vos clés ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Un service pensé sur-mesure pour les particuliers et les entreprises les plus exigeantes de la capitale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_CHOOSE_US.map((item, index) => (
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

      {/* --- ARRONDISSEMENTS GRID (Siloing Style) --- */}
      <section id="arrondissements-paris" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Intervention dans les <span className="text-[#00ad9f]">20 arrondissements.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Du petit studio d'étudiant du Quartier Latin aux immenses plateaux de bureaux du QCA, nous couvrons la totalité de Paris intramuros avec une logistique adaptée :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARIS_QUARTIERS.map((quartier) => (
              <div 
                key={quartier.id} 
                className="group flex flex-col justify-center bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-white/10 rounded-xl text-[#00ad9f] group-hover:bg-[#00ad9f] group-hover:text-white transition-colors">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-100 group-hover:text-white">{quartier.name}</h4>
                </div>
                <p className="text-sm text-slate-400 font-light leading-relaxed">{quartier.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES RÉSUMÉ & MONTE-MEUBLES --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Protection du mobilier et utilisation de monte-meubles à Paris"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions techniques <br/> <span className="text-[#00ad9f]">haute couture.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Haussmannien & Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection absolue des parties communes (tapis, miroirs) et emballages de qualité muséale pour vos biens précieux et œuvres d'art.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><MoveUp className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Monte-Meubles Intégré</h4>
                    <p className="text-slate-500 font-light leading-relaxed">L'outil indispensable à Paris pour les cages d'escalier étroites : gain de temps, zéro casse et respect des normes de votre syndic.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Pro & Bureaux</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service dédié aux entreprises (Opéra, QCA...) : transfert d'archives sécurisées, parcs informatiques et logistique en horaires décalés.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/services/monte-meubles">Découvrir notre service Monte-Meubles</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-paris" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour préparer votre installation réussie à Paris.</p>
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
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      départ de Paris ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique urbaine complexe de la capitale vous stresser. Contactez nos experts parisiens pour une étude personnalisée et recevez un devis ferme et gratuit sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-5 w-5" />
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