
import { PriceEstimator } from "@/components/price-estimator";
import { 
  TrendingUp, 
  ShieldCheck, 
  Euro, 
  ChevronRight, 
  LayoutGrid,
  CheckCircle2,
  Info
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TarifsPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      
      {/* --- HEADER --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Tarifs & Estimation</span>
            </nav>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Combien coûte votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                déménagement ?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Transparence totale, prix justes et devis ferme sous 24h. Utilisez notre simulateur pour estimer votre budget en quelques clics.
            </p>
          </div>
        </div>
      </section>

      {/* --- ESTIMATOR SECTION --- */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 lg:-mt-20 relative z-20 pb-24">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-16">
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Simulateur de budget</h2>
            <p className="text-slate-500 font-light">Ajustez les curseurs pour obtenir une estimation précise.</p>
          </div>
          
          <PriceEstimator />
        </div>
      </section>

      {/* --- EXPLICATIONS TARIFS --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Comprendre le <br/> <span className="text-[#00ad9f]">prix au m³.</span>
              </h2>
              <div className="space-y-6 text-slate-600 font-light text-lg leading-relaxed">
                <p>
                  Le tarif d'un déménagement ne se limite pas au simple cubage. Il repose sur une équation logistique précise qui inclut le temps de main-d'œuvre, les frais de route et le niveau de protection souhaité.
                </p>
                <div className="grid sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <LayoutGrid className="h-5 w-5 text-[#00ad9f]" /> Les Accès
                    </h4>
                    <p className="text-sm">La présence d'un ascenseur, le nombre d'étages et la distance de portage impactent le temps d'intervention.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#00ad9f]" /> La Période
                    </h4>
                    <p className="text-sm">Les fins de mois et la saison estivale (mai à septembre) sont très demandées, ce qui influe sur les tarifs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 blur-3xl rounded-full" />
              <h3 className="text-2xl font-bold mb-8">Nos engagements tarifaires</h3>
              <ul className="space-y-6">
                {[
                  "Devis définitif et fixe (aucune surprise le jour J)",
                  "Assurance contractuelle incluse sur toutes les formules",
                  "Zéro frais de dossier ou de réservation caché",
                  "Visite technique gratuite et sans engagement"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0" />
                    <span className="text-slate-300 font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-12 pt-10 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Euro className="h-6 w-6 text-[#00ad9f]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Transparence Totale</p>
                    <p className="text-xs text-slate-400">Prix détaillé ligne par ligne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFO BOX --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="h-20 w-20 rounded-3xl bg-[#00ad9f]/10 flex items-center justify-center shrink-0">
              <Info className="h-10 w-10 text-[#00ad9f]" />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-900">Une estimation n'est pas un contrat</h3>
              <p className="text-slate-500 font-light leading-relaxed">
                Le simulateur ci-dessus utilise nos algorithmes de calcul standards. Pour obtenir un prix ferme, nous vous conseillons de planifier une <strong>visite technique gratuite</strong> (physique ou vidéo) avec l'un de nos conseillers experts.
              </p>
              <div className="pt-2">
                <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800" asChild>
                  <Link href="/demande-devis">Réserver une visite gratuite</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-slate-50">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Votre devis ferme <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                      sous 24 heures.
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Ne laissez pas le flou sur les prix gâcher votre projet. Obtenez une proposition détaillée et sans surprise pour votre prochain départ.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-[#00ad9f] text-white hover:bg-[#009286] hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Demander ma proposition fixe <ArrowRight className="ml-2 h-5 w-5" />
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
