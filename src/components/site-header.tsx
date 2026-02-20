
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Building2,
  Globe,
  Package,
  Calculator,
  MapPin,
  ArrowRight,
  Paintbrush,
  Warehouse,
  Menu,
  Phone,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

/* ================== Data ================== */

const MENU_SERVICES = [
  {
    title: "Particuliers",
    href: "/demenagement-particuliers",
    desc: "Formules sur-mesure pour votre foyer.",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Entreprises",
    href: "/demenagement-entreprise-bureau",
    desc: "Transfert de bureaux et parcs IT.",
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Garde-Meubles",
    href: "/demenagement-garde-meubles",
    desc: "Stockage plombé et sécurisé.",
    icon: Warehouse,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Objets Lourds",
    href: "/demenagement-objets-lourds",
    desc: "Pianos, coffres et œuvres d'art.",
    icon: Paintbrush,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
] as const;

const MENU_OUTILS = [
  {
    title: "Calculateur de volume",
    href: "/calculateur-volume",
    desc: "Estimez vos m³ avec précision.",
    icon: Calculator,
  },
  {
    title: "Zones d'intervention",
    href: "/zones-intervention",
    desc: "95, 78, 27 et toute l'IDF.",
    icon: MapPin,
  },
  {
    title: "Déménagement National",
    href: "/demenagement-national",
    desc: "Lignes régulières France entière.",
    icon: Globe,
  },
] as const;

const MAIN_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Zones", href: "/zones-intervention" },
  { label: "Blog", href: "/blog" },
  { label: "L'entreprise", href: "/a-propos-de-demenagement-du-vexin" },
] as const;

/* ================== Helpers ================== */

function useScrolled(threshold = 20) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}

/* ================== Component ================== */

export function SiteHeader() {
  const isScrolled = useScrolled(20);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out px-4 md:px-8",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-500 rounded-full border px-6",
          isScrolled
            ? "h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-slate-200/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            : "h-16 bg-white dark:bg-slate-950 border-transparent shadow-none"
        )}
      >
        {/* Left: Logo */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo className={cn("transition-all", isScrolled ? "scale-90" : "scale-100")} />
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Services dropdown */}
          <div className="relative group">
            <button className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors group">
              Services
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
              <div className="w-[540px] rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-4 ring-1 ring-slate-900/5">
                <div className="grid grid-cols-2 gap-2">
                  {MENU_SERVICES.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group/item rounded-2xl p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                    >
                      <div className="flex items-start gap-4">
                        <span className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover/item:-translate-y-1 shadow-sm", item.bg, item.color)}>
                          <item.icon className="h-6 w-6" />
                        </span>
                        <div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white">{item.title}</div>
                          <div className="mt-1 text-[12px] leading-snug text-slate-500 dark:text-slate-400 font-medium">{item.desc}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between group/cta">
                    <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Prêt à emménager ?</span>
                    </div>
                    <Link href="/demande-de-devis" className="text-xs font-black text-primary flex items-center gap-1 group-hover/cta:gap-2 transition-all uppercase tracking-tighter">
                        Devis instantané <ArrowRight className="h-3 w-3" />
                    </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Outils/Ressources dropdown */}
          <div className="relative group">
            <button className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors group">
              Ressources
              <ChevronDown className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
              <div className="w-[320px] rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-2 ring-1 ring-slate-900/5">
                {MENU_OUTILS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group/tool flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                  >
                    <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover/tool:bg-white dark:group-hover/tool:bg-slate-700 group-hover/tool:text-primary group-hover/tool:shadow-sm transition-all">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium italic">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Standard links */}
          <Link
            href="/blog"
            className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/a-propos-de-demenagement-du-vexin"
            className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
          >
            L'entreprise
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+33130751235"
            className="hidden xl:flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-black text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
          >
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Phone className="h-4 w-4 text-emerald-600 fill-emerald-600/10" />
            </div>
            01 30 75 12 35
          </a>

          <Button asChild className="rounded-full px-6 h-10 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105 active:scale-95 hidden sm:flex">
            <Link href="/demande-de-devis">
              Devis Gratuit
            </Link>
          </Button>

          <ThemeToggle />

          {/* Mobile menu toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] rounded-l-[3rem] p-0 border-none shadow-2xl">
              <div className="flex flex-col h-full bg-white dark:bg-slate-950">
                <SheetHeader className="p-8 border-b border-slate-50 dark:border-slate-900">
                  <SheetTitle className="flex items-center justify-between">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Quick Access */}
                  <div className="grid grid-cols-2 gap-3">
                    {MENU_SERVICES.slice(0, 2).map((s) => (
                        <Link key={s.title} href={s.href} className={cn("p-4 rounded-3xl border border-slate-100 dark:border-slate-800", s.bg)}>
                            <s.icon className={cn("h-6 w-6 mb-2", s.color)} />
                            <span className="font-bold text-slate-900 dark:text-white text-sm">{s.title}</span>
                        </Link>
                    ))}
                  </div>

                  <nav className="space-y-1">
                    {MAIN_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                      >
                        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{l.label}</span>
                        <ChevronDown className="h-5 w-5 text-slate-300 dark:text-slate-700 -rotate-90 group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </nav>

                  <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900 space-y-4">
                    <p className="text-xs font-black uppercase text-slate-400 dark:text-slate-600 tracking-widest px-2">Nos Outils</p>
                    <div className="space-y-1">
                        {MENU_OUTILS.map((o) => (
                            <Link key={o.title} href={o.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all font-bold text-slate-700 dark:text-slate-300 text-sm">
                                <o.icon className="h-4 w-4 text-primary" />
                                {o.title}
                            </Link>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-slate-50 dark:border-slate-900 space-y-4">
                  <Button asChild className="w-full h-14 rounded-2xl text-lg font-black shadow-xl">
                    <Link href="/demande-de-devis">Estimer mon projet</Link>
                  </Button>
                  <a href="tel:+33130751235" className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    <Phone className="h-5 w-5" /> 01 30 75 12 35
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
