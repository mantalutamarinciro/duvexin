
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  Share2,
  CalendarDays,
  ListChecks,
  AlarmClock,
  Truck,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import placeholders from "@/app/lib/placeholder-images.json";

const SITE_URL = "https://demenagementduvexin.fr";
const ARTICLE_SLUG = "checklist-demenagement";
const CANONICAL_URL = `${SITE_URL}/blog/${ARTICLE_SLUG}`;

const ARTICLE_TITLE = "Checklist déménagement : la liste complète (30 jours, 7 jours, 48h, jour J)";
const ARTICLE_DESCRIPTION = "La checklist déménagement la plus simple : quoi faire 30 jours, 7 jours, 48h avant et le jour J.";

export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  description: ARTICLE_DESCRIPTION,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: ARTICLE_TITLE,
    images: [{ url: placeholders["blog-packing"].url }],
  },
};

function ChecklistBlock({ title, icon, items, tone = "default" }: { title: string; icon: React.ReactNode; items: string[]; tone?: "default" | "accent" | "dark" }) {
  const base = "rounded-[1.75rem] border border-slate-200 bg-white p-6 md:p-7";
  const accent = "rounded-[1.75rem] border border-[#00ad9f]/30 bg-[#00ad9f]/5 p-6 md:p-7";
  const dark = "rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6 md:p-7 text-white";
  const cls = tone === "accent" ? accent : tone === "dark" ? dark : base;

  return (
    <section className={cls}>
      <div className="flex items-start gap-3">
        <div className={tone === "dark" ? "h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center" : "h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700"}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-extrabold m-0">{title}</h3>
        </div>
      </div>
      <ul className="mt-5 space-y-3 list-none p-0">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2 className={tone === "dark" ? "h-5 w-5 text-teal-300 mt-0.5" : "h-5 w-5 text-[#00ad9f] mt-0.5"} />
            <span className="text-sm">{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ArticleChecklistMoving() {
  return (
    <article className="bg-white min-h-screen pb-20 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      <header className="relative pt-32 pb-12 lg:pt-48 lg:pb-20 bg-[#0b0f19] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={placeholders["blog-packing"].url}
            alt="Checklist"
            fill
            className="object-cover opacity-20 mix-blend-luminosity"
            priority
            data-ai-hint={placeholders["blog-packing"].hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#00ad9f] mb-8 hover:text-white transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Retour au Journal
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
            Checklist déménagement <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ad9f] to-teal-300">
              (30 jours, 7 jours, 48h, jour J)
            </span>
          </h1>
          <div className="flex justify-center gap-6 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#00ad9f]" /> 01 Mars 2026</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#00ad9f]" /> 9–11 min</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 mt-12 lg:mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-8 md:p-16">
            <CardContent className="p-0 space-y-10">
              <ChecklistBlock title="À faire 30 jours avant" icon={<CalendarDays className="h-5 w-5" />} items={["Faire un tri sérieux", "Demander des devis", "Prévenir les organismes"]} />
              <ChecklistBlock title="À faire 7 jours avant" icon={<ListChecks className="h-5 w-5" />} items={["Emballer progressivement", "Étiqueter les cartons", "Confirmer les accès"]} />
              <ChecklistBlock title="À faire 48h avant" icon={<AlarmClock className="h-5 w-5" />} items={["Kit J+1", "Vider le frigo", "Sécuriser les bijoux"]} tone="accent" />
              <ChecklistBlock title="Le jour J" icon={<Truck className="h-5 w-5" />} items={["Protéger les sols", "Relever les compteurs", "Suivre l'équipe"]} tone="dark" />
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}
