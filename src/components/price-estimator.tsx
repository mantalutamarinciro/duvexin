"use client";

import * as React from "react";
import { 
  Calculator, 
  Truck, 
  MapPin, 
  Layers, 
  ArrowRight, 
  Info, 
  Calendar,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  ShieldCheck
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";

/* ================== Logic ================== */

const BASE_M3 = 45; // Prix de base au m3
const KM_RATE = 1.8; // Prix au km
const FORMULA_MULTIPLIERS = {
  eco: 1,
  standard: 1.25,
  prestige: 1.6
};

export function PriceEstimator() {
  const [volume, setVolume] = React.useState(20);
  const [distance, setDistance] = React.useState(50);
  const [formula, setFormula] = React.useState<"eco" | "standard" | "prestige">("standard");
  const [floors, setFloors] = React.useState(0);
  const [hasElevator, setHasElevator] = React.useState(true);
  const [isHighSeason, setIsHighSeason] = React.useState(false);
  const [longPortage, setLongPortage] = React.useState(false);

  const price = React.useMemo(() => {
    // 1. Base Volume
    let total = volume * BASE_M3;
    
    // 2. Distance
    total += distance * KM_RATE;
    
    // 3. Formule
    total *= FORMULA_MULTIPLIERS[formula];
    
    // 4. Accès (Étages sans ascenseur)
    if (!hasElevator && floors > 0) {
      total += (floors * 0.05 * total); // +5% par étage sans ascenseur
    }
    
    // 5. Portage (> 25m)
    if (longPortage) {
      total += 100; // Forfait portage long
    }
    
    // 6. Saison (Haute saison : Mai-Septembre)
    if (isHighSeason) {
      total *= 1.15; // +15%
    }

    return Math.round(total);
  }, [volume, distance, formula, floors, hasElevator, isHighSeason, longPortage]);

  return (
    <TooltipProvider>
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* --- CONTROLS (Left) --- */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-6">
            {/* Volume */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-base font-bold flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-primary" /> Volume à déménager
                </Label>
                <span className="text-2xl font-black text-primary">{volume} m³</span>
              </div>
              <Slider 
                value={[volume]} 
                onValueChange={(v) => setVolume(v[0])} 
                max={100} 
                step={1} 
                className="py-4"
              />
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Estimation : {volume <= 15 ? "Studio / T2" : volume <= 35 ? "Appartement T3/T4" : "Maison familiale"}
              </p>
            </div>

            {/* Distance */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <Label className="text-base font-bold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Distance du trajet
                </Label>
                <span className="text-2xl font-black text-primary">{distance} km</span>
              </div>
              <Slider 
                value={[distance]} 
                onValueChange={(v) => setDistance(v[0])} 
                max={1000} 
                step={10} 
                className="py-4"
              />
            </div>

            {/* Formule */}
            <div className="space-y-4">
              <Label className="text-base font-bold">Niveau de prestation</Label>
              <RadioGroup 
                value={formula} 
                onValueChange={(v: any) => setFormula(v)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              >
                {[
                  { id: "eco", label: "Économique", desc: "Transport seul" },
                  { id: "standard", label: "Standard", desc: "Fragile inclus" },
                  { id: "prestige", label: "Prestige", desc: "Clé en main" },
                ].map((f) => (
                  <Label
                    key={f.id}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all",
                      formula === f.id ? "border-primary bg-primary/5 ring-4 ring-primary/10" : "border-slate-100 hover:border-slate-200 bg-white"
                    )}
                  >
                    <RadioGroupItem value={f.id} className="sr-only" />
                    <span className="font-bold text-sm">{f.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1 uppercase font-black">{f.desc}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Options accès */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <Label className="font-bold flex items-center gap-2">
                    <Layers className="h-4 w-4" /> Étages ({floors})
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setFloors(Math.max(0, floors - 1))}>-</Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setFloors(floors + 1)}>+</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="elevator" className="text-sm">Ascenseur disponible</Label>
                  <Switch id="elevator" checked={hasElevator} onCheckedChange={setHasElevator} />
                </div>
              </div>

              <div className="space-y-4 p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <Label className="font-bold flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Haute Saison
                  </Label>
                  <Switch checked={isHighSeason} onCheckedChange={setIsHighSeason} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Portage long (&gt;25m)</Label>
                  <Switch checked={longPortage} onCheckedChange={setLongPortage} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RESULT (Right) --- */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <Card className="rounded-[3rem] border-none shadow-2xl bg-slate-900 text-white overflow-hidden relative isolate">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 -z-10" />
            
            <CardContent className="p-8 md:p-12 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                Estimation de votre projet
              </p>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl md:text-7xl font-black tracking-tighter">
                    {price}
                  </span>
                  <span className="text-2xl font-bold text-slate-400">€</span>
                </div>
                <p className="text-slate-400 text-sm font-light">Estimation TTC (base indicative)</p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5 text-sm">
                  <span className="text-slate-400">Volume déclaré</span>
                  <span className="font-bold">{volume} m³</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5 text-sm">
                  <span className="text-slate-400">Trajet</span>
                  <span className="font-bold">{distance} km</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/5 text-sm">
                  <span className="text-slate-400">Prestation</span>
                  <span className="font-bold text-primary">{formula.toUpperCase()}</span>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-base shadow-xl shadow-primary/20" asChild>
                  <Link href="/demande-devis">
                    Confirmer ce tarif <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <p className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                  <ShieldCheck className="h-3 w-3 text-primary" /> Devis définitif sous 24h
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex gap-4">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
              Cette estimation est fournie à titre indicatif pour vous aider à budgétiser votre départ. 
              Un devis ferme nécessite une validation technique de nos conseillers.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
