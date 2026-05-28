import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Booking } from "@/services/bookingService";
import { serviceTypeLabels } from "@/lib/quote-constants";

interface RoadmapPDFProps {
  data: Booking;
}

function getServiceLabel(serviceType?: string) {
  switch (serviceType) {
    case "eco":
    case "standard":
    case "basic":
      return serviceTypeLabels.basic;

    case "comfort":
    case "full":
      return serviceTypeLabels.full;

    case "luxury":
    case "premium":
      return serviceTypeLabels.premium;

    default:
      return serviceTypeLabels.basic;
  }
}

function safeDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return format(date, "EEEE d MMMM yyyy", { locale: fr });
}

export function RoadmapPDF({ data }: RoadmapPDFProps) {
  return (
    <div
      className="bg-white text-slate-900 p-12 font-sans"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      <header className="flex items-center justify-between border-b-4 border-[#00ad9f] pb-6">
        <div className="flex items-center gap-6">
          <img
            src="/images/logo.png"
            alt="Logo Déménagement du Vexin"
            style={{ height: "50px", width: "auto" }}
          />
          <div>
            <h1 className="mb-0.5 text-2xl font-black text-[#0f172a]">
              FEUILLE DE ROUTE
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#00ad9f]">
              Mission Équipe de Déménagement
            </p>
          </div>
        </div>

        <div className="space-y-1 text-right">
          <p className="text-sm font-bold">
            DATE : {safeDate(data.moveDate)}
          </p>
          <p className="text-xs text-slate-500">
            Réf : {data.id.substring(0, 8).toUpperCase()}
          </p>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-2 gap-8">
        <div className="rounded-3xl bg-[#0f172a] p-6 text-white">
          <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-[#00ad9f]">
            Équipe assignée
          </h3>
          <p className="mb-2 text-2xl font-black">
            {data.assignedTeam || "NON ASSIGNÉE"}
          </p>
          <p className="text-sm font-medium text-slate-400">
            Camion : {data.assignedVehicleRegistration || "À PRÉCISER"}
          </p>
        </div>

        <div className="rounded-3xl border-2 border-slate-100 p-6">
          <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Contact Client
          </h3>
          <p className="text-xl font-bold text-slate-900">{data.clientName}</p>
          <p className="mt-1 text-lg font-black text-[#00ad9f]">
            {data.clientPhone || "Pas de numéro"}
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
            <p className="mb-1 text-[10px] font-black uppercase text-slate-400">
              Volume
            </p>
            <p className="text-2xl font-black">
              {typeof data.volume === "number" ? `${data.volume} m³` : "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
            <p className="mb-1 text-[10px] font-black uppercase text-slate-400">
              Prestation
            </p>
            <p className="text-sm font-bold">{getServiceLabel(data.serviceType)}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
            <p className="mb-1 text-[10px] font-black uppercase text-slate-400">
              Distance
            </p>
            <p className="text-2xl font-black">
              {typeof data.distance === "number" ? `${data.distance} km` : "-"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#00ad9f]">
            Itinéraire & Accès
          </h3>

          <div className="flex items-stretch gap-6">
            <div className="w-1 rounded-full bg-[#00ad9f]" />
            <div className="space-y-8 py-2">
              <div>
                <p className="text-xs font-black uppercase text-slate-400">
                  Point de Départ (Chargement)
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {data.originAddress}
                </p>
              </div>

              <div>
                <p className="text-xs font-black uppercase text-slate-400">
                  Point d&apos;Arrivée (Livraison)
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {data.destinationAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {"details" in data && data.details ? (
          <div className="rounded-[2.5rem] border border-amber-100 bg-amber-50 p-8">
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-amber-600">
              Instructions Chef d&apos;Équipe
            </h3>
            <p className="font-medium leading-relaxed text-slate-800">
              {data.details}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8">
        <h3 className="mb-6 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">
          Check-list de mission
        </h3>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {[
            "Vérification du matériel de protection",
            "Présentation de la lettre de voiture",
            "Photos avant chargement (biens sensibles)",
            "Vérification calage & arrimage",
            "Mise en place plaques protection sols",
            "Photos après déchargement",
            "Signature de fin de mission par client",
            "Nettoyage zone de travail",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-md border-2 border-slate-200" />
              <span className="text-xs font-medium text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-12 text-center text-[10px] text-slate-400">
        <p>
          Ce document est interne à la société Déménagement du Vexin. En cas
          d&apos;urgence sur le terrain : 01 30 75 12 35.
        </p>
      </footer>
    </div>
  );
}