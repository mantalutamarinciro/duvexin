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
  Factory,
  ArrowRight, 
  ChevronRight, 
  Map,
  Microscope,
  Home,
  Briefcase,
  LayoutGrid,
  Layers,
  ShieldAlert
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Val-de-Reuil (27) | Particuliers & Entreprises | Devis 24h",
  description: "Déménageur de confiance à Val-de-Reuil (27100). Spécialiste transfert de bureaux, industrie pharmaceutique et résidences. Devis gratuit sous 24h et expertise locale.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-val-de-reuil-27100",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dufour", text: "Notre déménagement à Val-de-Reuil a été une réussite totale. L'équipe a été très professionnelle et a su s'adapter parfaitement à l'urbanisme de la ville nouvelle. Un service rapide et efficace.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour27` },
  { id: "fallback-2", name: "Société Pharma-Log", text: "Le transfert de notre site de production a été géré avec une rigueur exemplaire. Une équipe qui connaît bien les enjeux de sécurité des zones d'activités rolivaloises. Indispensable pour le B2B.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=PharmaLog27` },
  { id: "fallback-3", name: "Marc T.", text: "Service impeccable pour mon appartement. Devis clair, pas de frais cachés et équipe ponctuelle. Un déménagement sans stress dans le centre-ville. Je recommande Déménagement du Vexin.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT27VDR` },
];

const WHY_US_ITEMS = [
  {
    icon: Microscope, // Variable Microscope
    title: "Expertise Pôle Pharma",
    description: "Habitués aux transferts sensibles pour l'industrie pharmaceutique et cosmétique de la zone d'activités."
  },
  {
    icon: LayoutGrid,
    title: "Maîtrise Ville Nouvelle",
    description: "Connaissance approfondie de l'urbanisme spécifique de Val-de-Reuil pour une logistique fluide et sans détours."
  },
  {
    icon: Factory,
    title: "Solutions Industrielles",
    description: "Capacité de manutention lourde pour le transfert de machines, d'ateliers et de parcs informatiques."
  },
  {
    icon: ShieldCheck,
    title: "Proximité Évreux",
    description: "Notre agence régionale nous permet d'intervenir en un temps record pour vos visites techniques et le jour J."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement d'entreprise à Val-de-Reuil ?", 
    answer: "Nous réalisons un audit technique complet. Pour les entreprises du pôle pharmaceutique ou logistique, nous planifions l'intervention en dehors des heures de production (week-end ou nuit) pour garantir une continuité d'activité totale." 
  },
  { 
    question: "Intervenez-vous dans les quartiers résidentiels de la ville ?", 
    answer: "Oui, nous couvrons tous les quartiers de Val-de-Reuil. L'urbanisme moderne facilite souvent les accès, ce qui nous permet d'être très compétitifs sur les temps d'intervention pour les particuliers." 
  },
  { 
    question: "Déménagez-vous sur de longues distances depuis le 27100 ?", 
    answer: "Absolument. Que vous quittiez la Normandie pour une autre région ou que vous arriviez à Val-de-Reuil, nous gérons votre déménagement national avec la même rigueur et des véhicules géolocalisés." 
  },
  { 
    question: "Quelles sont les garanties pour le matériel fragile ?", 
    answer: "Nous utilisons des fournitures premium : bullkraft, couvertures de fort grammage et housses matelassées. Pour le matériel de laboratoire ou informatique, nous prévoyons des protections spécifiques et une assurance Ad Valorem." 
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

export default function ValDeReuilPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/valdereuil-city/1920/1080"
          alt="Vue aérienne de Val-de-Reuil, ville nouvelle de l'Eure"
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
            <Link href="/zones" className="hover:text-white transition-colors">Eure (27)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Val-de-Reuil</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Microscope className="h-4 w-4" />
              Expert Déménagement Pôle Économique 27
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Val-de-Reuil.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de référence pour les particuliers et les industries de Val-de-Reuil (27100). Efficacité, sécurité et proximité.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
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
                Une logistique de pointe <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour le bassin rolivalois</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Val-de-Reuil est une ville résolument tournée vers l'avenir, abritant l'un des pôles pharmaceutiques les plus importants d'Europe. Déménager dans cet environnement dynamique exige une expertise capable de gérer aussi bien le transfert d'un siège social que l'installation d'une nouvelle famille.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre agence d'Évreux, <strong>Déménagement du Vexin</strong> est votre expert local. Nous maîtrisons chaque zone d'activités et quartier résidentiel pour vous garantir une prestation sans accroc, dans le respect de vos délais.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Factory className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Entreprises & Industries,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des protocoles de sécurité et transferts de laboratoires.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/val-de-reuil-pro/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Val-de-Reuil"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grille d'avantages) --- */}
      <section id="why-us-vdr" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour l'Eure
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance de Val-de-Reuil est votre meilleure garantie de réactivité.
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
                  src="https://picsum.photos/seed/vdr-packing/800/600"
                  alt="Déménageur protégeant du matériel industriel à Val-de-Reuil"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil du 27100.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux & Industries</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux pôles pharmaceutiques et cosmétiques : parcs informatiques, archives et équipements sensibles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Résidentiel : Pavillons & Appartements</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service soigné pour les familles et les jeunes actifs de la ville nouvelle, avec protection intégrale du mobilier.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre Économique à la prestation Clé-en-main, nous adaptons notre intervention à votre budget.</p>
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
      <section id="faq-vdr" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Val-de-Reuil.</p>
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
                    <span className="text-[#00ad9f]">départ de Val-de-Reuil ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique freiner vos ambitions professionnelles ou familiales. Contactez nos experts pour une visite gratuite et obtenez un devis complet sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/dashboard/quote">
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