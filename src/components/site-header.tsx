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

/* ================== Data ================== */

const MENU_SERVICES = [
  {
    title: "Particuliers",
    href: "/demenagement-particuliers",
    desc: "Formules adaptées à votre logement.",
    icon: Package,
  },
  {
    title: "Entreprises",
    href: "/demenagement-entreprise-bureau",
    desc: "Transfert de bureaux et archives.",
    icon: Building2,
  },
  {
    title: "Garde-Meubles",
    href: "/demenagement-garde-meubles",
    desc: "Stockage sécurisé sous surveillance.",
    icon: Warehouse,
  },
  {
    title: "Objets Lourds",
    href: "/demenagement-objets-lourds",
    desc: "Pianos, coffres-forts, œuvres d'art.",
    icon: Paintbrush,
  },
] as const;

const MENU_OUTILS = [
  {
    title: "Calculateur de volume",
    href: "/calculateur-volume",
    desc: "Estimez vos m³ en 2 min.",
    icon: Calculator,
  },
  {
    title: "Zones d'intervention",
    href: "/zones-intervention",
    desc: "Île-de-France & Normandie.",
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

function useScrolled(threshold = 10) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}

/* ================== Component ================== */

export function SiteHeader() {
  const pathname = usePathname();
  const isScrolled = useScrolled(8);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-slate-200/70 shadow-[0_8px_30px_-18px_rgba(0,0,0,0.18)]"
          : "bg-white border-transparent"
      )}
    >
      <div className={cn("container flex items-center justify-between", isScrolled ? "h-14" : "h-16")}>
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Accueil"
        >
          <Logo />
        </Link>

        {/* Center: Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Services dropdown */}
          <div className="relative group">
            <button
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
              aria-haspopup="menu"
            >
              Services
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="w-[420px] rounded-2xl border border-slate-200 bg-white shadow-xl p-2 ring-1 ring-slate-900/5">
                <div className="grid grid-cols-2 gap-2">
                  {MENU_SERVICES.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group/item rounded-2xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 group-hover/item:text-primary group-hover/item:border-primary/25 transition-colors">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {item.title}
                          </div>
                          <div className="mt-1 text-[11px] leading-relaxed text-slate-500">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                  <p className="text-xs text-slate-600">
                    Besoin d&apos;une estimation rapide ?
                  </p>
                  <Link
                    href="/demande-devis"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-primary"
                  >
                    Devis gratuit <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Ressources dropdown */}
          <div className="relative group">
            <button
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
              aria-haspopup="menu"
            >
              Ressources
              <ChevronDown className="h-4 w-4 opacity-60 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="w-[360px] rounded-2xl border border-slate-200 bg-white shadow-xl p-2 ring-1 ring-slate-900/5">
                {MENU_OUTILS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group/item flex items-start gap-3 rounded-2xl px-4 py-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 group-hover/item:text-primary group-hover/item:border-primary/25 transition-colors">
                      <item.icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-slate-300 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Simple links */}
          {MAIN_LINKS.slice(3).map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+33130751235"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            01 30 75 12 35
          </a>

          <Button asChild className="rounded-full px-5 h-11 font-bold hidden sm:inline-flex">
            <Link href="/demande-devis">
              Devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
              <SheetHeader className="p-6 border-b border-slate-200 bg-white">
                <SheetTitle className="flex items-center justify-between">
                  <Logo />
                  <span className="text-xs text-slate-500 font-medium">
                    Menu
                  </span>
                </SheetTitle>
              </SheetHeader>

              <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-180px)]">
                {/* Primary links */}
                <div className="space-y-2">
                  {MAIN_LINKS.map((l) => {
                    const active = pathname === l.href;
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={cn(
                          "flex items-center justify-between rounded-2xl px-4 py-3 border transition-colors",
                          active
                            ? "border-slate-200 bg-slate-50 text-slate-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <span className="font-semibold">{l.label}</span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    );
                  })}
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Services
                  </p>
                  <div className="grid gap-2">
                    {MENU_SERVICES.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="space-y-3">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Outils
                  </p>
                  <div className="grid gap-2">
                    {MENU_OUTILS.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700">
                          <item.icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile bottom actions */}
              <div className="p-6 border-t border-slate-200 bg-white space-y-3">
                <Button asChild className="w-full h-12 rounded-xl font-bold">
                  <Link href="/demande-devis">Obtenir mon devis</Link>
                </Button>

                <a
                  href="tel:+33130751235"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  01 30 75 12 35
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
