
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomers, Customer } from "@/services/customerService";
import { Mail, Phone, Calendar, Search, SlidersHorizontal, X, Euro, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [revenueFilter, setRevenueFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const hasActiveFilters = Boolean(
    search ||
    activityFilter !== "all" ||
    bookingFilter !== "all" ||
    revenueFilter !== "all" ||
    contactFilter !== "all"
  );

  const filteredCustomers = customers.filter((customer) => {
    const query = search.trim().toLowerCase();
    const fullName = `${customer.firstName} ${customer.lastName}`.trim();
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
  });

  const totalRevenue = filteredCustomers.reduce((sum, customer) => sum + Number(customer.totalSpent || 0), 0);
  const repeatCustomers = filteredCustomers.filter((customer) => Number(customer.bookingsCount || 0) >= 2).length;

  const resetFilters = () => {
    setSearch("");
    setActivityFilter("all");
    setBookingFilter("all");
    setRevenueFilter("all");
    setContactFilter("all");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Base Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">Filtrez, qualifiez et retrouvez rapidement les clients actifs ou a relancer.</p>
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
        <CardHeader>
          <CardTitle>Repertoire clients</CardTitle>
          <CardDescription>Liste de tous les clients ayant effectue une demande ou une reservation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Derniere activite</TableHead>
                <TableHead className="text-right">Reservations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-5 w-12 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {customer.firstName[0]}{customer.lastName[0]}
                        </div>
                        <Link
                          href={`/dashboard/customer-360?email=${encodeURIComponent(customer.email)}`}
                          className="hover:text-primary hover:underline"
                        >
                          {customer.firstName} {customer.lastName}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </div>
                        {customer.phoneNumber && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" /> {customer.phoneNumber}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      {customer.lastBookingDate ? format(new Date(customer.lastBookingDate), "d MMM yyyy", { locale: fr }) : "Aucune"}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {customer.bookingsCount || 0}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24 text-muted-foreground italic">
                    Aucun client trouve.
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
