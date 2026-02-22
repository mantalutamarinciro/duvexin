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
  Star, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  TreePine, 
  Castle
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Yvelines (78) | Expert Local & Devis Gratuit",
  description: "Votre déménageur de confiance dans les Yvelines. De Versailles à Rambouillet, nous gérons votre déménagement avec des équipes locales 100% salariées.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-yvelines-78",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Famille Dubois", text: "Notre déménagement de Paris à Versailles a été une réussite totale grâce à l'équipe. Ponctuels, soigneux et très sympathiques. On sent l'expertise du secteur.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois` },
  { id: "fallback-2", name: "M. Martin", text: "Très professionnels pour mon déménagement à Saint-Germain-en-Laye. Ils ont parfaitement géré les accès un peu compliqués au 3ème sans ascenseur. Je recommande.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Martin` },
  { id: "fallback-3", name: "Sophie L.", text: "Une équipe au top ! Efficaces et à l'écoute pour notre installation à Rambouillet. Tout est arrivé en parfait état. Merci !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieL` },
];

const YVELINES_CITIES = [
  { name: "Versailles", link: "/demenagement-versailles-78000" },
  { name: "Saint-Germain-en-Laye", link: "/demenagement-saint-germain-en-laye-78100" },
  { name: "Rambouillet", link: "/demenagement-rambouillet-78120" },
  { name: "Poissy", link: "/demenagement-poissy-78300" },
  { name: "Sartrouville", link: "/demenagement-sartrouville-78500" },
  { name: "Mantes-la-Jolie", link: "/demenagement-mantes-la-jolie-78200" },
  { name: "Conflans-Ste-Honorine", link: "/demenagement-conflans-sainte-honorine-78700" },
  { name: "Plaisir", link: "/demenagement-plaisir-78370" },
  { name: "Le Chesnay-Rocquencourt", link: "/demenagement-le-chesnay-rocquencourt-78150" },
  { name: "Vélizy-Villacoublay", link: "/demenagement-velizy-villacoublay-78140" },
  { name: "Montigny-le-Bretonneux", link: "/demenagement-montigny-le-bretonneux-78180" },
  { name: "Les Mureaux", link: "/demenagement-les-mureaux-78130" }
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Connaissance du 78",
    description: "De la densité de Versailles aux routes forestières de Rambouillet, nous maîtrisons les spécificités de chaque commune."
  },
  {
    icon: Users,
    title: "Équipes 100% Salariées",
    description: "Pas d'intérimaires. Nos déménageurs sont formés en interne, habitués à travailler ensemble pour une efficacité redoutable."
  },
  {
    icon: ShieldCheck,
    title: "Sécurité Maximale",
    description: "Matériel de protection premium (housses capitonnées, bullkraft) et camions équipés pour préserver vos biens les plus précieux."
  },
  {
    icon: Star,
    title: "Service VIP",
    description: "Nous gérons les autorisations de stationnement et vous attribuons un coordinateur unique pour un suivi sans faille."
  }
];

const FAQS = [
  { question: "Gérez-vous les autorisations de stationnement à Versailles ou Saint-Germain ?", answer: "Oui, absolument. L'obtention d'arrêtés de voirie peut être complexe dans ces villes historiques. Pour nos formules Standard et Confort, nous gérons 100% de ces démarches administratives pour vous." },
  { question: "Comment évaluez-vous le coût d'un déménagement dans les Yvelines ?", answer: "Le coût dépend du volume (m³), de la distance, de la formule choisie et des accès (étages, portage). Nous privilégions une visite technique gratuite à votre domicile dans le 78 pour un devis ferme et définitif." },
  { question: "Intervenez-vous dans les zones rurales de la vallée de Chevreuse ?", answer: "Bien sûr. Nous sommes parfaitement équipés pour intervenir dans toutes les communes, y compris les zones reculées ou les propriétés avec des accès difficiles (chemins de terre, portails étroits)." },
  { question: "Quels sont vos délais d'intervention ?", answer: "Nous vous conseillons de nous contacter 3 à 4 semaines à l'avance. Cependant, grâce à notre forte implantation locale, nous pouvons régulièrement débloquer des créneaux d'urgence. Appelez-nous !" }
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

export default function YvelinesPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Grilles dorées symbolisant le prestige des Yvelines"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Yvelines (78)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Castle className="h-4 w-4" />
              Agence Locale IDF Ouest
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménageur <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans les Yvelines.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Versailles à Rambouillet en passant par Saint-Germain-en-Laye, confiez votre projet à des experts locaux qui connaissent votre département sur le bout des doigts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">
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
                Entre ville historique <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">et nature préservée</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Les Yvelines offrent une diversité unique : le prestige des avenues versaillaises, le dynamisme économique de Saint-Quentin-en-Yvelines, ou encore les accès escarpés et forestiers de la vallée de Chevreuse.
                </p>
                <p>
                  Un déménagement ici exige bien plus que de la simple manutention. Cela demande de l'anticipation. Nous gérons les stationnements complexes, les arrêtés municipaux spécifiques, et nous adaptons nos camions (fourgons agiles ou poids lourds) à la topographie de votre secteur.
                </p>
              </div>
              
              <div className="pt-6 flex items-start gap-5">
                 <div className="h-16 w-16 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    <TreePine className="h-8 w-8 text-[#00ad9f]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 mb-1">Logistique Maîtrisée</h3>
                   <p className="text-slate-500 font-light">Une efficacité éprouvée, du centre-ville très dense jusqu'à la campagne reculée.</p>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/zones/demenagement-yvelines.webp"
                  alt="Équipe de déménageurs intervenant dans les Yvelines"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES GRID --- */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Lueur de fond douce */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ad9f]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Nous couvrons <span className="text-[#00ad9f]">tout le 78.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              De l'agglomération de Versailles Grand Parc à la boucle de la Seine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {YVELINES_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                href={city.link} 
                key={city.name}
                className="group flex items-center justify-between bg-white h-16 px-6 border border-slate-200 hover:border-[#00ad9f] hover:shadow-lg rounded-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <span className="font-bold text-slate-700 group-hover:text-[#00ad9f] transition-colors">{city.name}</span>
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors">
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#00ad9f] transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-slate-500 font-light">
            Votre commune n'est pas listée ? Nous intervenons dans <strong>100% des villes des Yvelines</strong>.
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="why-us-78" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre projet ?
            </h2>
            <p className="text-lg text-slate-500 font-light">
              La force d'un grand nom du déménagement, l'agilité et l'écoute d'un artisan local.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {WHY_US_ITEMS.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <item.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- FAQ --- */}
      <section id="faq-78" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">Tout savoir pour préparer votre installation réussie dans les Yvelines.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {FAQS.map((item, i) => (
              <AccordionItem 
                value={`item-${i}`} 
                key={i} 
                className="bg-slate-50 border border-slate-100 rounded-2xl px-4 data-[state=open]:border-[#00ad9f]/30 data-[state=open]:bg-white data-[state=open]:shadow-md transition-all duration-300"
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
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Prêt pour votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      nouvelle adresse ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Contactez-nous dès aujourd'hui pour organiser votre visite technique gratuite dans les Yvelines et recevoir votre devis sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Obtenir mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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