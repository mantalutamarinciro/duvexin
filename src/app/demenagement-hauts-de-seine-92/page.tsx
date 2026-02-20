import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

// Icons
import { 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Users, 
  Building, 
  ArrowRight, 
  ChevronRight,
  Map,
  Briefcase,
  Building2,
  MoveUp
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Hauts-de-Seine (92) | Expert La Défense & Standing",
  description: "Déménageur de confiance dans les Hauts-de-Seine (92). Spécialiste La Défense, Boulogne, Neuilly et Levallois. Solutions pros et particuliers. Devis gratuit en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-hauts-de-seine-92",
  }
};

const HAUTS_DE_SEINE_CITIES = [
  { name: "Boulogne-Billancourt", link: "/demenagement-boulogne-billancourt-92100"},
  { name: "Nanterre", link: "/demenagement-nanterre-92000"},
  { name: "Courbevoie", link: "/demenagement-courbevoie-92400"},
  { name: "Colombes", link: "/demenagement-colombes-92700"},
  { name: "Asnières-sur-Seine", link: "/demenagement-asnieres-sur-seine-92600"},
  { name: "Rueil-Malmaison", link: "/demenagement-rueil-malmaison-92500"},
  { name: "Levallois-Perret", link: "/demenagement-levallois-perret-92300"},
  { name: "Issy-les-Moulineaux", link: "/demenagement-issy-les-moulineaux-92130"},
  { name: "Neuilly-sur-Seine", link: "/demenagement-neuilly-sur-seine-92200"},
  { name: "Antony", link: "/demenagement-antony-92160"},
  { name: "Clichy", link: "/demenagement-clichy-92110"},
  { name: "Puteaux", link: "/demenagement-puteaux-92800"}
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: Building2,
    title: "Expertise Urbaine Dense",
    description: "Maîtrise totale des accès complexes à Boulogne, Neuilly ou Levallois : stationnement, sens uniques et sécurité."
  },
  {
    icon: Briefcase,
    title: "Spécialiste La Défense",
    description: "Équipes formées aux protocoles des tours (IGH) et transferts de bureaux sans interruption d'activité."
  },
  {
    icon: MoveUp,
    title: "Levage de Précision",
    description: "Déploiement de monte-meubles dernière génération pour les accès étroits ou les étages élevés du 92."
  },
  {
    icon: Star,
    title: "Service Gants Blancs",
    description: "Un accompagnement premium avec interlocuteur unique pour vos projets résidentiels de standing."
  }
];

const FAQS = [
  { 
    question: "Comment organisez-vous un transfert d'entreprise à La Défense ?", 
    answer: "Nous planifions les opérations en horaires décalés (soir ou week-end) pour éviter toute perte de productivité. Nous gérons les accès logistiques des tours, les réservations de monte-charges et les protocoles de sécurité spécifiques au quartier d'affaires." 
  },
  { 
    question: "Le monte-meubles est-il obligatoire dans les Hauts-de-Seine ?", 
    answer: "Il est fortement recommandé dans les zones denses comme Neuilly ou Levallois pour protéger les cages d'escalier étroites des immeubles anciens et sécuriser la manutention des pièces volumineuses (pianos, canapés)." 
  },
  { 
    question: "Prenez-vous en charge les autorisations de stationnement ?", 
    answer: "Absolument. Nous déposons les demandes d'arrêtés municipaux auprès des mairies du 92 (Boulogne, Nanterre, etc.) 15 jours à l'avance pour garantir un emplacement au pied de votre adresse le jour J." 
  },
  { 
    question: "Gérez-vous les objets d'art et de valeur ?", 
    answer: "Oui, c'est notre spécialité pour les résidences de standing. Nous utilisons des emballages sur-mesure (caisses bois, bullkraft) et proposons des assurances Ad Valorem pour une protection totale de votre patrimoine." 
  }
];

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Société HexaCorp", text: "Le transfert de nos bureaux à La Défense a été un succès total. L'équipe a été discrète, rapide et incroyablement organisée. Aucune interruption d'activité. Une référence pour le B2B.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=HexaCorp92` },
  { id: "fallback-2", name: "Famille Petit", text: "Un grand merci pour notre déménagement à Boulogne-Billancourt. Équipe très soigneuse et professionnelle. Le monte-meubles a été une solution parfaite pour notre mobilier de standing.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Petit92` },
  { id: "fallback-3", name: "Anne-Sophie V.", text: "Service impeccable pour mon appartement à Neuilly-sur-Seine. Le devis était clair et l'équipe a été ponctuelle et efficace. Je recommande chaudement pour la qualité de l'emballage.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=AnneSophie92` },
];

export default function HautsDeSeinePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script 
        id="faq-schema" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        })}} 
      />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/la-defense-92/1920/1080"
          alt="Skyline de La Défense dans les Hauts-de-Seine"
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
            <Link href="/zones" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Hauts-de-Seine (92)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Building2 className="h-4 w-4" />
              Leader Déménagement 92
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans les Hauts-de-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De La Défense à Boulogne, nous maîtrisons la complexité du département 92. Solutions premium pour entreprises exigeantes et résidences de standing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis gratuit sous 24h <ArrowRight className="ml-2 h-4 w-4" />
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
                Maîtriser la verticalité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et la densité du 92</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Le département des Hauts-de-Seine est un territoire de défis logistiques permanents. Entre les tours de bureaux de Puteaux et Nanterre et les quartiers résidentiels denses de Levallois, chaque mètre carré compte.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous avons forgé notre réputation sur notre capacité à naviguer dans cet environnement. Nous coordonnons chaque étape (autorisations mairie, monte-meubles, sécurité) pour que votre transfert professionnel ou privé se déroule avec une précision d'horloger.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Building className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Zones Denses,<br/> <span className="text-slate-500 font-normal text-sm">gestion des accès restreints et stationnements.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/move92/800/600"
                  alt="Équipe de déménagement professionnelle en Hauts-de-Seine"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-92" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous choisir dans le 92 ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une logistique de pointe adaptée aux exigences des Hauts-de-Seine.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_CHOOSE_ITEMS.map((item, index) => (
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

      {/* --- CITIES GRID (SEO Siloing) --- */}
      <section id="cities-92" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Présents dans <span className="text-[#00ad9f]">tout le 92.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Nos camions sillonnent quotidiennement les Hauts-de-Seine. Retrouvez nos services par ville :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {HAUTS_DE_SEINE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-slate-800/50 border border-slate-700 p-4 rounded-2xl hover:bg-[#00ad9f]/10 hover:border-[#00ad9f]/30 transition-all duration-300"
              >
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#00ad9f] group-hover:translate-x-1 transition-all" />
              </Link>
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
                  src="https://picsum.photos/seed/la-defense-pro/800/600"
                  alt="Déménageur protégeant du matériel informatique"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux & Sièges</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Spécialiste La Défense : emballage informatique, transfert d'archives et remise en place selon vos plans.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Résidences de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service premium pour appartements denses : protection des parties communes et emballages haute protection.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Mise à disposition Monte-Meubles</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution radicale pour les accès impossibles et les étages élevés du département.</p>
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
      <section id="faq-92" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout savoir sur le déménagement dans le 92.</p>
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
                    <span className="text-[#00ad9f]">départ vers le 92 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la densité urbaine vous stresser. Contactez nos experts pour une étude personnalisée et recevez un devis gratuit sous 24h.
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