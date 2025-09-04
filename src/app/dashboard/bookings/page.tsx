
'use client';

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getBookings, Booking } from "@/services/bookingService";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


const getBadgeVariant = (status: Booking['status']) => {
    switch (status) {
        case "Programmé": return "secondary";
        case "En cours": return "default";
        case "Terminé": return "outline";
        case "Annulé": return "destructive";
        default: return "secondary";
    }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const fetchedBookings = await getBookings();
        setBookings(fetchedBookings);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: "Erreur",
          description: "Impossible de charger les réservations."
        })
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, [toast]);


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Réservations</h1>
        <Button asChild>
            <Link href="/dashboard/quote">
                <PlusCircle className="mr-2" />
                Nouvelle réservation (via devis)
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Déménagements à venir et récents</CardTitle>
            <CardDescription>Liste de toutes les réservations confirmées.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                  Array.from({length: 5}).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                      <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                      <TableCell><Skeleton className="h-6 w-24 rounded-full"/></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-20 ml-auto"/></TableCell>
                      <TableCell><Skeleton className="h-8 w-8 ml-auto"/></TableCell>
                    </TableRow>
                  ))
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                  <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.clientName}</TableCell>
                      <TableCell>{format(new Date(booking.moveDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                      <TableCell>
                      <Badge variant={getBadgeVariant(booking.status)}>{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{booking.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</TableCell>
                      <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Ouvrir le menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem disabled>Assigner une équipe</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" disabled>Annuler le déménagement</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      </TableCell>
                  </TableRow>
                  ))
                ) : (
                   <TableRow>
                        <TableCell colSpan={5} className="text-center h-24">Aucune réservation trouvée.</TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
