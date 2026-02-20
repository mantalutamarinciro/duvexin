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
  Rocket, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  PackageCheck
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris → Toulouse (31) | Devis Gratuit & Groupage | 24h",
  description: "Déménageur expert sur l'axe Paris-Toulouse. Liaisons hebdomadaires, solutions de groupage et expertise longue distance. Votre devis gratuit sous 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-idf-toulouse",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Boyer", text: "Déménagement de la région parisienne à Toulouse parfaitement réussi. L'équipe a été d'un grand professionnalisme, à l'écoute et très efficace malgré les 700km. Un service irréprochable !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Boyer31` },
  { id: "fallback-2", name: "Vincent R.", text: "Service impeccable pour mon déménagement longue distance. La formule groupage était idéale pour mon budget et tout est arrivé à Toulouse sans le moindre souci. Je recommande vivement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=VincentR31` },
  { id: "fallback-3", name: "AeroSolutions", text: "Le transfert de notre bureau d'études vers Toulouse s'est déroulé avec une rigueur exemplaire. Une équipe qui comprend les enjeux de sécurité pour du matériel technologique.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=AeroSolutions31` },
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons Hebdomadaires",
    description: "Nous assurons des navettes régulières entre l'Île-de-France et la Haute-Garonne pour une flexibilité maximale."
  },
  {
    icon: Truck,
    title: "Sécurité Longue Distance",
    description: "Véhicules récents avec arrimage spécifique pour garantir l'intégrité de vos biens sur plus de 700 km de trajet."
  },
  {
    icon: Scale,
    title: "Groupage Économique",
    description: "Divisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients (volumes < 15m³)."
  },
  {
    icon: Rocket,
    title: "Spécialiste Technologie",
    description: "Protection renforcée pour le matériel informatique et les équipements sensibles (Aéronautique / Spatial)."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement Paris-Toulouse ?", 
    answer: "Pour une distance de 680 km, il faut compter 48 heures. Le premier jour est dédié au chargement en Île-de-France. Le transport s'effectue ensuite, suivi du déchargement et de l'installation à Toulouse le lendemain matin." 
  },
  { 
    question: "Comment fonctionne le groupage vers la Ville Rose ?", 
    answer: "Le groupage est idéal pour les petits volumes. Nous regroupons plusieurs clients dans un même grand porteur de 50m³ ou 100m³. Cela permet de diviser les frais de péage (A20) et de carburant, offrant un tarif ultra-compétitif." 
  },
  { 
    question: "Gérez-vous le stationnement dans le centre de Toulouse ?", 
    answer: "Oui, nous nous occupons des demandes d'occupation du domaine public auprès de la mairie de Toulouse. Que ce soit aux Carmes ou à Saint-Cyprien, nous sécurisons l'emplacement pour le camion et le monte-meubles." 
  },
  { 
    question: "Quelles sont les garanties pour mon mobilier fragile ?", 
    answer: "Pour les trajets nationaux, nous utilisons un emballage renforcé (bullkraft, housses matelassées). Chaque pièce est inventoriée et protégée pour résister aux vibrations du transport routier longue distance." 
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

export default function ToulousePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/toulouse-bridge/1920/1080"
          alt="Vue iconique du Pont Neuf à Toulouse"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/services" className="hover:text-white transition-colors">Déménagement National</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Axe Paris-Toulouse</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Rocket className="h-4 w-4" />
              Liaison Nationale IDF → Occitanie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Paris - Toulouse.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Cap vers la Ville Rose. Profitez d'une logistique rodée pour un déménagement longue distance sécurisé, fluide et au meilleur prix.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis national <ArrowRight className="ml-2 h-4 w-4" />
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
                De la capitale à la <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">Ville Rose</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Rejoindre Toulouse est un projet de vie enthousiasmant, au cœur du dynamisme de l'Occitanie. Pour que ce transfert se fasse sans stress, la maîtrise de la logistique longue distance est impérative. Les 700 km séparant l'IDF du Sud-Ouest exigent une planification sans faille.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons les deux extrémités de votre projet : la gestion du stationnement parisien et les accès parfois complexes du centre toulousain, des briques roses des Carmes aux résidences modernes de Blagnac ou Colomiers.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Timer className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Logistique Haute Performance,<br/> <span className="text-slate-500 font-normal text-sm">liaisons régulières chaque semaine pour optimiser vos coûts.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/toulouse-move-truck/800/600"
                  alt="Déménagement longue distance vers Toulouse"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-toulouse" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre trajet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison Paris-Toulouse parfaitement maîtrisée.
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
                  src="https://picsum.photos/seed/toulouse-packing-pro/800/600"
                  alt="Protection du mobilier pour transport national"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil national.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution complète incluant monte-meubles pour les immeubles toulousains dépourvus d'ascenseur large.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Scale className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Groupage Malin</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Divisez vos frais de carburant et d'autoroute en partageant l'espace d'un camion vers la Haute-Garonne.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><PackageCheck className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Pro & Tech</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service dédié aux entreprises : transfert de parcs informatiques, archives et mobiliers de bureau avec réinstallation.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
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
      <section id="faq-toulouse" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie dans la Ville Rose.</p>
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
                    Prêt pour votre nouvelle <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">vie à Toulouse ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la distance compliquer votre projet. Contactez nos experts pour une étude personnalisée et recevez un devis gratuit sous 24h.
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