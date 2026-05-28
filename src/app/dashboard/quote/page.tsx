"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { saveQuote } from "@/services/quoteService"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteRequestFormData } from "@/types/quote"


export default function DashboardNewQuotePage() {
  const [saving, setSaving] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(values: QuoteRequestFormData) {
    setSaving(true);
    setQuoteId(null);
    try {
      const result = await saveQuote({
        ...values,
        moveDate: values.moveDate || undefined,
        quote: 0, 
        volume: values.volume || 0,
        distance: values.distance || 0,
        serviceType: values.serviceType || 'basic',
      });
      setQuoteId(result.id);
      toast({
        title: "Devis créé !",
        description: "Le nouveau devis a été enregistré avec succès.",
      });
      router.push(`/dashboard/quote/${result.id}`);
      
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du devis:", error);
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible de créer le devis. Veuillez réessayer.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Nouveau Devis</h1>
            <p className="text-muted-foreground mt-2">
            Remplissez ce formulaire pour créer un nouveau devis dans le système. Vous pourrez le chiffrer et le modifier à l'étape suivante.
            </p>
        </div>
  
        {quoteId ? (
            <Alert variant="default" className="border-green-500 bg-green-50/50">
                <CheckCircle className="h-4 w-4 text-green-600"/>
                <AlertTitle className="text-green-800">Devis créé avec succès !</AlertTitle>
                <AlertDescription className="text-green-700">
                Le devis a bien été enregistré avec le numéro de référence <span className="font-mono text-sm bg-green-200/50 px-1 py-0.5 rounded">{quoteId}</span>. Vous allez être redirigé vers la page de détails pour le finaliser.
                <div className="mt-4">
                    <Button onClick={() => setQuoteId(null)}>Créer un autre devis</Button>
                </div>
                </AlertDescription>
            </Alert>
        ) : (
            <QuoteForm 
                onSubmit={onSubmit}
                submitButtonText="Créer et continuer"
                isSaving={saving}
                isDashboard={true} // Full view for dashboard
            />
        )}
    </div>
  )
}
