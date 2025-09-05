
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Truck, Loader2, Gauge } from "lucide-react"

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

export const vehicleTypes = ['Fourgon', 'Camion 12m³', 'Camion 20m³', 'Camionnette'] as const;
export type VehicleType = typeof vehicleTypes[number];

export interface VehicleFormData {
  type: VehicleType;
  brand: string;
  registration: string;
  volume: number;
}


const vehicleSchema = z.object({
  type: z.enum(vehicleTypes, { required_error: "Le type est requis." }),
  brand: z.string().min(2, "La marque est requise."),
  registration: z.string().min(3, "L'immatriculation est requise.").regex(/^[A-Z]{2}-\d{3}-[A-Z]{2}$/, "Format invalide (ex: AB-123-CD)"),
  volume: z.coerce.number().positive("Le volume doit être positif."),
})

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      registration: "",
      volume: 12,
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

  async function onSubmit(values: VehicleFormData) {
    setIsSubmitting(true)
    try {
      await createVehicle(values)
      toast({
        title: "Véhicule ajouté",
        description: `Le véhicule ${values.brand} (${values.registration}) a été ajouté à votre flotte.`,
      })
      form.reset({ brand: "", registration: "", volume: 12 })
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion de la flotte</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
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
                            <SelectTrigger>
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
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque & Modèle</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Renault Master" {...field} />
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
                          <Input placeholder="ex: AB-123-CD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (en m³)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ex: 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                    Ajouter le véhicule
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Votre Flotte</CardTitle>
              <CardDescription>Liste de tous les véhicules de votre entreprise.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {Array.from({length: 3}).map((_, i) => (
                     <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-6 w-1/2 mb-3" />
                        <div className="flex gap-4">
                           <Skeleton className="h-5 w-24" />
                           <Skeleton className="h-5 w-20" />
                        </div>
                     </div>
                  ))}
                </div>
              ) : vehicles.length > 0 ? (
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Truck className="h-5 w-5 text-primary" />
                                {vehicle.brand}
                            </h3>
                            <p className="text-sm text-muted-foreground ml-7">{vehicle.type}</p>
                        </div>
                         <div className="text-right">
                            <p className="font-mono text-sm bg-muted px-2 py-1 rounded-md">{vehicle.registration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 pl-1">
                          <Gauge className="h-4 w-4" />
                          <span>{vehicle.volume} m³</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Truck className="mx-auto h-12 w-12" />
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
