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
    message: "Veuillez décrire l'objet en au moins 10 caractères.",
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
      console.error("L'identification par IA a échoué:", error)
      toast({
        variant: "destructive",
        title: "Erreur de l'assistant IA",
        description: "Impossible d'obtenir des suggestions. Veuillez réessayer.",
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
    console.log("Formulaire soumis:", values)
    toast({
        title: "Article ajouté",
        description: `"${values.objectType}" a été ajouté à l'inventaire.`,
      })
    form.reset()
    form.setValue("objectCharacteristics", "")
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Assistant d'inventaire IA</h1>
      
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Décrire un objet</CardTitle>
              <CardDescription>
                Entrez quelques caractéristiques d'un objet ménager, et notre IA vous aidera à l'identifier et à estimer ses propriétés.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="objectCharacteristics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caractéristiques de l'objet</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: 'Une grande table à manger en bois avec quatre pieds, d'aspect ancien.'"
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
                Identifier avec l'IA
              </Button>
            </CardFooter>
          </Card>

          {aiSuggestion && (
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-accent">Suggestion de l'IA</CardTitle>
                <CardDescription>Voici ce que notre IA pense. Vous pouvez appliquer ces valeurs au formulaire.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Type d'objet :</strong> {aiSuggestion.objectType}</p>
                <p><strong>Dimensions estimées :</strong> {aiSuggestion.estimatedDimensions}</p>
                <p><strong>Poids estimé :</strong> {aiSuggestion.estimatedWeightKg} kg</p>
                <p><strong>Fragilité :</strong> {aiSuggestion.fragility}</p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button type="button" onClick={applySuggestion} variant="default">Appliquer la suggestion</Button>
                <Button type="button" variant="ghost" onClick={() => setAiSuggestion(null)}>Rejeter</Button>
              </CardFooter>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Détails de l'inventaire</CardTitle>
              <CardDescription>Détails finaux pour l'article d'inventaire.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="objectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'objet</FormLabel>
                    <FormControl><Input placeholder="ex: Table à manger" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fragility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fragilité</FormLabel>
                    <FormControl><Input placeholder="ex: Robuste" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedDimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions (LxlxH cm)</FormLabel>
                    <FormControl><Input placeholder="ex: 200x100x75" {...field} value={field.value ?? ""} /></FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedWeightKg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poids (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="ex: 50" {...field} value={field.value ?? ""} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Ajouter à l'inventaire</Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}
