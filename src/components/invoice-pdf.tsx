
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Booking } from "@/services/bookingService"
import { serviceTypeLabels } from "@/app/dashboard/quote/page"

interface InvoicePDFProps {
    data: Booking
}

export function InvoicePDF({ data }: InvoicePDFProps) {
    const today = new Date();
    const invoiceNumber = `F-${data.id.substring(0, 8).toUpperCase()}`;

    return (
        <div className="bg-white text-gray-800 p-8 font-sans text-sm">
            <header className="flex justify-between items-start pb-6 border-b-2 border-gray-200">
                <div>
                    <h1 className="text-3xl font-bold text-blue-600">DemDuVexin</h1>
                    <p className="text-gray-500">12 Rue de la République</p>
                    <p className="text-gray-500">75001 Paris, France</p>
                    <p className="text-gray-500">contact@demduvexin.fr</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-semibold uppercase text-gray-700">Facture</h2>
                    <p className="text-gray-500">Numéro de facture: {invoiceNumber}</p>
                    <p className="text-gray-500">Date d'émission: {format(today, "PPP", { locale: fr })}</p>
                </div>
            </header>

            <section className="mt-8 grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Facturé à</h3>
                    <p className="font-bold">{data.clientName}</p>
                    <p>{data.clientEmail}</p>
                    {data.clientPhone && <p>{data.clientPhone}</p>}
                </div>
                 <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Détails du paiement</h3>
                    <p><strong>Date de la prestation:</strong> {format(new Date(data.moveDate), "PPP", { locale: fr })}</p>
                    <p><strong>Statut:</strong> <span className="font-bold">Payée</span></p>
                </div>
            </section>

            <section className="mt-8">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                            <th className="p-3 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <td className="p-3">
                                <p className="font-medium">Prestation de déménagement - {data.serviceType ? serviceTypeLabels[data.serviceType] : "standard"}</p>
                                <p className="text-xs text-gray-500">De : {data.originAddress}</p>
                                <p className="text-xs text-gray-500">À : {data.destinationAddress}</p>
                                <p className="text-xs text-gray-500">Volume : {data.volume} m³</p>
                            </td>
                            <td className="p-3 text-right">{data.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="mt-8 text-right">
                <div className="inline-block w-full max-w-xs">
                    <div className="flex justify-between py-2">
                        <span className="font-semibold text-gray-600">Total HT</span>
                        <span>{(data.total / 1.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-semibold text-gray-600">TVA (20%)</span>
                        <span>{(data.total - (data.total / 1.2)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between py-3 mt-2 border-t-2 border-gray-200">
                        <span className="text-lg font-bold">Total TTC</span>
                        <span className="text-lg font-bold">{data.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>
            </section>

            <footer className="mt-12 pt-6 border-t-2 border-gray-200 text-center text-xs text-gray-500">
                <p>Merci de votre confiance. Cette facture a été acquittée.</p>
                <p>DemDuVexin - SIRET: 123 456 789 00012</p>
            </footer>
        </div>
    )
}
