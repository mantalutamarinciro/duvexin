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
  Waves,
  Briefcase,
  Home,
  LayoutGrid,
  ShieldAlert
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Val-de-Marne (94) | Expert Local & Devis Gratuit",
  description: "Déménageur de confiance dans le Val-de-Marne (94). De Vincennes à Créteil, nous gérons vos déménagements résidentiels et transferts de bureaux. Devis sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-val-de-marne-94",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Martin", text: "Déménagement de notre maison à Saint-Maur-des-Fossés géré avec un grand professionnalisme. L'équipe était efficace et très soigneuse avec nos meubles anciens.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Martin94` },
  { id: "fallback-2", name: "M. Dubois", text: "Service impeccable pour mon appartement à Vincennes. Ils ont géré les contraintes de stationnement et le monte-meubles sans aucun problème. Je recommande sans hésiter.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois94` },
  { id: "fallback-3", name: "Société Innov+", text: "Transfert de nos bureaux à Créteil Échat réalisé dans les temps. L'équipe a été rapide, discrète et a minimisé l'impact sur notre activité. Parfait.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Innov94` },
];

const VAL_DE_MARNE_CITIES = [
  { name: "Alfortville", link: "/demenagement-alfortville-94140" },
  { name: "Arcueil", link: "/demenagement-arcueil-94110" },
  { name: "Cachan", link: "/demenagement-cachan-94230" },
  { name: "Champigny-sur-Marne", link: "/demenagement-champigny-sur-marne-94500"},
  { name: "Charenton-le-Pont", link: "/demenagement-charenton-le-pont-94220"},
  { name: "Choisy-le-Roi", link: "/demenagement-choisy-le-roi-94600" },
  { name: "Créteil", link: "/demenagement-creteil-94000"},
  { name: "Fontenay-sous-Bois", link: "/demenagement-fontenay-sous-bois-94120"},
  { name: "Ivry-sur-Seine", link: "/demenagement-ivry-sur-seine-94200"},
  { name: "L'Haÿ-les-Roses", link: "/demenagement-lhay-les-roses-94240"},
  { name: "Le Perreux-sur-Marne", link: "/demenagement-le-perreux-sur-marne-94170" },
  { name: "Maisons-Alfort", link: "/demenagement-maisons-alfort-94700"},
  { name: "Nogent-sur-Marne", link: "/demenagement-nogent-sur-marne-94130" },
  { name: "Saint-Mandé", link: "/demenagement-saint-mande-94220" },
  { name: "Saint-Maur-des-Fossés", link: "/demenagement-saint-maur-des-fosses-94100"},
  { name: "Vincennes", link: "/demenagement-vincennes-94300" },
  { name: "Vitry-sur-Seine", link: "/demenagement-vitry-sur-seine-94400"},
  { name: "Villejuif", link: "/demenagement-villejuif-94800"},
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise du 94",
    description: "De la densité de la petite couronne (Vincennes, Ivry) aux zones pavillonnaires des bords de Marne, nous maîtrisons chaque accès."
  },
  {
    icon: Building2,
    title: "Spécialiste Urbain",
    description: "Habitués aux grands ensembles (Créteil, Vitry), nous déployons des monte-meubles pour sécuriser vos biens en étage élevé."
  },
  {
    icon: ShieldAlert,
    title: "Gestion du Stationnement",
    description: "Nous prenons en charge l'intégralité des demandes d'arrêté municipal pour privatiser l'espace au pied de votre domicile."
  },
  {
    icon: Users,
    title: "Équipes Qualifiées",
    description: "Nos déménageurs sont des professionnels salariés, formés aux techniques d'emballage les plus exigeantes."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous le stationnement dans les zones denses comme Vincennes ?", 
    answer: "Nous anticipons systématiquement. Nous déposons les demandes d'autorisation auprès des mairies 15 jours avant le déménagement pour bloquer l'espace nécessaire et garantir une intervention fluide." 
  },
  { 
    question: "Intervenez-vous dans les tours et grands ensembles de Créteil ?", 
    answer: "Oui, c'est notre quotidien. Nous coordonnons l'utilisation des monte-charges avec les gardiens et déployons nos monte-meubles extérieurs si nécessaire pour protéger les parties communes." 
  },
  { 
    question: "Déménagez-vous les maisons en bord de Marne (Saint-Maur, Le Perreux) ?", 
    answer: "Absolument. Nous avons une grande expérience des accès pavillonnaires. Nous protégeons scrupuleusement vos sols, escaliers et jardins lors de la manutention des objets lourds ou encombrants." 
  },
  { 
    question: "Proposez-vous le transfert d'entreprises dans le Val-de-Marne ?", 
    answer: "Oui, nous accompagnons les professionnels du 94 pour le transfert de leurs bureaux, de leur parc informatique ou de leurs archives, avec une planification qui minimise l'arrêt d'activité." 
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

export default function ValDeMarnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Vue urbaine et bords de Marne dans le Val-de-Marne (94)"
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
            <span className="text-[#00ad9f]">Val-de-Marne (94)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Map className="h-4 w-4" />
              Expert Île-de-France Sud-Est
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Déménagez dans le <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Val-de-Marne (94).
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Vincennes à Créteil, bénéficiez d'une logistique experte pour vos projets résidentiels et d'entreprise. Une transition sereine au meilleur prix.
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
                Une logistique sur-mesure <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour un département pluriel</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Le Val-de-Marne (94) est un territoire aux multiples facettes. Il conjugue l'hyper-densité de la petite couronne parisienne (Ivry, Vincennes), le dynamisme tertiaire de Créteil, et le calme recherché des pavillons en bords de Marne (Saint-Maur, Le Perreux).
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous adaptons notre flotte et notre méthodologie à chaque situation. Qu'il s'agisse de déployer un monte-meubles dans une avenue passante ou de protéger scrupuleusement une villa bourgeoise, nous vous garantissons un professionnalisme sans faille.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <LayoutGrid className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Maillage Territorial</h3>
                   <p className="text-slate-500 font-light">Une présence quotidienne sur l'ensemble du 94 pour répondre à toutes vos urgences.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-val-de-marne.webp"
                  alt="Équipe de déménagement professionnelle en intervention dans le 94"
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
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Nos villes d'intervention dans le 94
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Cliquez sur votre ville pour découvrir nos services personnalisés.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {VAL_DE_MARNE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                href={city.link} 
                key={city.name}
                className="group flex items-center justify-between bg-white h-16 px-6 border border-slate-200 hover:border-[#00ad9f] hover:shadow-lg rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <span className="font-bold text-slate-700 group-hover:text-[#00ad9f] transition-colors">{city.name}</span>
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors">
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#00ad9f] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-94" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <item.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
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
                  alt="Protection du mobilier dans le Val-de-Marne"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque profil du 94.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Petite Couronne</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Gestion des étages et déploiement de monte-meubles pour les résidences denses de Vincennes, Ivry ou Villejuif.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Waves className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Pavillons Bords de Marne</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique spécifique pour les accès résidentiels (Saint-Maur, Nogent) et protection maximale de vos biens.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Briefcase className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déménagement de bureaux et parcs informatiques pour les pôles économiques comme Créteil ou Rungis.</p>
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
      <section id="faq-94" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie dans le Val-de-Marne.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
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
                      départ vers le 94 ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique urbaine ternir votre projet. Contactez nos experts pour une visite gratuite et obtenez un devis complet sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-slate-700 text-primary hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm" asChild>
                       <a href="tel:+33130751235">Appeler un conseiller</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}