import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { serviceTypeLabels } from "@/lib/quote-constants"
import type { Booking } from "@/services/bookingService"

interface InvoicePDFProps {
  data: Booking & { invoiceNumber?: string; clientCode?: string; clientAddress?: string; dueDate?: string }
  amountPaid?: number
}

const teal = "#248f8b"
const navy = "#102235"
const pale = "#f4f8f8"
const border = "#dce8ea"
const borderColor = border

function safeDate(value?: string | Date | null) {
  if (!value) return "À confirmer"
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? "À confirmer" : format(date, "dd MMMM yyyy", { locale: fr })
}

function euros(value: number) {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
}

function formulaName(value?: string) {
  if (!value) return "Déménagement"
  return (serviceTypeLabels[value as keyof typeof serviceTypeLabels] || value).replace(/^Formule\s+/i, "")
}

export function InvoicePDF({ data, amountPaid = 0 }: InvoicePDFProps) {
  const totalTTC = Number(data.total || 0)
  const totalHT = totalTTC / 1.2
  const vat = totalTTC - totalHT
  const paid = Math.min(Math.max(Number(amountPaid || 0), 0), totalTTC)
  const remaining = Math.max(totalTTC - paid, 0)
  const isPaid = totalTTC > 0 && remaining <= 0
  const number = data.invoiceNumber || `${format(new Date(), "yyyy")}${String(data.id).replace(/\D/g, "").slice(-3).padStart(3, "0")}`
  const clientAddress = data.clientAddress || data.originAddress

  return <section data-pdf-page className="relative bg-white" style={{ width: "210mm", height: "297mm", padding: "10mm 12mm 18mm", boxSizing: "border-box", fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif", color: navy, overflow: "hidden" }}>
    <div className="absolute left-0 top-0 h-[297mm] w-[1.5mm]" style={{ background: "#b9d9d7" }} />

    <header className="flex items-start justify-between border-b pb-5" style={{ borderColor: "#cfe4e3" }}>
      <div><img src="/images/logo.png" alt="Déménagement du Vexin" style={{ width: "86mm", height: "auto" }} /><div className="mt-2 text-[9px] font-semibold leading-[1.5] text-slate-500">9 rue de Pontoise - 95540 Méry-sur-Oise<br />01 30 75 12 35 - 07 68 31 33 10<br />demenagementduvexin@gmail.com</div></div>
      <div className="min-w-[58mm] rounded-[14px] border px-5 py-4 text-right" style={{ borderColor: "#cfdcdf" }}><div className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: teal }}>Document comptable</div><div className="mt-2 text-[22px] font-black">FACTURE</div><div className="mt-1 text-[11px] font-bold">N° {number}</div><div className="mt-1 text-[9px] text-slate-500">Émise le {safeDate(new Date())}</div></div>
    </header>

    <div className="mt-6 grid grid-cols-[1.15fr_.85fr] gap-4">
      <div className="rounded-[14px] border p-5" style={{ borderColor: border }}><div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Facturé à</div><div className="mt-2 text-[15px] font-black">{data.clientName}</div><div className="mt-1 text-[10px] leading-[1.5] text-slate-600">{clientAddress}<br />{data.clientEmail}{data.clientPhone ? <><br />{data.clientPhone}</> : null}</div></div>
      <div className="rounded-[14px] border p-5" style={{ background: pale, borderColor }}><div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Informations</div><div className="mt-3 grid grid-cols-2 gap-y-2 text-[9px]"><span className="text-slate-500">Code client</span><strong className="text-right">{data.clientCode || "À créer"}</strong><span className="text-slate-500">Prestation</span><strong className="text-right">{formulaName(data.serviceType)}</strong><span className="text-slate-500">Date d’exécution</span><strong className="text-right">{safeDate(data.moveDate)}</strong><span className="text-slate-500">Échéance</span><strong className="text-right">{safeDate(data.dueDate)}</strong></div></div>
    </div>

    <div className="mt-6 overflow-hidden rounded-[16px] border" style={{ borderColor: border }}>
      <div className="grid grid-cols-[1fr_28mm_38mm] border-b px-5 py-3 text-[8px] font-black uppercase tracking-widest" style={{ background: pale, borderColor: border }}><span>Désignation</span><span className="text-center">Quantité</span><span className="text-right">Montant HT</span></div>
      <div className="grid min-h-[54mm] grid-cols-[1fr_28mm_38mm] px-5 py-5 text-[9px]"><div className="leading-[1.55]"><strong>Prestation de déménagement - {formulaName(data.serviceType)}</strong><p className="mt-2 text-slate-500">Chargement, protection, transport et déchargement du mobilier.</p><div className="mt-4 grid grid-cols-[22mm_1fr] gap-y-2 border-t pt-4 text-slate-600" style={{ borderColor: "#edf1f2" }}><span className="font-semibold">Départ</span><span>{data.originAddress}</span><span className="font-semibold">Arrivée</span><span>{data.destinationAddress}</span><span className="font-semibold">Distance</span><span>{data.distance || "-"} km</span></div></div><div className="text-center font-bold">{data.volume || "-"} m³</div><div className="text-right text-[12px] font-black">{euros(totalHT)}</div></div>
    </div>

    <div className="mt-5 flex items-stretch justify-between gap-5">
      <div className="flex flex-1 flex-col justify-between rounded-[14px] border p-5" style={{ borderColor: border }}><div><div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Situation du règlement</div><div className="mt-3 text-[11px] text-slate-500">Montant déjà réglé <strong className="float-right" style={{ color: navy }}>{euros(paid)}</strong></div></div><div className="mt-5 flex items-end justify-between border-t pt-4" style={{ borderColor: "#edf1f2" }}><div><div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Statut</div><strong className="text-[14px]" style={{ color: isPaid ? teal : navy }}>{isPaid ? "Facture acquittée" : "Paiement en attente"}</strong></div>{isPaid ? <span className="rounded-full px-3 py-1 text-[8px] font-black uppercase tracking-widest" style={{ background: pale, color: teal }}>Payée</span> : null}</div></div>
      <div className="w-[72mm] rounded-[14px] border p-5 text-[10px]" style={{ background: pale, borderColor }}><div className="flex justify-between"><span className="text-slate-500">Total HT</span><span>{euros(totalHT)}</span></div><div className="mt-2 flex justify-between"><span className="text-slate-500">TVA 20 %</span><span>{euros(vat)}</span></div><div className="mt-2 flex justify-between"><span className="text-slate-500">Total TTC</span><span>{euros(totalTTC)}</span></div><div className="mt-3 flex items-end justify-between border-t pt-3" style={{ borderColor: "#cfdcdf" }}><strong>Reste à payer</strong><strong className="text-[18px]" style={{ color: teal }}>{euros(remaining)}</strong></div></div>
    </div>

    <div className="mt-5 rounded-[14px] border p-5" style={{ borderColor }}><div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Coordonnées bancaires</div><div className="mt-3 grid grid-cols-[1fr_1.8fr_1fr] gap-5 text-[9px]"><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Titulaire</span><strong>D D V</strong></div><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">IBAN</span><strong>FR76 3006 6104 6100 0206 0610 284</strong></div><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">BIC</span><strong>CMCIFRPP</strong></div></div></div>

    <div className="mt-5 flex items-start justify-between gap-8"><div className="max-w-[132mm] text-[7.5px] leading-[1.55] text-slate-500">Paiement au plus tard à la date d’échéance indiquée. En cas de retard, des pénalités égales à trois fois le taux d’intérêt légal ainsi qu’une indemnité forfaitaire de 40 € pour frais de recouvrement sont exigibles.</div><div className="shrink-0 text-center"><div className="text-[9px] font-bold">La Direction</div><img src="/images/signature-direction.png" alt="Signature de la direction" className="mx-auto -mt-1 h-20 w-36 object-contain" /></div></div>

    <footer className="absolute bottom-[8mm] left-[12mm] right-[12mm] flex items-end justify-between border-t pt-3 text-[7px] leading-[1.45] text-slate-400" style={{ borderColor: "#d9e5e7" }}><div>SASU Déménagement du Vexin au capital de 27 000 €<br />SIRET 895 250 579 00011 - RCS Pontoise - APE 4942Z - TVA FR3589520579</div><div className="text-center">Artisans de votre mobilité</div><div className="font-bold" style={{ color: teal }}>PAGE 1 / 1</div></footer>
  </section>
}
