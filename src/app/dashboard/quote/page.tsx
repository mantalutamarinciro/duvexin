"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const quoteSchema = z.object({
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

  const form = useForm<z.infer<typeof quoteSchema>>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      distance: 50,
      volume: 100,
      serviceType: "basic",
    },
  })

  function onSubmit(values: z.infer<typeof quoteSchema>) {
    const distanceCost = values.distance * 1.2; // 1.2€ par km
    const volumeCost = values.volume * 20; // 20€ par m³
    const serviceMultiplier = serviceTypeCosts[values.serviceType];
    const totalQuote = (distanceCost + volumeCost) * serviceMultiplier;
    setQuote(totalQuote);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Calculateur de devis de service</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Détails du déménagement</CardTitle>
                <CardDescription>Calculez un coût estimé pour le déménagement.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" {...field} />
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
                      <FormLabel>Volume (m³)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} />
                      </FormControl>
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
                            <SelectValue placeholder="Sélectionnez un type de service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">{serviceTypeLabels.basic}</SelectItem>
                          <SelectItem value="full">{serviceTypeLabels.full}</SelectItem>
                          <SelectItem value="premium">{serviceTypeLabels.premium}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit">Calculer le devis</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {quote !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Devis estimé</CardTitle>
              <CardDescription>Basé sur les détails fournis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-bold text-primary">
                {quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </p>
              <Separator />
              <p className="text-sm text-muted-foreground">Ceci est une estimation. Le prix final peut varier en fonction de l'inventaire et d'autres facteurs.</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Enregistrer le devis</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
