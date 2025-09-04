
'use client';

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
import { MoreHorizontal, PlusCircle, CheckCircle, FileText, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getQuotes, Quote, updateQuoteStatus, QuoteStatus } from "@/services/quoteService";
import { createBookingFromQuote } from "@/services/bookingService";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


const statusLabels: Record<Quote['status'], string> = {
    pending: 'En attente',
    accepted: 'Accepté',
    invoiced: 'Facturé',
    converted: 'Converti',
}

const getBadgeVariant = (status: Quote['status']) => {
    switch (status) {
        case "pending": return "secondary";
        case "accepted": return "default";
        case "invoiced": return "outline";
        case "converted": return "default";
        default: return "secondary";
    }
}

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();


    const loadQuotes = async () => {
        try {
            setLoading(true);
            const fetchedQuotes = await getQuotes();
            setQuotes(fetchedQuotes);
        } catch (err) {
            setError("Impossible de charger les devis.");
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
                description: `Le devis a été marqué comme ${statusLabels[status]}.`,
            });
            loadQuotes(); // Refresh data
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour le statut du devis.",
            });
        }
    };

    const handleConvertToBooking = async (quote: Quote) => {
        try {
            await createBookingFromQuote(quote);
            await updateQuoteStatus(quote.id, 'converted');
            toast({
                title: "Réservation créée",
                description: "Le devis a été converti en réservation avec succès.",
            });
            router.push('/dashboard/bookings');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur de conversion",
                description: "Impossible de créer la réservation à partir de ce devis.",
            });
        }
    }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Liste des devis</h1>
        <Button asChild>
          <Link href="/dashboard/quote">
            <PlusCircle className="mr-2" />
            Nouveau devis
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Devis récents</CardTitle>
            <CardDescription>Consultez et gérez tous les devis générés.</CardDescription>
        </CardHeader>
        <CardContent>
            {error && <p className="text-destructive">{error}</p>}
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date du déménagement</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
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
                            <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                        </TableRow>
                    ))
                ) : quotes.length > 0 ? (
                    quotes.map((quote) => (
                    <TableRow key={quote.id}>
                        <TableCell className="font-medium">{quote.clientName}</TableCell>
                        <TableCell>{format(new Date(quote.moveDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                        <TableCell>{quote.quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(quote.status)}>{statusLabels[quote.status]}</Badge>
                        </TableCell>
                        <TableCell>{format(quote.createdAt.toDate(), "d MMM yyyy", { locale: fr })}</TableCell>
                        <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Ouvrir le menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {quote.status === 'pending' && (
                                    <DropdownMenuItem onClick={() => handleUpdateStatus(quote.id, 'accepted')}>
                                        <CheckCircle /> Marquer comme accepté
                                    </DropdownMenuItem>
                                )}
                                {quote.status === 'accepted' && (
                                    <DropdownMenuItem onClick={() => handleConvertToBooking(quote)}>
                                        <FileText /> Convertir en réservation
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive" disabled>
                                    <Trash2 /> Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">Aucun devis trouvé.</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
