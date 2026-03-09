import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { Booking } from "@/services/bookingService"
import { serviceTypeLabels } from "@/lib/quote-constants"

interface RoadmapPDFProps {
    data: Booking
}

export function RoadmapPDF({ data }: RoadmapPDFProps) {
    return (
        <div className="bg-white text-slate-900 p-12 font-sans" style={{ width: '210mm', minHeight: '297mm' }}>
            <header className="flex justify-between items-center pb-6 border-b-4 border-[#00ad9f]">
                <div className="flex items-center gap-6">
                    <img 
                        src="/images/logo.png" 
                        alt="Logo Déménagement du Vexin" 
                        style={{ height: '50px', width: 'auto' }}
                    />
                    <div>
                        <h1 className="text-2xl font-black text-[#0f172a] mb-0.5">FEUILLE DE ROUTE</h1>
                        <p className="text-[10px] font-bold text-[#00ad9f] uppercase tracking-widest">Mission Équipe de Déménagement</p>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <p className="text-sm font-bold">DATE : {format(new Date(data.moveDate), "EEEE d MMMM yyyy", { locale: fr })}</p>
                    <p className="text-xs text-slate-500">Réf : {data.id.substring(0,8).toUpperCase()}</p>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-8 mt-10">
                {/* Team Info */}
                <div className="bg-[#0f172a] text-white p-6 rounded-3xl">
                    <h3 className="text-[10px] font-black uppercase text-[#00ad9f] mb-4 tracking-widest">Équipe assignée</h3>
                    <p className="text-2xl font-black mb-2">{data.assignedTeam || 'NON ASSIGNÉE'}</p>
                    <p className="text-sm text-slate-400 font-medium">Camion : {data.assignedVehicleRegistration || 'À PRÉCISER'}</p>
                </div>
                {/* Client Quick Info */}
                <div className="border-2 border-slate-100 p-6 rounded-3xl">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Contact Client</h3>
                    <p className="text-xl font-bold text-slate-900">{data.clientName}</p>
                    <p className="text-lg font-black text-[#00ad9f] mt-1">{data.clientPhone || 'Pas de numéro'}</p>
                </div>
            </div>

            {/* Mission Details */}
            <div className="mt-12 space-y-8">
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Volume</p>
                        <p className="text-2xl font-black">{data.volume} m³</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Prestation</p>
                        <p className="text-sm font-bold truncate">{serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels]}</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Distance</p>
                        <p className="text-2xl font-black">{data.distance} km</p>
                    </div>
                </div>

                {/* Itinerary */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase text-[#00ad9f] tracking-widest">Itinéraire & Accès</h3>
                    
                    <div className="flex gap-6 items-stretch">
                        <div className="w-1 bg-[#00ad9f] rounded-full" />
                        <div className="space-y-8 py-2">
                            <div>
                                <p className="text-xs font-black uppercase text-slate-400">Point de Départ (Chargement)</p>
                                <p className="text-lg font-bold text-slate-900 mt-1">{data.originAddress}</p>
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase text-slate-400">Point d'Arrivée (Livraison)</p>
                                <p className="text-lg font-bold text-slate-900 mt-1">{data.destinationAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions Spécifiques */}
                {data.details && (
                    <div className="p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100">
                        <h3 className="text-[10px] font-black uppercase text-amber-600 mb-4 tracking-widest">Instructions Chef d'Équipe</h3>
                        <p className="text-slate-800 leading-relaxed font-medium">{data.details}</p>
                    </div>
                )}
            </div>

            {/* Check-list terrain */}
            <div className="mt-12 p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
                <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest text-center">Check-list de mission</h3>
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {[
                        "Vérification du matériel de protection",
                        "Présentation de la lettre de voiture",
                        "Photos avant chargement (biens sensibles)",
                        "Vérification calage & arrimage",
                        "Mise en place plaques protection sols",
                        "Photos après déchargement",
                        "Signature de fin de mission par client",
                        "Nettoyage zone de travail"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-5 w-5 rounded-md border-2 border-slate-200" />
                            <span className="text-xs font-medium text-slate-600">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="mt-auto pt-12 text-center text-[10px] text-slate-400">
                <p>Ce document est interne à la société Déménagement du Vexin. En cas d'urgence sur le terrain : 01 30 75 12 35.</p>
            </footer>
        </div>
    )
}