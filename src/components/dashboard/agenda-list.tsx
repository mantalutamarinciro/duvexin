import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getBookings } from "@/services/bookingService";
import { format, isToday, isTomorrow } from "date-fns";

export async function AgendaList() {
  const fetchedBookings = await getBookings();
  
  const agenda = fetchedBookings.filter(b => {
    const moveDate = new Date(b.moveDate);
    return (isToday(moveDate) || isTomorrow(moveDate)) && b.status !== 'Annulé';
  }).sort((a, b) => new Date(a.moveDate).getTime() - new Date(b.moveDate).getTime());

  return (
    <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Agenda opérationnel
        </CardTitle>
        <CardDescription>Les interventions prévues aujourd'hui et demain.</CardDescription>
      </CardHeader>
      <CardContent>
        {agenda.length > 0 ? (
          <div className="space-y-3">
            {agenda.map((booking) => (
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
  );
}
