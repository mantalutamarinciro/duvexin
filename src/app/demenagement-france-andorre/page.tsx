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
  Mountain,
  FileText,
  BadgeCheck,
  Gem,
  Snowflake
} from "lucide-react";

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Pujol", text: "Déménagement de Toulouse vers Andorre-la-Vieille parfaitement géré. L'équipe a pris en charge toutes les formalités de douane, ce qui nous a évité bien des soucis à la frontière. Un service d'une grande rigueur malgré les routes enneigées.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=PujolAD` },
  { id: "fallback-2", name: "Marc-Antoine D.", text: "Excellente prestation pour mon installation à Escaldes-Engordany. Le dédouanement a été très rapide grâce à la préparation du dossier par leurs soins. Équipe ponctuelle et matériel de protection de haute qualité.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=MADAnd` },
  { id: "fallback-3", name: "Consulting-And SA", text: "Le transfert de nos bureaux vers le centre d'affaires d'Andorre a été mené avec une rigueur et une discrétion totales. Une maîtrise parfaite des spécificités fiscales et douanières du pays.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=ConsultingAD` },
];

const ANDORRA_PARISHES = [
  { name: "Andorre-la-Vieille", desc: "La capitale et son centre commercial et administratif dynamique." },
  { name: "Escaldes-Engordany", desc: "Gestion logistique du pôle thermal et résidentiel moderne." },
  { name: "Encamp", desc: "Liaisons rapides vers le cœur de la principauté." },
  { name: "Sant Julià de Lòria", desc: "Premier point d'entrée depuis l'Espagne, expertise frontalière." },
  { name: "La Massana", desc: "Service premium pour les zones résidentielles d'altitude." },
  { name: "Ordino", desc: "Soin particulier pour le patrimoine naturel et architectural." },
  { name: "Canillo", desc: "Logistique dédiée aux stations de ski et zones de montagne." }
];

const WHY_US_ITEMS = [
  {
    icon: FileText,
    title: "Ingénierie Douanière",
    description: "Nous gérons l'intégralité de votre dossier de dédouanement (Franchise de déménagement) pour un passage fluide à la frontière franco-andorrane."
  },
  {
    icon: Mountain,
    title: "Expertise Haute Montagne",
    description: "Nos conducteurs sont formés à la conduite sur routes sinueuses et enneigées. Nos véhicules sont équipés pour franchir les Pyrénées en toute sécurité."
  },
  {
    icon: ShieldCheck,
    title: "Gestion de l'IGI",
    description: "Accompagnement sur les spécificités fiscales andorranes liées à l'importation de vos biens personnels et de votre mobilier."
  },
  {
    icon: Gem,
    title: "Service Gants Blancs",
    description: "Un standard de qualité élevé, adapté aux résidences de standing et aux exigences de discrétion de la principauté."
  }
];

const FAQS = [
  { 
    question: "Andorre ne fait pas partie de l'UE, quelles sont les conséquences pour mon déménagement ?", 
    answer: "C'est le point crucial : tout déménagement vers Andorre est considéré comme une exportation. Vous devez fournir un inventaire détaillé chiffré, un justificatif de changement de résidence et le formulaire de douane. Nous gérons pour vous l'intégralité du dossier pour obtenir l'exonération des taxes d'importation (franchise)." 
  },
  { 
    question: "Comment se déroule le passage à la frontière (Pas de la Case) ?", 
    answer: "Grâce à notre expertise, nous préparons les documents 48h avant le départ. Le camion se présente au bureau de douane, nous effectuons les formalités administratives, et après validation, nous poursuivons la route vers votre nouvelle paroisse." 
  },
  { 
    question: "Déménagez-vous en hiver malgré la neige ?", 
    answer: "Oui, nous sommes équipés pour les conditions hivernales pyrénéennes. Nos camions disposent des équipements obligatoires et nos chauffeurs ont l'expérience des cols. Nous surveillons météo et état des routes pour garantir une livraison sécurisée." 
  },
  { 
    question: "Proposez-vous le groupage vers Andorre ?", 
    answer: "Oui, pour les volumes inférieurs à 15m³, nous organisons des tournées groupées. C'est une solution très économique qui permet de partager les frais de route et de douane, tout en bénéficiant d'un service professionnel." 
  }
];

export default function AndorraPage() {
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
          src="https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1920"
          alt="Vue des montagnes d'Andorre et de la principauté"
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
            <span className="text-[#00ad9f]">France - Andorre</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Andorre
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                en Principauté.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap vers les Pyrénées en toute sérénité. Profitez d'une expertise douanière pointue et d'une logistique de montagne rodée pour votre installation en Andorre.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis Andorre <ArrowRight className="ml-2 h-5 w-5" />
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
                Franchir les Pyrénées <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">avec un expert douanier</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer en Andorre est un projet unique qui demande une maîtrise parfaite de la logistique hors Union Européenne. Le passage de la douane française et andorrane, ainsi que la navigation sur des routes de haute montagne, imposent une rigueur absolue.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous sommes des spécialistes de la liaison vers la principauté. Nous gérons pour vous l'intégralité du processus : de l'inventaire réglementaire à la pose des scellés, jusqu'à la livraison finale dans des paroisses comme Canillo ou La Massana, quelles que soient les conditions météo.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <BadgeCheck className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Dédouanement Garanti</h3>
                   <p className="text-slate-500 font-light">Nous préparons chaque document pour vous assurer un passage de frontière sans attente ni taxes imprévues.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=800"
                  alt="Déménagement en montagne vers l'Andorre"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-ad" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'excellence au sommet
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-Andorre parfaitement sécurisée.
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

      {/* --- PAROISSES GRID --- */}
      <section id="parishes-ad" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">toutes les paroisses.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              De la vallée centrale aux villages d'altitude, nos camions interviennent partout en Andorre.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ANDORRA_PARISHES.map((city) => (
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
                  alt="Déménagement international premium vers l'Andorre"
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
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Résidents fiscaux</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet, la gestion douanière intégrale et la réinstallation de votre intérieur pour une transition immédiate.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Snowflake className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Logistique de Montagne</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Utilisation de monte-meubles spécifiques et de camions équipés pour les accès escarpés des villages pyrénéens.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Inventaires de Douane</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Réalisation d'inventaires ultra-précis selon les normes andorranes pour garantir une importation en toute conformité légale.</p>
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
      <section id="faq-ad" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie en Andorre.</p>
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
                      départ pour l'Andorre ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez nos experts internationaux pour une étude personnalisée incluant l'ingénierie douanière et recevez un devis ferme sous 24h.
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
