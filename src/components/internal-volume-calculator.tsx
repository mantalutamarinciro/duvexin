"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { MoveRequest, getRequests, updateRequestVolume } from "@/services/requestService";
import { roomCategories, PredefinedItem } from "@/lib/predefined-items";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus, Package, Calculator, Loader2, CheckCircle2, ChevronDown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";

export function InternalVolumeCalculator() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MoveRequest[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  const [inventory, setInventory] = useState<Map<string, number>>(new Map());
  const [activeCategory, setActiveCategory] = useState<string>(roomCategories[0].id);
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "saving" | "saved">("idle");

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

  const activeCategoryData = roomCategories.find(c => c.id === activeCategory) || roomCategories[0];

  const totalVolume = useMemo(() => {
    let sum = 0;
    inventory.forEach((qty, itemId) => {
      for (const cat of roomCategories) {
        const item = cat.items.find(i => i.id === itemId);
        if (item) sum += item.volume * qty;
      }
    });
    return Number(sum.toFixed(1));
  }, [inventory]);

  const debouncedSave = useDebouncedCallback(async (reqId: string, vol: number, inv: Map<string, number>) => {
      if (!reqId) return;
      setSyncStatus("saving");
      try {
          let details = "Inventaire Visite Technique:\n";
          inv.forEach((qty, itemId) => {
             for (const cat of roomCategories) {
                const item = cat.items.find(i => i.id === itemId);
                if (item) {
                     details += `- ${qty}x ${item.name} (${Number((item.volume * qty).toFixed(1))}m³)\n`;
                }
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

  const updateItemQty = (id: string, delta: number) => {
    setInventory(prev => {
      const next = new Map(prev);
      const curr = next.get(id) || 0;
      const val = curr + delta;
      if (val <= 0) next.delete(id);
      else next.set(id, val);
      
      // Auto-save trigger
      if (selectedRequestId) {
          debouncedSave(selectedRequestId, calculateVolume(next), next);
      }
      
      return next;
    });
  };
  
  const calculateVolume = (inv: Map<string, number>) => {
      let sum = 0;
      inv.forEach((qty, itemId) => {
        for (const cat of roomCategories) {
          const item = cat.items.find(i => i.id === itemId);
          if (item) sum += item.volume * qty;
        }
      });
      return Number(sum.toFixed(1));
  }

  const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (LucideIcons as any)[name] || Package;
    return <Icon className={className} />;
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
                             // Force un auto-save immédiat si on a déjà du volume
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
                 {roomCategories.map(cat => {
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

            {/* RIGHT AREA - ITEMS */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
                 <div className="max-w-6xl mx-auto pb-32">
                     <div className="flex items-center justify-between mb-6">
                         <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeCategoryData.name}</h2>
                     </div>
                     
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
  )
}
