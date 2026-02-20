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
  Gift, Sparkles, Star, MessageSquare, Handshake, 
  MapPin, Search, ChevronRight, Home, Shield
} from "lucide-react";

import type { FormattedReview } from "@/app/api/reviews/route";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Particulier | Formules sur-mesure & Devis Gratuit",
  description: "Déménagement de particuliers en Île-de-France et partout en France. Découvrez nos formules Économique, Standard et Confort. Devis gratuit et rapide.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-particuliers",
  }
};

// --- DATA ---
const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const FORMULAS = [
  {
    icon: Gift,
    title: "Économique",
    description: "Vous emballez, nous transportons. Idéal pour les budgets maîtrisés.",
    features: ["Protection du mobilier", "Manutention et chargement", "Transport sécurisé", "Déchargement dans les pièces"],
    priceIndication: "Le plus abordable",
    highlighted: false,
  },
  {
    icon: Package,
    title: "Standard",
    description: "Le meilleur compromis. On s'occupe du fragile et du mobilier.",
    features: ["Fourniture des cartons", "Emballage du fragile (vaisselle)", "Démontage / Remontage", "Manutention et Transport"],
    priceIndication: "La plus populaire",
    highlighted: true, // Mise en avant !
  },
  {
    icon: Sparkles,
    title: "Confort (Luxe)",
    description: "Déléguez absolument tout. La tranquillité d'esprit totale.",
    features: ["Emballage de TOUT vos biens", "Déballage du fragile à l'arrivée", "Nettoyage du logement (option)", "Mise en penderie des vêtements"],
    priceIndication: "Pour une sérénité totale",
    highlighted: false,
  }
];

const PROCESS_STEPS = [
  { step: 1, icon: MessageSquare, title: "Devis Rapide", description: "Contactez-nous. Évaluation de vos besoins et devis gratuit sans engagement." },
  { step: 2, icon: Search, title: "Visite Technique", description: "Visite (physique ou visio) pour estimer le volume précis et les accès." },
  { step: 3, icon: Handshake, title: "Préparation", description: "Livraison des cartons à domicile et accompagnement jusqu'au jour J." },
  { step: 4, icon: Truck, title: "Jour J", description: "Protection, chargement et transport sécurisé par nos équipes salariées." },
  { step: 5, icon: Home, title: "Installation", description: "Déchargement, remontage des meubles et mise en place dans vos nouvelles pièces." },
];

const ZONES = [
  "Paris (75) : Experts des accès difficiles",
  "Hauts-de-Seine (92) : Intervention rapide",
  "Val-de-Marne (94) : Notre secteur de prédilection",
  "Seine-Saint-Denis (93) : Logistique maîtrisée",
  "Yvelines (78) : Maisons et pavillons",
  "Toute la France : Lignes régulières"
];

const FAQS = [
  { question: "Quand dois-je commencer à organiser mon déménagement ?", answer: "Nous conseillons de nous contacter 1 à 2 mois à l'avance, surtout de mai à septembre. Pour un petit volume ou en basse saison, 2 à 3 semaines peuvent suffire." },
  { question: "Comment est calculé le prix de mon déménagement ?", answer: "Il dépend du volume (en m³), de la distance, de la formule choisie (Éco, Standard, Confort), et des accès (étages, ascenseur, portage)." },
  { question: "La visite technique est-elle obligatoire et payante ?", answer: "Elle est 100% gratuite. Elle est fortement recommandée pour les volumes supérieurs à 15m³ afin de vous garantir un prix ferme et définitif, sans surprise le jour J." },
  { question: "Dois-je faire les démarches pour le stationnement ?", answer: "Non, pour les formules Standard et Confort, nous nous occupons des demandes d'autorisation de stationnement auprès des mairies." },
  { question: "Que se passe-t-il si un de mes biens est endommagé ?", answer: "Vos biens sont couverts par notre assurance contractuelle. Une déclaration de valeur est remplie avant le départ. En cas de dommage, vous êtes indemnisé à hauteur de la valeur déclarée." },
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
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/family-moving/1920/1080"
          alt="Famille heureuse déménageant dans sa nouvelle maison"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Particuliers</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00ad9f] mb-6 shadow-sm">
              <Home className="h-3.5 w-3.5" />
              Service Résidentiel
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                en toute sérénité.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              Parce que changer de vie est déjà une grande étape, nous transformons le transport de vos biens en une expérience simple, fluide et sécurisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm" asChild>
                <a href="#formulas">Voir nos formules</a>
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
                L'humain au cœur <br/> de notre métier.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous savons qu'un déménagement ne se résume pas à déplacer des cartons. C'est un projet de vie. Nous mettons un point d'honneur à vous offrir un accompagnement basé sur l'écoute, la ponctualité et le savoir-faire.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Nos équipes sont <strong>100% salariées et formées</strong> en interne. Que vous quittiez un studio au 5ème étage sans ascenseur ou une grande maison familiale, nous avons l'expertise et le matériel pour réussir votre transition.
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <span className="text-3xl font-extrabold text-slate-900">10+</span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Années d'expérience</span>
                 </div>
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <span className="text-3xl font-extrabold text-slate-900">100%</span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Équipe qualifiée</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Forme douce en arrière-plan */}
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/packing-boxes/800/600"
                  alt="Équipe professionnelle emballant des cartons"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORMULAS (Pricing SaaS Style) --- */}
      <section id="formulas" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Choisissez votre confort
            </h2>
            <p className="text-lg text-slate-500">
              Trois formules claires pour s'adapter à votre budget. Du simple transport à la prise en charge totale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {FORMULAS.map((formula, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col rounded-[2rem] bg-white p-8 transition-all duration-300 ${
                  formula.highlighted 
                    ? "ring-2 ring-[#00ad9f] shadow-2xl md:scale-105 z-10" 
                    : "border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* BADGE "LA PLUS CHOISIE" */}
                {formula.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-[#00ad9f] text-white text-xs font-extrabold uppercase tracking-widest py-1.5 px-5 rounded-full shadow-md">
                      La plus choisie
                    </span>
                  </div>
                )}
                
                <div className="mb-6 flex items-center justify-between">
                   <div className={`p-4 rounded-2xl ${formula.highlighted ? 'bg-[#00ad9f] text-white shadow-lg shadow-[#00ad9f]/20' : 'bg-[#00ad9f]/10 text-[#00ad9f]'}`}>
                      <formula.icon className="h-7 w-7" />
                   </div>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{formula.title}</h3>
                <p className="text-sm text-slate-500 mb-8 min-h-[40px] leading-relaxed">{formula.description}</p>
                
                <ul className="space-y-4 mb-10 flex-1">
                  {formula.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${formula.highlighted ? 'text-[#00ad9f]' : 'text-slate-300'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`pt-6 border-t ${formula.highlighted ? 'border-[#00ad9f]/20' : 'border-slate-100'} text-center mt-auto`}>
                  <p className={`font-bold ${formula.highlighted ? 'text-[#00ad9f]' : 'text-slate-900'}`}>
                    {formula.priceIndication}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-600 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                <Link href="/formules-de-demenagement">Comparer le détail des formules</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* --- PROCESSUS (Timeline Épurée) --- */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
              Un processus sans friction
            </h2>
            <p className="text-lg text-slate-500">Une méthode rodée, étape par étape, pour vous éviter tout stress.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 max-w-6xl mx-auto relative">
            {/* Ligne connectrice (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-100 -z-10" />

            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center group">
                <div className="h-24 w-24 rounded-full bg-white border-[3px] border-slate-50 shadow-sm flex items-center justify-center mb-6 relative group-hover:border-[#00ad9f]/30 transition-colors z-10">
                   <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#00ad9f] text-white font-bold text-sm flex items-center justify-center shadow-md">
                     {step.step}
                   </div>
                   <step.icon className="h-8 w-8 text-[#00ad9f]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed px-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECURITY & ZONES --- */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 space-y-32">
          
          {/* Security */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-slate-900/5">
                <Image
                  src="https://picsum.photos/seed/secure-wrapping/800/600"
                  alt="Protection du mobilier"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge flottant */}
              <div className="absolute -bottom-8 -right-8 bg-white p-5 rounded-3xl shadow-xl flex items-center gap-4 border border-slate-100 hidden sm:flex">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Garantie Totale</p>
                    <p className="text-lg font-bold text-slate-900">Assurance Incluse</p>
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                La sécurité de vos biens, <br/> notre obsession.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Vos meubles et vos souvenirs ont une valeur inestimable. Nous les traitons avec le respect qu'ils méritent grâce à des équipements de pointe.
              </p>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-[#00ad9f]/10 rounded-2xl text-[#00ad9f] shrink-0"><ShieldCheck className="h-6 w-6"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Housses et couvertures pro</h4>
                    <p className="text-base text-slate-500 mt-1 leading-relaxed">Matelas, canapés et meubles fragiles sont protégés avant même de franchir le pas de votre porte.</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="p-3 bg-[#00ad9f]/10 rounded-2xl text-[#00ad9f] shrink-0"><Truck className="h-6 w-6"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Flotte capitonnée récente</h4>
                    <p className="text-base text-slate-500 mt-1 leading-relaxed">Nos camions sont conçus pour amortir les chocs de la route et sécuriser l'arrimage parfait de vos biens.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Zones */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <div className="space-y-8 pr-0 lg:pr-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Départ ou arrivée : <br/> on gère la logistique.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Basés en Île-de-France, nous maîtrisons sur le bout des doigts les contraintes urbaines (accès exigus, couloirs étroits, autorisations de voirie). Mais notre terrain de jeu s'étend à la France entière.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {ZONES.map((zone, idx) => (
                   <div key={idx} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:border-[#00ad9f]/30 transition-colors">
                      <MapPin className="h-5 w-5 text-[#00ad9f] shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{zone}</span>
                   </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl ring-1 ring-slate-900/5 bg-slate-200">
                <Image
                  src="https://picsum.photos/seed/map/800/600"
                  alt="Carte de nos zones d'intervention"
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
      <section id="faq" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout ce que vous devez savoir avant le grand jour.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all duration-200"
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
               {/* Deco (Glow très doux avec la couleur primaire) */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3" />
               
               <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                  Le début de votre nouvelle vie <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                    commence ici.
                  </span>
               </h2>
               <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Ne laissez pas la logistique vous stresser. Obtenez une estimation claire, gratuite et garantie en quelques clics.
               </p>
               
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-white text-[#0f172a] hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]" asChild>
                     <Link href="/demande-de-devis">
                        Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                     </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-base font-medium border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                     <a href="tel:+33144935486">Appeler un conseiller</a>
                  </Button>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}