import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

// Icons
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Truck,
  Box,
  Briefcase,
  Music,
  ShieldCheck,
  Users // Ajouté pour corriger l'erreur de compilation
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Déménagement Évreux (27) | Agence Normandie Marne Transdem",
  description: "Marne Transdem Évreux : expert du déménagement en Normandie (Eure, Calvados, Seine-Maritime). Local, National et International. Devis gratuit en 24h.",
};

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const SERVICES = [
  { title: "Déménagement Local", icon: MapPin, description: "Expertise complète pour vos projets à Évreux et dans toute l'agglomération." },
  { title: "Longue Distance", icon: Truck, description: "Liaisons quotidiennes vers Paris, Lyon, et toutes les régions de France." },
  { title: "Stockage Sécurisé", icon: Box, description: "Garde-meubles chauffé et télésurveillé pour vos transitions sereines." },
  { title: "Transfert Pro", icon: Briefcase, description: "Solutions dédiées aux entreprises normandes pour minimiser l'arrêt d'activité." },
  { title: "Objets Lourds", icon: Music, description: "Manutention spécialisée pour pianos, coffres-forts et mobiliers volumineux." },
  { title: "International", icon: Globe, description: "Accompagnement douanier et logistique pour vos départs à l'étranger." },
];

const LOCATIONS = ["Évreux", "Rouen", "Le Havre", "Caen", "Vernon", "Dieppe", "Lisieux", "Alençon", "Coutances", "Cherbourg"];

export default function EvreuxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/normandy-evreux/1920/1080"
          alt="Cathédrale d'Évreux et paysage normand"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-50" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-6">
            <nav className="flex items-center text-sm font-medium text-slate-300 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#00ad9f] transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-white">Agence d'Évreux</span>
            </nav>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Votre déménageur de <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">confiance en Normandie.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
              L'expertise de l'agence d'Évreux pour vos projets locaux, nationaux et internationaux. Un service gants blancs au cœur de l'Eure.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-base bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg transition-all hover:scale-105" asChild>
                <Link href="/dashboard/quote">Estimation Gratuite <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & INFO CARDS --- */}
      <section className="relative -mt-20 z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Contact Card */}
            <Card className="lg:col-span-1 border-none shadow-xl rounded-3xl overflow-hidden bg-white group">
              <div className="h-2 bg-[#00ad9f]" />
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#00ad9f]/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#00ad9f]" />
                  </div>
                  Nous contacter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <p className="text-slate-600 leading-relaxed font-medium">
                      22 Rue Isambard<br />
                      27000 Évreux, Normandie
                    </p>
                  </div>
                  <a href="tel:+33374474477" className="flex items-center gap-4 group/item">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover/item:bg-[#00ad9f]/20 transition-colors">
                      <Phone className="h-5 w-5 text-slate-600 group-hover/item:text-[#00ad9f]" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">03 74 47 44 77</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-slate-600" />
                    </div>
                    <span className="text-sm text-slate-600 truncate">contact@vexindemenagement.fr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Us / Content Card */}
            <Card className="lg:col-span-2 border-none shadow-xl rounded-3xl bg-white p-8 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Pourquoi choisir l'Agence d'Évreux ?</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-slate-900">Ancrage Normand</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Parfaite connaissance du territoire de l'Eure (27) et de la Seine-Maritime (76).</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="font-bold text-slate-900">Équipes Internes</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Aucun prestataire externe : nos déménageurs sont des salariés formés à l'excellence.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Nos Solutions Mobilité</h2>
            <p className="text-slate-500 mt-4">Une expertise sur-mesure pour chaque type de besoin.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-white border border-slate-200 p-8 rounded-3xl hover:border-[#00ad9f]/50 hover:shadow-lg transition-all group">
                <service.icon className="h-10 w-10 text-[#00ad9f] mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMAGE & TRUST SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#00ad9f]/10 rounded-[40px] rotate-2 transform -z-10" />
              <Image
                src="https://picsum.photos/seed/mover-working/800/600"
                alt="Expert déménageur à l'œuvre"
                width={800}
                height={600}
                className="rounded-[32px] shadow-2xl object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block max-w-[200px]">
                <p className="text-xs font-bold text-slate-900 mb-1">Qualité Garantie</p>
                <p className="text-[10px] text-slate-500">Protection totale des meubles fragiles par nos experts.</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                Votre projet, <br />
                <span className="text-[#00ad9f]">notre priorité absolue.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Intervention sous 24h à 48h pour vos estimations.",
                  "Emballages spécifiques haute protection inclus.",
                  "Interlocuteur unique pour un suivi simplifié.",
                  "Assurance Ad Valorem complète pour vos biens de valeur."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-[#00ad9f] transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-[#00ad9f] group-hover:text-white" />
                    </div>
                    <span className="text-slate-600 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CITIES CLOUD --- */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Intervention Grand Ouest</h2>
            <p className="text-slate-400 font-light">Nos camions sillonnent quotidiennement la Normandie et ses alentours.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {LOCATIONS.map((loc) => (
              <span key={loc} className="bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm font-semibold hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all cursor-default">
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-br from-slate-900 to-slate-800 p-12 md:p-20 relative overflow-hidden shadow-2xl isolate">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
              Prêt pour votre <span className="text-[#00ad9f]">départ ?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light">
              Contactez l'agence d'Évreux dès aujourd'hui pour planifier votre visite technique gratuite.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.5)] text-white" asChild>
                <Link href="/dashboard/quote">Demander mon devis gratuit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}