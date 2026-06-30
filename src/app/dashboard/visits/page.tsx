'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, PlusCircle, Loader2, Contact, Check, X, MoreHorizontal, LayoutGrid, List, CalendarDays, ExternalLink, PenSquare, Trash2 } from "lucide-react";

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
import { Visit, createVisit, getVisits, updateVisitStatus, deleteVisit, VisitStatus, VisitType } from "@/services/visitService";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarView } from "@/components/calendar";
import { PlanningEvent } from "@/services/planningService";
import { updateRequestStatus } from "@/services/requestService";
import { useRouter } from "next/navigation";

const visitSchema = z.object({
  commercialName: z.string().min(2, "Le nom du commercial est requis."),
  clientName: z.string().min(2, "Le nom du client est requis."),
  clientAddress: z.string().min(5, "L'adresse est requise."),
  visitDateTime: z.date({ required_error: "La date et l'heure sont requises." }),
  type: z.enum(['domicile', 'téléphone', 'visio']),
  details: z.string().optional(),
});

export default function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("liste");
  const [linkedRequestId, setLinkedRequestId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof visitSchema>>({
    resolver: zodResolver(visitSchema),
    defaultValues: {
      commercialName: "Jean Dupont",
      clientName: "",
      clientAddress: "",
      visitDateTime: new Date(),
      type: "domicile",
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
    
    // Check if we arrived from Requests page to prefill the form
    const prefillData = sessionStorage.getItem('prefillVisit');
    if (prefillData) {
        try {
            const parsed = JSON.parse(prefillData);
            form.setValue('clientName', parsed.clientName);
            form.setValue('clientAddress', parsed.clientAddress);
            if (parsed.requestId) {
                setLinkedRequestId(parsed.requestId);
            }
            setIsDialogOpen(true);
            sessionStorage.removeItem('prefillVisit');
        } catch(e) {}
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof visitSchema>) => {
    setIsSubmitting(true);
    try {
      await createVisit({
        ...values,
        details: values.details ?? "",
      });

      if (linkedRequestId) {
          await updateRequestStatus(linkedRequestId, 'Converti en visite');
          setLinkedRequestId(null);
      }

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

  const handleDeleteVisit = async (id: string) => {
      try {
          await deleteVisit(id);
          toast({ title: "Visite supprimée", description: "La visite a été retirée." });
          loadVisits();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible de supprimer la visite." });
      }
  };

  const handleConvertToQuote = (visit: Visit) => {
      // Pass data to Quote Editor
      sessionStorage.setItem('prefillQuote', JSON.stringify({
          clientName: visit.clientName,
          originAddress: visit.clientAddress,
          visitId: visit.id
      }));
      router.push('/dashboard/quote'); // redirect to quote editor
  }

  const getStatusVariant = (status: VisitStatus) => {
    switch (status) {
      case 'Planifiée': return 'secondary';
      case 'Effectuée': return 'default';
      case 'Annulée': return 'destructive';
      default: return 'outline';
    }
  };

  // Convert visits to PlanningEvents for the calendar
  const calendarEvents: PlanningEvent[] = visits.map(v => ({
      id: `visit-${v.id}`,
      title: `${v.type === 'domicile' ? '🏠' : (v.type === 'visio' ? '💻' : '📞')} ${v.clientName}`,
      date: v.visitDateTime,
      type: 'commercial',
      details: `${v.commercialName} - ${v.clientAddress}`
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Visites Commerciales</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg shadow-primary/20"><PlusCircle className="mr-2 h-4 w-4" /> Planifier une visite</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] rounded-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <DialogHeader>
                  <DialogTitle>Planifier une nouvelle visite</DialogTitle>
                  <DialogDescription>
                    Renseignez les informations pour l'évaluation du volume.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <FormField control={form.control} name="clientName" render={({ field }) => (
                    <FormItem><FormLabel>Nom du prospect</FormLabel><FormControl><Input placeholder="ex: Société Dupont" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="clientAddress" render={({ field }) => (
                    <FormItem><FormLabel>Adresse de la visite</FormLabel><FormControl><Input placeholder="ex: 123 Rue de la République, Paris" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type de visite</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez le type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="domicile">À domicile</SelectItem>
                            <SelectItem value="visio">En Visio</SelectItem>
                            <SelectItem value="téléphone">Par téléphone</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="commercialName" render={({ field }) => (
                    <FormItem><FormLabel>Commercial assigné</FormLabel><FormControl><Input placeholder="ex: Jean Commercial" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="visitDateTime" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Date et heure de la visite</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPPP 'à' HH:mm", { locale: fr }) : <span>Choisir une date et une heure</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={(date) => {
                              if (date) {
                                  const newDate = field.value || new Date();
                                  newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                                  field.onChange(new Date(newDate));
                              }
                          }} initialFocus locale={fr} />
                          <div className="p-3 border-t flex items-center justify-between">
                            <span className="text-sm text-slate-500 font-medium">Heure :</span>
                            <Input type="time" className="w-24 h-8 text-sm" value={field.value ? format(field.value, "HH:mm") : "09:00"} onChange={(e) => {
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
                    <FormItem><FormLabel>Notes (facultatif)</FormLabel><FormControl><Textarea placeholder="ex: Vérifier accès par l'escalier B..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className="rounded-full w-full">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Enregistrer la visite
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full">
                    <TabsTrigger value="liste" className="rounded-full px-4"><List className="h-4 w-4 mr-2"/> Liste</TabsTrigger>
                    <TabsTrigger value="grille" className="rounded-full px-4"><LayoutGrid className="h-4 w-4 mr-2"/> Grille</TabsTrigger>
                    <TabsTrigger value="calendrier" className="rounded-full px-4"><CalendarDays className="h-4 w-4 mr-2"/> Calendrier</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="liste">
                <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="pl-6">Client & Type</TableHead>
                                <TableHead>Date Prévue</TableHead>
                                <TableHead>Commercial</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({length: 4}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="pl-6"><Skeleton className="h-5 w-40"/></TableCell>
                                        <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                        <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                        <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                                        <TableCell className="text-right pr-6"><Skeleton className="h-8 w-8 ml-auto"/></TableCell>
                                    </TableRow>
                                ))
                            ) : visits.length > 0 ? (
                                visits.map(visit => (
                                    <TableRow key={visit.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <TableCell className="pl-6">
                                            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                {visit.type === 'domicile' ? '🏠' : (visit.type === 'visio' ? '💻' : '📞')}
                                                {visit.clientName}
                                            </div>
                                            <p className="text-[10px] text-slate-500">{visit.clientAddress}</p>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium">
                                            {format(new Date(visit.visitDateTime), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                                        </TableCell>
                                        <TableCell className="text-xs">{visit.commercialName}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(visit.status)} className="text-[10px] uppercase font-black tracking-widest">{visit.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl p-2 w-56">
                                                <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase text-slate-400">Suivi Visite</DropdownMenuLabel>
                                                
                                                {visit.status === 'Planifiée' && (
                                                    <>
                                                    <DropdownMenuItem className="rounded-xl" onClick={() => handleUpdateStatus(visit.id, 'Effectuée')}>
                                                        <Check className="mr-2 h-4 w-4 text-emerald-500" /> Marquer comme effectuée
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => handleUpdateStatus(visit.id, 'Annulée')}>
                                                        <X className="mr-2 h-4 w-4" /> Marquer comme annulée
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="mx-2"/>
                                                    </>
                                                )}
                                                
                                                <DropdownMenuItem onClick={() => handleConvertToQuote(visit)} className="rounded-xl font-bold text-primary bg-primary/10 hover:bg-primary/20">
                                                    <PenSquare className="mr-2 h-4 w-4" /> Chiffrer (Créer Devis)
                                                </DropdownMenuItem>
                                                
                                                <DropdownMenuSeparator className="mx-2"/>
                                                <DropdownMenuItem className="rounded-xl text-red-600 focus:bg-red-50 focus:text-red-600" onClick={() => handleDeleteVisit(visit.id)}>
                                                    <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-32">
                                        <Contact className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                        <span className="text-slate-400 italic">Aucune visite.</span>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="grille">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-48 rounded-[2rem]" />)
                    ) : visits.length > 0 ? (
                        visits.map(visit => (
                            <Card key={visit.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-slate-900">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <Badge variant={getStatusVariant(visit.status)} className="text-[10px] uppercase font-black">{visit.status}</Badge>
                                        <span className="text-xl" title={visit.type}>{visit.type === 'domicile' ? '🏠' : (visit.type === 'visio' ? '💻' : '📞')}</span>
                                    </div>
                                    <CardTitle className="mt-2">{visit.clientName}</CardTitle>
                                    <CardDescription className="line-clamp-1">{visit.clientAddress}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="text-xs font-medium text-slate-500 mb-1">📅 {format(new Date(visit.visitDateTime), "d MMM yyyy à HH:mm", { locale: fr })}</div>
                                    <div className="text-xs text-slate-400">👤 {visit.commercialName}</div>
                                </CardContent>
                                <CardFooter className="pt-0 flex gap-2">
                                    {visit.status === 'Planifiée' && (
                                        <Button size="sm" variant="outline" className="w-full text-xs rounded-full" onClick={() => handleUpdateStatus(visit.id, 'Effectuée')}>
                                            <Check className="h-3 w-3 mr-1 text-emerald-500"/> Fait
                                        </Button>
                                    )}
                                    <Button size="sm" className="w-full text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20" onClick={() => handleConvertToQuote(visit)}>
                                        Chiffrer
                                    </Button>
                                    <Button size="sm" variant="outline" className="w-full text-xs rounded-full text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleDeleteVisit(visit.id)}>
                                        Supprimer
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-400">Aucune visite.</div>
                    )}
                </div>
            </TabsContent>

            <TabsContent value="calendrier">
                {loading ? <Skeleton className="h-[600px] w-full rounded-[2rem]" /> : (
                    <div className="rounded-[2rem] overflow-hidden bg-white shadow-sm border-none dark:bg-slate-900 p-6">
                        <CalendarView events={calendarEvents} />
                    </div>
                )}
            </TabsContent>
       </Tabs>
    </div>
  );
}
