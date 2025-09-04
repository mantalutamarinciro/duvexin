
"use client";

import { useEffect, useState } from "react";
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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getBookings, Booking } from "@/services/bookingService";
import { Mail, Loader2, Wand2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { generateReminderEmail, ReminderEmailOutput } from "@/ai/flows/generate-reminder-email";
import { Separator } from "@/components/ui/separator";


export default function CommunicationPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [generatingEmailFor, setGeneratingEmailFor] = useState<string | null>(null);
    const [generatedEmail, setGeneratedEmail] = useState<ReminderEmailOutput | null>(null);
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    const { toast } = useToast();

    const loadBookings = async () => {
        setLoading(true);
        try {
            const allBookings = await getBookings();
            // Filter for upcoming bookings
            const upcoming = allBookings.filter(b => (b.status === 'Programmé' || b.status === 'En cours') && new Date(b.moveDate) >= new Date());
            setBookings(upcoming);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "Erreur",
                description: "Impossible de charger les réservations."
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    const handleGenerateEmail = async (booking: Booking) => {
        setGeneratingEmailFor(booking.id);
        try {
            const emailContent = await generateReminderEmail({
                clientName: booking.clientName,
                moveDate: booking.moveDate,
                originAddress: booking.originAddress,
                destinationAddress: booking.destinationAddress,
                assignedTeam: booking.assignedTeam || "Notre équipe"
            });
            setGeneratedEmail(emailContent);
            setIsEmailDialogOpen(true);
        } catch (error) {
             toast({
                variant: 'destructive',
                title: "Erreur IA",
                description: "Impossible de générer l'e-mail."
            });
        } finally {
            setGeneratingEmailFor(null);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copié !", description: "Le contenu a été copié dans le presse-papiers." });
    }

    return (
        <div className="flex flex-col gap-6">
            <h1 className="font-headline text-3xl font-bold tracking-tight">Communication Client</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Rappels de déménagement</CardTitle>
                    <CardDescription>Générez des e-mails de rappel pour les déménagements à venir.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Date du déménagement</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({length: 3}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                        <TableCell><Skeleton className="h-5 w-28"/></TableCell>
                                        <TableCell><Skeleton className="h-10 w-48"/></TableCell>
                                    </TableRow>
                                ))
                            ) : bookings.length > 0 ? (
                                bookings.map(booking => (
                                    <TableRow key={booking.id}>
                                        <TableCell className="font-medium">{booking.clientName}</TableCell>
                                        <TableCell>{format(new Date(booking.moveDate), "d MMMM yyyy", { locale: fr })}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleGenerateEmail(booking)} disabled={generatingEmailFor === booking.id}>
                                                {generatingEmailFor === booking.id ? <Loader2 className="mr-2 animate-spin" /> : <Wand2 className="mr-2"/>}
                                                Générer un e-mail de rappel
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24">Aucun déménagement à venir.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>E-mail de rappel généré</DialogTitle>
                        <DialogDescription>
                            Vérifiez l'e-mail ci-dessous, copiez-le et envoyez-le à votre client.
                        </DialogDescription>
                    </DialogHeader>
                    {generatedEmail && (
                        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-1">
                                <h3 className="font-semibold text-sm">Sujet :</h3>
                                <div className="p-3 rounded-md bg-muted text-sm" onClick={() => copyToClipboard(generatedEmail.subject)}>
                                    {generatedEmail.subject}
                                </div>
                            </div>
                            <Separator/>
                             <div className="space-y-1">
                                <h3 className="font-semibold text-sm">Contenu :</h3>
                                <div className="p-3 rounded-md bg-muted text-sm whitespace-pre-wrap" onClick={() => copyToClipboard(generatedEmail.body)}>
                                    {generatedEmail.body}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
