
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
  Baby,
  Smile,
  Heart,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

export const metadata: Metadata = {
  title: "Déménager avec des enfants : nos conseils pour une transition en douceur | DemDuVexin",
  description: "Découvrez comment organiser un déménagement serein avec vos enfants. Astuces psychologiques et pratiques pour transformer le changement en aventure.",
};

export default function ArticleKidsMoving() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HEADER --- */}
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={placeholders["blog-kids-hero"].url} 
            alt={placeholders["blog-kids-hero"].alt}
            fill 
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-kids-hero"].hint}
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
              Déménager avec des enfants : <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                une transition en douceur.
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
            <CardContent className="p-0 prose prose-slate prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-slate-600 font-light leading-relaxed mb-12 italic border-l-4 border-[#00ad9f] pl-8">
                "Pour un enfant, un déménagement est un bouleversement majeur. C'est la perte de ses repères, de sa chambre, et parfois de ses amis. Mais c'est aussi une opportunité incroyable de grandir. Voici nos clés pour transformer ce stress en une aventure familiale positive."
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                  <MessageSquare className="h-5 w-5" />
                </span>
                La règle d'or : La communication précoce
              </h2>
              <p>
                Ne cachez pas le déménagement à vos enfants. Dès que le projet est ferme, parlez-en. Expliquez les raisons du départ avec des mots simples et positifs. Plus ils auront de temps pour se préparer mentalement, plus ils accepteront l'idée.
              </p>
              <div className="bg-slate-50 p-6 rounded-2xl my-8">
                <p className="font-bold text-slate-900 mb-2">À éviter :</p>
                <ul className="list-none p-0 space-y-2">
                  <li className="flex items-start gap-2 text-sm text-red-600"><CheckCircle2 className="h-4 w-4 shrink-0 mt-1" /> Annoncer le départ au dernier moment.</li>
                  <li className="flex items-start gap-2 text-sm text-red-600"><CheckCircle2 className="h-4 w-4 shrink-0 mt-1" /> Minimiser leurs craintes ou leur tristesse.</li>
                </ul>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image 
                  src={placeholders["blog-kids-packing"].url} 
                  alt="Enfants participant à la préparation"
                  fill
                  className="object-cover"
                  data-ai-hint="kids helping packing"
                />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Smile className="h-5 w-5" />
                </span>
                Impliquez-les dans l'action
              </h2>
              <p>
                Donnez-leur un rôle ! Proposez-leur de décorer leurs propres cartons avec des feutres ou des autocollants. Pour les plus grands, laissez-les choisir la couleur d'un mur de leur future chambre ou l'emplacement de leur lit. 
              </p>
              <p>
                <strong>L'astuce de pro :</strong> Créez un "carton de survie" spécial pour chaque enfant. Il contiendra leurs doudous préférés, un pyjama, une brosse à dents et quelques jouets essentiels pour la première nuit. Ce carton doit être le dernier chargé et le premier ouvert.
              </p>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <Home className="h-5 w-5" />
                </span>
                La visite du futur quartier
              </h2>
              <p>
                Si possible, emmenez-les visiter leur future école, le parc à proximité ou le marchand de glaces du quartier. Il faut que l'enfant puisse se projeter dans un quotidien concret et plaisant. Transformez cette visite en "chasse au trésor" pour découvrir les pépites de leur futur environnement.
              </p>

              <div className="relative aspect-video rounded-3xl overflow-hidden my-10 shadow-lg border border-slate-100">
                <Image 
                  src={placeholders["blog-new-home"].url} 
                  alt="Découverte de la nouvelle maison"
                  fill
                  className="object-cover"
                  data-ai-hint="family new house"
                />
              </div>

              <h2 className="text-3xl font-extrabold text-slate-900 mt-16 mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-[#00ad9f]">
                  <Heart className="h-5 w-5" />
                </span>
                Maintenez les routines
              </h2>
              <p>
                Pendant la période de transition, essayez de garder les horaires habituels des repas et du coucher. La stabilité du rythme compense l'instabilité du décor. Le jour du déménagement, si les enfants sont petits, confiez-les idéalement à des grands-parents ou des amis pour les préserver de l'agitation et de la tension nerveuse.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2rem] my-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 rounded-full blur-3xl" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-teal-400">
                  <Lightbulb className="h-6 w-6" />
                  Le conseil DemDuVexin
                </h3>
                <p className="text-slate-300 font-light text-sm leading-relaxed m-0">
                  "Nous recommandons de remonter la chambre des enfants en priorité absolue dès l'arrivée. Retrouver leur lit, leurs jouets et leur odeur familière dans un environnement encore inconnu est le meilleur remède contre l'anxiété du premier soir."
                </p>
              </div>

              <div className="mt-20 p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 text-center">
                <h3 className="text-2xl font-bold mb-4">Une famille sereine, un déménagement réussi.</h3>
                <p className="text-slate-500 mb-8 font-light max-w-xl mx-auto">
                  Besoin d'aide pour estimer le volume de la salle de jeux ou des chambres d'enfants ? Utilisez notre calculateur intelligent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="rounded-full h-12 px-8 bg-[#00ad9f] hover:bg-[#009286]" asChild>
                    <Link href="/calculateur-volume">Estimer mon volume (m³)</Link>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 px-8 border-slate-300" asChild>
                    <Link href="/demande-devis">Obtenir un devis gratuit</Link>
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
              Lire d'autres conseils <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

// Icon non défini dans les imports précédents mais utilisé
function MessageSquare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
