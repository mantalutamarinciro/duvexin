"use client"

import React, { useState, useEffect, useTransition, useCallback, memo } from "react"
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
import { 
  Loader2, Plus, Minus, Trash2, PackagePlus, 
  Calculator, Wand2, ArrowRight, CheckCircle, PackageSearch 
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateInventoryList, type InventoryItem } from "@/services/inventoryService"
import { type RoomCategory, type PredefinedItem } from "@/lib/predefined-items"
import { generateInventoryFromText } from "@/ai/flows/inventory-from-text"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useDebouncedCallback } from 'use-debounce';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" // Assurez-vous du chemin

// --- SCHÉMAS ---
const customItemSchema = z.object({
  name: z.string().min(2, "Le nom est requis (2 caractères min)."),
  volume: z.coerce.number().min(0.01, "Le volume doit être un nombre positif."),
})
type CustomItemFormValues = z.infer<typeof customItemSchema>

const aiInventorySchema = z.object({
  description: z.string().min(10, "Veuillez fournir une description plus détaillée (10 caractères min)."),
})
type AiInventoryFormValues = z.infer<typeof aiInventorySchema>

// --- COMPOSANTS UTILITAIRES ---
// Extraction pour éviter les re-rendus inutiles à chaque changement d'état du parent
const DynamicIcon = memo(({ name, className, ...props }: { name: string; className?: string; [key: string]: any }) => {
  const IconComponent = (LucideIcons as any)[name]
  const RenderedIcon = IconComponent || LucideIcons.Package
  return <RenderedIcon className={className} {...props} />
})
DynamicIcon.displayName = "DynamicIcon"

interface VolumeCalculatorClientProps {
  roomCategories: RoomCategory[];
  initialItems: InventoryItem[];
}

export function VolumeCalculatorClient({ roomCategories, initialItems }: VolumeCalculatorClientProps) {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialItems)
  const [totalVolume, setTotalVolume] = useState(0)
  const [activeCategory, setActiveCategory] = useState(roomCategories[0]?.id || "")
  
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isCustomItemDialogOpen, setIsCustomItemDialogOpen] = useState(false)
  const [isSaving, startSavingTransition] = useTransition()

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

  // --- LOGIQUE MÉTIER ---
  const debouncedSave = useDebouncedCallback(async (items: InventoryItem[]) => {
    startSavingTransition(async () => {
      try {
        await updateInventoryList(items)
      } catch (error) {
        console.error("Autosave failed:", error)
      }
    })
  }, 1000)

  useEffect(() => {
    const newTotalVolume = inventoryItems.reduce((acc, item) => acc + item.volume * item.quantity, 0)
    setTotalVolume(newTotalVolume)
    
    // Empêcher la sauvegarde au premier rendu si les items n'ont pas changé
    if (inventoryItems !== initialItems) {
      debouncedSave(inventoryItems)
    }
  }, [inventoryItems, debouncedSave, initialItems])

  const handleAddItem = useCallback((item: PredefinedItem) => {
    setInventoryItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id)
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }, [])

  const handleQuantityChange = useCallback((itemId: string, delta: number) => {
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
  }, [])
  
  const handleRemoveItem = useCallback((itemId: string) => {
    setInventoryItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }, [])

  // --- GESTIONNAIRES DE FORMULAIRES ---
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
      title: "Objet ajouté",
      description: `"${values.name}" a été ajouté à l'inventaire.`,
    })
    customItemForm.reset()
    setIsCustomItemDialogOpen(false)
  }

  const onAiInventorySubmit = async (values: AiInventoryFormValues) => {
    setIsGeneratingAi(true)
    try {
      const { items } = await generateInventoryFromText({ description: values.description })
      setInventoryItems(prevItems => {
        const newItemsMap = new Map(prevItems.map(item => [item.name.toLowerCase(), item]))
        items.forEach(aiItem => {
          const existingItem = newItemsMap.get(aiItem.name.toLowerCase())
          if (existingItem) {
            existingItem.quantity += aiItem.quantity
          } else {
            newItemsMap.set(aiItem.name.toLowerCase(), {
              ...aiItem,
              id: `ai-${Date.now()}-${aiItem.name}`,
              icon: 'Sparkles' // Icone plus magique pour l'IA
            })
          }
        })
        return Array.from(newItemsMap.values())
      })
      toast({
        title: "Inventaire mis à jour",
        description: `L'IA a détecté et ajouté ${items.length} type(s) d'objet(s).`,
      })
      aiInventoryForm.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de l'IA",
        description: "Impossible d'analyser le texte. Veuillez réessayer.",
      })
    } finally {
      setIsGeneratingAi(false)
    }
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* --- ZONE PRINCIPALE (Sélection & IA) --- */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-8">
        
        {/* GRILLE DE SÉLECTION */}
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Menu des catégories (Vertical sur Desktop, Horizontal sur Mobile) */}
          <aside className="xl:w-64 shrink-0">
            {/* Mobile horizontal scroll */}
            <div className="xl:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex w-max space-x-2">
                  {roomCategories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className={cn(
                        "rounded-full shrink-0 transition-all",
                        activeCategory === category.id ? "shadow-md shadow-primary/20" : ""
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden sm:flex h-1.5" />
              </ScrollArea>
            </div>
            
            {/* Desktop vertical nav */}
            <nav className="hidden xl:flex flex-col space-y-1.5 sticky top-24">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2 uppercase tracking-wider">Pièces</h3>
              {roomCategories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start rounded-xl transition-all",
                    activeCategory === category.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Grille des objets */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
              >
                {roomCategories.find(cat => cat.id === activeCategory)?.items.map(item => {
                   const countInInventory = inventoryItems.find(i => i.id === item.id)?.quantity || 0;
                   return (
                      <motion.button 
                        key={item.id} 
                        onClick={() => handleAddItem(item)} 
                        className={cn(
                          "relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border transition-all aspect-square text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          countInInventory > 0 
                            ? "border-primary bg-primary/5 shadow-sm" 
                            : "bg-background hover:border-primary/40 hover:bg-muted/50"
                        )}
                        whileTap={{ scale: 0.96 }}
                      >
                        {/* Badge de quantité (Gamification UX) */}
                        {countInInventory > 0 && (
                          <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                            {countInInventory}
                          </div>
                        )}
                        <DynamicIcon name={item.icon} className={cn("h-8 w-8 transition-colors", countInInventory > 0 ? "text-primary" : "text-muted-foreground")} />
                        <div className="space-y-0.5">
                           <p className={cn("text-xs font-semibold leading-tight", countInInventory > 0 ? "text-foreground" : "text-muted-foreground")}>{item.name}</p>
                           <p className="text-[10px] text-muted-foreground">{item.volume} m³</p>
                        </div>
                      </motion.button>
                   );
                })}
                
                {/* Bouton Ajout Personnalisé */}
                {activeCategory === 'other' && (
                  <Dialog open={isCustomItemDialogOpen} onOpenChange={setIsCustomItemDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.button 
                        className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/10 hover:bg-muted/30 hover:border-primary/50 transition-colors aspect-square text-center"
                        whileTap={{ scale: 0.96 }}
                      >
                        <PackagePlus className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground">Objet sur-mesure</span>
                      </motion.button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md rounded-[24px]">
                      <DialogHeader>
                        <DialogTitle>Ajouter un objet hors catalogue</DialogTitle>
                        <DialogDescription>
                          Précisez le nom et le volume unitaire de votre objet.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...customItemForm}>
                        <form onSubmit={customItemForm.handleSubmit(onCustomItemSubmit)} className="space-y-5 pt-4">
                          <FormField
                            control={customItemForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Que souhaitez-vous ajouter ?</FormLabel>
                                <FormControl>
                                  <Input placeholder="ex: Coffre-fort, Piano droit..." className="rounded-xl" {...field} />
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
                                <FormLabel>Volume estimé (m³)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" placeholder="ex: 1.5" className="rounded-xl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter className="pt-2">
                            <Button type="submit" className="w-full rounded-xl">Ajouter à l'inventaire</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* --- ASSISTANT IA --- */}
        <Card className="rounded-[32px] overflow-hidden border-primary/10 shadow-sm relative isolate">
          {/* Décoration d'arrière-plan IA */}
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                 <Wand2 className="h-5 w-5" />
               </div>
               <div>
                  <CardTitle className="text-xl">Assistant Inventaire Express</CardTitle>
                  <CardDescription className="text-sm mt-1">Vous avez la flemme de chercher ? Décrivez votre pièce, l'IA s'occupe du reste.</CardDescription>
               </div>
            </div>
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
                          placeholder="Ex: Dans mon salon j'ai un grand canapé d'angle 4 places, une table basse en verre carrée, une TV 65 pouces au mur et environ 10 cartons moyens..."
                          className="resize-none rounded-2xl bg-background/50 focus:bg-background border-primary/20 min-h-[100px] text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isGeneratingAi || !aiInventoryForm.formState.isValid}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all"
                >
                  {isGeneratingAi ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                  Analyser et ajouter les objets
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* --- SIDEBAR RÉSUMÉ (INVENTAIRE) --- */}
      <aside className="lg:col-span-4 xl:col-span-3">
        <Card className="sticky top-24 rounded-[32px] border-primary/10 shadow-lg shadow-primary/5 flex flex-col h-[calc(100vh-8rem)]">
          <CardHeader className="border-b border-border/50 pb-6 bg-muted/20 rounded-t-[32px]">
            <CardTitle className="flex items-center gap-2">
               <PackageSearch className="h-5 w-5 text-primary" />
               Résumé
            </CardTitle>
            
            <div className="mt-4 p-4 rounded-2xl bg-background border shadow-sm text-center">
              <p className="text-sm text-muted-foreground font-medium mb-1">Volume estimé</p>
              <div className="flex items-baseline justify-center gap-1 text-primary">
                <span className="text-4xl font-extrabold tracking-tight tabular-nums">
                  {totalVolume.toFixed(2)}
                </span>
                <span className="font-semibold text-muted-foreground">m³</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-muted-foreground/20">
            {inventoryItems.length > 0 ? (
              <div className="space-y-2">
                <AnimatePresence initial={false}>
                  {inventoryItems.map(item => (
                    <motion.div 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group flex flex-col gap-2 p-3 rounded-xl border bg-background hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                         <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm truncate text-foreground">{item.name}</p>
                            <p className="text-[11px] text-muted-foreground">{(item.volume * item.quantity).toFixed(2)} m³ au total</p>
                         </div>
                         <Button 
                           size="icon" 
                           variant="ghost" 
                           className="h-7 w-7 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all" 
                           onClick={() => handleRemoveItem(item.id)}
                         >
                           <Trash2 className="h-3.5 w-3.5" />
                         </Button>
                      </div>
                      
                      <div className="flex items-center justify-between bg-muted/50 rounded-lg p-1">
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md" onClick={() => handleQuantityChange(item.id, -1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-bold text-sm tabular-nums">{item.quantity}</span>
                        <Button size="icon" variant="ghost" className="h-7 w-7 rounded-md" onClick={() => handleQuantityChange(item.id, 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground opacity-60 px-4">
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <PackagePlus className="h-8 w-8" />
                </div>
                <p className="text-sm font-medium">Votre camion est vide.</p>
                <p className="text-xs mt-1">Sélectionnez des objets à gauche pour commencer l'estimation.</p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex-col gap-3 p-4 sm:p-6 border-t border-border/50 bg-background rounded-b-[32px]">
             <div className="flex items-center justify-center text-xs font-medium text-muted-foreground gap-2 w-full">
                {isSaving ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin"/> Sauvegarde en cours...</>
                ) : (
                  <><CheckCircle className="h-3.5 w-3.5 text-green-500" /> Inventaire synchronisé</>
                )}
             </div>
             <Button 
               onClick={() => router.push("/demande-devis")} 
               disabled={totalVolume === 0} 
               size="lg"
               className="w-full rounded-xl shadow-md h-12 text-base"
             >
               Finaliser mon devis <ArrowRight className="ml-2 h-4 w-4" />
             </Button>
          </CardFooter>
        </Card>
      </aside>
    </div>
  )
}