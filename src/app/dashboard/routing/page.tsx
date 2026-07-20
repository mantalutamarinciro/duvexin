"use client";

import { useState, useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Wand2, ListOrdered, Navigation, MapPin } from "lucide-react";
import { optimizeRoute, RouteOptimizationOutput } from "@/ai/flows/route-optimization-flow";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const routeStopSchema = z.object({
  address: z.string().min(5, "L'adresse doit comporter au moins 5 caractères."),
});

const routeSchema = z.object({
  depotAddress: z.string().min(5, "L'adresse du dépôt est requise."),
  stops: z.array(routeStopSchema).min(2, "Veuillez ajouter au moins deux arrêts."),
});

type RouteFormValues = z.infer<typeof routeSchema>;

interface InteractiveRouteMapProps {
  route: Array<{ order: number; address: string }>;
}

function InteractiveRouteMap({ route }: InteractiveRouteMapProps) {
  // Calcule des positions de nœuds stables (X, Y) basées sur la valeur textuelle de l'adresse
  const points = useMemo(() => {
    return route.map((stop, idx) => {
      const addr = stop.address;
      let hash = 0;
      for (let i = 0; i < addr.length; i++) {
        hash = addr.charCodeAt(i) + ((hash << 5) - hash);
      }
      
      // Distribution sur une grille de 500x300, en évitant les collisions
      // Le dépôt (idx 0 et dernier) doit avoir les mêmes coordonnées
      const x = 60 + Math.abs(hash % 380); // 60 à 440
      const y = 50 + Math.abs((hash >> 8) % 200); // 50 à 250
      return { ...stop, x, y };
    });
  }, [route]);

  // Génère le tracé SVG
  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    d += ` Z`; // Boucle vers le dépôt
    return d;
  }, [points]);

  return (
    <div className="relative w-full rounded-[2rem] overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl h-[360px] group/map">
      {/* Grille de radar tactique */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ad9f08,transparent_60%)] pointer-events-none" />
      
      {/* Boussole / Effet sonar d'arrière-plan */}
      <div className="absolute bottom-6 right-6 h-20 w-20 border border-slate-800/80 rounded-full flex items-center justify-center opacity-40 pointer-events-none">
        <div className="h-14 w-14 border border-dashed border-[#00ad9f]/20 rounded-full animate-spin [animation-duration:15s]" />
        <div className="absolute h-6 w-px bg-gradient-to-b from-transparent via-[#00ad9f] to-transparent" />
        <div className="absolute w-6 h-px bg-gradient-to-r from-transparent via-[#00ad9f] to-transparent" />
        <Navigation className="absolute h-3 w-3 text-primary rotate-45 animate-pulse" />
      </div>

      <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800 text-[10px] font-black uppercase tracking-widest text-[#00ad9f] z-20 flex items-center gap-2 shadow-lg">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
        Carte de tournée IA
      </div>

      <svg className="w-full h-full relative z-10 p-6" viewBox="0 0 500 300">
        {pathD && (
          <>
            {/* Tracé sous-jacent (Glow effect) */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0, 173, 159, 0.15)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ligne animée (Dotted flow) */}
            <path
              d={pathD}
              fill="none"
              stroke="#00ad9f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 8"
              className="animate-[dash_35s_linear_infinite]"
            />
          </>
        )}

        {/* Nœuds d'arrêts */}
        {points.map((pt, idx) => {
          const isDepot = idx === 0;
          return (
            <g key={`${pt.order}-${idx}`} className="cursor-pointer group">
              {/* Cercle réactif au survol */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="16"
                fill={isDepot ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 173, 159, 0.15)"}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              {/* Le point principal */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="10"
                fill={isDepot ? "#ef4444" : "#0f172a"}
                stroke={isDepot ? "#ffffff" : "#00ad9f"}
                strokeWidth="2.5"
                className="transition-all duration-300 group-hover:scale-110"
              />
              {/* Numéro ou lettre d'ordre */}
              <text
                x={pt.x}
                y={pt.y + 3}
                fill={isDepot ? "#ffffff" : "#00ad9f"}
                fontSize="9"
                fontWeight="900"
                textAnchor="middle"
                className="pointer-events-none select-none font-sans"
              >
                {isDepot ? "D" : pt.order}
              </text>
              {/* Infobulle textuelle */}
              <foreignObject
                x={pt.x - 70}
                y={pt.y - 42}
                width="140"
                height="32"
                className="opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-1 group-hover:translate-y-0"
              >
                <div className="bg-slate-900/95 text-white text-[9px] font-bold px-2 py-1 rounded-xl border border-slate-800 text-center truncate shadow-2xl">
                  {isDepot ? "Dépôt : " : `Étape ${pt.order} : `}{pt.address.split(',')[0]}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
}

export default function RoutingPage() {
  const [optimizationResult, setOptimizationResult] = useState<RouteOptimizationOutput | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      depotAddress: "",
      stops: [{ address: "" }, { address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stops",
  });

  const onSubmit = async (values: RouteFormValues) => {
    setIsOptimizing(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeRoute({
        depotAddress: values.depotAddress,
        stopAddresses: values.stops.map(s => s.address),
      });
      setOptimizationResult(result);
      toast({
        title: "Optimisation réussie !",
        description: "L'itinéraire a été calculé et tracé par l'IA.",
      });
    } catch (error) {
      console.error("Erreur d'optimisation IA:", error);
      toast({
        variant: "destructive",
        title: "Erreur de l'IA",
        description: "Impossible d'optimiser l'itinéraire. Veuillez vérifier les adresses.",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-2xl">
            <Navigation className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900 dark:text-white">Optimiseur de Tournée IA</h1>
            <p className="text-sm text-slate-500">Calculez et visualisez instantanément le trajet logistique optimal pour vos équipes.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Formulaire (Prend moins de place si résultat affiché) */}
        <div className={optimizationResult ? "lg:col-span-4" : "lg:col-span-8"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Points de passage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="depotAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Adresse du dépôt (Départ & Retour)</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 9 Rue de Pontoise, 95540 Méry-sur-Oise" {...field} className="rounded-xl h-11 border-slate-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-3">
                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Adresses des chantiers / clients</FormLabel>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`stops.${index}.address`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder={`Adresse de l'arrêt n°${index + 1}`} {...field} className="rounded-xl h-11 border-slate-200" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            disabled={fields.length <= 2}
                            className="text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-xl h-11 w-11 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ address: "" })}
                    className="rounded-full font-bold border-slate-200"
                  >
                    <Plus className="mr-2 h-4 w-4 text-primary" />
                    Ajouter une adresse
                  </Button>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={isOptimizing} className="w-full rounded-2xl h-14 font-black shadow-lg shadow-primary/20">
                 {isOptimizing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                Calculer le tracé optimal
              </Button>
            </form>
          </Form>
        </div>

        {/* Affichage de la carte interactive & résultats */}
        <div className={optimizationResult ? "lg:col-span-8 space-y-6" : "lg:col-span-4"}>
          {optimizationResult ? (
            <div className="space-y-6">
              {/* Carte vectorielle animée */}
              <InteractiveRouteMap route={optimizationResult.optimizedRoute} />

              <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg font-bold">
                    <ListOrdered className="h-5 w-5 text-primary" />
                    Feuille de route optimisée
                  </CardTitle>
                  <div className="flex justify-between items-center text-sm font-semibold bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl mt-2">
                    <span className="text-slate-500">Distance totale de la tournée :</span>
                    <span className="text-xl font-black text-primary">
                      {optimizationResult.totalDistanceKm.toFixed(1)} km
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {optimizationResult.optimizedRoute.map((stop, index) => {
                      const isDepot = index === 0 || index === optimizationResult.optimizedRoute.length - 1;
                      return (
                        <div key={`${stop.order}-${index}`} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-2xl">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full font-black text-[10px] shrink-0 mt-0.5 shadow-sm text-white ${isDepot ? "bg-red-500" : "bg-primary"}`}>
                            {isDepot ? "D" : stop.order}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {isDepot ? "Dépôt" : `Étape ${stop.order}`}
                            </p>
                            <p className="text-xs text-slate-500 truncate mt-0.5" title={stop.address}>
                              {stop.address}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-6" />
                  <p className="text-center text-xs font-medium text-slate-400">
                    ℹ️ L'itinéraire commence et se termine à l'adresse du dépôt. Les temps de trajet et l'ordre sont calculés par l'IA de Déménagement du Vexin.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Navigation className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
              <p className="font-bold text-sm">En attente d'optimisation</p>
              <p className="text-xs max-w-xs mt-1">Configurez votre dépôt et vos arrêts chantiers à gauche puis cliquez sur "Calculer le tracé optimal".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
