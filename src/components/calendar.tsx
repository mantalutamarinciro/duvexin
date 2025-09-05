
"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Info } from "lucide-react";
import { Button } from "./ui/button";
import { PlanningEvent } from "@/services/planningService";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import Link from "next/link";

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDayWithOffset = (day: Date) => {
    // getDay returns 0 for Sunday, we want 6
    const dayIndex = getDay(day);
    return dayIndex === 0 ? 6 : dayIndex - 1;
};

const eventTypeDetails: Record<PlanningEvent['type'], { label: string; color: string; linkPrefix: string; }> = {
    move: {
      label: "Déménagement",
      color: "bg-blue-500 hover:bg-blue-600",
      linkPrefix: "/dashboard/bookings"
    },
    commercial: {
      label: "Commercial",
      color: "bg-amber-500 hover:bg-amber-600",
      linkPrefix: "/dashboard/quotes" // This can be updated for visits
    },
};


export function CalendarView({ events }: { events: PlanningEvent[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<PlanningEvent | null>(null);

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDayWithOffset(firstDayOfMonth);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getEventsForDay = (day: Date) => {
    return events
      .filter(event => isSameDay(new Date(event.date), day))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const handleEventClick = (event: PlanningEvent) => {
      setSelectedEvent(event);
  }

  const closeDialog = () => {
    setSelectedEvent(null);
  }

  const getEventLink = (event: PlanningEvent) => {
    if (event.id.startsWith('visit-')) {
      return '/dashboard/visits';
    }
    if (event.type === 'move') {
      return '/dashboard/bookings';
    }
    return '/dashboard/quotes';
  }

  return (
    <>
    <div className="bg-card border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: fr })}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-border">
        {weekDays.map(day => (
          <div key={day} className="text-center font-semibold py-2 text-sm bg-card text-muted-foreground">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-card" />
        ))}
        {daysInMonth.map(day => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={day.toString()} className="min-h-[120px] bg-card p-1.5 flex flex-col">
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={cn(
                  "block text-sm mb-1",
                  isToday(day) && "bg-primary rounded-full w-6 h-6 flex items-center justify-center text-primary-foreground font-bold",
                  !isSameMonth(day, currentMonth) && "text-muted-foreground/50"
                )}
              >
                {format(day, "d")}
              </time>
              <div className="flex-grow space-y-1 overflow-y-auto">
                 {dayEvents.map(event => (
                   <div
                     key={event.id}
                     className={cn(
                       "p-1.5 rounded-md text-white text-xs cursor-pointer truncate",
                       eventTypeDetails[event.type].color,
                       event.id.startsWith('visit-') && 'bg-green-500 hover:bg-green-600'
                     )}
                     title={event.title}
                     onClick={() => handleEventClick(event)}
                   >
                     {event.title}
                   </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
     <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Détails de l'événement</DialogTitle>
                <DialogDescription>
                    Informations sur l'événement sélectionné.
                </DialogDescription>
            </DialogHeader>
            {selectedEvent && (
                <div className="space-y-4 py-2">
                    <div className="flex items-center gap-4">
                        <span className={cn("p-1 rounded-full", eventTypeDetails[selectedEvent.type].color, selectedEvent.id.startsWith('visit-') && 'bg-green-500')}></span>
                        <h3 className="font-bold text-lg">{selectedEvent.title}</h3>
                    </div>
                     <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4"/>
                        Type : {selectedEvent.id.startsWith('visit-') ? 'Visite' : eventTypeDetails[selectedEvent.type].label}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4"/>
                        Date : {format(new Date(selectedEvent.date), "EEEE d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </p>
                    {selectedEvent.details && (
                         <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Info className="h-4 w-4"/>
                            Détails : {selectedEvent.details}
                        </p>
                    )}
                    <Button asChild className="w-full" onClick={() => setSelectedEvent(null)}>
                        <Link href={getEventLink(selectedEvent)}>
                            Voir dans {selectedEvent.id.startsWith('visit-') ? 'Visites' : (selectedEvent.type === 'move' ? 'Réservations' : 'Devis')}
                        </Link>
                    </Button>
                </div>
            )}
        </DialogContent>
    </Dialog>
    </>
  );
}
