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
  Home,
  Briefcase,
  LayoutGrid,
  ShieldAlert
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Seine-Saint-Denis (93) | Expert Local & Devis sous 24h",
  description: "Déménageur de confiance en Seine-Saint-Denis (93). De Saint-Denis à Montreuil, nous gérons vos déménagements résidentiels et transferts de bureaux. Devis gratuit.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-seine-saint-denis-93",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Karim B.", text: "Super efficace pour mon déménagement à Saint-Denis. L'équipe a géré l'accès à l'immeuble et le stationnement comme des chefs dans une rue pourtant très chargée. Rien à dire, c'était parfait.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Karim93` },
  { id: "fallback-2", name: "Stéphanie et Paul", text: "Nous étions stressés à l'idée de déménager à Montreuil, mais Déménagement du Vexin a rendu l'expérience très simple. Équipe ponctuelle, polie et très protectrice avec nos meubles.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Stephanie93` },
  { id: "fallback-3", name: "Leila A.", text: "Service au top pour un petit volume à Aubervilliers. Le devis était compétitif et sans frais cachés. Le monte-meubles a été un vrai plus pour mon 5ème étage. Je recommande !", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=Leila93` },
];

const SSD_CITIES = [
  "Saint-Denis", "Montreuil", "Aubervilliers", "Aulnay-sous-Bois", "Drancy", 
  "Noisy-le-Grand", "Pantin", "Bondy", "Épinay-sur-Seine", "Bobigny", 
  "Le Blanc-Mesnil", "Rosny-sous-Bois"
];

const WHY_US_ITEMS = [
  {
    icon: Building2,
    title: "Expertise Urbaine",
    description: "Maîtrise totale des accès en grands ensembles et résidences denses pour une logistique fluide sans imprévus."
  },
  {
    icon: MoveUp,
    title: "Solutions de Levage",
    description: "Déploiement de monte-meubles jusqu'au 12ème étage pour sécuriser vos biens et préserver les parties communes."
  },
  {
    icon: ShieldAlert,
    title: "Gestion Administrative",
    description: "Nous gérons l'intégralité des demandes d'autorisation de stationnement auprès des mairies du 93."
  },
  {
    icon: Users,
    title: "Équipes Salariées",
    description: "Déménageurs qualifiés, formés au portage technique en escaliers et à l'emballage haute protection."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous le stationnement dans les zones denses du 93 ?", 
    answer: "C'est notre quotidien. Nous déposons les demandes d'arrêté municipal 15 jours à l'avance pour privatiser l'espace au pied de votre immeuble, évitant ainsi les blocages de circulation et les retards le jour J." 
  },
  { 
    question: "Déménagez-vous les entreprises et bureaux en Seine-Saint-Denis ?", 
    answer: "Oui, la Seine-Saint-Denis est un pôle économique majeur. Nous accompagnons les professionnels pour des transferts de bureaux ou d'archives avec une planification qui minimise l'arrêt de votre productivité." 
  },
  { 
    question: "Est-il possible de déménager sans ascenseur ?", 
    answer: "Absolument. Nos équipes sont entraînées au portage en escalier. Pour les volumes importants ou les objets lourds (canapés, électroménager), nous préconisons l'usage d'un monte-meubles extérieur pour plus de sécurité." 
  },
  { 
    question: "Quelles sont les garanties pour mon mobilier ?", 
    answer: "Chaque déménagement bénéficie d'une assurance contractuelle. Nous utilisons des fournitures professionnelles (couvertures lourdes, bullkraft, housses matelas) pour garantir l'intégrité de vos biens." 
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

export default function SeineSaintDenisPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/seine-saint-denis-skyline/1920/1080"
          alt="Vue urbaine de la Seine-Saint-Denis"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Seine-Saint-Denis (93)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Expert Déménagement Grand Paris
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200 text-shadow-sm">
                en Seine-Saint-Denis.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de référence pour le 93. De Saint-Denis à Montreuil, profitez d'une transition fluide avec nos équipes locales spécialisées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
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
                Une logistique agile pour <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">un département en mouvement</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                La Seine-Saint-Denis (93) est un territoire dynamique, mêlant quartiers historiques, parcs pavillonnaires et zones urbaines denses. Déménager dans ce département exige une agilité technique capable de s'adapter à chaque configuration, des rues piétonnes de Saint-Denis aux nouveaux éco-quartiers de Pantin.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons chaque spécificité du 93. Que vous emménagiez dans un appartement moderne ou que vous transfériez votre entreprise vers un pôle économique majeur, nous garantissons une prestation soignée et sécurisée.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <LayoutGrid className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Maillage Territorial,<br/> <span className="text-slate-500 font-normal text-sm">une parfaite maîtrise des accès urbains et des flux du 93.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/montreuil-team/800/600"
                  alt="Équipe de déménagement en action en Seine-Saint-Denis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES GRID --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Interventions dans toute la Seine-Saint-Denis
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Nos équipes couvrent l'intégralité du département 93.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {SSD_CITIES.map((city) => (
              <div key={city} className="bg-white border border-slate-200 rounded-2xl p-4 text-center text-sm font-bold text-slate-700 shadow-sm hover:border-[#00ad9f] hover:text-[#00ad9f] transition-all cursor-default">
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-93" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
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
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2rem] opacity-10 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/93-packing/800/600"
                  alt="Protection du mobilier pour un déménagement dans le 93"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des solutions pour <br/> <span className="text-[#00ad9f]">chaque projet résidentiel.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Grands Ensembles & Immeubles</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Expertise des étages élevés sans ascenseur large et utilisation optimisée des monte-meubles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Pavillons & Zones Résidentielles</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les maisons avec jardin et protection scrupuleuse de vos biens volumineux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-white border border-slate-100 rounded-xl text-[#00ad9f] shadow-sm shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Professionnels</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Services B2B dédiés : planification optimisée et protection rigoureuse du matériel informatique.</p>
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
      <section id="faq-93" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie en Seine-Saint-Denis.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-2 data-[state=open]:border-[#00ad9f]/40 data-[state=open]:shadow-md transition-all duration-200"
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
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ vers le 93 ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique ternir votre projet. Contactez nos experts pour une visite gratuite et obtenez un devis complet sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/dashboard/quote">
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