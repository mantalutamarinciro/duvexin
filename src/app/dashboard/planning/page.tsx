'use client';

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getPlanningData, PlanningEvent } from "@/services/planningService";
import { CalendarView } from "@/components/calendar";
import { getBookings, Booking, updateBookingStatus } from "@/services/bookingService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, List, Truck, CheckCircle, Package, LayoutGrid, MapPin, Search, FileText, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { WaybillPDF } from "@/components/waybill-pdf";
import { Input } from "@/components/ui/input";

const getBookingStatusBadge = (status: Booking['status']) => {
  switch (status) {
    case 'Programmé': return 'default';
    case 'En route': return 'secondary';
    case 'Arrivé chez le client': return 'secondary';
    case 'En cours': return 'secondary';
    case 'Terminé': return 'outline'; 
    case 'Annulé': return 'destructive';
    case 'Facturé': return 'outline';
    default: return 'outline';
  }
};

export default function PlanningPage() {
    const [events, setEvents] = useState<PlanningEvent[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [waybillBooking, setWaybillBooking] = useState<Booking | null>(null);
    const [isGeneratingWaybill, setIsGeneratingWaybill] = useState(false);
    const { toast } = useToast();

    const handleDownloadWaybill = async (booking: Booking) => {
        setIsGeneratingWaybill(true);
        setWaybillBooking(booking);

        toast({ title: "Génération en cours...", description: "Préparation de la lettre de voiture." });

        setTimeout(async () => {
            const input = document.getElementById("waybill-pdf-container");
            if (!input) {
                toast({ variant: 'destructive', title: "Erreur", description: "Impossible de générer le PDF." });
                setIsGeneratingWaybill(false);
                setWaybillBooking(null);
                return;
            }

            try {
                const canvas = await html2canvas(input, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                });
                const imgData = canvas.toDataURL("image/jpeg", 1.0);
                const pdf = new jsPDF({
                    orientation: "portrait",
                    unit: "mm",
                    format: "a4",
                });
                
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`Lettre_de_voiture_${booking.clientName.replace(/\s+/g, '_')}.pdf`);
                
                toast({ title: "Succès", description: "La lettre de voiture a été téléchargée." });
            } catch (err) {
                console.error(err);
                toast({ variant: 'destructive', title: "Erreur", description: "Échec de la génération du PDF." });
            } finally {
                setIsGeneratingWaybill(false);
                setWaybillBooking(null);
            }
        }, 500);
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const [planningData, bookingsData] = await Promise.all([
                getPlanningData(),
                getBookings()
            ]);
            setEvents(planningData);
            setBookings(bookingsData);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: "Erreur",
                description: "Impossible de charger les données du planning."
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleUpdateBookingStatus = async (id: string, status: Booking['status']) => {
        try {
            await updateBookingStatus(id, status);
            toast({ title: "Statut mis à jour", description: "Le statut du déménagement a été modifié." });
            loadData();
        } catch {
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour le statut." });
        }
    };

    const moveEvents = events.filter(e => e.type === 'move');
    const filteredBookings = bookings.filter(b => 
        b.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.originAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.destinationAddress.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Planification</h1>
                    <p className="text-slate-500 mt-1">Gérez l'ensemble des déménagements issus des devis acceptés.</p>
                </div>
            </div>

            <Tabs defaultValue="grille" className="w-full">
                <div className="flex justify-between items-center mb-6">
                    <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full">
                        <TabsTrigger value="grille" className="rounded-full px-4"><LayoutGrid className="h-4 w-4 mr-2"/> Grille</TabsTrigger>
                        <TabsTrigger value="liste" className="rounded-full px-4"><List className="h-4 w-4 mr-2"/> Liste</TabsTrigger>
                        <TabsTrigger value="calendrier" className="rounded-full px-4"><CalendarDays className="h-4 w-4 mr-2"/> Calendrier</TabsTrigger>
                    </TabsList>
                </div>

                {/* GRILLE (Sublime Grid) */}
                <TabsContent value="grille">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {loading ? (
                             Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2rem]" />)
                        ) : bookings.length > 0 ? (
                            bookings.map(booking => (
                                <Card key={booking.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden relative group">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${booking.status === 'Programmé' ? 'bg-primary' : booking.status === 'Terminé' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant={getBookingStatusBadge(booking.status)} className="text-[10px] uppercase font-black tracking-widest">{booking.status}</Badge>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">{booking.volume || '?'} m³</span>
                                        </div>
                                        <CardTitle className="text-xl">{booking.clientName}</CardTitle>
                                        <CardDescription className="font-mono text-[10px]">Réf: {booking.id.substring(0,8)}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm pb-4">
                                        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 shrink-0">
                                                <CalendarDays className="h-4 w-4" />
                                            </div>
                                            <span className="font-semibold">{format(new Date(booking.moveDate), "EEEE d MMMM yyyy", { locale: fr })}</span>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-4 w-4 text-slate-400 mt-1 shrink-0" />
                                                <span className="line-clamp-2 leading-tight">{booking.originAddress}</span>
                                            </div>
                                            <div className="border-l-2 border-dashed border-slate-200 dark:border-slate-800 ml-[7px] h-4 my-1"></div>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                                                <span className="line-clamp-2 leading-tight">{booking.destinationAddress}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-slate-50 dark:bg-slate-800/50 pt-4 flex flex-col gap-2">
                                        <div className="flex w-full gap-2">
                                            {booking.status === 'Programmé' && (
                                                <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'En cours')} className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                                                    <Truck className="h-4 w-4 mr-2" /> Démarrer l'opération
                                                </Button>
                                            )}
                                            {booking.status === 'En cours' && (
                                                <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'Terminé')} className="w-full rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20">
                                                    <CheckCircle className="h-4 w-4 mr-2" /> Clôturer
                                                </Button>
                                            )}
                                            {(booking.status === 'Terminé' || booking.status === 'Facturé') && (
                                                <div className="w-full text-center text-xs text-slate-400 italic py-2">Déménagement clôturé</div>
                                            )}
                                        </div>
                                        <div className="flex w-full gap-2">
                                            <Button variant="outline" size="sm" onClick={() => handleDownloadWaybill(booking)} disabled={isGeneratingWaybill && waybillBooking?.id === booking.id} className="w-1/2 rounded-xl text-xs bg-white">
                                                <FileText className="h-4 w-4 mr-2" /> Lettre
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => {
                                                toast({
                                                    title: "Feuille de route envoyée 📱",
                                                    description: "Un SMS avec le lien GPS a été envoyé à l'équipe.",
                                                });
                                            }} className="w-1/2 rounded-xl text-xs bg-white border-blue-200 text-blue-600 hover:bg-blue-50">
                                                <Smartphone className="h-4 w-4 mr-2" /> SMS Équipe
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center flex flex-col items-center">
                                <Package className="h-12 w-12 text-slate-300 mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Aucun déménagement</h3>
                                <p className="text-slate-500 mt-1">Vous n'avez pas encore de déménagements planifiés.</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* LISTE AVEC FILTRES */}
                <TabsContent value="liste">
                    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle>Liste des Déménagements</CardTitle>
                                <CardDescription>Vue condensée de toutes vos opérations.</CardDescription>
                            </div>
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input 
                                    placeholder="Rechercher un client, une ville..." 
                                    className="pl-9 rounded-full bg-slate-50 dark:bg-slate-800 border-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date Prévue</TableHead>
                                        <TableHead>Client</TableHead>
                                        <TableHead>Trajet</TableHead>
                                        <TableHead>Volume</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        Array.from({ length: 4 }).map((_, i) => (
                                            <TableRow key={i}>
                                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                                <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                                                <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                                            </TableRow>
                                        ))
                                    ) : filteredBookings.length > 0 ? (
                                        filteredBookings.map(booking => (
                                            <TableRow key={booking.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <TableCell className="text-xs font-medium">
                                                    {format(new Date(booking.moveDate), "d MMM yyyy", { locale: fr })}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-bold text-slate-900 dark:text-white">{booking.clientName}</div>
                                                    <div className="text-[10px] text-slate-400">{booking.id.substring(0,8)}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-xs truncate max-w-[250px] mb-1"><span className="font-semibold text-slate-500">De:</span> {booking.originAddress}</div>
                                                    <div className="text-xs truncate max-w-[250px]"><span className="font-semibold text-slate-500">Vers:</span> {booking.destinationAddress}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{booking.volume || '?'} m³</span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getBookingStatusBadge(booking.status)} className="text-[10px] uppercase tracking-widest font-black">
                                                        {booking.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleDownloadWaybill(booking)} disabled={isGeneratingWaybill && waybillBooking?.id === booking.id} className="rounded-full h-8 px-3">
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                    {booking.status === 'Programmé' && (
                                                        <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'En cours')} className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                                            <Truck className="h-4 w-4 mr-2" /> Démarrer
                                                        </Button>
                                                    )}
                                                    {booking.status === 'En cours' && (
                                                        <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'Terminé')} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                                            <CheckCircle className="h-4 w-4 mr-2" /> Terminer
                                                        </Button>
                                                    )}
                                                    {(booking.status === 'Terminé' || booking.status === 'Facturé') && (
                                                        <span className="text-xs text-slate-400 italic">Clôturé</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center h-32 text-slate-400">
                                                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                Aucun déménagement ne correspond à votre recherche.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CALENDRIER (Uniquement Opérationnel) */}
                <TabsContent value="calendrier">
                    <div className="rounded-[2rem] overflow-hidden bg-white shadow-sm border-none dark:bg-slate-900 p-6">
                        {loading ? <Skeleton className="h-[600px] w-full rounded-[2rem]" /> : <CalendarView events={moveEvents} />}
                    </div>
                </TabsContent>
            </Tabs>

            {waybillBooking && (
                <div className="absolute -left-[9999px]">
                    <div id="waybill-pdf-container">
                        <WaybillPDF data={waybillBooking} />
                    </div>
                </div>
            )}
        </div>
    );
}
