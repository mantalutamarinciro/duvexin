import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

// Icons
import { 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Globe, 
  Truck, 
  ChevronRight, 
  Map, 
  Building2, 
  Compass
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Nos Zones d'Intervention | Déménagement Île-de-France & Normandie",
  description: "Déménagement du Vexin intervient sur toute l'Île-de-France (95, 78, 92, 75...), la Normandie et organise vos transferts nationaux et internationaux.",
  alternates: {
    canonical: "https://marnetransdem.fr/zones", // À adapter
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const ILE_DE_FRANCE = [
  { name: "Val-d'Oise (95)", description: "Notre siège historique, nous couvrons l'ensemble du département.", link: "/demenagement-val-d-oise-95" },
  { name: "Yvelines (78)", description: "Versailles, Saint-Germain... Nous connaissons parfaitement le secteur.", link: "/demenagement-yvelines-78" },
  { name: "Hauts-de-Seine (92)", description: "Nous maîtrisons les spécificités et accès de ce département dense.", link: "/demenagement-hauts-de-seine-92" },
  { name: "Paris (75)", description: "Experts des contraintes parisiennes et autorisations de stationnement.", link: "/demenagement-paris-75" },
  { name: "Seine-Saint-Denis (93)", description: "De Montreuil à Saint-Denis, une logistique parfaitement rodée.", link: "/demenagement-seine-saint-denis-93" },
  { name: "Val-de-Marne (94)", description: "Nous intervenons dans tout le Val-de-Marne pour vos projets.", link: "/demenagement-val-de-marne-94" },
  { name: "Essonne (91)", description: "Une couverture complète du nord au sud du département.", link: "/demenagement-essonne-91" },
  { name: "Seine-et-Marne (77)", description: "Même dans le plus grand département d'IDF, nous sommes là.", link: "/demenagement-seine-et-marne-77" },
];

const NORMANDIE = [
  { name: "Eure (27)", description: "Avec notre agence à Évreux, nous sommes au plus proche de vous.", link: "/demenagement-eure-27" },
  { name: "Seine-Maritime (76)", description: "De Rouen au Havre, nous assurons vos déménagements réguliers.", link: "/demenagement-seine-maritime-76" },
  { name: "Calvados (14)", description: "Nous vous accompagnons pour vos projets à Caen et sur la côte.", link: "/demenagement-calvados-14" },
  { name: "Orne (61)", description: "Une présence logistique fiable pour vos transferts dans l'Orne.", link: "/demenagement-orne-61" },
];

export default function InterventionZonePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[50vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/map-france-dark/1920/1080"
          alt="Carte de France réseau logistique"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity grayscale-[50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Zones d'intervention</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00ad9f]/30 bg-[#00ad9f]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
              <Map className="h-4 w-4" />
              Couverture Géographique
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Proches de vous, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                partout en France.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              Un ancrage local fort en Île-de-France et en Normandie, couplé à un réseau logistique nous permettant d'intervenir sur tout le territoire national.
            </p>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                L'agilité d'un acteur local, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">la force d'un réseau</u>.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Marne Transdem combine la force d'un acteur local profondément ancré en Île-de-France, avec la capacité d'intervenir sur l'ensemble du territoire français et à l'international.
              </p>
              <p className="text-lg text-slate-500 leading-relaxed">
                Notre connaissance millimétrée du terrain dans nos zones de proximité est un atout majeur pour anticiper les contraintes (stationnement, horaires, syndics) et garantir la fluidité de votre déménagement.
              </p>
              
              <div className="pt-6 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <span className="text-3xl font-extrabold text-slate-900">2</span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Agences Locales</span>
                 </div>
                 <div className="flex flex-col gap-1 border-l-2 border-[#00ad9f] pl-4">
                    <span className="text-3xl font-extrabold text-slate-900">100%</span>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Territoire couvert</span>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="https://picsum.photos/seed/moving-truck-street/800/600"
                  alt="Camion de déménagement dans une rue résidentielle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ÎLE-DE-FRANCE (Grille Interactive) --- */}
      <section id="idf" className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00ad9f] border border-slate-200 shadow-sm">
                <Building2 className="h-4 w-4" />
                Région Parisienne
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Île-de-France
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Notre cœur historique. Nous maîtrisons les accès et spécificités de chaque département francilien.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ILE_DE_FRANCE.map((dept, index) => (
              <Link 
                key={index} 
                href={dept.link}
                className="group flex flex-col bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-300" />
                   </div>
                   <h3 className="font-bold text-lg text-slate-900 leading-tight">{dept.name}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[#00ad9f] font-semibold text-sm">
                  Détails du secteur
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NORMANDIE --- */}
      <section id="normandie" className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00ad9f] border border-slate-200 shadow-sm">
                <Compass className="h-4 w-4" />
                Secteur Nord-Ouest
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Normandie
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Grâce à notre antenne locale, nous avons développé une présence forte pour accompagner vos projets normands.
              </p>
            </div>
            <div className="hidden md:block pb-2">
              <Button asChild variant="outline" className="rounded-full h-12 px-6 border-slate-300 hover:text-[#00ad9f] hover:border-[#00ad9f] transition-colors">
                <Link href="/contact">Contacter l'agence Normandie</Link>
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NORMANDIE.map((dept, index) => (
              <Link 
                key={index} 
                href={dept.link}
                className="group flex flex-col bg-slate-50 border border-slate-100 rounded-[2rem] p-6 hover:bg-white hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-300">
                      <MapPin className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-300" />
                   </div>
                   <h3 className="font-bold text-lg text-slate-900 leading-tight">{dept.name}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between text-[#00ad9f] font-semibold text-sm">
                  Détails du secteur
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Button asChild variant="outline" className="rounded-full w-full h-12 border-slate-300">
                <Link href="/contact">Contacter l'agence Normandie</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* --- NATIONAL & INTERNATIONAL --- */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] shadow-sm">
                <Globe className="h-4 w-4" />
                Longue Distance
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Et partout ailleurs <br/> <span className="text-[#00ad9f]">en France & Europe.</span>
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Votre projet vous emmène plus loin ? Nous organisons des liaisons régulières (voyages spéciaux ou groupages) pour réduire vos coûts tout en garantissant un haut niveau de service.
              </p>
              
              <ul className="space-y-6 pt-4">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-2xl text-[#00ad9f] shrink-0"><Truck className="h-6 w-6"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Déménagements Nationaux</h4>
                    <p className="text-slate-400 mt-1 leading-relaxed">Lignes fréquentes vers Lyon, Marseille, Bordeaux, Lille, Nantes, Toulouse, Strasbourg...</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 rounded-2xl text-[#00ad9f] shrink-0"><Globe className="h-6 w-6"/></div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Europe Limitrophe</h4>
                    <p className="text-slate-400 mt-1 leading-relaxed">Prise en charge complète vers la Belgique, la Suisse, le Luxembourg, l'Espagne ou l'Allemagne.</p>
                  </div>
                </li>
              </ul>
              
              <div className="pt-6">
                 <Button asChild size="lg" className="rounded-full h-14 px-8 font-bold bg-[#00ad9f] hover:bg-[#009286] text-white">
                    <Link href="/demenagement-national">Découvrir le service National</Link>
                 </Button>
              </div>
            </div>

            <div className="relative">
              {/* Cercle lumineux déco */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#00ad9f]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-slate-700 bg-slate-800">
                <Image
                  src="https://picsum.photos/seed/europe-highway/800/600"
                  alt="Transport routier européen"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco de fond fluide */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Votre ville n'est pas <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">dans la liste ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    Pas d'inquiétude. Nos camions sillonnent les routes quotidiennement. Contactez-nous pour vérifier notre disponibilité sur votre secteur.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Vérifier ma zone & Devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
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