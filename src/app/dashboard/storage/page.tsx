"use client";

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Warehouse, PlusCircle, Loader2, Calendar as CalendarIcon, PackageCheck, Package, Box, Info } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  StorageContract,
  createStorageContract,
  getStorageContracts,
  markContractAsExited,
  StorageContractFormData,
} from "@/services/storageService";
import { getBookings, Booking } from "@/services/bookingService";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const contractSchema = z.object({
  clientName: z.string().min(2, "Le nom du client est requis."),
  itemsDescription: z.string().min(5, "Veuillez décrire les objets stockés."),
  volumeM3: z.coerce.number().positive("Le volume doit être un nombre positif."),
  entryDate: z.date({ required_error: "La date d'entrée est requise." }),
  boxNumber: z.string().min(1, "Le numéro de box est requis."),
});

// Liste des 20 boxes fixes de notre entrepôt de démonstration
const ALL_BOXES = Array.from({ length: 20 }, (_, i) => `Box B${String(i + 1).padStart(2, '0')}`);

export default function StoragePage() {
  const [contracts, setContracts] = useState<StorageContract[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [highlightedContractId, setHighlightedContractId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      clientName: "",
      itemsDescription: "",
      volumeM3: 1,
      entryDate: new Date(),
      boxNumber: "",
    },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedContracts, fetchedBookings] = await Promise.all([
        getStorageContracts(),
        getBookings()
      ]);
      setContracts(fetchedContracts);
      const activeBookings = fetchedBookings.filter(b => b.status !== 'Annulé');
      const uniqueBookings = Array.from(new Map(activeBookings.map(b => [b.clientName, b])).values());
      setBookings(uniqueBookings);
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les données." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (values: z.infer<typeof contractSchema>) => {
    setIsSubmitting(true);
    try {
      const formData: StorageContractFormData = {
        ...values,
        entryDate: values.entryDate.toISOString(),
      };
      await createStorageContract(formData);
      toast({ title: "Entrée enregistrée", description: "Les biens ont été ajoutés au stock." });
      setIsDialogOpen(false);
      form.reset();
      loadData();
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer l'entrée." });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleMarkAsExited = async (contractId: string) => {
      try {
          await markContractAsExited(contractId);
          toast({ title: "Sortie enregistrée", description: "Le lot a été marqué comme sorti."});
          loadData();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer la sortie." });
      }
  }

  // Association entre un numéro de box et son contrat actif (si occupé)
  const activeContractsMap = useMemo(() => {
    const map = new Map<string, StorageContract>();
    contracts.forEach(c => {
      if (c.status === 'Stocké' && c.boxNumber) {
        map.set(c.boxNumber, c);
      }
    });
    return map;
  }, [contracts]);

  // Liste des boxes encore disponibles
  const availableBoxes = useMemo(() => {
    return ALL_BOXES.filter(box => !activeContractsMap.has(box));
  }, [activeContractsMap]);

  // Action de clic sur un box de la grille 2D
  const handleBoxClick = (boxNum: string) => {
    const occupiedBy = activeContractsMap.get(boxNum);
    if (occupiedBy) {
      // Highlight du contrat existant et défilement
      setHighlightedContractId(occupiedBy.id);
      const element = document.getElementById(`contract-${occupiedBy.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        setHighlightedContractId(null);
      }, 5000);
    } else {
      // Ouvrir le dialogue de création pour ce box disponible
      form.reset({
        clientName: "",
        itemsDescription: "",
        volumeM3: 1,
        entryDate: new Date(),
        boxNumber: boxNum,
      });
      setIsDialogOpen(true);
    }
  };

  const getStatusVariant = (status: 'Stocké' | 'Sorti') => {
      return status === 'Stocké' ? 'default' : 'outline';
  }

  const totalVolume = contracts.filter(c => c.status === 'Stocké').reduce((acc, c) => acc + c.volumeM3, 0);
  const activeLots = contracts.filter(c => c.status === 'Stocké').length;
  
  // Capacité théorique totale de notre garde-meuble de 20 conteneurs (ex: 10m³ par conteneur = 200m³)
  const WAREHOUSE_CAPACITY_M3 = 200;
  const occupancyPercentage = Math.min((totalVolume / WAREHOUSE_CAPACITY_M3) * 100, 100);

  return (
    <div className="flex flex-col gap-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900 dark:text-white">Garde-Meuble & Stockage</h1>
            <p className="text-slate-500 text-sm mt-1">Planification visuelle des volumes et affectation des conteneurs en temps réel.</p>
        </div>
        <Button 
          onClick={() => {
            form.reset({
              clientName: "",
              itemsDescription: "",
              volumeM3: 1,
              entryDate: new Date(),
              boxNumber: availableBoxes[0] || "",
            });
            setIsDialogOpen(true);
          }}
          className="rounded-full bg-primary font-bold shadow-lg shadow-primary/20"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> 
          Nouvelle Entrée en Stock
        </Button>
      </div>

      {/* KPI Cards & Occupation Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 p-6 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Box className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">Conteneurs Occupés</p>
                      <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{activeLots} <span className="text-sm font-medium text-slate-400">/ {ALL_BOXES.length}</span></h3>
                  </div>
              </div>
          </Card>

          <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 p-6 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Warehouse className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">Volume Total Stocké</p>
                      <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalVolume.toFixed(1)} m³</h3>
                  </div>
              </div>
          </Card>

          <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 p-6 bg-white dark:bg-slate-900 flex flex-col justify-between">
              <div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider text-slate-400">
                      <span>Taux de remplissage</span>
                      <span className="text-primary">{occupancyPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mt-3">
                      <div 
                        className="bg-primary h-full transition-all duration-500 rounded-full" 
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                  </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">Capacité estimée à {WAREHOUSE_CAPACITY_M3} m³ max.</p>
          </Card>
      </div>

      {/* Plan Interactif de l'entrepôt */}
      <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Warehouse className="h-5 w-5 text-primary" />
                Plan Numérique de l'Entrepôt
            </CardTitle>
            <CardDescription>
                Visualisez la répartition spatiale de vos stocks. Cliquez sur un conteneur vert pour y attribuer un lot ou sur un conteneur violet pour localiser le client.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {ALL_BOXES.map((boxNum) => {
                    const occupiedContract = activeContractsMap.get(boxNum);
                    const isOccupied = !!occupiedContract;

                    return (
                        <button
                          key={boxNum}
                          onClick={() => handleBoxClick(boxNum)}
                          className={cn(
                            "relative h-20 rounded-2xl border p-3 flex flex-col justify-between text-left transition-all duration-300 group hover:-translate-y-0.5",
                            isOccupied 
                              ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50 text-indigo-900 dark:text-indigo-200 shadow-inner" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 text-slate-600 dark:text-slate-400"
                          )}
                        >
                            <div className="flex justify-between items-start w-full">
                                <span className={cn("text-xs font-black tracking-tight", isOccupied ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")}>
                                    {boxNum.replace("Box ", "")}
                                </span>
                                <Package className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", isOccupied ? "text-indigo-500" : "text-slate-300")} />
                            </div>
                            
                            <div className="min-w-0 w-full mt-1">
                                {isOccupied ? (
                                    <>
                                        <p className="text-[10px] font-black truncate">{occupiedContract.clientName}</p>
                                        <p className="text-[9px] text-indigo-500 font-bold mt-0.5">{occupiedContract.volumeM3} m³</p>
                                    </>
                                ) : (
                                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                                        Libre
                                    </span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-md bg-white border border-slate-200 inline-block" />
                    Conteneur Libre
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-md bg-indigo-100 border border-indigo-200 inline-block" />
                    Conteneur Occupé
                </span>
                <span className="flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    L'affectation des emplacements facilite le chargement et la recherche lors de la sortie.
                </span>
            </div>
        </CardContent>
      </Card>

      {/* Inventaire des Lots */}
       <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Registre des Dépôts
            </CardTitle>
            <CardDescription>Suivi de l'historique d'entrée et de sortie des conteneurs du garde-meuble.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client & Détails</TableHead>
                        <TableHead>Emplacement</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Date d'entrée</TableHead>
                        <TableHead>Date de sortie</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        Array.from({length: 3}).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-16"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-16"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-9 w-24 ml-auto"/></TableCell>
                            </TableRow>
                        ))
                    ) : contracts.length > 0 ? (
                        contracts.map(contract => (
                            <TableRow 
                              key={contract.id} 
                              id={`contract-${contract.id}`}
                              className={cn(
                                "group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-500",
                                highlightedContractId === contract.id ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-l-indigo-500" : ""
                              )}
                            >
                                <TableCell>
                                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Package className="h-4 w-4 text-slate-400" />
                                        {contract.clientName}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1 truncate max-w-[240px]" title={contract.itemsDescription}>
                                        {contract.itemsDescription}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="rounded-xl font-bold bg-slate-100 text-slate-600 border-none">
                                        {contract.boxNumber || "Non assigné"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-xs">{contract.volumeM3} m³</span>
                                </TableCell>
                                <TableCell className="text-xs font-semibold text-slate-500">{format(new Date(contract.entryDate), "d MMM yyyy", { locale: fr })}</TableCell>
                                <TableCell className="text-xs font-semibold text-slate-500">
                                    {contract.exitDate ? format(new Date(contract.exitDate), "d MMM yyyy", { locale: fr }) : <span className="text-muted-foreground font-normal">-</span>}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(contract.status)} className={contract.status === 'Stocké' ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200 border-indigo-200 dark:border-indigo-900/50' : ''}>
                                        {contract.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {contract.status === 'Stocké' && (
                                         <AlertDialog>
                                             <AlertDialogTrigger asChild>
                                                 <Button variant="outline" size="sm" className="rounded-xl"><PackageCheck className="mr-2 h-4 w-4 text-emerald-500"/> Sortir</Button>
                                             </AlertDialogTrigger>
                                             <AlertDialogContent className="rounded-[2rem]">
                                                 <AlertDialogHeader>
                                                 <AlertDialogTitle>Confirmer la sortie du stock ?</AlertDialogTitle>
                                                 <AlertDialogDescription>
                                                     Cette action enregistrera la date de sortie pour le lot de "{contract.clientName}" stocké dans le <strong>{contract.boxNumber}</strong>. Son emplacement redeviendra disponible.
                                                 </AlertDialogDescription>
                                                 </AlertDialogHeader>
                                                 <AlertDialogFooter>
                                                 <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                                                 <AlertDialogAction className="rounded-xl bg-primary hover:bg-primary/90" onClick={() => handleMarkAsExited(contract.id)}>Confirmer la sortie</AlertDialogAction>
                                                 </AlertDialogFooter>
                                             </AlertDialogContent>
                                         </AlertDialog>
                                     )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center h-48">
                                <Warehouse className="mx-auto h-12 w-12 text-slate-300 mb-4 animate-pulse" />
                                <p className="text-lg font-bold text-slate-900 dark:text-white">Aucun lot stocké</p>
                                <p className="text-sm text-slate-500 mt-1">Enregistrez une entrée ou cliquez sur un conteneur disponible pour commencer.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

      {/* Modal d'Enregistrement Entrée */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-900">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">Enregistrer une Entrée</DialogTitle>
                  <DialogDescription>
                    Sélectionnez un client ayant un déménagement planifié et renseignez les biens.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <FormField control={form.control} name="clientName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Client (Déménagement planifié)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                            <SelectValue placeholder="Sélectionnez un client..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bookings.map((booking) => (
                            <SelectItem key={booking.id} value={booking.clientName}>
                              {booking.clientName}
                            </SelectItem>
                          ))}
                          {bookings.length === 0 && (
                            <SelectItem value="client-divers" disabled>Aucun déménagement actif</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>

                  <FormField control={form.control} name="boxNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Affectation Emplacement</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                            <SelectValue placeholder="Choisissez un conteneur..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ALL_BOXES.map((boxNum) => {
                            const isOccupied = activeContractsMap.has(boxNum) && field.value !== boxNum;
                            return (
                              <SelectItem key={boxNum} value={boxNum} disabled={isOccupied}>
                                {boxNum} {isOccupied ? "(Occupé)" : ""}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>

                   <FormField control={form.control} name="itemsDescription" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Description des biens</FormLabel>
                        <FormControl>
                            <Textarea className="rounded-xl bg-slate-50 border-slate-200 resize-none h-24" placeholder="ex: 10 cartons, 1 canapé, 2 vélos..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}/>

                  <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="volumeM3" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Volume (m³)</FormLabel>
                            <FormControl>
                                <Input className="rounded-xl bg-slate-50 border-slate-200 h-11" type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={form.control} name="entryDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="font-bold text-slate-700 dark:text-slate-300">Date d'entrée</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn("rounded-xl bg-slate-50 border-slate-200 h-11 pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                    >
                                      {field.value ? (format(field.value, "PPP", { locale: fr })) : (<span>Date</span>)}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus/>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}/>
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit" disabled={isSubmitting} className="rounded-2xl w-full h-12 font-bold shadow-lg shadow-primary/10">
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Enregistrer dans le stock
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
      </Dialog>
    </div>
  );
}
