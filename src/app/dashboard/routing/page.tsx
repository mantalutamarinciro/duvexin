
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Route, Wand2, ListOrdered } from "lucide-react";
import { optimizeRoute, RouteOptimizationOutput } from "@/ai/flows/route-optimization-flow";
import { Separator } from "@/components/ui/separator";

const routeStopSchema = z.object({
  address: z.string().min(5, "L'adresse doit comporter au moins 5 caractères."),
});

const routeSchema = z.object({
  depotAddress: z.string().min(5, "L'adresse du dépôt est requise."),
  stops: z.array(routeStopSchema).min(2, "Veuillez ajouter au moins deux arrêts."),
});

type RouteFormValues = z.infer<typeof routeSchema>;

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
        description: "L'itinéraire a été calculé par l'IA.",
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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Optimiseur de Tournée IA</h1>
        <p className="text-muted-foreground">Saisissez un point de départ et des arrêts pour calculer l'itinéraire le plus efficace.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurer la tournée</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="depotAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse du dépôt (départ et retour)</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 12 Rue de la République, 75001 Paris" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div>
                    <FormLabel>Arrêts à visiter</FormLabel>
                    <div className="mt-2 space-y-3">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`stops.${index}.address`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder={`Adresse de l'arrêt n°${index + 1}`} {...field} />
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
                            className="text-muted-foreground hover:text-destructive"
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
                  >
                    <Plus className="mr-2" />
                    Ajouter un arrêt
                  </Button>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={isOptimizing}>
                 {isOptimizing ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2" />}
                Optimiser la tournée
              </Button>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-1">
          {optimizationResult && (
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListOrdered />
                  Itinéraire optimisé
                </CardTitle>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Distance totale estimée :</span>
                    <span className="font-bold text-lg text-primary">
                        {optimizationResult.totalDistanceKm.toFixed(1)} km
                    </span>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {optimizationResult.optimizedRoute.map(stop => (
                    <li key={stop.order} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xs flex-shrink-0 mt-1">
                        {stop.order}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{stop.address}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                 <Separator className="my-4"/>
                 <div className="text-center text-xs text-muted-foreground">
                    L'itinéraire commence et se termine à l'adresse du dépôt.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
