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
  TreePine,
  ArrowRight, 
  ChevronRight, 
  Map,
  Briefcase,
  Home,
  Sparkles,
  History
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Rueil-Malmaison (92) | Expert local & Devis Gratuit",
  description: "Déménageur de confiance à Rueil-Malmaison (92500). Spécialiste Rueil 2000, Arsenal et centre historique. Devis gratuit sous 24h, monte-meubles et garanties.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-rueil-malmaison-92500",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Giraud", text: "Notre déménagement dans une maison à Rueil s'est parfaitement déroulé. L'équipe a été très professionnelle et a su gérer les accès spécifiques de notre rue près du centre. Un grand merci !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Giraud92` },
  { id: "fallback-2", name: "Claire L.", text: "Un service client à l'écoute et une équipe de déménageurs au top pour mon appartement à Rueil 2000. Ils ont géré les badges d'accès et les horaires avec brio. Je recommande !", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireL92` },
  { id: "fallback-3", name: "Marc D.", text: "Devis clair, pas de surprise, et une efficacité redoutable. Le transfert de mon bureau vers le quartier de l'Arsenal a été simple et rapide grâce à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD92` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Connaissance du 92500",
    description: "De Rueil 2000 aux hauteurs de Buzenval, nous maîtrisons chaque accès et plan de circulation de la Ville Impériale."
  },
  {
    icon: TreePine,
    title: "Spécialiste Pavillonnaire",
    description: "Expertise reconnue pour les maisons avec jardin : protection des extérieurs, des sols et gestion des accès étroits."
  },
  {
    icon: Truck,
    title: "Logistique A86 & Arsenal",
    description: "Une organisation rodée sur les grands axes pour garantir une ponctualité totale, y compris dans l'éco-quartier de l'Arsenal."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des demandes d'autorisation de stationnement auprès de la mairie de Rueil-Malmaison."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement dans le centre historique de Rueil ?", 
    answer: "Le centre ancien possède des rues étroites. Nous réalisons une étude d'accès pour choisir le véhicule idéal (petit porteur agile) et nous gérons l'arrêté municipal pour privatiser les places de stationnement nécessaires devant votre porte." 
  },
  { 
    question: "Intervenez-vous pour des transferts de sièges sociaux à Rueil 2000 ?", 
    answer: "Oui, c'est l'un de nos points forts. Nous accompagnons les entreprises de Rueil 2000 pour des transferts de bureaux, de parcs informatiques ou d'archives, avec une planification souvent réalisée le week-end." 
  },
  { 
    question: "Utilisez-vous un monte-meubles pour les résidences modernes ?", 
    answer: "Absolument. Que ce soit à l'Arsenal ou à Plaine-Gare, le monte-meubles extérieur sécurise votre mobilier, préserve les ascenseurs des résidences neuves et accélère l'opération." 
  },
  { 
    question: "Quel est le délai pour obtenir une visite technique à Rueil ?", 
    answer: "Grâce à notre présence constante dans le 92, nous pouvons intervenir sous 48h pour une visite à domicile (ou par visio) afin de vous transmettre un devis détaillé sous 24h ouvrées." 
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

export default function RueilMalmaisonPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/rueil-castle/1920/1080"
          alt="Patrimoine architectural de Rueil-Malmaison"
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
            <Link href="/demenagement-hauts-de-seine-92" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Rueil-Malmaison</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <History className="h-4 w-4" />
              Expert Déménagement Ville Impériale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Rueil-Malmaison.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique au service du cadre de vie rueillois (92500). Une maîtrise parfaite des pôles tertiaires et du pavillonnaire de standing.
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
                Une logistique d'orfèvre <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour une ville de prestige</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Rueil-Malmaison est une commune d'exception, mêlant un patrimoine impérial unique, le dynamisme économique de Rueil 2000 et des quartiers résidentiels verdoyants. Déménager dans ce secteur demande une expertise capable de s'adapter aussi bien au centre-ville historique qu'aux nouveaux éco-quartiers.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité du territoire rueillois. Que vous emménagiez dans une maison meulière à Buzenval ou que vous transfériez vos bureaux, nous planifions chaque détail logistique pour garantir une transition fluide.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <TreePine className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Habitat Vert,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès pavillonnaires et soin des extérieurs.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/rueil-moving-team/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Rueil"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-rueil" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 92
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite connaissance de Rueil-Malmaison est votre meilleure garantie de ponctualité.
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
                  src="https://picsum.photos/seed/rueil-pack-box/800/600"
                  alt="Déménageur protégeant du mobilier de valeur à Rueil"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil rueillois.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Villas & Pavillons de standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique pour grands volumes avec protection maximale des parquets, escaliers et mobilier précieux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Arsenal</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Intervention soignée dans les immeubles denses avec gestion des accès complexes et monte-meubles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux Rueil 2000</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Services B2B dédiés : planification optimisée, protection informatique et gestion d'archives.</p>
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
      <section id="faq-rueil" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Rueil-Malmaison.</p>
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
                    <span className="text-[#00ad9f]">départ de Rueil ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ternir votre projet. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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
