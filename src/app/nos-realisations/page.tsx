
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";

// Icons
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Briefcase, 
  Weight,
  Trophy,
  Star
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Nos Réalisations | Déménagements Complexes & Études de Cas",
  description: "Découvrez nos succès : transferts de sièges sociaux, déménagements de villas de luxe et transport d'objets lourds. L'excellence Déménagement du Vexin par l'exemple.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/nos-realisations",
  }
};

const CASE_STUDIES = [
  {
    title: "Transfert de bureaux high-tech à La Défense",
    category: "Déménagement d'Entreprise",
    icon: Briefcase,
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
    description: "Planification millimétrée pour le transfert d'un siège social de 150 postes, incluant la migration sécurisée d'une salle de serveurs. L'opération a été réalisée intégralement sur un week-end pour garantir une continuité d'activité totale dès le lundi matin.",
    challenges: [
      "Logistique en Immeuble de Grande Hauteur (IGH) avec accès restreints.",
      "Manutention et emballage antistatique de serveurs sensibles.",
      "Respect d'un chronogramme strict (démarrage lundi 8h00)."
    ]
  },
  {
    title: "Villa de Maître en bord de Seine",
    category: "Déménagement Prestige",
    icon: Star,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    description: "Déménagement d'une propriété de 500m² à Saint-Germain-en-Laye. Nous avons orchestré le transfert d'une collection d'art privée et de mobilier d'époque Louis XV avec une protection spécifique pour les parquets et moulures centenaires.",
    challenges: [
      "Emballage sur-mesure (caisserie bois) pour œuvres d'art fragiles.",
      "Mise en place d'un monte-meubles sur terrain escarpé et arboré.",
      "Discrétion absolue et protocole de confidentialité."
    ]
  },
  {
    title: "Piano à queue : Le défi haussmannien",
    category: "Objet Lourd & Fragile",
    icon: Weight,
    imageUrl: "https://images.unsplash.com/photo-1552423814-24830a23b927?q=80&w=800",
    description: "Passage délicat d'un piano à queue de concert par une fenêtre au 4ème étage d'un immeuble parisien. La cage d'escalier ne permettant pas le passage, nous avons déployé une nacelle spécifique et une équipe de 4 porteurs spécialisés.",
    challenges: [
      "Obtention des arrêtés de voirie dans une rue parisienne étroite.",
      "Levage d'un instrument de 400kg à plus de 15 mètres de hauteur.",
      "Coordination logistique avec interruption temporaire de circulation."
    ]
  },
];

export default function NosRealisationsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[60vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?q=80&w=1920"
          alt="Expertise déménagement"
          fill
          priority
          className="object-cover opacity-20 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4">
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors font-bold uppercase tracking-widest">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-[#00ad9f] font-bold uppercase tracking-widest">Nos Réalisations</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-400 mb-6 backdrop-blur-sm">
              <Trophy className="h-4 w-4" />
              Savoir-faire et Maîtrise Technique
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              La preuve par <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-200">
                l'exemple.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              Parce qu'un grand projet demande une expertise prouvée. Découvrez comment nous relevons quotidiennement les défis logistiques les plus complexes de nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* --- CHIFFRES CLÉS RAPIDES --- */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Projets complexes / an", value: "150+" },
            { label: "Taux de satisfaction", value: "99%" },
            { label: "Objets fragiles protégés", value: "15k+" },
            { label: "Années d'expertise", value: "15+" }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="text-2xl md:text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CASE STUDIES (Zig-Zag Layout) --- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 space-y-32">
          
          {CASE_STUDIES.map((study, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <div key={index} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* --- BLOC IMAGE --- */}
                <div className={`relative group ${isImageLeft ? 'order-1' : 'order-1 lg:order-2'}`}>
                   <div className={`absolute -inset-6 bg-slate-100 rounded-[3rem] -z-10 transform-gpu transition-transform duration-500 group-hover:scale-105 ${isImageLeft ? '-rotate-2' : 'rotate-2'}`} />
                   <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                      <Image 
                        src={study.imageUrl}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                   </div>
                </div>

                {/* --- BLOC TEXTE --- */}
                <div className={`space-y-8 ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
                   <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-[#00ad9f]/5 border border-[#00ad9f]/20 px-4 py-2 text-sm font-bold text-[#00ad9f]">
                        <study.icon className="h-5 w-5" />
                        {study.category}
                      </div>
                      <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
                        {study.title}
                      </h2>
                   </div>

                   <p className="text-lg text-slate-600 leading-relaxed font-light italic">
                     "{study.description}"
                   </p>

                   <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-3">
                         <div className="h-px bg-slate-200 flex-grow" />
                         Défis techniques relevés
                      </h3>
                      <ul className="grid gap-4">
                        {study.challenges.map((challenge, i) => (
                           <li key={i} className="flex items-start gap-4 group/item">
                              <div className="h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#00ad9f] transition-colors">
                                <CheckCircle2 className="h-4 w-4 text-[#00ad9f] group-hover/item:text-white" />
                              </div>
                              <span className="text-slate-700 leading-relaxed font-medium">{challenge}</span>
                           </li>
                        ))}
                      </ul>
                   </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-10 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ad9f]/10 rounded-full blur-[140px] -z-10 translate-x-1/4 -translate-y-1/4" />
               <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -z-10 -translate-x-1/4 translate-y-1/4" />
               
               <div className="relative z-10 space-y-10">
                 <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Votre projet est <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      hors-norme ?
                    </span>
                 </h2>
                 <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                    Accès restreints, délais serrés ou mobilier de très haute valeur ? Ne confiez pas votre sérénité au hasard. Nos experts dessinent pour vous la solution technique idéale.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                    <Button size="lg" className="rounded-full h-16 px-12 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_50px_-10px_rgba(0,173,159,0.5)]" asChild>
                       <Link href="/demande-devis">
                          Démarrer mon étude gratuite <ArrowRight className="ml-2 h-5 w-5" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-16 px-12 text-lg font-bold border-slate-700 text-white hover:bg-white hover:text-slate-900 transition-all shadow-xl" asChild>
                       <a href="tel:+33130751235">Consulter un expert</a>
                    </Button>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
}
