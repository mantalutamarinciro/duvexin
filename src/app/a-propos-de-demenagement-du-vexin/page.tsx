import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  Heart, 
  Truck, 
  MapPin, 
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Quote
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route"; 
import { cn } from "@/lib/utils";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "L'Entreprise & L'Équipe | Déménagement du Vexin",
  description: "Découvrez l'histoire de Déménagement du Vexin, artisan du déménagement depuis plus de 15 ans. Une équipe familiale dédiée à la protection de votre patrimoine.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/a-propos",
  }
};

// --- DONNÉES STATIQUES ---
const keyStats = [
  { label: "Années d'expertise", value: "15+", icon: Award },
  { label: "Familles installées", value: "2500+", icon: Truck },
  { label: "Taux de satisfaction", value: "98%", icon: Heart },
  { label: "Couverture", value: "France / UE", icon: MapPin },
];

const fallbackTestimonials: FormattedReview[] = [
  { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail ! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés !", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
  { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
  { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. MERCI.", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const teamMembers = [
  { name: "Marin", role: "CEO / Fondateur", imageUrl: "/images/equipe/marin-gerant.webp", description: "Fondateur et âme de l'entreprise, Marin supervise chaque projet avec une exigence artisanale." },
  { name: "Vitalie", role: "Chef d’équipe", imageUrl: "/images/equipe/vitalie-chef-equipe.webp", description: "Véritable chef d'orchestre sur le terrain, il garantit la fluidité et la sécurité des opérations." },
  { name: "Gheorghe", role: "Pilote Logistique", imageUrl: "/images/equipe/gheorghe-chauffeur-poid-lourd.webp", description: "Expert de la conduite sur itinéraires complexes et garant de l'intégrité du chargement." },
  { name: "Andrei", role: "Spécialiste Manutention", imageUrl: "/images/equipe/andrei-demenageur-chauffeur.webp", description: "Mains de velours pour vos objets d'art, pianos et mobiliers les plus fragiles." },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900 flex flex-col min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[70vh] flex flex-col justify-center text-center text-white overflow-hidden bg-[#0b0f19] pt-24 pb-16">
        <Image 
          src="/images/entete-pages.webp"
          alt="L'équipe de Déménagement du Vexin"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[10%] scale-105 animate-in fade-in duration-1000 zoom-in-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/80 via-[#0b0f19]/40 to-[#0b0f19]" />
        
        <div className="relative z-10 container mx-auto px-4 max-w-4xl flex flex-col items-center">
          
          {/* Fil d'Ariane Intégré au Hero */}
          <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-[#00ad9f]">L'Entreprise</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold uppercase tracking-widest text-teal-400 mb-8 backdrop-blur-md shadow-2xl">
            <Sparkles className="h-4 w-4" />
            Artisans de votre mobilité
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            L'humain au cœur de <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
              votre nouveau départ.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mx-auto max-w-2xl">
            Découvrez l'histoire d'une entreprise familiale qui a fait le choix de l'excellence, de la transparence et de la protection absolue de votre patrimoine.
          </p>
        </div>
      </section>

      {/* --- STORY SECTION (Editorial Layout) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Deco background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Colonne Texte */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                  Une histoire <br />
                  <span className="text-[#00ad9f]">de confiance.</span>
                </h2>
                <div className="h-1.5 w-16 bg-[#00ad9f] rounded-full" />
              </div>
              
              <div className="space-y-6 text-lg text-slate-500 leading-relaxed font-light">
                <p>
                  Fondée sur des valeurs de rigueur et de respect, <strong>Déménagement du Vexin</strong> est née d'une ambition simple : redonner ses lettres de noblesse au métier de déménageur.
                </p>
                <p>
                  Ici, pas de sous-traitance obscure ni de plateformes déshumanisées. Nous avons fait le choix fort de travailler exclusivement avec nos propres équipes salariées. Des hommes formés, passionnés et équipés du meilleur matériel logistique.
                </p>
              </div>

              <ul className="space-y-4 pt-2">
                {[
                  "Zéro sous-traitance, 100% salariés formés.",
                  "Flotte de véhicules capitonnés de dernière génération.",
                  "Protection sur-mesure pour mobiliers précieux."
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" />
                    </div>
                    <span className="text-slate-700 font-bold text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Colonne Image + Citation */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/a-propos/societe-demenagement-du-vexin.webp"
                  alt="Équipe de Déménagement du Vexin au travail"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </div>
              
              {/* Carte Citation Superposée */}
              <div className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-12 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-sm hidden sm:block">
                <Quote className="h-8 w-8 text-[#00ad9f]/30 mb-4" />
                <p className="text-slate-800 font-bold leading-snug italic mb-4">
                  "Nous ne transportons pas des meubles, nous déplaçons des tranches de vie. Cela exige un respect absolu."
                </p>
                <p className="text-xs font-black uppercase tracking-widest text-[#00ad9f]">Marin — Fondateur</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-[3rem] bg-[#0f172a] p-10 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ad9f]/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {keyStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col space-y-3 relative group">
                  <stat.icon className="h-8 w-8 text-[#00ad9f] mb-2 transform transition-transform group-hover:-translate-y-1 group-hover:scale-110 duration-300" />
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tight">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                  {/* Ligne séparatrice (sauf dernier) sur Desktop */}
                  {idx !== keyStats.length - 1 && (
                    <div className="hidden md:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-12 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUES BENTO GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Nos Piliers
            </h2>
            <p className="text-lg text-slate-500 font-light">
              L'ADN de notre entreprise repose sur trois engagements non négociables.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Carte 1 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#00ad9f]/30 transition-all duration-500 group flex flex-col">
              <div className="h-16 w-16 bg-[#00ad9f]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] group-hover:text-white text-[#00ad9f] transition-colors duration-500">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Excellence</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Un savoir-faire technique inégalé. Nos équipes sont formées à l'emballage d'œuvres d'art, au portage lourd et à la protection millimétrée de vos intérieurs.
              </p>
            </div>

            {/* Carte 2 (Highlight) */}
            <div className="bg-[#0f172a] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 blur-3xl rounded-full" />
              <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-teal-400 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4 relative z-10">Transparence</h3>
              <p className="text-slate-400 leading-relaxed font-light relative z-10">
                Une relation de confiance absolue. Nos devis sont définitifs, détaillés ligne par ligne. Nous nous engageons sur les délais et respectons la parole donnée.
              </p>
            </div>

            {/* Carte 3 */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-[#00ad9f]/30 transition-all duration-500 group flex flex-col">
              <div className="h-16 w-16 bg-[#00ad9f]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#00ad9f] group-hover:text-white text-[#00ad9f] transition-colors duration-500">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Bienveillance</h3>
              <p className="text-slate-500 leading-relaxed font-light">
                Nous savons qu'un déménagement est une étape chargée en émotions. Nos équipes interviennent avec courtoisie, écoute et un profond respect pour votre intimité.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- TEAM SECTION (Magazine Style) --- */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
              Les visages derrière <br/> la <span className="text-[#00ad9f]">performance</span>.
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Des professionnels salariés, fiers de leur métier. Chez nous, la qualité d'exécution passe d'abord par la cohésion d'une équipe soudée.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="group relative rounded-[2.5rem] overflow-hidden bg-slate-100 isolate cursor-crosshair">
                <div className="relative aspect-[3/4] w-full">
                  <Image 
                    src={member.imageUrl} 
                    alt={`Portrait de ${member.name}, ${member.role}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:contrast-125" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Overlay Noir Elegant */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Texte de description au survol */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm font-medium leading-relaxed drop-shadow-md">
                      {member.description}
                    </p>
                  </div>
                </div>
                
                {/* Bandeau permanent */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0f172a] to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-md px-3 py-1 border border-white/20">
                    <span className="text-[10px] font-black text-teal-300 uppercase tracking-widest">{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AVIS CLIENTS --- */}
      <TestimonialsSection reviews={fallbackTestimonials} />

    </main>
  );
}