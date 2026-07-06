'use client';

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MoveRequest, getRequests, updateRequestStatus } from "@/services/requestService";
import { createVisit } from "@/services/visitService";
import { Inbox, CalendarPlus, LayoutGrid, List as ListIcon, MapPin, Search, Phone, Mail, Archive, CalendarDays, ArrowDown, ChevronLeft, ChevronRight, MoreHorizontal, PenSquare, FileText, UserRound, SlidersHorizontal, X, Loader2, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const visitSchema = z.object({
  commercialName: z.string().min(2, "Le nom du commercial est requis."),
  clientName: z.string().min(2, "Le nom du client est requis."),
  clientAddress: z.string().min(5, "L'adresse est requise."),
  visitDateTime: z.date({ required_error: "La date et l'heure sont requises." }),
  type: z.enum(['domicile', 'téléphone', 'visio']),
  details: z.string().optional(),
});

const normalizeStatus = (status?: string) => {
  const value = (status || '').toLowerCase();
  if (value === 'pending' || value.includes('traiter')) return 'todo';
  if (value.includes('converti')) return 'converted';
  if (value.includes('archiv')) return 'archived';
  return 'other';
};

const getDisplayStatus = (status?: string) => {
  switch (normalizeStatus(status)) {
    case 'todo': return 'A traiter';
    case 'converted': return 'Converti en visite';
    case 'archived': return 'Archive';
    default: return status || 'Non renseigne';
  }
};

const getStatusBadge = (status: MoveRequest['status']) => {
  switch (normalizeStatus(status)) {
    case 'todo': return 'destructive';
    case 'converted': return 'default';
    case 'archived': return 'secondary';
    default: return 'outline';
  }
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<MoveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [volumeFilter, setVolumeFilter] = useState("all");
  const [visibleGridCount, setVisibleGridCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();
  const router = useRouter();

  const [selectedRequestForVisit, setSelectedRequestForVisit] = useState<MoveRequest | null>(null);
  const [isVisitDialogOpen, setIsVisitDialogOpen] = useState(false);
  const [isSubmittingVisit, setIsSubmittingVisit] = useState(false);

  const form = useForm<z.infer<typeof visitSchema>>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      commercialName: "Jean Dupont",
      clientName: "",
      clientAddress: "",
      visitDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Demain par défaut
      type: "domicile",
      details: "",
    },
  });

  useEffect(() => {
    if (selectedRequestForVisit) {
      form.setValue("clientName", selectedRequestForVisit.clientName);
      form.setValue("clientAddress", selectedRequestForVisit.originAddress);
      form.setValue("details", `Demande de devis volume estimé : ${selectedRequestForVisit.volume} m³. ${selectedRequestForVisit.details || ""}`);
    }
  }, [selectedRequestForVisit, form]);

  const onSubmitVisit = async (values: z.infer<typeof visitSchema>) => {
    if (!selectedRequestForVisit) return;
    setIsSubmittingVisit(true);
    try {
      await createVisit({
        ...values,
        requestId: selectedRequestForVisit.id,
        details: values.details ?? "",
      });

      await updateRequestStatus(selectedRequestForVisit.id, 'Converti en visite');

      toast({ title: "Visite planifiée", description: "La visite a été enregistrée avec succès." });
      setIsVisitDialogOpen(false);
      setSelectedRequestForVisit(null);
      form.reset();
      loadData();
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de planifier la visite." });
    } finally {
      setIsSubmittingVisit(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les demandes entrantes." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleArchive = async (id: string) => {
    try {
      await updateRequestStatus(id, 'Archivé');
      toast({ title: "Demande archivée", description: "La demande a été archivée avec succès." });
      loadData();
    } catch {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'archiver la demande." });
    }
  };

  const handleConvertToVisit = (request: MoveRequest) => {
    setSelectedRequestForVisit(request);
    setIsVisitDialogOpen(true);
  };

  const handleConvertToQuote = (request: MoveRequest) => {
    sessionStorage.setItem('prefillQuote', JSON.stringify({
      clientName: request.clientName,
      clientEmail: request.clientEmail || "",
      clientPhone: request.clientPhone || "",
      originAddress: request.originAddress,
      destinationAddress: request.destinationAddress,
      volume: request.volume,
      moveDate: request.moveDate || undefined,
      requestId: request.id
    }));
    router.push('/dashboard/quote');
  };

  const extractCity = (address: string) => {
      if (!address) return "";
      const parts = address.split(',');
      const lastPart = parts[parts.length - 1].trim();
      return lastPart.replace(/^\d{5}\s+/, '').trim();
  };

  const hasActiveFilters = Boolean(searchQuery || statusFilter !== "all" || periodFilter !== "all" || volumeFilter !== "all");

  const filteredRequests = requests.filter(req => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
      req.clientName.toLowerCase().includes(query) ||
      req.originAddress.toLowerCase().includes(query) ||
      req.destinationAddress.toLowerCase().includes(query) ||
      (req.clientEmail && req.clientEmail.toLowerCase().includes(query)) ||
      (req.clientPhone && req.clientPhone.toLowerCase().includes(query));

    const matchesStatus = statusFilter === "all" || normalizeStatus(req.status) === statusFilter;

    const createdAt = new Date(req.createdAt);
    const ageInDays = Number.isNaN(createdAt.getTime())
      ? Number.POSITIVE_INFINITY
      : (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const matchesPeriod =
      periodFilter === "all" ||
      (periodFilter === "today" && ageInDays <= 1) ||
      (periodFilter === "7d" && ageInDays <= 7) ||
      (periodFilter === "30d" && ageInDays <= 30);

    const volume = Number(req.volume || 0);
    const matchesVolume =
      volumeFilter === "all" ||
      (volumeFilter === "small" && volume > 0 && volume <= 20) ||
      (volumeFilter === "medium" && volume > 20 && volume <= 50) ||
      (volumeFilter === "large" && volume > 50) ||
      (volumeFilter === "unknown" && volume === 0);

    return matchesSearch && matchesStatus && matchesPeriod && matchesVolume;
  });

  const gridRequests = filteredRequests.slice(0, visibleGridCount);

  // Pagination pour la vue liste
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset pagination when filters change
  useEffect(() => {
      setCurrentPage(1);
      setVisibleGridCount(10);
  }, [searchQuery, statusFilter, periodFilter, volumeFilter]);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPeriodFilter("all");
    setVolumeFilter("all");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Leads & Demandes</h1>
          <p className="text-slate-500 mt-1">Gérez les prospects issus de votre site internet et transformez-les en visites commerciales.</p>
        </div>
      </div>

      <Tabs defaultValue="grille" className="w-full">
        <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full">
                <TabsTrigger value="grille" className="rounded-full px-4"><LayoutGrid className="h-4 w-4 mr-2"/> Grille</TabsTrigger>
                <TabsTrigger value="liste" className="rounded-full px-4"><ListIcon className="h-4 w-4 mr-2"/> Liste Détaillée</TabsTrigger>
            </TabsList>
            
            <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                    placeholder="Rechercher (Client, Email, Ville)..." 
                    className="pl-9 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center mb-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 md:w-24">
                <SlidersHorizontal className="h-4 w-4" /> Filtres
            </div>
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Statut" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les statuts</SelectItem>
                        <SelectItem value="todo">A traiter</SelectItem>
                        <SelectItem value="converted">Converti en visite</SelectItem>
                        <SelectItem value="archived">Archive</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Periode" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Toutes les periodes</SelectItem>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="7d">7 derniers jours</SelectItem>
                        <SelectItem value="30d">30 derniers jours</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={volumeFilter} onValueChange={setVolumeFilter}>
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Volume" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les volumes</SelectItem>
                        <SelectItem value="small">0 a 20 m3</SelectItem>
                        <SelectItem value="medium">21 a 50 m3</SelectItem>
                        <SelectItem value="large">Plus de 50 m3</SelectItem>
                        <SelectItem value="unknown">Non renseigne</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center justify-between gap-3 md:justify-end">
                <span className="text-xs font-semibold text-slate-500">{filteredRequests.length} / {requests.length}</span>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-full text-slate-500">
                        <X className="mr-2 h-4 w-4" /> Reinitialiser
                    </Button>
                )}
            </div>
        </div>

        {/* GRILLE */}
        <TabsContent value="grille">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-[2rem]" />)
                ) : gridRequests.length > 0 ? (
                    gridRequests.map(req => (
                        <Card key={req.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-slate-900 overflow-hidden relative group flex flex-col">
                            <div className={`absolute top-0 left-0 w-1 h-full ${normalizeStatus(req.status) === 'todo' ? 'bg-red-500' : normalizeStatus(req.status) === 'converted' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                            
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant={getStatusBadge(req.status)} className="text-[10px] uppercase font-black tracking-widest">{getDisplayStatus(req.status)}</Badge>
                                    <span className="text-[10px] text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                        {format(new Date(req.createdAt), "d MMM, HH:mm", { locale: fr })}
                                    </span>
                                </div>
                                <CardTitle className="text-lg line-clamp-1"><Link href={`/dashboard/customer-360?email=${encodeURIComponent(req.clientEmail)}`} className="hover:text-primary hover:underline">{req.clientName}</Link></CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg w-fit">{req.volume} m³</div>
                                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                        <CalendarDays className="h-3 w-3" />
                                        {req.moveDate ? format(new Date(req.moveDate), "MMM yyyy", { locale: fr }) : 'Date souple'}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm pb-4 flex-1">
                                <div className="space-y-2 mb-3 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span className="line-clamp-1 text-xs">{req.originAddress}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                        <span className="line-clamp-1 text-xs">{req.destinationAddress}</span>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    {req.clientPhone && (
                                        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                            <Phone className="h-3 w-3" /> {req.clientPhone}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                        <Mail className="h-3 w-3" /> <span className="line-clamp-1">{req.clientEmail}</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="bg-slate-50 dark:bg-slate-800/50 pt-4 flex gap-2 justify-between">
                                {normalizeStatus(req.status) === 'todo' ? (
                                    <>
                                        <Button size="sm" onClick={() => handleConvertToVisit(req)} className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 shadow-sm">
                                            <CalendarPlus className="h-4 w-4 mr-2" /> Visite
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={() => handleArchive(req.id)} className="rounded-xl border-slate-200 hover:bg-slate-100 text-slate-500 shrink-0" title="Archiver">
                                            <Archive className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={() => handleConvertToQuote(req)} className="rounded-xl border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20 text-slate-500 shrink-0" title="Créer Devis Direct">
                                            <FileText className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="w-full text-center text-xs text-slate-500 italic py-1">Dossier {getDisplayStatus(req.status).toLowerCase()}</div>
                                )}
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center flex flex-col items-center bg-white dark:bg-slate-900 rounded-[2rem] border-none shadow-sm">
                        <Inbox className="h-12 w-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Aucune demande</h3>
                        <p className="text-slate-500 mt-1">Les nouvelles demandes apparaîtront ici.</p>
                    </div>
                )}
            </div>
            
            {!loading && gridRequests.length < filteredRequests.length && (
                <div className="flex justify-center mt-8">
                    <Button 
                        variant="outline" 
                        onClick={() => setVisibleGridCount(prev => prev + 10)}
                        className="rounded-full px-6 border-slate-200 shadow-sm"
                    >
                        <ArrowDown className="h-4 w-4 mr-2" /> Charger plus de demandes
                    </Button>
                </div>
            )}
        </TabsContent>

        {/* LISTE DETAILLEE */}
        <TabsContent value="liste">
            <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                    <TableRow className="border-none">
                        <TableHead className="pl-6">Réception</TableHead>
                        <TableHead>Client & Contact</TableHead>
                        <TableHead>Itinéraire</TableHead>
                        <TableHead>Détails</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell className="pl-6"><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell><Skeleton className="h-10 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                            <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                            <TableCell className="text-right pr-6"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                        </TableRow>
                        ))
                    ) : paginatedRequests.length > 0 ? (
                        paginatedRequests.map((req) => (
                        <TableRow key={req.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b-slate-100 dark:border-b-slate-800">
                            <TableCell className="pl-6 align-top pt-4">
                                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {format(new Date(req.createdAt), "d MMM yyyy", { locale: fr })}
                                </div>
                                <div className="text-xs text-slate-400">
                                    {format(new Date(req.createdAt), "HH:mm", { locale: fr })}
                                </div>
                            </TableCell>
                            <TableCell className="align-top pt-4">
                                <div className="font-bold text-slate-900 dark:text-white mb-1">
                                    {req.clientName}
                                </div>
                                <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-0.5">
                                    <Mail className="h-3 w-3" /> {req.clientEmail}
                                </div>
                                {req.clientPhone && (
                                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                        <Phone className="h-3 w-3" /> {req.clientPhone}
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="align-top pt-4">
                                <div className="flex flex-col gap-1.5 max-w-[280px]">
                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase w-8 shrink-0">De</span> 
                                        <span className="text-xs font-semibold truncate" title={req.originAddress}>{extractCity(req.originAddress)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/10 px-2 py-1 rounded-md">
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase w-8 shrink-0">Vers</span> 
                                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 truncate" title={req.destinationAddress}>{extractCity(req.destinationAddress)}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="align-top pt-4">
                                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md w-fit mb-1">{req.volume} m³</div>
                                <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                    <CalendarDays className="h-3 w-3" />
                                    {req.moveDate ? format(new Date(req.moveDate), "MMM yyyy", { locale: fr }) : 'Non fixée'}
                                </div>
                            </TableCell>
                            <TableCell>
                      <Badge variant={getStatusBadge(req.status)} className="text-[10px] uppercase font-black tracking-widest">
                        {getDisplayStatus(req.status)}
                      </Badge>
                    </TableCell>
                            <TableCell className="text-right pr-6 align-top pt-4">
                                {normalizeStatus(req.status) === 'todo' ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                                <MoreHorizontal className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-2xl p-2 w-56 shadow-xl border-slate-100 dark:border-slate-800">
                                            <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">Actions Rapides</DropdownMenuLabel>
                                            <DropdownMenuItem asChild className="rounded-xl cursor-pointer text-slate-700 dark:text-slate-200">
                                                <Link href={`/dashboard/customer-360?email=${encodeURIComponent(req.clientEmail)}`}>
                                                    <UserRound className="mr-2 h-4 w-4 text-primary" /> Dossier 360
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleConvertToVisit(req)} className="rounded-xl cursor-pointer text-slate-700 dark:text-slate-200">
                                                <CalendarPlus className="mr-2 h-4 w-4 text-emerald-500" /> Planifier Visite
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleConvertToQuote(req)} className="rounded-xl cursor-pointer font-medium text-primary bg-primary/5 hover:bg-primary/10 focus:bg-primary/10 mt-1">
                                                <PenSquare className="mr-2 h-4 w-4" /> Créer Devis (Sans Visite)
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-2 bg-slate-100 dark:bg-slate-800"/>
                                            <DropdownMenuItem onClick={() => handleArchive(req.id)} className="rounded-xl cursor-pointer text-slate-500 hover:text-slate-700">
                                                <Archive className="mr-2 h-4 w-4" /> Archiver la demande
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <span className="text-[10px] text-slate-400 italic bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">Traité</span>
                                )}
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-40 text-slate-400">
                                <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                                <span className="block text-sm">Aucune demande correspondante.</span>
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                
                {/* Pagination Controls */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="text-sm text-slate-500">
                            Affichage de <span className="font-medium text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> à <span className="font-medium text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredRequests.length)}</span> sur <span className="font-medium text-slate-900 dark:text-white">{filteredRequests.length}</span> résultats
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="h-8 rounded-full border-slate-200"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="h-8 rounded-full border-slate-200"
                            >
                                Suivant <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de planification rapide de visite */}
      <Dialog open={isVisitDialogOpen} onOpenChange={setIsVisitDialogOpen}>
        <DialogContent className="sm:max-w-[480px] rounded-3xl p-6 border-slate-100 dark:border-slate-800 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Planifier une Visite Technique</DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Renseignez les détails pour l'estimation de volume physique de cette demande.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitVisit)} className="space-y-4">
              <FormField control={form.control} name="clientName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Nom du prospect</FormLabel>
                  <FormControl><Input placeholder="Nom du client" className="rounded-xl" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="clientAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Adresse de la visite</FormLabel>
                  <FormControl><Input placeholder="Adresse" className="rounded-xl" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="type" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Type de visite</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="domicile">À domicile</SelectItem>
                        <SelectItem value="visio">En Visio</SelectItem>
                        <SelectItem value="téléphone">Téléphone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="commercialName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Commercial</FormLabel>
                    <FormControl><Input placeholder="Nom du commercial" className="rounded-xl" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="visitDateTime" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Date et heure</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal rounded-xl h-11 border-slate-200", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPPP 'à' HH:mm", { locale: fr }) : <span>Choisir date/heure</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl border-slate-100 shadow-xl" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={(date) => {
                        if (date) {
                          const newDate = field.value || new Date();
                          newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                          field.onChange(new Date(newDate));
                        }
                      }} initialFocus locale={fr} />
                      <div className="p-3 border-t flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-bold">Heure :</span>
                        <Input type="time" className="w-24 h-8 text-xs rounded-lg" value={field.value ? format(field.value, "HH:mm") : "09:00"} onChange={(e) => {
                          const newDate = field.value ? new Date(field.value) : new Date();
                          const [hours, minutes] = e.target.value.split(':');
                          newDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
                          field.onChange(new Date(newDate));
                        }} />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="details" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Instructions / Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="ex: Accès camion, monte-meubles..." className="rounded-xl min-h-[80px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <DialogFooter className="pt-4 flex gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsVisitDialogOpen(false)} className="rounded-full">
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmittingVisit} className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-lg shadow-primary/20">
                  {isSubmittingVisit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Confirmer la visite
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
