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
  Trees,
  Briefcase,
  Home,
  LayoutGrid
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Seine-et-Marne (77) | Expert Local & Devis Gratuit",
  description: "Déménageur de confiance en Seine-et-Marne (77). De Meaux à Fontainebleau, nous gérons vos déménagements résidentiels et transferts de bureaux. Devis sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-seine-et-marne-77",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Laetitia F.", text: "Super service pour notre déménagement à Fontainebleau. L'équipe a été très professionnelle et a pris grand soin de nos meubles anciens dans notre nouvelle maison de ville. Je recommande vivement.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Laetitia77` },
  { id: "fallback-2", name: "Marc T.", text: "Efficacité et rapidité pour mon installation à Meaux. Le devis était clair et sans surprise. Le jour J, tout s'est déroulé comme prévu, même la gestion du stationnement difficile en centre-ville.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcT77` },
  { id: "fallback-3", name: "Famille Durand", text: "Déménagement de Paris vers Chelles exemplaire. Une entreprise familiale sérieuse qui connaît parfaitement les axes routiers du 77 pour éviter les bouchons. Zéro casse à l'arrivée.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Durand77` },
];

const SEINE_ET_MARNE_CITIES = [
  "Meaux", "Chelles", "Melun", "Pontault-Combault", "Savigny-le-Temple", 
  "Bussy-Saint-Georges", "Villeparisis", "Champs-sur-Marne", "Roissy-en-Brie", 
  "Fontainebleau", "Lagny-sur-Marne", "Brie-Comte-Robert"
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise Territoriale",
    description: "Des pôles urbains du Grand Paris aux zones rurales du sud-Seine-et-Marne, nous maîtrisons chaque itinéraire du 77."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Flotte de véhicules variée pour s'adapter aussi bien aux rues médiévales de Provins qu'aux larges avenues de Marne-la-Vallée."
  },
  {
    icon: Building2,
    title: "Gestion des Autorisations",
    description: "Nous prenons en charge les demandes d'arrêté municipal de stationnement dans toutes les mairies du département."
  },
  {
    icon: ShieldCheck,
    title: "Protection & Assurance",
    description: "Protection sous bullkraft et couvertures lourdes. Chaque projet bénéficie d'une assurance contractuelle incluse."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous les longues distances à l'intérieur du 77 ?", 
    answer: "La Seine-et-Marne est le plus grand département francilien. Nous planifions nos trajets via l'A4, l'A5 et la Francilienne pour garantir une ponctualité totale, que vous déménagiez de Chelles à Fontainebleau ou de Melun à Meaux." 
  },
  { 
    question: "Déménagez-vous les grandes propriétés et maisons bourgeoises ?", 
    answer: "Absolument. Nous sommes habitués aux déménagements de gros volumes (maisons de maître, longères). Une visite technique préalable permet de calibrer le nombre de déménageurs et de camions nécessaires." 
  },
  { 
    question: "Proposez-vous des services pour les entreprises de Seine-et-Marne ?", 
    answer: "Oui, nous accompagnons les professionnels pour des transferts de bureaux ou de parcs informatiques dans les zones d'activités du département, avec une planification qui minimise l'arrêt de votre productivité." 
  },
  { 
    question: "Quel est le délai pour obtenir un devis gratuit ?", 
    answer: "Nous sommes très réactifs. Après votre demande en ligne ou une visite technique, vous recevez votre devis détaillé et définitif sous 24 heures ouvrées." 
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

export default function SeineEtMarnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/seine-et-marne-castle/1920/1080"
          alt="Déménagement en Seine-et-Marne"
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
            <span className="text-white">Seine-et-Marne (77)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Expert Déménagement Ile-de-France Est
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                en Seine-et-Marne.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de référence pour le 77. De Melun à Meaux, profitez d'une transition sereine avec nos équipes locales expertes.
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
                Une logistique agile pour <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">le plus grand département du 75</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                La Seine-et-Marne (77) offre un territoire aux visages multiples. Entre le dynamisme des villes nouvelles de Marne-la-Vallée, le prestige de Fontainebleau et la tranquillité des zones rurales du Gâtinais, chaque déménagement est un défi unique.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons chaque spécificité du 77. Que vous emménagiez dans une maison avec jardin ou que vous transfériez vos bureaux vers un pôle économique majeur, nous garantissons une transition fluide, sécurisée et ponctuelle.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <LayoutGrid className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Maillage Territorial,<br/> <span className="text-slate-500 font-normal text-sm">une parfaite maîtrise des accès urbains et ruraux du 77.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/77-move/800/600"
                  alt="Équipe de déménagement en intervention en Seine-et-Marne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES LIST --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Interventions dans toute la Seine-et-Marne
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Nos équipes couvrent l'intégralité du département, des pôles urbains aux communes rurales.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {SEINE_ET_MARNE_CITIES.map((city) => (
              <div key={city} className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm font-bold text-slate-700 shadow-sm hover:border-[#00ad9f] hover:text-[#00ad9f] transition-all cursor-default">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-77" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
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
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2rem] opacity-10 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/77-pack/800/600"
                  alt="Soin apporté aux objets fragiles lors d'un déménagement dans le 77"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil résidentiel.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons de Caractère & Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les propriétés avec jardin et emballage scrupuleux de vos biens les plus volumineux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Copropriétés</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et utilisation de monte-meubles pour les étages élevés en centre-ville.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Professionnels</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Services dédiés aux entreprises : planification optimisée et protection rigoureuse du matériel informatique.</p>
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
      <section id="faq-77" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie en Seine-et-Marne.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-200"
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
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ vers le 77 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Contactez nos experts pour une visite gratuite et obtenez un devis complet sous 24h.
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