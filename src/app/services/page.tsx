
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";

// Icons
import { 
  ArrowRight, 
  ChevronRight, 
  MapPin, 
  Globe, 
  Building2, 
  Paintbrush, 
  Truck,
  ShieldCheck,
  CheckCircle2,
  Container, 
  HardHat,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Nos Services de Déménagement Prestige | Déménagement du Vexin",
  description: "Découvrez nos solutions de déménagement sur mesure : local, national, international, transfert de bureaux et transport d'œuvres d'art. L'excellence au service de votre mobilité.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/services",
  }
};

const services = [
  {
    title: "Déménagement Local & Vexin",
    description: "Une expertise de proximité inégalée dans le Val-d'Oise et l'Eure pour une transition rapide et sans couture vers votre nouveau foyer.",
    icon: MapPin,
    imageUrl: "/images/services/demenagement-val-d-oise.webp",
    link: "/demenagement-val-d-oise-95"
  },
  {
    title: "Rayonnement Île-de-France",
    description: "Nous maîtrisons la logistique complexe de la région parisienne, des accès étroits aux contraintes de stationnement urbaines.",
    icon: Truck,
    imageUrl: "/images/services/demenagement-ile-de-france.webp",
    link: "/zones-intervention"
  },
  {
    title: "Déménagement National",
    description: "Des liaisons régulières vers toute la France. Votre patrimoine voyage en sécurité dans nos camions capitonnés de dernière génération.",
    icon: Globe,
    imageUrl: "/images/services/demenagement-national.webp",
    link: "/demenagement-national"
  },
  {
    title: "Déménagement International",
    description: "Un accompagnement expert pour vos projets en Europe : gestion douanière, planification rigoureuse et suivi en temps réel.",
    icon: Globe,
    imageUrl: "/images/services/demenagement-international.webp",
    link: "/demenagement-international"
  },
  {
    title: "Garde-Meubles Sécurisé",
    description: "Solutions de stockage flexibles en containers plombés, sous surveillance 24h/24 et hygrométrie contrôlée.",
    icon: Container,
    imageUrl: "/images/services/garde-meubles.webp",
    link: "/demenagement-garde-meubles"
  },
  {
    title: "Transport d'Œuvres d'Art",
    description: "Mise en caisse sur mesure et manipulation gantée. Nous protégeons vos objets précieux comme des pièces de musée.",
    icon: Paintbrush,
    imageUrl: "/images/services/demenagement-oeuvres-d-art.webp",
    link: "/demenagement-oeuvres-art"
  },
  {
    title: "Transfert d'Entreprise",
    description: "Logistique B2B optimisée pour minimiser votre temps d'arrêt. Gestion IT, archives et mobilier tertiaire.",
    icon: Building2,
    imageUrl: "/images/services/demenagement-entreprises.webp",
    link: "/demenagement-entreprise-bureau"
  },
  {
    title: "Manutention d'Objets Lourds",
    description: "Pianos, coffres-forts, billards... Nos techniciens utilisent un matériel de levage spécifique pour l'impossible.",
    icon: HardHat,
    imageUrl: "/images/services/demenagement-objets-lourds.webp",
    link: "/demenagement-objets-lourds"
  }
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-20 overflow-hidden">
        <Image
          src="/images/entete-pages.webp"
          alt="Déménagement haut de gamme"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">Nos Services</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              L'excellence du service
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Nos Solutions sur <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                Mesure.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-light">
              Bien plus qu'un simple transport, nous orchestrons votre mobilité avec la précision d'une orfèvrerie. Découvrez notre palette d'expertises.
            </p>
          </div>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Une sérénité <br />
                <u className="decoration-[#00ad9f] decoration-4 underline-offset-4">sans compromis.</u>
              </h2>
              
              <div className="space-y-5 text-lg text-slate-500 font-light leading-relaxed">
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous transformons une étape de vie souvent stressante en une expérience fluide et maîtrisée. Notre approche repose sur trois piliers : la technicité de nos équipes, la qualité de nos équipements et un interlocuteur dédié pour chaque projet.
                </p>
                <p>
                  Que vous emménagiez à deux rues d'ici ou à l'autre bout de la France, nous appliquons la même rigueur et le même soin à la protection de votre patrimoine.
                </p>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6">
                    <CheckCircle2 className="h-6 w-6 text-[#00ad9f] mb-1" />
                    <span className="text-xl font-bold text-slate-900">100% Salariés</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Équipes formées</span>
                 </div>
                 <div className="flex flex-col gap-2 border-l-4 border-[#00ad9f] pl-6">
                    <ShieldCheck className="h-6 w-6 text-[#00ad9f] mb-1" />
                    <span className="text-xl font-bold text-slate-900">Assurance</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Garantie totale</span>
                 </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-slate-100 rounded-[3rem] rotate-3 -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/accueil/equipe-demenagement-du-vexin.webp"
                  alt="Équipe professionnelle en action"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">L'expertise sous toutes ses formes</h2>
            <p className="text-slate-500 text-lg font-light">
              Explorez nos prestations et trouvez la solution parfaitement adaptée à votre besoin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Link 
                href={service.link} 
                key={index} 
                className="group flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#00ad9f]/30 transition-all duration-500 rounded-[2.5rem] overflow-hidden hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Icône flottante */}
                  <div className="absolute bottom-6 left-6 h-14 w-14 rounded-2xl bg-white/95 backdrop-blur shadow-xl flex items-center justify-center text-[#00ad9f] group-hover:scale-110 transition-transform duration-500">
                    <service.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#00ad9f] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-light mb-6">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-sm font-bold text-[#00ad9f] mt-auto">
                    En savoir plus 
                    <ArrowRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- BIG CTA SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="relative max-w-5xl mx-auto rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-white overflow-hidden shadow-2xl isolate">
            {/* Glow décoratif */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Prêt pour votre <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                  prochain chapitre ?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Obtenez une étude personnalisée et gratuite en moins de 24h. Votre conseiller dédié vous accompagne dès aujourd'hui.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)] transition-all hover:scale-105" asChild>
                  <Link href="/demande-devis">Démarrer mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full h-16 px-10 text-lg font-bold border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all" asChild>
                  <a href="tel:+33130751235">Appeler un conseiller</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
