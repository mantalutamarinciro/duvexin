
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PlanningEvent } from "@/services/planningService";
import { cn } from "@/lib/utils";

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const getDayWithOffset = (day: Date) => {
    // getDay returns 0 for Sunday, we want 6
    const dayIndex = getDay(day);
    return dayIndex === 0 ? 6 : dayIndex - 1;
};

const eventColors: Record<PlanningEvent['type'], string> = {
    move: "bg-blue-500 hover:bg-blue-600",
    commercial: "bg-amber-500 hover:bg-amber-600",
};

export function CalendarView({ events }: { events: PlanningEvent[] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">
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
                       eventColors[event.type]
                     )}
                     title={event.title}
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
  );
}
