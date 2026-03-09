import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { QuoteRequestFormData } from "@/components/quote-form"
import { serviceTypeLabels } from "@/lib/quote-constants"

interface QuotePDFProps {
    data: QuoteRequestFormData
    quote: number
}

export function QuotePDF({ data, quote }: QuotePDFProps) {
    const today = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(today.getDate() + 30);

    return (
        <div className="bg-white text-slate-800 p-12 font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
            {/* Header avec Logo et ruban premium */}
            <header className="flex justify-between items-start pb-8 border-b-4 border-[#00ad9f]">
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
                    <div className="inline-block bg-[#0f172a] text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4">
                        PROPOSITION TARIFAIRE
                    </div>
                    <p className="text-sm font-bold text-slate-900">N° DEVIS : Q-{String(today.getFullYear())}{String(today.getMonth() + 1).padStart(2, '0')}-{data.clientName.substring(0, 3).toUpperCase()}</p>
                    <p className="text-xs text-slate-500 mt-1">Date : {format(today, "d MMMM yyyy", { locale: fr })}</p>
                    <p className="text-xs text-[#00ad9f] font-bold mt-1 uppercase">Valable jusqu'au : {format(expiryDate, "d MMMM yyyy", { locale: fr })}</p>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-12 mt-12">
                {/* Client */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-[#00ad9f] uppercase tracking-[0.2em]">Destinataire</h3>
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <p className="text-lg font-black text-slate-900">{data.clientName}</p>
                        <p className="text-sm mt-1">{data.clientEmail}</p>
                        <p className="text-sm">{data.clientPhone || 'Téléphone non renseigné'}</p>
                    </div>
                </div>
                {/* Résumé logistique */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-[#00ad9f] uppercase tracking-[0.2em]">Votre projet</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Date prévue</span>
                            <span className="font-bold">{format(data.moveDate, "d MMMM yyyy", { locale: fr })}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Volume estimé</span>
                            <span className="font-bold text-primary">{data.volume} m³</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Distance</span>
                            <span className="font-bold">{data.distance} km</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Adresses */}
            <div className="mt-12 p-8 rounded-[2.5rem] bg-[#0f172a] text-white flex gap-12 items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ad9f]/20 rounded-full blur-3xl" />
                <div className="flex-1 space-y-2">
                    <p className="text-[10px] font-black uppercase text-[#00ad9f] tracking-widest">Départ</p>
                    <p className="text-sm font-medium leading-relaxed">{data.originAddress}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="h-px w-12 bg-[#00ad9f]/50" />
                    <span className="text-[10px] font-bold py-1">TRAJET</span>
                    <div className="h-px w-12 bg-[#00ad9f]/50" />
                </div>
                <div className="flex-1 space-y-2 text-right">
                    <p className="text-[10px] font-black uppercase text-[#00ad9f] tracking-widest">Arrivée</p>
                    <p className="text-sm font-medium leading-relaxed">{data.destinationAddress}</p>
                </div>
            </div>

            {/* Détails Financiers */}
            <section className="mt-16">
                <h3 className="text-[10px] font-black text-[#00ad9f] uppercase tracking-[0.2em] mb-6">Détail de la prestation</h3>
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50 text-left">
                            <th className="p-4 text-xs font-black uppercase tracking-widest rounded-l-2xl">Description des services</th>
                            <th className="p-4 text-xs font-black uppercase tracking-widest text-right rounded-r-2xl">Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-6">
                                <p className="text-base font-bold text-slate-900">{serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels]}</p>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    Prestation incluant la mise à disposition d'une équipe de professionnels salariés, 
                                    véhicule capitonné adapté de {data.volume}m³, matériel de protection (couvertures, sangles, housses) 
                                    et assurance contractuelle pour un trajet de {data.distance} km.
                                </p>
                                {data.details && (
                                    <div className="mt-4 p-4 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-100">
                                        <strong>Notes particulières :</strong> {data.details}
                                    </div>
                                )}
                            </td>
                            <td className="p-6 text-right align-top">
                                <span className="text-lg font-black text-slate-900">{quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Totaux */}
            <section className="mt-8 flex justify-end">
                <div className="w-72 space-y-3 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total HT</span>
                        <span className="font-medium">{(quote / 1.2).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">TVA (20%)</span>
                        <span className="font-medium">{(quote - (quote / 1.2)).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                        <span className="text-sm font-black uppercase">Total TTC</span>
                        <span className="text-2xl font-black text-[#00ad9f]">{quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                </div>
            </section>

            {/* Footer Légal */}
            <footer className="mt-20 pt-8 border-t border-slate-100 grid grid-cols-2 gap-12 text-[10px] text-slate-400 leading-relaxed">
                <div className="space-y-2">
                    <p className="font-bold text-slate-600">MENTIONS LÉGALES</p>
                    <p>Ce devis est établi sous réserve de visite technique et de conformité du volume déclaré. 
                    Il est valable 30 jours calendaires à compter de sa date d'émission. 
                    Assurance contractuelle incluse à hauteur de 50 000€ par convoi.</p>
                </div>
                <div className="text-right flex flex-col justify-end">
                    <p className="font-bold text-slate-900 text-xs mb-1">DÉMÉNAGEMENT DU VEXIN</p>
                    <p>SARL au capital de 10 000€ - SIRET : 123 456 789 00012</p>
                    <p>Licence transport n° 2024/11/0000123</p>
                </div>
            </footer>
        </div>
    )
}