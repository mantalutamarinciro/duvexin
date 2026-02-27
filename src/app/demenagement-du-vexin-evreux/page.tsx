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
  Users,
  Star,
  Map as MapIcon // On renomme Map en MapIcon pour éviter le conflit avec l'objet JS Map
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
  { title: "Déménagement Local", icon: MapPin, description: "Expertise complète pour vos projets à Évreux, dans l'Eure et dans toute la Normandie." },
  { title: "Longue Distance", icon: Truck, description: "Liaisons régulières vers Paris, le sud de la France et la Bretagne." },
  { title: "Stockage Sécurisé", icon: Box, description: "Garde-meubles chauffé, plombé et télésurveillé pour vos transitions sereines." },
  { title: "Transfert Pro", icon: Briefcase, description: "Solutions dédiées aux entreprises et administrations pour minimiser l'arrêt d'activité." },
  { title: "Objets Lourds", icon: Music, description: "Manutention ultra-spécialisée pour pianos, coffres-forts et mobiliers massifs normands." },
  { title: "International", icon: Globe, description: "Accompagnement douanier et logistique sur-mesure pour vos départs à l'étranger." },
];

const LOCATIONS = ["Évreux", "Rouen", "Le Havre", "Caen", "Vernon", "Dieppe", "Lisieux", "Alençon", "Coutances", "Cherbourg"];

export default function EvreuxPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-32 lg:pt-40 pb-32 overflow-hidden">
        <Image 
          src="/images/entete-pages.webp"
          alt="Déménageur préparant un chargement sécurisé"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-luminosity grayscale-[20%] scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-4xl space-y-6">
            
            {/* Fil d'Ariane Intégré au Hero */}
            <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Agence d'Évreux</span>
            </nav>
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 mb-8 shadow-sm backdrop-blur-md">
              <MapPin className="h-4 w-4" />
              Siège Normand
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
              Votre déménageur de <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                confiance en Normandie.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10 leading-relaxed">
              Toute la force de frappe logistique de Déménagement du Vexin déployée depuis notre agence d'Évreux pour vos projets locaux, nationaux et internationaux.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button size="lg" className="rounded-full h-16 px-10 text-base font-bold bg-[#00ad9f] hover:bg-[#009286] text-white shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105" asChild>
                <Link href="/demande-devis">
                  Estimation Gratuite <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT & INFO CARDS --- */}
      <section className="relative -mt-24 z-20 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Contact Card */}
            <Card className="lg:col-span-1 border border-slate-100 shadow-2xl rounded-[2.5rem] overflow-hidden bg-white group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-2 bg-gradient-to-r from-[#00ad9f] to-teal-300" />
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-extrabold text-slate-900 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-[#00ad9f]/10 flex items-center justify-center group-hover:bg-[#00ad9f] transition-colors duration-500">
                    <MapPin className="h-7 w-7 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                  </div>
                  Nous contacter
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <p className="text-slate-500 leading-relaxed font-light text-lg">
                      22 Rue Isambard<br />
                      <strong className="text-slate-900 font-bold">27000 Évreux</strong>
                    </p>
                  </div>
                  <a href="tel:+33374474477" className="flex items-center gap-4 group/phone p-4 -ml-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover/phone:bg-[#00ad9f]/20 transition-colors">
                      <Phone className="h-6 w-6 text-slate-600 group-hover/phone:text-[#00ad9f]" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Téléphone</p>
                       <span className="text-xl font-extrabold text-slate-900 tracking-tight">03 74 47 44 77</span>
                    </div>
                  </a>
                  <a href="mailto:contact@vexindemenagement.fr" className="flex items-center gap-4 group/mail p-4 -ml-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover/mail:bg-[#00ad9f]/20 transition-colors">
                      <Mail className="h-6 w-6 text-slate-600 group-hover/mail:text-[#00ad9f]" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                       <span className="text-base font-semibold text-slate-900 truncate">contact@vexindemenagement.fr</span>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Why Us / Content Card */}
            <Card className="lg:col-span-2 border border-slate-100 shadow-2xl rounded-[2.5rem] bg-white p-10 md:p-14 h-full flex flex-col justify-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6">
                  <ShieldCheck className="h-4 w-4 text-[#00ad9f]" />
                  Garantie Qualité
                </div>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                  Pourquoi choisir notre <br/> <span className="text-[#00ad9f]">Agence d'Évreux ?</span>
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-10 mt-10">
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
                      <MapIcon className="h-7 w-7 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Ancrage Normand</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Une parfaite connaissance du territoire de l'Eure (27), de la Seine-Maritime (76) et du Calvados (14).</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100">
                      <Users className="h-7 w-7 text-orange-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Équipes Internes</h4>
                    <p className="text-slate-500 font-light leading-relaxed">Aucun prestataire externe : nos déménageurs sont des salariés permanents formés à l'excellence.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Nos Solutions Mobilité</h2>
            <p className="text-lg text-slate-500 font-light">Une expertise logistique sur-mesure pour chaque type de besoin, au départ ou à l'arrivée d'Évreux.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {SERVICES.map((service, index) => (
              <div key={index} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
                <div className="h-16 w-16 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] transition-colors duration-500">
                   <service.icon className="h-8 w-8 text-[#00ad9f] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- IMAGE & TRUST SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#00ad9f]/10 rounded-[3rem] rotate-3 transform-gpu -z-10 transition-transform duration-700 group-hover:-rotate-1" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src="/images/services/emballage-demenagement.webp"
                  alt="Déménageur protégeant un objet de valeur avec un soin extrême"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2rem] shadow-2xl hidden md:block max-w-[280px] border border-slate-50">
                <div className="flex gap-1 mb-2">
                   {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-base font-extrabold text-slate-900 mb-2 leading-tight">Qualité Garantie</p>
                <p className="text-sm text-slate-500 font-light leading-relaxed">Protection totale de vos meubles et objets les plus fragiles par nos experts.</p>
              </div>
            </div>
            
            <div className="space-y-10 lg:pl-10">
              <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Votre projet, <br />
                <span className="text-[#00ad9f]">notre priorité absolue.</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Intervention rapide (24h/48h) pour vos visites techniques.",
                  "Fourniture d'emballages spécifiques haute protection.",
                  "Un interlocuteur unique basé à Évreux pour un suivi simplifié.",
                  "Assurance Ad Valorem complète pour vos biens de valeur."
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-5 group">
                    <div className="h-10 w-10 shrink-0 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:bg-[#00ad9f] transition-colors duration-300 border border-teal-100">
                      <CheckCircle2 className="h-5 w-5 text-[#00ad9f] group-hover:text-white" />
                    </div>
                    <span className="text-slate-600 font-medium text-lg">{text}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                 <Button asChild variant="outline" className="rounded-full h-14 px-8 font-bold border-slate-200 text-slate-700 hover:text-[#00ad9f] hover:border-[#00ad9f] hover:bg-[#00ad9f]/5 transition-all">
                    <Link href="/services">Voir tous nos engagements</Link>
                 </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CITIES CLOUD --- */}
      <section className="py-24 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 my-12 overflow-hidden relative isolate">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 tracking-tight">Intervention Grand Ouest</h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed">Depuis Évreux, nos camions sillonnent quotidiennement la Normandie, la Bretagne et l'Île-de-France.</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {LOCATIONS.map((loc) => (
              <span key={loc} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-8 py-4 text-base font-semibold hover:bg-[#00ad9f]/20 hover:border-[#00ad9f]/50 transition-all duration-300 cursor-default">
                {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

      {/* --- CTA FINAL --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-5xl mx-auto rounded-[4rem] bg-[#0f172a] p-12 md:p-24 relative overflow-hidden shadow-2xl isolate">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Prêt pour votre <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">départ ?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Contactez l'agence d'Évreux dès aujourd'hui pour planifier votre visite technique gratuite et obtenez un devis ferme sous 24h.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                <Link href="/demande-devis">
                  Demander mon devis gratuit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}