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
  Home, 
  Users, 
  Building, 
  Truck,
  ArrowRight,
  ChevronRight,
  Map
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Villiers-le-Bel (95) | Expert Local & Devis Gratuit",
  description: "Déménageur expert à Villiers-le-Bel (95400). Des quartiers pavillonnaires aux grands ensembles, nous gérons votre déménagement de A à Z. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-villiers-le-bel-95400",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Fernandes", text: "Déménagement de notre pavillon à Villiers-le-Bel géré avec beaucoup de professionnalisme. L'équipe a été efficace et très soigneuse. Un grand merci !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Fernandes95` },
  { id: "fallback-2", name: "Sandra M.", text: "Très bonne expérience pour mon appartement. Le devis était clair et l'équipe super sympa et rapide. Je recommande leurs services.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SandraM95` },
  { id: "fallback-3", name: "M. Traoré", text: "Service impeccable. Ils ont trouvé une solution pour le stationnement et tout s'est déroulé sans accroc. Une entreprise sérieuse.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Traore95VLB` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Villiers-le-Bel",
    description: "Des quartiers pavillonnaires aux grands ensembles, nous connaissons les accès et les spécificités de la ville du 95."
  },
  {
    icon: Building,
    title: "Gestion des Immeubles",
    description: "Nos équipes sont expertes des déménagements en appartements et en étages, avec le déploiement de monte-meubles."
  },
  {
    icon: Truck,
    title: "Logistique & Ponctualité",
    description: "Nous maîtrisons le trafic local et les itinéraires pour assurer une ponctualité exemplaire le jour de votre déménagement."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, une démarche indispensable."
  }
];

const FAQS = [
  { question: "Comment se déroule un déménagement dans un grand immeuble à Villiers-le-Bel ?", answer: "C'est une situation que nous gérons très régulièrement. La clé est une bonne préparation : visite technique pour évaluer les accès, les ascenseurs, et si besoin, la mise en place d'un monte-meubles par la fenêtre ou le balcon." },
  { question: "Le stationnement est-il compliqué pour un déménagement à Villiers-le-Bel ?", answer: "Dans certains secteurs, cela peut être un enjeu. C'est pourquoi nous incluons la gestion des autorisations de stationnement dans nos prestations (pour nos formules Standard et Confort). Nous nous occupons des démarches pour vous garantir un emplacement de camion." },
  { question: "Quelles sont vos formules pour un petit budget ?", answer: "Nous proposons notre formule 'Économique'. Elle est idéale pour maîtriser votre budget : vous vous chargez d'emballer vos cartons, et nos professionnels assurent la manutention lourde, la protection du mobilier et le transport sécurisé." },
  { question: "Comment protégez-vous les parties communes de mon immeuble ?", answer: "Le respect des lieux est une priorité absolue. Nos équipes protègent systématiquement les zones de passage : ascenseurs (capitonnage), couloirs, cages d'escalier, pour ne laisser aucune trace et éviter tout conflit avec votre syndic." }
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

export default function VilliersLeBelPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/villiers-le-bel/1920/1080"
          alt="Vue urbaine et résidentielle de Villiers-le-Bel"
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
            <Link href="/demenagement-val-d-oise-95" className="hover:text-white transition-colors">Val-d'Oise (95)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Villiers-le-Bel</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Spécialiste Val-d'Oise
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Villiers-le-Bel.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution efficace, locale et professionnelle pour votre projet à Villiers-le-Bel (95400). Un accompagnement sur-mesure pour une transition sereine.
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
                Une connaissance <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">parfaite du terrain</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Villiers-le-Bel, c'est s'installer dans une ville aux multiples facettes. Son urbanisme varié, entre zones pavillonnaires calmes et grands ensembles résidentiels, demande une logistique adaptable que nous maîtrisons parfaitement.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                En tant que déménageur de proximité, nous ne laissons rien au hasard. Que vous habitiez le quartier des Puits-la-Marlière ou le centre historique, nous anticipons les difficultés de stationnement et d'accès pour vous garantir une journée de déménagement sans aucun stress.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Équipes Salariées,<br/> <span className="text-slate-500 font-normal text-sm">réactives et à votre écoute.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/villiers-le-bel-team/800/600"
                  alt="Équipe professionnelle en intervention à Villiers-le-Bel"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-villiers" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le Val-d'Oise
            </h2>
            <p className="text-lg text-slate-500">
              Notre proximité géographique est votre meilleure garantie pour un service ponctuel et maîtrisé.
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
                  src="https://picsum.photos/seed/villiers-le-bel-packing/800/600"
                  alt="Déménageur protégeant du mobilier"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des prestations pour <br/> <span className="text-[#00ad9f]">chaque situation.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Déménagement d'appartements</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Nous gérons les déménagements de maisons avec jardin, avec des équipes suffisamment nombreuses pour les grands volumes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules à la carte</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la prestation économique (où vous emballez) au service tout confort, nous nous adaptons à vos contraintes.</p>
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
      <section id="faq-villiers" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Nos réponses claires pour un projet réussi dans le 95.</p>
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
                    <span className="text-[#00ad9f]">départ de Villiers-le-Bel ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez nos spécialistes pour une analyse précise de votre volume et obtenez une estimation gratuite sans engagement.
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
