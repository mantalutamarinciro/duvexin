
"use client"

import { useState, useEffect, useTransition, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import * as LucideIcons from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Loader2, Plus, Minus, Trash2, PackagePlus, Calculator, Wand2, ArrowRight, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateInventoryList, type InventoryItem } from "@/services/inventoryService"
import { type RoomCategory, type PredefinedItem } from "@/lib/predefined-items"
import { generateInventoryFromText } from "@/ai/flows/inventory-from-text"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useDebouncedCallback } from 'use-debounce';
import { ScrollArea, ScrollBar } from "./ui/scroll-area"

const customItemSchema = z.object({
  name: z.string().min(2, "Le nom est requis (2 caractères min)."),
  volume: z.coerce.number().min(0.01, "Le volume doit être un nombre positif."),
})

type CustomItemFormValues = z.infer<typeof customItemSchema>

const aiInventorySchema = z.object({
  description: z.string().min(10, "Veuillez fournir une description plus détaillée (10 caractères min)."),
})

type AiInventoryFormValues = z.infer<typeof aiInventorySchema>

interface VolumeCalculatorClientProps {
    roomCategories: RoomCategory[];
    initialItems: InventoryItem[];
}

export function VolumeCalculatorClient({ roomCategories, initialItems }: VolumeCalculatorClientProps) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialItems)
  const [totalVolume, setTotalVolume] = useState(0)
  const [activeCategory, setActiveCategory] = useState(roomCategories[0].id)
  
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isCustomItemDialogOpen, setIsCustomItemDialogOpen] = useState(false)
  const [isSaving, startSavingTransition] = useTransition();

  const { toast } = useToast()
  const router = useRouter()

  const customItemForm = useForm<CustomItemFormValues>({
    resolver: zodResolver(customItemSchema),
    defaultValues: { name: "", volume: 0.1 },
  })

  const aiInventoryForm = useForm<AiInventoryFormValues>({
    resolver: zodResolver(aiInventorySchema),
    defaultValues: { description: "" },
  })

  const debouncedSave = useDebouncedCallback(async (items: InventoryItem[]) => {
     startSavingTransition(async () => {
        try {
            await updateInventoryList(items);
            console.log("Inventory autosaved.");
        } catch (error) {
            console.error("Autosave failed:", error);
        }
     });
  }, 1000);

  useEffect(() => {
    const newTotalVolume = inventoryItems.reduce((acc, item) => acc + item.volume * item.quantity, 0)
    setTotalVolume(newTotalVolume)
    if (inventoryItems !== initialItems) {
      debouncedSave(inventoryItems);
    }
  }, [inventoryItems, debouncedSave, initialItems])

  const handleAddItem = (item: PredefinedItem) => {
    setInventoryItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      } else {
        return [...prevItems, { ...item, quantity: 1 }]
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
      const { items } = await generateInventoryFromText({ description: values.description });
      setInventoryItems(prevItems => {
        const newItemsMap = new Map(prevItems.map(item => [item.name.toLowerCase(), item]));
        items.forEach(aiItem => {
          const existingItem = newItemsMap.get(aiItem.name.toLowerCase());
          if (existingItem) {
            existingItem.quantity += aiItem.quantity;
          } else {
            newItemsMap.set(aiItem.name.toLowerCase(), {
              ...aiItem,
              id: `ai-${Date.now()}-${aiItem.name}`,
              icon: 'Wand2'
            });
          }
        });
        return Array.from(newItemsMap.values());
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
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is InventoryItem => item !== null)
    );
  };
  
  const handleRemoveItem = (itemId: string) => {
    setInventoryItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }
  
  const handleProceedToQuote = () => {
    router.push("/demande-devis");
  }

  const DynamicIcon = ({ name, ...props }: { name: string;[key: string]: any }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) {
      return <LucideIcons.Package {...props} />; // Fallback icon
    }
    return <IconComponent {...props} />;
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                 <aside className="lg:col-span-3 xl:col-span-3">
                    {/* Mobile horizontal scroll */}
                    <div className="lg:hidden">
                        <ScrollArea className="w-full whitespace-nowrap rounded-md">
                            <div className="flex w-max space-x-2 p-1">
                                {roomCategories.map(category => (
                                    <Button
                                        key={category.id}
                                        variant={activeCategory === category.id ? "secondary" : "ghost"}
                                        className="shrink-0"
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-2" />
                        </ScrollArea>
                    </div>
                    
                    {/* Desktop vertical nav */}
                    <nav className="hidden lg:block space-y-1 lg:sticky lg:top-20">
                        {roomCategories.map(category => (
                            <Button
                                key={category.id}
                                variant={activeCategory === category.id ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <main className="lg:col-span-9 xl:col-span-9">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {roomCategories.find(cat => cat.id === activeCategory)?.items.map(item => (
                                    <motion.button 
                                        key={item.id} 
                                        onClick={() => handleAddItem(item)} 
                                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors aspect-square text-center focus:outline-none focus:ring-2 focus:ring-ring"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <DynamicIcon name={item.icon} className="h-7 w-7 text-primary" />
                                        <span className="text-xs font-medium text-center">{item.name}</span>
                                    </motion.button>
                                ))}
                                {activeCategory === 'other' && (
                                    <Dialog open={isCustomItemDialogOpen} onOpenChange={setIsCustomItemDialogOpen}>
                                        <DialogTrigger asChild>
                                            <motion.button 
                                                className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed bg-card hover:bg-accent hover:text-accent-foreground transition-colors aspect-square text-center"
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <PackagePlus className="h-7 w-7 text-muted-foreground" />
                                                <span className="text-xs font-medium text-muted-foreground">Objet personnalisé</span>
                                            </motion.button>
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
                        </motion.div>
                    </AnimatePresence>
                    <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Wand2/> Assistant Inventaire IA</CardTitle>
                                <CardDescription>Décrivez vos objets en langage naturel et laissez l'IA les ajouter à votre liste.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...aiInventoryForm}>
                                    <form onSubmit={aiInventoryForm.handleSubmit(onAiInventorySubmit)} className="space-y-4">
                                        <FormField
                                            control={aiInventoryForm.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Ex: un grand canapé d'angle, une table basse en verre, une télévision 55 pouces et une dizaine de cartons de livres..."
                                                            className="resize-none"
                                                            rows={3}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isGeneratingAi}>
                                            {isGeneratingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                                            Générer l'inventaire par IA
                                        </Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                </main>
            </div>
        </div>

      <aside className="md:col-span-12 lg:col-span-3">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Votre Inventaire</CardTitle>
            <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
              <span>Volume total estimé :</span>
              <span className="flex items-center gap-2 font-bold text-lg text-primary">
                <Calculator className="h-5 w-5" />
                {totalVolume.toFixed(2)} m³
              </span>
            </div>
          </CardHeader>
           <CardContent className="max-h-[45vh] lg:max-h-[60vh] overflow-y-auto pr-3">
            {inventoryItems.length > 0 ? (
              <div className="space-y-2">
                <AnimatePresence>
                    {inventoryItems.map(item => (
                        <motion.div 
                            key={item.id} 
                            layout
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                        >
                        <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.volume} m³/unité</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, -1)}>
                                <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => handleQuantityChange(item.id, 1)}>
                                <Plus className="h-3 w-3" />
                            </Button>
                        </div>
                          <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <PackagePlus className="mx-auto h-10 w-10" />
                <p className="mt-2 text-sm">Votre inventaire est vide.</p>
                <p className="text-xs">Ajoutez des objets pour commencer.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 items-stretch border-t pt-4">
             <div className="flex items-center justify-center text-xs text-muted-foreground gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin"/> : <CheckCircle className="h-4 w-4 text-green-500" />}
                <span>{isSaving ? "Sauvegarde..." : "Inventaire sauvegardé"}</span>
             </div>
             <Button onClick={handleProceedToQuote} disabled={totalVolume === 0} size="lg">
                Utiliser ce volume pour mon devis <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  )
}
