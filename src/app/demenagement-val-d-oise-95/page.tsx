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
  LayoutGrid,
  Star
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Val-d'Oise (95) | Expert Local & Devis Gratuit",
  description: "Déménagement du Vexin : votre expert historique dans le Val-d'Oise (95). De Cergy à Argenteuil, profitez d'un savoir-faire local pour particuliers et entreprises. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-val-d-oise-95",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle pour notre départ de Pontoise. Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés !", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Déménagement du 95 vers la Bretagne parfaitement réalisé. Équipe efficace, rapide, et sympathique. Un travail de qualité du début à la livraison.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une équipe ultra efficace, des affaires très bien protégées. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. MERCI !", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const VAL_D_OISE_CITIES = [
  { name: "Argenteuil", link: "/demenagement-argenteuil-95100" },
  { name: "Bezons", link: "/demenagement-bezons-95870" },
  { name: "Cergy", link: "/demenagement-cergy-95000" },
  { name: "Cormeilles-en-Parisis", link: "/demenagement-cormeilles-en-parisis-95240" },
  { name: "Eaubonne", link: "/demenagement-eaubonne-95600" },
  { name: "Enghien-les-Bains", link: "/demenagement-enghien-les-bains-95880" },
  { name: "Ermont", link: "/demenagement-ermont-95120" },
  { name: "Franconville", link: "/demenagement-franconville-95130" },
  { name: "Herblay-sur-Seine", link: "/demenagement-herblay-sur-seine-95220" },
  { name: "L'Isle-Adam", link: "/demenagement-lisle-adam-95290" },
  { name: "Montmorency", link: "/demenagement-montmorency-95160" },
  { name: "Pontoise", link: "/demenagement-pontoise-95300" },
  { name: "Saint-Ouen-l'Aumône", link: "/demenagement-saint-ouen-l-aumone-95310" },
  { name: "Sarcelles", link: "/demenagement-sarcelles-95200" },
  { name: "Taverny", link: "/demenagement-taverny-95150" },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Ancrage Historique",
    description: "Basés au cœur du Val-d'Oise, nous maîtrisons chaque commune, du Vexin rural aux pôles urbains denses."
  },
  {
    icon: Users,
    title: "Équipes du Vexin",
    description: "Nos déménageurs sont des professionnels salariés de la région. Pas de sous-traitance, pour un soin garanti."
  },
  {
    icon: ShieldCheck,
    title: "Protection Adaptée",
    description: "Emballages spécifiques pour le mobilier fragile et matériel de pointe (monte-meubles, camions capitonnés)."
  },
  {
    icon: Star,
    title: "Réputation locale",
    description: "Une note d'excellence dans le 95. Nous accompagnons nos voisins avec la fierté du travail bien fait."
  }
];

const FAQS = [
  { 
    question: "Gérez-vous les accès difficiles dans les villages du Vexin ?", 
    answer: "C'est notre spécialité. Pour les rues étroites de La Roche-Guyon ou d'Auvers-sur-Oise, nous utilisons des véhicules petits porteurs et prévoyons des distances de portage adaptées." 
  },
  { 
    question: "Intervenez-vous dans les résidences neuves de Cergy-Pontoise ?", 
    answer: "Oui, nous connaissons parfaitement les nouvelles zones résidentielles. Nous gérons les accès logistiques et le stationnement en accord avec les règlements de copropriété." 
  },
  { 
    question: "Proposez-vous le monte-meubles à Argenteuil ou Sarcelles ?", 
    answer: "Absolument. Pour les immeubles sans ascenseur ou les étages élevés, le monte-meubles est souvent la solution la plus sûre et la plus rapide que nous déployons régulièrement." 
  },
  { 
    question: "Quel est le délai pour un déménagement dans le 95 ?", 
    answer: "En tant qu'acteur local, nous sommes très réactifs. Un devis est envoyé sous 24h après visite. Prévoyez idéalement 2 à 3 semaines de préavis pour garantir votre date." 
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

export default function ValDOisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/valdoise-vexin/1920/1080"
          alt="Paysage du Vexin Français dans le Val-d'Oise"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Val-d'Oise (95)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Trees className="h-4 w-4" />
              L'expert Déménagement du 95
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Déménagez dans le <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                Val-d'Oise (95).
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Cergy au Vexin, bénéficiez du savoir-faire d'un acteur local historique. Une logistique maîtrisée pour une transition en toute sérénité.
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
                Votre département, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">notre terrain d'excellence</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Le Val-d'Oise (95) est notre département d'origine. De la technopole de Cergy-Pontoise aux demeures historiques de l'Isle-Adam, nous maîtrisons la diversité et les spécificités de chaque secteur.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Choisir <strong>Déménagement du Vexin</strong>, c'est s'appuyer sur un partenaire qui comprend les enjeux locaux (arrêtés de stationnement, accès forestiers, zones denses) et qui s'engage pour sa communauté avec une fiabilité totale.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <LayoutGrid className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Maillage Territorial Complet,<br/> <span className="text-slate-500 font-normal text-sm">une présence quotidienne sur l'ensemble du 95.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/95-moving-pro/800/600"
                  alt="Équipe de déménagement professionnelle en intervention dans le 95"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES GRID --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Nos villes d'intervention dans le 95
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Cliquez sur votre ville pour découvrir nos services personnalisés.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {VAL_D_OISE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Button asChild variant="outline" className="bg-white justify-between h-14 border-slate-200 hover:border-[#00ad9f] hover:text-[#00ad9f] rounded-xl transition-all shadow-sm group" key={city.name}>
                <Link href={city.link}>
                  <span className="font-bold">{city.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-95" className="py-20 lg:py-32 bg-white">
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
                  src="https://picsum.photos/seed/95-packing/800/600"
                  alt="Protection du mobilier dans le Val-d'Oise"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque profil du 95.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons & Pavillons du Vexin</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique spécifique pour les accès étroits et protection maximale des jardins et intérieurs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements Urbains</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Gestion des étages et monte-meubles pour les résidences d'Argenteuil, Sarcelles ou Cergy.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Professionnels</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Déménagement de bureaux et parcs informatiques pour les entreprises du département.</p>
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
      <section id="faq-95" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie dans le Val-d'Oise.</p>
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
                    <span className="text-[#00ad9f]">départ vers le 95 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Contactez nos experts pour une visite technique et obtenez un devis gratuit sous 24h.
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