import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1512418490979-92798ccc1380?q=80&w=1920" 
            alt="Bureau et planification" 
            fill 
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <nav className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Le Journal</span>
            </nav>
            
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Le Journal du <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                Déménagement.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Conseils d'experts, guides pratiques et actualités pour transformer votre changement d'adresse en une expérience sereine et maîtrisée.
            </p>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={post.aiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary mb-4">
                    <span className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-full">
                      <Calendar className="h-3 w-3" />
                      Mai 2024
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="h-3 w-3" />
                      5 min de lecture
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </CardHeader>
                
                <CardContent className="p-8 pt-0 flex-grow">
                  <p className="text-slate-500 font-light leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </CardContent>
                
                <CardFooter className="p-8 pt-0">
                  <Button variant="link" className="p-0 h-auto text-slate-900 font-black uppercase tracking-widest text-xs group-hover:text-primary transition-colors" asChild>
                    <Link href={post.link} className="flex items-center gap-2">
                      Lire l'article <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1.5" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER / CTA --- */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-20 text-center overflow-hidden shadow-2xl isolate">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />
            
            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Besoin d'un conseil <br/> <span className="text-[#00ad9f]">personnalisé ?</span>
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Nos experts sont à votre disposition pour répondre à toutes vos questions techniques et administratives concernant votre futur déménagement.
              </p>
              <div className="pt-4">
                <Button size="lg" className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-xl shadow-[#00ad9f]/20" asChild>
                  <Link href="/demande-devis">Démarrer mon étude gratuite</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
