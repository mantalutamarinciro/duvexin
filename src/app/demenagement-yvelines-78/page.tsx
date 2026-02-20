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
      
      {/* --- HERO SECTION (Régional & Majestueux) --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/versailles-gate/1920/1080"
          alt="Grilles dorées symbolisant le prestige des Yvelines"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="/zones-intervention" className="hover:text-white transition-colors">Zones d'intervention</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Yvelines (78)</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Castle className="h-4 w-4" />
              Agence Locale IDF
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Votre déménageur <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans les Yvelines.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Versailles à Rambouillet en passant par Saint-Germain-en-Laye, confiez votre projet à des experts qui connaissent votre département sur le bout des doigts.
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

      {/* --- INTRO SECTION (L'expertise terrain) --- */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Entre ville historique <br/> et nature préservée.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Les Yvelines offrent une diversité unique : le prestige des avenues versaillaises, le dynamisme économique de Saint-Quentin-en-Yvelines, ou encore les accès escarpés de la vallée de Chevreuse.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Un déménagement ici exige bien plus que des bras. Cela demande de l'anticipation. Nous gérons les stationnements difficiles, les arrêtés municipaux spécifiques, et nous adaptons nos camions (fourgons légers ou poids lourds) à la topographie de votre rue.
              </p>
              
              <div className="pt-6 flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-[#00ad9f]/10 flex items-center justify-center">
                    <TreePine className="h-7 w-7 text-[#00ad9f]" />
                 </div>
                 <div className="text-slate-900 font-bold text-lg">
                   Logistique maîtrisée,<br/> <span className="text-slate-500 font-normal text-sm">du centre-ville à la campagne.</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/yvelines-team/800/600"
                  alt="Équipe de déménageurs intervenant dans les Yvelines"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Grid Avantages) --- */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Pourquoi nous confier votre projet ?
            </h2>
            <p className="text-lg text-slate-500">
              La force d'un grand nom du déménagement, l'agilité et l'écoute d'un artisan local.
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

      {/* --- CITIES (SEO Maillage Siloing) --- */}
      <section id="cities-yvelines" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nous couvrons <span className="text-[#00ad9f]">tout le 78.</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              De l'agglomération de Versailles Grand Parc à la boucle de la Seine. Retrouvez nos secteurs d'intervention phares :
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {YVELINES_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-slate-800/50 border border-slate-700 p-4 rounded-2xl hover:bg-[#00ad9f]/10 hover:border-[#00ad9f]/30 transition-all duration-300"
              >
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#00ad9f] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-slate-500">
            Votre commune n'est pas listée ? Nous intervenons dans <strong>100% des villes des Yvelines</strong>.
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
                  src="https://picsum.photos/seed/yvelines-packing/800/600"
                  alt="Déménageur protégeant un meuble"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Une solution pour <br/> <span className="text-[#00ad9f]">chaque projet.</span>
              </h2>
              <ul className="space-y-6 pt-2">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Déménagement Particuliers</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Formules à la carte (Éco, Standard, Luxe) pour s'adapter à votre budget et à votre implication.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Transfert d'Entreprises</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Logistique de bureaux, manutention de serveurs informatiques et archives. Intervention possible le week-end.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[#00ad9f] shrink-0 mt-1"><CheckCircle2 className="h-5 w-5"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Garde-Meubles Sécurisé</h4>
                    <p className="text-slate-500 mt-1 leading-relaxed">Besoin de transition ? Stockage en conteneurs plombés, sous alarme et vidéosurveillance 24/7.</p>
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
      <section id="faq-yvelines" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Questions <span className="text-[#00ad9f]">fréquentes</span>
            </h2>
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
               
               {/* Deco de fond fluide */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Prêt pour votre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">nouvelle adresse ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Contactez-nous dès aujourd'hui pour organiser votre visite technique gratuite dans les Yvelines et recevoir votre devis sous 24h.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Obtenir mon devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
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
