"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Mail, Send, CheckCircle2, Clock, Loader2, AlertCircle } from "lucide-react";
import { getQuotes, sendQuoteFollowUpEmail } from "@/services/quoteService";
import type { Quote } from "@/types/quote";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

export default function AutomationsPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getQuotes();
        // Ne garder que les devis envoyés
        setQuotes(data.filter((q) => q.status === "Envoyé"));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const pendingFollowUps = quotes.filter((q) => {
    const daysSince = differenceInDays(new Date(), new Date(q.createdAt));
    return daysSince >= 3;
  });

  const handleRunAutomations = async () => {
    if (pendingFollowUps.length === 0) return;
    
    setIsProcessing(true);
    let successCount = 0;
    let failCount = 0;

    try {
      // Loop over pending quotes to send real follow-up emails
      for (const quote of pendingFollowUps) {
        try {
          await sendQuoteFollowUpEmail(quote.id);
          successCount++;
        } catch (err) {
          console.error(`Failed to send follow-up for quote ${quote.id}:`, err);
          failCount++;
        }
      }
      
      // Refresh local quote list
      const data = await getQuotes();
      setQuotes(data.filter((q) => q.status === "Envoyé"));
      
      if (successCount > 0) {
        toast({
          title: "Relances IA envoyées",
          description: `${successCount} relance(s) automatique(s) personnalisée(s) envoyée(s) par email avec succès. ${failCount > 0 ? `(${failCount} échec(s))` : ""}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec des relances",
          description: `Impossible d'envoyer les relances. Veuillez vérifier que Resend et Gemini sont bien configurés.`,
        });
      }
    } catch (error) {
      console.error("Automations execution error:", error);
      toast({
        variant: "destructive",
        title: "Erreur générale",
        description: "Une erreur est survenue lors de l'exécution des automatisations.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <Bot className="h-8 w-8 text-primary" /> Centre d'Automatisations
        </h1>
        <p className="text-slate-500 mt-1">
          Gérez vos tâches de fond : relances automatiques, SMS programmés et suivis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-[2.5rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900 overflow-hidden relative group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/20" />
          
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-black">
              <Mail className="h-6 w-6 text-primary" /> Relances Devis (J+3)
            </CardTitle>
            <CardDescription>
              Relance automatiquement les prospects qui n'ont pas réponido 3 jours après réception du devis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">En attente d'exécution</p>
                {loading ? (
                  <Loader2 className="h-8 w-8 animate-spin mt-2 text-primary" />
                ) : (
                  <p className="text-5xl font-black text-slate-900 dark:text-white mt-1">
                    {pendingFollowUps.length}
                  </p>
                )}
              </div>
              <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {!loading && pendingFollowUps.length > 0 && (
              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Prochaines cibles :</h4>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {pendingFollowUps.map((quote) => (
                    <div key={quote.id} className="flex justify-between items-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-3 rounded-2xl">
                      <div>
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{quote.clientName}</p>
                        <p className="text-xs text-slate-500">Envoyé le {format(new Date(quote.createdAt), "dd/MM/yyyy", { locale: fr })}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] uppercase font-black">Prêt</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!loading && pendingFollowUps.length === 0 && (
              <div className="pt-4 flex flex-col items-center justify-center text-center text-slate-500">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-2 opacity-50" />
                <p className="font-medium text-sm">Tout est à jour !</p>
                <p className="text-xs">Aucune relance nécessaire pour le moment.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-slate-50/50 dark:bg-slate-800/20 pt-6">
            <Button
              size="lg"
              onClick={handleRunAutomations}
              disabled={loading || pendingFollowUps.length === 0 || isProcessing}
              className="w-full rounded-2xl h-14 font-bold shadow-lg shadow-primary/20"
            >
              {isProcessing ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Exécution en cours...</>
              ) : (
                <><Send className="mr-2 h-5 w-5" /> Déclencher les relances manuelles</>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Placeholder for future automations like SMS Reminders */}
        <Card className="rounded-[2.5rem] border-slate-100 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 overflow-hidden opacity-75">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-400">
              <AlertCircle className="h-6 w-6" /> Rappels SMS (J-2)
            </CardTitle>
            <CardDescription>
              Envoi automatique d'un SMS au client 48h avant le jour du déménagement. (Bientôt disponible)
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 flex justify-center">
             <Badge variant="secondary" className="px-4 py-2 text-sm font-bold">Module en développement</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
