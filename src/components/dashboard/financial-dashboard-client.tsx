"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FinancialKPIs } from "@/services/diagnosticService";
import { TrendingUp, BarChart2, Target } from "lucide-react";

// ─── Formatters ────────────────────────────────────────────────────────────────

function fmtEur(v: number) {
  return v.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function fmtShort(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k€`;
  return `${v}€`;
}

// ─── Custom Tooltips ───────────────────────────────────────────────────────────

const AreaTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 px-4 py-3 shadow-2xl text-sm min-w-[180px]">
      <p className="text-slate-400 font-semibold mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-4">
          <span style={{ color: p.color }} className="font-medium">{p.name}</span>
          <span className="text-white font-black">{fmtEur(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-700 px-4 py-3 shadow-2xl text-sm">
      <p className="text-slate-400 font-semibold mb-1">{label}</p>
      <p className="text-white font-black">{fmtEur(payload[0]?.value ?? 0)}</p>
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  kpis: FinancialKPIs;
}

export function FinancialDashboardClient({ kpis }: Props) {
  // Filter months with at least some activity for cleaner charts
  const activeMonths = useMemo(() =>
    kpis.monthly.filter(m => m.ca > 0 || m.depenses > 0 || m.encaisse > 0),
    [kpis.monthly]
  );

  const chartData = activeMonths.length > 0 ? activeMonths : kpis.monthly;

  // Panier moyen monthly — use CA as proxy per unique month
  const panierData = chartData.map(m => ({
    month: m.month,
    panier: m.ca, // will be refined if we had per-invoice count
    marge: m.marge,
  }));

  // Conversion funnel data for radial chart
  const conversionData = [
    { name: "Convertis", value: kpis.tauxConversion, fill: "#00ad9f" },
    { name: "Non convertis", value: 100 - kpis.tauxConversion, fill: "#e2e8f0" },
  ];

  return (
    <div className="space-y-6">

      {/* Chart 1 : CA mensuel vs Dépenses (Area Chart) */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Chiffre d&apos;affaires mensuel vs Dépenses
          </CardTitle>
          <CardDescription>Évolution sur 12 mois — CA facturé, encaissé et dépenses.</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-400 text-sm">
              Aucune donnée financière disponible pour le moment.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ad9f" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00ad9f" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradEncaisse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradDep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={fmtShort} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={52} />
                <Tooltip content={<AreaTooltip />} />
                <Legend
                  formatter={(v) => <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{v}</span>}
                  wrapperStyle={{ paddingTop: "12px" }}
                />
                <Area type="monotone" dataKey="ca" name="CA Facturé" stroke="#00ad9f" strokeWidth={2.5} fill="url(#gradCA)" dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="encaisse" name="Encaissé" stroke="#6366f1" strokeWidth={2} fill="url(#gradEncaisse)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="depenses" name="Dépenses" stroke="#f43f5e" strokeWidth={2} fill="url(#gradDep)" dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Chart 2 : Marge mensuelle (Bar Chart) */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart2 className="h-5 w-5 text-indigo-500" />
              Marge brute mensuelle
            </CardTitle>
            <CardDescription>CA – Dépenses par mois.</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            {panierData.length === 0 ? (
              <div className="flex items-center justify-center h-52 text-slate-400 text-sm">Aucune donnée.</div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={panierData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmtShort} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={46} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="marge" name="Marge" radius={[8, 8, 0, 0]}>
                    {panierData.map((entry, index) => (
                      <Cell key={index} fill={entry.marge >= 0 ? "#00ad9f" : "#f43f5e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Chart 3 : Taux de conversion devis → facture */}
        <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-5 w-5 text-amber-500" />
              Taux de conversion Devis → Facture
            </CardTitle>
            <CardDescription>Part des devis convertis en chantiers facturés.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative">
                <ResponsiveContainer width={220} height={220}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    startAngle={90}
                    endAngle={-270}
                    data={conversionData}
                    barSize={20}
                  >
                    <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "#f1f5f9" }}>
                      {conversionData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </RadialBar>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{kpis.tauxConversion}%</span>
                  <span className="text-xs text-slate-400 font-semibold mt-0.5">conversion</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 text-center">
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{kpis.nbDevisTotal}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Devis total</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-3 text-center">
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400">{kpis.nbDevisConverti}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">Convertis</p>
                </div>
                <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-3 text-center">
                  <p className="text-2xl font-black text-red-600 dark:text-red-400">{kpis.nbDevisTotal - kpis.nbDevisConverti}</p>
                  <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wider mt-0.5">Perdus</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
