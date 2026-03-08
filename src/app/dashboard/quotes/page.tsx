
'use client';

import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, CheckCircle, XCircle, FileEdit, Trash2, BookUser, FileText, Loader2, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getQuotes, Quote, updateQuoteStatus, QuoteStatus, deleteQuote, getQuoteById } from "@/services/quoteService";
import { createBookingFromQuote } from "@/services/bookingService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { QuotePDF } from "@/components/quote-pdf";

const statusLabels: Record<Quote['status'], string> = {
    pending: 'En attente',
    accepted: 'Accepté',
    refused: 'Refusé',
    invoiced: 'Facturé',
    converted: 'Converti',
}

const getBadgeVariant = (status: Quote['status']) => {
    switch (status) {
        case "pending": return "secondary";
        case "accepted": return "default";
        case "refused": return "destructive";
        case "invoiced": return "outline";
        case "converted": return "default";
        default: return "secondary";
    }
}

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
    }

    useEffect(() => {
        loadQuotes();
    }, []);

    const handleUpdateStatus = async (id: string, status: QuoteStatus) => {
        try {
            await updateQuoteStatus(id, status);
            toast({
                title: "Statut mis à jour",
                description: `Le devis a été marqué comme ${statusLabels[status].toLowerCase()}.`,
            });
            loadQuotes();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour le statut du devis.",
            });
        }
    };

    const handleConvertToBooking = async (quote: Quote) => {
        if (quote.status !== 'accepted') {
            toast({
                variant: "destructive",
                title: "Action impossible",
                description: "Seuls les devis acceptés peuvent être convertis en réservation.",
            });
            return;
        }
        try {
            await createBookingFromQuote(quote);
            toast({
                title: "Réservation créée",
                description: "Le devis a été converti en réservation avec succès.",
            });
            router.push('/dashboard/bookings');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur de conversion",
                description: "Impossible de créer la réservation.",
            });
        }
    }
    
    const handleDeleteQuote = async (id: string) => {
        try {
            await deleteQuote(id);
            toast({
                title: "Devis supprimé",
                description: "Le devis a été supprimé.",
            });
            loadQuotes();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de supprimer le devis.",
            });
        }
    }

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
                description: error.message || "Veuillez d'abord chiffrer ce devis.",
            });
            setPdfLoading(null);
        }
    }

    const generatePdf = async () => {
        if (!selectedQuoteForPdf || !pdfRef.current) return;
        
        const input = pdfRef.current;
        try {
            const canvas = await html2canvas(input, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`devis-${selectedQuoteForPdf.clientName.replace(/\s+/g, '-').toLowerCase()}.pdf`);

            toast({
                title: "Devis généré",
                description: "Le document PDF a été téléchargé.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur PDF",
                description: "Impossible de générer le document.",
            });
        } finally {
            setPdfLoading(null);
            setSelectedQuoteForPdf(null);
        }
    }

    useEffect(() => {
        if (selectedQuoteForPdf) {
            generatePdf();
        }
    }, [selectedQuoteForPdf]);


  return (
    <div className="flex flex-col gap-6">
      {/* Hidden PDF container */}
      {selectedQuoteForPdf && (
        <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
            <div ref={pdfRef} className="w-[210mm]">
                <QuotePDF 
                    data={{
                        ...selectedQuoteForPdf,
                        moveDate: new Date(selectedQuoteForPdf.moveDate)
                    }} 
                    quote={selectedQuoteForPdf.quote} 
                />
            </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion des Devis</h1>
        <Button asChild className="rounded-full bg-primary shadow-lg shadow-primary/20">
          <Link href="/dashboard/quote">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau devis
          </Link>
        </Button>
      </div>
      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader>
            <CardTitle>Demandes de devis</CardTitle>
            <CardDescription>Consultez, chiffrez et convertissez vos prospects en clients.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date du projet</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Provenance</TableHead>
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
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                        </TableRow>
                    ))
                ) : quotes.length > 0 ? (
                    quotes.map((quote) => (
                    <TableRow key={quote.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell className="font-bold text-slate-900 dark:text-white">{quote.clientName}</TableCell>
                        <TableCell className="text-xs">{format(new Date(quote.moveDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                        <TableCell>
                            {quote.quote > 0 ? (
                                <span className="font-black text-slate-900 dark:text-white">{quote.quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                            ) : (
                                <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-100 animate-pulse">À chiffrer</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(quote.status)} className="text-[10px] font-black uppercase tracking-widest">{statusLabels[quote.status]}</Badge>
                        </TableCell>
                        <TableCell className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{format(new Date(quote.createdAt), "d MMM yyyy", { locale: fr })}</TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                <span className="sr-only">Ouvrir le menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">Pilotage Commercial</DropdownMenuLabel>
                                <DropdownMenuItem asChild className="rounded-xl">
                                    <Link href={`/dashboard/quote/${quote.id}`}>
                                        <FileEdit className="mr-2 h-4 w-4 text-blue-500" />
                                        <span>Modifier / Chiffrer</span>
                                    </Link>
                                </DropdownMenuItem>
                                
                                {quote.quote > 0 && (
                                    <DropdownMenuItem onClick={() => prepareAndDownloadPdf(quote.id)} disabled={pdfLoading === quote.id} className="rounded-xl">
                                        {pdfLoading === quote.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4 text-emerald-600" />}
                                        <span>Générer le PDF (Devis)</span>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="mx-2" />
                                {quote.status === 'pending' && quote.quote > 0 && (
                                    <>
                                    <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'accepted')} className="rounded-xl">
                                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Marquer comme accepté
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'refused')} className="rounded-xl">
                                        <XCircle className="mr-2 h-4 w-4 text-red-500" /> Marquer comme refusé
                                    </DropdownMenuItem>
                                    </>
                                )}
                                {quote.status === 'accepted' && (
                                    <DropdownMenuItem onClick={() => handleConvertToBooking(quote)} className="rounded-xl bg-primary/10 text-primary font-bold hover:bg-primary/20">
                                        <BookUser className="mr-2 h-4 w-4" /> Convertir en réservation
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator className="mx-2" />
                                <DropdownMenuItem onClick={() => handleDeleteQuote(quote.id)} className="text-destructive font-bold focus:bg-destructive/10 focus:text-destructive rounded-xl">
                                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer définitivement
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24 text-slate-400 italic">Aucune demande de devis en attente.</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
