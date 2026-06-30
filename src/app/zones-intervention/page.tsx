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
  Map as MapIcon, 
  Building2, 
  Compass,
  Navigation,
  Ship,
  Plane,
  Route,
  Scale,
  Timer,
  Zap,
  PackageCheck,
  Star,
  LayoutGrid,
  ShieldCheck
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Nos Zones d'Intervention | Déménagement Île-de-France, Normandie & National",
  description: "Déménagement du Vexin intervient sur toute l'Île-de-France, la Normandie et organise vos transferts nationaux et internationaux (UK, Suisse, Belgique, etc.).",
  alternates: {
    canonical: "https://demenagementduvexin.fr/zones-intervention",
  }
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement de l'IDF vers la Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Sincèrement je suis bluffé. Je recommande totalement Déménagement du Vexin.", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const ILE_DE_FRANCE = [
  { name: "Val-d'Oise (95)", description: "Notre siège historique, nous couvrons l'ensemble des communes du département.", link: "/demenagement-val-d-oise-95" },
  { name: "Yvelines (78)", description: "De Versailles à Saint-Germain... Nous connaissons parfaitement le secteur.", link: "/demenagement-yvelines-78" },
  { name: "Hauts-de-Seine (92)", description: "Nous maîtrisons les accès complexes et spécifiques de ce département dense.", link: "/demenagement-hauts-de-seine-92" },
  { name: "Paris (75)", description: "Experts des contraintes parisiennes, étages élevés et arrêtés de stationnement.", link: "/demenagement-paris-75" },
  { name: "Seine-Saint-Denis (93)", description: "De Montreuil à Saint-Denis, une logistique parfaitement rodée et réactive.", link: "/demenagement-seine-saint-denis-93" },
  { name: "Val-de-Marne (94)", description: "Nous intervenons dans tout le Val-de-Marne pour vos projets résidentiels ou B2B.", link: "/demenagement-val-de-marne-94" },
  { name: "Essonne (91)", description: "Une couverture logistique complète du nord au sud du département.", link: "/demenagement-essonne-91" },
  { name: "Seine-et-Marne (77)", description: "Même dans le plus grand département d'Île-de-France, nous sommes présents.", link: "/demenagement-seine-et-marne-77" },
];

const NORMANDIE = [
  { name: "Eure (27)", description: "Grâce à notre agence d'Évreux, nous sommes au plus proche de vos projets normands.", link: "/demenagement-eure-27" },
  { name: "Seine-Maritime (76)", description: "De Rouen au Havre, nous assurons des liaisons et déménagements réguliers.", link: "/demenagement-seine-maritime-76" },
  { name: "Calvados (14)", description: "Nous vous accompagnons de Caen jusqu'aux stations balnéaires de la côte.", link: "/demenagement-calvados-14" },
  { name: "Orne (61)", description: "Une présence logistique fiable et robuste pour vos transferts dans l'Orne.", link: "/demenagement-orne-61" },
];

const HAUTS_DE_FRANCE = [
  { name: "Oise (60)", description: "Une zone stratégique au nord du Val-d'Oise : Beauvais, Compiègne, Creil, Senlis et les principales communes du département.", link: "/demenagement-oise-60" },
];

const INTERNATIONAL = [
  { name: "Royaume-Uni", description: "Expertise post-Brexit et douanes. Liaisons régulières vers Londres, Manchester...", icon: Ship, link: "/demenagement-france-royaume-uni" },
  { name: "Suisse", description: "Spécialiste douanes hors UE pour Genève, Lausanne, Zurich et les cantons.", icon: Navigation, link: "/demenagement-france-suisse" },
  { name: "Belgique", description: "Navettes hebdomadaires entre Paris et Bruxelles pour expatriés et pros.", icon: Truck, link: "/demenagement-france-belgique" },
  { name: "Luxembourg", description: "Service prestige vers le Grand-Duché : Kirchberg, Ville-Haute et environs.", icon: Building2, link: "/demenagement-france-luxembourg" },
  { name: "Allemagne", description: "Liaisons transfrontalières rapides vers Berlin, Munich, Francfort et la Ruhr.", icon: Globe, link: "/demenagement-france-allemagne" },
  { name: "Espagne", description: "Déménagements vers Madrid, Barcelone, Valence et toute la péninsule.", icon: Route, link: "/demenagement-france-espagne" },
  { name: "Portugal", description: "Expertise longue distance vers Lisbonne, Porto et le sud de l'Algarve.", icon: MapPin, link: "/demenagement-france-portugal" },
  { name: "Italie", description: "Logistique transalpine vers Rome, Milan, Turin et les régions du Nord.", icon: Route, link: "/demenagement-france-italie" },
];

const NATIONAL = [
  { name: "Lyon (69)", description: "Liaisons quotidiennes via l'A6 pour vos transferts vers le Rhône.", link: "/demenagement-ile-de-france-lyon" },
  { name: "Marseille (13)", description: "Expertise longue distance vers la cité phocéenne et la Provence.", link: "/demenagement-ile-de-france-marseille" },
  { name: "Bordeaux (33)", description: "Navettes régulières vers la Gironde et le Sud-Ouest.", link: "/demenagement-ile-de-france-bordeaux" },
  { name: "Lille (59)", description: "Liaison express vers la capitale des Flandres et le Nord.", link: "/demenagement-ile-de-france-lille" },
  { name: "Nantes (44)", description: "Accompagnement expert vers la Loire-Atlantique et le Grand Ouest.", link: "/demenagement-ile-de-france-nantes" },
  { name: "Toulouse (31)", description: "Logistique sécurisée vers la Ville Rose et l'Occitanie.", link: "/demenagement-ile-de-france-toulouse" },
  { name: "Nice (06)", description: "Service prestige vers la Côte d'Azur et les Alpes-Maritimes.", link: "/demenagement-ile-de-france-nice" },
  { name: "Strasbourg (67)", description: "Lignes régulières vers l'Alsace et le Grand Est.", link: "/demenagement-ile-de-france-strasbourg" },
  { name: "Rennes (35)", description: "Votre installation en Bretagne gérée avec rigueur et ponctualité.", link: "/demenagement-ile-de-france-rennes" },
];

export default function InterventionZonePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Carte et réseau de transport"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity grayscale-[30%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Zones d'intervention</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-8 shadow-sm backdrop-blur-md">
              <MapIcon className="h-4 w-4" />
              Couverture Géographique
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Proches de vous, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                partout en Europe.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light mb-10">
              Un ancrage local puissant en Île-de-France et en Normandie, couplé à une expertise logistique internationale pour sécuriser vos transferts sur tout le territoire national et européen.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="#idf">
                  Explorer nos secteurs <ArrowRight className="ml-2 h-5 w-5" />
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
                L'agilité d'un artisan, <br/> <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">la force d'un réseau</u>.
              </h2>
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  <strong>Déménagement du Vexin</strong> combine la réactivité d'un acteur local profondément ancré dans ses territoires (Val-d'Oise, Eure) avec la capacité technique d'intervenir sur des projets complexes à l'échelle européenne.
                </p>
                <p>
                  Notre connaissance millimétrée du terrain est un atout majeur : nous anticipons les contraintes urbaines, gérons les formalités douanières post-Brexit ou hors UE, et nous adaptons nos camions à la topographie de votre secteur de destination.
                </p>
              </div>
              
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-100">
                 <div className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-slate-900">2</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agences Physiques</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-slate-900">100%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Maîtrise Interne</span>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/demenagement-national.webp"
                  alt="Logistique et transport international"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ÎLE-DE-FRANCE --- */}
      <section id="idf" className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00ad9f]/5 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] border border-slate-200 shadow-sm">
                <Building2 className="h-4 w-4" />
                Région Parisienne
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Île-de-France
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Notre cœur historique. Nous maîtrisons les spécificités de chaque département francilien pour y intervenir avec rapidité et précision.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {ILE_DE_FRANCE.map((dept, index) => (
              <Link 
                key={index} 
                href={dept.link}
                className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-500">
                      <MapPin className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-[#00ad9f] transition-colors">{dept.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-[#00ad9f] font-bold text-sm">
                  Découvrir ce secteur
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- HAUTS-DE-FRANCE --- */}
      <section id="hauts-de-france" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-200 shadow-sm">
                <Navigation className="h-4 w-4" />
                Extension Nord
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Hauts-de-France
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Un secteur de proximité naturel depuis le Val-d'Oise, avec une couverture dédiée pour les déménagements dans l'Oise.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {HAUTS_DE_FRANCE.map((dept, index) => (
              <Link
                key={index}
                href={dept.link}
                className="group flex flex-col bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-500">
                      <MapPin className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-[#00ad9f] transition-colors">{dept.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-slate-600 group-hover:text-[#00ad9f] font-bold text-sm transition-colors">
                  Découvrir ce secteur
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NORMANDIE --- */}
      <section id="normandie" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-200 shadow-sm">
                <Compass className="h-4 w-4" />
                Secteur Nord-Ouest
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Normandie
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Grâce à notre agence physique située à Évreux (27), nous avons développé une présence logistique forte pour tous vos projets normands.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {NORMANDIE.map((dept, index) => (
              <Link 
                key={index} 
                href={dept.link}
                className="group flex flex-col bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-500">
                      <MapPin className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-[#00ad9f] transition-colors">{dept.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-1">
                  {dept.description}
                </p>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-slate-600 group-hover:text-[#00ad9f] font-bold text-sm transition-colors">
                  Découvrir ce secteur
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERNATIONAL SECTION --- */}
      <section id="international" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] border border-slate-200 shadow-sm">
                <Globe className="h-4 w-4" />
                Europe & Monde
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Déménagement International
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Nous orchestrons votre mobilité vers les plus grandes destinations européennes avec un accompagnement douanier et logistique complet.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full h-14 px-8 border-slate-200 font-bold hover:bg-slate-900 hover:text-white transition-all">
              <Link href="/demenagement-international">Voir toutes les destinations</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {INTERNATIONAL.map((dest, index) => (
              <Link 
                key={index} 
                href={dest.link}
                className="group flex flex-col bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-2xl hover:border-[#00ad9f]/40 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-12 w-12 rounded-xl bg-[#00ad9f]/10 flex items-center justify-center text-[#00ad9f] mb-6 group-hover:bg-[#00ad9f] group-hover:text-white transition-colors duration-500">
                  <dest.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-[#00ad9f] transition-colors">{dest.name}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-6 flex-1">
                  {dest.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00ad9f]">
                  Expertise Destination <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NATIONAL SECTION --- */}
      <section id="national" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 border border-slate-200 shadow-sm">
                <Truck className="h-4 w-4" />
                Longue Distance France
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                Déménagement National
              </h2>
              <p className="text-lg text-slate-500 font-light">
                Nous assurons des liaisons quotidiennes et des groupages réguliers vers toutes les grandes métropoles françaises.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full h-14 px-8 border-slate-200 font-bold hover:bg-slate-900 hover:text-white transition-all">
              <Link href="/demenagement-national">Découvrir l'offre nationale</Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {NATIONAL.map((city, index) => (
              <Link 
                key={index} 
                href={city.link}
                className="group flex flex-col bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-xl hover:border-[#00ad9f]/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#00ad9f]/10 transition-colors duration-500">
                      <Route className="h-6 w-6 text-slate-400 group-hover:text-[#00ad9f] transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-[#00ad9f] transition-colors">{city.name}</h3>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 flex-1">
                  {city.description}
                </p>
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between text-slate-600 group-hover:text-[#00ad9f] font-bold text-sm transition-colors">
                  Voir la liaison
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NATIONAL FOCUS (Dark Premium) --- */}
      <section className="py-24 bg-[#0f172a] text-white overflow-hidden relative isolate">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00ad9f]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#00ad9f] backdrop-blur-md">
                <PackageCheck className="h-4 w-4" />
                Savoir-faire Longue Distance
              </div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                L'expertise nationale <br/> <span className="text-[#00ad9f]">sans compromis.</span>
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Parce qu'un trajet de 8 heures sur autoroute exige un calage et un arrimage bien plus rigoureux qu'un transfert local, nous appliquons des standards de sécurité renforcés pour tous vos trajets nationaux.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Groupages hebdomadaires</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Assurance Ad Valorem</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Flotte géolocalisée</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Zéro sous-traitance</span>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-[#00ad9f]/20 rounded-[3rem] rotate-2 transition-transform duration-700 group-hover:-rotate-1 -z-10" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white/10 bg-slate-800 shadow-2xl">
                <Image
                  src="/images/services/demenagement-national.webp"
                  alt="Transport national longue distance professionnel"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-slate-50 p-12 md:p-24 text-center overflow-hidden border border-slate-100 shadow-sm isolate">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
                    Votre ville n'est pas <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">dans la liste ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Pas d'inquiétude. Nos équipes sillonnent les routes quotidiennement. Contactez-nous pour vérifier notre disponibilité exacte sur votre commune de départ ou d'arrivée.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Devis gratuit sous 24h <ArrowRight className="ml-2 h-5 w-5" />
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
