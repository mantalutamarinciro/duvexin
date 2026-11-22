import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { LocalMovingGuide } from "@/components/local-moving-guide";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VerifiedTestimonialsSection } from "@/components/testimonials-section";

// Icons
import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Users,
  Building2,
  Truck,
  Landmark,
  ArrowRight,
  ChevronRight,
  Map,
  History,
  Home,
  Briefcase,
  GraduationCap
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménageur à Pontoise (95) | Devis personnalisé",
  description: "Déménageur à Pontoise : étude des rues étroites, étages, stationnement et distance de portage dans le centre ancien comme les autres quartiers.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-pontoise-95300",
  }
};


const WHY_US_ITEMS = [
  {
    icon: Landmark,
    title: "Savoir-faire Patrimonial",
    description: "Les rues étroites, escaliers, paliers et immeubles anciens sont décrits avant de choisir les moyens de manutention."
  },
  {
    icon: MapPin,
    title: "Maîtrise du 95300",
    description: "De l'Hermitage aux Louvrais, l'organisation est définie selon l'adresse, le logement et la distance entre le véhicule et l'entrée."
  },
  {
    icon: Truck,
    title: "Logistique Adaptative",
    description: "Le véhicule et l'éventuel recours à un monte-meubles sont déterminés après l'étude du mobilier et des accès."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Le besoin d'autorisation ou de réservation de stationnement est vérifié et les démarches sont précisées avant la date retenue."
  }
];

const FAQS = [
  {
    question: "Comment gérez-vous les rues étroites du centre historique de Pontoise ?",
    answer: "Nous relevons la largeur de la rue, le stationnement possible, les portes, les paliers et les escaliers. Le véhicule et les moyens de manutention sont ensuite choisis selon ces informations et le volume à transporter."
  },
  {
    question: "Proposez-vous des formules pour les étudiants de l'Université ?",
    answer: "Oui. Pour un studio ou un petit appartement, la formule Économique permet de préparer les cartons et de confier la protection du mobilier, le chargement et le transport à l'équipe. Le devis dépend aussi des accès et de la distance."
  },
  {
    question: "Comment protégez-vous mon mobilier de valeur ou ancien ?",
    answer: "La nature et les dimensions du mobilier sont relevées avant l'intervention. Couvertures, housses et emballages renforcés sont prévus selon les besoins identifiés pour les tableaux, miroirs ou autres objets fragiles."
  },
  {
    question: "Quel est le délai pour obtenir un devis ?",
    answer: "Après notre premier échange ou une visite technique, éventuellement réalisée en visio, le devis est préparé selon le volume, les accès et les prestations demandées."
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

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Déménagement à Pontoise",
  serviceType: "Service de déménagement",
  url: "https://demenagementduvexin.fr/demenagement-pontoise-95300",
  areaServed: { "@type": "City", name: "Pontoise" },
  provider: { "@type": "Organization", name: "Déménagement du Vexin", url: "https://demenagementduvexin.fr" }
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
    { "@type": "ListItem", position: 2, name: "Val-d'Oise", item: "https://demenagementduvexin.fr/demenagement-val-d-oise-95" },
    { "@type": "ListItem", position: 3, name: "Pontoise", item: "https://demenagementduvexin.fr/demenagement-pontoise-95300" }
  ]
};

export default function PontoisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant un transfert"
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
            <Link href="/demenagement-val-d-oise-95" className="hover:text-white transition-colors">Val-d'Oise (95)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Pontoise</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <History className="h-4 w-4" />
              Expert Déménagement Ville d'Art et d'Histoire
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Pontoise.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Une organisation adaptée aux résidents et entreprises de Pontoise (95300), du centre ancien aux quartiers en hauteur.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
                Une logistique experte <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour une ville millénaire</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Le relief vallonné et les immeubles anciens de Pontoise peuvent compliquer le stationnement, le portage et le passage du mobilier. Ces contraintes doivent être décrites avant de choisir le véhicule et les moyens de manutention.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous préparons les interventions des ruelles de l'Hermitage aux grandes artères des Louvrais, selon les accès et le type de logement.
                </p>
              </div>

              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Building2 className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste Val-d'Oise</h3>
                   <p className="text-slate-500 font-light">Étude des accès urbains complexes et accompagnement pour les autorisations de stationnement.</p>
                 </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-pontoise.webp"
                  alt="Équipe de déménagement professionnelle en intervention dans le centre de Pontoise"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-pontoise" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 95
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Des vérifications concrètes pour préparer les accès, le stationnement et le passage du mobilier.
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
                  alt="Déménageur protégeant du mobilier de valeur avec un soin d'orfèvre"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Centre Historique</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection des parties communes selon leur configuration et étude d'un monte-meubles lorsque le mobilier ne passe pas par l'intérieur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Maisons & Pavillons</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique adaptée pour les propriétés avec jardin et emballage très scrupuleux de vos biens les plus précieux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><GraduationCap className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Étudiants & Actifs</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Formules comparées selon le petit volume, les accès, la distance et les tâches que vous souhaitez préparer vous-même.</p>
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
      <VerifiedTestimonialsSection />

      <LocalMovingGuide city="pontoise" />

      {/* --- FAQ --- */}
      <section id="faq-pontoise" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Pontoise.</p>
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
                      départ de Pontoise ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique urbaine ou les accès complexes ternir votre projet. Contactez nos experts pour une visite technique et obtenez un devis gratuit.
                 </p>

                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
