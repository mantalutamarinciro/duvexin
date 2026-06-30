'use client';

import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
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
import { Receipt, CheckCircle, ExternalLink, CalendarPlus, Loader2, FileText, HandCoins, AlertCircle, MoreHorizontal, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getStatusBadge = (status: Invoice['status']) => {
  switch (status) {
    case 'Brouillon': return 'secondary';
    case 'Émise': return 'default';
    case 'Partiellement payée': return 'outline';
    case 'Payée': return 'default'; // we will override colors for Payée
    case 'En retard': return 'destructive';
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
  const { toast } = useToast();

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
    try {
        const res = await fetch(`/api/pdf?type=invoice&id=${invoice.id}`);
        if (!res.ok) throw new Error("Erreur serveur lors de la génération du PDF.");
        
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const shortRef = invoice.id.substring(0, 5).toUpperCase();
        a.download = `FAC-${new Date().getFullYear()}-${shortRef}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error: any) {
        toast({ variant: "destructive", title: "Erreur", description: error.message || "Impossible de générer le PDF." });
    } finally {
        setDownloadingId(null);
    }
  };

  const handleSendEmail = async (invoice: Invoice) => {
    setEmailingId(invoice.id);
    try {
        const res = await fetch(`/api/pdf?type=invoice&id=${invoice.id}`);
        if (!res.ok) throw new Error("Erreur serveur lors de la génération du PDF.");
        
        const blob = await res.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        
        await new Promise<void>((resolve, reject) => {
            reader.onloadend = async () => {
                const base64data = reader.result as string;
                try {
                    await sendInvoiceByEmail(invoice.id, base64data);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = reject;
        });

        toast({ title: "Facture envoyée 🚀", description: "La facture a bien été envoyée au client par email." });
        loadData();
    } catch (error: any) {
        toast({ variant: "destructive", title: "Erreur d'envoi", description: error.message || "Impossible d'envoyer l'email." });
    } finally {
        setEmailingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Facturation & Paiements</h1>
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
                              {invoices.reduce((acc, inv) => acc + inv.amountPaid, 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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
                              {invoices.filter(i => i.status !== 'Payée' && i.status !== 'Brouillon').reduce((acc, inv) => acc + (inv.amountTTC - inv.amountPaid), 0).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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
                              {invoices.filter(i => i.status === 'En retard').length} factures
                          </h3>
                      </div>
                  </div>
              </CardContent>
          </Card>
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
              ) : invoices.length > 0 ? (
                invoices.map((inv) => (
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
                      <Badge variant={getStatusBadge(inv.status)} className={`text-[10px] font-black uppercase tracking-widest ${inv.status === 'Payée' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : ''}`}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-2">
                       {inv.status === 'Brouillon' && (
                           <Button size="sm" variant="outline" onClick={() => handleMarkAsEmitted(inv.id)} className="rounded-full">
                               Émettre
                           </Button>
                       )}
                       {inv.status !== 'Brouillon' && inv.status !== 'Payée' && (
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
                    Aucune facture trouvée.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
    </div>
  );
}
