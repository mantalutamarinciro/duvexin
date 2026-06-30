"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Quote } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2, CreditCard, CalendarDays, MapPin, Package, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ClientQuoteView({ quote }: { quote: Quote }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

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
          Votre devis de déménagement
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Bonjour {quote.clientName}, voici la proposition commerciale détaillée pour votre projet.
        </p>
      </div>

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
              <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold">
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
                  <p className="text-slate-600 dark:text-slate-300">
                    {quote.moveDate ? format(new Date(quote.moveDate), "EEEE d MMMM yyyy", { locale: fr }) : "Date à définir"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Package className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Volume à déménager</p>
                  <p className="text-slate-600 dark:text-slate-300">{quote.volume} m³</p>
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
                <p className="text-4xl font-black text-slate-900 dark:text-white">
                  {quote.quote.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 font-medium mb-1">Acompte demandé (30%)</p>
                <p className="text-2xl font-bold text-primary">
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
              className="w-full rounded-2xl h-16 text-lg font-bold shadow-lg shadow-primary/25"
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
    </div>
  );
}
