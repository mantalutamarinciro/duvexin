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
  Microscope, 
  Home, 
  ArrowRight, 
  ChevronRight,
  Map as MapIcon,
  Beaker,
  Building2,
  Truck
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Essonne (91) | Expert Paris-Saclay | Devis Gratuit",
  description: "Déménageur de confiance en Essonne (91). Spécialiste du plateau de Saclay, Évry et Massy. Solutions pour particuliers, laboratoires et entreprises. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-essonne-91",
  }
};

const ESSONNE_CITIES = [
  { name: "Évry-Courcouronnes", link: "/demenagement-evry-91000"},
  { name: "Corbeil-Essonnes", link: "/demenagement-corbeil-essonnes-91100"},
  { name: "Massy", link: "/demenagement-massy-91300"},
  { name: "Savigny-sur-Orge", link: "/demenagement-savigny-sur-orge-91600"},
  { name: "Sainte-Geneviève-des-Bois", link: "/demenagement-sainte-genevieve-des-bois-91700"},
  { name: "Palaiseau", link: "/demenagement-palaiseau-91120"},
  { name: "Athis-Mons", link: "/demenagement-athis-mons-91200"},
  { name: "Vigneux-sur-Seine", link: "/demenagement-vigneux-sur-seine-91270"},
  { name: "Draveil", link: "/demenagement-draveil-91210"},
  { name: "Grigny", link: "/demenagement-grigny-91350"},
  { name: "Brétigny-sur-Orge", link: "/demenagement-bretigny-sur-orge-91220"},
  { name: "Étampes", link: "/demenagement-etampes-91150"}
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Logistique Bimodale",
    description: "Nous maîtrisons parfaitement la densité urbaine du nord (Massy, Évry) comme les accès ruraux complexes du sud de l'Essonne."
  },
  {
    icon: Users,
    title: "Équipes Polyvalentes",
    description: "Nos déménageurs sont formés au mobilier familial traditionnel comme au matériel professionnel et informatique de haute précision."
  },
  {
    icon: Microscope,
    title: "Expertise Recherche",
    description: "Spécialistes reconnus du transfert pour les laboratoires, start-ups et campus des pôles d'excellence de Saclay et d'Évry."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Totale",
    description: "Assurance Ad Valorem complète et gestion intégrale des autorisations de stationnement auprès des 194 communes du 91."
  }
];

const FAQS = [
  { 
    question: "Intervenez-vous sur le plateau de Paris-Saclay ?", 
    answer: "Oui, nous sommes très actifs sur le plateau de Saclay (Palaiseau, Orsay, Gif-sur-Yvette). Nous accompagnons les chercheurs, les étudiants (CentraleSupélec, Polytechnique) et les entreprises technologiques avec des protocoles stricts, parfaitement adaptés aux campus et aux zones d'activités très sécurisées." 
  },
  { 
    question: "Comment gérez-vous les déménagements en zone dense comme Évry ?", 
    answer: "La planification est notre priorité absolue. Nous gérons très en amont les demandes d'arrêtés municipaux pour le stationnement et utilisons systématiquement des monte-meubles pour les immeubles de grande hauteur (très fréquents à Évry ou Massy) afin de garantir rapidité et sécurité." 
  },
  { 
    question: "Déménagez-vous dans le sud rural de l'Essonne ?", 
    answer: "Absolument. Notre flotte comprend des camions de tous gabarits (notamment des petits porteurs) qui nous permettent d'accéder sans difficulté aux propriétés isolées du sud Essonne (Étampes, Dourdan, Milly-la-Forêt) ou aux centres-villes historiques aux rues parfois très étroites." 
  },
  { 
    question: "Proposez-vous des tarifs pour les étudiants ?", 
    answer: "Oui, nous avons conçu des formules 'Économiques' idéales pour les petits volumes (studios, chambres universitaires). C'est la solution préférée des nombreux étudiants des universités d'Évry et de Paris-Saclay pour déménager à moindre coût, tout en bénéficiant d'un transport sécurisé." 
  }
];

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Hélène G.", text: "Un déménagement sans accroc de Paris à Évry. L'équipe était très professionnelle, ponctuelle et efficace. Je recommande vivement leurs services.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Helene91` },
  { id: "fallback-2", name: "Thomas L.", text: "Prestation de qualité pour notre pavillon à Corbeil-Essonnes. Le conseiller a bien évalué nos besoins et l'équipe sur place a été très soigneuse. Top !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Thomas91` },
  { id: "fallback-3", name: "Laboratoire Innov'Science", text: "Le transfert de notre matériel sensible sur le plateau de Saclay a été géré avec une rigueur exemplaire. Emballages spécifiques, tout était parfait.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=InnovScience91` },
];

export default function EssonnePage() {
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
          alt="Déménageur professionnel en pleine planification logistique"
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
            <span className="text-[#00ad9f]">Essonne (91)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Beaker className="h-4 w-4" />
              Terre d'Innovation & Pavillons
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans l'Essonne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Saclay à Évry, nous orchestrons votre installation dans le 91. Des solutions logistiques sur-mesure pour les chercheurs, les familles et les entreprises technologiques.
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
                Un département, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">mille facettes logistiques</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  L'Essonne est un territoire de grands contrastes. D'un côté, le nord ultra-dynamique avec ses immenses pôles de recherche mondiaux (Plateau de Saclay, Genopole) et ses grands ensembles ; de l'autre, le sud Essonne avec ses zones pavillonnaires calmes et ses villages ruraux paisibles.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons parfaitement ces deux univers. Que vous soyez un scientifique emménageant près de son laboratoire à Orsay, ou une famille s'installant dans un grand pavillon à Corbeil-Essonnes, nous déployons les moyens techniques adéquats (camions sur-mesure, monte-meubles) pour une transition sans aucun accroc.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Building2 className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Expertise Pôles Scientifiques</h3>
                   <p className="text-slate-500 font-light">Gestion rigoureuse du matériel sensible, des accès campus et des transferts B2B.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-essonne.webp"
                  alt="Équipe de déménagement professionnelle en intervention en Essonne"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-essonne" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 91
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une connaissance millimétrée du territoire essonnien pour un service réactif et hautement sécurisé.
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

      {/* --- CITIES GRID (SEO Siloing) --- */}
      <section id="cities-essonne" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Présents dans <span className="text-[#00ad9f]">tout le 91.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Nos camions sillonnent quotidiennement les routes de l'Essonne, du nord très urbanisé au sud plus rural. Retrouvez nos secteurs d'intervention prioritaires :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ESSONNE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
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
                  alt="Déménageur protégeant du mobilier de valeur et des équipements sensibles"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Pavillons & Familles</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Spécialistes des gros volumes de maisons, nous gérons vos mobiliers de jardin, vos extérieurs et vos objets familiaux avec le plus grand soin.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Microscope className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Laboratoires & Tech (Saclay)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Transport sécurisé et extrêmement rigoureux de matériel scientifique, machines-outils et serveurs informatiques sur le plateau de Saclay.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Modulables</h4>
                    <p className="text-slate-500 font-light leading-relaxed">De l'offre Économique (idéale étudiants) à la prestation Confort clé en main (emballage de tout le fragile) pour un déménagement sans effort.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Comparer nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-essonne" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour déménager sereinement dans le 91.</p>
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
                      départ vers le 91 ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique au hasard, qu'il s'agisse d'un studio étudiant ou d'un laboratoire de recherche. Contactez nos experts pour une étude personnalisée et recevez un devis gratuit sous 24h.
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