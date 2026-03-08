
"use client"

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { 
  DollarSign, 
  Activity, 
  BarChart, 
  PieChart, 
  Landmark, 
  Percent, 
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  CheckCircle2
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardStats } from "@/services/diagnosticService";
import { getBookings, type Booking } from "@/services/bookingService";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { QuotesStatusChart } from "@/components/charts/quotes-status-chart";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [fetchedStats, fetchedBookings] = await Promise.all([
          getDashboardStats(),
          getBookings()
        ]);
        setData(fetchedStats);
        
        // On ne garde que les déménagements prévus aujourd'hui et demain
        const today = new Date();
        const agenda = fetchedBookings.filter(b => {
          const moveDate = new Date(b.moveDate);
          return (isToday(moveDate) || isTomorrow(moveDate)) && b.status !== 'Annulé';
        }).sort((a, b) => new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime());
        
        setBookings(agenda);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);


  const StatCard = ({ title, value, icon: Icon, description, isLoading, trend }: { title: string, value: string | number, icon: React.ElementType, description?: string, isLoading: boolean, trend?: string }) => (
    <Card className="relative overflow-hidden border-none shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-black text-slate-900 dark:text-white">{value}</div>
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
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900 dark:text-white">Vue d'ensemble</h1>
          <p className="text-muted-foreground">Bonjour ! Voici l'état de votre exploitation ce matin.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full" asChild>
              <Link href="/dashboard/planning"><Calendar className="mr-2 h-4 w-4"/> Planning</Link>
           </Button>
           <Button className="rounded-full bg-primary shadow-lg shadow-primary/20" asChild>
              <Link href="/dashboard/quote"><CheckCircle2 className="mr-2 h-4 w-4"/> Nouveau Devis</Link>
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Chiffre d'Affaires"
          value={data ? data.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={DollarSign}
          description="Encaissé"
          isLoading={loading}
          trend="+12%"
        />
        <StatCard
          title="Rentabilité"
          value={data ? data.netProfit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '0 €'}
          icon={Landmark}
          description="Marge nette"
          isLoading={loading}
        />
        <StatCard
          title="Taux de Conv."
          value={data ? `${data.conversionRate}%` : '0%'}
          icon={Percent}
          description="Devis acceptés"
          isLoading={loading}
        />
        <StatCard
          title="Leads Entrants"
          value={data ? data.quotesCount : 0}
          icon={Activity}
          description="À traiter"
          isLoading={loading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Agenda du jour et demain */}
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Agenda opérationnel
              </CardTitle>
              <CardDescription>Les interventions prévues aujourd'hui et demain.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)}
                </div>
              ) : bookings.length > 0 ? (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-12 w-12 rounded-xl flex flex-col items-center justify-center text-[10px] font-black uppercase",
                          isToday(new Date(booking.moveDate)) ? "bg-primary/10 text-primary border border-primary/20" : "bg-slate-100 text-slate-500"
                        )}>
                          <span>{format(new Date(booking.moveDate), "dd")}</span>
                          <span>{format(new Date(booking.moveDate), "MMM")}</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{booking.clientName}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.originAddress.split(',')[0]}</span>
                            <span className="flex items-center gap-1 font-bold text-primary"><ArrowRight className="h-3 w-3" /> {booking.destinationAddress.split(',')[0]}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <Badge variant="outline" className="text-[10px] font-bold">{booking.status}</Badge>
                        <Link href={`/dashboard/bookings`} className="text-xs text-primary font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          Détails <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-muted-foreground italic text-sm">
                  Aucun déménagement prévu pour les prochaines 48h.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Revenus mensuels
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[250px]" /> : <RevenueChart data={data?.charts.revenue || []} />}
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite : Stats Devis et Accès rapides */}
        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                Performance Devis
              </CardTitle>
              <CardDescription>Répartition des statuts de conversion.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="w-full h-[300px]" /> : <QuotesStatusChart data={data?.charts.quotes || []} />}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-primary/5 dark:bg-primary/10 overflow-hidden relative isolate">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
            <CardHeader>
              <CardTitle className="text-lg">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-2xl h-20 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900" asChild>
                <Link href="/dashboard/visits">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold">Visite technique</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-20 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900" asChild>
                <Link href="/dashboard/communication">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-xs font-bold">Relances clients</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-20 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900" asChild>
                <Link href="/dashboard/routing">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-xs font-bold">Route IA</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-20 flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900" asChild>
                <Link href="/dashboard/expenses">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs font-bold">Dépenses</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
