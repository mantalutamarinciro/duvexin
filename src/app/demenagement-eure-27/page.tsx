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
  Map,
  Home,
  Building2,
  Truck,
  Boxes
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Eure (27) | Agence Locale Évreux & Devis Gratuit",
  description: "Déménageur expert dans l'Eure (27). Agence à Évreux pour un service de proximité à Vernon, Louviers, Gisors. Particuliers & Entreprises. Devis en 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-eure-27",
  }
};

const EURE_CITIES = [
  { name: "Évreux", link: "/demenagement-evreux-27000"},
  { name: "Vernon", link: "/demenagement-vernon-27200"},
  { name: "Louviers", link: "/demenagement-louviers-27400"},
  { name: "Val-de-Reuil", link: "/demenagement-val-de-reuil-27100"},
  { name: "Gisors", link: "/demenagement-gisors-27140"},
  { name: "Bernay", link: "/demenagement-bernay-27300"},
  { name: "Pont-Audemer", link: "/demenagement-pont-audemer-27500"},
  { name: "Les Andelys", link: "/demenagement-les-andelys-27700"},
  { name: "Gaillon", link: "/demenagement-gaillon-27600"},
  { name: "Verneuil d'Avre et d'Iton", link: "/demenagement-verneuil-davre-et-diton-27130"}
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Agence Locale à Évreux",
    description: "Notre présence physique au cœur du 27 garantit une réactivité maximale pour vos visites techniques."
  },
  {
    icon: Users,
    title: "Équipes Normandes",
    description: "Des déménageurs professionnels issus de la région, experts des accès urbains et ruraux de l'Eure."
  },
  {
    icon: ShieldCheck,
    title: "Expertise Vexin & Seine",
    description: "Maîtrise totale des spécificités locales, des centres-villes anciens aux propriétés du Vexin Normand."
  },
  {
    icon: Star,
    title: "Engagement Qualité",
    description: "Un interlocuteur unique et un suivi personnalisé pour une transition sereine vers votre nouveau foyer."
  }
];

const FAQS = [
  { question: "Quels sont les avantages de votre agence à Évreux ?", answer: "Notre agence d'Évreux est notre hub pour la Normandie. Cela nous permet de réaliser des visites techniques gratuites sous 24h, de mieux coordonner la logistique locale et de proposer des tarifs ultra-compétitifs en réduisant les frais de déplacement des camions." },
  { question: "Gérez-vous les accès difficiles en campagne normande ?", answer: "Oui, c'est notre quotidien. Nous disposons de camions de tous gabarits (du 20m³ au semi-remorque) pour accéder aux fermes isolées ou aux rues étroites des villages de l'Eure. Nos équipes sont formées à la manutention délicate pour protéger vos parquets et jardins." },
  { question: "Intervenez-vous sur tout le département de l'Eure ?", answer: "Absolument. De Vernon à Bernay, de Louviers à Gisors ou Les Andelys, nos camions sillonnent quotidiennement le 27 pour accompagner particuliers et professionnels." },
  { question: "Quelles sont les garanties pour mes objets de valeur ?", answer: "Chaque déménagement est couvert par notre assurance responsabilité civile. Pour vos biens précieux ou antiquités normandes, nous proposons des extensions d'assurance 'Ad Valorem' pour une couverture à la valeur réelle." }
];

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et professionnelle à Évreux. Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés !", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Déménagement vers Bernay parfaitement réalisé. Professionnel du début jusqu'à la livraison. Équipe efficace et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé par la rapidité et le soin. MERCI.", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

export default function EurePage() {
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
          src="https://picsum.photos/seed/eure-normandie/1920/1080"
          alt="Paysage de l'Eure en Normandie"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/zones" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Eure (27)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Ancrage Local en Normandie
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans l'Eure.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Profitez de l'expertise de notre agence d'Évreux pour votre installation dans le 27. Réactivité, proximité et savoir-faire normand pour une transition sans stress.
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
                L'Eure en toute confiance <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">via notre agence d'Évreux</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager dans l'Eure (27) exige une parfaite connaissance du territoire, de la vallée de la Seine aux plaines du Vexin normand. Pour réussir ce projet, s'appuyer sur un partenaire local est un atout majeur.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Notre agence implantée à Évreux est votre interlocuteur de proximité. Nos équipes vous apportent leur expertise du terrain et une réactivité totale pour que votre installation à Vernon, Louviers ou Gisors soit une parfaite réussite.
              </p>
              
              <div className="pt-6">
                <Button asChild variant="outline" className="rounded-full border-slate-200 text-slate-600 hover:text-[#00ad9f] hover:border-[#00ad9f]">
                  <Link href="/demenagement-du-vexin-evreux">Visiter notre agence d'Évreux</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/evreux-office/800/600"
                  alt="Notre agence de déménagement à Évreux"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-eure" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              L'expert local du 27
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre solide ancrage normand fait toute la différence pour votre logistique.
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
      <section id="cities-eure" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Présents dans <span className="text-[#00ad9f]">tout le 27.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Nos camions d'Évreux interviennent sur l'ensemble de l'Eure et de la Normandie.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {EURE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
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
                  src="https://picsum.photos/seed/eure-pack/800/600"
                  alt="Déménageur protégeant du mobilier normand"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Déménagement Particuliers</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la formule Éco au service Tout Confort, nous adaptons nos moyens à votre budget et vos volumes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique dédiée aux entreprises de l'Eure : transfert d'archives, informatique et mobilier pro.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Boxes className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles à Évreux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solution de stockage sécurisée dans nos entrepôts d'Évreux pour vos périodes de transition.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-eure" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Tout savoir pour déménager sereinement dans le 27.</p>
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
                    <span className="text-[#00ad9f]">départ vers le 27 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez notre agence d'Évreux pour une étude personnalisée et recevez un devis gratuit sous 24h.
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