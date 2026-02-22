import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Icons
import { 
  CheckCircle2, 
  Building2, 
  Globe2, 
  Store, 
  Factory, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Server, 
  FileText,
  Truck,
  LayoutDashboard,
  ChevronRight,
  Briefcase
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement d'Entreprise & Transfert de Bureaux | Devis 24h",
  description: "Expert en transfert d'entreprise : bureaux, informatique, archives et industries. Solutions sur-mesure avec continuité d'activité garantie. Devis pro sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-entreprise-bureau",
  }
};

// --- DATA ---
const enterpriseServices = [
  { title: "Ingénierie de transfert", icon: LayoutDashboard, description: "Cahier des charges, rétroplanning et pilotage complet de votre projet logistique." },
  { title: "Parc Informatique", icon: Server, description: "Déconnexion, emballage antistatique et reconnexion sécurisée de vos serveurs et postes." },
  { title: "Mobilier & Montage", icon: Building2, description: "Démontage et remontage de vos postes de travail, open spaces et espaces collaboratifs." },
  { title: "Gestion d'Archives", icon: FileText, description: "Transfert sécurisé et confidentiel de vos documents sensibles avec inventaire rigoureux." },
  { title: "Logistique Adaptée", icon: Truck, description: "Flotte de véhicules capitonnés, hayons et monte-meubles pour une manutention sans risque." },
  { title: "Aménagement Final", icon: CheckCircle2, description: "Installation précise selon vos plans d'implantation (Space Planning) pour une reprise immédiate." },
];

const enterpriseTypes = [
  { icon: Building2, title: "Tertiaire & PME", description: "Déménagement de bureaux agile pour minimiser l'impact sur vos collaborateurs et votre CA." },
  { icon: Globe2, title: "Multi-sites & Sièges", description: "Coordination de transferts complexes de grande envergure entre plusieurs pôles géographiques." },
  { icon: Store, title: "Retail & Commerces", description: "Gestion des stocks, présentoirs et mobilier commercial avec une rapidité d'exécution absolue." },
  { icon: Factory, title: "Industrie & Ateliers", description: "Transfert de machines-outils, laboratoires et équipements lourds avec matériel de levage spécifique." },
];

const faqItems = [
  {
    question: "Comment garantissez-vous la continuité de notre activité ?",
    answer: "L'anticipation est la clé. Nous proposons des interventions en horaires décalés : soirées, week-ends ou jours fériés. L'objectif est que vos collaborateurs quittent leurs bureaux le vendredi soir et retrouvent leur poste 100% opérationnel le lundi matin."
  },
  {
    question: "Gérez-vous le matériel informatique sensible ?",
    answer: "Absolument. C'est un point critique de nos transferts. Nous utilisons des bacs de protection scellés, des housses antistatiques et des chariots spécifiques. Nos équipes peuvent travailler de concert avec votre DSI pour le rackage de vos serveurs."
  },
  {
    question: "Quelle assurance couvre notre matériel professionnel ?",
    answer: "En plus de notre RC Professionnelle, nous proposons systématiquement une assurance 'Ad Valorem'. Elle garantit votre matériel à sa valeur d'usage ou à neuf selon vos besoins, couvrant l'intégralité des risques liés à la manutention et au transport."
  },
  {
    question: "Pouvez-vous évacuer et recycler le mobilier obsolète ?",
    answer: "Oui, dans le cadre d'une démarche RSE. Nous gérons le curage de vos anciens locaux et proposons l'évacuation de votre ancien mobilier vers des centres de tri agréés (filière Valdelia) ou des associations partenaires pour le réemploi."
  }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function DemenagementEntreprisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center text-center text-white overflow-hidden bg-[#0b0f19] pt-32 lg:pt-40 pb-20">
        <Image 
          src="/images/entete-pages.webp"
          alt="Transfert de bureaux professionnel"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
          
          {/* Fil d'Ariane intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Entreprises</span>
          </nav>

          <div className="max-w-4xl flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-8 shadow-sm backdrop-blur-md">
              <Clock className="h-4 w-4" />
              Continuité d'activité garantie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Transfert d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">Entreprises</span> <br className="hidden sm:block" />
              & Bureaux.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Parce que votre temps est précieux, nous orchestrons votre déménagement professionnel avec une précision chirurgicale. Zéro interruption, efficacité totale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
                  Estimation Professionnelle <ArrowRight className="ml-2 h-5 w-5" />
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
              <div className="inline-flex p-4 rounded-3xl bg-teal-50 border border-teal-100 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Le transfert de vos locaux, <br />
                <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">sans perte de productivité</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Un déménagement d'entreprise n'est pas qu'une affaire de cartons. C'est un défi logistique, technique et humain qui impacte directement vos résultats et le bien-être de vos collaborateurs.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous traitons chaque transfert comme un projet stratégique. Nos chefs de projets dédiés collaborent avec vos services (Moyens Généraux, DSI, RH) pour garantir que votre infrastructure soit 100% opérationnelle dès la première heure à votre nouvelle adresse.
                </p>
              </div>
              
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-100">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black text-slate-900">24h</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Devis Pro Garanti</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black text-slate-900">100%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Salariés Formés</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/services/demenagement-entreprises.webp"
                  alt="Planification de transfert de bureaux"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID (DARK PREMIUM) --- */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Une expertise à <span className="text-[#00ad9f]">360 degrés</span>
            </h2>
            <p className="text-slate-400 text-lg font-light">
              Nous prenons en charge l'intégralité de la chaîne logistique, de la planification à l'installation finale.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseServices.map((service, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-[#00ad9f]/50 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm">
                <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/20 flex items-center justify-center mb-6 group-hover:bg-[#00ad9f] transition-colors duration-500">
                  <service.icon className="h-7 w-7 text-[#00ad9f] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTOR ADAPTABILITY (BENTO GRID) --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Adapté à votre <br className="hidden md:block"/>
                <span className="text-[#00ad9f]">secteur d'activité.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Chaque métier possède ses propres contraintes et normes de sécurité. Nous avons l'expérience et le matériel pour y répondre.
              </p>
            </div>
            <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:bg-[#00ad9f]/5" asChild>
              <Link href="/contact">Parler à un conseiller B2B</Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enterpriseTypes.map((type, i) => (
              <div key={i} className="border border-slate-100 shadow-sm rounded-[2.5rem] p-8 bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-[#00ad9f]/10 transition-colors">
                  <type.icon className="h-8 w-8 text-[#00ad9f]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Expertise & <span className="text-[#00ad9f]">FAQ</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce que vous devez savoir avant d'initier votre projet de transfert.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`} 
                className="bg-slate-50 border border-slate-100 rounded-[1.5rem] px-2 data-[state=open]:border-[#00ad9f]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline hover:text-[#00ad9f] py-6 px-4 transition-colors text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-500 text-base leading-relaxed px-4 pb-6 font-light">
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
          <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden isolate shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                Planifiez votre transfert <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                  dès aujourd'hui.
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                Nos experts B2B vous accompagnent pour établir un devis détaillé basé sur votre cahier des charges spécifique. Réponse assurée sous 24 heures.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)] hover:scale-105" asChild>
                  <Link href="/dashboard/quote">
                    Étude gratuite & Devis <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-lg font-bold border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all" asChild>
                  <a href="tel:+33130751235">
                    Contacter un expert
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}