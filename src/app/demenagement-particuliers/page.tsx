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
  MapPin, Search, ChevronRight, Home, Shield, Map,
  Calculator,
  HelpCircle
} from "lucide-react";

import type { FormattedReview } from "@/app/api/reviews/route";
import { realReviews } from "@/lib/reviews-data";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Particulier | Formules sur-mesure & Devis Gratuit",
  description: "Déménagement de particuliers en Île-de-France et Normandie. Découvrez nos formules Économique, Standard et Confort. Devis gratuit et visite technique sous 48h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-particuliers",
  }
};

// --- DATA ---
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
    highlighted: true,
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
  { name: "Val-d'Oise (95)", link: "/demenagement-val-d-oise-95" },
  { name: "Yvelines (78)", link: "/demenagement-yvelines-78" },
  { name: "Eure (27)", link: "/demenagement-eure-27" },
  { name: "Hauts-de-Seine (92)", link: "/demenagement-hauts-de-seine-92" },
];

const FAQS = [
  { question: "Quand dois-je commencer à organiser mon déménagement ?", answer: "Nous conseillons de nous contacter 1 à 2 mois à l'avance, surtout pour les périodes de mai à septembre. Pour un petit volume ou en basse saison, 2 à 3 semaines peuvent suffire." },
  { question: "Comment est calculé le prix de mon déménagement ?", answer: "Il est calculé sur mesure en fonction du volume (en m³), de la distance à parcourir, de la formule choisie (Éco, Standard, Prestige) et des complexités d'accès (étages, absence d'ascenseur, distance de portage)." },
  { question: "La visite technique est-elle payante ?", answer: "Non, la visite technique est 100% gratuite et sans engagement. Elle est indispensable pour vous garantir un prix ferme et définitif, sans aucune mauvaise surprise le jour du déménagement." },
  { question: "Dois-je faire les démarches pour garer le camion ?", answer: "Non. Si le stationnement public est nécessaire, nous nous occupons de déposer les demandes d'arrêté municipal auprès de la mairie de votre commune de départ et d'arrivée." },
];

export default function DemenagementParticuliersPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
      })}} />
      
      {/* --- HERO SECTION --- */}
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
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-base font-medium border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm" asChild>
                <Link href="/formules-de-demenagement">Comparer nos formules</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAILLAGE INTELLIGENT : TOOLS --- */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/calculateur-volume" className="group flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#00ad9f]/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Pas sûr de votre volume ?</h3>
                  <p className="text-sm text-slate-500 font-light">Utilisez notre calculateur pièce par pièce.</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
            </Link>
            
            <Link href="/tarif-demenagement" className="group flex items-center justify-between p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#00ad9f]/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Besoin d'une estimation ?</h3>
                  <p className="text-sm text-slate-500 font-light">Simulez votre budget en 2 minutes.</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-amber-500 transition-colors" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FORMULAS --- */}
      <section id="formulas" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Choisissez votre niveau de <span className="text-[#00ad9f]">confort</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Trois formules claires pour s'adapter à votre budget et à vos besoins. Pour plus de détails, consultez notre <Link href="/formules-de-demenagement" className="text-primary font-bold hover:underline">comparatif complet</Link>.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {FORMULAS.map((formula, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col rounded-[2.5rem] bg-white p-10 transition-all duration-500 ${
                  formula.highlighted 
                    ? "ring-4 ring-[#00ad9f]/30 shadow-2xl lg:scale-105 z-20 border-2 border-[#00ad9f]" 
                    : "border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 z-10"
                }`}
              >
                <div className="mb-8 flex flex-col items-center text-center mt-2">
                   <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 ${formula.highlighted ? 'bg-[#00ad9f] text-white shadow-lg' : 'bg-slate-50 text-slate-600'}`}>
                      <formula.icon className="h-8 w-8" />
                   </div>
                   <h3 className="text-2xl font-black text-slate-900 mb-3">{formula.title}</h3>
                   <p className="text-sm text-slate-500 leading-relaxed font-light min-h-[40px]">{formula.description}</p>
                </div>
                
                <ul className="space-y-5 flex-grow mb-10">
                  {formula.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-4 text-sm font-medium text-slate-700">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${formula.highlighted ? 'text-[#00ad9f]' : 'text-slate-300'}`} />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full rounded-2xl h-12">
                  <Link href="/demande-devis">Choisir {formula.title}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ZONES --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Une présence <span className="text-[#00ad9f]">locale forte.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Nous intervenons quotidiennement dans vos départements. Découvrez nos expertises locales :
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ZONES.map((zone) => (
              <Link 
                key={zone.name} 
                href={zone.link}
                className="group flex items-center justify-between bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors">{zone.name}</span>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS RÉELS --- */}
      <TestimonialsSection reviews={realReviews} />

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir avant de valider votre date.</p>
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
          
          <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                <HelpCircle className="h-6 w-6" />
              </div>
              <p className="text-slate-700 font-medium">Vous avez d'autres questions techniques ?</p>
            </div>
            <Button asChild variant="link" className="font-bold">
              <Link href="/blog">Consulter nos guides <ChevronRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 overflow-hidden shadow-2xl isolate">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Prêt pour votre nouvelle <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      vie à domicile ?
                    </span>
                 </h2>
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-xl shadow-[#00ad9f]/20" asChild>
                       <Link href="/demande-devis">Démarrer mon devis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
