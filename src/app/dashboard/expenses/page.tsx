
'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Wallet, PlusCircle, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Expense, createExpense, getExpenses, ExpenseFormData } from "@/services/expenseService";

const expenseCategories = [
    'Carburant',
    'Matériel',
    'Salaires',
    'Assurance',
    'Marketing',
    'Autre',
] as const;

const expenseSchema = z.object({
  date: z.string().refine((d) => !isNaN(Date.parse(d)), { message: "Date invalide" }),
  amount: z.coerce.number().positive("Le montant doit être positif"),
  category: z.enum(expenseCategories),
  description: z.string().min(3, "La description est trop courte"),
  bookingId: z.string().optional(),
});


export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      amount: 0,
      category: 'Autre',
      description: "",
      bookingId: "",
    },
  });

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const fetchedExpenses = await getExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "Erreur",
        description: "Impossible de charger les dépenses."
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const onSubmit = async (values: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      await createExpense(values);
      toast({
        title: "Dépense ajoutée",
        description: "La nouvelle dépense a été enregistrée avec succès."
      });
      setIsDialogOpen(false);
      form.reset();
      loadExpenses(); // Refresh list
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Erreur",
        description: "Impossible d'enregistrer la dépense."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Gestion des dépenses</h1>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2" /> Nouvelle dépense</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Ajouter une dépense</DialogTitle>
                            <DialogDescription>
                                Enregistrez une nouvelle dépense pour suivre la rentabilité.
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
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(new Date(field.value), "PPP", { locale: fr })
                                            ) : (
                                                <span>Choisissez une date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={new Date(field.value)}
                                            onSelect={(date) => field.onChange(date?.toISOString().split('T')[0])}
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catégorie</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                    <FormLabel>ID de réservation (facultatif)</FormLabel>
                                    <FormControl><Input placeholder="ex: aBCd123efG" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 animate-spin" />}
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
         </Dialog>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Historique des dépenses</CardTitle>
            <CardDescription>Liste de toutes les dépenses enregistrées pour votre entreprise.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>ID Réservation</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                  Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-48"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-20"/></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto"/></TableCell>
                    </TableRow>
                  ))
                ) : expenses.length > 0 ? (
                  expenses.map((expense) => (
                  <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{format(new Date(expense.date), "d MMMM yyyy", { locale: fr })}</TableCell>
                      <TableCell className="font-mono text-xs">{expense.bookingId || 'N/A'}</TableCell>
                      <TableCell className="text-right font-semibold">{expense.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                  </TableRow>
                  ))
                ) : (
                   <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">
                            <Wallet className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                            Aucune dépense enregistrée.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
