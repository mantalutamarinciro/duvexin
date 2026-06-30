"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Warehouse, PlusCircle, Loader2, Calendar as CalendarIcon, PackageCheck, Package, Box } from "lucide-react";

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
  DialogTrigger,
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
});

export default function StoragePage() {
  const [contracts, setContracts] = useState<StorageContract[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      clientName: "",
      itemsDescription: "",
      volumeM3: 1,
      entryDate: new Date(),
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
      // On garde les bookings actifs ou récents pour le sélecteur
      const activeBookings = fetchedBookings.filter(b => b.status !== 'Annulé');
      // Pour éviter les doublons de clients s'il y a plusieurs bookings
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
  
  const getStatusVariant = (status: 'Stocké' | 'Sorti') => {
      return status === 'Stocké' ? 'default' : 'outline';
  }

  const totalVolume = contracts.filter(c => c.status === 'Stocké').reduce((acc, c) => acc + c.volumeM3, 0);
  const activeLots = contracts.filter(c => c.status === 'Stocké').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Garde-Meuble</h1>
            <p className="text-slate-500 mt-1">Gérez le stockage des biens de vos clients.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-primary shadow-lg shadow-primary/20"><PlusCircle className="mr-2" /> Nouvelle Entrée en Stock</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Enregistrer une Entrée</DialogTitle>
                  <DialogDescription>
                    Sélectionnez un client ayant un déménagement planifié et renseignez les biens.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <FormField control={form.control} name="clientName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Client (Déménagement planifié)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200">
                            <SelectValue placeholder="Sélectionnez un client..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bookings.map((booking) => (
                            <SelectItem key={booking.id} value={booking.clientName}>
                              {booking.clientName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}/>
                   <FormField control={form.control} name="itemsDescription" render={({ field }) => (
                    <FormItem>
                        <FormLabel className="font-bold">Description des biens</FormLabel>
                        <FormControl>
                            <Textarea className="rounded-xl bg-slate-50 border-slate-200 resize-none h-24" placeholder="ex: 10 cartons, 1 canapé, 2 vélos..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}/>
                  <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="volumeM3" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Volume (m³)</FormLabel>
                            <FormControl>
                                <Input className="rounded-xl bg-slate-50 border-slate-200" type="number" step="0.1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={form.control} name="entryDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="font-bold">Date d'entrée</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    variant={"outline"}
                                    className={cn("rounded-xl bg-slate-50 border-slate-200 pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
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
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className="rounded-xl w-full">
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Enregistrer dans le stock
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 flex flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                      <Box className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-slate-500">Lots en cours</p>
                      <h3 className="text-3xl font-black">{activeLots}</h3>
                  </div>
              </div>
          </Card>
          <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 flex flex-col justify-center p-6">
              <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                      <Warehouse className="h-6 w-6" />
                  </div>
                  <div>
                      <p className="text-sm font-medium text-slate-500">Volume Total Stocké</p>
                      <h3 className="text-3xl font-black">{totalVolume.toFixed(1)} m³</h3>
                  </div>
              </div>
          </Card>
      </div>

       <Card className="rounded-[2rem] border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader>
            <CardTitle>Inventaire des Lots</CardTitle>
            <CardDescription>Liste de tous les biens actuellement ou anciennement en stock.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
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
                                <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-9 w-24 ml-auto"/></TableCell>
                            </TableRow>
                        ))
                    ) : contracts.length > 0 ? (
                        contracts.map(contract => (
                            <TableRow key={contract.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <TableCell>
                                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <Package className="h-4 w-4 text-slate-400" />
                                        {contract.clientName}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1 truncate max-w-[200px]">
                                        {contract.itemsDescription}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-black bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs">{contract.volumeM3} m³</span>
                                </TableCell>
                                <TableCell className="text-sm">{format(new Date(contract.entryDate), "d MMM yyyy", { locale: fr })}</TableCell>
                                <TableCell className="text-sm">
                                    {contract.exitDate ? format(new Date(contract.exitDate), "d MMM yyyy", { locale: fr }) : <span className="text-muted-foreground">-</span>}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(contract.status)} className={contract.status === 'Stocké' ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200' : ''}>
                                        {contract.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {contract.status === 'Stocké' && (
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="rounded-xl"><PackageCheck className="mr-2 h-4 w-4 text-emerald-500"/> Marquer sorti</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="rounded-[2rem]">
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmer la sortie du stock ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action enregistrera la date de sortie pour le lot de "{contract.clientName}" et changera son statut. Cette action est irréversible.
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
                            <TableCell colSpan={6} className="text-center h-48">
                                <Warehouse className="mx-auto h-12 w-12 text-slate-300 mb-4" />
                                <p className="text-lg font-bold text-slate-900">Aucun bien en stock</p>
                                <p className="text-sm text-slate-500 mt-1">Enregistrez une entrée pour commencer à suivre votre entrepôt.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
