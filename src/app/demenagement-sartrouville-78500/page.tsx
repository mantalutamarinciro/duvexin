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
  Waves,
  LayoutGrid
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Sartrouville (78) | Expert Local & Devis Gratuit",
  description: "Déménageur de confiance à Sartrouville (78500). Spécialiste du Plateau, du centre-ville et des bords de Seine. Devis gratuit sous 24h et visite technique.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-sartrouville-78500",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dufour", text: "Un grand merci pour notre déménagement sur le Plateau. L'équipe a été rapide, organisée et a su manœuvrer sans problème dans notre allée étroite. Une prestation sans faille !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour78` },
  { id: "fallback-2", name: "Karine P.", text: "Service au top pour mon appartement près de la gare. Le devis était clair, sans frais cachés, et l'équipe a fait preuve d'un grand soin avec mes cartons fragiles. Je recommande chaudement.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=KarineP78` },
  { id: "fallback-3", name: "Entreprise Tech Solutions", text: "Le transfert de nos bureaux à Sartrouville a été mené avec une rigueur exemplaire. Une équipe discrète qui a su respecter notre planning serré pour ne pas stopper l'activité.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=TechSolutions78` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Maîtrise du 78500",
    description: "De la Croix-Petit aux quartiers résidentiels du Plateau, nous maîtrisons chaque accès de la deuxième ville des Yvelines."
  },
  {
    icon: Home,
    title: "Spécialiste Pavillonnaire",
    description: "Expertise reconnue pour les maisons : protection des sols, des jardins et manutention lourde ultra-sécurisée."
  },
  {
    icon: MoveUp,
    title: "Solutions de Levage",
    description: "Déploiement de monte-meubles pour les résidences modernes et les appartements en centre-ville sans ascenseur."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons intégralement vos demandes d'arrêtés de stationnement auprès de la mairie de Sartrouville."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous le stationnement en centre-ville de Sartrouville ?", 
    answer: "Sartrouville est une ville dense, surtout aux abords de la gare. Nous anticipons systématiquement en déposant les demandes d'autorisation 15 jours à l'avance en mairie pour privatiser l'espace au pied de votre immeuble et garantir une intervention fluide." 
  },
  { 
    question: "Intervenez-vous pour le transfert de matériel informatique ?", 
    answer: "Oui, nous accompagnons les professionnels pour des transferts de bureaux ou de parcs informatiques, avec des emballages antistatiques, des bacs de protection et une planification qui minimise l'arrêt de votre production." 
  },
  { 
    question: "Quelles sont les garanties pour mon mobilier précieux ?", 
    answer: "Chaque déménagement bénéficie d'une assurance contractuelle. Nous utilisons des protections professionnelles (couvertures lourdes, bullkraft, housses de matelas) pour assurer l'intégrité totale de vos biens." 
  },
  { 
    question: "Proposez-vous des formules pour les petits volumes ?", 
    answer: "Tout à fait. Notre formule 'Économique' est parfaitement adaptée aux studios et appartements de petite surface. Elle permet de bénéficier d'un transport professionnel à un prix très compétitif (vous gérez l'emballage de vos cartons)." 
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

export default function SartrouvillePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel en action"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Yvelines (78)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Sartrouville</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <LayoutGrid className="h-4 w-4" />
              Expert Déménagement Sartrouvillois
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Sartrouville.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de référence pour les résidents et entreprises de Sartrouville (78500). Une maîtrise parfaite du Plateau et des accès urbains.
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
                Une logistique agile pour <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">la cité du Plateau</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Sartrouville est une ville aux multiples facettes, mêlant ses vastes quartiers pavillonnaires historiques et son dynamisme moderne en bord de Seine. Déménager dans la deuxième ville des Yvelines demande une agilité technique capable de s'adapter aussi bien aux avenues commerçantes qu'aux rues résidentielles calmes.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons chaque spécificité de la ville. Que vous emménagiez dans une maison avec jardin ou que vous transfériez votre activité professionnelle près de la gare, nous garantissons une transition fluide, sans stress et hautement sécurisée.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Waves className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste Bords de Seine</h3>
                   <p className="text-slate-500 font-light">Maîtrise absolue des accès urbains, des quartiers résidentiels et des flux de circulation.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-sartrouville.webp"
                  alt="Équipe de déménagement professionnelle en intervention à Sartrouville"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-sartrouville" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 78
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance des Yvelines est votre meilleure garantie de ponctualité.
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
                  alt="Déménageur protégeant du mobilier de valeur à Sartrouville"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil résidentiel.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Maisons du Plateau</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique adaptée pour les propriétés avec jardin et emballage scrupuleux de vos biens les plus volumineux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Centre-Ville</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection totale des parties communes et utilisation de monte-meubles pour les accès complexes ou sans ascenseur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Services dédiés aux entreprises de Sartrouville : planification optimisée et protection rigoureuse du matériel IT.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
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
      <section id="faq-sartrouville" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Sartrouville.</p>
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
                      départ de Sartrouville ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique urbaine ou les accès complexes ternir votre projet. Contactez nos experts pour une visite technique et obtenez un devis gratuit sous 24h.
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