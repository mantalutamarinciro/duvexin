"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

/** -------- Helpers (date & reading time) -------- */
function formatDateFR(input: string | Date) {
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return "Date à définir";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

function daysBetween(a: Date, b: Date) {
  const ms = Math.abs(a.getTime() - b.getTime());
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

type BlogPost = (typeof blogPosts)[number] & {
  date?: string; // ISO "2026-03-01"
  readingTime?: number; // minutes
  category?: string;
};

const PAGE_SIZE = 9; // ajuste si besoin

export default function BlogPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("Tous");
  const [page, setPage] = React.useState(1);

  const now = React.useMemo(() => new Date(), []);

  // Normalise + tri par date desc (si date absente → fin de liste)
  const posts = React.useMemo(() => {
    const normalized = (blogPosts as BlogPost[]).map((p) => {
      const date = p.date ?? "1970-01-01";
      const readingTime = typeof p.readingTime === "number" ? p.readingTime : 6; // fallback propre
      const category = p.category ?? "Conseils";
      return { ...p, date, readingTime, category };
    });

    normalized.sort((a, b) => {
      const da = new Date(a.date!).getTime();
      const db = new Date(b.date!).getTime();
      return db - da;
    });

    return normalized;
  }, []);

  const categories = React.useMemo(() => {
    const set = new Set<string>(["Tous"]);
    posts.forEach((p) => set.add(p.category || "Conseils"));
    return Array.from(set);
  }, [posts]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = posts;

    if (category !== "Tous") {
      list = list.filter((p) => (p.category || "Conseils") === category);
    }

    if (q) {
      list = list.filter((p) => {
        const hay = `${p.title} ${p.description}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  React.useEffect(() => {
    // Si filtre/recherche réduit la liste, on revient page 1
    setPage(1);
  }, [query, category]);

  const paged = React.useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[#0b0f19] text-white overflow-hidden">
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
            <nav
              className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-white/50 mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Accueil
              </Link>
              <ChevronRight className="h-3 w-3 mx-3 opacity-50" />
              <span className="text-[#00ad9f]">Le Journal</span>
            </nav>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Le Journal du <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
                Déménagement.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Conseils d’experts, guides pratiques et méthodes concrètes pour transformer
              votre changement d’adresse en une expérience sereine et maîtrisée.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                {posts.length} articles
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                Mis à jour régulièrement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* --- TOOLBAR (search + filter) --- */}
      <section className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur supports-[backdrop-filter]:bg-slate-50/60 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <label className="sr-only" htmlFor="blog-search">
                Rechercher un article
              </label>
              <input
                id="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher (ex : cartons, devis, enfants, fragile...)"
                className="w-full md:w-[420px] bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
              />
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                <Filter className="h-4 w-4" />
                Catégorie
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const active = c === category;
                  return (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={[
                        "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                        active
                          ? "bg-[#00ad9f] text-white"
                          : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results line */}
          <div className="mt-3 text-sm text-slate-500">
            {filtered.length === 0 ? (
              <span>Aucun article ne correspond à votre recherche.</span>
            ) : (
              <span>
                {filtered.length} résultat{filtered.length > 1 ? "s" : ""} •{" "}
                triés du plus récent au plus ancien
              </span>
            )}
          </div>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {filtered.length === 0 ? (
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 md:p-14 text-center shadow-sm">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Search className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
                Aucun résultat
              </h2>
              <p className="mt-2 text-slate-500">
                Essayez un autre mot-clé ou revenez à “Tous”.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button
                  className="rounded-full bg-[#00ad9f] hover:bg-[#009286]"
                  onClick={() => {
                    setQuery("");
                    setCategory("Tous");
                  }}
                >
                  Réinitialiser
                </Button>
                <Button variant="outline" className="rounded-full" asChild>
                  <Link href="/demande-devis">Demander un devis</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paged.map((post) => {
                  const published = new Date((post as BlogPost).date!);
                  const isNew = !Number.isNaN(published.getTime())
                    ? daysBetween(now, published) <= 21
                    : false;

                  return (
                    <Card
                      key={post.id}
                      className="group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint={post.aiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Badges overlay */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {isNew && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900">
                              <Sparkles className="h-3 w-3 text-[#00ad9f]" />
                              Nouveau
                            </span>
                          )}
                          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-900">
                            {(post as BlogPost).category ?? "Conseils"}
                          </span>
                        </div>
                      </div>

                      <CardHeader className="p-8 pb-4">
                        {/* Date & reading time (différents par article) */}
                        <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-widest mb-4">
                          <span className="flex items-center gap-1.5 bg-[#00ad9f]/10 text-[#007e74] px-3 py-1.5 rounded-full">
                            <Calendar className="h-3 w-3" />
                            {formatDateFR((post as BlogPost).date!)}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="h-3 w-3" />
                            {(post as BlogPost).readingTime} min
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#00ad9f] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </CardHeader>

                      <CardContent className="p-8 pt-0 flex-grow">
                        <p className="text-slate-500 font-light leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </CardContent>

                      <CardFooter className="p-8 pt-0">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-slate-900 font-black uppercase tracking-widest text-xs group-hover:text-[#00ad9f] transition-colors"
                          asChild
                        >
                          <Link href={post.link} className="flex items-center gap-2">
                            Lire l’article{" "}
                            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1.5" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Précédent
                </Button>

                <div className="text-sm text-slate-500">
                  Page <span className="font-bold text-slate-900">{currentPage}</span> /{" "}
                  <span className="font-bold text-slate-900">{totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Suivant
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[4rem] bg-[#0f172a] p-12 md:p-20 text-center overflow-hidden shadow-2xl isolate">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ad9f]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3" />

            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Besoin d’un conseil <br />{" "}
                <span className="text-[#00ad9f]">personnalisé ?</span>
              </h2>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                Nos experts vous répondent sur les questions techniques, les accès difficiles,
                les formules, et les démarches. Étude gratuite et sans engagement.
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="rounded-full h-14 px-10 text-base font-bold bg-[#00ad9f] text-white hover:bg-[#009286] transition-all shadow-xl shadow-[#00ad9f]/20"
                  asChild
                >
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