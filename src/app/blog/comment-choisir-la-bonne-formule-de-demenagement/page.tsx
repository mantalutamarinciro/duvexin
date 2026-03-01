
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
  Wallet,
  Settings,
  Star,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

export const metadata: Metadata = {
  title: "Comment choisir la bonne formule de déménagement ? | Conseils DemDuVexin",
  description: "Économique, Standard ou Prestige ? Découvrez quelle formule de déménagement correspond le mieux à votre budget et à vos besoins pour un changement d'adresse serein.",
};

export default function ArticleFormulas() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={placeholders["blog-formulas-hero"].url} 
            alt={placeholders["blog-formulas-hero"].alt}
            fill 
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-formulas-hero"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
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
              Comment choisir la bonne <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                formule de déménagement ?
              </span>
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                01 Mars 2026
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                5 min de lecture
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                "Déménager est une étape majeure. Pour s'adapter à chaque situation, nous avons conçu trois niveaux de service. Mais comment savoir lequel vous convient ? Budget, temps disponible, ou valeur de vos biens : voici notre guide pour faire le bon choix."
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Wallet className="h-5 w-5" />
                </span>
                La Formule Économique : Pour les budgets maîtrisés
              </h2>
              <p>
                C'est l'option la plus directe. Le principe est simple : <strong>vous préparez tout, nous transportons tout</strong>. Vous vous chargez de l'emballage de l'intégralité de vos cartons (y compris le fragile) et du démontage de vos meubles.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl my-8">
                <p className="font-bold text-slate-900 mb-2">Idéal si :</p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Vous avez un budget serré.</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Vous avez du temps pour emballer plusieurs semaines avant.</li>
                  <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-[#00ad9f]" /> Vous possédez peu d'objets extrêmement fragiles ou complexes.</li>
                </ul>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image 
                  src={placeholders["blog-packing"].url} 
                  alt="Préparation des cartons"
                  fill
                  className="object-cover"
                  data-ai-hint="boxes packing"
                />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Settings className="h-5 w-5" />
                </span>
                La Formule Standard : Le choix de la sérénité
              </h2>
              <p>
                C'est notre formule la plus plébiscitée. Elle offre un équilibre parfait entre économie et sécurité. Nous prenons en charge <strong>l'emballage de tous vos objets fragiles</strong> (vaisselle, verrerie, bibelots, miroirs) et nous nous occupons du démontage et remontage de votre mobilier.
              </p>
              <div className="bg-[#00ad9f]/5 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 mb-2">Le vrai plus :</p>
                <p className="text-sm">
                  La vaisselle est souvent la cause première de stress et de casse. En confiant cette tâche à nos experts, vous bénéficiez de notre assurance totale et de techniques de calage professionnelles.
                </p>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Star className="h-5 w-5" />
                </span>
                La Formule Prestige : Le service "Gants Blancs"
              </h2>
              <p>
                Vous ne voulez pas voir un seul carton avant le jour J ? Cette formule est faite pour vous. Nos équipes s'occupent de <strong>l'emballage intégral de votre domicile</strong>. Livres, vêtements, linge de maison, décoration : nous rangeons tout avec méthodologie et déballons le fragile à l'arrivée.
              </p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image 
                  src={placeholders["blog-team"].url} 
                  alt="Équipe professionnelle en action"
                  fill
                  className="object-cover"
                  data-ai-hint="moving team working"
                />
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-[#00ad9f]" />
                  Le conseil de l'expert
                </h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed">
                  "N'évaluez pas seulement le prix, évaluez votre énergie. Un déménagement Prestige vous permet de rester productif dans votre travail ou disponible pour vos enfants jusqu'à la dernière minute. C'est un investissement dans votre tranquillité."
                </p>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6">Les 3 critères pour trancher</h2>
              <ol className="space-y-6">
                <li>
                  <strong className="text-slate-900">Le volume :</strong> Plus vous avez de m³, plus l'emballage sera long. Au-delà de 30m³, la formule Standard devient quasi indispensable pour ne pas s'épuiser.
                </li>
                <li>
                  <strong className="text-slate-900">La fragilité :</strong> Si vous possédez beaucoup de vaisselle ancienne ou d'objets de collection, ne prenez aucun risque.
                </li>
                <li>
                  <strong className="text-slate-900">Les accès :</strong> Un 5ème étage sans ascenseur ? Laissez-nous gérer la fatigue physique et concentrez-vous sur l'organisation.
                </li>
              </ol>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">Besoin d'un devis comparatif ?</h3>
                <p className="text-slate-500 mb-8 font-light max-w-xl mx-auto">
                  Lors de notre visite technique gratuite, nous pouvons vous chiffrer les différentes options pour vous aider à choisir.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Estimer mon projet</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                    <Link href="/services">Voir le détail des formules</Link>
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
