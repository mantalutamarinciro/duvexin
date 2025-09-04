import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Truck, Package, Home, MapPin, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { getBookingById } from "@/services/bookingService"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default async function TrackingPage({ params }: { params: { id: string } }) {
  const moveId = params.id;
  const moveDetails = await getBookingById(moveId);

  if (!moveDetails) {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
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

  const estimatedArrival = format(new Date(moveDetails.moveDate), "d MMMM yyyy 'à' HH:mm", { locale: fr });


  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-4xl space-y-8">
        <header className="flex flex-col items-center text-center">
            <h1 className="font-headline text-4xl font-bold text-primary">DemDuVexin</h1>
            <p className="text-lg text-muted-foreground">Suivi de déménagement en temps réel</p>
        </header>

        <Card className="overflow-hidden shadow-lg">
            <div className="relative h-64 w-full md:h-80">
                <Image
                    src="https://picsum.photos/1200/400"
                    alt="Carte montrant l'emplacement du camion"
                    fill
                    className="object-cover"
                    data-ai-hint="map city"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex flex-col items-center justify-end p-8 text-center">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold drop-shadow-md">Votre déménagement est {moveDetails.status}</h2>
                        <p className="drop-shadow-sm">ID Déménagement : {moveId.toUpperCase()}</p>
                    </div>
                </div>
            </div>
            <CardContent className="p-6">
                <div className="grid gap-x-6 gap-y-8 md:grid-cols-3">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Home className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Origine</h3>
                            <p className="text-sm text-muted-foreground">{moveDetails.originAddress}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent/20">
                            <MapPin className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Statut</h3>
                            <p className="text-sm font-bold text-accent-foreground">{moveDetails.status}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Destination</h3>
                            <p className="text-sm text-muted-foreground">{moveDetails.destinationAddress}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />
                
                <div className="space-y-4 text-sm">
                    <div className="flex items-center">
                        <Truck className="mr-3 h-5 w-5 text-primary"/>
                        <p><span className="font-semibold text-muted-foreground">Équipe assignée :</span> {moveDetails.assignedTeam || "Non assignée"}</p>
                    </div>
                     <div className="flex items-center">
                        <Clock className="mr-3 h-5 w-5 text-primary"/>
                        <p><span className="font-semibold text-muted-foreground">Arrivée estimée :</span> {estimatedArrival}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
      </div>
    </div>
  )
}
