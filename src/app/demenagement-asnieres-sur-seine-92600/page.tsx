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
  { id: "fallback-2", name: "Entreprise Connect", text: "Transfert de nos bureaux à Asnières sans aucune fausse note. Planification parfaite, exécution rapide. Une équipe sur qui on peut compter les yeux fermés.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=Connect92` },
  { id: "fallback-3", name: "David L.", text: "Excellent service pour mon appartement en centre-ville. Devis clair et respecté. Le monte-meubles a été très utile. Je recommande vivement.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=DavidL92` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise d'Asnières",
    description: "Du centre-ville historique aux nouveaux éco-quartiers de Seine-Ouest, nous maîtrisons chaque accès et réglementation."
  },
  {
    icon: Ship,
    title: "Gestion des Quais",
    description: "Habitués aux contraintes des bords de Seine, nous adaptons notre logistique urbaine aux flux de circulation spécifiques."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Monte-meubles électriques et véhicules de tailles variées pour répondre aux défis des immeubles sans ascenseur du 92."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Totale",
    description: "Gestion complète des autorisations de stationnement et arrêtés de voirie auprès de la mairie d'Asnières."
  }
];

const FAQS = [
  { question: "Comment se passe un déménagement dans une rue étroite à Asnières ?", answer: "Nous réalisons une étude d'accès précise en amont. Nous choisissons le véhicule le plus adapté (camionnette ou petit porteur) pour ne pas bloquer la circulation. La réservation de stationnement est gérée par nos soins pour garantir notre emplacement." },
  { question: "Déménager près des quais de Seine pose-t-il un problème ?", answer: "Non, c'est un secteur que nous pratiquons quotidiennement. Nous planifions les interventions en dehors des heures de pointe et sécurisons la zone de chargement pour assurer une protection maximale de vos biens et de vos voisins." },
  { question: "Proposez-vous des formules pour les petits volumes ?", answer: "Absolument. Nous avons des formules 'Économiques' idéales pour les studios et T2, très fréquents à Asnières. C'est la solution parfaite pour les jeunes actifs souhaitant un service professionnel au meilleur prix." },
  { question: "Comment sont protégés mes meubles ?", answer: "Chaque meuble est emballé sous couvertures de déménagement épaisses. Pour le fragile (canapés, matelas), nous utilisons des housses spécifiques. La vaisselle et les objets précieux bénéficient de cartons renforcés et de calage (bullkraft)." }
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
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel en action"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/demenagement-hauts-de-seine-92" className="hover:text-white transition-colors">Hauts-de-Seine (92)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Asnières-sur-Seine</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Anchor className="h-4 w-4" />
              Expert Local 92600
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Asnières-sur-Seine.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              La solution logistique de confiance pour les résidents et entreprises d'Asnières. Maîtrise totale des accès en centre-ville et sur les quais de Seine.
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
                Entre élégance résidentielle <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et bords de Seine</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Asnières-sur-Seine est une ville dynamique qui allie le charme de son cœur historique et la modernité de ses nouveaux quartiers tertiaires. Qu'il s'agisse de déménager une demeure près de la mairie ou un appartement contemporain sur les quais, chaque projet demande une rigueur logistique absolue.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons les défis d'Asnières. Nous adaptons la taille de nos camions aux rues parfois étroites et gérons les autorisations de voirie complexes pour assurer une transition fluide, que vous restiez dans le 92 ou partiez vers la province.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <Ship className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste Quais & Centre</h3>
                   <p className="text-slate-500 font-light">Une gestion experte des accès fluviaux et du trafic urbain dense.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-asnieres-sur-seine.webp"
                  alt="Équipe de déménagement professionnelle en intervention à Asnières"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-asnieres" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 92
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Une connaissance millimétrée du terrain pour un service ponctuel, discret et hautement réactif.
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

      {/* --- SERVICES RÉSUMÉ --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="order-2 lg:order-1 relative group">
              <div className="absolute inset-0 bg-[#00ad9f] transform -translate-x-4 translate-y-4 rounded-[2.5rem] opacity-10 -z-10 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur emballant avec soin de la vaisselle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque profil.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Copropriétés</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Protection totale des parties communes (ascenseurs, halls) et utilisation de monte-meubles pour les étages élevés.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Users className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Bureaux & Tertiaire</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Transfert d'équipements informatiques et mobilier de bureau avec une planification optimisée pour garantir la continuité de votre activité.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Modulables</h4>
                    <p className="text-slate-500 font-light leading-relaxed">De la formule "Économique" (manutention et transport) au service "Prestige" (emballage complet et réinstallation à l'arrivée).</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Voir le détail des formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-asnieres" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Nos réponses pour préparer votre installation réussie à Asnières.</p>
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
                    On prépare votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      arrivée à Asnières ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique au hasard. Contactez nos équipes locales pour une visite technique et recevez un devis gratuit et transparent.
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