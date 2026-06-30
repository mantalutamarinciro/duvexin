"use client";

import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  PlusCircle,
  CheckCircle,
  XCircle,
  FileEdit,
  Trash2,
  CalendarDays,
  FileText,
  Loader2,
  Send,
  RefreshCcw,
  Receipt
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getQuotes,
  updateQuoteStatus,
  deleteQuote,
  getQuoteById,
} from "@/services/quoteService";
import { createBookingFromQuote } from "@/services/bookingService";
import { createInvoice } from "@/services/invoiceService";
import type { Quote, QuoteStatus } from "@/types/quote";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { QuotePDF } from "@/components/quote-pdf";

const getBadgeVariant = (status: Quote["status"]) => {
  switch (status) {
    case "Chiffré":
      return "secondary";
    case "Envoyé":
      return "default";
    case "En attente":
      return "outline";
    case "Accepté":
      return "default"; // emerald color could be added via className
    case "Refusé":
      return "destructive";
    case "Facturé":
      return "outline";
    case "Converti":
      return "default";
    default:
      return "secondary";
  }
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);
  const [selectedQuoteForPdf, setSelectedQuoteForPdf] = useState<Quote | null>(null);

  const { toast } = useToast();
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);

  const loadQuotes = async () => {
    try {
      setLoading(true);
      const fetchedQuotes = await getQuotes();
      setQuotes(fetchedQuotes);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger la liste des devis.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadQuotes();
  }, []);

  const handleUpdateStatus = async (quote: Quote, status: QuoteStatus) => {
    try {
      await updateQuoteStatus(quote.id, status);

      if (status === "Accepté") {
          // Création automatique de la facture en brouillon
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + 30);
          await createInvoice({
              quoteId: quote.id,
              clientName: quote.clientName,
              amountTTC: quote.quote,
              dueDate: dueDate.toISOString()
          });

          // Création automatique du déménagement (booking)
          await createBookingFromQuote(quote);
      }

      toast({
        title: "Statut mis à jour",
        description: `Le devis a été marqué comme "${status}"${status === 'Accepté' ? ' et les éléments (facture, déménagement) ont été générés.' : '.'}`,
      });
      await loadQuotes();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut du devis.",
      });
    }
  };

  const handleSendQuote = async (quote: Quote) => {
      // Simulation of email sending
      toast({
        title: "Envoi en cours...",
        description: "Le devis est en cours d'envoi au client.",
      });
      setTimeout(() => {
          handleUpdateStatus(quote, "Envoyé");
      }, 1500);
  }

  const handleFollowUpQuote = async (quote: Quote) => {
    toast({
        title: "Relance envoyée",
        description: "Un email de relance a été envoyé au client.",
    });
    handleUpdateStatus(quote, "En attente");
  }

  const handleConvertToInvoice = (quote: Quote) => {
    // Navigate to invoices page to generate invoice
    sessionStorage.setItem('prefillInvoice', JSON.stringify({
        quoteId: quote.id,
        clientName: quote.clientName,
        amount: quote.quote
    }));
    router.push("/dashboard/invoices?action=new");
  };

  const handleConvertToBooking = async (quote: Quote) => {
    try {
        await createBookingFromQuote(quote);
        toast({ title: "Déménagement planifié", description: "Le devis a été converti en déménagement." });
        router.push("/dashboard/planning");
    } catch (e) {
        toast({ variant: 'destructive', title: "Erreur", description: "Impossible de créer le déménagement." });
    }
  };

  const handleDeleteQuote = async (id: string) => {
    try {
      await deleteQuote(id);
      toast({
        title: "Devis supprimé",
        description: "Le devis a été supprimé.",
      });
      await loadQuotes();
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le devis.",
      });
    }
  };

  const prepareAndDownloadPdf = async (quoteId: string) => {
    setPdfLoading(quoteId);

    try {
      const quoteDetails = await getQuoteById(quoteId);

      if (quoteDetails && quoteDetails.quote > 0) {
        setSelectedQuoteForPdf(quoteDetails);
      } else {
        throw new Error("Ce devis n'est pas encore chiffré.");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Action requise",
        description: error?.message || "Veuillez d'abord chiffrer ce devis.",
      });
      setPdfLoading(null);
    }
  };

  const generatePdf = async () => {
    if (!selectedQuoteForPdf || !pdfRef.current) return;

    try {
      const input = pdfRef.current;

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

      const safeClientName =
        selectedQuoteForPdf.clientName?.replace(/\s+/g, "-").toLowerCase() || "client";

      pdf.save(`devis-${safeClientName}.pdf`);

      toast({
        title: "Devis généré",
        description: "Le document PDF a été téléchargé.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur PDF",
        description: "Impossible de générer le document.",
      });
    } finally {
      setPdfLoading(null);
      setSelectedQuoteForPdf(null);
    }
  };

  useEffect(() => {
    if (!selectedQuoteForPdf) return;

    const timer = window.setTimeout(() => {
      void generatePdf();
    }, 250);

    return () => window.clearTimeout(timer);
  }, [selectedQuoteForPdf]);

  return (
    <div className="flex flex-col gap-6">
      {selectedQuoteForPdf && (
        <div className="pointer-events-none fixed left-0 top-0 -z-10 opacity-0">
          <div ref={pdfRef} className="bg-white">
            <QuotePDF
              data={{
                ...selectedQuoteForPdf,
                moveDate: selectedQuoteForPdf.moveDate || undefined,
              }}
              quote={selectedQuoteForPdf.quote}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Gestion des Devis
        </h1>
        <Button asChild className="rounded-full bg-primary shadow-lg shadow-primary/20">
          <Link href="/dashboard/quote">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau devis
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
        <CardHeader>
          <CardTitle>Liste des Devis</CardTitle>
          <CardDescription>
            Éditez, envoyez et relancez vos devis. Convertissez les devis acceptés en factures et déménagements.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date / Client</TableHead>
                <TableHead>Date du projet</TableHead>
                <TableHead>Montant TTC</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="ml-auto h-8 w-8" /></TableCell>
                  </TableRow>
                ))
              ) : quotes.length > 0 ? (
                quotes.map((quote) => (
                  <TableRow
                    key={quote.id}
                    onClick={() => router.push(`/dashboard/quote/${quote.id}`)}
                    className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                  >
                    <TableCell>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {quote.clientName}
                      </div>
                      <div className="text-[10px] font-normal uppercase tracking-wider text-slate-400">
                        {quote.createdAt ? format(new Date(quote.createdAt), "d MMM yyyy", { locale: fr }) : "-"}
                      </div>
                    </TableCell>

                    <TableCell className="text-xs">
                      {quote.moveDate
                        ? format(new Date(quote.moveDate), "d MMMM yyyy", { locale: fr })
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {quote.quote > 0 ? (
                        <span className="font-black text-slate-900 dark:text-white">
                          {quote.quote.toLocaleString("fr-FR", {
                            style: "currency",
                            currency: "EUR",
                          })}
                        </span>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="border-amber-100 bg-amber-50 text-amber-700"
                        >
                          Non chiffré
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getBadgeVariant(quote.status)}
                        className={`text-[10px] font-black uppercase tracking-widest ${quote.status === 'Accepté' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' : ''}`}
                      >
                        {quote.status.toLowerCase() === 'pending' ? 'En attente' : quote.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                          <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-slate-400">
                            Pilotage commercial
                          </DropdownMenuLabel>

                          <DropdownMenuItem asChild className="rounded-xl">
                            <Link href={`/dashboard/quote/${quote.id}`}>
                              <FileEdit className="mr-2 h-4 w-4 text-blue-500" />
                              <span>Modifier / Chiffrer</span>
                            </Link>
                          </DropdownMenuItem>

                          {quote.quote > 0 && (
                            <>
                                <DropdownMenuItem
                                onClick={() => prepareAndDownloadPdf(quote.id)}
                                disabled={pdfLoading === quote.id}
                                className="rounded-xl"
                                >
                                {pdfLoading === quote.id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <FileText className="mr-2 h-4 w-4 text-emerald-600" />
                                )}
                                <span>Générer le PDF</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="mx-2" />

                                <DropdownMenuItem onClick={() => handleSendQuote(quote)} className="rounded-xl font-medium text-slate-700 dark:text-slate-300">
                                    <Send className="mr-2 h-4 w-4 text-blue-500" /> Envoyer
                                </DropdownMenuItem>

                                {(quote.status === "Envoyé" || quote.status === "En attente") && (
                                    <DropdownMenuItem onClick={() => handleFollowUpQuote(quote)} className="rounded-xl font-medium text-slate-700 dark:text-slate-300">
                                        <RefreshCcw className="mr-2 h-4 w-4 text-amber-500" /> Relancer
                                    </DropdownMenuItem>
                                )}
                            </>
                          )}

                          <DropdownMenuSeparator className="mx-2" />

                          {(quote.status === "Envoyé" || quote.status === "En attente" || quote.status === "Chiffré") && quote.quote > 0 && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(quote, "Accepté")}
                                className="rounded-xl"
                              >
                                <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                                Marquer comme Accepté
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() => handleUpdateStatus(quote, "Refusé")}
                                className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Marquer comme Refusé
                              </DropdownMenuItem>
                            </>
                          )}

                          <DropdownMenuSeparator className="mx-2" />

                          {quote.status !== "Archivé" && (
                            <DropdownMenuItem
                              onClick={() => handleUpdateStatus(quote, "Archivé")}
                              className="rounded-xl text-slate-500 hover:text-slate-700"
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Archiver
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            onClick={() => handleDeleteQuote(quote.id)}
                            className="rounded-xl font-bold text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    Aucun devis trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}