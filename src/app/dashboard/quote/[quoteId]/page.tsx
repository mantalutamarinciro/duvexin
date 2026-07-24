"use client";

import { useEffect, useState, useRef, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { Loader2, Wand2, FileText, Euro, MapPin, Package, Settings, Save, CheckCircle2, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getQuoteById, updateQuote, sendQuoteByEmail } from "@/services/quoteService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { generateQuote, type QuoteInput } from "@/ai/flows/quote-generation-flow";
import html2canvas from "html2canvas";
import { QuotePDF } from "@/components/quote-pdf";
import { DeclarationPDF } from "@/components/declaration-pdf";
import { QuoteForm } from "@/components/quote-form";
import type { Quote, QuoteRequestFormData } from "@/types/quote";
import { serviceTypeLabels } from "@/lib/quote-constants";

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
  
  // This state holds the manual/AI price
  const [generatedQuote, setGeneratedQuote] = useState<number | "">(""); 
  
  const [pdfLoading, setPdfLoading] = useState(false);
  const [declarationPdfLoading, setDeclarationPdfLoading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);
  const declarationPdfRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();
  const router = useRouter();

  // Maintient un état synchronisé avec le QuoteForm
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

        if (data.quote !== undefined && data.quote !== null) {
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

  const handleGenerateQuote = async () => {
    if (!formValues) return;
      
    if (
      !formValues.distance ||
      !formValues.volume ||
      !formValues.serviceType
    ) {
      toast({
        variant: "destructive",
        title: "Données manquantes",
        description: "Veuillez renseigner la distance, le volume et la formule dans le formulaire à gauche (et sauvegarder).",
      });
      return;
    }

    const normalizedServiceType: QuoteInput["serviceType"] =
      formValues.serviceType === "eco" ||
      formValues.serviceType === "standard" ||
      formValues.serviceType === "basic"
        ? "basic"
        : formValues.serviceType === "comfort" ||
          formValues.serviceType === "full"
        ? "full"
        : "premium";

    const quoteInput: QuoteInput = {
      distance: formValues.distance,
      volume: formValues.volume,
      serviceType: normalizedServiceType,
      details: formValues.details,
    };

    setIsGeneratingQuote(true);
    try {
      const result = await generateQuote(quoteInput);
      setGeneratedQuote(result.price);
      toast({
        title: "Tarif généré par l'IA ✨",
        description: `Le montant estimé est de ${result.price} €.`,
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

  const generatePdfBlob = async () => {
    if (!pdfRef.current) throw new Error("Élément PDF introuvable.");

    const canvas = await html2canvas(pdfRef.current, {
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

    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= usableHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= usableHeight;
    }

    return pdf;
  };

  const prepareAndDownloadPdf = async () => {
    if (generatedQuote === "" || !formValues) return;
    setPdfLoading(true);
    try {
      const pdf = await generatePdfBlob();
      const safeClientName = formValues.clientName?.replace(/\s+/g, "-").toLowerCase() || "client";
      pdf.save(`devis-${safeClientName}.pdf`);
      toast({
        title: "Devis généré 📄",
        description: "Le document PDF a été téléchargé avec succès.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de générer le PDF.",
      });
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!formValues) return;
    setSendingEmail(true);
    try {
      const pdf = await generatePdfBlob();
      const base64Pdf = pdf.output("datauristring");
      await sendQuoteByEmail(quoteId, base64Pdf);

      toast({
        title: "Devis envoyé 🚀",
        description: `Le devis a bien été envoyé par email à ${formValues.clientEmail}.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error.message || "Impossible d'envoyer l'email.",
      });
    } finally {
      setSendingEmail(false);
    }
  };


  const prepareAndDownloadDeclarationPdf = () => {
    if (!formValues) return;
    setDeclarationPdfLoading(true);
  };

  useEffect(() => {
    if (!declarationPdfLoading || !formValues) return;

    const run = async () => {
      try {
        await new Promise((resolve) => window.setTimeout(resolve, 250));

        const input = declarationPdfRef.current;
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

        pdf.addImage(
          imgData,
          "PNG",
          margin,
          margin,
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );

        pdf.save(`declaration_valeur_${quoteId}.pdf`);

        toast({
          title: "Déclaration téléchargée",
          description: "La déclaration de valeur a été téléchargée.",
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Erreur PDF",
          description: "Impossible de générer la déclaration.",
        });
      } finally {
        setDeclarationPdfLoading(false);
      }
    };

    void run();
  }, [declarationPdfLoading, quoteId, toast, formValues]);

  const handleSaveInternal = async (values: QuoteRequestFormData, currentPrice: number | "") => {
    if(!quote) return;
    setIsSaving(true);

    try {
      const updatedData = {
        ...values,
        moveDate: values.moveDate || quote.moveDate,
        quote: currentPrice !== "" ? Number(currentPrice) : 0,
        volume: values.volume || 0,
        distance: values.distance || 0,
        serviceType: values.serviceType || "basic",
      };

      await updateQuote(quote.id, updatedData);

      toast({
        title: "Devis sauvegardé",
        description: "Les modifications ont été enregistrées.",
      });

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

  async function onSubmit(values: QuoteRequestFormData) {
    setFormValues(values);
    await handleSaveInternal(values, generatedQuote);
  }

  const handleDirectSave = () => {
     if(formValues) {
        handleSaveInternal(formValues, generatedQuote);
     }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-64 w-full rounded-[2.5rem]" />
            <Skeleton className="h-64 w-full rounded-[2.5rem]" />
        </div>
        <div className="w-full lg:w-[420px]">
             <Skeleton className="h-[500px] w-full rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* We keep the declaration PDF reference here since it still uses html2canvas */}
      {declarationPdfLoading && generatedQuote !== "" && formValues && (
        <div className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0">
          <div ref={declarationPdfRef} className="bg-white">
            <DeclarationPDF
              data={{
                ...formValues,
                moveDate: formValues.moveDate || undefined,
              }}
            />
          </div>
        </div>
      )}

      {/* Main Column: Quote Form */}
      <div className="flex-1 space-y-6">
        <div>
          <Button variant="link" className="mb-2 p-0 text-slate-500 hover:text-primary transition-colors" asChild>
            <Link href="/dashboard/quotes">&larr; Retour à la liste des devis</Link>
          </Button>
          <div className="flex items-center justify-between">
              <div>
                  <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                      <FileText className="h-8 w-8 text-primary" /> Édition du Devis
                  </h1>
                  <p className="text-sm font-medium text-slate-400 mt-2 uppercase tracking-widest flex items-center gap-2">
                      Réf Dossier: <span className="font-mono font-bold bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-300 shadow-sm">{quoteId?.substring(0,8)}</span>
                  </p>
              </div>
          </div>
        </div>

        {formValues && (
          <QuoteForm
              initialData={formValues}
              onSubmit={onSubmit}
              submitButtonText="Mettre à jour les infos du client"
              isSaving={isSaving}
              isDashboard
          />
        )}
      </div>

      {/* Right Column: Pricing Sidebar */}
      <div className="w-full lg:w-[420px]">
         <div className="sticky top-8 space-y-6">
            <Card className="rounded-[2.5rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900 overflow-hidden relative group">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/20" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-blue-500/20" />

                <CardHeader className="pb-4 relative z-10">
                    <CardTitle className="flex items-center gap-2 text-2xl font-black">
                        <Euro className="h-6 w-6 text-primary" /> Tarification
                    </CardTitle>
                    <CardDescription className="font-medium">Estimez ou définissez le prix final de la prestation</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 relative z-10">
                    {/* Summary of move for context */}
                    {formValues && (
                        <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="flex flex-col items-center justify-center p-2 text-center">
                                <MapPin className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{formValues.distance} km</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 text-center border-l border-r border-slate-200 dark:border-slate-700">
                                <Package className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{formValues.volume} m³</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-2 text-center">
                                <Settings className="h-4 w-4 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-primary uppercase truncate w-full">{serviceTypeLabels[formValues.serviceType || 'basic']}</span>
                            </div>
                        </div>
                    )}

                    {/* AI Button */}
                    <div className="pt-2">
                        <Button
                            type="button"
                            onClick={handleGenerateQuote}
                            disabled={isGeneratingQuote || !formValues}
                            size="lg"
                            className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isGeneratingQuote ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Wand2 className="mr-2 h-5 w-5" />
                            )}
                            Calcul Magique IA
                        </Button>
                    </div>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-bold uppercase text-slate-400 tracking-wider">Saisie Manuelle</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>

                    {/* Manual Price Input */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                            Montant total (TTC)
                            {generatedQuote !== "" && generatedQuote > 0 && (
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md flex items-center gap-1 ml-auto">
                                    <CheckCircle2 className="h-3 w-3" /> Validé
                                </span>
                            )}
                        </label>
                        <div className="relative group">
                            <Input 
                                type="number" 
                                value={generatedQuote}
                                onChange={(e) => setGeneratedQuote(e.target.value === "" ? "" : Number(e.target.value))}
                                className="h-20 text-4xl font-black text-center pr-12 rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus-visible:ring-primary focus-visible:border-primary shadow-inner bg-slate-50 dark:bg-slate-900/50 transition-all group-hover:border-slate-200"
                                placeholder="0"
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">
                                €
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-3 pb-8 relative z-10 bg-slate-50/50 dark:bg-slate-800/20 pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <Button
                        onClick={handleDirectSave}
                        disabled={isSaving || generatedQuote === ""}
                        size="lg"
                        className="w-full h-14 rounded-2xl font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-0.5"
                    >
                        {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <Save className="mr-2 h-5 w-5"/>}
                        Enregistrer le Devis final
                    </Button>

                    <Button
                        type="button"
                        onClick={prepareAndDownloadPdf}
                        variant="outline"
                        size="lg"
                        disabled={pdfLoading || generatedQuote === "" || sendingEmail}
                        className="w-full h-14 rounded-2xl font-bold border-2 border-slate-200 hover:bg-white dark:border-slate-700 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all hover:shadow-md"
                    >
                        {pdfLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <FileText className="mr-2 h-5 w-5 text-slate-400" />
                        )}
                        Télécharger Devis PDF
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSendEmail}
                        variant="default"
                        size="lg"
                        disabled={pdfLoading || generatedQuote === "" || sendingEmail}
                        className="w-full h-14 rounded-2xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                    >
                        {sendingEmail ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <Send className="mr-2 h-5 w-5" />
                        )}
                        Envoyer au client
                    </Button>

                    <Button
                        type="button"
                        onClick={prepareAndDownloadDeclarationPdf}
                        variant="ghost"
                        size="lg"
                        disabled={declarationPdfLoading}
                        className="w-full h-14 rounded-2xl font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                        {declarationPdfLoading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            <FileText className="mr-2 h-5 w-5" />
                        )}
                        Déclaration de valeur vierge
                    </Button>
                </CardFooter>
            </Card>
          </div>
       </div>

      {formValues && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div ref={pdfRef}>
            <QuotePDF data={formValues} quote={Number(generatedQuote) || 0} />
          </div>
        </div>
      )}

    </div>
  );
}
