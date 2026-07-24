import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Booking } from "@/services/bookingService"
import { serviceTypeLabels } from "@/lib/quote-constants"

interface InvoicePDFProps {
    data: Booking;
    amountPaid?: number;
}

export function InvoicePDF({ data, amountPaid = 0 }: InvoicePDFProps) {
    const today = new Date();
    const invoiceNumber = `FAC-${today.getFullYear()}-${data.id.substring(0, 5).toUpperCase()}`;
    const total = data.total || 0;
    const isPaid = amountPaid >= total && total > 0;
    const isPartial = amountPaid > 0 && amountPaid < total;
    const paymentBadge = isPaid
        ? { label: 'PAIEMENT ACQUITTÉ', color: 'emerald' }
        : isPartial
        ? { label: `ACOMPTE VERSÉ : ${amountPaid.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}`, color: 'amber' }
        : { label: 'EN ATTENTE DE RÈGLEMENT', color: 'red' };
    const badgeClasses = isPaid
        ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
        : isPartial
        ? 'text-amber-600 border-amber-200 bg-amber-50'
        : 'text-red-600 border-red-200 bg-red-50';

    return (
        <div className="bg-white text-slate-800 p-12 font-sans flex flex-col" style={{ width: '210mm', minHeight: '297mm' }}>
            {/* Header avec Logo et ruban premium */}
            <header className="flex justify-between items-start pb-8 border-b-4 border-[#0f172a]">
                <div className="space-y-4">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo Déménagement du Vexin" 
                        style={{ height: '60px', width: 'auto' }}
                    />
                    <div className="pt-2 text-xs leading-relaxed">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Artisans de votre mobilité</div>
                        9 Rue de Pontoise<br />
                        95540 Méry-sur-Oise<br />
                        01 30 75 12 35<br />
                        contact@demenagementduvexin.fr
                    </div>
                </div>
                <div className="text-right">
                    <div className="inline-block bg-[#0f172a] text-white px-8 py-3 rounded-full text-lg font-black uppercase tracking-widest mb-4">
                        FACTURE
                    </div>
                    <p className="text-sm font-bold text-slate-900">N° : {invoiceNumber}</p>
                    <p className="text-xs text-slate-500 mt-1">Date d'émission : {format(today, "d MMMM yyyy", { locale: fr })}</p>
                    <p className={`text-[10px] font-black mt-2 uppercase border inline-block px-3 py-1 rounded-md ${badgeClasses}`}>{paymentBadge.label}</p>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-12 mt-12">
                {/* Client */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Facturé à</h3>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-lg font-black text-slate-900">{data.clientName}</p>
                        <p className="text-sm mt-1">{data.clientEmail}</p>
                        <p className="text-sm">{data.clientPhone || '-'}</p>
                    </div>
                </div>
                {/* Référence dossier */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Référence Dossier</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Déménagement le</span>
                            <span className="font-bold">{format(new Date(data.moveDate), "d MMMM yyyy", { locale: fr })}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Volume réalisé</span>
                            <span className="font-bold">{data.volume} m³</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Réf Devis</span>
                            <span className="font-mono text-xs">{data.quoteId.substring(0,8).toUpperCase()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Détails Facturation */}
            <section className="mt-16">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#0f172a] text-white text-left">
                            <th className="p-4 text-xs font-black uppercase tracking-widest rounded-l-2xl">Désignation de la prestation</th>
                            <th className="p-4 text-xs font-black uppercase tracking-widest text-right rounded-r-2xl">Montant TTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="p-8">
                                <p className="text-base font-bold text-slate-900">Prestation de déménagement - {serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels]}</p>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Trajet : {data.originAddress} <br />vers {data.destinationAddress}
                                </p>
                            </td>
                            <td className="p-8 text-right align-top">
                                <span className="text-lg font-black text-slate-900">{data.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Totaux */}
            <section className="mt-8 flex justify-end">
                <div className="w-80 space-y-3 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Montant HT</span>
                        <span className="font-medium">{(data.total / 1.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">TVA (20%)</span>
                        <span className="font-medium">{(data.total - (data.total / 1.2)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 mt-2 border-t-2 border-slate-200">
                        <span className="text-sm font-black uppercase">Net à payer TTC</span>
                        <span className="text-2xl font-black text-[#0f172a]">{data.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>
            </section>

            {/* Footer Légal */}
            <footer className="mt-auto pt-8 border-t border-slate-100 text-center space-y-4">
                <p className="text-[10px] text-slate-400">
                    Merci de votre confiance. Pour toute question relative à cette facture, veuillez contacter notre service comptabilité.<br/>
                    SARL Déménagement du Vexin - SIRET : 123 456 789 00012 - RCS Pontoise - TVA Intracom : FR 12 345 678 900
                </p>
            </footer>
        </div>
    )
}