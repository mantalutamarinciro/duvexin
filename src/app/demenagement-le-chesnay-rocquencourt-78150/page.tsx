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
  Hospital,
  ArrowRight, 
  ChevronRight, 
  Map,
  ShoppingBag,
  Home,
  Briefcase
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Le Chesnay-Rocquencourt (78) | Expert Local & Devis Gratuit",
  description: "Déménageur de confiance au Chesnay-Rocquencourt (78150). Spécialiste Parly 2, résidences de standing et transferts médicaux. Devis gratuit sous 24h.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-le-chesnay-rocquencourt-78150",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Richard", text: "Déménagement très bien géré au Chesnay. L'équipe a été très professionnelle et soigneuse, notamment pour l'accès à notre résidence à Parly 2. Nous sommes ravis de la prestation.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Richard78` },
  { id: "fallback-2", name: "Dr. Aline L.", text: "Service impeccable pour mon installation près de l'hôpital Mignot. Ponctualité, efficacité et un grand soin apporté au matériel fragile. Je recommande vivement.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=AlineL78` },
  { id: "fallback-3", name: "M. Petit", text: "Une équipe au top pour mon déménagement à Rocquencourt. Devis clair, pas de mauvaise surprise et un portage impeccable dans un escalier étroit. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=PetitLCR` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise de la Commune",
    description: "Des résidences historiques de Parly 2 aux nouveaux quartiers de Rocquencourt, nous maîtrisons chaque accès du 78150."
  },
  {
    icon: ShoppingBag,
    title: "Secteur Parly 2",
    description: "Habitués aux contraintes des grandes copropriétés : gestion des parkings souterrains et coordination avec les syndics."
  },
  {
    icon: Hospital,
    title: "Proximité Hôpital Mignot",
    description: "Logistique adaptée pour les professionnels de santé et les transferts de cabinets médicaux à proximité du centre hospitalier."
  },
  {
    icon: ShieldCheck,
    title: "Sérénité Administrative",
    description: "Gestion complète des demandes d'autorisation de stationnement auprès de la mairie du Chesnay-Rocquencourt."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous un déménagement à Parly 2 ?", 
    answer: "Parly 2 est une résidence que nous pratiquons chaque semaine. Nous anticipons les contraintes de hauteur des parkings et de distance de portage. Si nécessaire, nous utilisons des véhicules légers ou des monte-meubles adaptés pour respecter les jardins et les accès piétons." 
  },
  { 
    question: "Intervenez-vous pour des transferts de bureaux ou cabinets ?", 
    answer: "Oui, nous accompagnons les entreprises et les professions libérales (médecins, avocats) du Chesnay. Nous proposons des interventions discrètes et rapides pour minimiser l'impact sur votre activité." 
  },
  { 
    question: "Quel est le délai pour obtenir un devis ?", 
    answer: "Nous sommes très réactifs dans les Yvelines. Après une visite technique (sur place ou en visio), vous recevez votre devis détaillé sous 24h. Nous conseillons de réserver 4 à 6 semaines à l'avance pour les périodes de forte affluence." 
  },
  { 
    question: "Comment protégez-vous mon mobilier de valeur ?", 
    answer: "Pour les résidences de standing, nous utilisons un matériel de protection premium : couvertures lourdes, housses matelassées pour canapés et literie, et protection spécifique pour les parquets et encadrements de porte." 
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

export default function LeChesnayRocquencourtPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/lechesnay/1920/1080"
          alt="Quartier résidentiel du Chesnay-Rocquencourt"
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
            <span className="text-white">Le Chesnay-Rocquencourt</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Building2 className="h-4 w-4" />
              Spécialiste Résidences de Standing
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                au Chesnay-Rocquencourt.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour vos projets au Chesnay et à Rocquencourt (78150). Une maîtrise parfaite des résidences Parly 2 et du pavillonnaire de standing.
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
                Une logistique experte <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour un cadre de vie privilégié</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Le Chesnay-Rocquencourt est une ville d'exception aux portes de Versailles, mêlant urbanisme moderne et zones pavillonnaires verdoyantes. Déménager dans cet environnement exige une agilité technique et un respect absolu des règles de copropriété.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Chez Marne Transdem, nous maîtrisons chaque spécificité locale. Que vous emménagiez dans une résidence à Parly 2 ou que vous transfériez votre activité professionnelle près de l'Hôpital Mignot, nous planifions chaque détail pour garantir une transition sereine.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
                    <Hospital className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Spécialiste Yvelines,<br/> <span className="text-slate-500 font-normal text-sm">maîtrise des accès résidentiels et médicaux.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 hover:rotate-6" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/lechesnay-team/800/600"
                  alt="Équipe de déménagement professionnelle en intervention au Chesnay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section id="why-us-le-chesnay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour le 78
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre connaissance du Chesnay-Rocquencourt est votre meilleure garantie de ponctualité et de soin.
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
                  src="https://picsum.photos/seed/lechesnay-packing/800/600"
                  alt="Déménageur protégeant du mobilier de standing"
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
                    <h4 className="text-lg font-bold text-slate-900">Appartements & Résidences Parly 2</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Protection totale des parties communes et logistique adaptée aux parkings souterrains et distances de portage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Home className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Maisons et Pavillons de Standing</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique soignée pour les demeures des Yvelines avec emballage scrupuleux de vos objets d'art et mobilier précieux.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><Briefcase className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transferts Libéraux & Médicaux</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Services dédiés aux professionnels de santé et entreprises : planification optimisée et discrétion assurée.</p>
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
      <section id="faq-le-chesnay" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500">Nos réponses pour préparer votre installation réussie au Chesnay-Rocquencourt.</p>
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
                    <span className="text-[#00ad9f]">départ du Chesnay ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Ne laissez pas la logistique urbaine ou les contraintes de copropriété vous stresser. Contactez nos équipes pour une visite technique et obtenez un devis gratuit sous 24h.
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