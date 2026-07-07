'use client';

import { useEffect, useState, useRef } from "react";
import { format, addDays } from "date-fns";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Invoice, getInvoices, updateInvoicePayment, updateInvoiceStatus, createInvoice, sendInvoiceByEmail } from "@/services/invoiceService";
import { getQuoteById } from "@/services/quoteService";
import { InvoicePDF } from "@/components/invoice-pdf";
import { Receipt, CheckCircle, Loader2, HandCoins, AlertCircle, MoreHorizontal, Download, Send, Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const normalizeInvoiceStatus = (status?: string) => {
  const value = (status || '').toLowerCase();
  if (value.includes('brouillon')) return 'draft';
  if (value.includes('mise') || value.includes('?mise')) return 'issued';
  if (value.includes('partiellement')) return 'partial';
  if (value.includes('pay')) return 'paid';
  if (value.includes('retard')) return 'late';
  return 'other';
};

const getDisplayStatus = (status?: string) => {
  switch (normalizeInvoiceStatus(status)) {
    case 'draft': return 'Brouillon';
    case 'issued': return 'Emise';
    case 'partial': return 'Partiellement payee';
    case 'paid': return 'Payee';
    case 'late': return 'En retard';
    default: return status || 'Non renseigne';
  }
};

const getStatusBadge = (status: Invoice['status']) => {
  switch (normalizeInvoiceStatus(status)) {
    case 'draft': return 'secondary';
    case 'issued': return 'default';
    case 'partial': return 'outline';
    case 'paid': return 'default';
    case 'late': return 'destructive';
    default: return 'outline';
  }
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [selectedInvoiceForPdf, setSelectedInvoiceForPdf] = useState<Invoice | null>(null);
  const [associatedQuoteForPdf, setAssociatedQuoteForPdf] = useState<any | null>(null);
  const [isEmailAction, setIsEmailAction] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dueFilter, setDueFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    if (!selectedInvoiceForPdf || !associatedQuoteForPdf || !pdfRef.current) return;

    const generatePdfAndExecute = async () => {
      try {
        await new Promise((resolve) => window.setTimeout(resolve, 300));

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

        if (isEmailAction) {
          const pdfBase64 = pdf.output("datauristring");
          await sendInvoiceByEmail(selectedInvoiceForPdf.id, pdfBase64);
          toast({
            title: "Facture envoyée",
            description: `La facture a été envoyée par email à ${associatedQuoteForPdf.clientEmail || ''}.`,
          });
        } else {
          const shortRef = selectedInvoiceForPdf.id.substring(0, 5).toUpperCase();
          pdf.save(`FAC-${new Date().getFullYear()}-${shortRef}.pdf`);
          toast({
            title: "Facture téléchargée",
            description: "La facture PDF a été générée et téléchargée.",
          });
        }
      } catch (error: any) {
        console.error("PDF generation failed:", error);
        toast({
          variant: "destructive",
          title: "Erreur PDF",
          description: error?.message || "Impossible de générer le document PDF.",
        });
      } finally {
        setSelectedInvoiceForPdf(null);
        setAssociatedQuoteForPdf(null);
        setDownloadingId(null);
        setEmailingId(null);
      }
    };

    generatePdfAndExecute();
  }, [selectedInvoiceForPdf, associatedQuoteForPdf, isEmailAction]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(data);
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les factures." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Handle new invoice prefill
    const prefillData = sessionStorage.getItem('prefillInvoice');
    if (prefillData) {
        try {
            const parsed = JSON.parse(prefillData);
            handleAutoCreateInvoice(parsed);
            sessionStorage.removeItem('prefillInvoice');
        } catch(e) {}
    }
  }, []);

  const handleAutoCreateInvoice = async (data: any) => {
      try {
          await createInvoice({
              quoteId: data.quoteId,
              clientName: data.clientName,
              amountTTC: data.amount,
              dueDate: addDays(new Date(), 30).toISOString(), // Net 30 default
          });
          toast({ title: "Facture générée", description: "Une nouvelle facture a été créée depuis le devis." });
          loadData();
      } catch (e) {
          toast({ variant: 'destructive', title: "Erreur", description: "Échec de la génération automatique de la facture." });
      }
  }




  const hasActiveFilters = Boolean(
    searchQuery ||
    statusFilter !== "all" ||
    dueFilter !== "all" ||
    amountFilter !== "all" ||
    paymentFilter !== "all"
  );

  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.trim().toLowerCase();
    const remaining = Number(invoice.amountTTC || 0) - Number(invoice.amountPaid || 0);
    const dueDate = new Date(invoice.dueDate);
    const dueInDays = Number.isNaN(dueDate.getTime())
      ? Number.POSITIVE_INFINITY
      : (dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    const matchesSearch = !query ||
      invoice.clientName.toLowerCase().includes(query) ||
      invoice.id.toLowerCase().includes(query) ||
      invoice.quoteId.toLowerCase().includes(query);

    const matchesStatus = statusFilter === "all" || normalizeInvoiceStatus(invoice.status) === statusFilter;

    const matchesDue =
      dueFilter === "all" ||
      (dueFilter === "overdue" && dueInDays < 0 && remaining > 0) ||
      (dueFilter === "7d" && dueInDays >= 0 && dueInDays <= 7) ||
      (dueFilter === "30d" && dueInDays >= 0 && dueInDays <= 30) ||
      (dueFilter === "future" && dueInDays > 30);

    const amount = Number(invoice.amountTTC || 0);
    const matchesAmount =
      amountFilter === "all" ||
      (amountFilter === "low" && amount > 0 && amount < 1000) ||
      (amountFilter === "medium" && amount >= 1000 && amount < 3000) ||
      (amountFilter === "high" && amount >= 3000);

    const matchesPayment =
      paymentFilter === "all" ||
      (paymentFilter === "unpaid" && Number(invoice.amountPaid || 0) === 0) ||
      (paymentFilter === "partial" && Number(invoice.amountPaid || 0) > 0 && remaining > 0) ||
      (paymentFilter === "paid" && remaining <= 0);

    return matchesSearch && matchesStatus && matchesDue && matchesAmount && matchesPayment;
  });

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPaid = filteredInvoices.reduce((acc, inv) => acc + Number(inv.amountPaid || 0), 0);
  const totalOutstanding = filteredInvoices
    .filter((invoice) => normalizeInvoiceStatus(invoice.status) !== 'draft')
    .reduce((acc, inv) => acc + Math.max(Number(inv.amountTTC || 0) - Number(inv.amountPaid || 0), 0), 0);
  const lateInvoices = filteredInvoices.filter((invoice) => normalizeInvoiceStatus(invoice.status) === 'late').length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dueFilter, amountFilter, paymentFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDueFilter("all");
    setAmountFilter("all");
    setPaymentFilter("all");
  };

  const handleOpenPaymentDialog = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentAmount((invoice.amountTTC - invoice.amountPaid).toString());
    setPaymentDialogOpen(true);
  }

  const handleSavePayment = async () => {
      if (!selectedInvoice) return;
      setIsSubmitting(true);
      try {
          const newAmountPaid = selectedInvoice.amountPaid + parseFloat(paymentAmount);
          await updateInvoicePayment(selectedInvoice.id, newAmountPaid, selectedInvoice.amountTTC);
          toast({ title: "Paiement enregistré", description: "Le suivi de la facture a été mis à jour." });
          setPaymentDialogOpen(false);
          loadData();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer le paiement." });
      } finally {
          setIsSubmitting(false);
      }
  }

  const handleMarkAsEmitted = async (id: string) => {
      try {
          await updateInvoiceStatus(id, 'Émise');
          toast({ title: "Facture émise", description: "La facture est maintenant marquée comme émise." });
          loadData();
      } catch {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour le statut." });
      }
  }

  const handleDownloadInvoice = async (invoice: Invoice) => {
    setDownloadingId(invoice.id);
    setIsEmailAction(false);
    try {
      const quote = await getQuoteById(invoice.quoteId);
      if (!quote) throw new Error("Impossible de trouver le devis associé.");
      setAssociatedQuoteForPdf(quote);
      setSelectedInvoiceForPdf(invoice);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message || "Impossible de générer la facture." });
      setDownloadingId(null);
    }
  };

  const handleSendEmail = async (invoice: Invoice) => {
    setEmailingId(invoice.id);
    setIsEmailAction(true);
    toast({
      title: "Génération en cours...",
      description: "Génération de la facture PDF avant envoi.",
    });
    try {
      const quote = await getQuoteById(invoice.quoteId);
      if (!quote) throw new Error("Impossible de trouver le devis associé.");
      if (!quote.clientEmail) throw new Error("L'email du client est manquant sur le devis.");
      setAssociatedQuoteForPdf(quote);
      setSelectedInvoiceForPdf(invoice);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur d'envoi", description: error.message || "Impossible d'envoyer l'email." });
      setEmailingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Facturation & Paiements</h1>
          <p className="mt-1 text-sm text-muted-foreground">Filtrez les factures par statut, echeance, montant et niveau de paiement.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Rechercher client, facture, devis..." className="pl-9 rounded-full bg-white dark:bg-slate-900" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-emerald-50 dark:bg-emerald-950/20">
              <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl dark:bg-emerald-900/50 dark:text-emerald-400">
                          <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Encaissé (Mois)</p>
                          <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
                              {totalPaid.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl dark:bg-blue-900/50 dark:text-blue-400">
                          <HandCoins className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-blue-800 dark:text-blue-300">À recouvrer</p>
                          <h3 className="text-2xl font-black text-blue-900 dark:text-blue-100">
                              {totalOutstanding.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                          </h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-2xl dark:bg-red-900/50 dark:text-red-400">
                          <AlertCircle className="h-6 w-6" />
                      </div>
                      <div>
                          <p className="text-sm font-bold text-red-800 dark:text-red-300">En retard</p>
                          <h3 className="text-2xl font-black text-red-900 dark:text-red-100">
                              {lateInvoices} factures
                          </h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>


      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:flex-row xl:items-center">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 xl:w-24">
          <SlidersHorizontal className="h-4 w-4" /> Filtres
        </div>
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="draft">Brouillon</SelectItem>
              <SelectItem value="issued">Emise</SelectItem>
              <SelectItem value="partial">Partiellement payee</SelectItem>
              <SelectItem value="paid">Payee</SelectItem>
              <SelectItem value="late">En retard</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dueFilter} onValueChange={setDueFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Echeance" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes echeances</SelectItem>
              <SelectItem value="overdue">Depassee</SelectItem>
              <SelectItem value="7d">Sous 7 jours</SelectItem>
              <SelectItem value="30d">Sous 30 jours</SelectItem>
              <SelectItem value="future">Plus de 30 jours</SelectItem>
            </SelectContent>
          </Select>
          <Select value={amountFilter} onValueChange={setAmountFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Montant" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous montants</SelectItem>
              <SelectItem value="low">Moins de 1 000 EUR</SelectItem>
              <SelectItem value="medium">1 000 a 2 999 EUR</SelectItem>
              <SelectItem value="high">3 000 EUR et plus</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Paiement" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous paiements</SelectItem>
              <SelectItem value="unpaid">Non payees</SelectItem>
              <SelectItem value="partial">Paiement partiel</SelectItem>
              <SelectItem value="paid">Soldees</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-3 xl:justify-end">
          <span className="text-xs font-semibold text-slate-500">{filteredInvoices.length} / {invoices.length}</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-full text-slate-500">
              <X className="mr-2 h-4 w-4" /> Reinitialiser
            </Button>
          )}
        </div>
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader>
          <CardTitle>Suivi des Factures</CardTitle>
          <CardDescription>Consultez et suivez l'état des paiements de vos clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & ID</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Montant Total</TableHead>
                <TableHead>Reste à Payer</TableHead>
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
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : paginatedInvoices.length > 0 ? (
                paginatedInvoices.map((inv) => (
                  <TableRow key={inv.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <TableCell>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {inv.clientName}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {inv.id.substring(0, 8)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                        <div className="text-slate-500">Créée le {format(new Date(inv.createdAt), "d MMM yyyy", { locale: fr })}</div>
                        <div className="font-semibold text-slate-700 dark:text-slate-300">Échéance: {format(new Date(inv.dueDate), "d MMM yyyy", { locale: fr })}</div>
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-slate-900 dark:text-white">
                         {inv.amountTTC.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                      </span>
                    </TableCell>
                    <TableCell>
                       <span className="font-bold text-amber-600">
                         {(inv.amountTTC - inv.amountPaid).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                       </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadge(inv.status)} className={`text-[10px] font-black uppercase tracking-widest ${normalizeInvoiceStatus(inv.status) === 'paid' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : ''}`}>
                        {getDisplayStatus(inv.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-2">
                       {normalizeInvoiceStatus(inv.status) === 'draft' && (
                           <Button size="sm" variant="outline" onClick={() => handleMarkAsEmitted(inv.id)} className="rounded-full">
                               Émettre
                           </Button>
                       )}
                       {normalizeInvoiceStatus(inv.status) !== 'draft' && normalizeInvoiceStatus(inv.status) !== 'paid' && (
                        <Button size="sm" onClick={() => handleOpenPaymentDialog(inv)} className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                          <HandCoins className="h-4 w-4 mr-2" /> Encaissement
                        </Button>
                       )}
                       <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                             <span className="sr-only">Ouvrir le menu</span>
                             <MoreHorizontal className="h-4 w-4" />
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="rounded-2xl">
                           <DropdownMenuItem onClick={() => handleDownloadInvoice(inv)} disabled={downloadingId === inv.id} className="cursor-pointer">
                             {downloadingId === inv.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                             Télécharger PDF
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => handleSendEmail(inv)} disabled={emailingId === inv.id} className="cursor-pointer">
                             {emailingId === inv.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                             Envoyer au client
                           </DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-slate-400">
                    <Receipt className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                        Aucune facture trouvee.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {!loading && filteredInvoices.length > 0 && (
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>Affichage de <span className="font-semibold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-semibold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredInvoices.length)}</span> sur <span className="font-semibold text-slate-900 dark:text-white">{filteredInvoices.length}</span> factures</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="rounded-full"><ChevronLeft className="mr-1 h-4 w-4" /> Precedent</Button>
                <span className="text-xs font-semibold text-slate-500">Page {currentPage} / {totalPages}</span>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full">Suivant <ChevronRight className="ml-1 h-4 w-4" /></Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Enregistrer un paiement</DialogTitle>
              <DialogDescription>
                Saisissez le montant encaissé pour la facture de {selectedInvoice?.clientName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Montant (€)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPaymentDialogOpen(false)} className="rounded-full">Annuler</Button>
              <Button type="button" onClick={handleSavePayment} disabled={isSubmitting} className="rounded-full">
                  {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Valider l'encaissement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      {selectedInvoiceForPdf && associatedQuoteForPdf && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div ref={pdfRef}>
            <InvoicePDF
              data={{
                id: selectedInvoiceForPdf.id,
                clientName: selectedInvoiceForPdf.clientName,
                clientEmail: associatedQuoteForPdf.clientEmail,
                clientPhone: associatedQuoteForPdf.clientPhone || "",
                moveDate: associatedQuoteForPdf.moveDate || new Date().toISOString(),
                volume: associatedQuoteForPdf.volume || 0,
                quoteId: selectedInvoiceForPdf.quoteId,
                originAddress: associatedQuoteForPdf.originAddress || "",
                destinationAddress: associatedQuoteForPdf.destinationAddress || "",
                serviceType: associatedQuoteForPdf.serviceType || "basic",
                total: selectedInvoiceForPdf.amountTTC,
              } as any}
            />
          </div>
        </div>
      )}
    </div>
  );
}
