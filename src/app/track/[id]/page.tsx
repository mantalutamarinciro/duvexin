import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, Package, Home, MapPin, Clock, AlertTriangle, Users, CheckCircle } from "lucide-react"
import Image from "next/image"
import { getBookingById } from "@/services/bookingService"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"

const statusSteps = [
    { status: "Programmé", label: "Programmé", description: "Votre déménagement est confirmé." },
    { status: "En route", label: "En route", description: "Notre équipe est en chemin." },
    { status: "Arrivé chez le client", label: "Arrivée", description: "L'équipe est arrivée à l'adresse de départ." },
    { status: "En cours", label: "En cours", description: "Le déménagement est en cours." },
    { status: "Terminé", label: "Terminé", description: "Votre déménagement est terminé." },
];

export default async function TrackingPage({ params }: { params: { id: string } }) {
  const moveId = params.id;
  const moveDetails = await getBookingById(moveId);

  if (!moveDetails) {
    return (
       <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
            <div className="w-full max-w-md text-center">
                 <AlertTriangle className="mx-auto h-16 w-16 text-destructive" />
                <h1 className="mt-4 font-headline text-3xl font-bold">Déménagement non trouvé</h1>
                <p className="mt-2 text-muted-foreground">
                    Désolé, nous n'avons pas pu trouver de déménagement correspondant à l'ID <span className="font-mono bg-muted px-1 py-0.5 rounded-sm">{moveId}</span>.
                </p>
                 <p className="mt-1 text-muted-foreground text-sm">Veuillez vérifier le lien ou contacter notre service client.</p>
            </div>
       </div>
    )
  }

  const estimatedArrival = format(new Date(moveDetails.moveDate), "d MMMM yyyy 'vers' HH:mm", { locale: fr });
  const currentStatusIndex = statusSteps.findIndex(s => s.status === moveDetails.status);

  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-4xl space-y-8 py-8">
        <header className="flex flex-col items-center text-center">
            <h1 className="font-headline text-4xl font-bold">Suivi de votre déménagement</h1>
            <p className="text-lg text-muted-foreground">Progression pour {moveDetails.clientName}</p>
        </header>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Progression du déménagement</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
                    <div className="space-y-8">
                        {statusSteps.map((step, index) => {
                            const isActive = currentStatusIndex >= index;
                            const isCurrent = currentStatusIndex === index;
                            return (
                                <div key={step.status} className="flex items-center gap-4 relative">
                                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full z-10", isActive ? "bg-primary" : "bg-muted border")}>
                                        <CheckCircle className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                                    </div>
                                    <div>
                                        <h4 className={cn("font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>{step.label}</h4>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-lg">
             <CardHeader>
                <CardTitle>Détails</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-x-6 gap-y-8 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Home className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1" />
                        <div>
                            <h3 className="font-semibold">Origine</h3>
                            <p className="text-sm text-muted-foreground">{moveDetails.originAddress}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <Package className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1" />
                        <div>
                            <h3 className="font-semibold">Destination</h3>
                            <p className="text-sm text-muted-foreground">{moveDetails.destinationAddress}</p>
                        </div>
                    </div>
                </div>

                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1"/>
                         <div>
                            <h3 className="font-semibold">Date et heure prévues</h3>
                            <p className="text-sm text-muted-foreground">{estimatedArrival}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Users className="h-6 w-6 flex-shrink-0 text-muted-foreground mt-1"/>
                         <div>
                            <h3 className="font-semibold">Équipe assignée</h3>
                            <p className="text-sm text-muted-foreground">{moveDetails.assignedTeam || "En cours d'assignation"}</p>
                        </div>
                    </div>
                 </div>

            </CardContent>
        </Card>
      </div>
    </div>
  )
}
