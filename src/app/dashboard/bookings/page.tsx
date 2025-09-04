
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, Users, FileText, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getBookings, Booking, updateBookingStatus, assignTeamToBooking, getBookingById } from "@/services/bookingService";
import { getTeams, Team } from "@/services/teamService";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { WaybillPDF } from "@/components/waybill-pdf";


const getBadgeVariant = (status: Booking['status']) => {
    switch (status) {
        case "Programmé": return "secondary";
        case "En cours": return "default";
        case "Terminé": return "outline";
        case "Annulé": return "destructive";
        default: return "secondary";
    }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState<string | null>(null);
  const [selectedBookingForPdf, setSelectedBookingForPdf] = useState<Booking | null>(null);
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);


  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedBookings, fetchedTeams] = await Promise.all([
        getBookings(),
        getTeams()
      ]);
      setBookings(fetchedBookings);
      setTeams(fetchedTeams);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "Erreur",
        description: "Impossible de charger les données."
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    if (selectedBookingForPdf && pdfRef.current) {
      generatePdf();
    }
  }, [selectedBookingForPdf]);

  const handleCancelBooking = async (id: string) => {
    try {
        await updateBookingStatus(id, 'Annulé');
        toast({
            title: "Réservation annulée",
            description: "Le statut de la réservation a été mis à jour.",
        });
        loadData(); // Refresh data
    } catch (error) {
        console.error("Erreur lors de l'annulation de la réservation:", error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible d'annuler la réservation.",
        });
    }
  };
  
  const handleAssignTeam = async (bookingId: string, team: Team) => {
    try {
      await assignTeamToBooking(bookingId, team.id, team.name);
      toast({
        title: "Équipe assignée",
        description: `L'équipe "${team.name}" a été assignée au déménagement.`,
      });
      loadData(); // Refresh data
    } catch (error) {
      console.error("Erreur lors de l'assignation de l'équipe:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'assigner l'équipe.",
      });
    }
  }

  const prepareAndDownloadPdf = async (bookingId: string) => {
    if (pdfLoading) return;
    setPdfLoading(bookingId);
    try {
      const bookingDetails = await getBookingById(bookingId);
      if (bookingDetails) {
        setSelectedBookingForPdf(bookingDetails);
        // The PDF generation will be triggered by the useEffect
      } else {
        throw new Error("Détails de la réservation introuvables.");
      }
    } catch (error) {
      console.error("Erreur lors de la préparation du PDF:", error);
      toast({
        variant: "destructive",
        title: "Erreur PDF",
        description: "Impossible de récupérer les détails pour la lettre de voiture.",
      });
      setPdfLoading(null);
    }
  }

  const generatePdf = async () => {
    if (!selectedBookingForPdf || !pdfRef.current) return;
    
    const input = pdfRef.current;
    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`lettre-de-voiture-${selectedBookingForPdf.id}.pdf`);

        toast({
            title: "PDF téléchargé",
            description: "La lettre de voiture a été téléchargée avec succès.",
        });
    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        toast({
            variant: "destructive",
            title: "Erreur PDF",
            description: "Impossible de générer la lettre de voiture.",
        });
    } finally {
        setPdfLoading(null);
        setSelectedBookingForPdf(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
       {selectedBookingForPdf && (
        <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
            <div ref={pdfRef} className="w-[210mm]">
                <WaybillPDF data={selectedBookingForPdf} />
            </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Réservations</h1>
        <Button asChild>
            <Link href="/dashboard/quote">
                <PlusCircle className="mr-2" />
                Nouvelle réservation (via devis)
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Déménagements à venir et récents</CardTitle>
            <CardDescription>Liste de toutes les réservations confirmées.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Équipe</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                  Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto"/></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto"/></TableCell>
                    </TableRow>
                  ))
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                  <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.clientName}</TableCell>
                      <TableCell>{format(new Date(booking.moveDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                       <TableCell>{booking.assignedTeam || <span className="text-muted-foreground italic">Non assignée</span>}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{booking.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
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
                          <DropdownMenuSeparator />
                           <DropdownMenuSub>
                              <DropdownMenuSubTrigger disabled={teams.length === 0}>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Assigner une équipe</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  <DropdownMenuLabel>Choisir une équipe</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {teams.map((team) => (
                                    <DropdownMenuItem key={team.id} onClick={() => handleAssignTeam(booking.id, team)}>
                                      {team.name}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>

                           <DropdownMenuItem onClick={() => prepareAndDownloadPdf(booking.id)} disabled={pdfLoading === booking.id}>
                                {pdfLoading === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                                <span>Générer Lettre de voiture</span>
                            </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          {booking.status !== 'Annulé' && booking.status !== 'Terminé' && (
                            <DropdownMenuItem className="text-destructive" onClick={() => handleCancelBooking(booking.id)}>
                                Annuler le déménagement
                            </DropdownMenuItem>
                          )}
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                  </TableRow>
                  ))
                ) : (
                   <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">Aucune réservation trouvée.</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
