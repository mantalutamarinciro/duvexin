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
  Landmark, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  History,
  Building2,
  Map,
  Home
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Bayeux (14) | Expert Patrimoine & Devis Gratuit",
  description: "Déménageur de confiance à Bayeux (14400). Spécialiste du centre médiéval et des demeures du Bessin. Protection du patrimoine et devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-bayeux-14400",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Leclair", text: "Déménagement dans le centre ancien de Bayeux géré avec un professionnalisme remarquable. L'équipe a pris un soin infini de nos affaires et des lieux. Un grand merci !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Leclair14` },
  { id: "fallback-2", name: "Jean-Eudes R.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et du matériel de qualité. Une entreprise sérieuse pour une ville historique.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JER14` },
  { id: "fallback-3", name: "Sophie B.", text: "Efficacité et professionnalisme. Je recommande vivement Déménagement du Vexin pour leur sérieux et leur respect du patrimoine.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieB14` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Bayeux",
    description: "Du centre médiéval aux quartiers récents, nous maîtrisons les accès et les spécificités de la cité épiscopale."
  },
  {
    icon: Landmark,
    title: "Respect du Patrimoine",
    description: "Nous intervenons avec une minutie totale dans le secteur sauvegardé, protégeant sols anciens et boiseries."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Utilisation de véhicules de petits gabarits et de monte-meubles pour les rues pavées et étroites du Vieux Bayeux."
  },
  {
    icon: ShieldCheck,
    title: "Ancrage Normand",
    description: "Grâce à notre base d'Évreux, nous sommes votre partenaire réactif pour tout le Bessin et le Calvados."
  }
];

const FAQS = [
  { question: "Comment se passe un déménagement dans le centre médiéval de Bayeux ?", answer: "Le centre de Bayeux, avec ses rues pavées, demande une planification millimétrée. Nous effectuons une visite technique pour choisir le véhicule adapté. Nous gérons également la réservation de stationnement auprès de la mairie pour garantir une place et une intervention sécurisée." },
  { question: "Déménagez-vous les maisons de caractère en pierre de Caen ?", answer: "Oui, c'est l'une de nos spécialités. Nous protégeons systématiquement les sols anciens et les cages d'escalier. Nos équipes sont formées à la manipulation de mobilier ancien et d'objets de valeur propres aux demeures du Bessin." },
  { question: "Gérez-vous les déménagements internationaux vers Bayeux ?", answer: "Absolument. Bayeux attire une clientèle internationale. Nous coordonnons les transferts depuis l'Europe (Belgique, Royaume-Uni, etc.) en gérant la logistique de bout en bout, jusqu'à la remise en place de vos effets personnels." },
  { question: "Quelles sont vos formules pour les budgets maîtrisés ?", answer: "Nous proposons la formule 'Économique'. Vous emballez vos cartons, et nos professionnels s'occupent de la protection du mobilier, de la manutention lourde et du transport sécurisé vers votre nouvelle adresse." }
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

export default function BayeuxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/bayeux-cathedral/1920/1080"
          alt="La majestueuse Cathédrale de Bayeux en Normandie"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-calvados-14" className="hover:text-white transition-colors">Calvados (14)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Bayeux</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <History className="h-4 w-4" />
              Expert Patrimoine
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                au cœur de Bayeux.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution experte et locale pour votre projet à Bayeux (14400). Un savoir-faire haut de gamme pour une ville d'exception.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
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
                Quand l'histoire rencontre <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">la logistique moderne</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Bayeux, ville au patrimoine médiéval unique, demande une approche alliant respect de l'ancien et efficacité. Son centre préservé est un joyau qui impose un savoir-faire spécifique.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Qu'il s'agisse d'un appartement de caractère près de la cathédrale ou d'une maison de maître dans le Bessin, nous planifions chaque détail. Nous maîtrisons les contraintes du secteur sauvegardé pour vous garantir une installation sereine et parfaitement orchestrée.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Centre Ancien,<br/> <span className="text-slate-500 font-normal text-sm">protection absolue de vos intérieurs.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/bayeux-team/800/600"
                  alt="Équipe de déménagement en Normandie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-bayeux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le Bessin
            </h2>
            <p className="text-lg text-slate-500">
              Notre proximité géographique et notre expertise du patrimoine sont vos meilleures garanties.
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
                  src="https://picsum.photos/seed/bayeux-packing/800/600"
                  alt="Déménageur protégeant du mobilier ancien"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque projet.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons de Caractère</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée aux demeures en pierre de Caen, avec protection spécifique des escaliers et parquets.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Maîtrise des accès en centre-ville historique et utilisation de monte-meubles pour les étages.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la prestation 'Éco' à la formule 'Confort' incluant l'emballage complet de vos objets précieux.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/services">Explorer nos services</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-bayeux" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Nos réponses pour préparer votre installation dans le Calvados.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-white border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-200"
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
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">arrivée à Bayeux ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Confiez votre patrimoine à des experts. Contactez nos équipes pour une visite technique gratuite et recevez un devis détaillé sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-4 w-4" />
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
