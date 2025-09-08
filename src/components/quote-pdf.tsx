
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { QuoteFormData } from "@/app/dashboard/quote/[quoteId]/page"
import { serviceTypeLabels } from "@/app/dashboard/quote/page"

interface QuotePDFProps {
    data: QuoteFormData
    quote: number
}

export function QuotePDF({ data, quote }: QuotePDFProps) {
    const today = new Date();

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
                    <h2 className="text-2xl font-semibold uppercase text-gray-700">Devis</h2>
                    <p className="text-gray-500">Numéro de devis: Q-{String(today.getFullYear())}{String(today.getMonth() + 1).padStart(2, '0')}-001</p>
                    <p className="text-gray-500">Date d'émission: {format(today, "PPP", { locale: fr })}</p>
                </div>
            </header>

            <section className="mt-8 grid grid-cols-2 gap-8">
                <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">Destinataire</h3>
                    <p className="font-bold">{data.clientName}</p>
                    <p>{data.clientEmail}</p>
                    {data.clientPhone && <p>{data.clientPhone}</p>}
                </div>
            </section>

            <section className="mt-8">
                <h3 className="text-sm font-semibold text-gray-600 uppercase mb-4">Détails du déménagement</h3>
                <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-200 p-4">
                    <div>
                        <p className="font-semibold">Date du déménagement :</p>
                        <p>{format(data.moveDate, "PPP", { locale: fr })}</p>
                    </div>
                     <div>
                        <p className="font-semibold">Type de service :</p>
                        <p>{serviceTypeLabels[data.serviceType]}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Adresse de départ :</p>
                        <p>{data.originAddress}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Adresse d'arrivée :</p>
                        <p>{data.destinationAddress}</p>
                    </div>
                     <div>
                        <p className="font-semibold">Distance :</p>
                        <p>{data.distance} km</p>
                    </div>
                     <div>
                        <p className="font-semibold">Volume :</p>
                        <p>{data.volume} m³</p>
                    </div>
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
                                <p className="font-medium">Prestation de déménagement ({serviceTypeLabels[data.serviceType]})</p>
                                <p className="text-xs text-gray-500">Basé sur une distance de {data.distance} km et un volume de {data.volume} m³.</p>
                            </td>
                            <td className="p-3 text-right">{quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="mt-8 text-right">
                <div className="inline-block w-full max-w-xs">
                    <div className="flex justify-between py-2">
                        <span className="font-semibold text-gray-600">Total HT</span>
                        <span>{(quote / 1.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="font-semibold text-gray-600">TVA (20%)</span>
                        <span>{(quote - (quote / 1.2)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between py-3 mt-2 border-t-2 border-gray-200">
                        <span className="text-lg font-bold">Total TTC</span>
                        <span className="text-lg font-bold">{quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>
            </section>

            <footer className="mt-12 pt-6 border-t-2 border-gray-200 text-center text-xs text-gray-500">
                <p>Merci de votre confiance.</p>
                <p>Ce devis est valable 30 jours. Les conditions générales de vente sont disponibles sur notre site web.</p>
                <p className="font-bold mt-2">DemDuVexin - SIRET: 123 456 789 00012</p>
            </footer>
        </div>
    )
}
