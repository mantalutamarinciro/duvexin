import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Booking } from "@/services/bookingService"
import { serviceTypeLabels } from "@/lib/quote-constants"

interface WaybillPDFProps {
    data: Booking
}

export function WaybillPDF({ data }: WaybillPDFProps) {
    const today = new Date();

    return (
        <div className="bg-white text-slate-900 p-10 font-sans text-[10px]" style={{ width: '210mm', minHeight: '297mm' }}>
            {/* Header Officiel */}
            <header className="flex justify-between items-center pb-6 border-b-2 border-slate-900">
                <div className="flex items-center gap-6">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo Déménagement du Vexin" 
                        style={{ height: '50px', width: 'auto' }}
                    />
                    <div className="space-y-1">
                        <div className="text-xl font-black tracking-tighter">DÉMÉNAGEMENT DU VEXIN</div>
                        <p className="text-[8px] text-slate-500">9 Rue de Pontoise, 95540 Méry-sur-Oise | 01 30 75 12 35</p>
                        <p className="text-[8px] text-slate-500">Licence n° 2024/11/0000123 | SIRET 123 456 789 00012</p>
                    </div>
                </div>
                <div className="text-right">
                    <h1 className="text-2xl font-black uppercase tracking-tight">Lettre de voiture</h1>
                    <p className="font-bold">N° DOSSIER : {data.id.substring(0,8).toUpperCase()}</p>
                </div>
            </header>

            {/* Avis de transport */}
            <div className="mt-6 border-2 border-slate-900 p-4 bg-slate-50 rounded-xl">
                <p className="font-bold text-center uppercase text-xs">Document obligatoire à bord du véhicule (Arrêté du 9 novembre 1999)</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
                {/* Expéditeur */}
                <div className="space-y-4">
                    <h3 className="bg-slate-900 text-white px-3 py-1 font-bold uppercase tracking-widest text-[9px] rounded-md">1. Client / Expéditeur</h3>
                    <div className="pl-2 space-y-1">
                        <p className="font-bold text-sm">{data.clientName}</p>
                        <p>{data.clientEmail}</p>
                        <p>{data.clientPhone || '-'}</p>
                    </div>
                </div>
                {/* Transporteur */}
                <div className="space-y-4">
                    <h3 className="bg-slate-900 text-white px-3 py-1 font-bold uppercase tracking-widest text-[9px] rounded-md">2. Entreprise de transport</h3>
                    <div className="pl-2 space-y-1">
                        <p className="font-bold text-sm">DÉMÉNAGEMENT DU VEXIN</p>
                        <p>Équipe : <span className="font-bold">{data.assignedTeam || 'En attente'}</span></p>
                        <p>Véhicule : <span className="font-bold">{data.assignedVehicleRegistration || 'En attente'}</span></p>
                    </div>
                </div>
            </div>

            {/* Lieux et Dates */}
            <div className="grid grid-cols-2 gap-8 mt-8 border-t border-slate-200 pt-6">
                <div className="space-y-4">
                    <h3 className="bg-slate-900 text-white px-3 py-1 font-bold uppercase tracking-widest text-[9px] rounded-md">3. Chargement (Origine)</h3>
                    <div className="pl-2">
                        <p className="font-bold">Adresse :</p>
                        <p className="mb-2 leading-relaxed">{data.originAddress}</p>
                        <p>Date prévue : <span className="font-bold">{format(new Date(data.moveDate), "d MMMM yyyy", { locale: fr })}</span></p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="bg-slate-900 text-white px-3 py-1 font-bold uppercase tracking-widest text-[9px] rounded-md">4. Livraison (Destination)</h3>
                    <div className="pl-2">
                        <p className="font-bold">Adresse :</p>
                        <p className="mb-2 leading-relaxed">{data.destinationAddress}</p>
                        <p>Volume : <span className="font-bold text-base">{data.volume} m³</span></p>
                    </div>
                </div>
            </div>

            {/* Prestation et Observations */}
            <div className="mt-8 space-y-4">
                <h3 className="bg-slate-900 text-white px-3 py-1 font-bold uppercase tracking-widest text-[9px] rounded-md">5. Nature de la prestation & Observations</h3>
                <div className="border border-slate-200 rounded-xl p-4 min-h-[80px]">
                    <p><strong>Formule :</strong> {serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels]}</p>
                    <p className="mt-2 text-slate-400 italic">Espace réservé aux réserves et observations éventuelles lors du chargement :</p>
                    <div className="h-12 border-b border-slate-100"></div>
                </div>
            </div>

            {/* État des biens et Signatures */}
            <div className="mt-12 grid grid-cols-2 gap-8">
                {/* Départ */}
                <div className="border-2 border-slate-200 rounded-2xl p-6 space-y-10 h-64">
                    <div>
                        <p className="font-black text-xs uppercase mb-1">A. Prise en charge (Départ)</p>
                        <p className="text-[8px] text-slate-500 leading-tight">Le client reconnaît avoir remis les biens décrits ci-dessus dans l'état déclaré.</p>
                    </div>
                    <div className="flex justify-between items-end pt-12">
                        <div className="text-[8px] text-center border-t border-slate-300 w-24 pt-1">Signature Client</div>
                        <div className="text-[8px] text-center border-t border-slate-300 w-24 pt-1">Signature Chef d'équipe</div>
                    </div>
                </div>
                {/* Arrivée */}
                <div className="border-2 border-slate-200 rounded-2xl p-6 space-y-10 h-64">
                    <div>
                        <p className="font-black text-xs uppercase mb-1">B. Fin de travail (Arrivée)</p>
                        <p className="text-[8px] text-slate-500 leading-tight">Le client reconnaît avoir reçu les biens en bon état, sauf réserves mentionnées au cadre 5.</p>
                    </div>
                    <div className="flex justify-between items-end pt-12">
                        <div className="text-[8px] text-center border-t border-slate-300 w-24 pt-1">Signature Client</div>
                        <div className="text-[8px] text-center border-t border-slate-300 w-24 pt-1">Signature Chef d'équipe</div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 pt-4 border-t border-slate-100 text-center text-[8px] text-slate-400">
                <p>La lettre de voiture constitue le contrat de transport. Toute réclamation doit être inscrite sur ce document lors de la livraison.</p>
                <p className="mt-1">DÉMÉNAGEMENT DU VEXIN - Expertise Logistique & Patrimoine</p>
            </footer>
        </div>
    )
}