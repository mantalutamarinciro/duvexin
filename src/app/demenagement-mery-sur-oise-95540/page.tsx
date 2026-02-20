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
  Home,
  Briefcase,
  Navigation2
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Méry-sur-Oise (95) | Expert Local & Devis Gratuit",
  description: "Marne Transdem : votre déménageur de proximité à Méry-sur-Oise (95540). Expertise locale, réactivité maximale et service sur-mesure. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-mery-sur-oise-95540",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dubois", text: "Étant de Méry-sur-Oise, nous avons fait appel à l'entreprise locale et nous n'avons pas été déçus ! Une équipe formidable, professionnelle et très efficace pour notre pavillon.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois95540` },
  { id: "fallback-2", name: "Sophie G.", text: "Déménagement sans stress grâce à une équipe au top. Tout était parfaitement organisé du Château jusqu'aux bords de l'Oise. Je recommande vivement Marne Transdem.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG95540` },
  { id: "fallback-3", name: "Marc T.", text: "Le service est impeccable. Devis clair, équipe ponctuelle et matériel de qualité. Une vraie entreprise de confiance située juste à côté de chez soi. Top !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95540` },
];

const WHY_US_ITEMS = [
  {
    icon: Navigation2,
    title: "Ancrage Local",
    description: "Méry-sur-Oise est notre fief. Nous maîtrisons chaque rue et chaque sens unique pour une logistique sans aucune faille."
  },
  {
    icon: Truck,
    title: "Réactivité Directe",
    description: "La proximité nous permet d'organiser des visites techniques immédiates et d'ajuster nos plannings selon vos besoins urgents."
  },
  {
    icon: Home,
    title: "Spécialiste Habitat",
    description: "Expertise reconnue pour les pavillons avec jardin et les résidences mérysiennes, avec protection systématique des extérieurs."
  },
  {
    icon: ShieldCheck,
    title: "Garantie Voisinage",
    description: "En tant qu'acteur local, nous veillons scrupuleusement au respect de la tranquillité et de la propreté de votre quartier."
  }
];

const FAQS = [
  { 
    question: "Pourquoi choisir Marne Transdem pour un déménagement à Méry-sur-Oise ?", 
    answer: "Parce que nous sommes vos voisins. Choisir un acteur local garantit une réactivité imbattable, une flexibilité sur les horaires et une connaissance parfaite des contraintes de stationnement propres à Méry-sur-Oise." 
  },
  { 
    question: "Déménagez-vous également sur de longues distances ?", 
    answer: "Absolument. Si Méry est notre base, nous accompagnons nos clients partout en France et en Europe. Votre projet bénéficie de notre rigueur locale, quelle que soit la destination finale." 
  },
  { 
    question: "Comment protégez-vous les maisons avec jardin ?", 
    answer: "Nous utilisons des protections spécifiques pour ne pas marquer vos sols intérieurs (tapis de passage) et veillons à ne pas dégrader vos allées ou pelouses lors de la manutention du mobilier lourd." 
  },
  { 
    question: "Proposez-vous des formules pour les petits appartements ?", 
    answer: "Oui, notre formule 'Économique' est parfaitement adaptée aux petits volumes. Vous préparez vos cartons, et nos professionnels se chargent de la protection du mobilier, du chargement et du transport sécurisé." 
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

export default function MerySurOisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/mery95/1920/1080"
          alt="Vue aérienne de Méry-sur-Oise"
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
            <Link href="/demenagement-val-d-oise-95" className="hover:text-white transition-colors">Val-d'Oise (95)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Méry-sur-Oise</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Déménageur Local - 95540
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Méry-sur-Oise.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'expertise de votre voisin pour une transition sereine. Profitez de la réactivité d'une entreprise basée à Méry (95540) pour votre projet résidentiel ou pro.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis local <ArrowRight className="ml-2 h-4 w-4" />
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
                Déménagez l'esprit tranquille <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">avec vos experts de proximité</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                En tant qu'entreprise implantée à Méry-sur-Oise, nous avons une connaissance millimétrée de notre ville. Entre le Château, les bords de l'Oise et les massifs forestiers, Méry offre un cadre de vie que nous respectons scrupuleusement lors de chaque intervention.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Faire appel à Marne Transdem, c'est choisir la sécurité d'un service personnalisé. Nous ne sommes pas qu'un prestataire, nous sommes vos voisins, engagés pour la réussite de votre emménagement dans le 95540.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Users className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Équipe Locale,<br/> <span className="text-slate-500 font-normal text-sm">une parfaite maîtrise des accès mérysiens.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/mery-move-local/800/600"
                  alt="Déménagement à Méry-sur-Oise par Marne Transdem"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-mery" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Notre engagement pour Méry
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Plus qu'une zone d'intervention, c'est notre ville. Nous en connaissons chaque recoin.
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
                  src="https://picsum.photos/seed/mery-packing-pro/800/600"
                  alt="Protection du mobilier par nos experts à Méry"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations <br/> <span className="text-[#00ad9f]">sur-mesure.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Gestion experte des accès en immeuble, utilisation de monte-meubles et protection des parties communes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Pavillons & Villas</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Spécialiste des grandes propriétés avec protection des sols fragiles et emballage scrupuleux des objets de valeur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De l'offre Économique à la prestation Clé-en-main, nous adaptons notre intervention à votre budget.</p>
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
      <section id="faq-mery" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie dans le 95540.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all duration-200"
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Méry ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Profitez de l'expertise de votre déménageur local pour un devis gratuit et personnalisé sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Devis gratuit en 24h <ArrowRight className="ml-2 h-4 w-4" />
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
