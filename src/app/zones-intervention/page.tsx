import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { VerifiedTestimonialsSection } from "@/components/testimonials-section";

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
  Route,
  PackageCheck,
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Zones de déménagement | Île-de-France, Normandie, France",
  description: "Consultez nos pages de déménagement par département, trajet national et destination internationale depuis l’Île-de-France et la Normandie.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/zones-intervention",
  }
};


const ILE_DE_FRANCE = [
  { name: "Val-d'Oise (95)", description: "Page départementale et accès aux principales communes desservies autour de Méry-sur-Oise, Cergy et Pontoise.", link: "/demenagement-val-d-oise-95" },
  { name: "Yvelines (78)", description: "Préparation des projets dans les Yvelines, notamment autour de Versailles, Poissy et Saint-Germain-en-Laye.", link: "/demenagement-yvelines-78" },
  { name: "Hauts-de-Seine (92)", description: "Informations sur les accès, le stationnement et les déménagements dans les communes des Hauts-de-Seine.", link: "/demenagement-hauts-de-seine-92" },
  { name: "Paris (75)", description: "Préparation des étages, ascenseurs, portages et autorisations de stationnement à Paris.", link: "/demenagement-paris-75" },
  { name: "Seine-Saint-Denis (93)", description: "Page départementale pour préparer un départ ou une arrivée en Seine-Saint-Denis.", link: "/demenagement-seine-saint-denis-93" },
  { name: "Val-de-Marne (94)", description: "Informations pour préparer un projet résidentiel ou professionnel dans le Val-de-Marne.", link: "/demenagement-val-de-marne-94" },
  { name: "Essonne (91)", description: "Informations et conseils pour préparer un déménagement dans les communes de l’Essonne.", link: "/demenagement-essonne-91" },
  { name: "Seine-et-Marne (77)", description: "Page départementale pour les projets en Seine-et-Marne et les trajets vers l’Île-de-France.", link: "/demenagement-seine-et-marne-77" },
];

const NORMANDIE = [
  { name: "Eure (27)", description: "Préparation des projets autour d’Évreux, Vernon, Bernay et des principales communes de l’Eure.", link: "/demenagement-eure-27" },
  { name: "Seine-Maritime (76)", description: "Informations pour les déménagements autour de Rouen, du Havre et en Seine-Maritime.", link: "/demenagement-seine-maritime-76" },
  { name: "Calvados (14)", description: "Informations pour préparer un déménagement autour de Caen et dans le Calvados.", link: "/demenagement-calvados-14" },
  { name: "Orne (61)", description: "Page départementale pour préparer les trajets, volumes et accès dans l’Orne.", link: "/demenagement-orne-61" },
];

const HAUTS_DE_FRANCE = [
  { name: "Oise (60)", description: "Page départementale pour Beauvais, Compiègne, Creil, Senlis et les principales communes de l’Oise.", link: "/demenagement-oise-60" },
];

const INTERNATIONAL = [
  { name: "Royaume-Uni", description: "Préparer un déménagement vers Londres, Manchester ou une autre destination au Royaume-Uni.", icon: Ship, link: "/demenagement-france-royaume-uni" },
  { name: "Suisse", description: "Informations pour un projet vers Genève, Lausanne, Zurich ou un autre canton suisse.", icon: Navigation, link: "/demenagement-france-suisse" },
  { name: "Belgique", description: "Préparer un trajet entre la France, Bruxelles et les principales villes belges.", icon: Truck, link: "/demenagement-france-belgique" },
  { name: "Luxembourg", description: "Informations pour organiser un déménagement vers le Grand-Duché de Luxembourg.", icon: Building2, link: "/demenagement-france-luxembourg" },
  { name: "Allemagne", description: "Préparer un déménagement vers Berlin, Munich, Francfort ou une autre ville allemande.", icon: Globe, link: "/demenagement-france-allemagne" },
  { name: "Espagne", description: "Préparer un déménagement vers Madrid, Barcelone, Valence ou une autre région espagnole.", icon: Route, link: "/demenagement-france-espagne" },
  { name: "Portugal", description: "Préparer un trajet longue distance vers Lisbonne, Porto ou une autre région du Portugal.", icon: MapPin, link: "/demenagement-france-portugal" },
  { name: "Italie", description: "Préparer un déménagement vers Rome, Milan, Turin ou une autre région italienne.", icon: Route, link: "/demenagement-france-italie" },
];

const NATIONAL = [
  { name: "Lyon (69)", description: "Préparer un déménagement entre l’Île-de-France et la métropole de Lyon.", link: "/demenagement-ile-de-france-lyon" },
  { name: "Marseille (13)", description: "Informations pour un trajet longue distance vers Marseille et la Provence.", link: "/demenagement-ile-de-france-marseille" },
  { name: "Bordeaux (33)", description: "Préparer un déménagement vers Bordeaux, la Gironde et le Sud-Ouest.", link: "/demenagement-ile-de-france-bordeaux" },
  { name: "Lille (59)", description: "Informations pour un déménagement entre l’Île-de-France, Lille et le Nord.", link: "/demenagement-ile-de-france-lille" },
  { name: "Nantes (44)", description: "Préparer un trajet vers Nantes, la Loire-Atlantique et le Grand Ouest.", link: "/demenagement-ile-de-france-nantes" },
  { name: "Toulouse (31)", description: "Informations pour un déménagement vers Toulouse et l’Occitanie.", link: "/demenagement-ile-de-france-toulouse" },
  { name: "Nice (06)", description: "Préparer un trajet vers Nice, la Côte d’Azur et les Alpes-Maritimes.", link: "/demenagement-ile-de-france-nice" },
  { name: "Strasbourg (67)", description: "Trajets étudiés vers l'Alsace et le Grand Est.", link: "/demenagement-ile-de-france-strasbourg" },
  { name: "Rennes (35)", description: "Informations pour un déménagement vers Rennes et la Bretagne.", link: "/demenagement-ile-de-france-rennes" },
];

const listedAreas = [...ILE_DE_FRANCE, ...HAUTS_DE_FRANCE, ...NORMANDIE, ...NATIONAL, ...INTERNATIONAL];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://demenagementduvexin.fr/" },
      { "@type": "ListItem", position: 2, name: "Zones d’intervention", item: "https://demenagementduvexin.fr/zones-intervention" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zones et destinations de déménagement",
    numberOfItems: listedAreas.length,
    itemListElement: listedAreas.map((area, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: area.name,
      url: `https://demenagementduvexin.fr${area.link}`,
    })),
  },
];

export default function InterventionZonePage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      
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
              Zones de déménagement : <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                local, national et international.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light mb-10">
              Retrouvez nos pages par département, nos principaux trajets longue distance et les destinations internationales publiées sur le site.
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
                  <strong>Déménagement du Vexin</strong> prépare des projets au départ ou à l’arrivée de l’Île-de-France, de l’Oise et de la Normandie, ainsi que des trajets nationaux et internationaux.
                </p>
                <p>
                  Chaque page précise les points à anticiper selon la destination : accès, stationnement, distance, volume et informations utiles à transmettre dans la demande de devis.
                </p>
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
                Retrouvez les pages départementales de l’Eure, de la Seine-Maritime, du Calvados et de l’Orne, ainsi que leurs principales communes publiées.
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
                Consultez les pages dédiées aux principales destinations européennes pour préparer les informations propres à votre trajet.
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
                  Voir la destination <ArrowRight className="h-3.5 w-3.5" />
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
                Consultez nos pages de trajets entre l’Île-de-France et les principales métropoles françaises.
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
                Préparer un trajet national <br/> <span className="text-[#00ad9f]">sans oublier les contraintes.</span>
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Un trajet longue distance demande un inventaire fiable, des accès décrits précisément et une date compatible avec les contraintes de départ et d’arrivée.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Volume et inventaire</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Accès aux deux adresses</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Date et distance du trajet</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                  <span className="text-sm font-bold">Formule et options souhaitées</span>
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
      <VerifiedTestimonialsSection />

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
                    La liste présente les principales pages publiées, pas une limite contractuelle de couverture. Décrivez vos deux adresses pour vérifier la faisabilité de votre trajet.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Demander un devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
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
