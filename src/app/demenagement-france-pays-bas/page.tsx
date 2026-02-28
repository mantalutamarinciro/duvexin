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
  Globe, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  Waves,
  Ship,
  Bike
} from "lucide-react";

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille De Groot", text: "Déménagement de Paris vers Amsterdam réalisé avec une efficacité remarquable. L'équipe a parfaitement géré l'accès très étroit de notre maison au bord du canal. Un grand professionnalisme et beaucoup de courtoisie.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=DeGrootNL` },
  { id: "fallback-2", name: "Marc-Antoine S.", text: "Très bonne expérience pour mon installation à Rotterdam. Le devis était clair et l'option groupage m'a permis de faire de vraies économies sur le trajet. Équipe ponctuelle et matériel de qualité. Je recommande !", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=MASNL` },
  { id: "fallback-3", name: "Logistique-Euro SA", text: "Le transfert de nos bureaux vers Utrecht a été mené avec une rigueur et une discrétion totales. Des experts de la logistique internationale capables de gérer des contraintes urbaines fortes.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=LogEuroNL` },
];

const NETHERLANDS_CITIES = [
  { name: "Amsterdam", desc: "La capitale et ses quartiers iconiques aux accès complexes (Jordaan, Grachtengordel...)" },
  { name: "Rotterdam", desc: "Gestion logistique du premier port d'Europe et des zones modernes." },
  { name: "La Haye (Den Haag)", desc: "Service premium pour le centre politique et diplomatique." },
  { name: "Utrecht", desc: "Liaisons régulières vers le cœur géographique et universitaire du pays." },
  { name: "Eindhoven", desc: "Accompagnement vers le pôle technologique et design du sud." },
  { name: "Groningue (Groningen)", desc: "Logistique dédiée vers le nord des Pays-Bas." },
  { name: "Tilburg", desc: "Liaisons fréquentes vers le pôle logistique du Brabant." },
  { name: "Almere", desc: "Service adapté aux nouvelles zones résidentielles et urbaines." }
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaison A1 / A27",
    description: "Nous assurons des navettes hebdomadaires entre l'Île-de-France et les Pays-Bas, garantissant des délais fiables."
  },
  {
    icon: Ship,
    title: "Maîtrise des Canaux",
    description: "Experts des accès difficiles en centre-ville historique : utilisation de véhicules agiles et de monte-meubles adaptés."
  },
  {
    icon: Scale,
    title: "Groupage Économique",
    description: "Divisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients pour vos volumes de 5 à 15m³."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Totale",
    description: "Votre patrimoine est couvert par une assurance Ad Valorem incluse sur l'intégralité du trajet transfrontalier."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement vers les Pays-Bas ?", 
    answer: "Pour un trajet Paris-Amsterdam (environ 500 km), l'opération peut s'effectuer en 24h à 48h. Nous chargeons généralement le matin en France pour une livraison le lendemain matin aux Pays-Bas, garantissant ainsi le respect des temps de repos et la sécurité." 
  },
  { 
    question: "Comment gérez-vous le stationnement à Amsterdam ou Rotterdam ?", 
    answer: "Les centres-villes néerlandais sont très denses. Nous nous chargeons de réserver les emplacements via les autorités locales et prévoyons, si nécessaire, des monte-meubles ou des véhicules de plus petit gabarit pour naviguer le long des canaux." 
  },
  { 
    question: "Proposez-vous des services pour les expatriés ?", 
    answer: "Oui, c'est l'une de nos spécialités. Nous proposons des formules 'clé en main' incluant l'emballage complet, le déballage et la réinstallation pour que vous puissiez vous concentrer sur votre nouveau départ professionnel ou personnel." 
  },
  { 
    question: "Quelles sont les formalités administratives ?", 
    answer: "Au sein de l'Union Européenne, les formalités sont simplifiées. Un inventaire détaillé chiffré et vos justificatifs de changement de domicile suffisent pour assurer le transport en toute conformité réglementaire." 
  }
];

export default function NetherlandsPage() {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1920"
          alt="Vue d'Amsterdam et de ses canaux"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Pays-Bas</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Pays-Bas
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                vers les Pays-Bas.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap vers le nord en toute sérénité. De l'Île-de-France vers Amsterdam, Rotterdam ou Utrecht, profitez d'une logistique rodée pour un déménagement international fluide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis Pays-Bas <ArrowRight className="ml-2 h-5 w-5" />
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
                L'expertise d'un axe <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">européen dynamique</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer aux Pays-Bas est un projet stimulant qui demande une maîtrise parfaite des flux logistiques nord-européens. Que vous rejoigniez le charme des canaux d'Amsterdam, le dynamisme portuaire de Rotterdam ou le centre technologique d'Eindhoven, votre déménagement exige une rigueur absolue.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous sommes des spécialistes de la liaison France-Pays-Bas. Nous gérons pour vous l'intégralité du processus : de l'emballage aux standards internationaux à la gestion complexe du stationnement le long des canaux et dans les rues historiques étroites.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Timer className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Rapidité & Ponctualité</h3>
                   <p className="text-slate-500 font-light">Des départs réguliers chaque semaine pour une flexibilité totale de votre calendrier.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=800"
                  alt="Déménagement international longue distance vers les Pays-Bas"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-nl" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence au service de votre mobilité
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-Pays-Bas parfaitement maîtrisée.
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

      {/* --- CITIES GRID --- */}
      <section id="cities-nl" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">tout le pays.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De la capitale aux grandes zones portuaires et technologiques, nos camions assurent des liaisons régulières vers tous les Pays-Bas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {NETHERLANDS_CITIES.map((city) => (
              <div 
                key={city.name} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors mb-1">{city.name}</span>
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{city.desc}</span>
              </div>
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
                  src="/images/services/demenagement-international.webp"
                  alt="Déménagement international premium vers les Pays-Bas"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil international.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Institutionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet, le déballage et la réinstallation de votre intérieur pour une transition immédiate et sereine vers Amsterdam ou La Haye.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Intelligent</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Optimisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients vers les grandes métropoles néerlandaises.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique B2B experte : transfert informatique, d'archives et de mobiliers de bureau entre la France et les Pays-Bas.</p>
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
      <section id="faq-nl" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie aux Pays-Bas.</p>
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
                      départ pour les Pays-Bas ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme sous 24h.
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
