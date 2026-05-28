"use client";

import { useEffect, useState, useRef, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { Loader2, Wand2, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getQuoteById, updateQuote } from "@/services/quoteService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { generateQuote, type QuoteInput } from "@/ai/flows/quote-generation-flow";
import html2canvas from "html2canvas";
import { QuotePDF } from "@/components/quote-pdf";
import { QuoteForm } from "@/components/quote-form";
import type { Quote, QuoteRequestFormData } from "@/types/quote";

export default function QuoteDetailsPage({
  params,
}: {
  params: Promise<{ quoteId: string }>;
}) {
  const resolvedParams = use(params);
  const quoteId = resolvedParams.quoteId;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<number | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const router = useRouter();

  const [formValues, setFormValues] = useState<QuoteRequestFormData | undefined>(undefined);

  useEffect(() => {
    if (!quoteId) return;

    getQuoteById(quoteId)
      .then((data) => {
        if (!data) {
          toast({ variant: "destructive", title: "Devis introuvable" });
          notFound();
          return;
        }

        setQuote(data);
        setFormValues({
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientPhone: data.clientPhone,
          originAddress: data.originAddress,
          destinationAddress: data.destinationAddress,
          moveDate: data.moveDate || undefined,
          volume: data.volume,
          distance: data.distance,
          serviceType: data.serviceType,
          details: data.details,
        });

        if (data.quote) {
          setGeneratedQuote(data.quote);
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger le devis.",
        });
      })
      .finally(() => setLoading(false));
  }, [quoteId, toast]);

  const handleGenerateQuote = async (currentFormValues: QuoteRequestFormData) => {
    if (
      !currentFormValues.distance ||
      !currentFormValues.volume ||
      !currentFormValues.serviceType
    ) {
      toast({
        variant: "destructive",
        title: "Données manquantes",
        description: "Veuillez renseigner la distance, le volume et la formule.",
      });
      return;
    }

    const normalizedServiceType: QuoteInput["serviceType"] =
      currentFormValues.serviceType === "eco" ||
      currentFormValues.serviceType === "standard" ||
      currentFormValues.serviceType === "basic"
        ? "basic"
        : currentFormValues.serviceType === "comfort" ||
          currentFormValues.serviceType === "full"
        ? "full"
        : "premium";

    const quoteInput: QuoteInput = {
      distance: currentFormValues.distance,
      volume: currentFormValues.volume,
      serviceType: normalizedServiceType,
      details: currentFormValues.details,
    };

    setIsGeneratingQuote(true);
    try {
      const result = await generateQuote(quoteInput);
      setGeneratedQuote(result.price);
      toast({
        title: "Devis généré",
        description: `Le montant est de ${result.price} €.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur de l'IA",
        description: "Impossible de générer un prix.",
      });
    } finally {
      setIsGeneratingQuote(false);
    }
  };

  const prepareAndDownloadPdf = () => {
    if (!generatedQuote || !formValues) return;
    setPdfLoading(true);
  };

  useEffect(() => {
    if (!pdfLoading || !generatedQuote || !formValues) return;

    const run = async () => {
      try {
        await new Promise((resolve) => window.setTimeout(resolve, 250));

        const input = pdfRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png");

        const jspdfModule = await import("jspdf");
        const JsPdfCtor = jspdfModule.jsPDF || jspdfModule.default;

        const pdf = new JsPdfCtor({
          orientation: "p",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 0;

        const usableWidth = pageWidth - margin * 2;
        const usableHeight = pageHeight - margin * 2;

        const imgWidth = usableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= usableHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(
            imgData,
            "PNG",
            margin,
            position,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          heightLeft -= usableHeight;
        }

        pdf.save(`devis-${quoteId}.pdf`);

        toast({
          title: "PDF téléchargé",
          description: "Le devis a été téléchargé avec succès.",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Erreur PDF",
          description: "Impossible de générer le document.",
        });
      } finally {
        setPdfLoading(false);
      }
    };

    void run();
  }, [pdfLoading, generatedQuote, quoteId, toast, formValues]);

  async function onSubmit(values: QuoteRequestFormData) {
    if (!quote) return;

    setFormValues(values);
    setIsSaving(true);

    try {
      const updatedData = {
        ...values,
        moveDate: values.moveDate || quote.moveDate,
        quote: generatedQuote || quote.quote,
        volume: values.volume || 0,
        distance: values.distance || 0,
        serviceType: values.serviceType || "basic",
      };

      await updateQuote(quote.id, updatedData);

      toast({
        title: "Devis sauvegardé",
        description: "Les modifications ont été enregistrées.",
      });

      router.push("/dashboard/quotes");
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {pdfLoading && generatedQuote && formValues && (
        <div className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0">
          <div ref={pdfRef} className="bg-white">
            <QuotePDF
              data={{
                ...formValues,
                moveDate: formValues.moveDate || undefined,
              }}
              quote={generatedQuote}
            />
          </div>
        </div>
      )}

      <div>
        <Button variant="link" className="mb-2 p-0" asChild>
          <Link href="/dashboard/quotes">&larr; Retour à la liste des devis</Link>
        </Button>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Détails du devis
        </h1>
        <p className="text-muted-foreground">ID: {quote?.id}</p>
      </div>

      {formValues && (
        <QuoteForm
          initialData={formValues}
          onSubmit={onSubmit}
          submitButtonText="Enregistrer les modifications"
          isSaving={isSaving}
          isDashboard
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Génération du devis</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            type="button"
            onClick={() => formValues && handleGenerateQuote(formValues)}
            disabled={isGeneratingQuote || !formValues}
            size="lg"
          >
            {isGeneratingQuote ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <Wand2 className="mr-2" />
            )}
            Générer / Mettre à jour le prix (IA)
          </Button>

          {generatedQuote !== null && (
            <div className="flex-1 text-center sm:text-left">
              <p className="text-lg">
                Montant du devis :{" "}
                <span className="text-2xl font-bold text-primary">
                  {generatedQuote.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
              </p>
            </div>
          )}
        </CardContent>

        {generatedQuote !== null && (
          <CardFooter>
            <Button
              type="button"
              onClick={prepareAndDownloadPdf}
              variant="secondary"
              disabled={pdfLoading}
            >
              {pdfLoading ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <FileText className="mr-2" />
              )}
              Télécharger le devis en PDF
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
