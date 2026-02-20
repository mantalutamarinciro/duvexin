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
  Beer, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Zap,
  Leaf
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris → Lille (59) | Devis Gratuit & Groupage | 24h",
  description: "Déménageur expert sur l'axe Paris-Lille. Liaisons quotidiennes, solutions de groupage économique et expertise Vieux-Lille. Votre devis gratuit en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-idf-lille",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lefevre", text: "Notre déménagement de la région parisienne à Lille a été une vraie réussite. L'équipe a été super, très pro et a su s'adapter aux petites rues du Vieux-Lille malgré un camion de 20m3. Un sans-faute !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre59` },
  { id: "fallback-2", name: "Claire D.", text: "Service impeccable pour mon déménagement longue distance. La formule économique était parfaite pour mon budget d'étudiante et tout est arrivé à Lille sans une égratignure. Je recommande !", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireD59` },
  { id: "fallback-3", name: "Start-up Euratech", text: "Le transfert de notre société vers Lille s'est déroulé avec une rigueur exemplaire. Une équipe qui comprend les enjeux du mobilier de bureau et de l'informatique. Top.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Euratech59` },
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons Quotidiennes",
    description: "Grâce à notre proximité avec l'A1, nous assurons des navettes régulières entre l'Île-de-France et la métropole lilloise."
  },
  {
    icon: Timer,
    title: "Déménagement en 1 Jour",
    description: "Chargement le matin en IDF, déchargement l'après-midi à Lille. Installez-vous dès le soir même."
  },
  {
    icon: Leaf,
    title: "Groupage Économique",
    description: "Optimisez vos coûts et votre empreinte carbone en partageant un camion pour vos petits volumes vers le Nord."
  },
  {
    icon: Beer,
    title: "Esprit de Service",
    description: "Nous allions la rigueur logistique parisienne à la convivialité et à la chaleur humaine du Nord."
  }
];

const FAQS = [
  { 
    question: "Combien de temps dure le trajet entre Paris et Lille ?", 
    answer: "Le trajet dure environ 2h30 à 3h selon le trafic. Cela nous permet de réaliser l'intégralité de votre déménagement sur une seule journée : chargement le matin, transport le midi, et livraison complète dans l'après-midi." 
  },
  { 
    question: "Gérez-vous les accès difficiles dans le Vieux-Lille ?", 
    answer: "Absolument. Nous connaissons les rues pavées et étroites du centre historique. Pour ces secteurs, nous utilisons des véhicules 'petits porteurs' agiles et, si nécessaire, un monte-meubles pour éviter les escaliers tournants des bâtiments anciens." 
  },
  { 
    question: "Quelles villes couvrez-vous autour de Lille ?", 
    answer: "Nous intervenons sur l'ensemble de la MEL (Métropole Européenne de Lille) : Roubaix, Tourcoing, Villeneuve-d'Ascq, Marcq-en-Barœul, Bondues, Lambersart et toutes les communes limitrophes." 
  },
  { 
    question: "Le groupage est-il disponible pour les étudiants ?", 
    answer: "Oui, l'axe Paris-Lille est idéal pour le groupage. Si vous avez entre 5 et 15m³, nous mutualisons le transport avec un autre client pour vous offrir un tarif ultra-compétitif, parfait pour un emménagement à proximité des facultés ou d'Euratechnologies." 
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

export default function LillePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/lille-place/1920/1080"
          alt="La Grand'Place de Lille et son architecture flamande"
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
            <span className="text-white">Axe Paris-Lille</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Zap className="h-4 w-4" />
              Liaison Express IDF → Nord
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Paris - Lille.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Cap sur la capitale des Flandres. Profitez d'une logistique rodée pour un déménagement longue distance rapide, sécurisé et au meilleur prix.
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
                De l'Île-de-France au <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">cœur des Hauts-de-France</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Rejoindre Lille, c'est choisir une métropole européenne vibrante. Pour que ce nouveau chapitre commence sans accroc, nous avons optimisé nos trajets sur l'autoroute A1 pour vous proposer des solutions agiles.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons les deux extrémités de votre projet : la complexité du stationnement parisien et les particularités des quartiers lillois, du Vieux-Lille à Euratechnologies en passant par les résidences de la MEL.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Zap className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Logistique Haute Fréquence,<br/> <span className="text-slate-500 font-normal text-sm">des départs chaque semaine pour optimiser vos coûts.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/lille-truck/800/600"
                  alt="Déménagement longue distance vers le Nord"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grille d'avantages) --- */}
      <section id="why-us-lille" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre trajet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation rigoureuse pour une liaison Paris-Lille parfaitement maîtrisée.
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
                  src="https://picsum.photos/seed/lille-packing-pro/800/600"
                  alt="Protection du mobilier pour transport autoroutier"
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
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution complète incluant monte-meubles et protection des parties communes pour les immeubles lillois.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Leaf className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Petits volumes & Étudiants</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Formules de groupage intelligentes pour diviser vos frais de transport par deux vers les campus du Nord.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre Éco au service Clé-en-main, nous adaptons notre niveau d'intervention à vos attentes.</p>
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
      <section id="faq-lille" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Préparer votre départ vers le Nord en toute sérénité.</p>
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
                    <span className="text-[#00ad9f]">vie à Lille ?</span>
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