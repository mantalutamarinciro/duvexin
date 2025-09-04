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
  distance: z.coerce.number().min(1, "Distance must be at least 1 mile."),
  volume: z.coerce.number().min(1, "Volume must be at least 1 cubic foot."),
  serviceType: z.enum(["basic", "full", "premium"]),
})

const serviceTypeCosts = {
  basic: 1.0,
  full: 1.5,
  premium: 2.0,
}

const serviceTypeLabels = {
  basic: "Basic (transport only)",
  full: "Full Service (packing & transport)",
  premium: "Premium (packing, transport & setup)",
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
    const distanceCost = values.distance * 2; // $2 per mile
    const volumeCost = values.volume * 5; // $5 per cubic foot
    const serviceMultiplier = serviceTypeCosts[values.serviceType];
    const totalQuote = (distanceCost + volumeCost) * serviceMultiplier;
    setQuote(totalQuote);
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Service Quote Calculator</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Move Details</CardTitle>
                <CardDescription>Calculate an estimated cost for the move.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (miles)</FormLabel>
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
                      <FormLabel>Volume (cubic feet)</FormLabel>
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
                      <FormLabel>Service Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service type" />
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
                <Button type="submit">Calculate Quote</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {quote !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Estimated Quote</CardTitle>
              <CardDescription>Based on the details provided.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-4xl font-bold text-primary">
                ${quote.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <Separator />
              <p className="text-sm text-muted-foreground">This is an estimate. Final price may vary based on inventory and other factors.</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline">Save Quote</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
