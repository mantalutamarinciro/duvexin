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
  Building, 
  Waves,
  ArrowRight,
  ChevronRight,
  Map,
  Home,
  Briefcase
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Champigny-sur-Marne (94) | Bords de Marne | Devis Gratuit",
  description: "Déménageur expert à Champigny-sur-Marne (94500). Du quartier du Plant aux bords de Marne, nous gérons votre déménagement de A à Z. Devis gratuit en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-champigny-sur-marne-94500",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lecomte", text: "Déménagement de our maison à Champigny, au bord de la Marne. L'équipe a été super, très pro et a pris grand soin de nos affaires. Un service au top.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lecomte94` },
  { id: "fallback-2", name: "Patrick G.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle et efficace. Le déménagement s'est fait sans aucun stress, je recommande.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=PatrickG94` },
  { id: "fallback-3", name: "Société BâtiPro", text: "Le transfert de nos bureaux a été mené avec rigueur et efficacité. Une équipe professionnelle sur qui l'on peut compter pour un déménagement sans accroc.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=BatiPro94` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de Champigny",
    description: "Du Plant au Maroc, en passant par le Tremblay, nous maîtrisons chaque quartier et ses spécificités d'accès."
  },
  {
    icon: Waves,
    title: "Spécialiste Bords de Marne",
    description: "Nous gérons les accès résidentiels le long de la Marne avec des véhicules adaptés et une protection totale des extérieurs."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Utilisation de monte-meubles pour les appartements en étage et gestion des autorisations de voirie pour les rues denses."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie de Champigny pour sécuriser l'emplacement du camion."
  }
];

const FAQS = [
  { question: "Comment se déroule un déménagement en pavillon sur les bords de Marne ?", answer: "Nous effectuons une visite technique pour évaluer l'accès des camions et la protection nécessaire pour vos parquets ou jardins. Nos équipes sont formées à la manutention de mobilier volumineux en zone résidentielle calme." },
  { question: "Intervenez-vous dans les grands ensembles de Champigny ?", answer: "Oui, nous avons une grande expérience des résidences denses. La clé est l'anticipation : réservation des ascenseurs si possible et utilisation d'un monte-meubles par la fenêtre pour les meubles encombrants afin de gagner du temps et de sécuriser les parties communes." },
  { question: "Déménagez-vous aussi les entreprises campinoises ?", answer: "Absolument. Nous accompagnons les professionnels de Champigny pour leurs transferts de bureaux, d'ateliers ou de stocks. Nous planifions l'opération pour minimiser l'impact sur votre production." },
  { question: "Quelles sont les formules pour les petits budgets ?", answer: "La formule 'Économique' est idéale pour maîtriser vos coûts. Vous emballez vos cartons, et nos déménageurs pro s'occupent de protéger le mobilier, du chargement, du transport et du déchargement sécurisé." }
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

export default function ChampignySurMarnePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/champigny-marne/1920/1080"
          alt="Vue sur les bords de Marne à Champigny"
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
            <Link href="/demenagement-val-de-marne-94" className="hover:text-white transition-colors">Val-de-Marne (94)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Champigny-sur-Marne</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Expert Local 94
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Champigny.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique efficace pour les particuliers et les entreprises à Champigny-sur-Marne (94500). Savoir-faire local et protection absolue de vos biens.
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
                Le spécialiste de la <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">boucle de la Marne</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Champigny-sur-Marne est une ville aux multiples facettes : de son centre-ville historique à ses quartiers pavillonnaires en bord de rivière. Cette diversité demande une approche logistique flexible et une excellente connaissance des accès locaux.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons ces spécificités. Que vous quittiez un appartement moderne ou un pavillon de charme sur les bords de Marne, nous planifions chaque détail logistique pour une transition sans stress.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Waves className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Bords de Marne,<br/> <span className="text-slate-500 font-normal text-sm">protection et discrétion assurées.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/champigny-team/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Champigny"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-champigny" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 94
            </h2>
            <p className="text-lg text-slate-500">
              Notre connaissance du terrain campinois est votre meilleure garantie de sérénité.
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
                  src="https://picsum.photos/seed/champigny-packing/800/600"
                  alt="Déménageur emballant avec soin des cartons"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et utilisation de monte-meubles pour les étages élevés en zone dense.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons de Bords de Marne</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique adaptée pour les pavillons : emballage d'objets précieux et protection soignée des sols et mobiliers fragiles.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts de Bureaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Service dédié aux entreprises de Champigny : transfert d'archives, informatique et mobilier avec planification optimisée.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-semibold border-slate-300 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5">
                   <Link href="/services">Découvrir nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-champigny" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Nos réponses pour préparer votre installation réussie dans le 94.</p>
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
               
               {/* Deco de fond fluide avec pointer-events-none */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    On organise votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">départ de Champigny ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez nos équipes pour une visite technique et obtenez un devis gratuit, transparent et sans engagement.
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
