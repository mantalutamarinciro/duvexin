import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, PieChart } from "lucide-react";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { QuotesStatusChart } from "@/components/charts/quotes-status-chart";
import { getDashboardStats } from "@/services/diagnosticService";

export async function DashboardRevenueChart() {
  const data = await getDashboardStats();

  return (
    <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Revenus mensuels
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RevenueChart data={data?.charts.revenue || []} />
      </CardContent>
    </Card>
  );
}

export async function DashboardQuotesChart() {
  const data = await getDashboardStats();

  return (
    <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          Performance Devis
        </CardTitle>
        <CardDescription>Répartition des statuts de conversion.</CardDescription>
      </CardHeader>
      <CardContent>
        <QuotesStatusChart data={data?.charts.quotes || []} />
      </CardContent>
    </Card>
  );
}
