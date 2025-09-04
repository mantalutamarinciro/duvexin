
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon, Mail, Phone, User, Home, Pin, Truck, Boxes, Building } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const quoteSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().optional(),

  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),

  moveDate: z.date({
    required_error: "Une date pour le déménagement est requise.",
  }),
  distance: z.coerce.number().min(1, "La distance doit être d'au moins 1 km."),
  volume: z.coerce.number().min(1, "Le volume doit être d'au moins 1 m³."),
  serviceType: z.enum(["basic", "full", "premium"]),
})

const serviceTypeCosts = {
  basic: 1.0,
  full: 1.5,
  premium: 2.0,
}

const serviceTypeLabels = {
  basic: "Basique (transport uniquement)",
  full: "Complet (emballage & transport)",
  premium: "Premium (emballage, transport & installation)",
}

export default function QuotePage() {
  const [quote, setQuote] = useState<number | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      originAddress: "",
      destinationAddress: "",
      distance: 50,
      volume: 20,
      serviceType: "basic",
    },
  })

  function onSubmit(values: z.infer<typeof quoteSchema>) {
    const distanceCost = values.distance * 1.2; // 1.2€ par km
    const volumeCost = values.volume * 25; // 25€ par m³
    const serviceMultiplier = serviceTypeCosts[values.serviceType];
    const baseCost = 250; // Coût de base fixe
    const totalQuote = baseCost + (distanceCost + volumeCost) * serviceMultiplier;
    setQuote(totalQuote);
  }
  
  function finalizeQuote() {
      toast({
        title: "Devis finalisé",
        description: `Le devis de ${quote?.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} a été enregistré et est prêt à être envoyé.`,
      })
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Éditeur de devis</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Détails du client</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl><Input placeholder="Jean Dupont" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="jean.dupont@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations sur le déménagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="originAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse de départ</FormLabel>
                          <FormControl><Input placeholder="123 Rue du Départ, 75001 Paris" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destinationAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse d'arrivée</FormLabel>
                          <FormControl><Input placeholder="456 Avenue de l'Arrivée, 13001 Marseille" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                      control={form.control}
                      name="moveDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date du déménagement</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: fr })
                                  ) : (
                                    <span>Choisissez une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Prestations et volume</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <FormControl><Input type="number" placeholder="ex: 50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (m³)</FormLabel>
                        <FormControl><Input type="number" placeholder="ex: 20" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">{serviceTypeLabels.basic}</SelectItem>
                            <SelectItem value="full">{serviceTypeLabels.full}</SelectItem>
                            <SelectItem value="premium">{serviceTypeLabels.premium}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" size="lg">Générer le devis</Button>

            </div>

            <div className="lg:col-span-1">
              {quote !== null && (
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Devis estimé</CardTitle>
                    <CardDescription>Basé sur les détails fournis.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-4xl font-bold text-primary">
                      {quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <Separator />
                    <p className="text-sm text-muted-foreground">Ceci est une estimation. Le prix final peut varier. Vérifiez tous les détails avant d'envoyer le devis au client.</p>
                  </CardContent>
                  <CardFooter>
                      <Button onClick={finalizeQuote} className="w-full">Finaliser et enregistrer le devis</Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

    