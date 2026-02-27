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
  Wine, 
  Building2, 
  ArrowRight,
  ChevronRight,
  Route,
  PackageCheck,
  Scale,
  Map as MapIcon
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Paris → Bordeaux (33) | Devis Gratuit & Groupage",
  description: "Déménageur expert sur l'axe Paris-Bordeaux. Liaisons hebdomadaires, solutions de groupage et transport de caves à vin. Devis gratuit en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-idf-bordeaux",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dupuis", text: "Le déménagement de nos vies de Paris à Bordeaux a été une réussite totale. L'équipe a été d'un professionnalisme exemplaire du début à la fin malgré les 500km. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dupuis33` },
  { id: "fallback-2", name: "Antoine G.", text: "Service impeccable pour mon déménagement longue distance. La formule groupage était parfaite pour mon budget de jeune actif et tout est arrivé intact. Je recommande.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=AntoineG33` },
  { id: "fallback-3", name: "Cave & Châteaux", text: "Le transfert de notre stock de grands crus a été géré avec un soin particulier. Une équipe qui comprend les contraintes du transport de biens fragiles. Des vrais pros.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=CaveChateaux33` },
];

const WHY_US_ITEMS = [
  {
    icon: Route,
    title: "Liaisons Hebdomadaires",
    description: "Nous réalisons des trajets réguliers vers la Gironde, garantissant une logistique optimisée, des dates flexibles et des délais fiables."
  },
  {
    icon: Truck,
    title: "Sécurité Longue Distance",
    description: "Arrimage hautement professionnel et camions capitonnés pour protéger vos biens les plus précieux sur les 600 km de trajet."
  },
  {
    icon: Scale,
    title: "Options de Groupage",
    description: "Économisez jusqu'à 40% sur votre budget global en partageant les frais de route avec d'autres clients pour vos petits volumes."
  },
  {
    icon: Wine,
    title: "Spécialiste Grands Crus",
    description: "Emballages spécifiques et manutention extrêmement délicate pour vos précieuses caves à vin et objets d'art fragiles."
  }
];

const FAQS = [
  { 
    question: "Quelle est la durée d'un déménagement Paris-Bordeaux ?", 
    answer: "Il faut généralement prévoir 48 heures. Le premier jour est dédié au chargement minutieux en Île-de-France et au début du trajet (sécurisation du camion). Le second jour est consacré à la fin du transport, au déchargement et à l'installation complète dans votre nouveau domicile bordelais." 
  },
  { 
    question: "Comment fonctionne le groupage vers Bordeaux ?", 
    answer: "Le groupage consiste à mutualiser un grand camion (semi-remorque ou porteur lourd) pour plusieurs clients ayant de petits volumes. Cela permet de diviser les frais de péage, de carburant et de main-d'œuvre. Nous organisons ces tournées 2 à 3 fois par mois vers la Nouvelle-Aquitaine." 
  },
  { 
    question: "Comment obtenir un prix précis pour cette distance ?", 
    answer: "Le tarif dépend de trois facteurs clés : votre volume total (en m³), la complexité d'accès aux deux adresses (besoin de monte-meubles, distance de portage) et la formule de services choisie. Nous réalisons une visite technique (à domicile ou par vidéo) pour vous garantir un prix ferme et définitif, sans aucune surprise le jour J." 
  },
  { 
    question: "Gérez-vous le déménagement de caves à vin ?", 
    answer: "C'est l'une de nos expertises phares pour les transferts vers Bordeaux. Nous utilisons des cartons renforcés 'barrels' avec croisillons et des protections thermiques si nécessaire. Vos bouteilles sont manipulées avec un soin extrême et transportées selon vos exigences de conservation." 
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

export default function BordeauxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant un trajet longue distance vers Bordeaux"
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
            <Link href="/services" className="hover:text-white transition-colors">Déménagement National</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Paris - Bordeaux</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Route className="h-4 w-4" />
              Liaison Nationale IDF → Gironde
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Paris - Bordeaux.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Le spécialiste de la longue distance vers la Nouvelle-Aquitaine. Profitez d'une logistique optimisée, de groupages réguliers et d'un service premium pour votre installation en Gironde.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir mon devis national <ArrowRight className="ml-2 h-5 w-5" />
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
                De la Seine à la Garonne, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">une transition sans couture</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Quitter l'Île-de-France pour la métropole bordelaise est un projet de vie ambitieux qui nécessite une expertise logistique pointue. Les 600 kilomètres qui séparent ces deux pôles économiques imposent une rigueur absolue dans l'arrimage, la protection des biens et la planification du transport.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous avons fait de l'axe Paris-Bordeaux une véritable spécialité. Nous gérons aussi bien les accès très denses du centre-ville historique bordelais (rues pavées, appartements en étage) que les livraisons volumineuses dans les domaines viticoles ou les pavillons de l'agglomération (Mérignac, Pessac, Talence).
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <PackageCheck className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Logistique Longue Distance</h3>
                   <p className="text-slate-500 font-light">Protection renforcée pour les trajets autoroutiers et suivi rigoureux de votre mobilier.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-bordeaux.webp"
                  alt="Camion de déménagement longue distance en route vers Bordeaux"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-bordeaux" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre trajet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre connaissance millimétrée de l'axe Paris-Bordeaux et notre flotte adaptée sont vos meilleurs atouts.
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
                  alt="Déménageur protégeant un objet de valeur et une cave à vin"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une réponse à <br/> <span className="text-[#00ad9f]">chaque besoin national.</span>
              </h2>
              <ul className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Truck className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Camion Dédié ou Groupage</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Faites le choix entre l'exclusivité d'un véhicule dédié pour votre volume total, ou l'économie d'un voyage mutualisé (groupage) pour les volumes réduits.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Wine className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Expertise Grands Crus & Objets Fragiles</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Emballages renforcés (cartons barrels) et calages sur-mesure pour protéger vos bouteilles, beaux miroirs, œuvres d'art et mobilier de créateur.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Tout Confort ("Clé en main")</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Concentrez-vous sur votre nouvelle vie : nous prenons en charge l'intégralité de l'emballage, du transport et du déballage pour une installation immédiate.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                   <Link href="/formules-de-demenagement">Comparer toutes nos formules</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-bordeaux" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Nos réponses pour préparer au mieux votre départ vers le Sud-Ouest.</p>
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
                    Prêt pour votre nouvelle <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      vie à Bordeaux ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la distance compliquer votre projet d'expatriation en région. Contactez nos experts nationaux pour une étude personnalisée et recevez un devis gratuit et ferme sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Mon devis gratuit sous 24h <ArrowRight className="ml-2 h-5 w-5" />
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