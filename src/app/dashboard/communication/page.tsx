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
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { getBookings, Booking, sendReminderEmailDirectly } from "@/services/bookingService";
import { Mail, Loader2, Wand2, Copy, Send, CheckCircle2 } from "lucide-react"
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
    const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const { toast } = useToast();

    const loadBookings = async () => {
        setLoading(true);
        try {
            const allBookings = await getBookings();
            // Filtrer pour les déménagements futurs (non annulés)
            const upcoming = allBookings.filter(b => 
                (b.status === 'Programmé' || b.status === 'En cours') && 
                new Date(b.moveDate) >= new Date()
            );
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
        setActiveBooking(booking);
        try {
            const emailContent = await generateReminderEmail({
                clientName: booking.clientName,
                moveDate: booking.moveDate,
                originAddress: booking.originAddress,
                destinationAddress: booking.destinationAddress,
                assignedTeam: booking.assignedTeam || "Notre équipe de professionnels"
            });
            setGeneratedEmail(emailContent);
            setIsEmailDialogOpen(true);
        } catch (error) {
             toast({
                variant: 'destructive',
                title: "Erreur IA",
                description: "Impossible de générer l'e-mail avec Gemini."
            });
        } finally {
            setGeneratingEmailFor(null);
        }
    };

    const handleSendEmail = async () => {
        if (!activeBooking || !generatedEmail) return;
        setIsSendingEmail(true);
        try {
            await sendReminderEmailDirectly(
                activeBooking.id, 
                generatedEmail.subject, 
                generatedEmail.body
            );
            toast({
                title: "E-mail envoyé 🚀",
                description: `Le rappel pour le déménagement de ${activeBooking.clientName} a été envoyé par e-mail.`
            });
            setIsEmailDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: "Erreur d'envoi",
                description: "Impossible d'envoyer l'e-mail de rappel via Resend."
            });
        } finally {
            setIsSendingEmail(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copié !", description: "Le contenu a été copié dans le presse-papiers." });
    }

    return (
        <div className="flex flex-col gap-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-2xl">
                        <Mail className="h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="font-headline text-3xl font-black tracking-tight text-slate-900 dark:text-white">Communication Client</h1>
                        <p className="text-sm text-slate-500">Générez et expédiez en un clic des rappels personnalisés rédigés par l'IA.</p>
                    </div>
                </div>
            </div>

            <Card className="rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-xl shadow-primary/5 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Rappels de Déménagement J-1</CardTitle>
                    <CardDescription>Consultez la liste des chantiers prévus et notifiez vos clients par e-mail automatique.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client & Contact</TableHead>
                                <TableHead>Date prévue</TableHead>
                                <TableHead>Équipe assignée</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({length: 3}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-32"/></TableCell>
                                        <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                                        <TableCell><Skeleton className="h-5 w-24"/></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-9 w-40 ml-auto"/></TableCell>
                                    </TableRow>
                                ))
                            ) : bookings.length > 0 ? (
                                bookings.map(booking => (
                                    <TableRow key={booking.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <TableCell className="py-4">
                                            <div className="font-bold text-slate-900 dark:text-white">{booking.clientName}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">{booking.clientEmail}</div>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium">
                                            {format(new Date(booking.moveDate), "d MMMM yyyy", { locale: fr })}
                                        </TableCell>
                                        <TableCell>
                                            {booking.assignedTeam ? (
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                                                    {booking.assignedTeam}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Non assignée</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                              onClick={() => handleGenerateEmail(booking)} 
                                              disabled={generatingEmailFor === booking.id}
                                              className="rounded-xl"
                                              size="sm"
                                            >
                                                {generatingEmailFor === booking.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4"/>}
                                                Préparer le rappel IA
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-36">
                                        <CheckCircle2 className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                                        <p className="font-bold text-slate-900 dark:text-white">Tout est en ordre</p>
                                        <p className="text-xs text-slate-500 mt-1">Aucun déménagement planifié nécessitant de notification.</p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                <DialogContent className="sm:max-w-2xl rounded-[2rem] border-none shadow-2xl bg-white dark:bg-slate-900">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">E-mail de Rappel IA</DialogTitle>
                        <DialogDescription>
                            L'IA a rédigé ce message d'accompagnement. Vous pouvez le copier ou l'envoyer directement au client.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {generatedEmail && activeBooking && (
                        <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
                            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 font-semibold space-y-1">
                                <p>Destinataire : <span className="text-slate-900 dark:text-white font-bold">{activeBooking.clientName} ({activeBooking.clientEmail})</span></p>
                                <p>Objet : <span className="text-slate-900 dark:text-white font-bold">{generatedEmail.subject}</span></p>
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">Corps du message</span>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => copyToClipboard(`${generatedEmail.subject}\n\n${generatedEmail.body}`)}
                                      className="h-8 rounded-lg text-slate-500"
                                    >
                                        <Copy className="h-4 w-4 mr-1.5" />
                                        Copier
                                    </Button>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-950 text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed border border-slate-900 shadow-inner">
                                    {generatedEmail.body}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsEmailDialogOpen(false)}
                          className="rounded-2xl h-12 w-full font-bold border-slate-200 dark:border-slate-800"
                        >
                            Fermer
                        </Button>
                        <Button 
                          onClick={handleSendEmail} 
                          disabled={isSendingEmail}
                          className="rounded-2xl h-12 w-full font-black shadow-lg shadow-primary/20"
                        >
                            {isSendingEmail ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-5 w-5" />
                            )}
                            Envoyer directement
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
