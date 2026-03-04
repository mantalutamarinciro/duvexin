"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Building2,
  Calculator,
  ChevronDown,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Package,
  Warehouse,
  Paintbrush,
  Train,
  Plane,
  Navigation,
  BookOpen,
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

const SERVICES_FEATURED = [
  {
    title: "Déménagement Particuliers",
    href: "/demenagement-particuliers",
    desc: "Formules sur-mesure pour votre nouveau foyer.",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Transfert d'Entreprise",
    href: "/demenagement-entreprise-bureau",
    desc: "Bureaux, archives et logistique IT experte.",
    icon: Building2,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Garde-meubles Sécurisé",
    href: "/demenagement-garde-meubles",
    desc: "Stockage plombé sous surveillance 24h/24.",
    icon: Warehouse,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Objets Lourds & Art",
    href: "/demenagement-oeuvres-art",
    desc: "Pianos, coffres et pièces de collection.",
    icon: Paintbrush,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
] as const;

const ZONES = [
  {
    title: "Île-de-France",
    desc: "Proximité Parisienne",
    icon: MapPin,
    links: [
      { label: "Val-d’Oise (95)", href: "/demenagement-val-d-oise-95" },
      { label: "Yvelines (78)", href: "/demenagement-yvelines-78" },
      { label: "Hauts-de-Seine (92)", href: "/demenagement-hauts-de-seine-92" },
      { label: "Toutes nos zones", href: "/zones-intervention" },
    ],
  },
  {
    title: "Déménagement National",
    desc: "Toute la France",
    icon: Train,
    links: [
      { label: "Paris → Lyon", href: "/demenagement-ile-de-france-lyon" },
      { label: "Paris → Marseille", href: "/demenagement-ile-de-france-marseille" },
      { label: "Paris → Bordeaux", href: "/demenagement-ile-de-france-bordeaux" },
      { label: "Liaisons Nationales", href: "/demenagement-national" },
    ],
  },
  {
    title: "International",
    desc: "Europe & Monde",
    icon: Plane,
    links: [
      { label: "Royaume-Uni", href: "/demenagement-france-royaume-uni" },
      { label: "Suisse", href: "/demenagement-france-suisse" },
      { label: "Espagne", href: "/demenagement-france-espagne" },
      { label: "Destinations Internationales", href: "/demenagement-international" },
    ],
  },
] as const;

const TOOLS_LINKS = [
  {
    title: "Calculateur de volume",
    href: "/calculateur-volume",
    desc: "Estimez votre m³ pièce par pièce.",
    icon: Calculator,
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    title: "Tarifs",
    href: "/tarif-demenagement",
    desc: "Simulateur de prix précis et transparent.",
    icon: Sparkles,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  {
    title: "Formules de déménagement",
    href: "/formules-de-demenagement",
    desc: "Économique, Standard ou Prestige.",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
] as const;

const MAIN_LINKS = [
  { label: "Conseils", href: "/blog", icon: BookOpen },
  { label: "L’entreprise", href: "/a-propos-de-demenagement-du-vexin", icon: Building2 },
] as const;

/* ================== Helpers ================== */

function useScrolled(threshold = 16) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return isScrolled;
}

function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/* ================== Component ================== */

export function SiteHeader() {
  const pathname = usePathname();
  const isScrolled = useScrolled(16);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  useLockBodyScroll(mobileOpen);

  const isActive = React.useCallback(
    (href: string) => {
      if (!pathname) return false;
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full px-4 md:px-8 transition-all duration-300",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between rounded-full border px-4 sm:px-5 transition-all duration-300",
          isScrolled
            ? "h-14 bg-white/80 dark:bg-slate-950/70 backdrop-blur-lg border-slate-200/60 dark:border-slate-800/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "h-16 bg-white dark:bg-slate-950 border-transparent shadow-none"
        )}
      >
        {/* Left */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Logo className={cn("transition-transform", isScrolled ? "scale-95" : "scale-100")} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Mega menu - Services */}
          <div className="relative group">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                "text-slate-700 dark:text-slate-200 hover:text-primary",
                SERVICES_FEATURED.some((s) => isActive(s.href)) ? "text-primary" : ""
              )}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Services
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="w-[740px] rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-4 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    Nos Expertises
                  </p>
                  <Link href="/services" className="text-[11px] font-extrabold text-primary hover:opacity-90">
                    Tous les services <ArrowRight className="inline h-3 w-3 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {SERVICES_FEATURED.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group/item rounded-2xl p-4 transition-all hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={cn(
                            "h-11 w-11 rounded-2xl flex items-center justify-center shadow-sm transition-transform",
                            "group-hover/item:-translate-y-0.5",
                            item.bg,
                            item.color
                          )}
                          aria-hidden="true"
                        >
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="mt-1 text-[12px] leading-snug text-slate-500 dark:text-slate-400 font-medium">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 rounded-2xl bg-primary/5 border border-primary/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </span>
                    <div className="leading-tight">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">Devis Gratuit en 24h</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Étude technique sans engagement</div>
                    </div>
                  </div>

                  <Link
                    href="/demande-devis"
                    className="text-[11px] font-black text-primary flex items-center gap-1.5 uppercase tracking-tight hover:gap-2 transition-all"
                  >
                    Démarrer <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mega menu - Zones */}
          <div className="relative group">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                "text-slate-700 dark:text-slate-200 hover:text-primary",
                isActive("/zones-intervention") ? "text-primary" : ""
              )}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Zones
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="w-[760px] max-h-[80vh] overflow-y-auto rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-4 ring-1 ring-slate-900/5">
                <div className="flex items-center justify-between px-1 pb-2">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                    Rayonnement Géographique
                  </p>
                  <Link
                    href="/zones-intervention"
                    className="text-[11px] font-extrabold text-primary hover:opacity-90"
                  >
                    Voir la carte complète
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {ZONES.map((zone) => (
                    <div
                      key={zone.title}
                      className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-9 w-9 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-primary">
                          <zone.icon className="h-4 w-4" />
                        </span>
                        <div className="leading-tight">
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                            {zone.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {zone.desc}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1">
                        {zone.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="flex items-center justify-between rounded-xl px-2.5 py-2 hover:bg-white dark:hover:bg-slate-950 transition-colors"
                          >
                            <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">
                              {l.label}
                            </span>
                            <Navigation className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Link
                    href="/calculateur-volume"
                    className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Calculator className="h-4 w-4 text-primary" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[12px] font-extrabold text-slate-900 dark:text-white">Calculateur</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Estimez votre m³</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/tarif-demenagement"
                    className="rounded-2xl border border-primary/15 bg-primary/5 dark:bg-primary/10 px-3 py-3 hover:bg-primary/8 dark:hover:bg-primary/15 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </span>
                      <div className="leading-tight">
                        <div className="text-[12px] font-extrabold text-slate-900 dark:text-white">Estimateur de prix</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Calcul précis immédiat</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mega menu - Outils */}
          <div className="relative group">
            <button
              type="button"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                "text-slate-700 dark:text-slate-200 hover:text-primary",
                TOOLS_LINKS.some((s) => isActive(s.href)) ? "text-primary" : ""
              )}
              aria-haspopup="true"
              aria-expanded="false"
            >
              Outils
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="w-[320px] rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl p-4 ring-1 ring-slate-900/5">
                <div className="grid gap-1">
                  {TOOLS_LINKS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group/item flex items-start gap-4 rounded-2xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                    >
                      <span className={cn("h-9 w-9 rounded-xl flex items-center justify-center shrink-0", item.bg, item.color)}>
                        <item.icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-snug text-slate-500 dark:text-slate-400 font-medium">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Links */}
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-slate-700 dark:text-slate-200 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+33130751235"
            className={cn(
              "hidden xl:flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-black transition-colors",
              "text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900",
              "border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
            )}
          >
            <span className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-emerald-600" />
            </span>
            01 30 75 12 35
          </a>

          <Button
            asChild
            className="hidden sm:flex rounded-full px-5 h-10 font-bold shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Link href="/demande-devis">Devis gratuit</Link>
          </Button>

          <ThemeToggle />

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-[420px] rounded-l-[2.5rem] p-0 border-none shadow-2xl">
              <div className="flex flex-col h-full bg-white dark:bg-slate-950">
                <SheetHeader className="p-6 border-b border-slate-100 dark:border-slate-900">
                  <SheetTitle className="flex items-center justify-between">
                    <Logo />
                    <ThemeToggle />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-7">
                  {/* Main links */}
                  <nav className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4 pb-2">Outils & Tarifs</p>
                      {TOOLS_LINKS.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-2xl transition-colors",
                            "hover:bg-slate-50 dark:hover:bg-slate-900",
                            isActive(tool.href) ? "bg-primary/5 text-primary" : "text-slate-700 dark:text-slate-200"
                          )}
                        >
                          <span className="text-base font-extrabold">{tool.title}</span>
                          <tool.icon className="h-5 w-5 opacity-60" />
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/zones-intervention"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl transition-colors",
                        "hover:bg-slate-50 dark:hover:bg-slate-900",
                        isActive("/zones-intervention") ? "bg-slate-50 dark:bg-slate-900" : ""
                      )}
                    >
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">Nos Zones</span>
                      <MapPin className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                    </Link>

                    {MAIN_LINKS.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-colors",
                          "hover:bg-slate-50 dark:hover:bg-slate-900",
                          isActive(l.href) ? "bg-slate-50 dark:bg-slate-900" : ""
                        )}
                      >
                        <span className="text-base font-extrabold text-slate-900 dark:text-white">{l.label}</span>
                        <l.icon className="h-5 w-5 text-slate-300 dark:text-slate-700" />
                      </Link>
                    ))}
                  </nav>

                  {/* Services */}
                  <div className="rounded-3xl border border-slate-100 dark:border-slate-900 bg-slate-50/60 dark:bg-slate-900/40 p-4">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600">
                        Nos Expertises
                      </p>
                      <Link href="/services" onClick={() => setMobileOpen(false)} className="text-[11px] font-extrabold text-primary">
                        Tous
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES_FEATURED.map((s) => (
                        <Link
                          key={s.title}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="rounded-2xl border border-slate-100 dark:border-slate-800 p-3 bg-white/70 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-950 transition-colors"
                        >
                          <div className={cn("h-10 w-10 rounded-2xl flex items-center justify-center mb-2", s.bg)}>
                            <s.icon className={cn("h-5 w-5", s.color)} />
                          </div>
                          <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{s.title}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-900 space-y-3">
                  <Button asChild className="w-full h-12 rounded-2xl text-base font-extrabold shadow-xl shadow-primary/20">
                    <Link href="/demande-devis" onClick={() => setMobileOpen(false)}>
                      Devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <a
                    href="tel:+33130751235"
                    className="flex items-center justify-center gap-3 w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white"
                  >
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
