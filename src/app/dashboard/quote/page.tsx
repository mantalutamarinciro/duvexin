"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, ArrowLeft, Wand2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { saveQuote } from "@/services/quoteService"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteRequestFormData } from "@/types/quote"
import { updateRequestStatus } from "@/services/requestService"
import { getQuotePrefillFromVisit, linkVisitToQuote } from "@/services/visitService"
import Link from "next/link"

export default function DashboardNewQuotePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <DashboardNewQuoteContent />
    </Suspense>
  )
}

function DashboardNewQuoteContent() {
  const [saving, setSaving] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const [prefillData, setPrefillData] = useState<any>(null)
  const [linkedRequestId, setLinkedRequestId] = useState<string | null>(null)
  const [linkedVisitId, setLinkedVisitId] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const loadPrefill = async () => {
      const data = sessionStorage.getItem('prefillQuote')
      if (data) {
        try {
          const parsed = JSON.parse(data)
          setPrefillData(parsed)
          if (parsed.requestId) setLinkedRequestId(parsed.requestId)
          if (parsed.visitId) setLinkedVisitId(parsed.visitId)
          sessionStorage.removeItem('prefillQuote')
          setIsReady(true)
          return
        } catch (e) {}
      }

      const visitId = searchParams.get('visitId')
      if (visitId) {
        try {
          const visitPrefill = await getQuotePrefillFromVisit(visitId)
          if (visitPrefill) {
            setPrefillData(visitPrefill)
            setLinkedVisitId(visitPrefill.visitId)
            if (visitPrefill.requestId) setLinkedRequestId(visitPrefill.requestId)
          } else {
            toast({
              variant: "destructive",
              title: "Visite introuvable",
              description: "Impossible de recuperer les informations de la visite.",
            })
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Erreur d'autocompletion",
            description: "Les donnees de la visite n'ont pas pu etre chargees.",
          })
        }
      }

      setIsReady(true)
    }

    void loadPrefill()
  }, [searchParams, toast])

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
        requestId: linkedRequestId || undefined,
        visitId: linkedVisitId || undefined,
      });
      setQuoteId(result.id);

      // Si le devis provient d'une conversion directe de demande
      if (linkedRequestId) {
          await updateRequestStatus(linkedRequestId, 'Archivé'); // On l'archive vu qu'il est transformé
      }

      if (linkedVisitId) {
          await linkVisitToQuote(linkedVisitId, result.id);
      }

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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/quotes">
                <Button variant="outline" size="icon" className="rounded-full shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                    <ArrowLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </Button>
            </Link>
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary" /> Création de Devis
                </h1>
                <p className="text-slate-500 mt-1">
                Générez rapidement un nouveau devis. Les informations seront pré-remplies si vous venez d'une demande.
                </p>
            </div>
        </div>

        {!isReady ? (
            <div className="h-[400px] flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        ) : (
            <>
                {prefillData && (
                    <Alert className="rounded-2xl border-none bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 shadow-sm">
                        <Wand2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        <AlertTitle className="font-bold text-base">Autocomplétion Magique</AlertTitle>
                        <AlertDescription className="font-medium opacity-90 text-sm mt-1">
                            Nous avons importé les informations du prospect <strong className="font-black">{prefillData.clientName}</strong>. L'itinéraire et le volume (si renseignés) ont été pré-remplis pour vous faire gagner du temps !
                        </AlertDescription>
                    </Alert>
                )}
          
                {quoteId ? (
                    <Alert variant="default" className="border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-2xl p-6">
                        <CheckCircle className="h-6 w-6 text-emerald-600"/>
                        <AlertTitle className="text-emerald-800 dark:text-emerald-300 text-lg font-bold ml-2">Devis créé avec succès !</AlertTitle>
                        <AlertDescription className="text-emerald-700 dark:text-emerald-400 mt-2 ml-2 text-base">
                        Le dossier a bien été enregistré avec le numéro <span className="font-mono font-bold bg-emerald-200/50 dark:bg-emerald-900 px-2 py-1 rounded-lg">{quoteId}</span>. <br/>Vous allez être redirigé vers l'éditeur de prix...
                        </AlertDescription>
                    </Alert>
                ) : (
                    <QuoteForm 
                        initialData={prefillData}
                        onSubmit={onSubmit}
                        submitButtonText="Enregistrer et Chiffrer"
                        isSaving={saving}
                        isDashboard={true} 
                    />
                )}
            </>
        )}
    </div>
  )
}
