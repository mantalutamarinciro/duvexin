import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFinancialDashboardStats } from "@/services/diagnosticService";
import { FinancialDashboardClient } from "@/components/dashboard/financial-dashboard-client";
import { TrendingUp, Wallet, BarChart3, Target, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function fmt(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

async function FinancialContent() {
  const kpis = await getFinancialDashboardStats();

  const kpiCards = [
    {
      label: "CA Facturé (12 mois)",
      value: fmt(kpis.caTotalAnnuel),
      sub: `${kpis.nbFactures} facture${kpis.nbFactures > 1 ? "s" : ""} émise${kpis.nbFactures > 1 ? "s" : ""}`,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Encaissé réel",
      value: fmt(kpis.encaisseTotal),
      sub: `${kpis.nbFacturesPayees} facture${kpis.nbFacturesPayees > 1 ? "s" : ""} soldée${kpis.nbFacturesPayees > 1 ? "s" : ""}`,
      icon: Wallet,
      color: "teal",
    },
    {
      label: "Marge brute",
      value: fmt(kpis.margeBrute),
      sub: `${kpis.margeRate}% du CA`,
      icon: BarChart3,
      color: kpis.margeRate >= 30 ? "emerald" : kpis.margeRate >= 10 ? "amber" : "red",
    },
    {
      label: "Panier moyen",
      value: fmt(kpis.panierMoyen),
      sub: "par chantier facturé",
      icon: Receipt,
      color: "blue",
    },
    {
      label: "Taux de conversion",
      value: `${kpis.tauxConversion}%`,
      sub: `${kpis.nbDevisConverti} / ${kpis.nbDevisTotal} devis`,
      icon: Target,
      color: kpis.tauxConversion >= 50 ? "emerald" : "amber",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-100",
    teal:    "bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 border-teal-100",
    amber:   "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-100",
    blue:    "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-100",
    red:     "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-100",
  };
  const iconColorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400",
    teal:    "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400",
    amber:   "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400",
    blue:    "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    red:     "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
  };

  return (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className={`rounded-[2rem] border shadow-sm ${colorMap[kpi.color]}`}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-2xl shrink-0 ${iconColorMap[kpi.color]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 truncate">{kpi.label}</p>
                    <p className="text-xl font-black mt-0.5 leading-tight">{kpi.value}</p>
                    <p className="text-xs opacity-60 mt-0.5">{kpi.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <FinancialDashboardClient kpis={kpis} />
    </>
  );
}

export default function FinancesPage() {
  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <p className="text-sm font-bold text-primary uppercase tracking-widest">Analyse financière</p>
        <h1 className="font-headline text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Tableau de bord financier
        </h1>
        <p className="text-slate-500 font-medium">
          Chiffre d&apos;affaires, marges, panier moyen et taux de conversion — 12 derniers mois.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-28 w-full rounded-[2rem]" />
              ))}
            </div>
            <Skeleton className="h-96 w-full rounded-[2rem]" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-80 w-full rounded-[2rem]" />
              <Skeleton className="h-80 w-full rounded-[2rem]" />
            </div>
          </div>
        }
      >
        <FinancialContent />
      </Suspense>
    </div>
  );
}
