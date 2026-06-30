"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Truck, Loader2, Gauge, ShieldAlert, Wrench, PlusCircle, Trash2 } from "lucide-react"
import { format, isBefore, addDays, isValid } from "date-fns"
import { fr } from "date-fns/locale"
import { vehicleTypes } from "@/types/vehicle"
import type { VehicleType, VehicleStatus, Vehicle } from "@/types/vehicle"
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
import { createVehicle, getVehicles, deleteVehicle, updateVehicleStatus } from "@/services/vehicleService"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

const vehicleSchema = z.object({
  type: z.enum(vehicleTypes, { required_error: "Le type est requis." }),
  brand: z.string().min(2, "La marque est requise."),
  registration: z.string().min(3, "L'immatriculation est requise."),
  volume: z.coerce.number().positive("Le volume doit être positif."),
  lastMaintenanceDate: z.string().optional(),
  nextMaintenanceDate: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
  status: z.enum(["Disponible", "En maintenance", "En mission"]).optional(),
})

type VehicleFormValues = z.infer<typeof vehicleSchema>

function formatDate(dateString?: string) {
  if (!dateString) return "-"
  const date = new Date(dateString)
  return isValid(date) ? format(date, "d MMM yyyy", { locale: fr }) : "-"
}

const STATUSES: VehicleStatus[] = ["Disponible", "En maintenance", "En mission"];

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
      type: "Fourgon",
      lastMaintenanceDate: "",
      nextMaintenanceDate: "",
      insuranceExpiryDate: "",
      status: "Disponible",
    },
  })

  const loadVehicles = async () => {
    setLoading(true)
    try {
      const fetchedVehicles = await getVehicles()
      setVehicles(fetchedVehicles)
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger la flotte de véhicules." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadVehicles()
  }, [])

  async function onSubmit(values: VehicleFormValues) {
    setIsSubmitting(true)
    try {
      await createVehicle(values)
      toast({ title: "Véhicule ajouté", description: `Le véhicule ${values.brand} (${values.registration}) a été ajouté à votre flotte.` })
      form.reset({ brand: "", registration: "", volume: 12, type: "Fourgon", lastMaintenanceDate: "", nextMaintenanceDate: "", insuranceExpiryDate: "", status: "Disponible" })
      await loadVehicles()
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'ajouter le véhicule." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteVehicle = async (id: string) => {
    try {
        await deleteVehicle(id);
        toast({ title: "Véhicule supprimé", description: "Le véhicule a été retiré de votre flotte." });
        loadVehicles();
    } catch {
        toast({ variant: 'destructive', title: "Erreur", description: "Impossible de supprimer le véhicule." });
    }
  }

  const handleStatusChange = async (id: string, newStatus: VehicleStatus) => {
    try {
        await updateVehicleStatus(id, newStatus);
        setVehicles(vehicles.map(v => v.id === id ? { ...v, status: newStatus } : v));
        toast({ title: "Statut mis à jour", description: `Le véhicule est maintenant ${newStatus.toLowerCase()}.` });
    } catch {
        toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour le statut." });
    }
  }

  const getMaintenanceStatus = (nextDate?: string) => {
    if (!nextDate) return { label: "Non défini", variant: "secondary" as const }
    const date = new Date(nextDate)
    if (!isValid(date)) return { label: "Date invalide", variant: "secondary" as const }
    const today = new Date()
    const warningDate = addDays(today, 30)
    if (isBefore(date, today)) return { label: "RETARD", variant: "destructive" as const }
    if (isBefore(date, warningDate)) return { label: "À PRÉVOIR", variant: "default" as const }
    return { label: "OK", variant: "outline" as const }
  }

  const getStatusColor = (status?: VehicleStatus) => {
      switch (status) {
          case "Disponible": return "text-emerald-700 bg-emerald-100 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
          case "En maintenance": return "text-orange-700 bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
          case "En mission": return "text-blue-700 bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
          default: return "bg-slate-100 text-slate-700 border-slate-200";
      }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Gestion de la Flotte</h1>
            <p className="text-slate-500 mt-1">Suivi des statuts, entretiens et assurances de vos véhicules.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="rounded-[2.5rem] border-slate-100 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Ajouter un véhicule</CardTitle>
                  <CardDescription>
                    Enregistrez un nouveau camion dans votre parc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Type de véhicule</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary">
                              <SelectValue placeholder="Sélectionnez un type..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField control={form.control} name="brand" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Marque & Modèle</FormLabel>
                          <FormControl>
                            <Input placeholder="ex: Renault Master" className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="registration" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Immatriculation</FormLabel>
                          <FormControl>
                            <Input placeholder="ex: AB-123-CD" className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 uppercase focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                  </div>

                  <FormField control={form.control} name="volume" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Volume utile (en m³)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ex: 20" className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}/>

                  <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Suivi administratif</p>
                    <FormField control={form.control} name="nextMaintenanceDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Prochain entretien / CT</FormLabel>
                          <FormControl>
                            <Input type="date" className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="insuranceExpiryDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Échéance assurance</FormLabel>
                          <FormControl>
                            <Input type="date" className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-primary" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}/>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 dark:bg-slate-800/50 rounded-b-[2.5rem] p-6 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <PlusCircle className="mr-2 h-5 w-5" />}
                    Ajouter le véhicule
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-2">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-transparent">
            <CardContent className="p-0">
              {loading ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-[2rem]" />
                  ))}
                </div>
              ) : vehicles.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {vehicles.map((vehicle) => {
                    const maintStatus = getMaintenanceStatus(vehicle.nextMaintenanceDate)
                    const insStatus = getMaintenanceStatus(vehicle.insuranceExpiryDate)

                    return (
                      <div
                        key={vehicle.id}
                        className="rounded-[2rem] border-none bg-white dark:bg-slate-900 shadow-sm transition-all hover:shadow-md overflow-hidden relative group"
                      >
                         <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button variant="destructive" size="icon" className="h-8 w-8 rounded-full shadow-lg" onClick={() => handleDeleteVehicle(vehicle.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 pb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                    <Truck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                        {vehicle.brand}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Badge variant="secondary" className="text-[10px] font-black uppercase">
                                            {vehicle.type}
                                        </Badge>
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1">
                                            {vehicle.registration}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Statut Actuel</p>
                                <Select value={vehicle.status || "Disponible"} onValueChange={(val) => handleStatusChange(vehicle.id, val as VehicleStatus)}>
                                    <SelectTrigger className={`h-8 w-full text-xs font-bold uppercase tracking-wider border-0 shadow-none rounded-xl ${getStatusColor(vehicle.status)}`}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUSES.map(s => <SelectItem key={s} value={s} className="text-xs font-bold uppercase tracking-wider">{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><Wrench className="h-3 w-3"/> Entretien</span>
                                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{formatDate(vehicle.nextMaintenanceDate)}</span>
                                        <Badge variant={maintStatus.variant} className="text-[9px] px-1.5 py-0">{maintStatus.label}</Badge>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1"><ShieldAlert className="h-3 w-3"/> Assurance</span>
                                    <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-2 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{formatDate(vehicle.insuranceExpiryDate)}</span>
                                        <Badge variant={insStatus.variant} className="text-[9px] px-1.5 py-0">{insStatus.label}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                                <Gauge className="h-4 w-4 text-primary" /> Volume utile : {vehicle.volume} m³
                            </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <Card className="rounded-[2rem] border-dashed border-2 flex flex-col items-center justify-center py-20 bg-transparent shadow-none w-full">
                  <Truck className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Aucun véhicule</h3>
                  <p className="mt-2 text-sm text-slate-500 max-w-sm text-center">Ajoutez votre premier véhicule pour commencer à gérer votre parc, ses entretiens et ses disponibilités.</p>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}