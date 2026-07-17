'use client';

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteCustomer, getCustomers, updateCustomer, type Customer } from "@/services/customerService";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Euro,
  Eye,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Search,
  SlidersHorizontal,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const pageSizeOptions = [25, 50, 100, 200];

type CustomerFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

const getCustomerName = (customer: Customer) => `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || customer.email;

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [revenueFilter, setRevenueFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formState, setFormState] = useState<CustomerFormState>({ firstName: "", lastName: "", email: "", phoneNumber: "" });

  const { toast } = useToast();

  const loadCustomers = async () => {
    setLoading(true);
    try {
      setCustomers(await getCustomers());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCustomers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [search, activityFilter, bookingFilter, revenueFilter, contactFilter, pageSize]);

  const hasActiveFilters = Boolean(
    search ||
    activityFilter !== "all" ||
    bookingFilter !== "all" ||
    revenueFilter !== "all" ||
    contactFilter !== "all"
  );

  const filteredCustomers = useMemo(() => customers.filter((customer) => {
    const query = search.trim().toLowerCase();
    const fullName = getCustomerName(customer);
    const matchesSearch = !query ||
      fullName.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      (customer.phoneNumber && customer.phoneNumber.toLowerCase().includes(query));

    const lastActivity = customer.lastBookingDate || customer.createdAt;
    const lastActivityDate = new Date(lastActivity);
    const ageInDays = Number.isNaN(lastActivityDate.getTime())
      ? Number.POSITIVE_INFINITY
      : (Date.now() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24);
    const matchesActivity =
      activityFilter === "all" ||
      (activityFilter === "30d" && ageInDays <= 30) ||
      (activityFilter === "90d" && ageInDays <= 90) ||
      (activityFilter === "inactive" && ageInDays > 90);

    const bookings = Number(customer.bookingsCount || 0);
    const matchesBookings =
      bookingFilter === "all" ||
      (bookingFilter === "none" && bookings === 0) ||
      (bookingFilter === "one" && bookings === 1) ||
      (bookingFilter === "repeat" && bookings >= 2);

    const totalSpent = Number(customer.totalSpent || 0);
    const matchesRevenue =
      revenueFilter === "all" ||
      (revenueFilter === "none" && totalSpent === 0) ||
      (revenueFilter === "low" && totalSpent > 0 && totalSpent < 1000) ||
      (revenueFilter === "high" && totalSpent >= 1000);

    const hasPhone = Boolean(customer.phoneNumber && customer.phoneNumber.trim());
    const matchesContact =
      contactFilter === "all" ||
      (contactFilter === "complete" && hasPhone) ||
      (contactFilter === "missing-phone" && !hasPhone);

    return matchesSearch && matchesActivity && matchesBookings && matchesRevenue && matchesContact;
  }), [customers, search, activityFilter, bookingFilter, revenueFilter, contactFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + pageSize);
  const pageIds = paginatedCustomers.map((customer) => customer.id);
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
  const somePageSelected = pageIds.some((id) => selectedIds.includes(id));
  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + Number(customer.totalSpent || 0), 0);
  const repeatCustomers = filteredCustomers.filter((customer) => Number(customer.bookingsCount || 0) >= 2).length;

  const resetFilters = () => {
    setSearch("");
    setActivityFilter("all");
    setBookingFilter("all");
    setRevenueFilter("all");
    setContactFilter("all");
  };

  const toggleCustomer = (id: string, checked: boolean) => {
    setSelectedIds((ids) => checked ? Array.from(new Set([...ids, id])) : ids.filter((selectedId) => selectedId !== id));
  };

  const togglePage = (checked: boolean) => {
    setSelectedIds((ids) => checked
      ? Array.from(new Set([...ids, ...pageIds]))
      : ids.filter((id) => !pageIds.includes(id))
    );
  };

  const openEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormState({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      email: customer.email || "",
      phoneNumber: customer.phoneNumber || "",
    });
  };

  const handleSaveCustomer = async () => {
    if (!editingCustomer) return;
    if (!formState.email.trim()) {
      toast({ variant: "destructive", title: "Email obligatoire", description: "Le client doit avoir une adresse email." });
      return;
    }

    setSaving(true);
    try {
      await updateCustomer(editingCustomer.id, formState);
      toast({ title: "Client modifie", description: "La fiche client a ete mise a jour." });
      setEditingCustomer(null);
      await loadCustomers();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error?.message || "Impossible de modifier le client." });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
    try {
      await deleteCustomer(customerToDelete.id);
      setSelectedIds((ids) => ids.filter((id) => id !== customerToDelete.id));
      toast({ title: "Client supprime", description: `${getCustomerName(customerToDelete)} a ete supprime.` });
      setCustomerToDelete(null);
      await loadCustomers();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error?.message || "Impossible de supprimer le client." });
    }
  };

  const handleBulkDelete = async () => {
    const ids = [...selectedIds];
    try {
      await Promise.all(ids.map((id) => deleteCustomer(id)));
      setSelectedIds([]);
      setBulkDeleteOpen(false);
      toast({ title: "Clients supprimes", description: `${ids.length} client(s) supprime(s).` });
      await loadCustomers();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error?.message || "Suppression multiple impossible." });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Base Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">Liste clients paginee avec selection, edition et actions rapides.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher nom, email, telephone..."
            className="pl-9 rounded-full bg-white dark:bg-slate-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Clients affiches</p>
              <p className="mt-1 text-2xl font-black">{filteredCustomers.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">Clients recurrents</p>
              <p className="mt-1 text-2xl font-black">{repeatCustomers}</p>
            </div>
            <Calendar className="h-8 w-8 text-emerald-500" />
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">CA filtre</p>
              <p className="mt-1 text-2xl font-black">{totalRevenue.toLocaleString('fr-FR')} EUR</p>
            </div>
            <Euro className="h-8 w-8 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:flex-row xl:items-center">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 xl:w-24">
          <SlidersHorizontal className="h-4 w-4" /> Filtres
        </div>
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={activityFilter} onValueChange={setActivityFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Activite" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toute activite</SelectItem>
              <SelectItem value="30d">Actifs 30 jours</SelectItem>
              <SelectItem value="90d">Actifs 90 jours</SelectItem>
              <SelectItem value="inactive">A relancer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={bookingFilter} onValueChange={setBookingFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Reservations" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes reservations</SelectItem>
              <SelectItem value="none">Sans reservation</SelectItem>
              <SelectItem value="one">1 reservation</SelectItem>
              <SelectItem value="repeat">Clients recurrents</SelectItem>
            </SelectContent>
          </Select>
          <Select value={revenueFilter} onValueChange={setRevenueFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Chiffre d'affaires" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous CA</SelectItem>
              <SelectItem value="none">Aucun CA</SelectItem>
              <SelectItem value="low">Moins de 1 000 EUR</SelectItem>
              <SelectItem value="high">1 000 EUR et plus</SelectItem>
            </SelectContent>
          </Select>
          <Select value={contactFilter} onValueChange={setContactFilter}>
            <SelectTrigger className="h-10 rounded-xl bg-slate-50 dark:bg-slate-950"><SelectValue placeholder="Coordonnees" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes coordonnees</SelectItem>
              <SelectItem value="complete">Telephone renseigne</SelectItem>
              <SelectItem value="missing-phone">Telephone manquant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-3 xl:justify-end">
          <span className="text-xs font-semibold text-slate-500">{filteredCustomers.length} / {customers.length}</span>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="rounded-full text-slate-500">
              <X className="mr-2 h-4 w-4" /> Reinitialiser
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Liste des clients</CardTitle>
            <CardDescription>Selectionnez, modifiez, supprimez ou ouvrez le dossier 360 d'un client.</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {selectedIds.length > 0 && (
              <>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelectedIds([])}>
                  <X className="mr-2 h-4 w-4" /> Deselectionner ({selectedIds.length})
                </Button>
                <Button variant="destructive" size="sm" className="rounded-full" onClick={() => setBulkDeleteOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Supprimer selection
                </Button>
              </>
            )}
            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="h-9 w-[150px] rounded-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>{size} / page</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allPageSelected || (somePageSelected ? 'indeterminate' : false)}
                      onCheckedChange={(checked) => togglePage(Boolean(checked))}
                      aria-label="Selectionner la page"
                    />
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Derniere activite</TableHead>
                  <TableHead className="text-right">Reservations</TableHead>
                  <TableHead className="text-right">CA</TableHead>
                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-5" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-56" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="ml-auto h-5 w-12" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="ml-auto h-5 w-16" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="ml-auto h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : paginatedCustomers.length > 0 ? (
                  paginatedCustomers.map((customer) => {
                    const customerName = getCustomerName(customer);
                    return (
                      <TableRow key={customer.id} data-state={selectedIds.includes(customer.id) ? 'selected' : undefined}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(customer.id)}
                            onCheckedChange={(checked) => toggleCustomer(customer.id, Boolean(checked))}
                            aria-label={`Selectionner ${customerName}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {(customer.firstName?.[0] || customer.email[0] || '?').toUpperCase()}{(customer.lastName?.[0] || '').toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <Link href={`/dashboard/customer-360?email=${encodeURIComponent(customer.email)}`} className="block truncate hover:text-primary hover:underline">
                                {customerName}
                              </Link>
                              <span className="text-xs text-muted-foreground">ID {customer.id.slice(0, 8)}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${customer.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
                              <Mail className="h-3 w-3" /> {customer.email}
                            </a>
                            {customer.phoneNumber ? (
                              <a href={`tel:${customer.phoneNumber}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
                                <Phone className="h-3 w-3" /> {customer.phoneNumber}
                              </a>
                            ) : (
                              <span className="text-xs italic text-muted-foreground">Telephone manquant</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          {customer.lastBookingDate ? format(new Date(customer.lastBookingDate), "d MMM yyyy", { locale: fr }) : "Aucune"}
                        </TableCell>
                        <TableCell className="text-right font-bold">{customer.bookingsCount || 0}</TableCell>
                        <TableCell className="text-right font-bold">{Number(customer.totalSpent || 0).toLocaleString('fr-FR')} EUR</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 rounded-xl">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => toggleCustomer(customer.id, !selectedIds.includes(customer.id))} className="cursor-pointer">
                                <UserCheck className="mr-2 h-4 w-4" /> {selectedIds.includes(customer.id) ? 'Deselectionner' : 'Selectionner'}
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href={`/dashboard/customer-360?email=${encodeURIComponent(customer.email)}`}>
                                  <Eye className="mr-2 h-4 w-4" /> Dossier 360
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEdit(customer)} className="cursor-pointer">
                                <Pencil className="mr-2 h-4 w-4" /> Modifier
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setCustomerToDelete(customer)} className="cursor-pointer text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center italic text-muted-foreground">
                      Aucun client trouve.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold text-slate-500">
              Affichage {filteredCustomers.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, filteredCustomers.length)} sur {filteredCustomers.length} client(s)
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={safeCurrentPage === 1} className="rounded-full">
                <ChevronLeft className="mr-1 h-4 w-4" /> Precedent
              </Button>
              <span className="text-xs font-semibold text-slate-500">Page {safeCurrentPage} / {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={safeCurrentPage === totalPages} className="rounded-full">
                Suivant <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingCustomer)} onOpenChange={(open) => !open && setEditingCustomer(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier le client</DialogTitle>
            <DialogDescription>Mettez a jour les coordonnees principales du client.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Prenom</label>
                <Input value={formState.firstName} onChange={(e) => setFormState((state) => ({ ...state, firstName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nom</label>
                <Input value={formState.lastName} onChange={(e) => setFormState((state) => ({ ...state, lastName: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email</label>
              <Input type="email" value={formState.email} onChange={(e) => setFormState((state) => ({ ...state, email: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Telephone</label>
              <Input value={formState.phoneNumber} onChange={(e) => setFormState((state) => ({ ...state, phoneNumber: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCustomer(null)} disabled={saving}>Annuler</Button>
            <Button onClick={handleSaveCustomer} disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(customerToDelete)} onOpenChange={(open) => !open && setCustomerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce client ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera la fiche client {customerToDelete ? getCustomerName(customerToDelete) : ''}. Les devis, demandes ou factures lies ne sont pas supprimes automatiquement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCustomer} className="bg-red-600 text-white hover:bg-red-700">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la selection ?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedIds.length} client(s) seront supprimes. Les documents commerciaux lies ne sont pas supprimes automatiquement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 text-white hover:bg-red-700">Supprimer la selection</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}