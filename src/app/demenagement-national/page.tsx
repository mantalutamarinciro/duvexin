import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VerifiedTestimonialsSection } from "@/components/testimonials-section";

// Icons
import { 
  CheckCircle2, MapPin, ArrowRight, ShieldCheck, 
  Users, Globe, Truck, ChevronRight, Navigation,
  Route, PackageCheck, Clock
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement national | Devis longue distance",
  description: "Organisez votre déménagement national depuis ou vers l'Île-de-France : trajet dédié ou groupage selon le volume, les dates et la destination. Demandez votre devis.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-national",
  }
};


const topDestinations = [
  { name: "Lyon", link: "/demenagement-ile-de-france-lyon" },
  { name: "Marseille", link: "/demenagement-ile-de-france-marseille" },
  { name: "Bordeaux", link: "/demenagement-ile-de-france-bordeaux" },
  { name: "Lille", link: "/demenagement-ile-de-france-lille" },
  { name: "Nantes", link: "/demenagement-ile-de-france-nantes" },
  { name: "Toulouse", link: "/demenagement-ile-de-france-toulouse" },
  { name: "Strasbourg", link: "/demenagement-ile-de-france-strasbourg" },
  { name: "Nice", link: "/demenagement-ile-de-france-nice" },
  { name: "Rennes", link: "/demenagement-ile-de-france-rennes" },
];

const FAQS = [
  {
    question: "Quelle différence entre un déménagement dédié et un groupage ?",
    answer: "Un trajet dédié réserve le véhicule à votre projet et permet de fixer les dates selon l'organisation retenue. En groupage, plusieurs déménagements compatibles partagent un même trajet ; la solution dépend du volume, de la destination et de la souplesse de vos dates."
  },
  {
    question: "Comment est calculé le prix d'un déménagement national ?",
    answer: "Le devis tient notamment compte du volume, de la distance, des accès aux deux adresses, des étages, du portage, des prestations d'emballage et de la solution de transport retenue."
  },
  {
    question: "Quand demander un devis pour une longue distance ?",
    answer: "Il est préférable d'anticiper afin de disposer de davantage de choix pour les dates et d'étudier les possibilités de groupage. Le délai nécessaire varie selon la destination, le volume et la période."
  },
  {
    question: "Intervenez-vous depuis la province vers l'Île-de-France ?",
    answer: "Oui. La page concerne les départs depuis l'Île-de-France comme les arrivées en Île-de-France, sous réserve de l'étude du trajet, du volume et des accès."
  }
];

export default function DemenagementNationalPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Déménagement national et longue distance",
    serviceType: "Déménagement longue distance",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    provider: {
      "@type": "MovingCompany",
      name: "Déménagement du Vexin",
      url: "https://demenagementduvexin.fr/",
    },
    url: "https://demenagementduvexin.fr/demenagement-national",
  };

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="national-service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="national-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }) }} />
      
      {/* --- HERO SECTION (Voyage & Distance) --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/services/demenagement-national.webp"
          alt="Camion de déménagement professionnel sur une autoroute française"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        {/* Overlay pour assombrir proprement */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">National</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Mobilité Nationale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Déménagement national <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                et longue distance.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Depuis l'Île-de-France vers la province, ou depuis la province vers l'Île-de-France, nous organisons votre déménagement national selon le volume, les accès, la distance et vos dates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir un devis national <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (L'enjeu de la distance) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Votre projet de vie, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">géré de A à Z</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Changer de région pour un projet professionnel ou personnel demande davantage d'anticipation qu'un trajet local. L'inventaire, les accès aux deux adresses et les conditions de livraison doivent être vérifiés avant le départ.
                </p>
                <p>
                  Cela exige une planification rigoureuse, une logistique optimisée (gestion des péages, respect des temps de conduite réglementaires) et une organisation adaptée au trajet. Selon votre volume et vos dates, nous étudions une solution dédiée ou un groupage compatible avec votre destination.
                </p>
              </div>
              
              <div className="pt-8 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6 bg-slate-50 py-4 rounded-r-2xl">
                    <div className="flex items-center gap-3">
                       <Route className="h-7 w-7 text-[#00ad9f]" />
                       <span className="text-xl font-extrabold text-slate-900">France</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Couverture nationale</span>
                 </div>
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6 bg-slate-50 py-4 rounded-r-2xl">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="h-7 w-7 text-[#00ad9f]" />
                       <span className="text-xl font-extrabold text-slate-900">Sur mesure</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Protection adaptée</span>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:rotate-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/demenagement-paris-province.webp"
                  alt="Planification logistique d'un déménagement national"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SPÉCIFIQUES LONGUE DISTANCE --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Les défis de la longue distance, <br/> <span className="text-[#00ad9f]">notre métier.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Sur une longue distance, le calage, l'arrimage, le choix du véhicule et la coordination des deux adresses doivent être définis avec précision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <PackageCheck className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Protection adaptée</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                L'emballage, le calage et l'arrimage sont adaptés au mobilier, à la durée du trajet et aux prestations prévues dans le devis.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <Users className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lignes Groupées (Groupage)</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                Pour certains petits et moyens volumes, plusieurs déménagements compatibles peuvent partager un trajet. La faisabilité dépend de la destination, des dates et de l'espace disponible.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <Clock className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Voyage Spécial Dédié</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                Vous avez un grand volume ou une contrainte de calendrier ? Le voyage spécial réserve le véhicule à votre projet. Les dates de chargement et de livraison sont définies dans le devis selon le trajet et les accès.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS PHARES (SEO Maillage) --- */}
      <section id="destinations" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nos destinations <span className="text-[#00ad9f]">nationales</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Consultez nos principaux axes longue distance depuis ou vers l'Île-de-France. Les possibilités de groupage dépendent du volume, de la destination et des dates souhaitées.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topDestinations.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-slate-500 group-hover:text-[#00ad9f] transition-colors" />
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-full px-8 py-4 text-sm text-slate-300 font-light">
              Votre ville n'est pas dans la liste ? Contactez-nous pour étudier votre trajet en <strong className="text-white font-bold">France métropolitaine</strong>.
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-14 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions sur le déménagement national
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Les points à vérifier avant de comparer les solutions longue distance.
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((item, index) => (
              <AccordionItem key={item.question} value={`national-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-6">
                <AccordionTrigger className="text-left text-lg font-bold text-slate-900 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <VerifiedTestimonialsSection />

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco Technique */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               {/* CONTENU AU PREMIER PLAN */}
               <div className="relative z-10 space-y-8">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 border border-white/10 backdrop-blur-md">
                   <Navigation className="h-4 w-4" />
                   Calculez votre itinéraire
                 </div>

                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Prêt à prendre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      la route ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Demandez une étude kilométrique et volumétrique afin d'obtenir un devis adapté au volume, aux accès et à la distance de votre projet.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-devis">
                          Obtenir un devis national <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-20" asChild>
                       <a href="tel:+33130751235">Appeler la logistique</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
