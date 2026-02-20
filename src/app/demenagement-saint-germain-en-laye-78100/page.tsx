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
  Castle,
  ArrowRight, 
  ChevronRight, 
  Map,
  TreePine,
  Sparkles,
  Home,
  History,
  MoveUp
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Saint-Germain-en-Laye (78) | Expert local & Devis Gratuit",
  description: "Déménageur de confiance à Saint-Germain-en-Laye (78100). Spécialiste centre historique, demeures de caractère et mobilier de standing. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-saint-germain-en-laye-78100",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Lambert", text: "Le déménagement de notre maison à Saint-Germain-en-Laye a été parfaitement exécuté. Une équipe professionnelle, soigneuse avec nos antiquités et très à l'écoute. Un service à la hauteur du prestige de la ville.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lambert78` },
  { id: "fallback-2", name: "Alice D.", text: "Service impeccable pour mon appartement dans le centre ancien. Ils ont géré les accès difficiles de la rue au Pain avec brio grâce à leur petit porteur. Je recommande vivement leurs services.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=AliceD78` },
  { id: "fallback-3", name: "M. Fournier", text: "Efficacité et discrétion sont les maîtres mots. Mon transfert vers Marly-le-Roi s'est déroulé sans le moindre stress. Une entreprise de confiance que je n'hésiterai pas à recontacter.", rating: 5, createTime: "il y a 11 mois", avatarUrl: `https://i.pravatar.cc/48?u=Fournier78` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de la Ville Royale",
    description: "Du centre historique piétonnier aux quartiers résidentiels de la lisière de forêt, nous maîtrisons chaque accès du 78100."
  },
  {
    icon: Sparkles,
    title: "Soin Haut de Gamme",
    description: "Protection spécifique pour le mobilier d'époque, les œuvres d'art et les intérieurs fragiles (parquets, moulures)."
  },
  {
    icon: MoveUp,
    title: "Maîtrise des Accès",
    description: "Déploiement de monte-meubles sur cours pavées et véhicules de petit gabarit pour les rues étroites du vieux centre."
  },
  {
    icon: ShieldCheck,
    title: "Gestion Administrative",
    description: "Nous gérons intégralement vos demandes d'arrêté municipal de stationnement auprès de la mairie de Saint-Germain."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous le stationnement dans le centre historique ?", 
    answer: "Saint-Germain-en-Laye est une ville très réglementée. Nous déposons les demandes d'autorisation 15 jours en amont pour privatiser les places nécessaires devant votre porte, garantissant ainsi une opération fluide." 
  },
  { 
    question: "Déménagez-vous les pianos et objets lourds en étage ?", 
    answer: "Oui, c'est l'un de nos savoir-faire. Nos équipes sont formées au portage technique et nous utilisons des sangles spécifiques ou un monte-meubles extérieur pour sécuriser le transfert." 
  },
  { 
    question: "Intervenez-vous dans les communes voisines comme Le Vésinet ?", 
    answer: "Absolument. Notre expertise rayonne sur toute la boucle de la Seine : Le Vésinet, Marly-le-Roi, Le Pecq et Maisons-Laffitte bénéficient du même standard d'excellence." 
  },
  { 
    question: "Quelles protections utilisez-vous pour les parties communes ?", 
    answer: "Pour les immeubles de standing, nous protégeons systématiquement les sols avec des tapis de passage, les cabines d'ascenseur et les angles de murs." 
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

export default function SaintGermainPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/stgermain-chateau/1920/1080"
          alt="Vue prestigieuse du Château de Saint-Germain-en-Laye"
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
            <Link href="/zones" className="hover:text-white transition-colors">Yvelines (78)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Saint-Germain-en-Laye</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Castle className="h-4 w-4" />
              Service Déménagement Haute Protection
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Saint-Germain.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique au service du prestige de Saint-Germain-en-Laye (78100). Une maîtrise parfaite des demeures de caractère et du centre historique.
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
                Une logistique d'orfèvre <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour la cité royale</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Déménager à Saint-Germain-en-Laye exige bien plus qu'une simple manutention. C'est un engagement de soin pour un patrimoine architectural unique. Entre les rues pavées du quartier du château et les villas de la lisière de forêt, chaque projet est une opération de précision.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez <strong>Déménagement du Vexin</strong>, nous avons développé un savoir-faire spécifique pour cette clientèle exigeante. Nous garantissons une transition fluide, préservant l'intégrité de vos biens les plus précieux.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <History className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Expertise Biens de Valeur,<br/> <span className="text-slate-500 font-normal text-sm">protection d'œuvres d'art et mobilier de maître.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/stgermain-move/800/600"
                  alt="Déménagement d'exception à Saint-Germain-en-Laye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-saint-germain" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le standard d'excellence du 78
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre maîtrise de Saint-Germain-en-Laye est votre meilleure garantie de sérénité.
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
                  src="https://picsum.photos/seed/stgermain-packing/800/600"
                  alt="Déménageur protégeant du mobilier de valeur à Saint-Germain"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Des services à la hauteur <br/> <span className="text-[#00ad9f]">de vos exigences.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection intégrale des parties communes et utilisation de monte-meubles pour les accès en étage dans le centre historique.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Hôtels Particuliers & Villas</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique pour grands volumes et emballage premium de vos pièces historiques sous caisses sur-mesure.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formule "Clé en main"</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Emballage complet de vos effets fragiles, déballage et remise en place pour une sérénité absolue.</p>
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
      <section id="faq-saint-germain" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-light">Préparer votre installation réussie à Saint-Germain-en-Laye.</p>
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
                    On prépare votre départ <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">de Saint-Germain-en-Laye ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne confiez pas votre patrimoine au hasard. Contactez nos experts pour une étude technique confidentielle et recevez un devis détaillé sous 24h.
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