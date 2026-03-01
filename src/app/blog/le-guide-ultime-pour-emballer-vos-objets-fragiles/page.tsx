
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight,
  Share2,
  Gem,
  Package,
  ShieldCheck,
  GlassWater
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

export const metadata: Metadata = {
  title: "Le guide ultime pour emballer vos objets fragiles | Conseils DemDuVexin",
  description: "Apprenez à emballer votre vaisselle, vos miroirs et vos œuvres d'art comme un pro. Nos techniques d'experts pour éviter toute casse lors de votre déménagement.",
};

export default function ArticleFragilePacking() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={placeholders["blog-fragile-hero"].url} 
            alt={placeholders["blog-fragile-hero"].alt}
            fill 
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-fragile-hero"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] mb-8 hover:text-white transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              Retour au Journal
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
              Le guide ultime pour emballer <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                vos objets fragiles.
              </span>
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                7 min de lecture
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-none dark:prose-invert">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                "C'est la hantise de tout déménagement : ouvrir un carton et découvrir sa vaisselle préférée ou un miroir de famille en morceaux. Pourtant, avec les bons matériaux et la bonne méthode, le risque zéro existe. Voici nos secrets de déménageurs professionnels."
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Package className="h-5 w-5" />
                </span>
                Le matériel indispensable
              </h2>
              <p>
                Oubliez les vieux journaux qui tachent et ne protègent rien. Pour du fragile, il vous faut :
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 list-none p-0">
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Du papier de soie ou papier blanc
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Du papier bulle (ou bullkraft)
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> Des cartons double cannelure
                </li>
                <li className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl text-sm font-bold">
                  <CheckCircle2 className="h-5 w-5 text-[#00ad9f]" /> De l'adhésif de qualité
                </li>
              </ul>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <GlassWater className="h-5 w-5" />
                </span>
                La règle d'or pour la vaisselle
              </h2>
              <p>
                Contrairement à une idée reçue, <strong>les assiettes ne s'empilent pas à plat</strong>. Elles se rangent verticalement, sur la tranche, comme dans un lave-vaisselle. Pourquoi ? Parce que la structure de l'assiette est beaucoup plus résistante aux chocs dans ce sens.
              </p>
              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image 
                  src={placeholders["blog-glass-packing"].url} 
                  alt={placeholders["blog-glass-packing"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholders["blog-glass-packing"].hint}
                />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Gem className="h-5 w-5" />
                </span>
                Miroirs et Tableaux : la méthode du "X"
              </h2>
              <p>
                Pour un grand miroir ou une œuvre d'art sous verre :
              </p>
              <ol className="space-y-4">
                <li>Placez un grand "X" en ruban adhésif sur le verre pour limiter les vibrations.</li>
                <li>Protégez les angles avec des coins en mousse ou du carton plié.</li>
                <li>Enveloppez l'objet dans du bullkraft (papier bulle doublé de kraft).</li>
                <li>Rangez-les toujours <strong>debout sur la tranche</strong> dans le camion, jamais à plat sous d'autres cartons.</li>
              </ol>

              <div className="bg-[#00ad9f]/5 p-8 rounded-[2rem] my-12 border-l-4 border-[#00ad9f]">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-[#00ad9f]" />
                  L'astuce "Secouez-moi"
                </h3>
                <p className="text-sm leading-relaxed m-0">
                  Une fois votre carton terminé, fermez-le et secouez-le très légèrement. Si vous entendez le moindre petit bruit de frottement ou de mouvement, c'est qu'il manque du calage. Comblez les vides avec du papier froissé ou du linge de maison. Un carton de fragile ne doit pas "chanter".
                </p>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                La sérénité totale avec la formule Standard
              </h2>
              <p>
                Vous avez peur de mal faire ? C'est normal. Chez <strong>Déménagement du Vexin</strong>, nous avons conçu la <strong>Formule Standard</strong> spécifiquement pour lever cette angoisse. Nos experts se déplacent avec des caisses compartimentées professionnelles et emballent eux-mêmes toute votre vaisselle, vos verres et vos objets précieux.
              </p>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-[#0f172a] text-white relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Confiez le fragile à des pros.</h3>
                <p className="text-slate-400 mb-8 font-light relative z-10 max-w-xl mx-auto">
                  Avec notre assurance incluse et notre matériel pro, dormez sur vos deux oreilles. Vos souvenirs sont entre de bonnes mains.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Estimer ma formule Standard</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-700 hover:bg-white hover:text-slate-900" asChild>
                    <Link href="/services">Voir tous nos services</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Partager :</span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full hover:text-[#00ad9f]"><Share2 className="h-4 w-4"/></Button>
              </div>
            </div>
            <Link href="/blog" className="text-sm font-black text-slate-900 hover:text-[#00ad9f] transition-colors flex items-center gap-2">
              Lire d'autres articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
