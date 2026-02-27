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
  Star, 
  Users, 
  ArrowRight, 
  ChevronRight,
  Map as MapIcon,
  Briefcase,
  Building2,
  MoveUp,
  Building
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Hauts-de-Seine (92) | Expert La Défense & Standing",
  description: "Déménageur de confiance dans les Hauts-de-Seine (92). Spécialiste La Défense, Boulogne, Neuilly et Levallois. Solutions pros et particuliers. Devis gratuit en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-hauts-de-seine-92",
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
    description: "Maîtrise totale des accès complexes à Boulogne, Neuilly ou Levallois : rues étroites, stationnement et sens uniques."
  },
  {
    icon: Briefcase,
    title: "Spécialiste La Défense",
    description: "Équipes spécifiquement formées aux protocoles des tours (IGH) et aux transferts de bureaux sans interruption d'activité."
  },
  {
    icon: MoveUp,
    title: "Levage de Précision",
    description: "Déploiement de monte-meubles dernière génération (autoportés ou sur remorque) pour les étages élevés très fréquents dans le 92."
  },
  {
    icon: Star,
    title: "Service Gants Blancs",
    description: "Un accompagnement premium et sur-mesure, avec interlocuteur unique, pour vos projets résidentiels de haut standing."
  }
];

const FAQS = [
  { 
    question: "Comment organisez-vous un transfert d'entreprise à La Défense ?", 
    answer: "La clé est la coordination avec la tour. Nous planifions les opérations en horaires décalés (soir, nuit ou week-end) pour éviter toute perte de productivité. Nous gérons très en amont les accès logistiques des quais de livraison, les réservations de monte-charges et nous respectons à la lettre les protocoles de sécurité IGH spécifiques au quartier d'affaires." 
  },
  { 
    question: "Le monte-meubles est-il obligatoire dans les Hauts-de-Seine ?", 
    answer: "Il n'est pas obligatoire juridiquement, mais il est très fortement recommandé. Dans les zones très denses comme Neuilly, Levallois ou Boulogne, il permet d'éviter l'utilisation de cages d'escalier étroites, protégeant ainsi les parties communes (ce que demandent les syndics) et sécurisant la descente de vos pièces volumineuses (pianos, canapés, frigos américains)." 
  },
  { 
    question: "Prenez-vous en charge les autorisations de stationnement ?", 
    answer: "Absolument. Nous déposons systématiquement les demandes d'arrêtés municipaux auprès des mairies des Hauts-de-Seine (Boulogne, Nanterre, Asnières, etc.) 15 jours à l'avance pour garantir un emplacement légal et réservé au pied de votre adresse le jour J." 
  },
  { 
    question: "Gérez-vous les objets d'art et de valeur ?", 
    answer: "Oui, c'est notre très grande spécialité, particulièrement demandée pour les résidences de standing du 92. Nous utilisons des emballages sur-mesure (caisses bois capitonnées, papier bulle spécifique) et proposons des assurances Ad Valorem pour une protection juridique totale de votre patrimoine." 
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
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une logistique complexe"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Hauts-de-Seine (92)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Building2 className="h-4 w-4" />
              Leader Logistique 92
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans les Hauts-de-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De l'hyper-densité de La Défense au standing de Boulogne ou Neuilly, nous maîtrisons la complexité du département 92. Solutions premium pour entreprises exigeantes et particuliers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit sous 24h <ArrowRight className="ml-2 h-5 w-5" />
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
                Maîtriser la verticalité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et la densité du 92</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Le département des Hauts-de-Seine est un territoire de défis logistiques permanents. Entre les immenses tours de bureaux de La Défense (Puteaux, Courbevoie, Nanterre) et les quartiers résidentiels extrêmement denses et prisés de Levallois ou Boulogne, chaque mètre carré compte et le droit à l'erreur n'existe pas.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons forgé notre solide réputation sur notre capacité à naviguer dans cet environnement complexe. Nous anticipons et coordonnons chaque étape (autorisations mairie complexes, déploiement de monte-meubles, protocoles sécurité IGH) pour que votre transfert, qu'il soit professionnel (B2B) ou privé, se déroule avec une précision d'horloger.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Building className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Expertise Zones Denses</h3>
                   <p className="text-slate-500 font-light">Une gestion redoutable des accès restreints, du stationnement et de la verticalité.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-hauts-de-seine.webp"
                  alt="Équipe de déménagement professionnelle intervenant dans les Hauts-de-Seine"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-92" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous choisir dans le 92 ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une logistique de pointe, réactive et sécurisée, parfaitement adaptée aux exigences de l'Ouest parisien.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_CHOOSE_ITEMS.map((item, index) => (
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

      {/* --- CITIES GRID (SEO Siloing) --- */}
      <section id="cities-92" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Présents dans <span className="text-[#00ad9f]">tout le 92.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Nos équipes et nos camions sillonnent très régulièrement le département des Hauts-de-Seine. Retrouvez nos secteurs d'intervention phares :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {HAUTS_DE_SEINE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
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
                  alt="Déménageur protégeant du matériel informatique sensible"
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
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux (La Défense)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Le spécialiste B2B : emballage de vos baies informatiques, transfert sécurisé d'archives et remise en place experte selon vos plans d'implantation.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Résidences de Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium pour les appartements parisiens : protection stricte des parties communes (ascenseurs, halls) et emballages de qualité muséale.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><MoveUp className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Location de Monte-Meubles</h4>
                    <p className="text-slate-500 font-light leading-relaxed">La solution radicale et ultra-sécurisée pour contourner les accès impossibles, les cages d'escalier étroites et les étages élevés très fréquents dans le 92.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/services">Voir tous nos services logistiques</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-92" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir sur le déménagement dans le 92.</p>
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
                      départ vers le 92 ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la forte densité urbaine ou les règles des copropriétés vous stresser. Contactez nos experts pour une étude personnalisée et recevez un devis gratuit sous 24h.
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