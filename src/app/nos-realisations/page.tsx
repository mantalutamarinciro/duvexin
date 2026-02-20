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
  Home, 
  Weight 
} from "lucide-react";

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Nos Réalisations | Déménagements Complexes & Études de Cas",
  description: "Découvrez nos études de cas : transferts d'entreprises, villas de prestige, passage par fenêtre. La preuve de notre savoir-faire par l'exemple.",
  alternates: {
    canonical: "https://demenagementduvexin.fr/nos-realisations",
  }
};

const CASE_STUDIES = [
  {
    title: "Transfert de bureaux high-tech à La Défense",
    category: "Déménagement d'Entreprise",
    icon: Briefcase,
    imageUrl: "https://picsum.photos/seed/defense-office/800/800",
    description: "Planification millimétrée pour le transfert d'un siège social de 150 postes, incluant la migration sécurisée d'une salle de serveurs. L'opération a été réalisée intégralement sur un week-end pour garantir une continuité d'activité totale aux collaborateurs dès le lundi matin à 8h.",
    challenges: [
      "Logistique complexe en Immeuble de Grande Hauteur (IGH) avec accès restreints.",
      "Manutention et emballage antistatique de matériel informatique et serveurs sensibles.",
      "Respect d'un cahier des charges et d'un chronogramme très stricts."
    ]
  },
  {
    title: "Villa de Maître en bord de Seine",
    category: "Déménagement Prestige",
    icon: Home,
    imageUrl: "https://picsum.photos/seed/seine-villa/800/800",
    description: "Déménagement complet d'une propriété de 500m² à Saint-Germain-en-Laye, incluant une collection d'art privée et du mobilier d'époque. Un soin extrême a été apporté à la protection des biens, ainsi qu'aux murs et parquets centenaires de la demeure.",
    challenges: [
      "Emballage sur-mesure (tamponnage et caisserie) pour des œuvres d'art fragiles.",
      "Mise en place d'un monte-meubles sur un terrain escarpé et arboré.",
      "Discrétion absolue et respect de la confidentialité exigée par le client."
    ]
  },
  {
    title: "Piano à queue en appartement haussmannien",
    category: "Objet Lourd & Fragile",
    icon: Weight,
    imageUrl: "https://picsum.photos/seed/piano-move/800/800",
    description: "Le passage délicat d'un piano à queue de concert par une fenêtre au 4ème étage d'un immeuble parisien, la cage d'escalier ne permettant pas le passage de l'instrument. L'opération a nécessité une coordination parfaite entre l'opérateur nacelle et les porteurs.",
    challenges: [
      "Obtention des arrêtés de stationnement de voirie dans une rue parisienne très passante.",
      "Levage d'un instrument de près de 400kg à plus de 15 mètres de hauteur.",
      "Coordination logistique pour bloquer la circulation le temps du levage."
    ]
  },
];

export default function NosRealisationsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[50vh] flex flex-col justify-center bg-[#0b0f19] text-white pt-24 pb-16 overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/realisations-banner/1920/1080"
          alt="Équipe de déménageurs professionnels en pleine action"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-luminosity grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-xs font-medium text-slate-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-white">Nos Réalisations</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              La preuve par <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                l'exemple.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
              Chaque déménagement est une histoire unique. Découvrez comment nos équipes ont relevé les défis logistiques les plus complexes de nos clients.
            </p>
          </div>
        </div>
      </section>

      {/* --- CASE STUDIES (Zig-Zag Layout) --- */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 space-y-24 lg:space-y-32">
          
          {CASE_STUDIES.map((study, index) => {
            // Alterner l'image à gauche ou à droite une fois sur deux
            const isImageLeft = index % 2 === 0;

            return (
              <div key={index} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                {/* --- BLOC IMAGE --- */}
                <div className={`relative ${isImageLeft ? 'order-1' : 'order-1 lg:order-2'}`}>
                   {/* Forme décorative douce en arrière-plan */}
                   <div className={`absolute -inset-6 bg-slate-200/50 rounded-[3rem] -z-10 transform-gpu ${isImageLeft ? '-rotate-3' : 'rotate-3'}`} />
                   <div className="relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
                      <Image 
                        src={study.imageUrl}
                        alt={study.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                   </div>
                </div>

                {/* --- BLOC TEXTE --- */}
                <div className={`space-y-8 ${isImageLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
                   <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00ad9f] mb-6 shadow-sm">
                        <study.icon className="h-4 w-4" />
                        {study.category}
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        {study.title}
                      </h2>
                   </div>

                   <p className="text-lg text-slate-500 leading-relaxed">
                     {study.description}
                   </p>

                   <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                         Défis logistiques relevés :
                      </h3>
                      <ul className="space-y-4">
                        {study.challenges.map((challenge, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-[#00ad9f] shrink-0 mt-0.5" />
                              <span className="text-slate-600 leading-relaxed">{challenge}</span>
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
      <section className="py-20 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[3rem] bg-[#0f172a] p-10 md:p-16 lg:p-24 text-center overflow-hidden shadow-2xl isolate">
               
               {/* Deco de fond fluide */}
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/15 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
                    Vous avez un projet <br className="hidden md:block"/>
                    <span className="text-[#00ad9f]">hors-norme ?</span>
                 </h2>
                 <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-light">
                    C'est notre spécialité. Confiez-nous vos contraintes (délais, volumes, accès difficiles), nous vous apporterons la solution technique adaptée.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,173,159,0.4)] relative z-20" asChild>
                       <Link href="/demande-de-devis">
                          Obtenir une étude sur-mesure <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-base font-medium border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all relative z-20" asChild>
                       <a href="tel:+33144935486">Échanger avec un expert</a>
                    </Button>
                 </div>
               </div>

            </div>
         </div>
      </section>

    </main>
  );
}
