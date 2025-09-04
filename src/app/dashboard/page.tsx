
"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { DollarSign, Package, Users, Activity, BarChart, PieChart, Landmark } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStats } from "@/services/diagnosticService";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { QuotesStatusChart } from "@/components/charts/quotes-status-chart";

interface DashboardData {
  totalRevenue: number;
  netProfit: number;
  bookingsCount: number;
  teamsCount: number;
  quotesCount: number;
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


  const StatCard = ({ title, value, icon: Icon, description, isLoading }: { title: string, value: string | number, icon: React.ElementType, description?: string, isLoading: boolean }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-1/2" />
            {description && <Skeleton className="h-4 w-3/4 mt-1" />}
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Tableau de bord</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenu Total"
          value={data ? data.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={DollarSign}
          description="Basé sur les réservations terminées"
          isLoading={loading}
        />
        <StatCard
          title="Marge Nette"
          value={data ? data.netProfit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={Landmark}
          description="Revenu total - Dépenses"
          isLoading={loading}
        />
        <StatCard
          title="Devis en attente"
          value={data ? data.quotesCount : 0}
          icon={Activity}
          description="Devis attendant une réponse"
          isLoading={loading}
        />
        <StatCard
          title="Réservations"
          value={data ? data.bookingsCount : 0}
          icon={Package}
          description="Toutes les réservations"
          isLoading={loading}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card>
           <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart/>Revenus Mensuels</CardTitle>
                <CardDescription>Chiffre d'affaires des déménagements terminés.</CardDescription>
            </CardHeader>
          <CardContent>
             {loading ? <Skeleton className="w-full h-[350px]" /> : <RevenueChart data={data?.charts.revenue || []} />}
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
                <CardTitle className="flex items-center gap-2"><PieChart/>Statut des Devis</CardTitle>
                <CardDescription>Répartition des devis acceptés et refusés.</CardDescription>
            </CardHeader>
          <CardContent>
             {loading ? <Skeleton className="w-full h-[350px]" /> : <QuotesStatusChart data={data?.charts.quotes || []} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
