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
  MoveUp,
  Landmark,
  Timer,
  FileText,
  BadgeCheck
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris (75) | Expert Local & Devis Gratuit sous 24h",
  description: "Déménageur professionnel à Paris (75). Spécialiste rues étroites, haussmannien et monte-meubles. Gestion des autorisations de stationnement. Devis gratuit.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-paris-75",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Claire B.", text: "Déménager dans le Marais relevait du défi. L'équipe a été incroyable, obtenant les autorisations et utilisant un monte-meubles avec une efficacité redoutable dans une rue minuscule. Je recommande à 1000%.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireB` },
  { id: "fallback-2", name: "Julien & Marc", text: "Service impeccable pour notre déménagement dans le 15ème. Ponctuels, professionnels et surtout, ils connaissent Paris sur le bout des doigts. Rien n'a été un problème pour eux.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienMarc` },
  { id: "fallback-3", name: "Entreprise Innovatech", text: "Transfert de nos bureaux du 8ème vers le 17ème sans aucune interruption d'activité. Une planification parfaite et une discrétion totale. Bravo à toute l'équipe.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=Innovatech` },
];

const PARIS_QUARTIERS = [
  { name: "Le Marais (3e, 4e)", id: "marais", description: "Expertise rues étroites et cours pavées." },
  { name: "Montmartre (18e)", id: "montmartre", description: "Spécialiste portage en escaliers et rues en pente." },
  { name: "Saint-Germain (6e)", id: "saint-germain", description: "Soin luxe pour immeubles haussmanniens." },
  { name: "Passy (16e)", id: "passy", description: "Grands volumes et mobilier de standing." },
  { name: "Batignolles (17e)", id: "batignolles", description: "Zones denses et nouveaux quartiers." },
  { name: "Opéra (9e)", id: "opera", description: "Transferts de bureaux et logistique pro." }
];

const WHY_CHOOSE_US = [
  {
    icon: Truck,
    title: "Maîtrise de l'Hyper-Centre",
    description: "Rues étroites, cours intérieures, sens uniques... Nous possédons une flotte de véhicules adaptés au gabarit parisien."
  },
  {
    icon: FileText,
    title: "Autorisations Clés en Main",
    description: "Nous gérons l'intégralité des demandes de stationnement auprès de la Préfecture et des mairies d'arrondissement."
  },
  {
    icon: MoveUp,
    title: "Solutions de Levage",
    description: "Monte-meubles autoportés jusqu'au 12ème étage pour sécuriser vos biens et protéger les parties communes."
  },
  {
    icon: BadgeCheck,
    title: "Équipes Salariées",
    description: "Déménageurs expérimentés, formés aux techniques d'emballage les plus exigeantes (bullkraft, caisses export)."
  }
];

const FAQS = [
  { 
    question: "Comment réservez-vous le stationnement à Paris ?", 
    answer: "Nous déposons une demande d'autorisation d'occupation du domaine public (AOT) au moins 15 jours avant votre déménagement. Cela garantit un emplacement réservé pour nos camions au départ comme à l'arrivée." 
  },
  { 
    question: "Le monte-meubles est-il obligatoire pour un 4ème étage ?", 
    answer: "Pas obligatoire, mais fortement recommandé si l'ascenseur est absent ou trop étroit. Il divise par deux le temps de manutention et élimine les risques de rayures dans les escaliers étroits." 
  },
  { 
    question: "Déménagez-vous les pianos et objets d'art ?", 
    answer: "Oui, nous disposons de matériel spécifique (housse piano, sangles de levage) et d'une assurance Ad Valorem pour couvrir vos objets de grande valeur à leur prix réel." 
  },
  { 
    question: "Quels sont vos délais pour un devis à Paris ?", 
    answer: "Nous réalisons une visite technique (physique ou visio) sous 48h. Votre devis détaillé et définitif vous est envoyé dans la foulée, sans aucun frais caché." 
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer }
  }))
};

export default function ParisPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920"
          alt="Déménagement professionnel à Paris"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="flex items-center justify-center text-sm font-medium text-slate-300 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4 mx-2 text-[#00ad9f]" />
              <span className="text-white">Déménagement Paris</span>
            </nav>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Déménagez à <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">Paris</span> sans stress.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed font-light">
              L'expertise logistique pour la capitale : gestion des autorisations, monte-meubles et protection prestige pour vos biens.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-[#00ad9f] hover:bg-[#009286] transition-all hover:scale-105 shadow-xl" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-black transition-all" asChild>
                <Link href="#arrondissements">Voir nos zones d'intervention</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- KEY FIGURES --- */}
      <div className="bg-slate-50 py-8 border-y border-slate-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#00ad9f]">15 ans</p>
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">D'expérience</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#00ad9f]">100%</p>
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Salariés Pros</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#00ad9f]">24h</p>
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Délai Devis</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-[#00ad9f]">4.9/5</p>
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Avis Clients</p>
          </div>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -z-10" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                Maîtriser la complexité de <br/> <span className="text-[#00ad9f]">Paris (75)</span>.
              </h2>
              <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                <p>
                  Déménager dans la Ville Lumière est un projet exaltant, mais aussi une opération logistique complexe. Circulation dense, rues étroites du centre historique, réglementation stricte de stationnement, étages sans ascenseur...
                </p>
                <p>
                  Chez <strong>Marne Transdem</strong>, nous avons fait de ces contraintes notre terrain d'expertise. Nous planifions chaque déménagement parisien avec une rigueur absolue, en anticipant chaque détail pour vous assurer une transition fluide.
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                {["Visite technique gratuite", "Protection intégrale sous bullkraft", "Gestion des arrêtés de voirie"].map((text, idx) => (
                  <li key={idx} className="flex items-center gap-3 font-semibold text-slate-800">
                    <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-1 group transition-transform hover:rotate-0 duration-500">
              <Image
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000"
                alt="Logistique déménagement Paris"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[40px] md:rounded-[80px] mx-2 md:mx-4">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Pourquoi nous confier vos clés ?</h2>
            <p className="text-slate-400 text-lg">Un service pensé pour les particuliers et les entreprises exigeantes de la capitale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-[#00ad9f] transition-all group">
                <div className="h-16 w-16 bg-[#00ad9f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-[#00ad9f]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ARRONDISSEMENTS SECTION --- */}
      <section id="arrondissements" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Nos zones d'intervention privilégiées</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Du studio d'étudiant aux grands plateaux de bureaux, nous intervenons partout intramuros.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PARIS_QUARTIERS.map((quartier) => (
              <div key={quartier.id} className="p-6 border border-slate-100 rounded-2xl hover:shadow-lg transition-all group cursor-default bg-slate-50/50">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-[#00ad9f] group-hover:bg-[#00ad9f] group-hover:text-white transition-colors">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{quartier.name}</h4>
                    <p className="text-sm text-slate-500 mt-1">{quartier.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MONTE-MEUBLES FOCUS --- */}
      <section className="py-20 bg-teal-50/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[40px] p-8 md:p-16 shadow-xl shadow-teal-900/5">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-1.5 bg-[#00ad9f]/10 text-[#00ad9f] rounded-full text-sm font-bold uppercase tracking-wider">
                Solution Technique
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Le Monte-Meubles : l'indispensable de l'habitat parisien.</h2>
              <p className="text-lg text-slate-600">
                À Paris, l'absence d'ascenseur ou l'exiguïté des escaliers de service transforme souvent le déménagement en calvaire. Nos monte-meubles permettent de passer vos objets par la fenêtre en toute sécurité.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 font-medium">
                  <Timer className="text-[#00ad9f]" /> Gain de temps (30%)
                </div>
                <div className="flex items-center gap-3 font-medium">
                  <ShieldCheck className="text-[#00ad9f]" /> Zéro casse
                </div>
              </div>
              <Button className="mt-4 rounded-full bg-[#00ad9f]" asChild>
                <Link href="/services/monte-meubles">En savoir plus</Link>
              </Button>
            </div>
            <div className="flex-1 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-inner">
               <Image 
                src="https://picsum.photos/seed/monte-meubles/800/600" 
                alt="Monte-meubles en action" 
                fill 
                className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 italic">Vos questions, nos réponses</h2>
            <p className="text-slate-500">Tout ce qu'il faut savoir pour préparer votre installation réussie à Paris.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem value={`item-${i}`} key={i} className="border border-slate-100 px-6 rounded-2xl bg-slate-50/30">
                <AccordionTrigger className="text-lg font-bold text-slate-900 hover:no-underline py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-slate-600 leading-relaxed pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[50px] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#00ad9f33,transparent_70%)]" />
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Lancez votre projet dès maintenant.</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Recevez un devis détaillé, personnalisé et sans engagement en moins de 24 heures. Nos experts sont là pour vous conseiller.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* CORRECTION ICI : size="lg" au lieu de "xl" */}
              <Button size="lg" className="rounded-full h-16 px-10 text-xl font-bold bg-[#00ad9f] hover:bg-[#009286] shadow-2xl shadow-teal-500/20" asChild>
                <Link href="/demande-de-devis">Demander mon devis gratuit</Link>
              </Button>
              <Link href="tel:+33123456789" className="text-white hover:text-[#00ad9f] font-bold text-lg underline underline-offset-8 transition-colors">
                Ou appelez-nous directement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}