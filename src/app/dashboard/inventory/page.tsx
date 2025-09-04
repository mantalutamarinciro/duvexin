"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { identifyInventoryObject, InventoryObjectIdentificationOutput } from "@/ai/flows/inventory-object-identification"
import { Loader2, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  objectCharacteristics: z.string().min(10, {
    message: "Please describe the object in at least 10 characters.",
  }),
  objectType: z.string().optional(),
  estimatedDimensions: z.string().optional(),
  estimatedWeightKg: z.coerce.number().optional(),
  fragility: z.string().optional(),
})

export default function InventoryToolPage() {
  const [loading, setLoading] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<InventoryObjectIdentificationOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objectCharacteristics: "",
    },
  })

  async function handleIdentify(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setAiSuggestion(null)
    try {
      const result = await identifyInventoryObject({
        objectCharacteristics: values.objectCharacteristics,
      })
      setAiSuggestion(result)
    } catch (error) {
      console.error("AI identification failed:", error)
      toast({
        variant: "destructive",
        title: "AI Assistant Error",
        description: "Could not get suggestions. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  function applySuggestion() {
    if (aiSuggestion) {
      form.setValue("objectType", aiSuggestion.objectType)
      form.setValue("estimatedDimensions", aiSuggestion.estimatedDimensions)
      form.setValue("estimatedWeightKg", aiSuggestion.estimatedWeightKg)
      form.setValue("fragility", aiSuggestion.fragility)
      setAiSuggestion(null)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", values)
    toast({
        title: "Item Added",
        description: `"${values.objectType}" has been added to the inventory.`,
      })
    form.reset()
    form.setValue("objectCharacteristics", "")
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Inventory AI Assistant</h1>
      
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Describe an Object</CardTitle>
              <CardDescription>
                Enter a few characteristics of a household object, and our AI will help identify it and estimate its properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="objectCharacteristics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Object Characteristics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A large, wooden dining table with four legs, looks old.'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="button" onClick={form.handleSubmit(handleIdentify)} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Identify with AI
              </Button>
            </CardFooter>
          </Card>

          {aiSuggestion && (
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-accent">AI Suggestion</CardTitle>
                <CardDescription>Here's what our AI thinks. You can apply these values to the form.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Object Type:</strong> {aiSuggestion.objectType}</p>
                <p><strong>Est. Dimensions:</strong> {aiSuggestion.estimatedDimensions}</p>
                <p><strong>Est. Weight:</strong> {aiSuggestion.estimatedWeightKg} kg</p>
                <p><strong>Fragility:</strong> {aiSuggestion.fragility}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button type="button" onClick={applySuggestion} variant="default">Apply Suggestion</Button>
                <Button type="button" variant="ghost" onClick={() => setAiSuggestion(null)}>Discard</Button>
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
              <CardDescription>Final details for the inventory item.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="objectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Object Type</FormLabel>
                    <FormControl><Input placeholder="e.g., Dining Table" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fragility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fragility</FormLabel>
                    <FormControl><Input placeholder="e.g., Sturdy" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedDimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions (LxWxH cm)</FormLabel>
                    <FormControl><Input placeholder="e.g., 200x100x75" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedWeightKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Add to Inventory</Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}
