
"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Loader2, Plus, Minus, Trash2, PackagePlus, Calculator, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { getInventoryList, updateInventoryList, InventoryItem } from "@/services/inventoryService"
import { roomCategories, PredefinedItem } from "@/lib/predefined-items"
import { generateInventoryFromText } from "@/ai/flows/inventory-from-text"


const customItemSchema = z.object({
  name: z.string().min(2, "Le nom est requis (2 caractères min)."),
  volume: z.coerce.number().min(0.01, "Le volume doit être un nombre positif."),
})

type CustomItemFormValues = z.infer<typeof customItemSchema>

const aiInventorySchema = z.object({
  description: z.string().min(10, "Veuillez fournir une description plus détaillée (10 caractères min)."),
})

type AiInventoryFormValues = z.infer<typeof aiInventorySchema>

export default function InventoryToolPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [totalVolume, setTotalVolume] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isCustomItemDialogOpen, setIsCustomItemDialogOpen] = useState(false)
  const { toast } = useToast()

  const customItemForm = useForm<CustomItemFormValues>({
    resolver: zodResolver(customItemSchema),
    defaultValues: {
      name: "",
      volume: 0.1,
    },
  })

  const aiInventoryForm = useForm<AiInventoryFormValues>({
      resolver: zodResolver(aiInventorySchema),
      defaultValues: {
        description: "",
      },
  })

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const list = await getInventoryList()
      if (list) {
        setInventoryItems(list.items)
        setTotalVolume(list.totalVolume)
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger l'inventaire.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  useEffect(() => {
    const newTotalVolume = inventoryItems.reduce((acc, item) => acc + item.volume * item.quantity, 0)
    setTotalVolume(newTotalVolume)
  }, [inventoryItems])

  const handleAddItem = (item: PredefinedItem) => {
    setInventoryItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prevItems, { ...item, icon: item.icon.displayName || 'Box', quantity: 1 }]
      }
    })
  }
  
  const onCustomItemSubmit = (values: CustomItemFormValues) => {
    const newItem: InventoryItem = {
      id: `custom-${Date.now()}`,
      name: values.name,
      volume: values.volume,
      quantity: 1,
      icon: 'PackagePlus'
    }
    setInventoryItems(prev => [...prev, newItem])
    toast({
      title: "Objet personnalisé ajouté",
      description: `"${values.name}" a été ajouté à l'inventaire.`,
    })
    customItemForm.reset()
    setIsCustomItemDialogOpen(false)
  }

  const onAiInventorySubmit = async (values: AiInventoryFormValues) => {
    setIsGeneratingAi(true);
    try {
        const { items } = await generateInventoryFromText({description: values.description});
        
        // Merge AI items with existing ones
        setInventoryItems(prevItems => {
            const newItems = [...prevItems];
            items.forEach(aiItem => {
                const existingItemIndex = newItems.findIndex(item => item.name.toLowerCase() === aiItem.name.toLowerCase());
                if (existingItemIndex > -1) {
                    newItems[existingItemIndex].quantity += aiItem.quantity;
                } else {
                    newItems.push({
                      ...aiItem,
                      id: `ai-${Date.now()}-${aiItem.name}`,
                      icon: 'Wand2'
                    });
                }
            });
            return newItems;
        });

        toast({
            title: "Inventaire mis à jour par l'IA",
            description: `${items.length} type(s) d'objet(s) ont été ajoutés ou mis à jour.`,
        });
        aiInventoryForm.reset();

    } catch (error) {
        console.error("Erreur de génération IA:", error);
        toast({
            variant: "destructive",
            title: "Erreur de l'IA",
            description: "Impossible de générer l'inventaire. Veuillez réessayer.",
        });
    } finally {
        setIsGeneratingAi(false);
    }
  }

  const handleQuantityChange = (itemId: string, delta: number) => {
    setInventoryItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + delta
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter((item): item is InventoryItem => item !== null)
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setInventoryItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const handleSaveInventory = async () => {
    setIsSaving(true)
    try {
      await updateInventoryList(inventoryItems)
      toast({
        title: "Inventaire sauvegardé",
        description: "La liste des articles a été mise à jour avec succès.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder les modifications de l'inventaire.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Constructeur d'inventaire</h1>
            <p className="text-muted-foreground">Utilisez les outils ci-dessous pour construire l'inventaire du déménagement.</p>
        </div>
        <Button onClick={handleSaveInventory} disabled={isSaving || loading}>
          {isSaving ? <Loader2 className="mr-2 animate-spin" /> : null}
          Sauvegarder l'inventaire
        </Button>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Bibliothèque d'objets</CardTitle>
                    <CardDescription>Naviguez par pièce pour trouver et ajouter vos objets manuellement.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Tabs defaultValue={roomCategories[0].id} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
                        {roomCategories.map((category) => (
                           <TabsTrigger key={category.id} value={category.id}>{category.name}</TabsTrigger>
                        ))}
                      </TabsList>
                        {roomCategories.map((category) => (
                         <TabsContent key={category.id} value={category.id}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                                {category.items.map(item => (
                                    <button key={item.id} onClick={() => handleAddItem(item)} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors aspect-square text-center">
                                        <item.icon className="h-8 w-8 text-primary" />
                                        <span className="text-xs font-medium">{item.name}</span>
                                    </button>
                                ))}
                                {category.id === 'other' && (
                                     <Dialog open={isCustomItemDialogOpen} onOpenChange={setIsCustomItemDialogOpen}>
                                        <DialogTrigger asChild>
                                             <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border border-dashed bg-card hover:bg-accent hover:text-accent-foreground transition-colors aspect-square text-center">
                                                <PackagePlus className="h-8 w-8 text-muted-foreground" />
                                                <span className="text-xs font-medium text-muted-foreground">Objet personnalisé</span>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Ajouter un objet personnalisé</DialogTitle>
                                                <DialogDescription>
                                                    Indiquez le nom et le volume estimé de l'objet que vous souhaitez ajouter.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <Form {...customItemForm}>
                                                <form onSubmit={customItemForm.handleSubmit(onCustomItemSubmit)} className="space-y-4">
                                                    <FormField
                                                        control={customItemForm.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Nom de l'objet</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="ex: Lampadaire design" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={customItemForm.control}
                                                        name="volume"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Volume (en m³)</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" step="0.1" placeholder="ex: 0.5" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <DialogFooter>
                                                        <Button type="submit">Ajouter l'objet</Button>
                                                    </DialogFooter>
                                                </form>
                                            </Form>
                                        </DialogContent>
                                     </Dialog>
                                )}
                            </div>
                         </TabsContent>
                        ))}
                   </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Assistant Inventaire IA</CardTitle>
                    <CardDescription>Décrivez les objets en langage naturel et laissez l'IA les ajouter à votre liste.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...aiInventoryForm}>
                        <form onSubmit={aiInventoryForm.handleSubmit(onAiInventorySubmit)} className="space-y-4">
                            <FormField
                                control={aiInventoryForm.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description des objets</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Ex: un grand canapé d'angle, une table basse en verre, une télévision 55 pouces et 3 cartons de livres..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <Button type="submit" disabled={isGeneratingAi}>
                                {isGeneratingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                Générer avec l'IA
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

        </div>

        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Inventaire du déménagement</CardTitle>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Total estimé :</span>
                         <span className="flex items-center gap-2 font-bold text-lg text-primary">
                            <Calculator className="h-5 w-5"/>
                            {totalVolume.toFixed(2)} m³
                         </span>
                    </div>
                </CardHeader>
                <CardContent className="max-h-[60vh] overflow-y-auto pr-3">
                    {loading ? (
                        <div className="space-y-4">
                           {Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    ) : inventoryItems.length > 0 ? (
                        <div className="space-y-3">
                            {inventoryItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.volume} m³ / unité</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, -1)}>
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => handleQuantityChange(item.id, 1)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                     <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                     </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            <PackagePlus className="mx-auto h-10 w-10" />
                            <p className="mt-2 text-sm">L'inventaire est vide.</p>
                            <p className="text-xs">Ajoutez des objets pour commencer.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

    