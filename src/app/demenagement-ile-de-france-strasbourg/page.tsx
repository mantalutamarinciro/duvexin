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
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  Globe
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris → Strasbourg (67) | Devis Gratuit & Groupage | 24h",
  description: "Déménageur expert sur l'axe Paris-Strasbourg. Liaisons régulières, solutions de groupage et expertise centre historique. Votre devis gratuit sous 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-idf-strasbourg",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Muller", text: "Le déménagement de nos vies de la région parisienne à Strasbourg a été une totale réussite. L'équipe a été d'un grand professionnalisme, à la fois pour le chargement et pour la livraison malgré la neige ! Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Muller67` },
  { id: "fallback-2", name: "Thomas K.", text: "Service impeccable pour mon déménagement longue distance. La formule groupage était parfaite pour mon budget et tout est arrivé sans la moindre égratignure. Je recommande vivement pour le sérieux.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=ThomasK67` },
  { id: "fallback-3", name: "Société Euro-Log", text: "Le transfert de notre agence vers le quartier européen a été mené avec rigueur et efficacité. Une équipe qui comprend les enjeux de planning et de confidentialité. Des vrais pros.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=EuroLog67` },
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons Paris-Alsace",
    description: "Nous assurons des navettes hebdomadaires entre l'Île-de-France et le Bas-Rhin pour une flexibilité maximale."
  },
  {
    icon: Truck,
    title: "Sécurité Autoroutière",
    description: "Véhicules capitonnés et techniques d'arrimage spécifiques pour protéger vos biens sur les 500 km de trajet (A4)."
  },
  {
    icon: Scale,
    title: "Groupage Malin",
    description: "Divisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients pour vos volumes de 5 à 15 m³."
  },
  {
    icon: Globe,
    title: "Maîtrise Européenne",
    description: "Nous gérons les accès complexes du quartier de l'Orangerie, des institutions et du centre historique de Strasbourg."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement Paris-Strasbourg ?", 
    answer: "Pour un volume standard, l'opération se déroule sur 48 heures. Le premier jour est consacré au chargement en Île-de-France et au début du transit. Le second jour est dédié au déchargement et à l'installation complète dans votre nouveau domicile alsacien." 
  },
  { 
    question: "Comment fonctionne le groupage vers Strasbourg ?", 
    answer: "Le groupage consiste à mutualiser un grand camion pour plusieurs clients. C'est la solution idéale pour les petits appartements ou les déménagements étudiants, permettant de diviser les frais de carburant et de péage sur l'A4." 
  },
  { 
    question: "Gérez-vous le stationnement dans la Petite France ?", 
    answer: "Oui, le centre historique de Strasbourg possède des zones à accès très restreint. Nous nous occupons de déposer les demandes d'autorisation auprès de la Direction de la Voirie de Strasbourg 15 jours à l'avance." 
  },
  { 
    question: "Proposez-vous des prestations pour les expatriés ou fonctionnaires européens ?", 
    answer: "Absolument. Nous accompagnons régulièrement les personnels des institutions européennes. Nous proposons des formules 'Confort' incluant l'emballage intégral, le déballage et la remise en place pour une installation immédiate." 
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

export default function StrasbourgPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/strasbourg-cathedral/1920/1080"
          alt="Cathédrale Notre-Dame de Strasbourg et Petite France"
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
            <Link href="/services" className="hover:text-white transition-colors">Déménagement National</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Axe Paris-Strasbourg</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Globe className="h-4 w-4" />
              Liaison Nationale IDF → Grand Est
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Paris - Strasbourg.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Cap vers la capitale alsacienne. Profitez d'une logistique rodée pour un déménagement longue distance rapide, sécurisé et au tarif le plus juste.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis en 24h <ArrowRight className="ml-2 h-4 w-4" />
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
                De l'Île-de-France au <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">cœur de l'Europe Alsacienne</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                S'installer à Strasbourg est un projet d'envergure qui marque souvent une nouvelle étape professionnelle ou familiale. Pour que ce transfert se fasse sans stress, la maîtrise de l'axe A4 est impérative. Les 500 km séparant l'IDF de l'Alsace exigent une planification sans faille.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons les deux extrémités de votre projet : la gestion du stationnement parisien et les accès parfois escarpés du centre-ville strasbourgeois, des quais de l'Ill aux résidences modernes de Neudorf ou du Wacken.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Timer className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Efficacité Longue Distance,<br/> <span className="text-slate-500 font-normal text-sm">liaisons régulières chaque semaine pour diviser vos frais de transport.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/strasbourg-truck-move/800/600"
                  alt="Déménagement longue distance vers Strasbourg"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grille d'avantages) --- */}
      <section id="why-us-strasbourg" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre trajet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison Paris-Strasbourg parfaitement maîtrisée.
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
                  src="https://picsum.photos/seed/strasbourg-packing-box/800/600"
                  alt="Protection du mobilier pour transport national vers l'Alsace"
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
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Copropriétés</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution complète incluant monte-meubles pour les immeubles alsaciens sans ascenseur ou accès étroits.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Scale className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Groupage Malin</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Divisez vos frais de péage et carburant en partageant l'espace d'un camion vers le Bas-Rhin.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Pro & Institutions</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service dédié aux entreprises et expatriés : transfert d'archives, informatique et mobilier avec remise en place.</p>
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
      <section id="faq-strasbourg" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Strasbourg.</p>
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
               
               {/* Deco de fond fluide */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Prêt pour votre nouvelle <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">vie à Strasbourg ?</span>
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