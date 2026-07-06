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
  Receipt,
  UserRound,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight
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
  sendQuoteByEmail,
} from "@/services/quoteService";
import { createBookingFromQuote } from "@/services/bookingService";
import { createInvoice } from "@/services/invoiceService";
import type { Quote, QuoteStatus } from "@/types/quote";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { QuotePDF } from "@/components/quote-pdf";

const normalizeQuoteStatus = (status?: string) => {
  const value = (status || '').toLowerCase();
  if (value === 'pending' || value.includes('attente')) return 'pending';
  if (value.includes('chiffr')) return 'priced';
  if (value.includes('envoy')) return 'sent';
  if (value.includes('accept')) return 'accepted';
  if (value.includes('refus')) return 'refused';
  if (value.includes('factur')) return 'invoiced';
  if (value.includes('converti')) return 'converted';
  if (value.includes('archiv')) return 'archived';
  return 'other';
};

const getDisplayStatus = (status?: string) => {
  switch (normalizeQuoteStatus(status)) {
    case 'pending': return 'En attente';
    case 'priced': return 'Chiffre';
    case 'sent': return 'Envoye';
    case 'accepted': return 'Accepte';
    case 'refused': return 'Refuse';
    case 'invoiced': return 'Facture';
    case 'converted': return 'Converti';
    case 'archived': return 'Archive';
    default: return status || 'Non renseigne';
  }
};

const getBadgeVariant = (status: Quote["status"]) => {
  switch (normalizeQuoteStatus(status)) {
    case 'priced': return 'secondary';
    case 'sent': return 'default';
    case 'pending': return 'outline';
    case 'accepted': return 'default';
    case 'refused': return 'destructive';
    case 'invoiced': return 'outline';
    case 'converted': return 'default';
    default: return 'secondary';
  }
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);
  const [selectedQuoteForPdf, setSelectedQuoteForPdf] = useState<Quote | null>(null);
  const [sendingQuoteId, setSendingQuoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const blobToDataUrl = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleSendQuote = async (quote: Quote) => {
    if (!quote.clientEmail?.trim()) {
      toast({
        variant: "destructive",
        title: "Email client manquant",
        description: "Ajoutez une adresse email client avant d'envoyer le devis.",
      });
      return;
    }

    if (!quote.quote || quote.quote <= 0) {
      toast({
        variant: "destructive",
        title: "Devis non chiffré",
        description: "Ajoutez un montant au devis avant de l'envoyer.",
      });
      return;
    }

    setSendingQuoteId(quote.id);
    toast({
      title: "Envoi en cours...",
      description: `Génération du PDF puis envoi à ${quote.clientEmail}.`,
    });

    try {
      const res = await fetch(`/api/pdf?type=quote&id=${quote.id}`);
      if (!res.ok) throw new Error("Impossible de générer le PDF du devis.");

      const base64Pdf = await blobToDataUrl(await res.blob());
      await sendQuoteByEmail(quote.id, base64Pdf);

      toast({
        title: "Devis envoyé",
        description: `Le devis a été envoyé à ${quote.clientEmail}.`,
      });
      await loadQuotes();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'envoi",
        description: error?.message || "Impossible d'envoyer le devis par email.",
      });
    } finally {
      setSendingQuoteId(null);
    }
  };
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

  const hasActiveFilters = Boolean(searchQuery || statusFilter !== "all" || periodFilter !== "all" || amountFilter !== "all" || pricingFilter !== "all");

  const filteredQuotes = quotes.filter((quote) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || quote.clientName.toLowerCase().includes(query) || quote.clientEmail.toLowerCase().includes(query) || (quote.clientPhone && quote.clientPhone.toLowerCase().includes(query)) || quote.originAddress.toLowerCase().includes(query) || quote.destinationAddress.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || normalizeQuoteStatus(quote.status) === statusFilter;
    const createdAt = new Date(quote.createdAt);
    const ageInDays = Number.isNaN(createdAt.getTime()) ? Number.POSITIVE_INFINITY : (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const matchesPeriod = periodFilter === "all" || (periodFilter === "today" && ageInDays <= 1) || (periodFilter === "7d" && ageInDays <= 7) || (periodFilter === "30d" && ageInDays <= 30) || (periodFilter === "90d" && ageInDays <= 90);
    const amount = Number(quote.quote || 0);
    const matchesAmount = amountFilter === "all" || (amountFilter === "low" && amount > 0 && amount < 1000) || (amountFilter === "medium" && amount >= 1000 && amount < 3000) || (amountFilter === "high" && amount >= 3000);
    const matchesPricing = pricingFilter === "all" || (pricingFilter === "priced" && amount > 0) || (pricingFilter === "unpriced" && amount === 0);
    return matchesSearch && matchesStatus && matchesPeriod && matchesAmount && matchesPricing;
  });

  const totalPages = Math.max(1, Math.ceil(filteredQuotes.length / itemsPerPage));
  const paginatedQuotes = filteredQuotes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalFilteredAmount = filteredQuotes.reduce((sum, quote) => sum + Number(quote.quote || 0), 0);
  const acceptedQuotes = filteredQuotes.filter((quote) => normalizeQuoteStatus(quote.status) === "accepted").length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, periodFilter, amountFilter, pricingFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPeriodFilter("all");
    setAmountFilter("all");
    setPricingFilter("all");
  };

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

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion des Devis</h1>
          <p className="mt-1 text-sm text-muted-foreground">Filtrez les devis par statut, montant, date et niveau de chiffrage.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Rechercher client, email, ville..." className="pl-9 rounded-full bg-white dark:bg-slate-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <Button asChild className="rounded-full bg-primary shadow-lg shadow-primary/20"><Link href="/dashboard/quote"><PlusCircle className="mr-2 h-4 w-4" />Nouveau devis</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="border-none shadow-sm"><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Devis affiches</p><p className="mt-1 text-2xl font-black">{filteredQuotes.length}</p></div><FileText className="h-8 w-8 text-primary" /></CardContent></Card>
        <Card className="border-none shadow-sm"><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Acceptes</p><p className="mt-1 text-2xl font-black">{acceptedQuotes}</p></div><CheckCircle className="h-8 w-8 text-emerald-500" /></CardContent></Card>
        <Card className="border-none shadow-sm"><CardContent className="flex items-center justify-between p-4"><div><p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Montant filtre</p><p className="mt-1 text-2xl font-black">{totalFilteredAmount.toLocaleString("fr-FR")} EUR</p></div><Receipt className="h-8 w-8 text-amber-500" /></CardContent></Card>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:flex-row xl:items-center">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 xl:w-24"><SlidersHorizontal className="h-4 w-4" /> Filtres</div>
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Statut" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les statuts</SelectItem><SelectItem value="pending">En attente</SelectItem><SelectItem value="priced">Chiffre</SelectItem><SelectItem value="sent">Envoye</SelectItem><SelectItem value="accepted">Accepte</SelectItem><SelectItem value="refused">Refuse</SelectItem><SelectItem value="invoiced">Facture</SelectItem><SelectItem value="archived">Archive</SelectItem></SelectContent></Select>
          <Select value={periodFilter} onValueChange={setPeriodFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Periode" /></SelectTrigger><SelectContent><SelectItem value="all">Toutes les periodes</SelectItem><SelectItem value="today">Aujourd'hui</SelectItem><SelectItem value="7d">7 derniers jours</SelectItem><SelectItem value="30d">30 derniers jours</SelectItem><SelectItem value="90d">90 derniers jours</SelectItem></SelectContent></Select>
          <Select value={amountFilter} onValueChange={setAmountFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Montant" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les montants</SelectItem><SelectItem value="low">Moins de 1 000 EUR</SelectItem><SelectItem value="medium">1 000 a 2 999 EUR</SelectItem><SelectItem value="high">3 000 EUR et plus</SelectItem></SelectContent></Select>
          <Select value={pricingFilter} onValueChange={setPricingFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Chiffrage" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les chiffrages</SelectItem><SelectItem value="priced">Chiffres</SelectItem><SelectItem value="unpriced">Non chiffres</SelectItem></SelectContent></Select>
        </div>
        <div className="flex items-center justify-between gap-3 xl:justify-end"><span className="text-xs font-semibold text-slate-500">{filteredQuotes.length} / {quotes.length}</span>{hasActiveFilters && (<Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-full text-slate-500"><X className="mr-2 h-4 w-4" /> Reinitialiser</Button>)}</div>
      </div>

      <Card className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
        <CardHeader>
          <CardTitle>Liste des devis</CardTitle>
          <CardDescription>
            Editez, envoyez et relancez vos devis. Convertissez les devis acceptes en factures et demenagements.
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
              ) : paginatedQuotes.length > 0 ? (
                paginatedQuotes.map((quote) => (
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
                          Non chiffre
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={getBadgeVariant(quote.status)}
                        className={`text-[10px] font-black uppercase tracking-widest ${normalizeQuoteStatus(quote.status) === 'accepted' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' : ''}`}
                      >
                        {getDisplayStatus(quote.status)}
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

                          <DropdownMenuItem asChild className="rounded-xl">
                            <Link href={`/dashboard/customer-360?email=${encodeURIComponent(quote.clientEmail)}`}>
                              <UserRound className="mr-2 h-4 w-4 text-primary" />
                              <span>Dossier 360</span>
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
                    Aucun devis trouve.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!loading && filteredQuotes.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>Affichage de <span className="font-semibold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-semibold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredQuotes.length)}</span> sur <span className="font-semibold text-slate-900 dark:text-white">{filteredQuotes.length}</span> devis</div>
              <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="rounded-full"><ChevronLeft className="mr-1 h-4 w-4" /> Precedent</Button><span className="text-xs font-semibold text-slate-500">Page {currentPage} / {totalPages}</span><Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full">Suivant <ChevronRight className="ml-1 h-4 w-4" /></Button></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
