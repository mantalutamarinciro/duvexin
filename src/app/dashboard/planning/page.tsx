
"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getPlanningData, PlanningEvent } from "@/services/planningService";
import { CalendarView } from "@/components/calendar";

export default function PlanningPage() {
    const [events, setEvents] = useState<PlanningEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getPlanningData();
                setEvents(data);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: "Erreur",
                    description: "Impossible de charger les données du planning."
                });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [toast]);

    const commercialEvents = events.filter(e => e.type === 'commercial');
    const moveEvents = events.filter(e => e.type === 'move');

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Plannings</h1>

            <Tabs defaultValue="moves">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="moves">Déménagements</TabsTrigger>
                    <TabsTrigger value="commercial">Suivi Commercial</TabsTrigger>
                </TabsList>
                <TabsContent value="moves" className="mt-4">
                    {loading ? <Skeleton className="h-[70vh] w-full" /> : <CalendarView events={moveEvents} />}
                </TabsContent>
                <TabsContent value="commercial" className="mt-4">
                     {loading ? <Skeleton className="h-[70vh] w-full" /> : <CalendarView events={commercialEvents} />}
                </TabsContent>
            </Tabs>
        </div>
    );
}
