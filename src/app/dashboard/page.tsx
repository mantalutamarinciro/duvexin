"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { DollarSign, Package, Users, Activity } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStats } from "@/services/diagnosticService";

interface DashboardStats {
  totalRevenue: number;
  bookingsCount: number;
  teamsCount: number;
  quotesCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const fetchedStats = await getDashboardStats();
        setStats(fetchedStats);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
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
          value={stats ? stats.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={DollarSign}
          description="Basé sur les réservations terminées"
          isLoading={loading}
        />
        <StatCard
          title="Réservations"
          value={stats ? stats.bookingsCount : 0}
          icon={Package}
          description="Toutes les réservations"
          isLoading={loading}
        />
        <StatCard
          title="Devis en attente"
          value={stats ? stats.quotesCount : 0}
          icon={Activity}
          description="Devis attendant une réponse"
          isLoading={loading}
        />
        <StatCard
          title="Équipes Actives"
          value={stats ? stats.teamsCount : 0}
          icon={Users}
          description="Équipes prêtes à travailler"
          isLoading={loading}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
           <CardHeader>
                <CardTitle>Statistiques à venir</CardTitle>
                <CardDescription>D'autres graphiques et analyses seront bientôt disponibles ici.</CardDescription>
            </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl animate-pulse">📊</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center justify-center min-h-[400px]">
           <CardHeader>
                <CardTitle>Rapports futurs</CardTitle>
                <CardDescription>Des rapports détaillés pourront être générés depuis cette section.</CardDescription>
            </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl animate-pulse">📈</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
