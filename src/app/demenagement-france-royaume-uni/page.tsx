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
  FileText,
  BadgeCheck,
  Ship,
  Languages,
  Map as MapIcon
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement France → Royaume-Uni | Devis Gratuit & Douanes",
  description: "Déménageur expert sur l'axe France-UK. Liaisons régulières vers Londres, Manchester. Formalités douanières post-Brexit incluses. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-france-royaume-uni",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Harrison", text: "Déménagement de Paris vers Londres (Chelsea) parfaitement géré. L'équipe a pris en charge toute la liasse documentaire pour la douane britannique, ce qui nous a sauvé un temps précieux. Tout est arrivé intact malgré les contrôles au port.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=HarrisonUK` },
  { id: "fallback-2", name: "Jean-Baptiste L.", text: "Excellente prestation pour mon installation à Bristol. Le passage par l'Eurotunnel a été très rapide grâce à la préparation du dossier par leurs soins. Équipe bilingue et très pro au déchargement.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JBLUK` },
  { id: "fallback-3", name: "Tech-Services Ltd", text: "Le transfert de nos bureaux de Paris vers Manchester a été mené avec une rigueur exemplaire. Une maîtrise parfaite des spécificités post-Brexit. Un partenaire de confiance pour l'international.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=TechServicesUK` },
];

const UK_CITIES = [
  { name: "Londres (London)", desc: "Expertise des quartiers denses (Kensington, Chelsea, Canary Wharf...)" },
  { name: "Manchester", desc: "Gestion logistique du pôle économique et technologique du Nord." },
  { name: "Birmingham", desc: "Liaisons régulières vers le cœur névralgique des Midlands." },
  { name: "Bristol", desc: "Service premium vers le grand sud-ouest de l'Angleterre." },
  { name: "Édimbourg (Edinburgh)", desc: "Logistique dédiée vers la majestueuse capitale écossaise." },
  { name: "Glasgow", desc: "Accompagnement rigoureux pour vos projets en Écosse." },
  { name: "Oxford / Cambridge", desc: "Soin particulier pour les transferts universitaires et académiques." },
  { name: "Brighton", desc: "Liaisons fréquentes vers la dynamique côte sud anglaise." }
];

const WHY_US_ITEMS = [
  {
    icon: FileText,
    title: "Ingénierie Douanière",
    description: "Nous gérons l'intégralité de vos formalités d'exportation en France et d'importation au Royaume-Uni (TOR1) pour une franchise de taxes."
  },
  {
    icon: Ship,
    title: "Logistique Transmanche",
    description: "Liaisons régulières via Ferry (Calais/Douvres) ou Eurotunnel. Nous choisissons la meilleure option selon l'urgence de vos biens."
  },
  {
    icon: Languages,
    title: "Équipes Bilingues",
    description: "Nos déménageurs maîtrisent les codes locaux et les exigences de stationnement britanniques pour un déchargement serein."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Internationale",
    description: "Assurance Ad Valorem complète couvrant tout le trajet, incluant la manutention, les traversées maritimes et les contrôles douaniers."
  }
];

const FAQS = [
  { 
    question: "Quelles sont les nouvelles règles depuis le Brexit pour déménager au Royaume-Uni ?", 
    answer: "Depuis le 1er janvier 2021, tout déménagement est considéré comme une exportation/importation. Pour bénéficier de l'exonération de taxes (TOR - Transfer of Residence), vous devez prouver que vous avez vécu hors du UK pendant 12 mois consécutifs et que vous possédez vos biens depuis plus de 6 mois. Nous vous accompagnons de A à Z dans la création de votre dossier douanier." 
  },
  { 
    question: "Combien de temps prend un déménagement Paris-Londres ?", 
    answer: "Il faut compter généralement 48h à 72h. Nous chargeons le premier jour en Île-de-France. Le camion effectue la traversée et les formalités douanières le lendemain matin, pour une livraison et une réinstallation complète dans l'après-midi même ou le surlendemain à Londres, selon le temps de passage en douane." 
  },
  { 
    question: "Gérez-vous le stationnement très strict à Londres ?", 
    answer: "Oui, les 'Parking Suspensions' sont indispensables à Londres et dans la plupart des villes britanniques. Nous nous coordonnons avec les councils locaux (Westminster, Camden, etc.) pour réserver l'espace nécessaire et éviter toute amende (PCN) ou blocage logistique." 
  },
  { 
    question: "Proposez-vous le groupage vers l'Angleterre ?", 
    answer: "Absolument. C'est l'un de nos services les plus populaires. Pour les petits volumes (studios, chambres étudiantes, quelques meubles), nous mutualisons le transport. Cela vous permet de diviser les frais de traversée, de douane et de route par deux tout en gardant un service premium." 
  }
];

export default function UKPage() {
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
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une logistique internationale post-Brexit"
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
            <Link href="/services" className="hover:text-white transition-colors">International</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Royaume-Uni</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Royaume-Uni
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                outre-Manche.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Franchissez la Manche en toute sérénité. Profitez d'une expertise douanière post-Brexit unique et d'une logistique rodée pour votre installation à Londres ou dans tout le Royaume-Uni.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis UK <ArrowRight className="ml-2 h-5 w-5" />
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
                Maîtriser les nouvelles <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">frontières britanniques</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer au Royaume-Uni est un projet qui demande désormais une expertise douanière irréprochable. Depuis le Brexit, le passage de la Manche n'est plus une simple formalité. L'inventaire, la valorisation de vos biens et les justificatifs de résidence (Transfer of Residence) sont scrutés avec une rigueur absolue par les douanes de Sa Majesté (HMRC).
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons sécurisé nos processus pour cet axe stratégique. Nous gérons pour vous l'intégralité du dossier administratif et coordonnons les flux logistiques pour vous garantir une livraison à domicile ponctuelle, que vous habitiez une rue étroite de Notting Hill ou une résidence moderne à Manchester.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <BadgeCheck className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Dédouanement Maîtrisé</h3>
                   <p className="text-slate-500 font-light">Nous préparons chaque document pour vous assurer un passage de frontière sans attente ni taxes indues.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-france-royaume-uni.webp"
                  alt="Logistique de déménagement international vers le Royaume-Uni"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-uk" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence transmanche
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-UK parfaitement sécurisée.
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
      <section id="cities-uk" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">tout le Royaume-Uni.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De l'agglomération londonienne aux Highlands écossais, nos camions assurent des liaisons régulières vers tout le pays.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {UK_CITIES.map((city) => (
              <div 
                key={city.name} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm cursor-default"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors mb-2 text-lg">{city.name}</span>
                <span className="text-sm text-slate-400 font-light group-hover:text-slate-300 transition-colors leading-relaxed">{city.desc}</span>
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
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur protégeant du mobilier de valeur pour une exportation vers l'Angleterre"
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
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Particuliers</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet, la gestion douanière intégrale et la réinstallation de votre intérieur pour une transition immédiate et sereine vers Londres ou Oxford.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Économique</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Divisez vos frais de traversée, de douane et de transport en mutualisant le trajet avec d'autres clients vers les grandes métropoles britanniques.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts Professionnels & B2B</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique B2B experte : transfert informatique, d'archives et de mobiliers de bureau entre la France et le Royaume-Uni avec inventaires certifiés pour la douane.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Comparer toutes nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-uk" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie au Royaume-Uni.</p>
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
                      départ pour le Royaume-Uni ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas le Brexit compliquer votre projet d'expatriation. Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme sous 24h.
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