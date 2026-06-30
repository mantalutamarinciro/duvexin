import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Landmark, Percent, Activity, TrendingUp } from "lucide-react";
import { getDashboardStats } from "@/services/diagnosticService";

export async function StatCards() {
  const data = await getDashboardStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Chiffre d'Affaires"
        value={data.totalRevenue.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        icon={DollarSign}
        description="Encaissé"
        trend="+12%"
      />
      <StatCard
        title="Rentabilité"
        value={data.netProfit.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        icon={Landmark}
        description="Marge nette"
      />
      <StatCard
        title="Taux de Conv."
        value={`${data.conversionRate}%`}
        icon={Percent}
        description="Devis acceptés"
      />
      <StatCard
        title="Leads Entrants"
        value={data.quotesCount}
        icon={Activity}
        description="À traiter"
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, description, trend }: { title: string, value: string | number, icon: React.ElementType, description?: string, trend?: string }) {
  // Déterminer la couleur de base de l'icône et du fond en fonction du titre
  const isProfit = title === "Rentabilité";
  const isConv = title === "Taux de Conv.";
  const isLeads = title === "Leads Entrants";
  
  const iconBg = isProfit ? "bg-blue-500/10 text-blue-600" : isConv ? "bg-amber-500/10 text-amber-600" : isLeads ? "bg-purple-500/10 text-purple-600" : "bg-emerald-500/10 text-emerald-600";
  const iconColor = isProfit ? "text-blue-600" : isConv ? "text-amber-600" : isLeads ? "text-purple-600" : "text-emerald-600";

  return (
    <Card className="relative overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 bg-white dark:bg-slate-900 group rounded-[2rem]">
      {/* Effet lumineux de fond au survol */}
      <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${isProfit ? 'bg-blue-500' : isConv ? 'bg-amber-500' : isLeads ? 'bg-purple-500' : 'bg-emerald-500'}`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 pt-5 px-6">
        <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">{title}</CardTitle>
        <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-5">
        <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          {trend && (
            <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </span>
          )}
          {description && <p className="text-[11px] font-medium text-slate-400">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
