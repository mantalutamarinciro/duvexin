import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";

// Icons
import { 
  CheckCircle2, ShieldCheck, Truck, Package, ArrowRight, 
  Gift, Sparkles, MessageSquare, Handshake, 
  MapPin, Search, ChevronRight, Home, Shield, Map
} from "lucide-react";

import type { FormattedReview } from "@/app/api/reviews/route";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Particulier | Formules sur-mesure & Devis Gratuit",
  description: "Déménagement de particuliers en Île-de-France et Normandie. Découvrez nos formules Économique, Standard et Confort. Devis gratuit et visite technique sous 48h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-particuliers",
  }
};

// --- DATA ---
const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail ! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement de l'Île-de-France vers la province parfaitement réalisé. Très bon contact avec le bureau. Équipe sur le terrain efficace, rapide et sympathique. Du vrai sur-mesure.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace et du matériel très bien protégé. On sent vraiment l'esprit familial sans sous-traitants. Sincèrement je suis bluffé. MERCI.", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const FORMULAS = [
  {
    icon: Gift,
    title: "Économique",
    description: "Vous emballez, nous transportons. L'option idéale pour les budgets maîtrisés.",
    features: ["Protection du mobilier (couvertures)", "Manutention et chargement", "Transport sécurisé en camion capitonné", "Déchargement dans vos nouvelles pièces"],
    priceIndication: "Le plus abordable",
    highlighted: false,
  },
  {
    icon: Package,
    title: "Standard",
    description: "Le meilleur compromis. On s'occupe du fragile, du mobilier et de la manutention lourde.",
    features: ["Fourniture des cartons à l'avance", "Emballage du fragile (vaisselle, miroirs)", "Démontage & Remontage du mobilier", "Mise sous housse de la literie"],
    priceIndication: "La plus choisie",
    highlighted: true, // Mise en avant !
  },
  {
    icon: Sparkles,
    title: "Prestige",
    description: "Déléguez absolument tout. La tranquillité d'esprit totale pour vous et votre famille.",
    features: ["Emballage de TOUT votre logement", "Déballage du fragile à l'arrivée", "Mise en penderie des vêtements", "Protection premium (caisserie sur-mesure)"],
    priceIndication: "Sérénité absolue",
    highlighted: false,
  }
];

const PROCESS_STEPS = [
  { step: 1, icon: MessageSquare, title: "1. Contact", description: "Évaluation rapide de vos besoins et prise de rendez-vous." },
  { step: 2, icon: Search, title: "2. Visite", description: "Audit technique (physique ou visio) pour estimer le volume précis." },
  { step: 3, icon: Handshake, title: "3. Devis", description: "Envoi de votre devis détaillé, fixe et définitif sous 24h." },
  { step: 4, icon: Package, title: "4. Préparation", description: "Livraison de vos cartons à domicile bien avant le jour J." },
  { step: 5, icon: Truck, title: "5. Le Jour J", description: "Intervention experte de notre équipe salariée." },
];

const ZONES = [
  "Val-d'Oise (95) : Notre fief historique",
  "Yvelines (78) : Experts zones résidentielles",
  "Eure (27) : Logistique réactive via Évreux",
  "Hauts-de-Seine (92) : Maîtrise des accès denses",
  "Seine-St-Denis (93) : Gestion des grands ensembles",
  "National : Liaisons régulières toute France"
];

const FAQS = [
  { question: "Quand dois-je commencer à organiser mon déménagement ?", answer: "Nous conseillons de nous contacter 1 à 2 mois à l'avance, surtout pour les périodes de mai à septembre. Pour un petit volume ou en basse saison, 2 à 3 semaines peuvent suffire." },
  { question: "Comment est calculé le prix de mon déménagement ?", answer: "Il est calculé sur mesure en fonction du volume (en m³), de la distance à parcourir, de la formule choisie (Éco, Standard, Prestige) et des complexités d'accès (étages, absence d'ascenseur, distance de portage)." },
  { question: "La visite technique est-elle payante ?", answer: "Non, la visite technique est 100% gratuite et sans engagement. Elle est indispensable pour vous garantir un prix ferme et définitif, sans aucune mauvaise surprise le jour du déménagement." },
  { question: "Dois-je faire les démarches pour garer le camion ?", answer: "Non. Si le stationnement public est nécessaire, nous nous occupons de déposer les demandes d'arrêté municipal auprès de la mairie de votre commune de départ et d'arrivée." },
  { question: "Mes meubles sont-ils assurés pendant le transport ?", answer: "Oui, tous vos biens sont couverts par notre assurance contractuelle professionnelle. Avant le déménagement, vous remplirez une déclaration de valeur pour les objets spécifiques." },
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

export default function DemenagementParticuliersPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION (Padding supérieur augmenté) --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménagement serein pour particuliers"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Particuliers</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-8 shadow-sm backdrop-blur-md">
              <Home className="h-4 w-4" />
              Service Résidentiel
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                en toute sérénité.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Changer de vie est une grande étape. Nous transformons le transport de votre patrimoine en une expérience simple, humaine et hautement sécurisée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-base font-medium border-white/20 text-primary hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm" asChild>
                <a href="#formulas">Découvrir nos formules</a>
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
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                L'humain au cœur <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">de notre métier</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 leading-relaxed font-light">
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous savons qu'un déménagement ne se résume pas à déplacer des cartons. C'est l'histoire de votre vie qui change d'adresse. Nous mettons un point d'honneur à vous offrir un accompagnement basé sur l'écoute et le savoir-faire.
                </p>
                <p>
                  Nos équipes sont <strong>100% salariées et formées</strong> en interne. Que vous quittiez un appartement sans ascenseur ou une grande maison familiale, nous avons l'expertise pour réussir votre transition.
                </p>
              </div>
              
              <div className="pt-4 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6">
                    <span className="text-4xl font-black text-slate-900">15+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Années d'expertise</span>
                 </div>
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6">
                    <span className="text-4xl font-black text-slate-900">100%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Équipe salariée</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/demenagement-particuliers.webp"
                  alt="Déménageur protégeant un meuble"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMULAS (Pricing SaaS Style) --- */}
      <section id="formulas" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Choisissez votre niveau de <span className="text-[#00ad9f]">confort</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Trois formules claires pour s'adapter à votre budget et à votre emploi du temps.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {FORMULAS.map((formula, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col rounded-[2.5rem] bg-white p-10 transition-all duration-500 ${
                  formula.highlighted 
                    ? "ring-4 ring-[#00ad9f]/30 shadow-2xl lg:scale-105 z-20 border-2 border-[#00ad9f]" 
                    : "border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 z-10"
                }`}
              >
                {formula.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#00ad9f] text-white text-xs font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                      Le choix préféré
                    </span>
                  </div>
                )}
                
                <div className="mb-8 flex flex-col items-center text-center mt-2">
                   <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${formula.highlighted ? 'bg-[#00ad9f] text-white shadow-lg' : 'bg-slate-50 text-slate-600'}`}>
                      <formula.icon className="h-8 w-8" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-3">{formula.title}</h3>
                   <p className="text-sm text-slate-500 leading-relaxed font-light min-h-[40px]">{formula.description}</p>
                </div>
                
                <div className="h-px w-full bg-slate-100 mb-8" />
                
                <ul className="space-y-5 flex-grow mb-10">
                  {formula.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-4 text-sm font-medium text-slate-700">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${formula.highlighted ? 'text-[#00ad9f]' : 'text-slate-300'}`} />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`pt-6 border-t text-center ${formula.highlighted ? 'border-[#00ad9f]/20' : 'border-slate-100'}`}>
                  <p className={`text-sm font-black uppercase tracking-widest ${formula.highlighted ? 'text-[#00ad9f]' : 'text-slate-400'}`}>
                    {formula.priceIndication}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROCESSUS (Timeline Éditoriale) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Une organisation <span className="text-[#00ad9f]">sans faille</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Une méthode éprouvée pour vous éviter tout stress logistique.</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Ligne connectrice (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#00ad9f]/20 to-transparent -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
              {PROCESS_STEPS.map((step) => (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  <div className="h-24 w-24 rounded-3xl bg-slate-50 border-2 border-white shadow-lg flex items-center justify-center mb-6 relative group-hover:-translate-y-2 group-hover:bg-[#00ad9f] transition-all duration-300 z-10">
                     <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-slate-900 text-white font-black text-xs flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                       {step.step}
                     </div>
                     <step.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-light leading-relaxed px-2">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECURITY & ZONES --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 space-y-32 max-w-7xl">
          
          {/* Security */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-teal-100 rounded-[3rem] rotate-2 transition-transform duration-700 group-hover:rotate-4 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Protection minutieuse du mobilier de valeur"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-5 border border-slate-100">
                 <div className="h-14 w-14 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Shield className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Garantie Totale</p>
                    <p className="text-lg font-extrabold text-slate-900">Assurance Incluse</p>
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                La sécurité de vos biens, <br/> <span className="text-[#00ad9f]">notre obsession.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Vos meubles et vos souvenirs ont une valeur inestimable. Nous les traitons avec le respect qu'ils méritent grâce à des équipements de pointe et des gestes techniques maîtrisés.
              </p>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 text-[#00ad9f]">
                    <ShieldCheck className="h-6 w-6"/>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Protections professionnelles</h4>
                    <p className="text-slate-500 leading-relaxed font-light">Couvertures lourdes, housses matelassées et bullkraft. Tout est emballé avant de franchir votre porte.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0 text-[#00ad9f]">
                    <Truck className="h-6 w-6"/>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Flotte capitonnée récente</h4>
                    <p className="text-slate-500 leading-relaxed font-light">Nos camions disposent de suspensions pneumatiques pour amortir les chocs et sécuriser le transport.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Zones */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-10 lg:pr-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                D'où que vous partiez, <br/> <span className="text-[#00ad9f]">nous y allons.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light leading-relaxed">
                Basés dans le Val-d'Oise, nous maîtrisons sur le bout des doigts les contraintes de l'Île-de-France (accès exigus, couloirs étroits). Mais notre réseau logistique s'étend à la France entière et à l'Europe limitrophe.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {ZONES.map((zone, idx) => (
                   <div key={idx} className="flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-[#00ad9f]/30 transition-all group cursor-default">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors">
                        <MapPin className="h-4 w-4 text-slate-400 group-hover:text-[#00ad9f] transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{zone}</span>
                   </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-200 rounded-[3rem] -rotate-2 transition-transform duration-700 group-hover:rotate-2 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/demenagement-paris-province.webp"
                  alt="Camion de déménagement sur route"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce que vous devez savoir avant de valider votre date.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 py-6 px-6 hover:no-underline hover:text-[#00ad9f] transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base font-light leading-relaxed px-6 pb-6">
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
               
               <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Le premier jour de <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      votre nouvelle vie.
                    </span>
                 </h2>
                 <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                    Ne laissez pas la logistique vous stresser. Obtenez une estimation claire, garantie et détaillée en quelques clics.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/dashboard/quote">
                          Démarrer mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-lg font-bold border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all" asChild>
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