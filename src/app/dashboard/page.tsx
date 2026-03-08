
"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { DollarSign, Package, Users, Activity, BarChart, PieChart, Landmark, Percent, TrendingUp } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStats } from "@/services/diagnosticService";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { QuotesStatusChart } from "@/components/charts/quotes-status-chart";

interface DashboardData {
  totalRevenue: number;
  netProfit: number;
  bookingsCount: number;
  quotesCount: number;
  conversionRate: number;
  charts: {
    revenue: { name: string; total: number }[];
    quotes: { name: string; value: number }[];
  };
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const fetchedData = await getDashboardStats();
        setData(fetchedData);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);


  const StatCard = ({ title, value, icon: Icon, description, isLoading, trend }: { title: string, value: string | number, icon: React.ElementType, description?: string, isLoading: boolean, trend?: string }) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-1/2" />
            {description && <Skeleton className="h-4 w-3/4 mt-1" />}
          </>
        ) : (
          <>
            <div className="text-2xl font-black text-slate-900">{value}</div>
            <div className="flex items-center gap-2 mt-1">
              {description && <p className="text-xs text-muted-foreground">{description}</p>}
              {trend && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5"><TrendingUp className="h-2 w-2"/>{trend}</span>}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900">Vue d'ensemble</h1>
        <p className="text-muted-foreground">Pilotez votre activité en temps réel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Chiffre d'Affaires"
          value={data ? data.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={DollarSign}
          description="Revenus encaissés"
          isLoading={loading}
          trend="+12%"
        />
        <StatCard
          title="Marge Nette"
          value={data ? data.netProfit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={Landmark}
          description="Après dépenses"
          isLoading={loading}
        />
        <StatCard
          title="Taux de Conversion"
          value={data ? `${data.conversionRate}%` : '0%'}
          icon={Percent}
          description="Devis vers Réservations"
          isLoading={loading}
        />
        <StatCard
          title="Devis Entrants"
          value={data ? data.quotesCount : 0}
          icon={Activity}
          description="En attente de traitement"
          isLoading={loading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="rounded-[2rem] border-slate-100 shadow-sm">
           <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary"/>Courbe des Revenus</CardTitle>
                <CardDescription>Évolution mensuelle du CA (réservations terminées).</CardDescription>
            </CardHeader>
          <CardContent>
             {loading ? <Skeleton className="w-full h-[350px]" /> : <RevenueChart data={data?.charts.revenue || []} />}
          </CardContent>
        </Card>
        
        <Card className="rounded-[2rem] border-slate-100 shadow-sm">
           <CardHeader>
                <CardTitle className="flex items-center gap-2"><PieChart className="h-5 w-5 text-primary"/>Performance Commerciale</CardTitle>
                <CardDescription>Répartition des statuts de devis sur la période.</CardDescription>
            </CardHeader>
          <CardContent>
             {loading ? <Skeleton className="w-full h-[350px]" /> : <QuotesStatusChart data={data?.charts.quotes || []} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
