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
import { CalendarDays, List, Truck, CheckCircle, Package, LayoutGrid, MapPin, Search, FileText, Smartphone, SlidersHorizontal, X, ChevronLeft, ChevronRight, Map as MapIcon, Navigation, ExternalLink, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { WaybillPDF } from "@/components/waybill-pdf";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const normalizeBookingStatus = (status?: string) => {
  const value = (status || '').toLowerCase();
  if (value.includes('programm')) return 'scheduled';
  if (value.includes('route')) return 'route';
  if (value.includes('client')) return 'arrived';
  if (value.includes('cours')) return 'active';
  if (value.includes('termin')) return 'done';
  if (value.includes('annul')) return 'cancelled';
  if (value.includes('factur')) return 'invoiced';
  return 'other';
};

const getDisplayStatus = (status?: string) => {
  switch (normalizeBookingStatus(status)) {
    case 'scheduled': return 'Programme';
    case 'route': return 'En route';
    case 'arrived': return 'Arrive chez le client';
    case 'active': return 'En cours';
    case 'done': return 'Termine';
    case 'cancelled': return 'Annule';
    case 'invoiced': return 'Facture';
    default: return status || 'Non renseigne';
  }
};

const buildDirectionsUrl = (booking: Booking) => {
    const origin = encodeURIComponent(booking.originAddress || '');
    const destination = encodeURIComponent(booking.destinationAddress || '');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
};

const buildDirectionsEmbedUrl = (booking: Booking) => {
    const origin = encodeURIComponent(booking.originAddress || '');
    const destination = encodeURIComponent(booking.destinationAddress || '');
    return `https://www.google.com/maps?output=embed&saddr=${origin}&daddr=${destination}`;
};

const getAddressPreview = (address: string) => address.split(',').slice(0, 2).join(', ').trim() || address;

const getBookingStatusBadge = (status: Booking['status']) => {
  switch (normalizeBookingStatus(status)) {
    case 'scheduled': return 'default';
    case 'route': return 'secondary';
    case 'arrived': return 'secondary';
    case 'active': return 'secondary';
    case 'done': return 'outline'; 
    case 'cancelled': return 'destructive';
    case 'invoiced': return 'outline';
    default: return 'outline';
  }
};

export default function PlanningPage() {
    const [events, setEvents] = useState<PlanningEvent[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [periodFilter, setPeriodFilter] = useState("all");
    const [volumeFilter, setVolumeFilter] = useState("all");
    const [assignmentFilter, setAssignmentFilter] = useState("all");
    const [visibleGridCount, setVisibleGridCount] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedMapBookingId, setSelectedMapBookingId] = useState<string | null>(null);
    const itemsPerPage = 10;
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

    const hasActiveFilters = Boolean(searchQuery || statusFilter !== "all" || periodFilter !== "all" || volumeFilter !== "all" || assignmentFilter !== "all");

    const filteredBookings = bookings.filter((booking) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query ||
            booking.clientName.toLowerCase().includes(query) ||
            booking.clientEmail.toLowerCase().includes(query) ||
            (booking.clientPhone && booking.clientPhone.toLowerCase().includes(query)) ||
            booking.originAddress.toLowerCase().includes(query) ||
            booking.destinationAddress.toLowerCase().includes(query) ||
            booking.id.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "all" || normalizeBookingStatus(booking.status) === statusFilter;
        const moveDate = new Date(booking.moveDate);
        const daysUntilMove = Number.isNaN(moveDate.getTime()) ? Number.POSITIVE_INFINITY : (moveDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        const matchesPeriod = periodFilter === "all" ||
            (periodFilter === "late" && daysUntilMove < 0 && normalizeBookingStatus(booking.status) !== "done") ||
            (periodFilter === "today" && daysUntilMove >= -1 && daysUntilMove <= 1) ||
            (periodFilter === "7d" && daysUntilMove >= 0 && daysUntilMove <= 7) ||
            (periodFilter === "30d" && daysUntilMove >= 0 && daysUntilMove <= 30) ||
            (periodFilter === "future" && daysUntilMove > 30);
        const volume = Number(booking.volume || 0);
        const matchesVolume = volumeFilter === "all" ||
            (volumeFilter === "small" && volume > 0 && volume <= 20) ||
            (volumeFilter === "medium" && volume > 20 && volume <= 50) ||
            (volumeFilter === "large" && volume > 50) ||
            (volumeFilter === "unknown" && volume === 0);
        const isAssigned = Boolean(booking.assignedTeam || booking.assignedTeamId || booking.assignedVehicleId);
        const matchesAssignment = assignmentFilter === "all" ||
            (assignmentFilter === "assigned" && isAssigned) ||
            (assignmentFilter === "unassigned" && !isAssigned);
        return matchesSearch && matchesStatus && matchesPeriod && matchesVolume && matchesAssignment;
    });

    const filteredBookingIds = new Set(filteredBookings.map((booking) => booking.id));
    const moveEvents = events.filter((event) => event.type === 'move' && filteredBookingIds.has(event.id.replace('move-', '')));
    const gridBookings = filteredBookings.slice(0, visibleGridCount);
    const totalPages = Math.max(1, Math.ceil(filteredBookings.length / itemsPerPage));
    const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const selectedMapBooking = filteredBookings.find((booking) => booking.id === selectedMapBookingId) || filteredBookings[0] || null;

    useEffect(() => {
        setCurrentPage(1);
        setVisibleGridCount(9);
    }, [searchQuery, statusFilter, periodFilter, volumeFilter, assignmentFilter]);

    useEffect(() => {
        if (!selectedMapBookingId || !filteredBookings.some((booking) => booking.id === selectedMapBookingId)) {
            setSelectedMapBookingId(filteredBookings[0]?.id || null);
        }
    }, [filteredBookings, selectedMapBookingId]);

    const resetFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setPeriodFilter("all");
        setVolumeFilter("all");
        setAssignmentFilter("all");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Planification</h1>
                    <p className="text-slate-500 mt-1">Gérez l'ensemble des déménagements issus des devis acceptés.</p>
                </div>
            </div>

            <Tabs defaultValue="grille" className="w-full">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full w-fit">
                            <TabsTrigger value="grille" className="rounded-full px-4"><LayoutGrid className="h-4 w-4 mr-2"/> Grille</TabsTrigger>
                            <TabsTrigger value="liste" className="rounded-full px-4"><List className="h-4 w-4 mr-2"/> Liste</TabsTrigger>
                            <TabsTrigger value="carte" className="rounded-full px-4"><MapIcon className="h-4 w-4 mr-2"/> Carte</TabsTrigger>
                            <TabsTrigger value="calendrier" className="rounded-full px-4"><CalendarDays className="h-4 w-4 mr-2"/> Calendrier</TabsTrigger>
                        </TabsList>
                        <div className="relative w-full lg:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input placeholder="Rechercher client, ville, reference..." className="pl-9 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:flex-row xl:items-center">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 xl:w-24"><SlidersHorizontal className="h-4 w-4" /> Filtres</div>
                        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Statut" /></SelectTrigger><SelectContent><SelectItem value="all">Tous les statuts</SelectItem><SelectItem value="scheduled">Programme</SelectItem><SelectItem value="route">En route</SelectItem><SelectItem value="active">En cours</SelectItem><SelectItem value="done">Termine</SelectItem><SelectItem value="cancelled">Annule</SelectItem><SelectItem value="invoiced">Facture</SelectItem></SelectContent></Select>
                            <Select value={periodFilter} onValueChange={setPeriodFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Periode" /></SelectTrigger><SelectContent><SelectItem value="all">Toutes periodes</SelectItem><SelectItem value="late">En retard</SelectItem><SelectItem value="today">Aujourd'hui</SelectItem><SelectItem value="7d">7 prochains jours</SelectItem><SelectItem value="30d">30 prochains jours</SelectItem><SelectItem value="future">Plus de 30 jours</SelectItem></SelectContent></Select>
                            <Select value={volumeFilter} onValueChange={setVolumeFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Volume" /></SelectTrigger><SelectContent><SelectItem value="all">Tous volumes</SelectItem><SelectItem value="small">0 a 20 m3</SelectItem><SelectItem value="medium">21 a 50 m3</SelectItem><SelectItem value="large">Plus de 50 m3</SelectItem><SelectItem value="unknown">Non renseigne</SelectItem></SelectContent></Select>
                            <Select value={assignmentFilter} onValueChange={setAssignmentFilter}><SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Affectation" /></SelectTrigger><SelectContent><SelectItem value="all">Toutes affectations</SelectItem><SelectItem value="assigned">Affectes</SelectItem><SelectItem value="unassigned">Non affectes</SelectItem></SelectContent></Select>
                        </div>
                        <div className="flex items-center justify-between gap-3 xl:justify-end"><span className="text-xs font-semibold text-slate-500">{filteredBookings.length} / {bookings.length}</span>{hasActiveFilters && (<Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-full text-slate-500"><X className="mr-2 h-4 w-4" /> Reinitialiser</Button>)}</div>
                    </div>
                </div>

                {/* GRILLE (Sublime Grid) */}
                <TabsContent value="grille">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {loading ? (
                             Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-[2rem]" />)
                        ) : gridBookings.length > 0 ? (
                            gridBookings.map(booking => (
                                <Card key={booking.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden relative group">
                                    <div className={`absolute top-0 left-0 w-1 h-full ${normalizeBookingStatus(booking.status) === 'scheduled' ? 'bg-primary' : normalizeBookingStatus(booking.status) === 'done' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant={getBookingStatusBadge(booking.status)} className="text-[10px] uppercase font-black tracking-widest">{getDisplayStatus(booking.status)}</Badge>
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
                                            {normalizeBookingStatus(booking.status) === 'scheduled' && (
                                                <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'En cours')} className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                                                    <Truck className="h-4 w-4 mr-2" /> Démarrer l'opération
                                                </Button>
                                            )}
                                            {normalizeBookingStatus(booking.status) === 'active' && (
                                                <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'Terminé')} className="w-full rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20">
                                                    <CheckCircle className="h-4 w-4 mr-2" /> Clôturer
                                                </Button>
                                            )}
                                            {(normalizeBookingStatus(booking.status) === 'done' || normalizeBookingStatus(booking.status) === 'invoiced') && (
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
                    {!loading && gridBookings.length < filteredBookings.length && (
                        <div className="flex justify-center mt-8">
                            <Button variant="outline" onClick={() => setVisibleGridCount((count) => count + 9)} className="rounded-full px-6 border-slate-200 shadow-sm">Charger plus</Button>
                        </div>
                    )}
                </TabsContent>

                {/* LISTE AVEC FILTRES */}
                <TabsContent value="liste">
                    <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                            <div>
                                <CardTitle>Liste des Déménagements</CardTitle>
                                <CardDescription>Vue condensée de toutes vos opérations.</CardDescription>
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
                                    ) : paginatedBookings.length > 0 ? (
                                        paginatedBookings.map(booking => (
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
                                                        {getDisplayStatus(booking.status)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button size="sm" variant="outline" onClick={() => handleDownloadWaybill(booking)} disabled={isGeneratingWaybill && waybillBooking?.id === booking.id} className="rounded-full h-8 px-3">
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                    {normalizeBookingStatus(booking.status) === 'scheduled' && (
                                                        <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'En cours')} className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">
                                                            <Truck className="h-4 w-4 mr-2" /> Démarrer
                                                        </Button>
                                                    )}
                                                    {normalizeBookingStatus(booking.status) === 'active' && (
                                                        <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, 'Terminé')} className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                                            <CheckCircle className="h-4 w-4 mr-2" /> Terminer
                                                        </Button>
                                                    )}
                                                    {(normalizeBookingStatus(booking.status) === 'done' || normalizeBookingStatus(booking.status) === 'invoiced') && (
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
                            {!loading && filteredBookings.length > 0 && (
                                <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                                    <div>Affichage de <span className="font-semibold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-semibold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> sur <span className="font-semibold text-slate-900 dark:text-white">{filteredBookings.length}</span> demenagements</div>
                                    <div className="flex items-center gap-2"><Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="rounded-full"><ChevronLeft className="mr-1 h-4 w-4" /> Precedent</Button><span className="text-xs font-semibold text-slate-500">Page {currentPage} / {totalPages}</span><Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="rounded-full">Suivant <ChevronRight className="ml-1 h-4 w-4" /></Button></div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CARTE ITINERAIRES */}
                <TabsContent value="carte">
                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
                        <Card className="rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Route className="h-5 w-5 text-primary" /> Itineraires</CardTitle>
                                <CardDescription>Selectionnez une operation pour visualiser le trajet depart vers arrivee.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3 max-h-[640px] overflow-y-auto pr-2">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)
                                ) : filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => {
                                        const isSelected = selectedMapBooking?.id === booking.id;
                                        return (
                                            <button
                                                key={booking.id}
                                                type="button"
                                                onClick={() => setSelectedMapBookingId(booking.id)}
                                                className={`w-full rounded-2xl border p-4 text-left transition-all ${isSelected ? 'border-primary bg-primary/5 shadow-sm ring-2 ring-primary/10' : 'border-slate-100 bg-slate-50 hover:border-primary/30 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900'}`}
                                            >
                                                <div className="mb-3 flex items-start justify-between gap-3">
                                                    <div><p className="font-bold text-slate-900 dark:text-white">{booking.clientName}</p><p className="text-[11px] font-semibold text-slate-400">{format(new Date(booking.moveDate), "d MMM yyyy", { locale: fr })} - {booking.volume || '?'} m3</p></div>
                                                    <Badge variant={getBookingStatusBadge(booking.status)} className="text-[9px] uppercase tracking-widest">{getDisplayStatus(booking.status)}</Badge>
                                                </div>
                                                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300"><div className="flex gap-2"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" /><span className="line-clamp-1">{getAddressPreview(booking.originAddress)}</span></div><div className="ml-[7px] h-3 border-l border-dashed border-slate-300 dark:border-slate-700" /><div className="flex gap-2"><Navigation className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /><span className="line-clamp-1">{getAddressPreview(booking.destinationAddress)}</span></div></div>
                                            </button>
                                        );
                                    })
                                ) : (<div className="rounded-2xl bg-slate-50 p-6 text-center text-sm text-slate-500 dark:bg-slate-950">Aucun trajet a afficher.</div>)}
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden rounded-[2rem] border-none bg-white shadow-sm dark:bg-slate-900">
                            <CardHeader className="border-b border-slate-100 dark:border-slate-800">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2"><MapIcon className="h-5 w-5 text-primary" /> Carte operationnelle</CardTitle>
                                        <CardDescription>{selectedMapBooking ? `Trajet pour ${selectedMapBooking.clientName}` : 'Selectionnez un demenagement pour afficher son itineraire.'}</CardDescription>
                                    </div>
                                    {selectedMapBooking && (
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <Button variant="outline" className="rounded-full" onClick={() => { toast({ title: "Lien GPS pret", description: "Ouvrez Google Maps pour lancer la navigation ou partager le trajet avec l'equipe." }); }}>
                                                <Smartphone className="mr-2 h-4 w-4" /> Preparer partage equipe
                                            </Button>
                                            <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                                <a href={buildDirectionsUrl(selectedMapBooking)} target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" /> Ouvrir dans Google Maps</a>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {loading ? (<Skeleton className="h-[720px] w-full rounded-none" />) : selectedMapBooking ? (
                                    <div>
                                        <div className="relative min-h-[640px] bg-slate-100 dark:bg-slate-950">
                                            <iframe title={`Itineraire ${selectedMapBooking.clientName}`} src={buildDirectionsEmbedUrl(selectedMapBooking)} className="h-[640px] w-full border-0 2xl:h-[760px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                        </div>
                                        <div className="grid gap-3 border-t border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 xl:grid-cols-[1.2fr_1.2fr_.6fr_.8fr]">
                                            <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/40 dark:bg-blue-950/20">
                                                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600"><MapPin className="h-4 w-4" /> Point de depart</div>
                                                <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{selectedMapBooking.originAddress}</p>
                                            </div>
                                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                                                <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600"><Navigation className="h-4 w-4" /> Point d'arrivee</div>
                                                <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-white">{selectedMapBooking.destinationAddress}</p>
                                            </div>
                                            <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-950">
                                                <p className="text-xs font-bold uppercase text-slate-400">Volume</p>
                                                <p className="mt-1 text-2xl font-black">{selectedMapBooking.volume || '?'} m3</p>
                                            </div>
                                            <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-950">
                                                <p className="text-xs font-bold uppercase text-slate-400">Equipe</p>
                                                <p className="mt-1 truncate text-sm font-black">{selectedMapBooking.assignedTeam || 'Non affectee'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<div className="flex h-[640px] flex-col items-center justify-center text-center text-slate-500"><MapIcon className="mb-4 h-12 w-12 text-slate-300" /><p className="font-semibold">Aucun itineraire disponible</p><p className="text-sm">Ajustez les filtres ou planifiez un demenagement.</p></div>)}
                            </CardContent>
                        </Card>
                    </div>
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
