import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VerifiedTestimonialsSection } from "@/components/testimonials-section";

// Icons
import {
  Calculator,
  ArrowRight, 
  ChevronRight,
  Briefcase,
  Building2,
  MoveUp,
  Building
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménageur Hauts-de-Seine (92) | Accès et devis",
  description: "Préparez votre déménagement dans les Hauts-de-Seine : Boulogne, Neuilly, Levallois, Nanterre et La Défense. Accès, stationnement et devis personnalisé.",
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
    title: "Accès urbains",
    description: "Rues étroites, stationnement, sens uniques, étage et distance de portage sont étudiés aux deux adresses."
  },
  {
    icon: Briefcase,
    title: "Transferts à La Défense",
    description: "Les accès de livraison, monte-charges, créneaux et règles du bâtiment doivent être confirmés avant le transfert."
  },
  {
    icon: MoveUp,
    title: "Levage si nécessaire",
    description: "La possibilité d’un monte-meubles dépend du mobilier, de l’étage, de la façade et du recul disponible."
  },
  {
    icon: Calculator,
    title: "Devis détaillé",
    description: "Volume, accès, trajet, formule et options sont précisés afin de comparer le périmètre des prestations."
  }
];

const FAQS = [
  { 
    question: "Comment organisez-vous un transfert d'entreprise à La Défense ?", 
    answer: "Le gestionnaire du bâtiment doit confirmer les créneaux autorisés, les accès logistiques, la réservation du monte-charge et les règles applicables aux intervenants. Ces contraintes, ainsi que le mobilier et le calendrier de l’activité, sont intégrées à la préparation du devis."
  },
  { 
    question: "Le monte-meubles est-il obligatoire dans les Hauts-de-Seine ?", 
    answer: "Il n’est pas systématique. Son intérêt dépend des dimensions du mobilier, de l’ascenseur et de l’escalier, mais aussi de la façade et des possibilités de stationnement. Une vérification des accès permet de décider s’il doit figurer au devis."
  },
  { 
    question: "Prenez-vous en charge les autorisations de stationnement ?", 
    answer: "Les règles et délais varient selon la commune et l’adresse. Le devis doit préciser la répartition de cette démarche et les informations nécessaires, sans présumer qu’un emplacement au pied de l’immeuble sera disponible."
  },
  { 
    question: "Gérez-vous les objets d'art et de valeur ?", 
    answer: "Signalez dès l’inventaire la nature, les dimensions, le poids et la valeur des objets concernés. Les moyens de manutention, les protections et les conditions contractuelles applicables peuvent alors être précisés dans la proposition."
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
      { "@type": "ListItem", position: 2, name: "Zones d’intervention", item: "https://demenagementduvexin.fr/zones-intervention" },
      { "@type": "ListItem", position: 3, name: "Déménagement Hauts-de-Seine (92)", item: "https://demenagementduvexin.fr/demenagement-hauts-de-seine-92" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Villes des Hauts-de-Seine",
    numberOfItems: HAUTS_DE_SEINE_CITIES.length,
    itemListElement: HAUTS_DE_SEINE_CITIES.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.name,
      url: `https://demenagementduvexin.fr${city.link}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  },
];


export default function HautsDeSeinePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script 
        id="hauts-de-seine-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
              Déménagement dans le 92
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans les Hauts-de-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Boulogne, Neuilly, Levallois, Nanterre ou La Défense : décrivez les accès, le stationnement, les étages et le calendrier pour obtenir un devis adapté.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Demander mon devis <ArrowRight className="ml-2 h-5 w-5" />
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
                Préparer la verticalité <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et les accès du 92</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Les tours de La Défense, les rues denses de Levallois et Boulogne ou les résidences de Neuilly imposent des contraintes différentes. Accès de livraison, ascenseur, monte-charge, portage et stationnement doivent être vérifiés.
                </p>
                <p>
                  Pour un logement comme pour des bureaux, les deux adresses, le volume, les créneaux disponibles et les règles du bâtiment permettent de définir les moyens à inclure dans la proposition.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Building className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Accès à documenter</h3>
                   <p className="text-slate-500 font-light">Étages, ascenseur, monte-charge, portage et stationnement sont étudiés avant le chiffrage.</p>
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
              Les points vérifiés avant le devis
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une description précise du mobilier, des accès et du calendrier permet d’établir une proposition cohérente.
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
              Nos pages locales <span className="text-[#00ad9f]">dans le 92.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Consultez les informations dédiées aux principales villes du département. Pour une autre commune, décrivez les deux adresses dans la demande de devis.
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
                Des prestations <br/> <span className="text-[#00ad9f]">définies selon le projet.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux (La Défense)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Mobilier, archives, matériel informatique, accès de livraison et plan d’implantation sont recensés avant la proposition.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Immeubles résidentiels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Les halls, ascenseurs, escaliers et règles de copropriété sont à décrire pour préparer le passage et la protection du mobilier.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><MoveUp className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Monte-meubles éventuel</h4>
                    <p className="text-slate-500 font-light leading-relaxed">La façade, l’étage, le mobilier et le recul disponible déterminent si ce moyen est pertinent et réalisable.</p>
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
      <VerifiedTestimonialsSection />

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
                    Décrivez les deux adresses, les accès, le volume estimé, le calendrier et les prestations souhaitées pour obtenir une proposition personnalisée.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Demander mon devis <ArrowRight className="ml-2 h-5 w-5" />
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
