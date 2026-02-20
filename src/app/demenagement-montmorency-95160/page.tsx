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
  Cpu,
  ArrowRight, 
  ChevronRight, 
  Map,
  Briefcase,
  Home,
  Navigation
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Guyancourt (78) | Expert local & Devis Gratuit",
  description: "Marne Transdem : votre déménageur de confiance à Guyancourt (78280). Spécialiste Technocentre, quartier de l'Europe et résidences. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-guyancourt-78280",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Morel", text: "Déménagement de notre maison dans le quartier des Garennes parfaitement exécuté. Équipe ponctuelle, polie et très efficace. Le soin apporté au mobilier était exemplaire.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Morel78` },
  { id: "fallback-2", name: "Julien R.", text: "Travaillant au Technocentre, j'ai choisi Marne Transdem pour mon installation à Guyancourt. Service irréprochable, devis respecté et aucune casse. Je recommande sans hésiter.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Julien78G` },
  { id: "fallback-3", name: "Cabinet Europe Assur", text: "Nous avons confié le transfert de nos bureaux du quartier de l'Europe à cette équipe. Logistique très bien huilée et discrétion assurée. Un partenaire de confiance pour le B2B.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=EuropeAssur` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Guyancourt",
    description: "Du quartier de l'Europe au centre-village, nous maîtrisons chaque accès et plan de stationnement du 78280."
  },
  {
    icon: Cpu,
    title: "Spécialiste Pôle Tertiaire",
    description: "Une forte expérience dans l'accompagnement des salariés du Technocentre Renault et des entreprises du secteur."
  },
  {
    icon: Building2,
    title: "Agilité Urbaine",
    description: "Maîtrise des immeubles récents de SQY : gestion des accès sécurisés, des badges et des parkings souterrains."
  },
  {
    icon: ShieldCheck,
    title: "Accompagnement de A à Z",
    description: "De la visite technique à l'obtention des arrêtés de stationnement auprès de la mairie de Guyancourt."
  }
];

const FAQS = [
  { 
    question: "Comment organiser un déménagement dans le quartier de l'Europe ?", 
    answer: "C'est un quartier dense avec de nombreuses copropriétés. Nous coordonnons l'intervention avec votre syndic si nécessaire et bloquons les places de stationnement en amont pour garantir un accès direct à votre hall d'immeuble." 
  },
  { 
    question: "Proposez-vous des formules pour les mutations professionnelles ?", 
    answer: "Oui, nous sommes habitués aux procédures de mutation (Technocentre, Crédit Agricole, Thales). Nous fournissons tous les documents nécessaires pour votre dossier de prise en charge employeur." 
  },
  { 
    question: "Est-il nécessaire d'utiliser un monte-meubles à Guyancourt ?", 
    answer: "Bien que beaucoup d'immeubles soient récents et équipés d'ascenseurs, le monte-meubles reste la solution idéale pour le mobilier volumineux ou pour préserver les parties communes des résidences de standing." 
  },
  { 
    question: "Quel est le tarif moyen pour déménager une maison aux Garennes ?", 
    answer: "Le prix dépend du volume et des options choisies (emballage, démontage). Nous réalisons des devis gratuits sur-mesure sous 24h après une visite technique à votre domicile ou en visioconférence." 
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

export default function GuyancourtPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/guyancourt-sqy/1920/1080"
          alt="Vue moderne de Guyancourt"
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
            <Link href="/zones" className="hover:text-white transition-colors">Yvelines (78)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Guyancourt</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Navigation className="h-4 w-4" />
              Partenaire Logistique Saint-Quentin-en-Yvelines
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Guyancourt.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'expertise Marne Transdem pour les résidents et les grands comptes de Guyancourt (78280). Un service de proximité, réactif et de haute qualité.
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
                Une maîtrise logistique <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour la ville du Technocentre</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Guyancourt est un pôle d'excellence des Yvelines, alliant une vie de quartier conviviale et des zones d'activités tertiaires de rang mondial. Déménager dans cette commune exige une connaissance parfaite des flux urbains et des exigences des grandes copropriétés.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Qu'il s'agisse d'un emménagement dans le quartier de l'Europe ou d'une maison dans le Village, Marne Transdem déploie les ressources adaptées (véhicules, monte-meubles, emballages premium) pour une transition en toute sérénité.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Briefcase className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Mutation Pro,<br/> <span className="text-slate-500 font-normal text-sm">accompagnement sur-mesure pour les salariés de SQY.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/guyancourt-move/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Guyancourt"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-guyancourt" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 78
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance de Guyancourt est votre meilleure garantie de ponctualité.
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
                  src="https://picsum.photos/seed/guyancourt-pack/800/600"
                  alt="Déménageur protégeant du mobilier à Guyancourt"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Résidences de l'Europe</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et utilisation de monte-meubles pour les accès en étage dans les immeubles de SQY.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons & Pavillons (Les Garennes)</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les propriétés avec jardin et emballage scrupuleux de vos objets précieux et mobilier de valeur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Services dédiés aux entreprises : planification optimisée et protection du matériel informatique pour une reprise rapide.</p>
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
      <section id="faq-guyancourt" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie à Guyancourt.</p>
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
                    <span className="text-[#00ad9f]">départ de Guyancourt ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les contraintes d'accès ternir votre projet. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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