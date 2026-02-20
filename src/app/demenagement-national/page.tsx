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
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
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
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/france-highway/1920/1080"
          alt="Camion de déménagement sur une autoroute française au coucher du soleil"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%]"
        />
        {/* Overlay pour assombrir proprement */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link href="#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">National & Longue Distance</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Globe className="h-4 w-4" />
              Mobilité Nationale
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Où que la vie <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                vous mène en France.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              De Paris à la province, ou de la province vers l'Île-de-France. Nous organisons votre déménagement longue distance avec la même rigueur qu'un trajet local.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-de-devis">
                  Obtenir un devis national <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION (L'enjeu de la distance) --- */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Votre projet de vie, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">géré de A à Z</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Quitter sa région pour une nouvelle aventure est une étape majeure. Un déménagement à 500 ou 800 kilomètres ne pardonne aucune erreur : il est impossible de faire un aller-retour pour un carton oublié.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Cela exige une planification sans faille, une logistique optimisée (péages, temps de conduite réglementaires) et un partenaire de confiance. Grâce à nos tournées régulières, nous vous offrons une solution fiable, économique et 100% sécurisée.
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <div className="flex items-center gap-2">
                       <Route className="h-6 w-6 text-[#00ad9f]" />
                       <span className="text-2xl font-extrabold text-slate-900">100%</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">Couverture nationale</span>
                 </div>
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="h-6 w-6 text-[#00ad9f]" />
                       <span className="text-2xl font-extrabold text-slate-900">50k€</span>
                    </div>
                    <span className="text-sm font-medium text-slate-500">Assurance minimum</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] -rotate-3 transform-gpu -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/france-map-planning/800/600"
                  alt="Planification logistique sur une carte de France"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SPÉCIFIQUES LONGUE DISTANCE --- */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Les défis de la longue distance, <br/> <span className="text-[#00ad9f]">notre métier.</span>
            </h2>
            <p className="text-lg text-slate-500">
              Parce qu'un trajet de 8 heures secoue plus qu'un trajet de 20 minutes, nos standards sont relevés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center mb-6">
                <PackageCheck className="h-7 w-7 text-[#00ad9f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Protection Renforcée</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                L'emballage et le calage dans le camion font l'objet d'une attention absolue. Utilisation de sangles d'arrimage lourdes et couvertures épaisses pour absorber toutes les vibrations de l'autoroute.
              </p>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-[#00ad9f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Déménagement Groupé</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Pour les petits volumes (étudiants, studios), le groupage est la solution. Nous groupons plusieurs clients dans un même camion pour réduire drastiquement vos frais kilométriques.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-[#00ad9f]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Voyage Spécial</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Vous avez un grand volume ou une date impérative ? Optez pour le voyage spécial. Le camion vous est entièrement dédié et nous livrons à la date et l'heure exactes de votre choix.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATIONS PHARES (SEO Maillage) --- */}
      <section id="destinations" className="py-20 lg:py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
              Nos lignes <span className="text-[#00ad9f]">régulières</span>
            </h2>
            <p className="text-lg text-slate-400 font-light">
              Nous couvrons l'ensemble de la France avec des liaisons hebdomadaires vers les grandes métropoles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topDestinations.sort((a,b) => a.name.localeCompare(b.name)).map((city) => (
              <Link 
                key={city.name} 
                href={city.link}
                className="group flex items-center justify-between bg-slate-800/50 border border-slate-700 p-5 rounded-2xl hover:bg-[#00ad9f]/10 hover:border-[#00ad9f]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-slate-500 group-hover:text-[#00ad9f] transition-colors" />
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">{city.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-[#00ad9f] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-slate-500">
            Votre ville n'est pas dans la liste ? Pas d'inquiétude, nous livrons absolument <strong>partout en France métropolitaine</strong>.
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco Technique */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               {/* CONTENU AU PREMIER PLAN */}
               <div className="relative z-10">
                 <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-white mb-8 border border-white/5 backdrop-blur-md">
                   <Navigation className="h-4 w-4 text-[#00ad9f]" />
                   Calculez votre itinéraire
                 </div>

                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Prêt à prendre <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">la route ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Demandez une étude kilométrique et volumétrique gratuite. Réponse rapide pour vous aider à budgétiser votre départ.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Obtenir un devis national <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-base font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-20" asChild>
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