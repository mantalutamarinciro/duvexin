
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Truck, Loader2, Gauge, Calendar as CalendarIcon, ShieldAlert, Wrench } from "lucide-react"
import { format, isBefore, addDays } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createVehicle, getVehicles, Vehicle } from "@/services/vehicleService"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export const vehicleTypes = ['Fourgon', 'Camion 12m³', 'Camion 20m³', 'Camionnette', 'Poids Lourd'] as const;
export type VehicleType = typeof vehicleTypes[number];

const vehicleSchema = z.object({
  type: z.enum(vehicleTypes, { required_error: "Le type est requis." }),
  brand: z.string().min(2, "La marque est requise."),
  registration: z.string().min(3, "L'immatriculation est requise."),
  volume: z.coerce.number().positive("Le volume doit être positif."),
  lastMaintenanceDate: z.string().optional(),
  nextMaintenanceDate: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
})

type VehicleFormValues = z.infer<typeof vehicleSchema>;

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      registration: "",
      volume: 12,
      type: 'Fourgon',
    },
  })

  const loadVehicles = async () => {
    setLoading(true)
    try {
      const fetchedVehicles = await getVehicles()
      setVehicles(fetchedVehicles)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la flotte de véhicules.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  async function onSubmit(values: VehicleFormValues) {
    setIsSubmitting(true)
    try {
      await createVehicle(values)
      toast({
        title: "Véhicule ajouté",
        description: `Le véhicule ${values.brand} (${values.registration}) a été ajouté à votre flotte.`,
      })
      form.reset()
      loadVehicles()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de création",
        description: "Impossible d'ajouter le véhicule.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMaintenanceStatus = (nextDate?: string) => {
    if (!nextDate) return { label: "Non défini", variant: "secondary" as const };
    const date = new Date(nextDate);
    const today = new Date();
    const warningDate = addDays(today, 30);

    if (isBefore(date, today)) return { label: "RETARD", variant: "destructive" as const };
    if (isBefore(date, warningDate)) return { label: "À PRÉVOIR", variant: "default" as const };
    return { label: "OK", variant: "outline" as const };
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion de la flotte</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="rounded-[2rem] border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Ajouter un véhicule</CardTitle>
                  <CardDescription>
                    Enregistrez un nouveau véhicule dans votre flotte.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de véhicule</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl">
                              <SelectValue placeholder="Sélectionnez un type..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                             {vehicleTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Marque & Modèle</FormLabel>
                            <FormControl>
                            <Input placeholder="ex: Renault Master" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="registration"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Immatriculation</FormLabel>
                            <FormControl>
                            <Input placeholder="ex: AB-123-CD" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume utile (en m³)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ex: 20" className="rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Suivi administratif</p>
                    <FormField
                        control={form.control}
                        name="nextMaintenanceDate"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Prochain Entretien / CT</FormLabel>
                            <FormControl>
                            <Input type="date" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insuranceExpiryDate"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Échéance Assurance</FormLabel>
                            <FormControl>
                            <Input type="date" className="rounded-xl" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full rounded-xl" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                    Ajouter le véhicule
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-2">
          <Card className="rounded-[2rem] border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle>Votre Flotte</CardTitle>
              <CardDescription>État et maintenance de vos camions.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({length: 3}).map((_, i) => (
                     <Skeleton key={i} className="h-32 w-full rounded-2xl" />
                  ))}
                </div>
              ) : vehicles.length > 0 ? (
                <div className="grid gap-4">
                  {vehicles.map((vehicle) => {
                    const maintStatus = getMaintenanceStatus(vehicle.nextMaintenanceDate);
                    const insStatus = getMaintenanceStatus(vehicle.insuranceExpiryDate);
                    
                    return (
                      <div key={vehicle.id} className="rounded-2xl border p-6 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="flex items-start gap-4">
                            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <Truck className="h-7 w-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900">{vehicle.brand}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-[10px] uppercase font-black">{vehicle.type}</Badge>
                                    <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded border">{vehicle.registration}</span>
                                </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                             <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-black uppercase text-slate-400">Maintenance</span>
                                <Badge variant={maintStatus.variant}>{maintStatus.label}</Badge>
                             </div>
                             <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-black uppercase text-slate-400">Assurance</span>
                                <Badge variant={insStatus.variant}>{insStatus.label}</Badge>
                             </div>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Gauge className="h-4 w-4 text-primary" />
                                <span>{vehicle.volume} m³ utiles</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Wrench className="h-4 w-4" />
                                <span>CT : {vehicle.nextMaintenanceDate ? format(new Date(vehicle.nextMaintenanceDate), "dd/MM/yyyy") : "-"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <ShieldAlert className="h-4 w-4" />
                                <span>Assur. : {vehicle.insuranceExpiryDate ? format(new Date(vehicle.insuranceExpiryDate), "dd/MM/yyyy") : "-"}</span>
                            </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Truck className="mx-auto h-12 w-12 opacity-20" />
                  <p className="mt-4 text-sm">Aucun véhicule n'a encore été ajouté.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
