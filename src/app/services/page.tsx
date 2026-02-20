import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Icons
import { 
  ArrowRight, 
  ChevronRight, 
  MapPin, 
  Globe, 
  Building2, 
  Box, 
  Paintbrush, 
  Truck,
  ShieldCheck,
  Star,
  CheckCircle2,
  Container, // Pour le stockage
  HardHat // Pour les objets lourds/techniques
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
    description: "Une expertise de proximité inégalée dans le Val-d'Oise pour une transition rapide et sans couture vers votre nouveau foyer.",
    icon: MapPin,
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600",
    link: "/demenagement-val-d-oise-95"
  },
  {
    title: "Rayonnement Île-de-France",
    description: "Nous maîtrisons la logistique complexe de la région parisienne, des accès étroits aux contraintes de stationnement urbaines.",
    icon: Truck,
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600",
    link: "/zones-intervention"
  },
  {
    title: "Déménagement National",
    description: "Des liaisons régulières vers toute la France. Votre patrimoine voyage en sécurité dans nos camions capitonnés de dernière génération.",
    icon: ChevronRight,
    imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=600",
    link: "/demenagement-national"
  },
  {
    title: "Déménagement International",
    description: "Un accompagnement expert pour vos projets en Europe : gestion douanière, planification rigoureuse et suivi en temps réel.",
    icon: Globe,
    imageUrl: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=600",
    link: "#"
  },
  {
    title: "Garde-Meubles Haute Sécurité",
    description: "Solutions de stockage flexibles en containers plombés, sous surveillance 24h/24 et hygrométrie contrôlée.",
    icon: Container,
    imageUrl: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=600",
    link: "/demenagement-garde-meubles"
  },
  {
    title: "Transport d'Œuvres d'Art",
    description: "Mise en caisse sur mesure et manipulation gantée. Nous protégeons vos objets précieux comme des pièces de musée.",
    icon: Paintbrush,
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600",
    link: "/demenagement-oeuvres-art"
  },
  {
    title: "Transfert d'Entreprise",
    description: "Logistique B2B optimisée pour minimiser votre temps d'arrêt. Gestion IT, archives et mobilier tertiaire.",
    icon: Building2,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600",
    link: "/demenagement-entreprise-bureau"
  },
  {
    title: "Manutention d'Objets Lourds",
    description: "Pianos, coffres-forts, billards... Nos techniciens utilisent un matériel de levage spécifique pour l'impossible.",
    icon: HardHat,
    imageUrl: "https://images.unsplash.com/photo-1552423814-24830a23b927?q=80&w=600",
    link: "/demenagement-objets-lourds"
  }
];

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920"
          alt="Déménagement haut de gamme"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[#0b0f19]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f19]/20 to-[#0b0f19]/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-400 mb-6 backdrop-blur-md">
            <Star className="h-4 w-4 fill-teal-400" />
            L'excellence du service
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Nos Solutions sur <span className="text-[#00ad9f]">Mesure</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Bien plus qu'un transport, nous orchestrons votre mobilité avec la précision d'une orfèvrerie.
          </p>
        </div>
      </section>

      {/* --- BREADCRUMB --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="container mx-auto px-4 text-sm font-medium flex items-center gap-2 text-slate-500">
          <Link href="/" className="hover:text-[#00ad9f] transition-colors">Accueil</Link>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <span className="text-slate-900 font-bold">Services</span>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
                Une sérénité <br />
                <span className="text-[#00ad9f]">sans compromis.</span>
              </h2>
              <div className="space-y-4 text-lg text-slate-500 leading-relaxed font-light">
                <p>
                  Chez <strong>Déménagement du Vexin</strong>, nous transformons une étape de vie souvent stressante en une expérience fluide et maîtrisée. Notre approche repose sur trois piliers : la technicité de nos équipes, la qualité de nos équipements et un interlocuteur dédié pour chaque projet.
                </p>
                <p>
                  Que vous emménagiez à deux rues d'ici ou à l'autre bout de l'Europe, nous appliquons la même rigueur et le même soin à votre patrimoine.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#00ad9f] h-6 w-6" />
                  <span className="font-bold text-slate-700">100% Salariés</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#00ad9f] h-6 w-6" />
                  <span className="font-bold text-slate-700">Assurance Incluse</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-[#00ad9f]/10 rounded-[3rem] rotate-3 -z-10 blur-xl" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=800"
                  alt="Équipe professionnelle en action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 italic tracking-tight">L'expertise sous toutes ses formes</h2>
            <p className="text-slate-500 text-lg font-light italic">
              Cliquez sur un service pour découvrir le détail de nos prestations et options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-[#00ad9f]">
                    <service.icon className="h-6 w-6" />
                  </div>
                </div>
                
                <CardHeader className="pt-8 px-8">
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-[#00ad9f] transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="px-8 pb-8 flex flex-col justify-between flex-grow">
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>
                  <Button variant="link" className="p-0 h-auto font-bold text-[#00ad9f] group-hover:translate-x-2 transition-transform duration-300 self-start" asChild>
                    <Link href={service.link}>
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- BIG CTA SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="relative max-w-5xl mx-auto rounded-[3rem] bg-[#0f172a] p-12 md:p-24 text-white overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ad9f]/20 rounded-full blur-[100px] -z-1 pointer-events-none translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] -z-1 pointer-events-none -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
                Prêt pour votre <br className="hidden md:block"/>
                <span className="text-[#00ad9f]">prochain chapitre ?</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                Obtenez une étude personnalisée et gratuite en moins de 24h. Votre conseiller dédié vous accompagne dès aujourd'hui pour planifier votre mobilité en toute sérénité.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-[0_20px_40px_-10px_rgba(0,173,159,0.3)] transition-all hover:scale-105" asChild>
                  <Link href="/dashboard/quote">Démarrer mon devis gratuit</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full h-16 px-10 text-lg font-bold border-white/20 text-white hover:bg-white hover:text-slate-900 transition-all">
                  Appelez-nous au 01 23 45 67 89
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}