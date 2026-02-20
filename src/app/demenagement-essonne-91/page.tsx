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
  Microscope, 
  Home, 
  ArrowRight, 
  ChevronRight,
  Map,
  Beaker,
  Building2,
  Truck
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Essonne (91) | Expert Paris-Saclay & Devis Gratuit",
  description: "Déménageur de confiance en Essonne (91). Spécialiste du plateau de Saclay, Évry et Massy. Solutions pour particuliers, laboratoires et entreprises. Devis en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-essonne-91",
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
    description: "Nous maîtrisons la densité urbaine du nord (Massy, Évry) comme les accès ruraux du sud Essonne."
  },
  {
    icon: Users,
    title: "Équipes Polyvalentes",
    description: "Déménageurs formés au mobilier familial comme au matériel professionnel de haute précision."
  },
  {
    icon: Microscope,
    title: "Expertise Recherche",
    description: "Spécialistes du transfert pour les laboratoires et start-ups des pôles de Saclay et d'Évry."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Totale",
    description: "Assurance complète et gestion des autorisations de stationnement auprès des communes du 91."
  }
];

const FAQS = [
  { question: "Intervenez-vous sur le plateau de Paris-Saclay ?", answer: "Oui, nous sommes très actifs sur le plateau de Saclay (Palaiseau, Orsay, Gif). Nous accompagnons les chercheurs, les étudiants et les entreprises technologiques avec des protocoles adaptés aux campus et zones d'activités sécurisées." },
  { question: "Comment gérez-vous les déménagements en zone dense comme Évry ?", answer: "La planification est notre priorité. Nous gérons les demandes d'arrêtés municipaux pour le stationnement et utilisons des monte-meubles pour les immeubles de grande hauteur afin de garantir rapidité et sécurité." },
  { question: "Déménagez-vous dans le sud rural de l'Essonne ?", answer: "Absolument. Nos camions de différents gabarits nous permettent d'accéder aux propriétés du sud Essonne (Étampes, Dourdan) ou aux centres-villes anciens aux rues parfois étroites." },
  { question: "Proposez-vous des tarifs pour les étudiants ?", answer: "Oui, nous avons des formules 'Économique' idéales pour les petits volumes (studios). C'est la solution préférée des étudiants des universités d'Évry et Paris-Saclay pour déménager à moindre coût." }
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
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/saclay-91/1920/1080"
          alt="Cluster scientifique de Paris-Saclay en Essonne"
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
            <span className="text-white">Essonne (91)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Beaker className="h-4 w-4" />
              Terre d'Innovation & Pavillons
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans l'Essonne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Saclay à Évry, nous orchestrons votre installation dans le 91. Solutions sur-mesure pour chercheurs, familles et entreprises technologiques.
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
                Un département, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">mille facettes logistiques</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                L'Essonne est un territoire de contrastes. D'un côté, le nord ultra-dynamique avec ses pôles de recherche mondiaux (Saclay, Genopole) ; de l'autre, des zones pavillonnaires et rurales paisibles.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons ces deux univers. Que vous soyez un scientifique emménageant près de son laboratoire ou une famille s'installant dans un pavillon à Corbeil, nous déployons les moyens techniques nécessaires (camions adaptés, monte-meubles) pour une transition sans accroc.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Pôles Scientifiques,<br/> <span className="text-slate-500 font-normal text-sm">gestion du matériel sensible et accès campus.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/essonne-move/800/600"
                  alt="Équipe de déménagement professionnelle en Essonne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-essonne" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'avantage Marne Transdem
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une connaissance millimétrée du 91 pour un service réactif et sécurisé.
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

      {/* --- CITIES GRID (SEO Siloing) --- */}
      <section id="cities-essonne" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Présents dans <span className="text-[#00ad9f]">tout le 91.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Nos camions sillonnent quotidiennement les routes de l'Essonne. Retrouvez nos secteurs d'intervention prioritaires :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ESSONNE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
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
                  src="https://picsum.photos/seed/essonne-pavillon-91/800/600"
                  alt="Déménagement d'une maison en Essonne"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Pavillons & Familles</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Spécialistes des gros volumes, nous gérons vos mobiliers de jardin et vos objets fragiles avec soin.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Microscope className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Laboratoires & Tech</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Transport sécurisé de matériel scientifique et serveurs informatiques sur le plateau de Saclay.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre Économique à la prestation Confort clé en main pour un déménagement sans effort.</p>
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
      <section id="faq-essonne" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour déménager dans le 91.</p>
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
                    <span className="text-[#00ad9f]">départ vers le 91 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez nos experts pour une étude personnalisée et recevez un devis gratuit sous 24h.
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