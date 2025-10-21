"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { saveQuote } from "@/services/quoteService"
import { QuoteForm, type QuoteRequestFormData } from "@/components/quote-form"

export default function PublicQuotePage() {
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
        moveDate: values.moveDate.toISOString(),
        quote: 0, 
        status: 'pending',
      });
      setQuoteId(result.id);
      toast({
        title: "Demande de devis envoyée !",
        description: "Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.",
      });
      // Optionally reset form if needed, though showing success message is often better UX.
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du devis:", error);
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible d'envoyer votre demande de devis. Veuillez réessayer.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container py-16">
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight">Demande de devis gratuit</h1>
                <p className="text-muted-foreground mt-2">
                Remplissez ce formulaire pour recevoir une estimation personnalisée pour votre déménagement. C'est rapide, simple et sans engagement.
                </p>
            </div>
      
            {quoteId ? (
                <Alert variant="default" className="border-green-500 bg-green-50/50">
                    <CheckCircle className="h-4 w-4 text-green-600"/>
                    <AlertTitle className="text-green-800">Demande envoyée avec succès !</AlertTitle>
                    <AlertDescription className="text-green-700">
                    Merci ! Votre demande a bien été enregistrée avec le numéro de référence <span className="font-mono text-sm bg-green-200/50 px-1 py-0.5 rounded">{quoteId}</span>. Nous vous recontacterons très prochainement.
                    <div className="mt-4">
                        <Button onClick={() => setQuoteId(null)}>Faire une nouvelle demande</Button>
                    </div>
                    </AlertDescription>
                </Alert>
            ) : (
                <QuoteForm 
                    onSubmit={onSubmit}
                    submitButtonText="Envoyer ma demande"
                    isSaving={saving}
                />
            )}
        </div>
    </div>
  )
}
