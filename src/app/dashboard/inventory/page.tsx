"use client"

import { useState, useEffect } from "react"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { identifyInventoryObject, InventoryObjectIdentificationOutput } from "@/ai/flows/inventory-object-identification"
import { Loader2, Wand2, Trash2, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { addInventoryItem, getInventoryItems, deleteInventoryItem, InventoryItem } from "@/services/inventoryService"


const formSchema = z.object({
  objectCharacteristics: z.string().min(10, {
    message: "Veuillez décrire l'objet en au moins 10 caractères.",
  }),
  objectType: z.string().min(1, "Le type d'objet est requis."),
  estimatedDimensions: z.string().optional(),
  estimatedWeightKg: z.coerce.number().optional(),
  fragility: z.string().optional(),
})

export default function InventoryToolPage() {
  const [loadingAi, setLoadingAi] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingInventory, setLoadingInventory] = useState(true)
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [aiSuggestion, setAiSuggestion] = useState<InventoryObjectIdentificationOutput | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objectCharacteristics: "",
      objectType: "",
      estimatedDimensions: "",
      fragility: "",
    },
  })
  
  const fetchInventory = async () => {
    setLoadingInventory(true)
    try {
      const items = await getInventoryItems()
      setInventoryItems(items)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger l'inventaire.",
      })
    } finally {
      setLoadingInventory(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  async function handleIdentify(values: z.infer<typeof formSchema>) {
    setLoadingAi(true)
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
      setLoadingAi(false)
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await addInventoryItem(values)
      toast({
        title: "Article ajouté",
        description: `"${values.objectType}" a été ajouté à l'inventaire.`,
      })
      form.reset({
        objectCharacteristics: values.objectCharacteristics, // Keep the description
        objectType: "",
        estimatedDimensions: "",
        estimatedWeightKg: undefined,
        fragility: "",
      })
      setAiSuggestion(null)
      fetchInventory() // Refresh inventory list
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible d'ajouter l'article à l'inventaire.",
        })
    } finally {
        setIsSubmitting(false)
    }
  }
  
  async function handleDeleteItem(id: string) {
    try {
      await deleteInventoryItem(id)
      toast({
        title: "Article supprimé",
        description: "L'article a été supprimé de l'inventaire.",
      })
      fetchInventory() // Refresh inventory list
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer l'article.",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Assistant d'inventaire IA</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-6">
            <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                <CardHeader>
                    <CardTitle>1. Décrire un objet</CardTitle>
                    <CardDescription>
                    Décrivez un objet pour obtenir une suggestion de l'IA.
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
                    <Button type="button" onClick={form.handleSubmit(handleIdentify)} disabled={loadingAi}>
                    {loadingAi ? (
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
                    </CardHeader>
                    <CardContent className="space-y-2">
                    <p><strong>Type :</strong> {aiSuggestion.objectType}</p>
                    <p><strong>Dimensions :</strong> {aiSuggestion.estimatedDimensions}</p>
                    <p><strong>Poids :</strong> {aiSuggestion.estimatedWeightKg} kg</p>
                    <p><strong>Fragilité :</strong> {aiSuggestion.fragility}</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                    <Button type="button" onClick={applySuggestion}>Appliquer</Button>
                    <Button type="button" variant="ghost" onClick={() => setAiSuggestion(null)}>Rejeter</Button>
                    </CardFooter>
                </Card>
                )}

                <Card>
                <CardHeader>
                    <CardTitle>2. Ajouter à l'inventaire</CardTitle>
                    <CardDescription>Vérifiez les détails et ajoutez l'article.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <FormField
                    control={form.control}
                    name="objectType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Type d'objet</FormLabel>
                        <FormControl><Input placeholder="ex: Table à manger" {...field} value={field.value ?? ""} /></FormControl>
                        <FormMessage />
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
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                        Ajouter à l'inventaire
                    </Button>
                </CardFooter>
                </Card>
            </form>
            </FormProvider>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Inventaire actuel</CardTitle>
                    <CardDescription>Liste de tous les articles enregistrés.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Article</TableHead>
                            <TableHead>Poids (kg)</TableHead>
                            <TableHead>Fragilité</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {loadingInventory ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                        <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : inventoryItems.length > 0 ? (
                                inventoryItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.objectType}</div>
                                            <div className="text-sm text-muted-foreground">{item.estimatedDimensions}</div>
                                        </TableCell>
                                        <TableCell>{item.estimatedWeightKg || 'N/A'}</TableCell>
                                        <TableCell>{item.fragility || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Supprimer</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                                        <p className="mt-2">L'inventaire est vide.</p>
                                        <p className="text-sm text-muted-foreground">Utilisez le formulaire pour ajouter des articles.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
