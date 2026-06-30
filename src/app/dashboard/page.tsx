import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, CheckCircle2, MapPin, Clock, Truck, DollarSign } from "lucide-react"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCards } from "@/components/dashboard/stat-cards";
import { OperationalAlerts } from "@/components/dashboard/operational-alerts";
import { AgendaList } from "@/components/dashboard/agenda-list";
import { DashboardRevenueChart, DashboardQuotesChart } from "@/components/dashboard/dashboard-charts";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Tableau de bord</p>
          <h1 className="font-headline text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">Tour de contrôle</h1>
          <p className="text-slate-500 font-medium">Bon retour ! Voici le résumé de votre activité d'aujourd'hui.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-full shadow-sm hover:shadow-md transition-all border-slate-200" asChild>
              <Link href="/dashboard/planning"><Calendar className="mr-2 h-4 w-4 text-primary"/> Planning</Link>
           </Button>
           <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-[0_8px_30px_rgb(0,169,157,0.3)] transition-all" asChild>
              <Link href="/dashboard/quote"><CheckCircle2 className="mr-2 h-4 w-4"/> Nouveau Devis</Link>
           </Button>
        </div>
      </div>

      <Suspense fallback={<Skeleton className="h-24 w-full rounded-2xl" />}>
        <OperationalAlerts />
      </Suspense>

      <Suspense fallback={
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
      }>
        <StatCards />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-12 lg:col-span-7 space-y-6">
          <Suspense fallback={
            <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
               <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
               <CardContent className="space-y-4">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)}
               </CardContent>
            </Card>
          }>
            <AgendaList />
          </Suspense>

          <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-[2rem]" />}>
            <DashboardRevenueChart />
          </Suspense>
        </div>

        <div className="md:col-span-12 lg:col-span-5 space-y-6">
          <Suspense fallback={<Skeleton className="h-[350px] w-full rounded-[2rem]" />}>
            <DashboardQuotesChart />
          </Suspense>

          <Card className="rounded-[2rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:to-transparent overflow-hidden relative isolate">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-2xl h-24 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-white/50 dark:border-slate-800/50 hover:bg-white hover:scale-105 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group" asChild>
                <Link href="/dashboard/visits">
                  <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Visite technique</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-24 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-white/50 dark:border-slate-800/50 hover:bg-white hover:scale-105 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group" asChild>
                <Link href="/dashboard/communication">
                  <div className="p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Relances</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-24 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-white/50 dark:border-slate-800/50 hover:bg-white hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group" asChild>
                <Link href="/dashboard/routing">
                  <div className="p-2 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Route IA</span>
                </Link>
              </Button>
              <Button variant="outline" className="rounded-2xl h-24 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-white/50 dark:border-slate-800/50 hover:bg-white hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group" asChild>
                <Link href="/dashboard/expenses">
                  <div className="p-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Dépenses</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
