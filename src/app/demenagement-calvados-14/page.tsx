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
  Star, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Anchor,
  Compass,
  Building2,
  Map as MapIcon
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Calvados (14) | Expert Normandie & Devis Gratuit",
  description: "Déménageur de confiance dans le Calvados. De Caen à Deauville, nous gérons vos transferts Île-de-France / Normandie avec soin. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-calvados-14",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lefebvre", text: "Le déménagement de notre maison de Paris à Caen a été une vraie réussite. L'équipe a été très professionnelle et a parfaitement géré la logistique. Bravo !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefebvre14` },
  { id: "fallback-2", name: "Sophie G.", text: "Un service client au top et une équipe de déménageurs très efficace pour mon appartement à Deauville. Je recommande vivement Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG14` },
  { id: "fallback-3", name: "Marc D.", text: "Devis clair, équipe ponctuelle et matériel de protection de qualité. Mon installation dans le Calvados s'est déroulée sans stress.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14` },
];

const CALVADOS_CITIES = [
  { name: "Caen", link: "/demenagement-caen-14000"},
  { name: "Lisieux", link: "/demenagement-lisieux-14100"},
  { name: "Hérouville-St-Clair", link: "/demenagement-herouville-saint-clair-14200"},
  { name: "Bayeux", link: "/demenagement-bayeux-14400"},
  { name: "Vire", link: "/demenagement-vire-14500"},
  { name: "Ifs", link: "/demenagement-ifs-14123"},
  { name: "Mondeville", link: "/demenagement-mondeville-14200"},
  { name: "Ouistreham", link: "/demenagement-ouistreham-14150"},
  { name: "Falaise", link: "/demenagement-falaise-14700"},
  { name: "Honfleur", link: "/demenagement-honfleur-14600"},
  { name: "Deauville", link: "/demenagement-deauville-14800"},
  { name: "Trouville-sur-Mer", link: "/demenagement-trouville-sur-mer-14360"}
];

const WHY_US_ITEMS = [
  {
    icon: Compass,
    title: "Expertise Normande",
    description: "De la plaine de Caen à la Côte Fleurie, notre agence d'Évreux nous offre une connaissance fine de tout le Calvados."
  },
  {
    icon: Users,
    title: "Équipes Locales",
    description: "Nos déménageurs salariés connaissent parfaitement la région, garantissant ponctualité et réactivité."
  },
  {
    icon: ShieldCheck,
    title: "Protection Littorale",
    description: "Emballages spécifiques et protection renforcée pour faire face à l'humidité saline des déménagements en bord de mer."
  },
  {
    icon: Star,
    title: "Fiabilité & Suivi",
    description: "Un interlocuteur unique pour coordonner votre trajet depuis l'Île-de-France vers votre nouvelle adresse normande."
  }
];

const FAQS = [
  { question: "Comment se déroule un déménagement Paris vers la Côte Fleurie ?", answer: "C'est un trajet fréquent pour nos équipes. Nous planifions souvent l'opération sur deux jours : chargement en Île-de-France le jour J, et livraison matinale le lendemain dans le Calvados. Nous gérons les autorisations de stationnement, cruciales à Deauville ou Honfleur." },
  { question: "Déménagez-vous dans le centre historique de Caen ?", answer: "Oui, nous maîtrisons les accès complexes du centre caennais (rues piétonnes, sens uniques). Nous utilisons des véhicules adaptés et des monte-meubles pour préserver les cages d'escalier étroites des immeubles anciens." },
  { question: "Intervenez-vous dans les zones rurales du Calvados ?", answer: "Absolument. Notre flotte comprend des camions de tous gabarits pour accéder aux propriétés isolées du Pays d'Auge ou du Bessin, même via des chemins étroits." },
  { question: "Quels sont les avantages de votre agence d'Évreux ?", answer: "Située à la frontière du 27 et du 14, notre agence d'Évreux sert de hub logistique. Cela nous permet d'être ultra-compétitifs sur les tarifs et de proposer des groupages réguliers pour réduire vos coûts de transport." }
];

export default function CalvadosPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script 
        id="faq-schema" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          }))
        })}} 
      />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/deauville-beach/1920/1080"
          alt="Les célèbres planches de Deauville dans le Calvados"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Calvados (14)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Anchor className="h-4 w-4" />
              Expert Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans le Calvados.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Caen à la Côte Fleurie, nous orchestrons votre installation en Normandie. Profitez d'un service premium, sécurisé et local pour votre nouvelle adresse dans le 14.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir mon devis normand <ArrowRight className="ml-2 h-4 w-4" />
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
                Le Calvados, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">entre terre et mer</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Le département 14 offre un cadre de vie exceptionnel : du dynamisme de l'agglomération caennaise au prestige balnéaire de Deauville et Honfleur. Déménager dans cette région demande une connaissance fine des accès urbains comme des contraintes littorales.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Grâce à notre agence locale basée à Évreux, nous intervenons avec une réactivité totale sur l'ensemble du Calvados. Que vous soyez un particulier ou une entreprise, nous déployons les moyens techniques nécessaires (monte-meubles, emballages maritimes) nécessaires à une protection absolue de vos biens.
              </p>
              
              <div className="pt-6">
                 <Button asChild variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:text-[#00ad9f] hover:border-[#00ad9f]">
                    <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence normande</Link>
                 </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/caen-city-move/800/600"
                  alt="Équipe de déménagement professionnelle à Caen"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-calvados" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'expert local du 14
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre solide ancrage en Normandie est votre meilleure garantie pour une installation sans accroc.
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

      {/* --- CITIES GRID (SEO Siloing) --- */}
      <section id="cities-calvados" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">tout le 14.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Nos camions sillonnent quotidiennement les routes du Calvados. Retrouvez nos secteurs d'intervention :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CALVADOS_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-slate-800/50 border border-slate-700 p-4 rounded-2xl hover:bg-[#00ad9f]/10 hover:border-[#00ad9f]/30 transition-all duration-300"
              >
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#00ad9f] group-hover:translate-x-1 transition-all" />
              </Link>
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
                  src="https://picsum.photos/seed/normandy-move-pack/800/600"
                  alt="Déménageur protégeant du mobilier haut de gamme"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts d'Entreprises</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique de bureaux vers les parcs d'activités de Caen ou de Lisieux, sans interruption de votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Déménagement Particuliers</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la formule Éco au service Tout Confort incluant l'emballage complet de vos objets précieux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><MapIcon className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles Sécurisé</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Besoin de stocker vos biens pendant une transition ? Nos box normands sont 100% sécurisés.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/services">Voir tous nos services</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-calvados" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour déménager dans le 14.</p>
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
                    <span className="text-[#00ad9f]">départ vers le 14 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez nos experts normands pour une étude personnalisée et recevez un devis gratuit sous 24h.
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
