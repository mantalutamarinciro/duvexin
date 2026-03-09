
import { getTeamById } from "@/services/teamService";
import { getBookingsByTeam } from "@/services/bookingService";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MapPin, Clock, Package } from "lucide-react";

export default async function TeamSchedulePage({ params }: { params: Promise<{ teamId: string }> }) {
    const { teamId } = await params;
    const team = await getTeamById(teamId);
    
    if (!team) {
        notFound();
    }

    const bookings = await getBookingsByTeam(teamId);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Planning de l'équipe "{team.name}"</h1>
                <p className="text-muted-foreground">Voici la liste de vos prochains déménagements.</p>
            </div>
            {bookings.length > 0 ? (
                <div className="space-y-4">
                    {bookings.map(booking => (
                        <Card key={booking.id}>
                            <CardHeader>
                                <CardTitle className="text-xl">Déménagement pour {booking.clientName}</CardTitle>
                                <CardDescription>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock className="h-4 w-4"/>
                                        {format(new Date(booking.moveDate), "eeee d MMMM yyyy 'à' HH:mm", { locale: fr })}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-1 text-primary"/>
                                    <div>
                                        <p className="font-semibold">De :</p>
                                        <p className="text-muted-foreground">{booking.originAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-1 text-primary"/>
                                    <div>
                                        <p className="font-semibold">À :</p>
                                        <p className="text-muted-foreground">{booking.destinationAddress}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Package className="h-5 w-5 mt-1 text-primary"/>
                                    <div>
                                        <p className="font-semibold">Statut actuel :</p>
                                        <p className="font-bold">{booking.status}</p>
                                    </div>
                                </div>

                                <Button asChild className="mt-4">
                                    <Link href={`/crew/move/${booking.id}`}>
                                        Voir les détails et mettre à jour le statut
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                 <Card>
                    <CardContent className="p-10 text-center">
                        <p className="text-muted-foreground">Aucun déménagement n'est actuellement assigné à cette équipe.</p>
                    </CardContent>
                 </Card>
            )}
        </div>
    );
}
