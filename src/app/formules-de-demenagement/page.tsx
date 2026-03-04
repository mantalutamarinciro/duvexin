import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Package, 
  Sparkles, 
  Gift, 
  ShieldCheck, 
  Clock, 
  Info,
  BadgeCheck,
  Star
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FORMULAS = [
  {
    id: "eco",
    title: "Économique",
    priceText: "Le meilleur prix",
    icon: Gift,
    description: "La solution idéale pour les petits budgets et les volumes simples. Vous préparez, nous transportons.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: "standard",
    title: "Standard",
    priceText: "L'équilibre parfait",
    icon: Package,
    description: "Notre offre la plus populaire. Nous gérons le mobilier et les objets fragiles pour votre sécurité.",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
    popular: true,
  },
  {
    id: "prestige",
    title: "Prestige",
    priceText: "Sérénité absolue",
    icon: Sparkles,
    description: "Le service gants blancs. Nos équipes s'occupent de l'intégralité de votre déménagement.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  }
];

const FEATURES = [
  { label: "Mise à disposition du camion capitonné", eco: true, std: true, pre: true },
  { label: "Protection du mobilier sous couvertures", eco: true, std: true, pre: true },
  { label: "Chargement, transport et déchargement", eco: true, std: true, pre: true },
  { label: "Mise en place des meubles dans les pièces", eco: true, std: true, pre: true },
  { label: "Assurance contractuelle incluse", eco: true, std: true, pre: true },
  { label: "Fourniture des cartons et adhésifs", eco: false, std: true, pre: true },
  { label: "Démontage et remontage du mobilier", eco: false, std: true, pre: true },
  { label: "Emballage de la vaisselle et du fragile", eco: false, std: true, pre: true },
  { label: "Mise sous housse de la literie", eco: false, std: true, pre: true },
  { label: "Emballage des objets non fragiles (livres, etc.)", eco: false, std: false, pre: true },
  { label: "Mise en penderies des vêtements sur cintres", eco: false, std: false, pre: true },
  { label: "Déballage du fragile à l'arrivée", eco: false, std: false, pre: true },
];

export default function FormulesPage() {
  return (
    <main className="bg-slate-50 min-h-screen selection:bg-primary/20 selection:text-primary">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/blog/formules-demenagement.webp"
            alt="Nos formules de déménagement"
            fill
            priority
            className="object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <nav className="flex items-center justify-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
            <span className="text-primary">Nos Formules</span>
          </nav>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            3 niveaux de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
              tranquillité.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Du simple transport à l'installation complète "clés en main". 
            Choisissez la formule qui correspond à votre rythme et à votre budget.
          </p>
        </div>
      </section>

      {/* --- CARDS SECTION --- */}
      <section className="py-20 lg:py-32 -mt-16 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {FORMULAS.map((formula) => (
              <Card 
                key={formula.id} 
                className={cn(
                  "relative rounded-[2.5rem] border-none shadow-2xl flex flex-col transition-all duration-500 overflow-hidden",
                  formula.popular ? "lg:scale-105 z-10" : "z-0"
                )}
              >
                {formula.popular && (
                  <div className="absolute top-0 inset-x-0 h-2 bg-primary" />
                )}
                
                <CardHeader className="p-10 pb-6 text-center">
                  {formula.popular && (
                    <div className="mb-6">
                      <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-lg">
                        La plus demandée
                      </span>
                    </div>
                  )}
                  <div className={cn("h-16 w-16 rounded-2xl mx-auto flex items-center justify-center mb-6", formula.bg)}>
                    <formula.icon className={cn("h-8 w-8", formula.color)} />
                  </div>
                  <CardTitle className="text-3xl font-black text-slate-900">{formula.title}</CardTitle>
                  <p className={cn("text-sm font-bold uppercase tracking-widest mt-2", formula.color)}>
                    {formula.priceText}
                  </p>
                </CardHeader>

                <CardContent className="p-10 pt-0 flex-grow">
                  <p className="text-slate-500 font-light leading-relaxed text-center mb-8">
                    {formula.description}
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      Inclus dans cette offre
                    </p>
                    <ul className="space-y-4">
                      {FEATURES.filter(f => (formula.id === 'eco' ? f.eco : formula.id === 'standard' ? f.std : f.pre)).slice(0, 5).map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                          <div className="h-5 w-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                          </div>
                          <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="p-10 pt-0">
                  <Button 
                    asChild 
                    size="lg" 
                    className={cn(
                      "w-full h-14 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl",
                      formula.popular ? "bg-primary text-white shadow-primary/20" : "bg-slate-900 text-white shadow-slate-900/20"
                    )}
                  >
                    <Link href="/demande-devis">
                      Choisir cette formule <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Le comparatif <span className="text-primary">détaillé</span>
            </h2>
            <p className="text-lg text-slate-500 font-light">
              Analysez point par point les services inclus dans chaque niveau de prestation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none">
                  <TableHead className="w-[40%] font-bold text-slate-900 h-16 px-8">Services inclus</TableHead>
                  <TableHead className="text-center font-bold text-slate-900">Éco</TableHead>
                  <TableHead className="text-center font-bold text-slate-900 bg-primary/5">Standard</TableHead>
                  <TableHead className="text-center font-bold text-slate-900">Prestige</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FEATURES.map((feature, i) => (
                  <TableRow key={i} className="hover:bg-slate-50/50 transition-colors border-slate-50">
                    <TableCell className="font-medium text-slate-700 py-5 px-8">{feature.label}</TableCell>
                    <TableCell className="text-center">
                      {feature.eco ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-slate-200 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center bg-primary/5">
                      {feature.std ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-slate-200 mx-auto" />}
                    </TableCell>
                    <TableCell className="text-center">
                      {feature.pre ? <Check className="h-5 w-5 text-primary mx-auto" /> : <X className="h-5 w-5 text-slate-200 mx-auto" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* --- INFOS & CONSEILS --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Info className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Quelle formule choisir ?</h3>
              <div className="space-y-4 text-slate-500 font-light leading-relaxed">
                <p>
                  <strong>Économique</strong> : Recommandée pour les petits budgets ou si vous disposez de beaucoup de temps pour emballer.
                </p>
                <p>
                  <strong>Standard</strong> : Le choix de la sécurité. Nous gérons le plus risqué : le démontage des meubles et l'emballage de la vaisselle fragile.
                </p>
                <p>
                  <strong>Prestige</strong> : Pour ceux qui ne veulent aucun stress. On s'occupe de tout, vous n'avez qu'à nous donner les clés.
                </p>
              </div>
            </div>

            <div className="bg-[#0f172a] p-10 rounded-[2.5rem] shadow-2xl space-y-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">L'engagement Qualité</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Quelle que soit la formule choisie, vous bénéficiez des mêmes garanties de base :
              </p>
              <ul className="space-y-3">
                {["Déménageurs salariés uniquement", "Camions capitonnés sécurisés", "Protection systématique des meubles", "Assurance contractuelle incluse"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- GRAND CTA FINAL --- */}
      <section className="py-24 bg-white">
         <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-24 text-center overflow-hidden shadow-2xl isolate">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
               
               <div className="relative z-10 space-y-8">
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Prêt pour votre <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-300">
                      devis sur-mesure ?
                    </span>
                 </h2>
                 <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Lors de notre visite technique gratuite, nous pourrons vous chiffrer plusieurs options pour vous aider à choisir sereinement.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                    <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_20px_40px_-10px_rgba(0,173,159,0.4)]" asChild>
                       <Link href="/demande-devis">
                          Estimer mon projet gratuitement <ArrowRight className="ml-2 h-5 w-5" />
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
