import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { QuoteRequestFormData } from "@/types/quote"

interface DeclarationPDFProps {
    data: QuoteRequestFormData
}

export function DeclarationPDF({ data }: DeclarationPDFProps) {
    const today = new Date();

    return (
        <div className="bg-white text-slate-900 p-10 font-sans text-[10px]" style={{ width: '210mm', minHeight: '297mm' }}>
            {/* Header Officiel */}
            <header className="flex justify-between items-start pb-6 border-b-2 border-slate-900">
                <div className="flex flex-col gap-2">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo Déménagement du Vexin" 
                        style={{ height: '50px', width: 'auto', objectFit: 'contain', objectPosition: 'left' }}
                    />
                    <div className="space-y-0.5 mt-1">
                        <p className="text-[8px] text-slate-500">9 Rue de Pontoise, 95540 Méry-sur-Oise | 01 30 75 12 35</p>
                        <p className="text-[8px] text-slate-500">Licence n° 2024/11/0000123 | SIRET 123 456 789 00012</p>
                    </div>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl font-black uppercase tracking-tight">Déclaration<br/>de Valeur</h1>
                </div>
            </header>

            {/* Avis juridique */}
            <div className="mt-6 border border-slate-300 p-4 bg-slate-50 rounded-xl text-justify text-[9px] leading-relaxed text-slate-700">
                <p className="mb-2"><strong>Avis Important :</strong> En application de nos conditions générales de vente, notre responsabilité contractuelle en cas de perte ou d'avarie est limitée à un montant forfaitaire par objet ou ensemble d'objets.</p>
                <p>Si la valeur de certains de vos biens dépasse ce plafond, vous devez impérativement les lister dans le tableau ci-dessous afin de bénéficier d'une couverture d'assurance à hauteur de leur valeur réelle estimée. <strong>En l'absence de déclaration de valeur complétée, signée et remise avant le début des opérations, la garantie de base s'appliquera par défaut.</strong></p>
            </div>

            {/* Infos Client & Opération */}
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="space-y-3">
                    <h3 className="bg-slate-100 text-slate-900 px-3 py-1.5 font-bold uppercase tracking-widest text-[9px] rounded-md flex items-center">Client</h3>
                    <div className="pl-2 space-y-1">
                        <p className="font-bold text-sm">{data.clientName}</p>
                        <p>{data.clientEmail}</p>
                        <p>{data.clientPhone || '-'}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="bg-slate-100 text-slate-900 px-3 py-1.5 font-bold uppercase tracking-widest text-[9px] rounded-md flex items-center">Opération</h3>
                    <div className="pl-2 space-y-1">
                        <p><span className="font-semibold text-slate-500">Départ :</span> {data.originAddress}</p>
                        <p><span className="font-semibold text-slate-500">Arrivée :</span> {data.destinationAddress}</p>
                        {data.moveDate && <p><span className="font-semibold text-slate-500">Date prévue :</span> {format(new Date(data.moveDate), "d MMMM yyyy", { locale: fr })}</p>}
                    </div>
                </div>
            </div>

            {/* Tableau */}
            <div className="mt-8">
                <table className="w-full border-collapse border border-slate-300">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border border-slate-300 p-2 text-left w-3/5 uppercase tracking-wider font-bold">Désignation du bien</th>
                            <th className="border border-slate-300 p-2 text-center w-1/5 uppercase tracking-wider font-bold">Année d'achat</th>
                            <th className="border border-slate-300 p-2 text-right w-1/5 uppercase tracking-wider font-bold">Valeur estimée (€)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <tr key={index}>
                                <td className="border border-slate-300 p-2 h-8"></td>
                                <td className="border border-slate-300 p-2 h-8"></td>
                                <td className="border border-slate-300 p-2 h-8"></td>
                            </tr>
                        ))}
                        <tr className="bg-slate-50">
                            <td colSpan={2} className="border border-slate-300 p-3 text-right font-black uppercase">Valeur Totale Déclarée :</td>
                            <td className="border border-slate-300 p-3"></td>
                        </tr>
                    </tbody>
                </table>
                <p className="text-[8px] text-slate-400 mt-2 italic">* Veuillez joindre des justificatifs (factures, certificats d'expertise) pour les objets de très grande valeur.</p>
            </div>

            {/* Signatures */}
            <div className="mt-12 border-2 border-slate-200 rounded-2xl p-6 h-40 relative">
                <p className="font-bold text-xs uppercase mb-2">Signature du Client</p>
                <p className="text-[9px] text-slate-600 mb-6">Je soussigné(e), déclare exacts les renseignements fournis ci-dessus et reconnais avoir pris connaissance des conditions générales de vente.</p>
                
                <div className="absolute bottom-6 right-6 text-right">
                    <p className="mb-8">Fait à .........................................., le ......../......../20........</p>
                    <p className="text-[8px] italic text-slate-400">(Faire précéder la signature de la mention "Lu et approuvé")</p>
                </div>
            </div>

        </div>
    )
}
