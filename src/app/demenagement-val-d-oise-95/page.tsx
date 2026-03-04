import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

// UI Components
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { realReviews } from "@/lib/reviews-data";

// Icons
import { 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Building2, 
  Truck, 
  ArrowRight, 
  ChevronRight, 
  Map,
  Trees,
  Briefcase,
  Home,
  LayoutGrid,
  Star,
  BookOpen,
  Calculator,
  Sparkles
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Val-d'Oise (95) | Expert Local & Devis Gratuit",
  description: "Déménagement du Vexin : votre expert historique dans le Val-d'Oise (95). De Cergy à Argenteuil, profitez d'un savoir-faire local pour particuliers et entreprises. Devis en 24h.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/demenagement-val-d-oise-95",
  }
};

const VAL_D_OISE_CITIES = [
  { name: "Argenteuil", link: "/demenagement-argenteuil-95100" },
  { name: "Bezons", link: "/demenagement-bezons-95870" },
  { name: "Cergy", link: "/demenagement-cergy-95000" },
  { name: "Cormeilles-en-Parisis", link: "/demenagement-cormeilles-en-parisis-95240" },
  { name: "Eaubonne", link: "/demenagement-eaubonne-95600" },
  { name: "Enghien-les-Bains", link: "/demenagement-enghien-les-bains-95880" },
  { name: "Ermont", link: "/demenagement-ermont-95120" },
  { name: "Franconville", link: "/demenagement-franconville-95130" },
  { name: "Herblay-sur-Seine", link: "/demenagement-herblay-sur-seine-95220" },
  { name: "L'Isle-Adam", link: "/demenagement-lisle-adam-95290" },
  { name: "Montmorency", link: "/demenagement-montmorency-95160" },
  { name: "Pontoise", link: "/demenagement-pontoise-95300" },
  { name: "Saint-Ouen-l'Aumône", link: "/demenagement-saint-ouen-l-aumone-95310" },
  { name: "Sarcelles", link: "/demenagement-sarcelles-95200" },
  { name: "Taverny", link: "/demenagement-taverny-95150" },
];

const WHY_US_ITEMS = [
  {
    icon: MapPin,
    title: "Ancrage Historique",
    description: "Basés au cœur du Val-d'Oise, nous maîtrisons chaque commune, du Vexin rural aux pôles urbains denses."
  },
  {
    icon: Users,
    title: "Équipes du Vexin",
    description: "Nos déménageurs sont des professionnels salariés de la région. Pas de sous-traitance, pour un soin garanti."
  },
  {
    icon: ShieldCheck,
    title: "Protection Adaptée",
    description: "Emballages spécifiques pour le mobilier fragile et matériel de pointe (monte-meubles, camions capitonnés)."
  },
  {
    icon: Star,
    title: "Réputation locale",
    description: "Une note d'excellence dans le 95. Nous accompagnons nos voisins avec la fierté du travail bien fait."
  }
];

const FAQS = [
  { 
    question: "Gérez-vous les accès difficiles dans les villages du Vexin ?", 
    answer: "C'est notre spécialité. Pour les rues étroites de La Roche-Guyon ou d'Auvers-sur-Oise, nous utilisons des véhicules petits porteurs et prévoyons des distances de portage adaptées." 
  },
  { 
    question: "Intervenez-vous dans les résidences neuves de Cergy-Pontoise ?", 
    answer: "Oui, nous connaissons parfaitement les nouvelles zones résidentielles. Nous gérons les accès logistiques et le stationnement en accord avec les règlements de copropriété." 
  },
  { 
    question: "Proposez-vous le monte-meubles à Argenteuil ou Sarcelles ?", 
    answer: "Absolument. Pour les immeubles sans ascenseur ou les étages élevés, le monte-meubles est souvent la solution la plus sûre et la plus rapide que nous déployons régulièrement." 
  },
  { 
    question: "Quel est le délai pour un déménagement dans le 95 ?", 
    answer: "En tant qu'acteur local, nous sommes très réactifs. Un devis est envoyé sous 24h après visite. Prévoyez idéalement 2 à 3 semaines de préavis pour garantir votre date." 
  }
];

export default function ValDOisePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
      })}} />
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Paysage du Val-d'Oise"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Val-d'Oise (95)</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Trees className="h-4 w-4" />
              L'expert Déménagement du 95
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Votre déménageur <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                dans le Val-d'Oise (95).
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Cergy au Vexin Français, bénéficiez du savoir-faire d'un acteur local historique. Une logistique maîtrisée pour une transition en toute sérénité.
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

      {/* --- MAILLAGE : ACCÈS DIRECTS VILLES --- */}
      <section className="py-12 bg-white border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-4">Villes phares :</span>
            {["Cergy", "Pontoise", "Argenteuil", "Sarcelles", "Enghien", "L'Isle-Adam"].map((city) => (
              <Link 
                key={city}
                href={`/demenagement-${city.toLowerCase().replace(/ /g, "-")}-95${city === "Argenteuil" ? '100' : city === "Sarcelles" ? '200' : city === "Cergy" ? '000' : city === "Pontoise" ? '300' : city === "Enghien" ? '880' : '290'}`}
                className="inline-flex items-center px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 hover:text-primary hover:border-primary/30 transition-all"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Votre département, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">notre terrain d'excellence</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Le Val-d'Oise (95) est notre département d'origine. De la technopole de Cergy-Pontoise aux demeures historiques de l'Isle-Adam, nous maîtrisons la diversité et les spécificités de chaque secteur.
                </p>
                <p>
                  Pour préparer votre départ, nous vous conseillons de consulter notre <Link href="/blog/checklist-demenagement" className="text-primary font-bold hover:underline">checklist complète</Link> ou d'utiliser notre <Link href="/calculateur-volume" className="text-primary font-bold hover:underline">calculateur de volume</Link> pour une première estimation précise.
                </p>
              </div>
              
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-100">
                 <div className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-slate-900">100%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Maillage 95</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-slate-900">24h</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Réactivité Devis</span>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/zones/demenagement-val-d-oise.webp"
                  alt="Équipe de déménagement professionnelle en intervention dans le 95"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ad9f]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Nos villes d'intervention dans le 95
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Cliquez sur votre ville pour découvrir nos services locaux personnalisés.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {VAL_D_OISE_CITIES.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
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
        </div>
      </section>

      {/* --- AVIS CLIENTS RÉELS --- */}
      <TestimonialsSection reviews={realReviews} />

      {/* --- MAILLAGE : MAGAZINE / BLOG --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Réussir votre départ <br /> <span className="text-primary">du Val-d'Oise.</span>
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Consultez nos derniers guides pour préparer vos cartons et vos démarches sereinement.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/blog">Voir tous nos conseils <BookOpen className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog/5-astuces-pour-un-demenagement-sans-stress" className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-100 relative">
                <Image src="/images/blog/demenagement-planification.webp" alt="Conseils stress" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">5 astuces pour un déménagement sans stress</h3>
            </Link>
            <Link href="/blog/le-guide-ultime-pour-emballer-vos-objets-fragiles" className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-100 relative">
                <Image src="/images/blog/emballage-objets-fragiles.webp" alt="Emballage fragile" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">Le guide ultime pour vos objets fragiles</h3>
            </Link>
            <Link href="/blog/comment-choisir-la-bonne-formule-de-demenagement" className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-slate-100 relative">
                <Image src="/images/blog/formules-demenagement.webp" alt="Formules" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">Bien choisir sa formule de service</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-[#0f172a] text-white rounded-[4rem] mx-4 md:mx-8 mb-12 overflow-hidden relative isolate">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
         <div className="container mx-auto px-4 md:px-6 text-center py-12">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
              Prêt pour votre <span className="text-primary">devis gratuit ?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Contactez nos experts du Val-d'Oise pour une étude technique personnalisée de votre projet.
            </p>
            <div className="flex justify-center gap-6">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all" asChild>
                <Link href="/demande-devis">Démarrer mon étude <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
         </div>
      </section>
    </main>
  );
}
