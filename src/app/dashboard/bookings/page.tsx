
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
import { MoreHorizontal, PlusCircle, Users, FileText, Loader2, Eye, Receipt, Truck, ClipboardList } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getBookings, Booking, updateBookingStatus, assignTeamToBooking, getBookingById, BookingStatus, assignVehicleToBooking } from "@/services/bookingService";
import { getTeams, Team } from "@/services/teamService";
import { getVehicles } from "@/services/vehicleService";
import type { Vehicle } from "@/types/vehicle";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { WaybillPDF } from "@/components/waybill-pdf";
import { InvoicePDF } from "@/components/invoice-pdf";
import { RoadmapPDF } from "@/components/roadmap-pdf";


const getBadgeVariant = (status: Booking['status']) => {
    switch (status) {
        case "Programmé": return "secondary";
        case "En route": return "default";
        case "Arrivé chez le client": return "default";
        case "En cours": return "default";
        case "Terminé": return "outline";
        case "Facturé": return "default";
        case "Annulé": return "destructive";
        default: return "secondary";
    }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState<{type: 'waybill' | 'invoice' | 'roadmap', id: string} | null>(null);
  const [selectedBookingForPdf, setSelectedBookingForPdf] = useState<Booking | null>(null);
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);


  const loadData = async () => {
    try {
      setLoading(true);
      const [fetchedBookings, fetchedTeams, fetchedVehicles] = await Promise.all([
        getBookings(),
        getTeams(),
        getVehicles()
      ]);
      setBookings(fetchedBookings);
      setTeams(fetchedTeams);
      setVehicles(fetchedVehicles);
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

  const handleUpdateStatus = async (id: string, status: BookingStatus) => {
     try {
        await updateBookingStatus(id, status);
        toast({
            title: "Statut mis à jour",
            description: "Le statut de la réservation a été mis à jour.",
        });
        loadData(); // Refresh data
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du statut en ${status}:`, error);
        toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible de mettre à jour le statut.",
        });
    }
  }

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
  
  const handleAssignVehicle = async (bookingId: string, vehicle: Vehicle) => {
    try {
      await assignVehicleToBooking(bookingId, vehicle.id, vehicle.registration);
      toast({
        title: "Véhicule assigné",
        description: `Le véhicule immatriculé "${vehicle.registration}" a été assigné au déménagement.`,
      });
      loadData();
    } catch (error) {
      console.error("Erreur lors de l'assignation du véhicule:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'assigner le véhicule.",
      });
    }
  }

  const prepareAndDownloadPdf = async (bookingId: string, type: 'waybill' | 'invoice' | 'roadmap') => {
    if (pdfLoading) return;
    setPdfLoading({ type, id: bookingId });
    try {
      const bookingDetails = await getBookingById(bookingId);
      if (bookingDetails) {
        setSelectedBookingForPdf(bookingDetails);
      } else {
        throw new Error("Détails de la réservation introuvables.");
      }
    } catch (error) {
      console.error("Erreur lors de la préparation du PDF:", error);
      toast({
        variant: "destructive",
        title: "Erreur PDF",
        description: `Impossible de récupérer les détails pour le document (${type}).`,
      });
      setPdfLoading(null);
    }
  }

  const generatePdf = async () => {
    if (!selectedBookingForPdf || !pdfRef.current || !pdfLoading) return;
    
    const input = pdfRef.current;
    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${pdfLoading.type}-${selectedBookingForPdf.id.substring(0,8)}.pdf`);

        toast({
            title: "Document généré",
            description: `Le document (${pdfLoading.type}) a été téléchargé.`,
        });

        if (pdfLoading.type === 'invoice' && selectedBookingForPdf.status !== 'Facturé') {
            await handleUpdateStatus(selectedBookingForPdf.id, 'Facturé');
        }

    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        toast({
            variant: "destructive",
            title: "Erreur PDF",
            description: "Impossible de générer le document.",
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
                {pdfLoading?.type === 'waybill' && <WaybillPDF data={selectedBookingForPdf} />}
                {pdfLoading?.type === 'invoice' && <InvoicePDF data={selectedBookingForPdf} />}
                {pdfLoading?.type === 'roadmap' && <RoadmapPDF data={selectedBookingForPdf} />}
            </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Gestion des Réservations</h1>
        <Button asChild className="rounded-full bg-primary shadow-lg shadow-primary/20">
            <Link href="/dashboard/quote">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouveau Dossier
            </Link>
        </Button>
      </div>
      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
        <CardHeader>
            <CardTitle>Déménagements confirmés</CardTitle>
            <CardDescription>Planifiez et gérez les interventions des équipes.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Équipe</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">CA TTC</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                  Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto"/></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto"/></TableCell>
                    </TableRow>
                  ))
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                  <TableRow key={booking.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <TableCell className="font-bold text-slate-900 dark:text-white">{booking.clientName}</TableCell>
                      <TableCell className="text-xs font-medium">{format(new Date(booking.moveDate), "d MMM yyyy", { locale: fr })}</TableCell>
                       <TableCell className="text-xs">{booking.assignedTeam || <span className="text-slate-400 italic">Non assignée</span>}</TableCell>
                      <TableCell className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-block mt-2">{booking.assignedVehicleRegistration || '---'}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(booking.status)} className="text-[10px] font-black uppercase tracking-widest">{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-black text-slate-900 dark:text-white">{booking.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                      <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                              <span className="sr-only">Ouvrir le menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                          <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">Pilotage Dossier</DropdownMenuLabel>
                          <DropdownMenuItem asChild className="rounded-xl">
                            <Link href={`/track/${booking.id}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4 text-primary" />
                              <span>Page de suivi client</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="mx-2" />
                           <DropdownMenuSub>
                              <DropdownMenuSubTrigger disabled={teams.length === 0} className="rounded-xl">
                                <Users className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Assigner une équipe</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent className="rounded-2xl p-2 min-w-[180px]">
                                  <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-2 pb-2">Choisir l'équipe</DropdownMenuLabel>
                                  {teams.map((team) => (
                                    <DropdownMenuItem key={team.id} onClick={() => handleAssignTeam(booking.id, team)} className="rounded-xl">
                                      {team.name}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                             <DropdownMenuSub>
                              <DropdownMenuSubTrigger disabled={vehicles.length === 0} className="rounded-xl">
                                <Truck className="mr-2 h-4 w-4 text-blue-500" />
                                <span>Assigner un véhicule</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent className="rounded-2xl p-2 min-w-[180px]">
                                  <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-2 pb-2">Choisir le véhicule</DropdownMenuLabel>
                                  {vehicles.map((vehicle) => (
                                    <DropdownMenuItem key={vehicle.id} onClick={() => handleAssignVehicle(booking.id, vehicle)} className="rounded-xl">
                                      {vehicle.brand} ({vehicle.registration})
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>

                          <DropdownMenuSeparator className="mx-2" />
                          <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">Documents (PDF)</DropdownMenuLabel>
                           
                           <DropdownMenuItem onClick={() => prepareAndDownloadPdf(booking.id, 'roadmap')} disabled={pdfLoading?.id === booking.id} className="rounded-xl">
                                {pdfLoading?.type === 'roadmap' && pdfLoading.id === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ClipboardList className="mr-2 h-4 w-4 text-emerald-600" />}
                                <span>Feuille de Route</span>
                            </DropdownMenuItem>

                           <DropdownMenuItem onClick={() => prepareAndDownloadPdf(booking.id, 'waybill')} disabled={pdfLoading?.id === booking.id} className="rounded-xl">
                                {pdfLoading?.type === 'waybill' && pdfLoading.id === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4 text-emerald-600" />}
                                <span>Lettre de voiture</span>
                            </DropdownMenuItem>
                             
                             <DropdownMenuItem onClick={() => prepareAndDownloadPdf(booking.id, 'invoice')} disabled={pdfLoading?.id === booking.id || booking.status !== 'Terminé'} className="rounded-xl">
                                {pdfLoading?.type === 'invoice' && pdfLoading.id === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Receipt className="mr-2 h-4 w-4 text-emerald-600" />}
                                <span>Générer la Facture</span>
                            </DropdownMenuItem>
                          
                          <DropdownMenuSeparator className="mx-2" />
                          {booking.status !== 'Annulé' && booking.status !== 'Terminé' && booking.status !== 'Facturé' && (
                            <DropdownMenuItem className="text-destructive font-bold focus:bg-destructive/10 focus:text-destructive rounded-xl" onClick={() => handleUpdateStatus(booking.id, 'Annulé')}>
                                Annuler le dossier
                            </DropdownMenuItem>
                          )}
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                  </TableRow>
                  ))
                ) : (
                   <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-slate-400 italic">Aucune réservation trouvée dans la base.</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
