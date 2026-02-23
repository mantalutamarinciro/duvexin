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
  Diamond,
  ArrowRight, 
  ChevronRight, 
  Map,
  ShieldAlert,
  Home,
  Briefcase,
  Sparkles
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Neuilly-sur-Seine (92) | Service Prestige & Devis Gratuit",
  description: "Déménageur de confiance à Neuilly-sur-Seine (92200). Spécialiste appartements haussmanniens, hôtels particuliers et objets d'art. Discrétion et excellence.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-neuilly-sur-seine-92200",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille de La Roche", text: "Un service irréprochable pour notre déménagement à Neuilly. L'équipe a fait preuve d'une grande discrétion et d'un soin extrême pour nos objets de valeur. C'est un service de prestige que nous recommandons sans hésiter.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=LaRoche92` },
  { id: "fallback-2", name: "Hélène B.", text: "Très satisfaite de la prestation. Ils ont géré les accès compliqués de ma rue près du Bois de Boulogne et protégé les parquets avec beaucoup de professionnalisme. Une entreprise sérieuse.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB92` },
  { id: "fallback-3", name: "Cabinet d'avocats G&P", text: "Le transfert de nos archives et de notre mobilier a été mené avec une efficacité et une confidentialité parfaites. Une équipe ponctuelle sur qui l'on peut compter pour du B2B exigeant.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=GPavocats` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise du 92200",
    description: "De l'Avenue du Roule à l'Île de la Jatte, nous maîtrisons chaque rue et ses contraintes pour une logistique d'exception."
  },
  {
    icon: Diamond,
    title: "Prestations Prestige",
    description: "Manipulation experte d'objets d'art, pianos et mobilier de valeur dans le respect total de votre patrimoine."
  },
  {
    icon: ShieldAlert,
    title: "Discrétion Absolue",
    description: "Interventions silencieuses et confidentielles adaptées aux exigences des résidences de grand standing et hôtels particuliers."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des demandes d'autorisation de stationnement (voirie) auprès de la mairie de Neuilly-sur-Seine."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement dans un hôtel particulier ?", 
    answer: "Nous réalisons systématiquement une visite technique approfondie pour planifier la protection des lieux (parquets, moulures, escaliers classés). Nous utilisons du matériel de levage spécifique (monte-meubles) et des emballages sur-mesure (caisses bois) pour les pièces d'exception." 
  },
  { 
    question: "Le stationnement est-il garanti devant mon domicile à Neuilly ?", 
    answer: "Oui, nous nous chargeons intégralement des formalités d'autorisation de stationnement auprès de la Ville de Neuilly-sur-Seine environ 15 jours en amont. Cela nous permet de réserver l'espace nécessaire pour nos camions et notre monte-meubles au pied de votre porte." 
  },
  { 
    question: "Proposez-vous une assurance pour les objets de grande valeur ?", 
    answer: "Absolument. En plus de notre assurance contractuelle de base, nous proposons des solutions d'assurance 'Ad Valorem' permettant de couvrir vos œuvres d'art, antiquités et mobilier de créateur à leur valeur réelle déclarée." 
  },
  { 
    question: "Peut-on déménager le week-end ou en horaires décalés ?", 
    answer: "Nous adaptons nos plannings à vos impératifs personnels ou professionnels. Pour les entreprises et cabinets de Neuilly, nous intervenons très fréquemment le samedi pour garantir une reprise d'activité normale dès le lundi matin." 
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

export default function NeuillySurSeinePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant une intervention haut de gamme"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Neuilly-sur-Seine</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Service Déménagement Haute Protection
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Neuilly.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour les résidences d'exception de Neuilly-sur-Seine (92200). Rigueur, discrétion et protection absolue de votre patrimoine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Étude personnalisée gratuite <ArrowRight className="ml-2 h-5 w-5" />
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
                L'exigence du détail <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour un déménagement d'exception</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Neuilly-sur-Seine incarne un art de vivre où l'élégance architecturale rencontre des exigences de service particulièrement élevées. Déménager dans ce contexte, que ce soit près du Bois de Boulogne ou sur l'Île de la Jatte, demande bien plus qu'une simple manutention : c'est un engagement de soin, de propreté et de confidentialité.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons développé une expertise spécifique pour les appartements haussmanniens, les grandes propriétés et les bureaux de prestige. Nous garantissons une transition d'une fluidité exemplaire, préservant l'intégrité de vos biens les plus précieux et la quiétude de vos voisins.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Diamond className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Expertise Biens de Valeur</h3>
                   <p className="text-slate-500 font-light">Protection d'œuvres d'art, antiquités, pianos et mobilier de maître.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-neuilly-sur-seine.webp"
                  alt="Déménagement d'appartement de standing avec monte-meubles à Neuilly"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-neuilly" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le standard d'excellence du 92
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre parfaite maîtrise de Neuilly-sur-Seine est votre meilleure garantie de sérénité et de discrétion.
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

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur protégeant une pièce d'art ou de valeur avec un soin extrême"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des services à la hauteur <br/> <span className="text-[#00ad9f]">de vos exigences.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements de Standing</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection intégrale des parties communes (parquets, boiseries, ascenseurs) et utilisation de monte-meubles pour les accès en avenue.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Hôtels Particuliers & Villas</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique calibrée pour les grands volumes et emballage premium de vos pièces historiques sous caisses sur-mesure si nécessaire.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formule "Prestige" (Clé en main)</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Déléguez tout : emballage complet de vos effets, vêtements sur cintres, transport, déballage et remise en place de votre intérieur.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir le détail des formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-neuilly" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Neuilly.</p>
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
                    Prêt pour votre départ <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      de Neuilly-sur-Seine ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne confiez pas votre patrimoine au hasard. Contactez nos experts pour une étude technique confidentielle et recevez un devis détaillé, ferme et sans surprise sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Étude personnalisée gratuite <ArrowRight className="ml-2 h-5 w-5" />
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