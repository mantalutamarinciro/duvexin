import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

// Icons
import { 
  CheckCircle2, MapPin, ArrowRight, ShieldCheck, 
  Users, Globe, Truck, ChevronRight, Navigation,
  Route, PackageCheck, Clock
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement National & Longue Distance | Partout en France",
  description: "Déménagez de l'Île-de-France vers toute la France en toute sérénité. Lignes régulières, groupage, transport sécurisé. Devis gratuit.",
  alternates: {
    canonical: "https://marnetransdem.fr/demenagement-national",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées sur un long trajet. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const topDestinations = [
  { name: "Lyon", link: "/demenagement-ile-de-france-lyon" },
  { name: "Marseille", link: "/demenagement-ile-de-france-marseille" },
  { name: "Bordeaux", link: "/demenagement-ile-de-france-bordeaux" },
  { name: "Lille", link: "/demenagement-ile-de-france-lille" },
  { name: "Nantes", link: "/demenagement-ile-de-france-nantes" },
  { name: "Toulouse", link: "/demenagement-ile-de-france-toulouse" },
  { name: "Strasbourg", link: "/demenagement-ile-de-france-strasbourg" },
  { name: "Nice", link: "/demenagement-ile-de-france-nice" },
  { name: "Rennes", link: "/demenagement-ile-de-france-rennes" },
];

export default function DemenagementNationalPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION (Voyage & Distance) --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/services/demenagement-national.webp"
          alt="Camion de déménagement professionnel sur une autoroute française"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        {/* Overlay pour assombrir proprement */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">National</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Globe className="h-4 w-4" />
              Mobilité Nationale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Où que la vie <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                vous mène en France.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Paris à la province, ou de la province vers l'Île-de-France. Nous organisons votre déménagement longue distance avec la même rigueur et le même soin qu'un trajet local.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Obtenir un devis national <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (L'enjeu de la distance) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Votre projet de vie, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">géré de A à Z</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Quitter sa région pour une nouvelle aventure professionnelle ou personnelle est une étape majeure. Un déménagement à 500 ou 800 kilomètres ne pardonne aucune erreur : il est matériellement impossible de faire un aller-retour pour un carton oublié.
                </p>
                <p>
                  Cela exige une planification sans faille, une logistique optimisée (gestion des péages, respect des temps de conduite réglementaires) et un partenaire d'une fiabilité absolue. Grâce à nos tournées nationales régulières, nous vous offrons une solution économique et 100% sécurisée.
                </p>
              </div>
              
              <div className="pt-8 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6 bg-slate-50 py-4 rounded-r-2xl">
                    <div className="flex items-center gap-3">
                       <Route className="h-7 w-7 text-[#00ad9f]" />
                       <span className="text-3xl font-extrabold text-slate-900">100%</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Couverture nationale</span>
                 </div>
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6 bg-slate-50 py-4 rounded-r-2xl">
                    <div className="flex items-center gap-3">
                       <ShieldCheck className="h-7 w-7 text-[#00ad9f]" />
                       <span className="text-3xl font-extrabold text-slate-900">50k€</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Assurance incluse</span>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:rotate-0" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/demenagement-paris-province.webp"
                  alt="Planification logistique d'un déménagement national"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SPÉCIFIQUES LONGUE DISTANCE --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Les défis de la longue distance, <br/> <span className="text-[#00ad9f]">notre métier.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Parce qu'un trajet de 8 heures sur autoroute secoue bien plus qu'un trajet de 20 minutes en ville, nos standards de qualité sont relevés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <PackageCheck className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Protection Renforcée</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                L'emballage et le calage dans le camion font l'objet d'une attention maniaque. Nous utilisons des sangles d'arrimage lourdes et des couvertures très épaisses pour absorber toutes les vibrations liées à l'autoroute.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <Users className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lignes Groupées (Groupage)</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                Pour les petits et moyens volumes, le groupage est la solution idéale. Nous groupons plusieurs clients de la même région dans un seul grand camion afin de diviser drastiquement vos frais kilométriques et de péage.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8">
                <Clock className="h-8 w-8 text-[#00ad9f]" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Voyage Spécial Dédié</h3>
              <p className="text-slate-500 font-light leading-relaxed flex-grow">
                Vous avez un grand volume (maison entière) ou une date impérative pour la signature notaire ? Optez pour le voyage spécial. Le camion vous est 100% dédié et nous livrons à la date et à l'heure exactes de votre choix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS PHARES (SEO Maillage) --- */}
      <section id="destinations" className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nos lignes <span className="text-[#00ad9f]">régulières</span>
            </h2>
            <p className="text-lg text-slate-400 font-light leading-relaxed">
              Nous couvrons l'ensemble du territoire français avec des liaisons hebdomadaires vers les grandes métropoles régionales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topDestinations.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-slate-500 group-hover:text-[#00ad9f] transition-colors" />
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-slate-800/50 border border-slate-700 rounded-full px-8 py-4 text-sm text-slate-300 font-light">
              Votre ville n'est pas dans la liste ? Pas d'inquiétude, nous livrons absolument <strong className="text-white font-bold">partout en France métropolitaine</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco Technique */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               {/* CONTENU AU PREMIER PLAN */}
               <div className="relative z-10 space-y-8">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 border border-white/10 backdrop-blur-md">
                   <Navigation className="h-4 w-4" />
                   Calculez votre itinéraire
                 </div>

                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Prêt à prendre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      la route ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Demandez une étude kilométrique et volumétrique gratuite. Réponse rapide et ferme pour vous aider à budgétiser votre départ.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-devis">
                          Obtenir un devis national <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-20" asChild>
                       <a href="tel:+33144935486">Appeler la logistique</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}