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
  Landmark,
  ArrowRight, 
  ChevronRight, 
  Map,
  History,
  Home,
  Briefcase,
  Castle,
  ShieldAlert
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Verneuil d'Avre et d'Iton (27) | Expert Local | Devis 24h",
  description: "Déménageur de confiance à Verneuil d'Avre et d'Iton (27130). Spécialiste cité médiévale, maisons à pans de bois et longères. Devis gratuit sous 24h et visite technique.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-verneuil-d-avre-et-d-iton-27130",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Marchand", text: "Notre déménagement dans le centre historique de Verneuil a été une réussite totale. L'équipe a été très professionnelle et a su gérer les accès complexes d'une rue ancienne avec un monte-meubles adapté. Un service d'orfèvre.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Marchand27` },
  { id: "fallback-2", name: "Julien B.", text: "Très bonne expérience pour ma maison de campagne. Devis clair, équipe ponctuelle et matériel de protection impeccable pour mes meubles anciens. Un déménagement sans stress aux portes du Perche.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=JulienB27` },
  { id: "fallback-3", name: "Sophie M.", text: "Efficacité, soin et courtoisie. Ils ont géré mon installation à Verneuil avec une grande maîtrise du stationnement en centre-ville. Je recommande vivement Déménagement du Vexin.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieM27V` },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Expertise du 27130",
    description: "Du centre historique aux hameaux du Pays d'Avre, nous maîtrisons chaque accès et contrainte logistique de Verneuil."
  },
  {
    icon: Landmark,
    title: "Soin du Patrimoine",
    description: "Protection spécifique pour les maisons à colombages et manipulation experte de votre mobilier d'époque et de vos objets précieux."
  },
  {
    icon: Truck,
    title: "Logistique Adaptée",
    description: "Flotte de véhicules variée (petits porteurs agiles) pour naviguer sans encombre dans les rues médiévales et chemins ruraux étroits."
  },
  {
    icon: ShieldCheck,
    title: "Proximité Évreux",
    description: "Notre base régionale dans l'Eure garantit une réactivité maximale pour vos visites techniques et une ponctualité totale le jour J."
  }
];

const FAQS = [
  { 
    question: "Comment gérez-vous les accès difficiles dans le centre ancien ?", 
    answer: "Verneuil possède des rues médiévales parfois très étroites. Nous réalisons systématiquement une étude d'accès en amont pour choisir le véhicule idéal (souvent un 20m³ très agile). Nous gérons également l'arrêté de stationnement auprès de la mairie pour privatiser l'espace nécessaire." 
  },
  { 
    question: "Déménagez-vous les longères et maisons de campagne isolées ?", 
    answer: "C'est notre quotidien dans l'Eure. Nous sommes habitués aux chemins ruraux, aux accès en terre et aux vastes cours de ferme. Nous prévoyons les protections adaptées pour vos extérieurs et utilisons des chariots tout-terrain si le portage s'avère long." 
  },
  { 
    question: "Proposez-vous des formules pour les petits budgets ?", 
    answer: "Oui, notre formule 'Économique' est parfaite pour maîtriser vos coûts : vous emballez vos cartons vous-mêmes, et nos déménageurs professionnels s'occupent de la manutention lourde, de la protection du mobilier (couvertures) et du transport sécurisé." 
  },
  { 
    question: "Quel est le délai pour obtenir un devis définitif ?", 
    answer: "Nous sommes très réactifs dans le sud de l'Eure. Après notre premier contact téléphonique ou une visite technique (réalisable en visio si vous préférez), vous recevez votre devis détaillé, ferme et définitif sous 24 heures ouvrées." 
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

export default function VerneuilPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur professionnel préparant un transfert"
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
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Eure (27)</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Verneuil d'Avre et d'Iton</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Castle className="h-4 w-4" />
              Expert Déménagement Cité Médiévale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménagement <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                à Verneuil.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              L'excellence logistique pour les demeures de charme, pavillons et résidences de Verneuil d'Avre et d'Iton (27130). Un savoir-faire local, un soin d'orfèvre.
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
                Une logistique experte <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">pour une ville millénaire</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Verneuil d'Avre et d'Iton est l'un des "Plus Beaux Détours de France", fier de son architecture médiévale et de ses églises monumentales. Déménager dans ce cadre exceptionnel demande une agilité technique capable de s'adapter aux maisons à colombages du centre historique comme aux vastes longères normandes des hameaux voisins.
                </p>
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous maîtrisons chaque spécificité du Pays d'Avre. Que vous emménagiez dans une rue pavée étroite ou dans un quartier résidentiel récent, nous garantissons une transition fluide, sécurisée et profondément respectueuse de votre patrimoine.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <History className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Spécialiste Patrimoine</h3>
                   <p className="text-slate-500 font-light">Maîtrise des accès historiques et manipulation experte de votre mobilier ancien ou de valeur.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-verneuil-d-avre-et-d-iton.webp"
                  alt="Équipe de déménagement professionnelle en intervention à Verneuil"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-verneuil" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Le bon choix pour l'Eure
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Notre ancrage régional est votre meilleure garantie de ponctualité, de sécurité et de soin.
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
                  alt="Déménageur protégeant du mobilier de valeur avec un soin d'orfèvre"
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
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Home className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Maisons de Caractère & Longères</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Logistique calibrée pour les grands volumes avec une protection maximale des parquets, escaliers et mobilier ancien.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><Building2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Appartements & Centre-Ville</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Intervention soignée dans le centre ancien avec gestion des accès complexes et monte-meubles extérieur si nécessaire.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="p-4 bg-slate-50 border border-slate-100 shadow-sm rounded-2xl text-[#00ad9f] shrink-0"><CheckCircle2 className="h-7 w-7"/></div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Formules Modulables</h4>
                    <p className="text-slate-500 font-light leading-relaxed">De l'offre Économique (portage et transport) au service "Clé en main" (emballage total), nous nous adaptons à vos besoins.</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4">
                <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
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
      <section id="faq-verneuil" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie à Verneuil.</p>
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
                      départ de Verneuil ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas la logistique ternir votre projet dans l'Eure. Contactez nos experts pour une visite technique gratuite et obtenez un devis transparent sous 24h.
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