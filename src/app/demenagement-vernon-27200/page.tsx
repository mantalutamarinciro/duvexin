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
  Truck, 
  Palette, 
  ArrowRight, 
  ChevronRight, 
  Compass,
  Home,
  Building
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Vernon (27) | Expert Normandie & Devis Gratuit",
  description: "Votre déménageur expert à Vernon (27200) et Giverny. Logistique adaptée au centre-ville historique et aux bords de Seine. Devis gratuit en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-vernon-27200", // À adapter
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Roussel", text: "Notre déménagement à Vernon s'est déroulé sans le moindre accroc. L'équipe a été très professionnelle et a pris grand soin de nos affaires. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Roussel27` },
  { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour mon appartement en centre-ville. Ils ont géré les accès étroits avec une grande facilité. Une entreprise sérieuse que je recommande.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD27` },
  { id: "fallback-3", name: "Sophie Lambert", text: "Efficacité, ponctualité et une équipe sympathique. Mon déménagement a été bien plus simple que je l'imaginais.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lambert27` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Vernon",
    description: "Du centre médiéval aux quartiers plus récents, nous connaissons les accès et les spécificités de la ville."
  },
  {
    icon: Palette,
    title: "Proximité Giverny",
    description: "Nous avons l'habitude d'intervenir dans ce secteur touristique protégé, avec le plus grand respect pour l'environnement."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Nous utilisons des véhicules de tailles variées et des monte-meubles pour nous adapter aux rues parfois très étroites."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour le centre ancien."
  }
];

const FAQS = [
  { question: "Comment se passe un déménagement dans le centre ancien de Vernon ?", answer: "C'est une zone que nous connaissons bien. Une visite technique nous permet d'évaluer les accès, souvent étroits. Nous choisissons le véhicule le plus adapté et nous nous chargeons de la réservation de stationnement pour garantir une intervention efficace et minimiser la gêne." },
  { question: "Assurez-vous les déménagements longue distance depuis ou vers Vernon ?", answer: "Oui, notre agence d'Évreux est notre base pour toute la Normandie mais nous assurons des déménagements sur toutes les distances en France. Que vous arriviez de Paris ou partiez pour la Bretagne, nous gérons votre projet de A à Z." },
  { question: "Je déménage dans une maison avec un accès difficile, comment faites-vous ?", answer: "C'est une situation fréquente dans l'Eure. Nous disposons de plusieurs tailles de véhicules et nos équipes sont expertes en manutention. Si nécessaire, nous pouvons organiser un transbordement avec un véhicule plus petit pour les derniers mètres." },
  { question: "Quelles sont vos formules pour un petit budget ?", answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution : vous vous chargez de l'emballage de vos cartons, et nos professionnels assurent la manutention lourde, la protection et le transport sécurisé." }
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

export default function VernonPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/vernon-mill/1920/1080"
          alt="Vue sur le Vieux Moulin de Vernon sur la Seine"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/zones" className="hover:text-white transition-colors">Eure (27)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Vernon</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Compass className="h-4 w-4" />
              Agence Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Vernon.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution experte et locale pour votre projet à Vernon (27200). Une logistique infaillible aux portes de la Normandie et de Giverny.
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
                Une logistique adaptée <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">au charme normand</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Vernon, c'est choisir une ville d'art et d'histoire, appréciée pour son cadre de vie paisible au bord de la Seine. Mais son centre ancien aux rues étroites demande une approche logistique millimétrée.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Forts de notre ancrage local dans l'Eure, nous anticipons les difficultés d'accès, notamment près des zones touristiques comme Giverny. Que vous emménagiez dans une maison à colombages ou un pavillon moderne, nous déployons les véhicules et monte-meubles adaptés pour un déménagement en douceur.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <MapPin className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Locale,<br/> <span className="text-slate-500 font-normal text-sm">des bords de Seine au centre-ville.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/vernon-team/800/600"
                  alt="Équipe professionnelle en intervention dans l'Eure"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-vernon" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix dans l'Eure
            </h2>
            <p className="text-lg text-slate-500">
              Notre connaissance du terrain vernonnais est la clé de votre tranquillité d'esprit.
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
                  src="https://picsum.photos/seed/vernon-packing/800/600"
                  alt="Déménageur emballant avec soin des objets"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une offre conçue <br/> <span className="text-[#00ad9f]">pour chaque foyer.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une expertise particulière pour l'emballage de grands volumes et la protection de vos biens lors du portage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Nous gérons les contraintes liées aux cages d'escalier et utilisons des monte-meubles pour les accès complexes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules à la carte</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la prestation économique (où vous emballez vos cartons) au service tout confort (clé en main).</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/formules-de-demenagement">Comparer nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-vernon" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses claires pour un aménagement réussi dans l'Eure.</p>
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
               
               {/* Deco de fond fluide avec z-index et pointer-events-none */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Vernon ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez nos spécialistes normands pour une analyse précise de votre volume et obtenez un devis gratuit et personnalisé.
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