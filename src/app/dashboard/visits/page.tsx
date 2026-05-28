
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, PlusCircle, Loader2, Contact, Check, X, MoreHorizontal } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Visit, createVisit, getVisits, updateVisitStatus, VisitFormData, VisitStatus } from "@/services/visitService";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const visitSchema = z.object({
  commercialName: z.string().min(2, "Le nom du commercial est requis."),
  clientName: z.string().min(2, "Le nom du client est requis."),
  clientAddress: z.string().min(5, "L'adresse est requise."),
  visitDateTime: z.date({ required_error: "La date et l'heure sont requises." }),
  details: z.string().optional(),
});

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof visitSchema>>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      commercialName: "",
      clientName: "",
      clientAddress: "",
      visitDateTime: new Date(),
      details: "",
    },
  });

  const loadVisits = async () => {
    setLoading(true);
    try {
      const fetchedVisits = await getVisits();
      setVisits(fetchedVisits);
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les visites." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const onSubmit = async (values: z.infer<typeof visitSchema>) => {
    setIsSubmitting(true);
    try {
      await createVisit({
        ...values,
        details: values.details ?? "",
      });
      toast({ title: "Visite planifiée", description: "La nouvelle visite a été enregistrée." });
      setIsDialogOpen(false);
      form.reset();
      loadVisits();
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de planifier la visite." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: VisitStatus) => {
    try {
      await updateVisitStatus(id, status);
      toast({ title: "Statut mis à jour", description: "Le statut de la visite a été modifié." });
      loadVisits();
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de mettre à jour le statut." });
    }
  };

  const getStatusVariant = (status: VisitStatus) => {
    switch (status) {
      case 'Prévue': return 'secondary';
      case 'Effectuée': return 'default';
      case 'Annulée': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Suivi des Visites Commerciales</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2" /> Planifier une visite</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                  <DialogTitle>Planifier une nouvelle visite</DialogTitle>
                  <DialogDescription>
                    Renseignez les informations de la visite commerciale.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <FormField control={form.control} name="clientName" render={({ field }) => (
                    <FormItem><FormLabel>Nom du client</FormLabel><FormControl><Input placeholder="ex: Société Dupont" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="clientAddress" render={({ field }) => (
                    <FormItem><FormLabel>Adresse de la visite</FormLabel><FormControl><Input placeholder="ex: 123 Rue de la République, Paris" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="commercialName" render={({ field }) => (
                    <FormItem><FormLabel>Commercial assigné</FormLabel><FormControl><Input placeholder="ex: Jean Commercial" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="visitDateTime" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Date et heure</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP à HH:mm", { locale: fr }) : <span>Date et heure</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          {/* Note: Time picker would require a more complex component */}
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )} />
                   <FormField control={form.control} name="details" render={({ field }) => (
                    <FormItem><FormLabel>Détails / Objectifs (facultatif)</FormLabel><FormControl><Textarea placeholder="ex: Visite pour devis 50m3, vérifier accès camion..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Planifier
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Liste des Visites</CardTitle>
            <CardDescription>Consultez et gérez toutes les visites commerciales planifiées.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Commercial</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        Array.from({length: 4}).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-40"/></TableCell>
                                <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto"/></TableCell>
                            </TableRow>
                        ))
                    ) : visits.length > 0 ? (
                        visits.map(visit => (
                            <TableRow key={visit.id}>
                                <TableCell className="font-medium">{visit.clientName}<p className="text-xs text-muted-foreground">{visit.clientAddress}</p></TableCell>
                                <TableCell>{format(new Date(visit.visitDateTime), "d MMMM yyyy 'à' HH:mm", { locale: fr })}</TableCell>
                                <TableCell>{visit.commercialName}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(visit.status)}>{visit.status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  {visit.status === 'Prévue' && (
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
                                        <DropdownMenuItem onClick={() => handleUpdateStatus(visit.id, 'Effectuée')}>
                                          <Check className="mr-2 h-4 w-4" /> Marquer comme effectuée
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleUpdateStatus(visit.id, 'Annulée')}>
                                          <X className="mr-2 h-4 w-4" /> Marquer comme annulée
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                <Contact className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                                Aucune visite planifiée.
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
