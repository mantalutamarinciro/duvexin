'use client';

import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Wallet, PlusCircle, Loader2, MoreHorizontal, Pencil, Trash2, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Expense, createExpense, getExpenses, updateExpense, deleteExpense, ExpenseFormData } from "@/services/expenseService";
import { getQuotes } from "@/services/quoteService";
import type { Quote } from "@/types/quote";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const expenseCategories = ['Carburant', 'Matériel', 'Salaires', 'Assurance', 'Marketing', 'Autre'] as const;
const COLORS = ['#00ad9f', '#0f172a', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'];

const expenseSchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Date invalide" }),
  amount: z.coerce.number().positive("Le montant doit être positif"),
  category: z.enum(expenseCategories),
  description: z.string().min(3, "La description est trop courte"),
  bookingId: z.string().optional().or(z.literal("")),
});

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  
  // Delete Alert states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const { toast } = useToast();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: 'Autre',
      description: "",
      bookingId: "none",
    },
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedExpenses, fetchedQuotes] = await Promise.all([
          getExpenses(),
          getQuotes()
      ]);
      setExpenses(fetchedExpenses);
      
      // Filter out quotes that are just "Chiffré" to only show real potential bookings, or just show all.
      // Let's show all that have a clientName.
      setQuotes(fetchedQuotes.filter(q => q.clientName));
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les données." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    let total = 0;
    const byCategory: Record<string, number> = {};
    
    expenses.forEach(exp => {
        total += exp.amount;
        byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });

    const chartData = Object.entries(byCategory).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
    const topCategory = chartData.length > 0 ? chartData[0] : null;

    return { total, chartData, topCategory };
  }, [expenses]);

  const handleOpenCreate = () => {
      setExpenseToEdit(null);
      form.reset({
          date: new Date().toISOString().split('T')[0],
          amount: 0,
          category: 'Autre',
          description: "",
          bookingId: "none",
      });
      setIsDialogOpen(true);
  };

  const handleOpenEdit = (expense: Expense) => {
      setExpenseToEdit(expense);
      form.reset({
          date: expense.date.split('T')[0],
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          bookingId: expense.bookingId || "none",
      });
      setIsDialogOpen(true);
  };

  const onSubmit = async (values: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      const payload = { ...values };
      if (payload.bookingId === "none") {
          payload.bookingId = "";
      }

      if (expenseToEdit) {
          await updateExpense(expenseToEdit.id, payload);
          toast({ title: "Dépense modifiée", description: "La dépense a été mise à jour avec succès." });
      } else {
          await createExpense(payload);
          toast({ title: "Dépense ajoutée", description: "La nouvelle dépense a été enregistrée avec succès." });
      }
      setIsDialogOpen(false);
      loadData();
    } catch (error) {
      toast({ variant: 'destructive', title: "Erreur", description: "Impossible d'enregistrer la dépense." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
      if (!expenseToDelete) return;
      try {
          await deleteExpense(expenseToDelete.id);
          toast({ title: "Dépense supprimée", description: "La dépense a été supprimée définitivement." });
          loadData();
      } catch (error) {
          toast({ variant: 'destructive', title: "Erreur", description: "Impossible de supprimer la dépense." });
      } finally {
          setIsDeleteDialogOpen(false);
          setExpenseToDelete(null);
      }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Tableau de bord financier</h1>
         <Button onClick={handleOpenCreate}><PlusCircle className="mr-2 h-4 w-4" /> Nouvelle dépense</Button>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-sm bg-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Dépenses</CardTitle>
                <Wallet className="h-4 w-4 opacity-75" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{stats.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
                <p className="text-xs opacity-75 mt-1">Sur l'ensemble de l'historique</p>
            </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">Poste de dépense n°1</CardTitle>
                <TrendingUp className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-800">{stats.topCategory ? stats.topCategory.name : '-'}</div>
                <p className="text-xs text-slate-500 mt-1">
                    {stats.topCategory ? `${stats.topCategory.value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} au total` : 'Aucune donnée'}
                </p>
            </CardContent>
        </Card>

        <Card className="border-0 shadow-sm lg:row-span-2 flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 flex items-center">
                    <PieChartIcon className="mr-2 h-4 w-4" />
                    Répartition par catégorie
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[250px]">
                {stats.chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={stats.chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {stats.chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                formatter={(value: number) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-sm text-slate-400">Aucune donnée</div>
                )}
            </CardContent>
        </Card>

        <Card className="border-0 shadow-sm md:col-span-2">
            <CardHeader>
                <CardTitle>Historique des dépenses</CardTitle>
                <CardDescription>Liste détaillée de toutes les dépenses enregistrées.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Chantier associé</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                      Array.from({length: 5}).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-5 w-48"/></TableCell>
                          <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                          <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                          <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto"/></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ))
                    ) : expenses.length > 0 ? (
                      expenses.map((expense) => {
                          const associatedQuote = quotes.find(q => q.id === expense.bookingId);
                          return (
                          <TableRow key={expense.id}>
                              <TableCell className="font-medium">{expense.description}</TableCell>
                              <TableCell>
                                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                                      {expense.category}
                                  </span>
                              </TableCell>
                              <TableCell>{format(new Date(expense.date), "d MMM yyyy", { locale: fr })}</TableCell>
                              <TableCell className="text-xs text-slate-500">
                                  {associatedQuote ? `${associatedQuote.clientName} (${associatedQuote.id.substring(0,6).toUpperCase()})` : '-'}
                              </TableCell>
                              <TableCell className="text-right font-semibold">{expense.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-xl">
                                        <DropdownMenuItem onClick={() => handleOpenEdit(expense)} className="cursor-pointer">
                                            <Pencil className="mr-2 h-4 w-4" /> Modifier
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { setExpenseToDelete(expense); setIsDeleteDialogOpen(true); }} className="cursor-pointer text-red-600 focus:text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                          </TableRow>
                          )
                      })
                    ) : (
                       <TableRow>
                            <TableCell colSpan={6} className="text-center h-24">
                                <Wallet className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                                <p className="text-sm text-slate-500">Aucune dépense enregistrée.</p>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>{expenseToEdit ? 'Modifier la dépense' : 'Ajouter une dépense'}</DialogTitle>
                        <DialogDescription>
                            {expenseToEdit ? 'Corrigez les informations de cette dépense.' : 'Enregistrez une nouvelle dépense pour suivre la rentabilité.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                            <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Input placeholder="ex: Plein d'essence camion A" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Montant (€)</FormLabel>
                                        <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                        <FormLabel>Date de la dépense</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal mt-1", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(new Date(field.value), "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={new Date(field.value)} onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez..." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {expenseCategories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                            </FormItem>
                            )}
                        />
                            <FormField
                            control={form.control}
                            name="bookingId"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chantier associé (facultatif)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || "none"}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Aucun chantier associé" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">-- Aucun chantier --</SelectItem>
                                    {quotes.map(q => (
                                        <SelectItem key={q.id} value={q.id}>
                                            {q.clientName} - {q.originAddress?.split(',')[0]} ➔ {q.destinationAddress?.split(',')[0]} ({q.id.substring(0,5).toUpperCase()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {expenseToEdit ? 'Mettre à jour' : 'Enregistrer'}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La dépense "{expenseToDelete?.description}" ({expenseToDelete?.amount} €) sera supprimée définitivement de votre historique comptable.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
