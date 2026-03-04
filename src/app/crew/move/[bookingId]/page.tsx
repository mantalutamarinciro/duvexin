'use client';

import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getBookingById, updateBookingStatus, Booking, BookingStatus } from "@/services/bookingService";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Package, User, Phone, Truck, Loader2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { serviceTypeLabels } from "@/lib/quote-constants";

const availableActions: Partial<Record<BookingStatus, { nextStatus: BookingStatus; label: string }[]>> = {
    'Programmé': [{ nextStatus: 'En route', label: "Commencer le trajet" }],
    'En route': [{ nextStatus: 'Arrivé chez le client', label: "Confirmer l'arrivée" }],
    'Arrivé chez le client': [{ nextStatus: 'En cours', label: "Commencer le déménagement" }],
    'En cours': [{ nextStatus: 'Terminé', label: "Terminer le déménagement" }],
};

export default function MoveDetailsPage({ params }: { params: { bookingId: string } }) {
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const fetchBooking = async () => {
        setLoading(true);
        try {
            const data = await getBookingById(params.bookingId);
            if (!data) {
                notFound();
            }
            setBooking(data);
        } catch (error) {
            console.error("Failed to fetch booking", error);
            toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger les détails du déménagement." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooking();
    }, [params.bookingId]);

    const handleStatusUpdate = async (newStatus: BookingStatus) => {
        if (!booking) return;
        setIsUpdating(true);
        try {
            await updateBookingStatus(booking.id, newStatus);
            setBooking(prev => prev ? { ...prev, status: newStatus } : null);
            toast({ title: "Statut mis à jour !", description: `Le statut du déménagement est maintenant : ${newStatus}` });
        } catch (error) {
            toast({ variant: 'destructive', title: "Erreur", description: "La mise à jour du statut a échoué." });
        } finally {
            setIsUpdating(false);
        }
    }
    
    if (loading) {
        return (
             <div className="w-full max-w-4xl mx-auto space-y-6">
                <Skeleton className="h-12 w-1/2" />
                <Card><CardHeader><Skeleton className="h-8 w-3/4"/></CardHeader><CardContent><Skeleton className="h-48 w-full"/></CardContent></Card>
                <Card><CardHeader><Skeleton className="h-8 w-3/4"/></CardHeader><CardContent><Skeleton className="h-24 w-full"/></CardContent></Card>
            </div>
        )
    }

    if (!booking) {
        return null;
    }
    
    const actions = availableActions[booking.status] || [];

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            <div>
                 <Button variant="link" className="p-0 mb-2" asChild><Link href={`/crew/${booking.assignedTeamId}`}>&larr; Retour au planning</Link></Button>
                 <h1 className="text-3xl font-bold">Déménagement pour {booking.clientName}</h1>
                <p className="text-muted-foreground">ID: {booking.id}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Mise à jour du statut</CardTitle>
                    <CardDescription>Mettez à jour le statut en temps réel pour informer le client et l'agence.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                   <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Statut actuel</p>
                        <p className="text-2xl font-bold text-primary">{booking.status}</p>
                   </div>
                   <div className="flex gap-2">
                       {booking.status === 'Terminé' ? (
                           <div className="flex items-center gap-2 text-green-600 font-semibold p-3 bg-green-50 rounded-lg">
                               <CheckCircle />
                               <span>Déménagement terminé !</span>
                           </div>
                       ) : (
                           actions.map(action => (
                               <Button key={action.nextStatus} onClick={() => handleStatusUpdate(action.nextStatus)} disabled={isUpdating} size="lg">
                                   {isUpdating && <Loader2 className="mr-2 animate-spin"/>}
                                   {action.label}
                               </Button>
                           ))
                       )}
                   </div>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader><CardTitle>Informations sur le client</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center gap-3"><User className="h-5 w-5 text-muted-foreground"/><p>{booking.clientName}</p></div>
                    <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-muted-foreground"/><p>{booking.clientPhone || "Non fourni"}</p></div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Détails du déménagement</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <p className="font-semibold">Adresse de départ</p>
                            <p className="text-muted-foreground">{booking.originAddress}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-1 text-primary"/>
                        <div>
                            <p className="font-semibold">Adresse d'arrivée</p>
                            <p className="text-muted-foreground">{booking.destinationAddress}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-muted-foreground"/><p>{format(new Date(booking.moveDate), "eeee d MMMM yyyy 'à' HH:mm", { locale: fr })}</p></div>
                     <div className="flex items-center gap-3"><Package className="h-5 w-5 text-muted-foreground"/><p>Volume estimé: {booking.volume} m³</p></div>
                     <div className="flex items-center gap-3"><User className="h-5 w-5 text-muted-foreground"/><p>Type de service: {serviceTypeLabels[booking.serviceType || 'basic']}</p></div>
                     <div className="flex items-center gap-3"><Truck className="h-5 w-5 text-muted-foreground"/><p>Véhicule: {booking.assignedVehicleRegistration || "Non spécifié"}</p></div>
                </CardContent>
            </Card>
        </div>
    );
}
