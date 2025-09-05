
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Booking } from "@/services/bookingService"
import { serviceTypeLabels } from "@/app/dashboard/quote/page"

interface WaybillPDFProps {
    data: Booking
}

export function WaybillPDF({ data }: WaybillPDFProps) {
    const today = new Date();

    return (
        <div className="bg-white text-gray-800 p-8 font-sans text-[10px]">
            {/* Header */}
            <header className="flex justify-between items-start pb-4 border-b-2 border-gray-300">
                <div>
                    <h1 className="text-2xl font-bold text-blue-600">DemDuVexin</h1>
                    <p className="text-gray-500">12 Rue de la République, 75001 Paris</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-semibold uppercase text-gray-700">Lettre de voiture</h2>
                    <p className="text-gray-500">N° de déménagement: {data.id}</p>
                    <p className="text-gray-500">Date d'émission: {format(today, "PPP", { locale: fr })}</p>
                </div>
            </header>

            {/* Parties */}
            <section className="mt-6 grid grid-cols-3 gap-4">
                <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Entreprise</h3>
                    <p className="font-bold">DemDuVexin</p>
                    <p>12 Rue de la République</p>
                    <p>75001 Paris, France</p>
                    <p>SIRET: 123 456 789 00012</p>
                </div>
                 <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Client</h3>
                    <p className="font-bold">{data.clientName}</p>
                    <p>{data.clientEmail}</p>
                    {data.clientPhone && <p>{data.clientPhone}</p>}
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Détails Opérationnels</h3>
                    <p><strong>Équipe:</strong> {data.assignedTeam || 'Non spécifiée'}</p>
                    <p><strong>Véhicule:</strong> {data.assignedVehicleRegistration || 'Non spécifié'}</p>
                </div>
            </section>
            
            {/* Adresses et Dates */}
            <section className="mt-6">
                 <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-200 p-4">
                    <div>
                        <p className="font-semibold">Adresse de chargement :</p>
                        <p>{data.originAddress}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Adresse de livraison :</p>
                        <p>{data.destinationAddress}</p>
                    </div>
                     <div>
                        <p className="font-semibold">Date du déménagement :</p>
                        <p>{format(new Date(data.moveDate), "PPP", { locale: fr })}</p>
                    </div>
                     <div>
                        <p className="font-semibold">Volume déclaré :</p>
                        <p>{data.volume || 'N/A'} m³</p>
                    </div>
                </div>
            </section>

             {/* Prestation */}
            <section className="mt-6">
                <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Détails de la prestation</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                    <p><strong>Type de service :</strong> {data.serviceType ? serviceTypeLabels[data.serviceType] : "Non spécifié"}</p>
                    <p className="mt-2"><strong>Instructions particulières :</strong></p>
                    <div className="h-16 border-b border-gray-300 mt-1"></div>
                </div>
            </section>
            
             {/* Inventaire (Simplifié) */}
            <section className="mt-6">
                <h3 className="text-xs font-bold text-gray-600 uppercase mb-2">Inventaire des biens</h3>
                <div className="border-t border-b border-gray-300 h-48 p-2">
                    {/* Espace pour liste d'inventaire */}
                </div>
            </section>

            {/* Signatures */}
            <section className="mt-8 grid grid-cols-2 gap-8">
                <div className="border-t-2 border-gray-300 pt-2">
                    <p className="font-semibold">Signature du Client</p>
                    <p className="text-xs text-gray-500">(Précédée de la mention "Bon pour accord")</p>
                </div>
                 <div className="border-t-2 border-gray-300 pt-2">
                    <p className="font-semibold">Signature du Chef d'équipe</p>
                     <p className="text-xs text-gray-500">(Précédée de la mention "Pris en charge")</p>
                </div>
            </section>

            <footer className="mt-8 pt-4 border-t-2 border-gray-200 text-center text-xs text-gray-500">
                <p>La signature de ce document vaut acceptation des conditions générales de vente et reconnaissance de l'état des biens.</p>
                <p className="font-bold mt-2">DemDuVexin</p>
            </footer>
        </div>
    )
}
