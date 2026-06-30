import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellRing, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { getOperationalAlerts } from "@/services/diagnosticService";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function OperationalAlerts() {
  const alerts = await getOperationalAlerts();

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] bg-gradient-to-r from-amber-50/50 to-amber-100/30 dark:from-amber-950/20 dark:to-transparent overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-6 border-b border-amber-100 dark:border-amber-900/30 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
        <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-amber-700 dark:text-amber-500">
          <BellRing className="h-4 w-4" /> Centre d'alertes opérationnelles
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {alerts.map((alert) => (
          <div key={alert.id} className="group flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-100/50 dark:border-amber-900/20 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300">
            <div className={cn(
              "mt-0.5 p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110 duration-300",
              alert.severity === 'critical' ? "bg-red-50 text-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]" : 
              alert.severity === 'warning' ? "bg-amber-50 text-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : "bg-blue-50 text-blue-600 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            )}>
              {alert.severity === 'critical' ? <AlertCircle className="h-4 w-4" /> : 
               alert.severity === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight">{alert.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{alert.description}</p>
              {alert.link && (
                <Link href={alert.link} className="text-[10px] font-black uppercase tracking-wider text-primary mt-3 inline-block hover:text-primary/80 transition-colors">
                  Traiter maintenant →
                </Link>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
