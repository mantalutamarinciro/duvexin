"use client";

import { useEffect, useState, useRef } from "react"
import { notFound, useRouter } from "next/navigation"
import { Loader2, Wand2, FileText, ArrowLeft } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useToast } from "@/hooks/use-toast"
import { getQuoteById, updateQuote, Quote } from "@/services/quoteService"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { generateQuote, QuoteInput } from "@/ai/flows/quote-generation-flow"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { QuotePDF } from "@/components/quote-pdf"
import { QuoteForm, QuoteRequestFormData } from "@/components/quote-form"


export default function QuoteDetailsPage({ params }: { params: { quoteId: string } }) {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
    const [generatedQuote, setGeneratedQuote] = useState<number | null>(null);
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);
    const pdfRef = useRef<HTMLDivElement>(null);
    
    const { toast } = useToast();
    const router = useRouter();

    const [formValues, setFormValues] = useState<QuoteRequestFormData | undefined>(undefined);

    useEffect(() => {
        if (params.quoteId) {
            getQuoteById(params.quoteId)
                .then(data => {
                    if (!data) {
                        toast({ variant: 'destructive', title: "Devis introuvable" });
                        notFound();
                    } else {
                        setQuote(data);
                        setFormValues({
                            ...data,
                            moveDate: new Date(data.moveDate),
                        });
                        if (data.quote) {
                            setGeneratedQuote(data.quote);
                        }
                    }
                })
                .catch(() => {
                    toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger le devis." });
                })
                .finally(() => setLoading(false));
        }
    }, [params.quoteId, toast]);

    const handleGenerateQuote = async (currentFormValues: QuoteRequestFormData) => {
        const quoteInput: QuoteInput = {
            distance: currentFormValues.distance,
            volume: currentFormValues.volume,
            serviceType: currentFormValues.serviceType,
            details: currentFormValues.details,
        };

        setIsGeneratingQuote(true);
        try {
            const result = await generateQuote(quoteInput);
            setGeneratedQuote(result.price);
            toast({ title: "Devis généré", description: `Le montant est de ${result.price} €.`})
        } catch (error) {
             toast({ variant: "destructive", title: "Erreur de l'IA", description: "Impossible de générer un prix." });
        } finally {
            setIsGeneratingQuote(false);
        }
    }
    
    const prepareAndDownloadPdf = () => {
        if (!generatedQuote) return;
        setPdfLoading(true);
    };

    useEffect(() => {
        const generatePdf = async () => {
            if (!pdfLoading || !pdfRef.current || !generatedQuote) return;

            const input = pdfRef.current;
            try {
                const canvas = await html2canvas(input, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`devis-${params.quoteId}.pdf`);

                toast({ title: "PDF téléchargé", description: "Le devis a été téléchargé avec succès." });
            } catch (error) {
                toast({ variant: "destructive", title: "Erreur PDF", description: "Impossible de générer le document." });
            } finally {
                setPdfLoading(false);
            }
        };

        generatePdf();
    }, [pdfLoading, generatedQuote, params.quoteId, toast]);


    async function onSubmit(values: QuoteRequestFormData) {
        if (!quote) return;
        setFormValues(values); // Keep local form state for PDF generation
        setIsSaving(true);
        try {
            const updatedData = {
                ...values,
                moveDate: values.moveDate.toISOString(),
                quote: generatedQuote || quote.quote,
            };
            await updateQuote(quote.id, updatedData);
            toast({ title: "Devis sauvegardé", description: "Les modifications ont été enregistrées." });
            router.push('/dashboard/quotes');
        } catch (error) {
            toast({ variant: "destructive", title: "Erreur", description: "Impossible de sauvegarder les modifications." });
        } finally {
            setIsSaving(false);
        }
    }

    if (loading) {
        return <div className="space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
        </div>
    }

    return (
        <div className="flex flex-col gap-6">
            {pdfLoading && generatedQuote && formValues && (
                <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
                    <div ref={pdfRef} className="w-[210mm]">
                       <QuotePDF data={formValues} quote={generatedQuote} />
                    </div>
                </div>
            )}
            <div>
                 <Button variant="link" className="p-0 mb-2" asChild><Link href="/dashboard/quotes">&larr; Retour à la liste des devis</Link></Button>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Détails du devis</h1>
                <p className="text-muted-foreground">ID: {quote?.id}</p>
            </div>

            {formValues && (
                 <QuoteForm 
                    initialData={formValues}
                    onSubmit={onSubmit}
                    submitButtonText="Enregistrer les modifications"
                    isSaving={isSaving}
                 />
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Génération du Devis</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                    <Button type="button" onClick={() => formValues && handleGenerateQuote(formValues)} disabled={isGeneratingQuote || !formValues} size="lg">
                        {isGeneratingQuote ? <Loader2 className="mr-2 animate-spin"/> : <Wand2 className="mr-2"/>}
                        Générer/Mettre à jour le prix (IA)
                    </Button>
                    {generatedQuote !== null && (
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-lg">Montant du devis : <span className="font-bold text-2xl text-primary">{generatedQuote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span></p>
                        </div>
                    )}
                </CardContent>
                {generatedQuote !== null && (
                    <CardFooter>
                        <Button type="button" onClick={prepareAndDownloadPdf} variant="secondary" disabled={pdfLoading}>
                                {pdfLoading ? <Loader2 className="mr-2 animate-spin"/> : <FileText className="mr-2"/>}
                            Télécharger le Devis en PDF
                        </Button>
                    </CardFooter>
                )}
            </Card>

        </div>
    )
}
