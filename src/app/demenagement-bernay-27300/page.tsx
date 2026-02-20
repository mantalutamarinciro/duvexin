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
  Home,
  Users
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Bernay (27) | Expert Normandie & Devis Gratuit",
  description: "Déménageur de confiance à Bernay (27300). Spécialiste du centre historique et des longères normandes. Protection du patrimoine et devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-bernay-27300",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lebrun", text: "Notre déménagement dans une maison à colombages à Bernay a été une réussite. L'équipe a été très soigneuse et professionnelle. On sent le respect du bâti ancien.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lebrun27` },
  { id: "fallback-2", name: "Jean-Pierre D.", text: "Très bonne expérience pour mon appartement. Devis clair, équipe ponctuelle et du matériel de qualité. Un déménagement sans aucun stress.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JPD27` },
  { id: "fallback-3", name: "Sophie M.", text: "Efficacité et professionnalisme. Je recommande vivement Déménagement du Vexin pour leur sérieux et leur ponctualité à Bernay.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieM27V` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Bernay",
    description: "Du centre historique aux quartiers résidentiels, nous connaissons les accès et spécificités de cette ville d'Art et d'Histoire."
  },
  {
    icon: Landmark,
    title: "Respect du Patrimoine",
    description: "Nous intervenons avec un soin particulier dans le centre ancien, en protégeant les pans de bois et vos biens les plus précieux."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Utilisation de véhicules de tailles variées pour nous adapter aux rues médiévales et aux configurations normandes complexes."
  },
  {
    icon: ShieldCheck,
    title: "Ancrage local",
    description: "Avec notre base d'Évreux, nous sommes votre partenaire de proximité pour tout projet à Bernay et dans le Pays d'Auge."
  }
];

const FAQS = [
  { question: "Comment se passe un déménagement dans le centre-ville de Bernay ?", answer: "Le centre de Bernay, avec ses maisons à colombages, demande une étude d'accès précise. Nous choisissons le véhicule le plus adapté pour ne pas bloquer les rues étroites. Nous nous chargeons également de la réservation de stationnement auprès de la mairie pour garantir une place sécurisée le jour J." },
  { question: "Assurez-vous les déménagements longue distance depuis Bernay ?", answer: "Absolument. Que vous quittiez Bernay pour une autre région de France ou que vous arriviez en Normandie, nous gérons votre projet de A à Z (emballage, transport, déchargement) avec la même rigueur." },
  { question: "Je déménage dans une longère normande, comment faites-vous ?", answer: "C'est une situation que nous rencontrons souvent. Nous utilisons du matériel de protection renforcé pour les sols et disposons de petits porteurs pour les accès ruraux parfois étroits ou non goudronnés." },
  { question: "Quelles sont vos formules pour les budgets maîtrisés ?", answer: "Nous proposons la formule 'Économique'. Elle permet de bénéficier de l'expertise de déménageurs professionnels pour la protection du mobilier, le portage et le transport sécurisé, tout en vous laissant la gestion de l'emballage des cartons." }
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

export default function BernayPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/bernay-city/1920/1080"
          alt="Vue sur l'architecture authentique de Bernay en Normandie"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-eure-27" className="hover:text-white transition-colors">Eure (27)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Bernay</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <History className="h-4 w-4" />
              Ville d'Art & d'Histoire
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Bernay.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution experte et locale pour votre projet à Bernay (27300). Un savoir-faire respectueux du bâti ancien pour une transition en toute sérénité.
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
                Le respect du charme <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">de l'Eure profonde</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Bernay, c'est choisir une ville au cadre de vie authentiquement normand. Son centre historique, avec ses célèbres maisons à colombages, demande une approche respectueuse et une logistique millimétrée.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre antenne régionale, nous maîtrisons les particularités de Bernay et de sa campagne environnante. Que vous emménagiez dans une maison de caractère du centre ou une longère dans le Pays d'Auge, nous planifions chaque détail pour préserver votre patrimoine.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <History className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Bâti Ancien,<br/> <span className="text-slate-500 font-normal text-sm">protection absolue de vos intérieurs.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/bernay-normandy-team/800/600"
                  alt="Équipe de déménagement professionnelle en Normandie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-bernay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-slate-500">
              La force d'un réseau national, l'écoute d'un partenaire local.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
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
                  src="https://picsum.photos/seed/bernay-packing-furniture/800/600"
                  alt="Déménageur protégeant du mobilier normand"
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
                    <h4 className="text-lg font-bold text-slate-900">Maisons & Longères</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée aux demeures normandes, avec protection spécifique des escaliers, sols anciens et jardins.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Maîtrise des accès en centre-ville et utilisation de monte-meubles pour les étages élevés ou étroits.</p>
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
                   <Link href="/services">Explorer tous nos services</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-bernay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation dans l'Eure.</p>
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none corrigés */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Bernay ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Confiez votre mobilier à des professionnels du territoire. Contactez-nous pour une visite technique gratuite et recevez un devis détaillé sous 24h.
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
