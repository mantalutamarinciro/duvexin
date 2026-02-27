
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
  Users, 
  Globe, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  Timer,
  Scale,
  Zap,
  Map as MapIcon,
  FileText
} from "lucide-react";

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Vanderberg", text: "Déménagement de Paris à Bruxelles réalisé avec une efficacité incroyable. L'équipe a géré les formalités et le déchargement dans une rue étroite d'Ixelles sans aucun souci. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Vanderberg` },
  { id: "fallback-2", name: "Julien M.", text: "Service parfait pour mon installation à Liège. La formule groupage m'a permis de faire de vraies économies sur le transport. Équipe ponctuelle et matériel de protection de qualité.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienLiege` },
  { id: "fallback-3", name: "Société Euro-Tech", text: "Le transfert de nos bureaux de Lille vers Anvers a été orchestré de main de maître. Discrétion, respect des délais et maîtrise des enjeux internationaux. Des vrais pros du transfert B2B.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=EuroTech` },
];

const BELGIUM_CITIES = [
  { name: "Bruxelles", desc: "La capitale européenne et ses communes (Ixelles, Uccle...)" },
  { name: "Anvers (Antwerpen)", desc: "Gestion logistique du pôle portuaire et diamantaire." },
  { name: "Gand (Gent)", desc: "Expertise des accès historiques et canaux flamands." },
  { name: "Charleroi", desc: "Interventions rapides dans tout le Hainaut." },
  { name: "Liège", desc: "La cité ardente, carrefour stratégique vers l'Allemagne." },
  { name: "Namur", desc: "Service premium pour la capitale wallonne." },
  { name: "Mons", desc: "Proximité immédiate via l'axe Paris-Bruxelles." },
  { name: "Bruges (Brugge)", desc: "Soin extrême pour la Venise du Nord." }
];

const WHY_US_ITEMS = [
  {
    icon: Globe,
    title: "Expertise Transfrontalière",
    description: "Nous maîtrisons parfaitement les liaisons France-Belgique via l'A1 et l'A2, assurant des trajets hebdomadaires fluides."
  },
  {
    icon: FileText,
    title: "Accompagnement Administratif",
    description: "Bien qu'au sein de l'UE, un déménagement international demande de la rigueur sur les contrats et les assurances spécifiques."
  },
  {
    icon: Scale,
    title: "Solutions de Groupage",
    description: "Divisez vos frais de transport par deux en mutualisant votre trajet vers la Belgique avec d'autres clients."
  },
  {
    icon: ShieldCheck,
    title: "Garantie 'Clou à Clou'",
    description: "De l'emballage en France à la remise en place en Belgique, votre patrimoine est couvert par une assurance Ad Valorem."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement vers la Belgique ?", 
    answer: "Grâce à la proximité géographique, un déménagement vers Bruxelles ou le Hainaut peut s'effectuer en 24h à 48h. Nous chargeons le matin en France et livrons généralement le lendemain matin en Belgique pour garantir un repos réglementaire à nos chauffeurs et une sécurité maximale." 
  },
  { 
    question: "Proposez-vous le groupage pour les petits volumes ?", 
    answer: "Oui, c'est l'une de nos offres les plus demandées sur l'axe Paris-Bruxelles. Si vous avez moins de 15m³, nous mutualisons le transport, ce qui vous permet de bénéficier de tarifs ultra-compétitifs en partageant les frais de route." 
  },
  { 
    question: "Gérez-vous le stationnement à Bruxelles ou Anvers ?", 
    answer: "Absolument. Les villes belges sont très strictes sur le stationnement. Nous coordonnons avec les services de police locaux ou des partenaires sur place pour réserver les emplacements nécessaires et installer les panneaux d'interdiction de stationner." 
  },
  { 
    question: "Quelles sont les formalités pour déménager en Belgique ?", 
    answer: "En tant que citoyen de l'UE, les formalités sont simplifiées. Il vous faudra principalement un inventaire détaillé chiffré pour l'assurance et vos justificatifs de changement de résidence. Nos conseillers vous fournissent la liste exacte des documents nécessaires lors de la validation du devis." 
  }
];

export default function BelgiumPage() {
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
          src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1920"
          alt="Vue de Bruxelles, Grand Place"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">France - Belgique</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Liaison Internationale France → Belgique
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                vers la Belgique.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Mettez le cap sur le plat pays en toute sérénité. De Paris, Lille ou toute la France, profitez d'une logistique rodée pour un déménagement international fluide et au meilleur prix.
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
                Une logistique sans frontières <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour votre nouveau départ</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  S'installer en Belgique est une aventure passionnante, que ce soit pour rejoindre les institutions européennes à Bruxelles, le dynamisme économique d'Anvers ou la qualité de vie wallonne. Pour réussir cette transition, la maîtrise des liaisons transfrontalières est impérative.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons fait de l'axe France-Belgique une spécialité. Nous gérons aussi bien les accès denses des communes bruxelloises (Ixelles, Saint-Gilles, Uccle) que les livraisons dans les zones pavillonnaires ou les pôles tertiaires de toute la Belgique.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Timer className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Rapidité & Régularité</h3>
                   <p className="text-slate-500 font-light">Des départs hebdomadaires pour garantir une flexibilité totale de vos dates.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800"
                  alt="Équipe de déménagement internationale"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-belgium" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre trajet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une organisation millimétrée pour une liaison France-Belgique parfaitement maîtrisée.
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

      {/* --- CITIES GRID --- */}
      <section id="cities-belgium" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">toute la Belgique.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Nos camions assurent des liaisons régulières vers les plus grandes métropoles belges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {BELGIUM_CITIES.map((city) => (
              <div 
                key={city.name} 
                className="group flex flex-col bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="font-bold text-slate-200 group-hover:text-white transition-colors mb-1">{city.name}</span>
                <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{city.desc}</span>
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
                  src="/images/services/demenagement-international.webp"
                  alt="Déménagement international premium"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil international.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expatriés & Fonctionnaires</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Service premium incluant l'emballage complet, le déballage et la réinstallation de votre intérieur pour une transition sans effort vers Bruxelles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Scale className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Groupage Économique</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Divisez vos frais de transport par deux en mutualisant le trajet avec d'autres clients vers les grandes villes belges.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Transferts de Bureaux</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique B2B experte : transfert informatique, d'archives et de mobiliers professionnels entre la France et la Belgique.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
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
      <section id="faq-belgium" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout ce qu'il faut savoir pour déménager sereinement vers la Belgique.</p>
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
                      départ pour la Belgique ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas les frontières compliquer votre projet. Contactez nos experts internationaux pour une étude personnalisée et recevez un devis ferme sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit en 24h <ArrowRight className="ml-2 h-5 w-5" />
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
