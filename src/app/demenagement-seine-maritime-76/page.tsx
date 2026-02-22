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
  Anchor,
  Home,
  Briefcase,
  LayoutGrid,
  Ship
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Seine-Maritime (76) | Expert Normand & Devis Gratuit",
  description: "Marne Transdem : votre expert pour déménager en Seine-Maritime (76). Rouen, Le Havre, Dieppe. Réactivité via notre agence d'Évreux. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-seine-maritime-76",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lefevre", text: "Le déménagement de notre maison de Paris vers Le Havre a été une vraie réussite. L'équipe a été très professionnelle et a parfaitement géré la longue distance. Une organisation sans faille !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre76` },
  { id: "fallback-2", name: "Sophie G.", text: "Un service client au top et une équipe de déménageurs très efficace pour mon appartement à Rouen. Ils connaissent bien les rues étroites du centre. Je recommande vivement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG76` },
  { id: "fallback-3", name: "Marc D.", text: "Devis clair, pas de surprise. Mon transfert de bureaux vers Dieppe s'est déroulé sans stress grâce à leur rigueur. Une entreprise normande fiable.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD76` },
];

const SEINE_MARITIME_CITIES = [
  "Le Havre", "Rouen", "Dieppe", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", 
  "Le Grand-Quevilly", "Le Petit-Quevilly", "Fécamp", "Elbeuf", "Mont-Saint-Aignan", 
  "Barentin", "Yvetot"
];

const WHY_US_ITEMS = [
  {
    icon: Ship,
    title: "Expertise Portuaire",
    description: "De Rouen au Havre, nous maîtrisons les défis logistiques des grandes zones portuaires et des centres historiques normands."
  },
  {
    icon: Truck,
    title: "Proximité Évreux",
    description: "Notre agence régionale nous permet une réactivité maximale pour vos visites techniques et vos interventions dans tout le 76."
  },
  {
    icon: ShieldCheck,
    title: "Soin Côte d'Albâtre",
    description: "Protection spécifique pour le mobilier lors de transferts littoraux (vent, humidité) pour une sécurité et une intégrité absolues."
  },
  {
    icon: Users,
    title: "Équipes Qualifiées",
    description: "Nos déménageurs sont des salariés formés à nos standards d'excellence pour vous garantir un service respectueux et professionnel."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous les accès difficiles à Rouen ou Dieppe ?", 
    answer: "Les centres historiques normands ont souvent des rues très étroites. Nous réalisons une visite technique préalable pour choisir le véhicule adapté (petit porteur si nécessaire) et gérons les autorisations de stationnement auprès des mairies pour sécuriser l'opération le jour J." 
  },
  { 
    question: "Effectuez-vous des déménagements entre Paris et Le Havre ?", 
    answer: "Oui, c'est un axe majeur de notre activité logistique. Nous organisons des voyages réguliers en direct ou en groupage (selon votre volume et vos impératifs) pour vous offrir un tarif compétitif sur cette liaison nationale." 
  },
  { 
    question: "Proposez-vous des solutions pour les entreprises en Seine-Maritime ?", 
    answer: "Absolument. Nous accompagnons les professionnels pour des transferts de bureaux, d'ateliers, d'archives ou de commerces avec une planification rigoureuse qui minimise l'impact sur votre production ou votre chiffre d'affaires." 
  },
  { 
    question: "Quelles sont vos garanties en cas de dommage pendant le transport ?", 
    answer: "La sérénité avant tout : chaque déménagement est couvert par notre assurance contractuelle. Pour vos œuvres d'art ou objets de grande valeur, nous proposons également des extensions d'assurance 'Ad Valorem' sur-mesure." 
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

export default function SeineMaritimePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Équipe de déménagement professionnelle en action"
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
            <span className="text-[#00ad9f]">Seine-Maritime (76)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Anchor className="h-4 w-4" />
              Expert Déménagement Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                en Seine-Maritime.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Rouen au Havre, bénéficiez de l'expertise d'un déménageur local pour vos projets résidentiels et professionnels, au meilleur prix et en toute sécurité.
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
                Une logistique agile <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour la Vallée de la Seine</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  La Seine-Maritime est un département de caractère, alliant la densité urbaine et historique de Rouen, la puissance portuaire du Havre et le charme singulier de la Côte d'Albâtre. Déménager dans le 76 demande une parfaite connaissance des axes routiers (A13, A29) et des spécificités d'accès locales.
                </p>
                <p>
                  Grâce à notre agence basée en Normandie, <strong>Déménagement du Vexin</strong> vous offre la réactivité d'un voisin et la force logistique d'un leader. Nous gérons chaque étape de votre transfert, de la protection sur-mesure de votre patrimoine à la réservation du stationnement, pour un emménagement sans aucun accroc.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <LayoutGrid className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Maillage Normand</h3>
                   <p className="text-slate-500 font-light">Une couverture complète du littoral aux grandes agglomérations intérieures.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-seine-maritime.webp"
                  alt="Déménageur professionnel en intervention dans la région de Rouen"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES GRID --- */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ad9f]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Nous couvrons l'ensemble <span className="text-[#00ad9f]">du département</span>.
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Nos équipes normandes rayonnent quotidiennement sur toutes les communes du 76.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {SEINE_MARITIME_CITIES.map((city) => (
              <div key={city} className="bg-white border border-slate-200 rounded-2xl p-5 text-center text-sm font-bold text-slate-700 shadow-sm hover:shadow-md hover:border-[#00ad9f]/30 hover:text-[#00ad9f] transition-all cursor-default flex items-center justify-center">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-76" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le choix de la sérénité
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une présence locale forte et une logistique taillée pour la Seine-Maritime.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
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
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Protection soignée du mobilier lors d'un déménagement en Seine-Maritime"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque profil résidentiel.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Centres Historiques</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection totale des parties communes et utilisation systématique de monte-meubles pour contourner les accès exigus de Rouen ou Dieppe.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts d'Entreprises & Commerces</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique sur-mesure dédiée aux bureaux et magasins : planification optimisée et travail en horaires décalés pour limiter l'arrêt de votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Garde-Meubles Sécurisé</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Un imprévu ou un besoin de stockage temporaire ? Profitez de nos solutions de box plombés, isolés et sous surveillance continue.</p>
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
      <section id="faq-76" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer sereinement votre installation dans le 76.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-[1.5rem] px-4 data-[state=open]:border-[#00ad9f]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
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
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      départ vers le 76 ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique ternir votre projet normand. Contactez nos experts régionaux pour une visite technique gratuite et obtenez un devis complet sous 24h.
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