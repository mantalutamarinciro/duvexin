"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { MoveRequest, getRequests, updateRequestVolume } from "@/services/requestService";
import { roomCategories, PredefinedItem } from "@/lib/predefined-items";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus, Package, Calculator, Loader2, CheckCircle2, ChevronDown, Save, Sparkles, UploadCloud, FileText, Camera, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { analyzeRoomPhoto } from "@/ai/flows/inventory-from-photo";
import { generateInventoryFromText } from "@/ai/flows/inventory-from-text";

export function InternalVolumeCalculator() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MoveRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [inventory, setInventory] = useState<Map<string, number>>(new Map());
  const [activeCategory, setActiveCategory] = useState<string>('ai_assistant');
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved">("idle");
  
  // AI assistant states
  const [customItemsList, setCustomItemsList] = useState<PredefinedItem[]>([]);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [isAnalyzingMedia, setIsAnalyzingMedia] = useState(false);
  const [textDescription, setTextDescription] = useState("");
  
  // Media vision upload states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const reqs = await getRequests();
        setRequests(reqs.filter(r => r.status !== "Archivé"));
      } catch {
        toast({ title: "Erreur", description: "Impossible de charger les dossiers.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [toast]);

  // Categories list memo
  const categoriesList = useMemo(() => {
    const list = [
      { id: 'ai_assistant', name: 'Assistant IA 🪄', icon: 'Sparkles', items: [] },
      ...roomCategories
    ];
    if (customItemsList.length > 0) {
      list.push({
        id: 'custom_category',
        name: 'Hors-catalogue',
        icon: 'PackageSearch',
        items: customItemsList
      });
    }
    return list;
  }, [customItemsList]);

  const activeCategoryData = useMemo(() => {
    return categoriesList.find(c => c.id === activeCategory) || categoriesList[0];
  }, [categoriesList, activeCategory]);

  const allPredefinedItems = useMemo(() => {
    return roomCategories.flatMap(cat => cat.items);
  }, []);

  const findClosestPredefinedItem = useCallback((aiName: string): PredefinedItem | null => {
    const normAiName = aiName.trim().toLowerCase();
    
    // 1. Try exact or sub-string match
    for (const item of allPredefinedItems) {
      const normItemName = item.name.toLowerCase();
      if (normItemName === normAiName || normItemName.includes(normAiName) || normAiName.includes(normItemName)) {
        return item;
      }
    }

    // 2. Try matching by keyword
    const keywords: Record<string, string> = {
      'canap': 'sofa',
      'chaise': 'chair',
      'table': 'dining_table',
      'lit': 'bed_double',
      'carton': 'box_generic',
      'frigo': 'refrigerator',
      'réfrig': 'refrigerator',
      'armoire': 'wardrobe',
      'commode': 'dresser',
      'télé': 'tv',
      'tv': 'tv',
      'plante': 'plant_large',
      'fauteuil': 'armchair',
      'bureau': 'desk',
      'machine': 'washing_machine',
    };

    for (const [kw, itemId] of Object.entries(keywords)) {
      if (normAiName.includes(kw)) {
        const match = allPredefinedItems.find(i => i.id === itemId);
        if (match) return match;
      }
    }

    return null;
  }, [allPredefinedItems]);

  const calculateVolumeWithCustom = useCallback((inv: Map<string, number>, customs: PredefinedItem[]) => {
    let sum = 0;
    inv.forEach((qty, itemId) => {
      let item = null;
      for (const cat of roomCategories) {
        const found = cat.items.find(i => i.id === itemId);
        if (found) {
          item = found;
          break;
        }
      }
      if (!item) {
        item = customs.find(i => i.id === itemId);
      }
      
      if (item) sum += item.volume * qty;
    });
    return Number(sum.toFixed(1));
  }, []);

  const debouncedSave = useDebouncedCallback(async (reqId: string, vol: number, inv: Map<string, number>) => {
      if (!reqId) return;
      setSyncStatus("saving");
      try {
          let details = "Inventaire Visite Technique:\n";
          inv.forEach((qty, itemId) => {
             let item = null;
             for (const cat of roomCategories) {
                const found = cat.items.find(i => i.id === itemId);
                if (found) {
                     item = found;
                     break;
                }
             }
             if (!item) {
                 item = customItemsList.find(i => i.id === itemId);
             }
             if (item) {
                 details += `- ${qty}x ${item.name} (${Number((item.volume * qty).toFixed(1))}m³)\n`;
             }
          });
          await updateRequestVolume(reqId, vol, details);
          setSyncStatus("saved");
          setTimeout(() => setSyncStatus("idle"), 2000);
      } catch (error) {
          toast({ title: "Erreur de synchro", description: "La sauvegarde a échoué.", variant: "destructive" });
          setSyncStatus("idle");
      }
  }, 1000);

  const handleAddAiItems = useCallback((aiItems: Array<{ name: string; volume: number; quantity: number }>) => {
    setInventory(prev => {
      const next = new Map(prev);
      const newCustomItems: PredefinedItem[] = [...customItemsList];

      for (const aiItem of aiItems) {
        const matchedPredefined = findClosestPredefinedItem(aiItem.name);
        if (matchedPredefined) {
          const currentQty = next.get(matchedPredefined.id) || 0;
          next.set(matchedPredefined.id, currentQty + aiItem.quantity);
        } else {
          const customId = `custom-${aiItem.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
          
          let exists = newCustomItems.find(i => i.id === customId);
          if (!exists) {
            exists = {
              id: customId,
              name: aiItem.name,
              volume: aiItem.volume,
              icon: 'Package',
            };
            newCustomItems.push(exists);
          }
          
          const currentQty = next.get(customId) || 0;
          next.set(customId, currentQty + aiItem.quantity);
        }
      }

      setCustomItemsList(newCustomItems);

      if (selectedRequestId) {
        debouncedSave(selectedRequestId, calculateVolumeWithCustom(next, newCustomItems), next);
      }

      return next;
    });
  }, [customItemsList, selectedRequestId, findClosestPredefinedItem, debouncedSave, calculateVolumeWithCustom]);

  const updateItemQty = (id: string, delta: number) => {
    setInventory(prev => {
      const next = new Map(prev);
      const curr = next.get(id) || 0;
      const val = curr + delta;
      if (val <= 0) next.delete(id);
      else next.set(id, val);
      
      if (selectedRequestId) {
          debouncedSave(selectedRequestId, calculateVolumeWithCustom(next, customItemsList), next);
      }
      
      return next;
    });
  };

  const totalVolume = useMemo(() => {
    return calculateVolumeWithCustom(inventory, customItemsList);
  }, [inventory, customItemsList, calculateVolumeWithCustom]);

  const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (LucideIcons as any)[name] || Package;
    return <Icon className={className} />;
  };

  const handleTextAnalyze = async () => {
    if (!textDescription.trim()) {
      toast({ variant: "destructive", title: "Saisie vide", description: "Veuillez entrer une description textuelle." });
      return;
    }
    setIsAnalyzingText(true);
    toast({ title: "Analyse en cours", description: "L'IA extrait les meubles de votre texte..." });
    try {
      const result = await generateInventoryFromText({ description: textDescription });
      if (result.items && result.items.length > 0) {
        handleAddAiItems(result.items);
        toast({
          title: "Analyse réussie",
          description: `${result.items.length} objets détectés et ajoutés à l'inventaire.`,
        });
        setTextDescription("");
      } else {
        toast({ variant: "destructive", title: "Aucun objet", description: "L'IA n'a détecté aucun meuble dans le texte fourni." });
      }
    } catch (err: any) {
      toast({ variant: "destructive", title: "Échec de l'analyse", description: err.message || "Erreur de traitement du texte." });
    } finally {
      setIsAnalyzingText(false);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setSelectedImage(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setImageBase64(base64);
      setImageMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleMediaAnalyze = async () => {
    if (!imageBase64 || !imageMimeType) {
      toast({ variant: "destructive", title: "Aucun fichier", description: "Veuillez sélectionner ou déposer une photo/vidéo." });
      return;
    }
    setIsAnalyzingMedia(true);
    toast({ title: "Analyse en cours", description: "Gemini analyse l'image/la vidéo de la pièce..." });
    try {
      const result = await analyzeRoomPhoto({ imageBase64, mimeType: imageMimeType });
      if (result.items && result.items.length > 0) {
        handleAddAiItems(result.items);
        toast({
          title: "Analyse réussie",
          description: `${result.items.length} objets extraits et ajoutés à l'inventaire ! (Volume : ${result.totalVolume} m³)`,
        });
        setSelectedImage(null);
        setImageBase64(null);
        setImageMimeType(null);
      } else {
        toast({ variant: "destructive", title: "Aucun objet", description: "Aucun meuble n'a été détecté dans ce média." });
      }
    } catch (err: any) {
      toast({ variant: "destructive", title: "Échec de l'analyse", description: err.message || "Erreur de traitement par l'IA Vision." });
    } finally {
      setIsAnalyzingMedia(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        {/* TOP BAR - FIXED */}
        <div className="shrink-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 shadow-sm z-20">
             <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Calculator className="h-6 w-6" />
                      </div>
                      <div>
                          <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Visite Technique</h1>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Calculateur & Chiffrage</p>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-full sm:w-80">
                         <Select value={selectedRequestId} onValueChange={(val) => {
                             setSelectedRequestId(val);
                             if (totalVolume > 0) debouncedSave(val, totalVolume, inventory);
                         }}>
                            <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-slate-900 dark:text-white font-bold w-full">
                                <SelectValue placeholder="Sélectionnez un client / demande..." />
                            </SelectTrigger>
                            <SelectContent>
                                {requests.map(r => (
                                    <SelectItem key={r.id} value={r.id} className="font-medium">
                                        {r.clientName} - <span className="text-muted-foreground">{r.originAddress.split(',')[0]}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                      </div>
                  </div>
             </div>
         </div>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex overflow-hidden">
            {/* LEFT SIDEBAR - CATEGORIES */}
            <div className="w-24 sm:w-32 lg:w-48 xl:w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 overflow-y-auto scrollbar-hide py-4 px-2 sm:px-4 flex flex-col gap-2">
                 {categoriesList.map(cat => {
                      const isActive = activeCategory === cat.id;
                      return (
                          <button 
                             key={cat.id} 
                             onClick={() => setActiveCategory(cat.id)}
                             className={cn(
                                 "flex flex-col xl:flex-row items-center xl:justify-start gap-2 xl:gap-3 p-3 xl:p-4 rounded-2xl transition-all duration-200 text-center xl:text-left relative overflow-hidden group",
                                 isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                             )}
                         >
                             {isActive && (
                                 <motion.div layoutId="activeCatBg" className="absolute inset-0 bg-primary z-0" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                             )}
                             <DynamicIcon name={cat.icon || 'Package'} className={cn("h-6 w-6 xl:h-5 xl:w-5 relative z-10", isActive ? "text-primary-foreground" : "text-slate-400 group-hover:text-primary")} />
                             <span className="text-[10px] sm:text-xs xl:text-sm font-bold relative z-10 break-words line-clamp-2">{cat.name}</span>
                          </button>
                      )
                  })}
            </div>

            {/* RIGHT AREA - ITEMS OR AI ASSISTANT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
                 <div className="max-w-6xl mx-auto pb-32">
                      <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeCategoryData.name}</h2>
                      </div>
                      
                      {activeCategory === 'ai_assistant' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                              {/* Vision Upload Area (Photo / Vidéo) */}
                              <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden p-6 flex flex-col justify-between">
                                  <div>
                                      <CardHeader className="p-0 mb-4">
                                          <CardTitle className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center">
                                              <Camera className="h-5 w-5 text-primary mr-2" />
                                              Analyse Photo & Vidéo
                                          </CardTitle>
                                          <CardDescription>Téléchargez une photo ou une vidéo d'une pièce pour que Gemini en extraie l'inventaire.</CardDescription>
                                      </CardHeader>
                                      
                                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-950 transition relative group min-h-[180px] flex flex-col justify-center items-center">
                                          <input 
                                              type="file" 
                                              accept="image/*,video/*" 
                                              onChange={handleMediaUpload} 
                                              disabled={isAnalyzingMedia}
                                              className="absolute inset-0 opacity-0 cursor-pointer" 
                                          />
                                          {selectedImage ? (
                                              imageMimeType?.startsWith('video/') ? (
                                                  <div className="flex flex-col items-center">
                                                      <FileText className="h-10 w-10 text-primary mb-2" />
                                                      <p className="text-xs font-semibold truncate max-w-[200px] text-slate-600">Vidéo sélectionnée</p>
                                                  </div>
                                              ) : (
                                                  <img src={selectedImage} alt="Aperçu" className="max-h-[130px] rounded-lg object-contain" />
                                              )
                                          ) : (
                                              <div className="flex flex-col items-center justify-center">
                                                  <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-primary mb-2" />
                                                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Sélectionner une photo ou vidéo</p>
                                                  <p className="text-[10px] text-slate-400 mt-1">Vidéos : max 10 secondes conseillé.</p>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                                  <div className="mt-6 flex gap-2">
                                      {selectedImage && (
                                          <Button variant="outline" onClick={() => setSelectedImage(null)} className="rounded-full flex-1">
                                              Annuler
                                          </Button>
                                      )}
                                      <Button onClick={handleMediaAnalyze} disabled={isAnalyzingMedia || !selectedImage} className="rounded-full flex-1">
                                          {isAnalyzingMedia && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                          Analyser le média
                                      </Button>
                                  </div>
                              </Card>

                              {/* Natural Text Input */}
                              <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden p-6 flex flex-col justify-between">
                                  <div>
                                      <CardHeader className="p-0 mb-4">
                                          <CardTitle className="text-lg font-black text-slate-800 dark:text-slate-100 flex items-center">
                                              <FileText className="h-5 w-5 text-primary mr-2" />
                                              Saisie Libre / Notes vocales
                                          </CardTitle>
                                          <CardDescription>Décrivez le mobilier de la pièce en langage naturel. L'IA calculera les volumes.</CardDescription>
                                      </CardHeader>
                                      
                                      <Textarea
                                          placeholder="Exemple : Dans la chambre il y a un lit double, une armoire normande à 3 portes, deux tables de chevet, une commode et 8 cartons de vêtements."
                                          value={textDescription}
                                          onChange={(e) => setTextDescription(e.target.value)}
                                          disabled={isAnalyzingText}
                                          className="min-h-[180px] rounded-2xl resize-none p-4"
                                      />
                                  </div>
                                  <div className="mt-6">
                                      <Button onClick={handleTextAnalyze} disabled={isAnalyzingText || !textDescription.trim()} className="w-full rounded-full">
                                          {isAnalyzingText && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                          Analyser le texte
                                      </Button>
                                  </div>
                              </Card>
                          </div>
                      ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                              <AnimatePresence mode="popLayout">
                                  {activeCategoryData.items.map(item => {
                                      const qty = inventory.get(item.id) || 0;
                                      const isActive = qty > 0;
                                      
                                      return (
                                          <motion.div 
                                             key={item.id}
                                             layout
                                             initial={{ opacity: 0, scale: 0.9 }}
                                             animate={{ opacity: 1, scale: 1 }}
                                             exit={{ opacity: 0, scale: 0.9 }}
                                             transition={{ duration: 0.15 }}
                                          >
                                              <Card className={cn(
                                                  "rounded-[1.5rem] border-2 transition-all duration-200 overflow-hidden h-full flex flex-col relative",
                                                  isActive ? "border-primary bg-primary/5 shadow-md shadow-primary/10" : "border-transparent bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-slate-200"
                                              )}>
                                                  <CardContent className="p-4 sm:p-5 flex flex-col items-center justify-center text-center h-full gap-2 relative z-10">
                                                       <DynamicIcon name={item.icon} className={cn("h-10 w-10 sm:h-12 sm:w-12 transition-colors", isActive ? "text-primary" : "text-slate-300")} />
                                                       <div>
                                                           <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100 leading-tight">{item.name}</p>
                                                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.volume} m³</p>
                                                       </div>
                                                  </CardContent>

                                                  {/* Overlay for actions when active */}
                                                  <AnimatePresence>
                                                      {isActive && (
                                                          <motion.div 
                                                             initial={{ opacity: 0 }}
                                                             animate={{ opacity: 1 }}
                                                             exit={{ opacity: 0 }}
                                                             className="absolute inset-0 bg-white/90 dark:bg-slate-900/95 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center"
                                                          >
                                                              <p className="text-xs font-bold text-slate-500 mb-2 truncate max-w-[90%] px-2">{item.name}</p>
                                                              <div className="flex items-center gap-3">
                                                                  <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 shadow-sm" onClick={(e) => { e.stopPropagation(); updateItemQty(item.id, -1); }}>
                                                                      <Minus className="h-5 w-5" />
                                                                  </Button>
                                                                  <span className="text-2xl font-black w-8 text-center text-slate-900 dark:text-white tabular-nums">{qty}</span>
                                                                  <Button variant="default" size="icon" className="h-12 w-12 rounded-full shadow-lg shadow-primary/30" onClick={(e) => { e.stopPropagation(); updateItemQty(item.id, 1); }}>
                                                                      <Plus className="h-5 w-5" />
                                                                  </Button>
                                                              </div>
                                                          </motion.div>
                                                      )}
                                                  </AnimatePresence>
                                                  
                                                  {/* Click target when inactive */}
                                                  {!isActive && (
                                                      <button className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[1.5rem]" onClick={() => updateItemQty(item.id, 1)} aria-label={`Ajouter ${item.name}`} />
                                                  )}
                                              </Card>
                                          </motion.div>
                                      )
                                  })}
                              </AnimatePresence>
                          </div>
                      )}
                 </div>
            </div>
        </div>

        {/* BOTTOM FLOATING SUMMARY BAR */}
        <div className="absolute bottom-4 left-4 sm:left-auto right-4 sm:right-auto sm:fixed sm:bottom-8 sm:left-1/2 sm:-translate-x-1/2 bg-slate-900 text-white rounded-[2rem] p-2 pr-6 shadow-2xl flex items-center gap-4 sm:gap-8 z-50 border border-slate-700">
             <div className="flex items-center gap-3 bg-slate-800 rounded-full pl-2 pr-4 py-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Package className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-emerald-400/80 tracking-widest">Volume Estimé</span>
                      <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black leading-none">{totalVolume}</span>
                          <span className="text-xs font-bold text-slate-400">m³</span>
                      </div>
                  </div>
             </div>
             
             <div className="flex flex-col items-end pr-2">
                  <div className="flex items-center gap-2 text-sm font-bold">
                       {syncStatus === "idle" && (
                           <>
                               <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                               <span className="text-emerald-400">À jour</span>
                           </>
                       )}
                       {syncStatus === "saving" && (
                           <>
                               <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                               <span className="text-blue-400">Enregistrement...</span>
                           </>
                       )}
                       {syncStatus === "saved" && (
                           <>
                               <Save className="h-4 w-4 text-emerald-400" />
                               <span className="text-emerald-400">Sauvegardé</span>
                           </>
                       )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                      {selectedRequestId ? "Synchronisé avec le CRM" : "Aucun dossier sélectionné"}
                  </span>
             </div>
        </div>
    </div>
  );
}
