"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as LucideIcons from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Loader2,
  Plus,
  Minus,
  Trash2,
  PackagePlus,
  Wand2,
  ArrowRight,
  CheckCircle,
  PackageSearch,
  Truck,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { updateInventoryList, type InventoryItem } from "@/services/inventoryService";
import { type RoomCategory, type PredefinedItem } from "@/lib/predefined-items";
import { generateInventoryFromText } from "@/ai/flows/inventory-from-text";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// ------------------------------
// SCHÉMAS
// ------------------------------
const customItemSchema = z.object({
  name: z.string().min(2, "Le nom est requis (2 caractères min)."),
  volume: z.coerce.number().min(0.01, "Le volume doit être un nombre positif."),
});
type CustomItemFormValues = z.infer<typeof customItemSchema>;

const aiInventorySchema = z.object({
  description: z
    .string()
    .min(10, "Veuillez fournir une description plus détaillée (10 caractères min)."),
});
type AiInventoryFormValues = z.infer<typeof aiInventorySchema>;

// ------------------------------
// COMPOSANTS UTILITAIRES
// ------------------------------
const DynamicIcon = memo(
  ({
    name,
    className,
    ...props
  }: {
    name: string;
    className?: string;
    [key: string]: any;
  }) => {
    const IconComponent = (LucideIcons as any)[name];
    const RenderedIcon = IconComponent || LucideIcons.Package;
    return <RenderedIcon className={className} {...props} />;
  }
);
DynamicIcon.displayName = "DynamicIcon";

// ------------------------------
// SOUS-COMPOSANTS
// ------------------------------
const CatalogItemCard = memo(
  ({
    item,
    quantity,
    onAdd,
    onDecrement,
  }: {
    item: PredefinedItem;
    quantity: number;
    onAdd: (item: PredefinedItem) => void;
    onDecrement: (id: string) => void;
  }) => {
    const isActive = quantity > 0;

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => onAdd(item)}
          className={cn(
            "relative flex flex-col w-full items-center justify-center gap-3 p-4 rounded-xl border transition-all aspect-square text-center group",
            isActive
              ? "border-primary bg-primary/5"
              : "bg-background hover:border-primary/40 hover:bg-muted/30 border-border"
          )}
        >
          <DynamicIcon
            name={item.icon}
            className={cn(
              "h-8 w-8 transition-colors duration-200",
              isActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary/60"
            )}
          />
          <div className="space-y-0.5">
            <p
              className={cn(
                "text-xs font-semibold leading-tight transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              )}
            >
              {item.name}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {item.volume} m³
            </p>
          </div>
        </button>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute -top-2 -right-2 flex items-center bg-background border border-primary/20 shadow-sm rounded-full overflow-hidden h-7"
            >
              <button
                type="button"
                className="w-7 h-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecrement(item.id);
                }}
              >
                <Minus className="h-3 w-3" />
              </button>

              <div className="w-5 h-full flex items-center justify-center text-xs font-bold text-foreground tabular-nums">
                {quantity}
              </div>

              <button
                type="button"
                className="w-7 h-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(item);
                }}
              >
                <Plus className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
CatalogItemCard.displayName = "CatalogItemCard";

const SummaryItemLine = memo(
  ({
    item,
    onUpdate,
    onRemove,
  }: {
    item: InventoryItem;
    onUpdate: (id: string, delta: number) => void;
    onRemove: (id: string) => void;
  }) => {
    const lineVolume = useMemo(
      () => Number((item.volume * item.quantity).toFixed(1)),
      [item.volume, item.quantity]
    );

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.15 }}
        className="group flex flex-col gap-1.5 p-2.5 rounded-lg border border-border bg-background hover:border-primary/20 transition-all mb-1.5"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1 flex items-center gap-2">
            <DynamicIcon
              name={item.icon}
              className="h-4 w-4 text-muted-foreground/70"
            />
            <p className="font-medium text-sm truncate text-foreground">
              {item.name}
            </p>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex items-center justify-between bg-muted/40 rounded-md p-1 border border-border/40">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 rounded hover:bg-background"
            onClick={() => onUpdate(item.id, -1)}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <div className="flex flex-col items-center">
            <span className="w-6 text-center font-bold text-sm tabular-nums">
              {item.quantity}
            </span>
            <span className="text-[10px] text-muted-foreground -mt-1 tabular-nums">
              {lineVolume} m³
            </span>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-6 w-6 rounded hover:bg-background text-primary"
            onClick={() => onUpdate(item.id, 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </motion.div>
    );
  }
);
SummaryItemLine.displayName = "SummaryItemLine";

// ------------------------------
// COMPOSANT PRINCIPAL
// ------------------------------
interface VolumeCalculatorClientProps {
  roomCategories: RoomCategory[];
  initialItems: InventoryItem[];
}

export function VolumeCalculatorClient({
  roomCategories,
  initialItems,
}: VolumeCalculatorClientProps) {
  const router = useRouter();
  const { toast } = useToast();

  const safeCategories = roomCategories ?? [];
  const firstCategoryId = safeCategories[0]?.id ?? "other";

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(
    Array.isArray(initialItems) ? initialItems : []
  );
  const [activeCategory, setActiveCategory] = useState(firstCategoryId);

  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isCustomItemDialogOpen, setIsCustomItemDialogOpen] = useState(false);

  const [isSaving, startSavingTransition] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const didHydrateRef = useRef(false);

  // Le seuil pour déclencher le scroll
  const SUMMARY_SCROLL_THRESHOLD = 6;
  const shouldScrollSummary = inventoryItems.length > SUMMARY_SCROLL_THRESHOLD;

  const inventoryById = useMemo(() => {
    const map = new Map<string, InventoryItem>();
    for (const it of inventoryItems) map.set(it.id, it);
    return map;
  }, [inventoryItems]);

  const totalVolume = useMemo(() => {
    const sum = inventoryItems.reduce(
      (acc, item) => acc + item.volume * item.quantity,
      0
    );
    return Number(sum.toFixed(1));
  }, [inventoryItems]);

  const truckEstimation = useMemo(() => {
    if (totalVolume <= 0) return { label: "Aucun volume", Icon: PackageSearch };
    if (totalVolume <= 12) return { label: "Fourgon (10-12m³)", Icon: Truck };
    if (totalVolume <= 22) return { label: "Petit Camion (20m³)", Icon: Truck };
    if (totalVolume <= 40) return { label: "Grand Camion (40m³)", Icon: Truck };
    return { label: "Poids Lourd (>50m³)", Icon: Truck };
  }, [totalVolume]);

  const TruckIcon = truckEstimation.Icon;

  const customItemForm = useForm<CustomItemFormValues>({
    resolver: zodResolver(customItemSchema),
    defaultValues: { name: "", volume: 0.1 },
    mode: "onChange",
  });

  const aiInventoryForm = useForm<AiInventoryFormValues>({
    resolver: zodResolver(aiInventorySchema),
    defaultValues: { description: "" },
    mode: "onChange",
  });

  const debouncedSave = useDebouncedCallback(async (items: InventoryItem[]) => {
    startSavingTransition(() => {
      setSaveError(null);
      return updateInventoryList(items)
        .then(() => {
          setLastSavedAt(new Date());
        })
        .catch((err) => {
          console.error("Autosave failed:", err);
          setSaveError("Erreur de sauvegarde");
        });
    });
  }, 900);

  useEffect(() => {
    if (!didHydrateRef.current) {
      didHydrateRef.current = true;
      return;
    }
    debouncedSave(inventoryItems);
  }, [inventoryItems, debouncedSave]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  const handleAddItem = useCallback((item: PredefinedItem) => {
    setInventoryItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [{ ...item, quantity: 1 }, ...prev];
    });
  }, []);

  const handleQuantityChange = useCallback((itemId: string, delta: number) => {
    setInventoryItems((prev) => {
      return prev
        .map((item) => {
          if (item.id !== itemId) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return { ...item, quantity: newQty };
        })
        .filter((x): x is InventoryItem => Boolean(x));
    });
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setInventoryItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const onCustomItemSubmit = (values: CustomItemFormValues) => {
    const newItem: InventoryItem = {
      id: `custom-${Date.now()}`,
      name: values.name.trim(),
      volume: Number(values.volume),
      quantity: 1,
      icon: "PackagePlus",
    };

    setInventoryItems((prev) => [newItem, ...prev]);
    toast({ title: "Objet ajouté", description: `"${newItem.name}" ajouté.` });
    customItemForm.reset({ name: "", volume: 0.1 });
    setIsCustomItemDialogOpen(false);
  };

  const onAiInventorySubmit = async (values: AiInventoryFormValues) => {
    setIsGeneratingAi(true);
    try {
      const { items } = await generateInventoryFromText({
        description: values.description,
      });

      setInventoryItems((prev) => {
        const normalize = (s: string) => s.trim().toLowerCase();
        const map = new Map<string, InventoryItem>();
        for (const p of prev) map.set(normalize(p.name), p);

        for (const ai of items) {
          const key = normalize(ai.name);
          const existing = map.get(key);

          if (existing) {
            map.set(key, { ...existing, quantity: existing.quantity + (ai.quantity ?? 1) });
          } else {
            map.set(key, {
              ...(ai as any),
              id: `ai-${Date.now()}-${key}`,
              icon: "Sparkles",
              quantity: ai.quantity ?? 1,
            } as InventoryItem);
          }
        }
        return Array.from(map.values());
      });

      toast({ title: "Analyse terminée", description: `${items.length} objet(s) détecté(s).` });
      aiInventoryForm.reset({ description: "" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'analyser ce texte." });
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const activeCategoryData = useMemo(() => {
    return safeCategories.find((c) => c.id === activeCategory) ?? safeCategories[0];
  }, [safeCategories, activeCategory]);

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative pb-24 lg:pb-0">
      
      {/* --- ZONE GAUCHE (Catalogue & IA) --- */}
      <div className="lg:col-span-8 xl:col-span-9 space-y-8">
        
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Menu catégories */}
          <aside className="xl:w-56 shrink-0">
            {/* Mobile horizontal scroll */}
            <div className="xl:hidden -mx-4 px-4 sm:mx-0 sm:px-0">
              <ScrollArea className="w-full whitespace-nowrap pb-3">
                <div className="flex w-max space-x-2">
                  {safeCategories.map((category) => (
                    <Button
                      key={category.id}
                      type="button"
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className={cn(
                        "rounded-full shrink-0 font-medium h-9",
                        activeCategory === category.id
                          ? "bg-primary"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
              </ScrollArea>
            </div>

            {/* Desktop vertical nav */}
            <nav className="hidden xl:flex flex-col space-y-1 sticky top-24">
              <h3 className="text-[11px] font-bold text-muted-foreground mb-2 px-3 uppercase tracking-widest">
                Catégories
              </h3>
              {safeCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-lg transition-colors h-10 px-3",
                    activeCategory === category.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground font-medium hover:bg-muted/50"
                  )}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </nav>
          </aside>

          {/* Grille objets */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryData?.id ?? "category"}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
              >
                {(activeCategoryData?.items ?? []).map((item) => {
                  const quantity = inventoryById.get(item.id)?.quantity ?? 0;
                  return (
                    <CatalogItemCard
                      key={item.id}
                      item={item}
                      quantity={quantity}
                      onAdd={handleAddItem}
                      onDecrement={(id) => handleQuantityChange(id, -1)}
                    />
                  );
                })}

                {/* Ajout custom */}
                {activeCategoryData?.id === "other" && (
                  <Dialog open={isCustomItemDialogOpen} onOpenChange={setIsCustomItemDialogOpen}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-colors aspect-square text-center"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Plus className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">Autre objet</span>
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-sm rounded-2xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Objet personnalisé</DialogTitle>
                      </DialogHeader>
                      <Form {...customItemForm}>
                        <form onSubmit={customItemForm.handleSubmit(onCustomItemSubmit)} className="space-y-4 mt-2">
                          <FormField
                            control={customItemForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                  <Input placeholder="ex: Tapis de course" className="rounded-lg" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={customItemForm.control}
                            name="volume"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Volume (m³)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" className="rounded-lg" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="w-full rounded-lg h-10 mt-2" disabled={!customItemForm.formState.isValid}>
                            Ajouter
                          </Button>
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
        <Card className="rounded-2xl border-border shadow-sm bg-card/50">
          <CardHeader className="pb-3 px-6 pt-6">
            <div className="flex items-center gap-3">
              <Wand2 className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-lg">Saisie rapide par texte</CardTitle>
                <CardDescription className="text-xs mt-0.5">Décrivez votre pièce, l'IA extrait les volumes.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <Form {...aiInventoryForm}>
              <form onSubmit={aiInventoryForm.handleSubmit(onAiInventorySubmit)} className="space-y-3">
                <FormField
                  control={aiInventoryForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Un lit double, une armoire 2 portes et 5 cartons..."
                          className="resize-none rounded-xl bg-background border-border min-h-[80px] text-sm p-3"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={isGeneratingAi || !aiInventoryForm.formState.isValid}
                    className="rounded-lg h-9 px-4"
                  >
                    {isGeneratingAi && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                    Générer
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* --- SIDEBAR RÉSUMÉ (DESKTOP) --- */}
      <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col sticky top-24">
        <Card className="rounded-2xl border-border shadow-sm flex flex-col h-[calc(100vh-8rem)]">
          <CardHeader className="border-b border-border p-5 bg-muted/20 shrink-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingCart className="h-4 w-4" />
              Résumé
            </CardTitle>

            <div className="mt-4 p-4 rounded-xl bg-primary text-primary-foreground text-center">
              <p className="text-xs font-medium opacity-90 mb-1">Volume estimé</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold tracking-tight">{totalVolume.toFixed(1)}</span>
                <span className="font-medium">m³</span>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
              <TruckIcon className="h-3.5 w-3.5" />
              {truckEstimation.label}
            </div>
          </CardHeader>

          {/* Scroll intelligent basé sur la hauteur du contenu */}
          <CardContent
            className={cn(
              "flex-1 p-4",
              shouldScrollSummary
                ? "overflow-y-auto scrollbar-thin scrollbar-thumb-border"
                : "overflow-hidden"
            )}
          >
            {inventoryItems.length > 0 ? (
              <div className="space-y-0">
                <AnimatePresence initial={false}>
                  {inventoryItems.map((item) => (
                    <SummaryItemLine
                      key={item.id}
                      item={item}
                      onUpdate={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/50 px-2">
                <PackagePlus className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Inventaire vide.</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col gap-2 p-4 border-t border-border shrink-0">
            <div className="flex items-center justify-center text-[10px] text-muted-foreground w-full mb-1 h-4">
              {saveError ? (
                <span className="text-destructive flex items-center"><AlertTriangle className="h-3 w-3 mr-1" /> {saveError}</span>
              ) : isSaving ? (
                <span className="flex items-center"><Loader2 className="h-3 w-3 animate-spin mr-1"/> Sauvegarde...</span>
              ) : lastSavedAt ? (
                <span className="text-emerald-600 flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Sauvegardé</span>
              ) : null}
            </div>
            <Button
              type="button"
              onClick={() => router.push("/demande-devis")}
              disabled={totalVolume <= 0}
              className="w-full rounded-xl h-12 font-medium"
            >
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </aside>

      {/* --- SMART BAR MOBILE --- */}
      <AnimatePresence>
        {totalVolume > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 p-4 pb-safe bg-background border-t border-border z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                Volume estimé
              </span>
              <div className="flex items-baseline gap-1 text-primary">
                <span className="text-2xl font-bold leading-none">
                  {totalVolume.toFixed(1)}
                </span>
                <span className="text-xs font-medium">m³</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => router.push("/demande-devis")}
              className="rounded-xl h-12 px-6"
            >
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}