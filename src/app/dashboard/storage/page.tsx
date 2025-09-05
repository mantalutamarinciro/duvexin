
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Warehouse, PlusCircle, Loader2, Calendar, User, Truck, Package, ArrowRight, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  StorageUnit,
  createStorageUnit,
  getStorageUnits,
  StorageUnitFormData,
  Movement,
  MovementFormData,
  getUnitMovements,
  addMovement,
  getStorageUnitById
} from "@/services/storageService";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const unitSchema = z.object({
  unitNumber: z.string().min(2, "Le numéro est requis."),
  size: z.string().min(2, "La taille est requise (ex: 5m³)."),
});

const movementSchema = z.object({
    unitId: z.string(),
    type: z.enum(["Entrée", "Sortie"]),
    itemsDescription: z.string().min(5, "Veuillez décrire les objets."),
    notes: z.string().optional(),
})

export default function StoragePage() {
    const [units, setUnits] = useState<StorageUnit[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);

    const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);
    const [movements, setMovements] = useState<Movement[]>([]);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const { toast } = useToast();

    const unitForm = useForm<StorageUnitFormData>({
        resolver: zodResolver(unitSchema),
        defaultValues: { unitNumber: "", size: "" },
    });

    const movementForm = useForm<MovementFormData>({
        resolver: zodResolver(movementSchema),
    });

    const loadUnits = async () => {
        setLoading(true);
        try {
            const fetchedUnits = await getStorageUnits();
            setUnits(fetchedUnits);
        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les garde-meubles." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUnits();
    }, []);

    const onUnitSubmit = async (values: StorageUnitFormData) => {
        setIsSubmitting(true);
        try {
            await createStorageUnit(values);
            toast({ title: "Garde-meuble créé", description: "Le nouveau box a été ajouté." });
            setIsUnitDialogOpen(false);
            unitForm.reset();
            loadUnits();
        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible de créer le box." });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const onMovementSubmit = async (values: MovementFormData) => {
        setIsSubmitting(true);
        try {
            await addMovement(values);
            toast({ title: "Mouvement enregistré", description: `Une ${values.type.toLowerCase()} a été ajoutée.`});
            movementForm.reset();
            // Refresh movements for the selected unit
            if (selectedUnit) {
                await openDetailDialog(selectedUnit.id);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer le mouvement." });
        } finally {
            setIsSubmitting(false);
        }
    }

    const openDetailDialog = async (unitId: string) => {
        setIsDetailDialogOpen(true);
        setLoadingDetails(true);
        try {
            const [unitDetails, unitMovements] = await Promise.all([
                getStorageUnitById(unitId),
                getUnitMovements(unitId)
            ]);
            
            if (unitDetails) {
                 setSelectedUnit(unitDetails);
                 setMovements(unitMovements);
                 movementForm.setValue("unitId", unitId);
            } else {
                toast({ variant: 'destructive', title: "Erreur", description: "Impossible de trouver les détails du box." });
                setIsDetailDialogOpen(false);
            }

        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les détails." });
            setIsDetailDialogOpen(false);
        } finally {
            setLoadingDetails(false);
        }
    }

    const getStatusVariant = (status: StorageUnitStatus) => {
        switch (status) {
            case "Occupé": return "destructive";
            case "Disponible": return "default";
            case "En maintenance": return "secondary";
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion des Garde-meubles</h1>
                <Dialog open={isUnitDialogOpen} onOpenChange={setIsUnitDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2" /> Ajouter un box</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <Form {...unitForm}>
                            <form onSubmit={unitForm.handleSubmit(onUnitSubmit)} className="space-y-6">
                                <DialogHeader>
                                    <DialogTitle>Nouveau Box de Stockage</DialogTitle>
                                    <DialogDescription>
                                        Ajoutez un nouveau garde-meuble à votre parc.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                     <FormField control={unitForm.control} name="unitNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Numéro du box</FormLabel><FormControl><Input placeholder="ex: A-101" {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                      <FormField control={unitForm.control} name="size" render={({ field }) => (
                                        <FormItem><FormLabel>Taille / Volume</FormLabel><FormControl><Input placeholder="ex: 8m³" {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Ajouter
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)
                ) : units.map(unit => (
                    <Card key={unit.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openDetailDialog(unit.id)}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>{unit.unitNumber}</span>
                                <Badge variant={getStatusVariant(unit.status)}>{unit.status}</Badge>
                            </CardTitle>
                            <CardDescription>{unit.size}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {unit.status === "Occupé" ? (
                                <div>
                                    <p className="text-sm font-semibold flex items-center gap-2"><User className="h-4 w-4"/> {unit.clientName}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4"/> Depuis le {format(new Date(unit.startDate!), "P", { locale: fr })}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Ce box est actuellement disponible.</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
             { !loading && units.length === 0 && (
                <Card className="col-span-full">
                    <CardContent className="text-center py-12 text-muted-foreground">
                        <Warehouse className="mx-auto h-12 w-12" />
                        <p className="mt-4 text-sm">Aucun garde-meuble n'a encore été créé.</p>
                    </CardContent>
                </Card>
            )}

            <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
                <DialogContent className="max-w-2xl">
                     <DialogHeader>
                        {loadingDetails ? <Skeleton className="h-8 w-48"/> : <DialogTitle>Détails du Box {selectedUnit?.unitNumber}</DialogTitle>}
                        {loadingDetails ? <Skeleton className="h-4 w-full"/> : <DialogDescription>Consultez l'historique et ajoutez des mouvements pour ce garde-meuble.</DialogDescription>}
                    </DialogHeader>
                    {loadingDetails ? <Loader2 className="mx-auto my-12 h-10 w-10 animate-spin text-primary"/> : (
                    <Tabs defaultValue="history">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="history">Historique</TabsTrigger>
                            <TabsTrigger value="movement">Nouveau Mouvement</TabsTrigger>
                        </TabsList>
                        <TabsContent value="history" className="mt-4 max-h-[50vh] overflow-y-auto pr-4">
                           <div className="space-y-4">
                             {movements.length > 0 ? movements.map(mov => (
                                <div key={mov.id} className="flex items-start gap-4">
                                   <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${mov.type === 'Entrée' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {mov.type === 'Entrée' ? <ArrowRight className="h-5 w-5"/> : <ArrowLeft className="h-5 w-5"/>}
                                   </div>
                                   <div className="flex-1">
                                        <p className="font-semibold">{mov.type} - {format(new Date(mov.date), "d MMM yyyy 'à' HH:mm", {locale: fr})}</p>
                                        <p className="text-sm text-muted-foreground">{mov.itemsDescription}</p>
                                        {mov.notes && <p className="text-xs italic mt-1 border-l-2 pl-2">Note: {mov.notes}</p>}
                                   </div>
                                </div>
                             )) : <p className="text-center text-muted-foreground py-8">Aucun mouvement enregistré.</p>}
                           </div>
                        </TabsContent>
                        <TabsContent value="movement" className="mt-4">
                             <Form {...movementForm}>
                                <form onSubmit={movementForm.handleSubmit(onMovementSubmit)} className="space-y-4">
                                     <FormField control={movementForm.control} name="type" render={({ field }) => (
                                        <FormItem><FormLabel>Type de mouvement</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Entrée">Entrée</SelectItem><SelectItem value="Sortie">Sortie</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                     )}/>
                                      <FormField control={movementForm.control} name="itemsDescription" render={({ field }) => (
                                        <FormItem><FormLabel>Description des objets</FormLabel><FormControl><Textarea placeholder="ex: 10 cartons, 1 canapé, 2 vélos..." {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                      <FormField control={movementForm.control} name="notes" render={({ field }) => (
                                        <FormItem><FormLabel>Notes (facultatif)</FormLabel><FormControl><Input placeholder="ex: Le client a repris le vélo bleu." {...field} /></FormControl><FormMessage /></FormItem>
                                     )}/>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader2 className="mr-2 animate-spin"/> : <Package className="mr-2"/>} Enregistrer
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
