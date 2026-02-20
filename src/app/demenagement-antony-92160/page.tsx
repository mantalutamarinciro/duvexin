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
  TreePine, 
  Building, 
  Truck,
  ArrowRight,
  ChevronRight,
  Map,
  Home
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Antony (92) | Particuliers & Pros | Devis Gratuit",
  description: "Déménageur expert à Antony (92160). Spécialiste des zones pavillonnaires et des appartements. Logistique fluide et devis gratuit en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-antony-92160",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Moreau", text: "Le déménagement de notre maison à Antony a été une vraie réussite. L'équipe a été très professionnelle et a su s'adapter aux accès de notre rue. Un grand bravo.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Moreau92` },
  { id: "fallback-2", name: "Sophie G.", text: "Un service client à l'écoute et une équipe de déménageurs très efficace pour mon appartement près du centre-ville. Je recommande sans la moindre hésitation.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG92` },
  { id: "fallback-3", name: "Marc T.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Déménager à Antony a été bien plus simple que je ne l'imaginais grâce à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT92` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Connaissance d'Antony",
    description: "Du centre-ville dynamique aux quartiers résidentiels calmes, nous maîtrisons le plan de circulation local pour une logistique fluide."
  },
  {
    icon: TreePine,
    title: "Expertise Pavillonnaire",
    description: "Nous avons une grande habitude du déménagement de maisons avec jardin, avec une protection totale de vos extérieurs et intérieurs."
  },
  {
    icon: Truck,
    title: "Maîtrise des accès",
    description: "Nous anticipons la proximité des grands axes (A6, A10) et des transports pour garantir une ponctualité exemplaire."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie d'Antony, un souci en moins pour vous."
  }
];

const FAQS = [
  { question: "Comment se déroule un déménagement dans un quartier pavillonnaire d'Antony ?", answer: "Nous portons une attention particulière à la protection de votre propriété et de votre voisinage. Nous utilisons des véhicules de taille adaptée pour ne pas bloquer les rues étroites et planifions l'intervention pour minimiser la gêne. Une visite technique nous permet d'anticiper." },
  { question: "Proposez-vous des formules pour les étudiants ou les petits appartements ?", answer: "Oui, absolument. Nous proposons la formule 'Économique' et des solutions pour les petits volumes, idéales pour les jeunes actifs s'installant près du RER B. Vous faites vos cartons, nous gérons la manutention lourde et le transport." },
  { question: "Gérez-vous les déménagements de ou vers la province depuis Antony ?", answer: "Oui ! Bien que nous soyons des experts locaux du 92, nous assurons des déménagements nationaux depuis Antony vers toutes les régions de France (groupages ou voyages spéciaux). Nous gérons la longue distance avec le même professionnalisme." },
  { question: "Quels types de protections utilisez-vous pour les biens fragiles ?", answer: "La sécurité de vos affaires est notre priorité. Nous utilisons des couvertures épaisses de déménageur, des housses capitonnées pour la literie et les canapés, ainsi que des cartons renforcés ou caisses sur-mesure (bullkraft) pour vos objets fragiles." }
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

export default function AntonyPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/antony-city/1920/1080"
          alt="Vue d'un quartier résidentiel verdoyant à Antony"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/demenagement-hauts-de-seine-92" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Antony</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Expert Local 92
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Antony.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique fiable et locale pour les particuliers et les entreprises à Antony (92160). L'équilibre parfait entre efficacité et sérénité.
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
                L'expertise d'une <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">ville aux deux visages</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Antony est une ville particulièrement appréciée pour son cadre de vie verdoyant et ses vastes quartiers pavillonnaires, tout en étant aux portes immédiates de Paris et des grands axes d'Île-de-France.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager ici exige une vraie agilité. Qu'il s'agisse de manœuvrer dans une petite rue résidentielle avec un portail étroit ou d'intervenir dans un appartement du centre-ville, nos équipes maîtrisent ces configurations. Nous adaptons la taille de nos camions et déployons des monte-meubles pour garantir une prestation sans accroc.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Home className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste de l'Habitat,<br/> <span className="text-slate-500 font-normal text-sm">du pavillon à l'appartement.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/antony-team/800/600"
                  alt="Équipe professionnelle de déménagement devant un pavillon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-antony" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour les Hauts-de-Seine
            </h2>
            <p className="text-lg text-slate-500">
              Notre parfaite connaissance du terrain antonien est la garantie d'une journée sans surprise.
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
                  src="https://picsum.photos/seed/antony-packing/800/600"
                  alt="Déménageur protégeant avec soin un meuble"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une solution pour <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Une logistique adaptée aux grands volumes : protection experte de votre mobilier lourd et respect absolu de vos extérieurs.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Nous gérons les contraintes d'étages et d'ascenseurs en déployant, si nécessaire, un monte-meubles rapide et sécurisé.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la simple location de camion avec chauffeur-déménageur à la prestation "Confort" où l'on emballe toute votre vaisselle.</p>
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
      <section id="faq-antony" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation dans le 92.</p>
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
                    <span className="text-[#00ad9f]">départ d'Antony ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez nos équipes pour une visite technique et obtenez un devis gratuit, transparent et détaillé.
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
