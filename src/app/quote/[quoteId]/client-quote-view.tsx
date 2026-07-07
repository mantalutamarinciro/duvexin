"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Quote } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, CreditCard, CalendarDays, MapPin, Package, Loader2, Download, ClipboardList, Check, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const defaultChecklist = [
  { id: '1', text: 'Notifier le propriétaire / bailleur (préavis de départ)', daysBefore: 90 },
  { id: '2', text: 'Réserver la date définitive et valider la formule', daysBefore: 60 },
  { id: '3', text: 'Commencer le tri des affaires (vendre/donner/jeter)', daysBefore: 45 },
  { id: '4', text: 'Se procurer des cartons et du matériel d\'emballage', daysBefore: 30 },
  { id: '5', text: 'Transférer les contrats (Internet, électricité, gaz)', daysBefore: 15 },
  { id: '6', text: 'Dégivrer le congélateur et sécuriser les objets de valeur', daysBefore: 2 },
  { id: '7', text: 'Relever les compteurs d\'eau et d\'électricité', daysBefore: 0 },
];

export function ClientQuoteView({ quote }: { quote: Quote }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checklist, setChecklist] = useState<{ id: string; text: string; daysBefore: number; checked: boolean }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`vexin_checklist_${quote.id}`);
      if (stored) {
        setChecklist(JSON.parse(stored));
      } else {
        setChecklist(defaultChecklist.map(item => ({ ...item, checked: false })));
      }
    }
  }, [quote.id]);

  const toggleChecklistItem = (id: string) => {
    const updated = checklist.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setChecklist(updated);
    localStorage.setItem(`vexin_checklist_${quote.id}`, JSON.stringify(updated));
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId: quote.id }),
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Erreur de paiement");
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'initialiser le paiement sécurisé.",
      });
      setIsProcessing(false);
    }
  };

  const depositAmount = quote.quote * 0.3;
  const isAccepted = quote.status === "Accepté" || quote.status === "Facturé" || quote.status === "Converti";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
          <Package className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Votre espace de déménagement
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Bonjour {quote.clientName}, voici le suivi complet et la proposition commerciale de votre projet.
        </p>
      </div>

      {/* TIMELINE DE SUIVI (REVOLUTIONNAIRE) */}
      {isAccepted && (
        <Card className="rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 p-6">
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-lg font-black flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> État d'avancement de votre déménagement
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 space-y-6 mt-4">
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Devis signé & acompte réglé</h4>
                <p className="text-xs text-slate-500">Proposition commerciale validée le {format(new Date(), "dd/MM/yyyy")}.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-slate-900 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Planification logistique</h4>
                <p className="text-xs text-slate-500">Nos équipes attribuent les véhicules et valident la feuille de route.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900" />
                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-600">Le Jour J</h4>
                <p className="text-xs text-slate-400 dark:text-slate-600">
                  Prévu pour le {quote.moveDate ? format(new Date(quote.moveDate), "dd MMMM yyyy", { locale: fr }) : "Date à confirmer"}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
        <div className="h-2 w-full bg-primary" />
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Récapitulatif de la prestation</CardTitle>
              <div className="mt-2 text-sm text-slate-500 font-mono">
                RÉF: {quote.id.substring(0, 8).toUpperCase()}
              </div>
            </div>
            {isAccepted && (
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" /> Devis Accepté
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem]">
            <div className="space-y-4">
              <div className="flex gap-3">
                <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Date prévue</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {quote.moveDate ? format(new Date(quote.moveDate), "EEEE d MMMM yyyy", { locale: fr }) : "Date à définir"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Volume à déménager</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{quote.volume} m³</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Départ</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{quote.originAddress}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Arrivée</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2">{quote.destinationAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-slate-500 font-medium mb-1">Montant Total TTC</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {quote.quote.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 font-medium mb-1">Acompte demandé (30%)</p>
                <p className="text-xl font-bold text-primary">
                  {depositAmount.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        {!isAccepted && (
          <CardFooter className="bg-slate-50 dark:bg-slate-800/30 p-6 flex flex-col gap-4">
            <Button 
              size="lg" 
              className="w-full rounded-2xl h-16 text-lg font-bold shadow-lg shadow-primary/25 bg-primary text-white"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> Sécurisation en cours...</>
              ) : (
                <><CreditCard className="mr-3 h-6 w-6" /> Signer le devis et payer l'acompte</>
              )}
            </Button>
            <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
               Paiement 100% sécurisé via Stripe. Vous recevrez une facture immédiatement.
             </p>
          </CardFooter>
        )}
      </Card>

      {/* CHECKLIST DE DÉMÉNAGEMENT POUR LE CLIENT (REVOLUTIONNAIRE) */}
      {isAccepted && (
        <Card className="rounded-[2rem] border-none shadow-xl bg-white dark:bg-slate-900 p-6">
          <CardHeader className="pb-3 px-4 pt-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-500" /> Vos préparatifs de déménagement
              </CardTitle>
              <p className="text-xs text-slate-500 mt-1">Cochez vos étapes pour ne rien oublier le jour J.</p>
            </div>
            <div className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full">
              {checklist.filter(item => item.checked).length} / {checklist.length} complétés
            </div>
          </CardHeader>
          <CardContent className="px-4 pt-3">
            <div className="space-y-3">
              {checklist.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    item.checked 
                      ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/10 opacity-70' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors border ${
                    item.checked 
                      ? 'bg-emerald-500 border-emerald-500 text-white' 
                      : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-semibold text-slate-900 dark:text-slate-100 ${item.checked ? 'line-through' : ''}`}>
                      {item.text}
                    </p>
                  </div>
                  <div className="text-[10px] font-black text-slate-400 uppercase shrink-0">
                    J - {item.daysBefore}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
