
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Warehouse, PlusCircle, Loader2, Calendar as CalendarIcon, PackageCheck, PackageOpen } from "lucide-react";

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

  const loadContracts = async () => {
    setLoading(true);
    try {
      const fetchedContracts = await getStorageContracts();
      setContracts(fetchedContracts);
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les contrats de stockage." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContracts();
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
      loadContracts();
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
          loadContracts();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer la sortie." });
      }
  }
  
  const getStatusVariant = (status: 'Stocké' | 'Sorti') => {
      return status === 'Stocké' ? 'secondary' : 'outline';
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Suivi de Stockage</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2" /> Nouvelle Entrée en Stock</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                  <DialogTitle>Enregistrer une Entrée</DialogTitle>
                  <DialogDescription>
                    Renseignez les informations sur les biens entrant dans votre entrepôt.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <FormField control={form.control} name="clientName" render={({ field }) => (
                    <FormItem><FormLabel>Nom du Client</FormLabel><FormControl><Input placeholder="ex: Jean Dupont" {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                   <FormField control={form.control} name="itemsDescription" render={({ field }) => (
                    <FormItem><FormLabel>Description des biens</FormLabel><FormControl><Textarea placeholder="ex: 10 cartons, 1 canapé, 2 vélos..." {...field} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <div className="grid grid-cols-2 gap-4">
                     <FormField control={form.control} name="volumeM3" render={({ field }) => (
                        <FormItem><FormLabel>Volume (m³)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                     <FormField control={form.control} name="entryDate" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>Date d'entrée</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn("pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Enregistrer
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>État du Stock</CardTitle>
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
                            <TableRow key={contract.id}>
                                <TableCell className="font-medium">{contract.clientName}</TableCell>
                                <TableCell>{contract.volumeM3} m³</TableCell>
                                <TableCell>{format(new Date(contract.entryDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                                <TableCell>
                                    {contract.exitDate ? format(new Date(contract.exitDate), "d MMMM yyyy", { locale: fr }) : <span className="text-muted-foreground">-</span>}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(contract.status)}>{contract.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {contract.status === 'Stocké' && (
                                         <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="outline" size="sm"><PackageCheck className="mr-2 h-4 w-4"/> Marquer comme sorti</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmer la sortie du stock ?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action enregistrera la date de sortie pour le lot de "{contract.clientName}" et changera son statut. Cette action est irréversible.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleMarkAsExited(contract.id)}>Confirmer la sortie</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                <Warehouse className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                                Aucun bien n'est actuellement en stock.
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
