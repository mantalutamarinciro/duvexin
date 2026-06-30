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
  ArrowRight, 
  ChevronRight, 
  Map,
  MoveUp,
  Home,
  Briefcase,
  Layers,
  ShieldAlert
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Puteaux (92) | Expert La Défense & Devis Gratuit 24h",
  description: "Déménageur de confiance à Puteaux (92800). Spécialiste transferts de bureaux à La Défense, accès tours IGH et Vieux Puteaux. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-puteaux-92800",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Société DataSys", text: "Le transfert de nos serveurs et bureaux à Puteaux a été une opération critique, parfaitement maîtrisée. Leur expertise des protocoles de sécurité de La Défense est incontestable. Une efficacité redoutable.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=DataSys92` },
  { id: "fallback-2", name: "Hortense F.", text: "Déménagement de mon appartement sur l'esplanade. L'équipe a été incroyablement professionnelle, gérant les accès monte-charge et les autorisations complexes avec la gestion de la tour. Service premium.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HortenseF92` },
  { id: "fallback-3", name: "Julien V.", text: "Excellent service pour mon installation dans le vieux Puteaux. Ils ont su s'adapter aux rues étroites et ont protégé les parties communes avec soin. Je recommande leur sérieux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=JulienV92` },
];

const WHY_US_ITEMS = [
  {
    icon: Building2,
    title: "Spécialiste La Défense",
    description: "Maîtrise totale des accès logistiques des tours (IGH), des quais de déchargement et des stricts protocoles de sécurité."
  },
  {
    icon: MoveUp,
    title: "Solutions de Levage",
    description: "Déploiement de monte-meubles performants pour les appartements en hauteur et les accès complexes du front de Seine."
  },
  {
    icon: MapPin,
    title: "Expertise du 92800",
    description: "Du centre-ville historique (rues étroites) aux nouveaux éco-quartiers des Bergères, nous connaissons chaque secteur."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des demandes d'autorisation de voirie auprès de la mairie et des PC sécurité des tours."
  }
];

const FAQS = [
  { 
    question: "Comment organisez-vous un transfert de bureaux à La Défense ?", 
    answer: "L'anticipation est la clé. Nous coordonnons l'intervention avec le service sécurité de l'immeuble pour réserver les quais de déchargement et les monte-charges. Nous intervenons très souvent en horaires décalés (nuit) ou le week-end pour garantir une continuité d'activité totale de vos équipes." 
  },
  { 
    question: "Le vieux Puteaux a des rues étroites, quel véhicule utilisez-vous ?", 
    answer: "Nous adaptons précisément notre flotte au gabarit de votre rue. Pour le centre historique, nous privilégions des véhicules de 20m³ plus agiles (petits porteurs), complétés si nécessaire par un monte-meubles extérieur pour éviter les cages d'escalier exiguës." 
  },
  { 
    question: "L'autorisation de stationnement est-elle incluse dans le devis ?", 
    answer: "Oui, pour nos formules Standard et Prestige, nous prenons en charge l'intégralité des démarches administratives auprès de la Ville de Puteaux. Nous pouvons également installer la signalisation réglementaire en amont pour sécuriser l'emplacement du camion." 
  },
  { 
    question: "Proposez-vous des prestations spécifiques pour le matériel informatique ?", 
    answer: "Absolument. Le pôle tertiaire exige une grande rigueur : nous utilisons des bacs de transport scellés pour les archives confidentielles et des emballages antistatiques (bullkraft spécifique, rolls) pour les serveurs et postes de travail, garantissant une sécurité maximale." 
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

export default function PuteauxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel en pleine planification"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Puteaux</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Layers className="h-4 w-4" />
              Expert Déménagement Haute Performance
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Déménager à <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Puteaux & La Défense.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de référence pour les tours de La Défense et les résidences de Puteaux (92800). Précision, sécurité et discrétion.
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
                Maîtriser la verticalité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">du plus grand quartier d'affaires</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Puteaux offre un environnement urbain et logistique hors norme. Entre la complexité structurelle des tours de La Défense (IGH) et les rues pittoresques de son centre ancien, chaque déménagement exige une expertise technique pointue et une planification sans aucune faille.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons fait de cette complexité urbaine notre spécialité. Que vous transfériez votre siège social un week-end ou que vous emménagiez dans une résidence moderne du front de Seine, nous vous garantissons une transition fluide, hautement sécurisée et ponctuelle.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <ShieldAlert className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Expertise Zones Sensibles</h3>
                   <p className="text-slate-500 font-light">Gestion rigoureuse des badges d'accès, des quais de livraison et des protocoles de sécurité des tours.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-puteaux.webp"
                  alt="Équipe de déménagement professionnelle en intervention à Puteaux et La Défense"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-puteaux" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le standard d'excellence du 92
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite maîtrise de l'écosystème Puteaux-La Défense est votre meilleure garantie de sérénité.
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
                  alt="Déménageur protégeant du matériel informatique sensible à La Défense"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une logistique pour <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux & Sièges</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique dédiée aux entreprises de La Défense : protection du mobilier tertiaire, transfert de matériel informatique (serveurs) et archives sensibles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements en Hauteur (IGH)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection totale des parties communes (ascenseurs, halls) et utilisation de monte-meubles performants pour les accès complexes en front de Seine.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Modulables</h4>
                    <p className="text-slate-500 font-light leading-relaxed">De l'offre Économique (manutention seule) à la prestation Prestige (emballage intégral "clé en main"), nous adaptons notre intervention à vos exigences de temps.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir le détail des formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-puteaux" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Puteaux.</p>
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
                      départ de Puteaux ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique urbaine ou les contraintes d'accès aux tours freiner votre projet. Contactez nos experts pour une visite technique et obtenez un devis gratuit sous 24h.
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