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
  Ship,
  ArrowRight,
  ChevronRight,
  Map,
  Anchor
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Asnières-sur-Seine (92) | Expert Local & Devis Gratuit",
  description: "Déménageur de confiance à Asnières (92600). Spécialiste des quais de Seine et du centre-ville. Logistique adaptée et devis gratuit sous 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-asnieres-sur-seine-92600",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Sophie et Thomas", text: "Notre déménagement à Asnières s'est déroulé à merveille. L'équipe a géré les accès près des quais avec une grande expertise. Très professionnels et sympathiques.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieT92` },
  { id: "fallback-2", name: "Entreprise Connect", text: "Transfert de nos bureaux à Asnières sans aucune fausse note. Planification parfaite, exécution rapide. Une équipe sur qui on peut compter.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=Connect92` },
  { id: "fallback-3", name: "David L.", text: "Excellent service pour mon appartement. Devis clair et respecté. Je recommande vivement pour tout projet à Asnières-sur-Seine.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=DavidL92` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise d'Asnières",
    description: "Du centre-ville historique aux nouveaux quartiers de Seine-Ouest, nous maîtrisons chaque accès et réglementation."
  },
  {
    icon: Ship,
    title: "Gestion des Quais",
    description: "Habitués aux contraintes des bords de Seine, nous adaptons notre logistique aux flux de circulation spécifiques."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Monte-meubles et véhicules de tailles variées pour répondre aux défis des immeubles sans ascenseur du 92."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Totale",
    description: "Gestion complète des autorisations de stationnement auprès de la mairie d'Asnières pour un jour J sans stress."
  }
];

const FAQS = [
  { question: "Comment se passe un déménagement dans une rue étroite à Asnières ?", answer: "Nous réalisons une étude d'accès précise. Nous choisissons le véhicule le plus adapté (camionnette ou porteur) pour ne pas bloquer la circulation. La réservation de stationnement est gérée par nos soins pour garantir notre emplacement." },
  { question: "Déménager près des quais de Seine pose-t-il un problème ?", answer: "Non, c'est un secteur que nous pratiquons quotidiennement. Nous planifions les interventions en dehors des heures de pointe et sécurisons la zone de chargement pour assurer une protection maximale de vos biens." },
  { question: "Proposez-vous des formules pour les petits volumes ?", answer: "Absolument. Nous avons des formules 'Économiques' idéales pour les studios et T1, très fréquents à Asnières. C'est la solution parfaite pour les jeunes actifs souhaitant un service pro au meilleur prix." },
  { question: "Comment sont protégés mes meubles ?", answer: "Chaque meuble est emballé sous couvertures épaisses. Pour le fragile (canapés, matelas), nous utilisons des housses plastifiées. La vaisselle et les objets précieux bénéficient de cartons renforcés et de calage spécifique." }
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

export default function AsnieresPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/asnieres-quais/1920/1080"
          alt="Vue sur les quais de Seine à Asnières"
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
            <Link href="/demenagement-hauts-de-seine-92" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Asnières-sur-Seine</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Anchor className="h-4 w-4" />
              Expert Local 92
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Asnières-sur-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de confiance pour les résidents et entreprises d'Asnières (92600). Maîtrise des bords de Seine et du centre-ville.
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
                Entre élégance résidentielle <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et bords de Seine</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Asnières-sur-Seine est une ville dynamique qui allie charme historique et modernité urbaine. Qu'il s'agisse de déménager une demeure bourgeoise près de la mairie ou un appartement contemporain sur les quais, chaque projet demande une rigueur logistique unique.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons les défis d'Asnières. Nous adaptons la taille de nos camions aux rues commerçantes et gérons les autorisations de voirie pour assurer une transition fluide, que vous restiez dans le 92 ou partiez à l'autre bout de la France.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <Ship className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Quais,<br/> <span className="text-slate-500 font-normal text-sm">gestion des accès fluviaux et urbains.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/asnieres-move-pro/800/600"
                  alt="Équipe de déménagement professionnelle en intervention à Asnières"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-asnieres" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 92
            </h2>
            <p className="text-lg text-slate-500">
              Une connaissance millimétrée du terrain pour un service ponctuel et réactif.
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
                  src="https://picsum.photos/seed/asnieres-packing-secure/800/600"
                  alt="Déménageur protégeant du mobilier avec des housses spécialisées"
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
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Building className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Copropriétés</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes (ascenseurs, sols) et utilisation de monte-meubles pour les étages élevés.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Users className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Bureaux & Tertiaire</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Transfert d'équipements informatiques et mobilier de bureau avec une planification optimisée pour votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Formules Modulables</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">De la formule \"Éco\" (manutention et transport) au service \"Confort\" (emballage complet et réinstallation).</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-asnieres" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie à Asnières.</p>
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
                    On prépare votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">arrivée à Asnières ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique au hasard. Contactez nos équipes pour une visite technique et recevez un devis gratuit, transparent et sans engagement.
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
