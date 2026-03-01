
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
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "5 astuces pour un déménagement sans stress | Conseils DemDuVexin",
  description: "Découvrez nos conseils d'experts pour organiser votre déménagement en toute sérénité. De la planification à l'installation, évitez le stress du jour J.",
};

export default function ArticleStressFree() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1920" 
            alt="Déménagement organisé" 
            fill 
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
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
              5 astuces pour un <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                déménagement sans stress.
              </span>
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-400">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#00ad9f]" />
                24 Mai 2024
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00ad9f]" />
                6 min de lecture
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="container mx-auto px-4 md:px-6 -mt-10 lg:-mt-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Card */}
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                "Le jour J approche et la liste des tâches semble s'allonger à l'infini ? Pas de panique. En tant que professionnels du secteur, nous avons vu des milliers de déménagements. Voici nos 5 secrets pour garder le sourire pendant votre changement d'adresse."
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">1</span>
                Anticipez les démarches administratives
              </h2>
              <p>
                Le stress vient souvent de la peur d'oublier quelque chose d'important. Commencez par les contrats qui demandent un délai : box internet, électricité, et surtout l'assurance habitation. 
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl my-8 border-l-4 border-[#00ad9f]">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#00ad9f]" />
                  Astuce de pro :
                </p>
                <p className="text-sm mt-2">
                  Utilisez le service de transfert de courrier de La Poste 15 jours avant. C'est l'assurance que même vos courriers oubliés arriveront à bon port.
                </p>
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">2</span>
                Faites un tri drastique (et libérateur)
              </h2>
              <p>
                Déménager, c'est l'occasion idéale de faire table rase. Ne payez pas pour transporter des objets que vous n'avez pas utilisés depuis deux ans. Donnez, vendez ou jetez. Moins vous avez de volume, moins le devis sera élevé et plus rapide sera l'installation.
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">3</span>
                Le système de marquage "Intelligent"
              </h2>
              <p>
                Ne vous contentez pas d'écrire "Cuisine" sur vos cartons. Utilisez un code couleur ou un système de numérotation. 
              </p>
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>Marquez les deux côtés et le dessus du carton.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>Indiquez la pièce de destination PRÉCISE (ex: Chambre parentale, pas juste Chambre).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#00ad9f] shrink-0 mt-0.5" />
                  <span>Mentionnez "Ouvrir en premier" pour l'essentiel.</span>
                </li>
              </ul>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">4</span>
                Préparez votre "Kit de Survie J+1"
              </h2>
              <p>
                C'est l'astuce qui sauve votre première nuit. Préparez un sac séparé (que vous gardez avec vous) contenant : 
                draps propres, nécessaire de toilette, chargeurs, documents importants, quelques outils de base et de quoi faire un premier café ou thé. Rien n'est plus stressant que de chercher sa brosse à dents parmi 50 cartons à minuit.
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00ad9f] text-white text-lg">5</span>
                Faites confiance à des professionnels salariés
              </h2>
              <p>
                Le plus gros facteur de stress est l'imprévu technique ou la casse. En choisissant une entreprise comme <strong>Déménagement du Vexin</strong>, qui travaille exclusivement avec ses propres salariés formés, vous éliminez l'aléa de la sous-traitance.
              </p>
              <p>
                Un professionnel saura gérer les accès difficiles, protégera vos sols et vos murs, et saura manipuler votre mobilier lourd sans risque. La sérénité a un prix, mais elle est souvent bien plus rentable que de gérer les dégâts d'une équipe non qualifiée.
              </p>

              {/* Conclusion Section */}
              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ad9f]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-4 relative z-10">Besoin d'un accompagnement personnalisé ?</h3>
                <p className="text-slate-400 mb-8 font-light relative z-10">
                  Nos conseillers sont à votre disposition pour réaliser une étude technique gratuite et sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/demande-devis">Estimer mon projet</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-700 hover:bg-white hover:text-slate-900" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share & Footer Article */}
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
