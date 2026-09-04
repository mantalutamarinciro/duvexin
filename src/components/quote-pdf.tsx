import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { serviceTypeLabels } from "@/lib/quote-constants"
import type { QuoteRequestFormData } from "@/types/quote"

interface QuotePDFProps { data: QuoteRequestFormData; quote: number }

const teal = "#248f8b"
const navy = "#102235"
const pale = "#f4f8f8"

function safeDate(value?: string | Date | null) {
  if (!value) return "À confirmer"
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? "À confirmer" : format(date, "dd MMMM yyyy", { locale: fr })
}

function euros(value: number) {
  return value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
}

function quoteNumber(data: QuoteRequestFormData) {
  if (data.quoteNumber?.trim()) return data.quoteNumber.trim()
  const seed = `${data.clientName}|${data.originAddress}|${data.destinationAddress}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 1000000
  return String(hash).padStart(6, "0")
}

function formulaName(value: string) {
  return (serviceTypeLabels[value as keyof typeof serviceTypeLabels] || value || "Économique").replace(/^Formule\s+/i, "")
}

function services(type: string) {
  if (type === "premium") return {
    included: ["Emballage intégral des effets fragiles et non fragiles", "Démontage et remontage de tout le mobilier", "Protection, transport et remise en place complète", "Équipe qualifiée et véhicule capitonné"],
    client: ["Débranchement des appareils électriques", "Transport des valeurs et effets personnels"],
  }
  if (type === "full") return {
    included: ["Emballage de la vaisselle et des objets fragiles", "Démontage et remontage du mobilier", "Protection sous couvertures et housses", "Chargement, transport et mise en place"],
    client: ["Emballage du linge, des livres et des objets non fragiles", "Débranchement des appareils électriques"],
  }
  return {
    included: ["Mise à disposition d’une équipe qualifiée", "Protection des meubles sous couvertures et film", "Protection de la literie sous housses", "Chargement, transport et mise en place", "Mise à disposition des cartons standards"],
    client: ["Emballage des effets fragiles et non fragiles", "Démontage et remontage du mobilier", "Débranchement des appareils électriques"],
  }
}

const page: React.CSSProperties = {
  width: "210mm", height: "297mm", boxSizing: "border-box", background: "#fff",
  color: navy, fontFamily: "var(--font-poppins), Poppins, Arial, sans-serif", position: "relative",
  overflow: "hidden", pageBreakAfter: "always",
}

function BrandHeader({ number, date }: { number: string; date: string }) {
  return <header className="flex items-start justify-between border-b pb-5" style={{ borderColor: "#cfe4e3" }}>
    <div><img src="/images/logo.png" alt="Déménagement du Vexin" style={{ width: "86mm", height: "auto" }} /><div className="mt-2 text-[9px] font-semibold leading-[1.5] text-slate-500">9 rue de Pontoise - 95540 Méry-sur-Oise<br />01 30 75 12 35 - 07 68 31 33 10<br />demenagementduvexin@gmail.com</div></div>
    <div className="min-w-[58mm] rounded-[14px] border px-5 py-4 text-right" style={{ borderColor: "#cfdcdf", background: "#fff", color: navy }}>
      <div className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ color: teal }}>Proposition commerciale</div>
      <div className="mt-2 text-[22px] font-black">DEVIS</div>
      <div className="mt-1 text-[11px] font-bold">N° {number}</div>
      <div className="mt-1 text-[9px] text-slate-500">Émis le {date}</div>
    </div>
  </header>
}

function Footer({ pageNumber }: { pageNumber: number }) {
  return <footer className="absolute bottom-[8mm] left-[12mm] right-[12mm] flex items-end justify-between border-t pt-3 text-[7px] leading-[1.45] text-slate-400" style={{ borderColor: "#d9e5e7" }}>
    <div>SASU Déménagement du Vexin au capital de 27 000 €<br />SIRET 895 250 579 00011 - RCS Pontoise - APE 4942Z</div>
    <div className="text-center">Artisans de votre mobilité</div>
    <div className="font-bold" style={{ color: teal }}>PAGE {pageNumber} / 2</div>
  </footer>
}

export function QuotePDF({ data, quote }: QuotePDFProps) {
  const number = quoteNumber(data)
  const totalTTC = Number(quote || 0)
  const totalHT = totalTTC / 1.2
  const vat = totalTTC - totalHT
  const clientAddress = data.clientAddress || data.originAddress
  const service = services(data.serviceType)
  const moveDate = safeDate(data.moveDate)
  const conditions = data.specialConditions || "Sous réserve de la validation des accès et des conditions de stationnement."

  return <div className="bg-white">
    <section data-pdf-page style={{ ...page, padding: "10mm 12mm 18mm" }}>
      <div className="absolute left-0 top-0 h-[297mm] w-[1.5mm]" style={{ background: "#b9d9d7" }} />
      <BrandHeader number={number} date={safeDate(new Date())} />

      <div className="mt-6 grid grid-cols-[1.15fr_.85fr] gap-4">
        <div className="rounded-[14px] border p-5" style={{ borderColor: "#dce8ea", background: "#fff" }}>
          <div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Client</div>
          <div className="mt-2 text-[15px] font-black">{data.clientName}</div>
          <div className="mt-1 text-[10px] leading-[1.5] text-slate-600">{clientAddress}<br />{data.clientEmail}<br />{data.clientPhone}</div>
        </div>
        <div className="rounded-[14px] border p-5" style={{ background: pale, borderColor: "#d6e8e7" }}>
          <div className="text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: teal }}>Projet</div>
          <div className="mt-3 grid grid-cols-2 gap-y-2 text-[9px]"><span className="text-slate-500">Formule</span><strong className="text-right">{formulaName(data.serviceType)}</strong><span className="text-slate-500">Volume</span><strong className="text-right">{data.volume} m³</strong><span className="text-slate-500">Distance</span><strong className="text-right">{data.distance} km</strong><span className="text-slate-500">Date</span><strong className="text-right">{moveDate}</strong></div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[8px] font-black uppercase tracking-[0.22em]" style={{ color: teal }}>Notre proposition</div>
        <h1 className="mt-2 text-[22px] font-black leading-tight">Un déménagement organisé<br /><span className="text-slate-600">avec précision et sérénité.</span></h1>
        <p className="mt-4 max-w-[165mm] text-[10px] leading-[1.65] text-slate-600">À la suite de votre demande, nous avons préparé cette proposition sur la base des informations communiquées. Notre équipe assure une organisation rigoureuse, une protection attentive de vos biens et un accompagnement constant jusqu’à leur remise en place.</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4">
        <div className="rounded-[14px] border p-5" style={{ borderColor: "#dce8ea" }}><div className="mb-3 text-[10px] font-black">Pris en charge par nos équipes</div><ul className="space-y-2 text-[9px] leading-[1.45] text-slate-600">{service.included.map(item => <li key={item} className="flex gap-2"><span className="font-black" style={{ color: teal }}>✓</span><span>{item}</span></li>)}</ul></div>
        <div className="rounded-[16px] border p-5" style={{ borderColor: "#dce8ea", background: "#fbfdfd" }}><div className="mb-3 text-[10px] font-black">Restant à la charge du client</div><ul className="space-y-2 text-[9px] leading-[1.45] text-slate-600">{service.client.map(item => <li key={item} className="flex gap-2"><span className="font-black text-slate-300">—</span><span>{item}</span></li>)}</ul></div>
      </div>

      <div className="mt-6 rounded-[12px] border-l-[3px] px-5 py-4 text-[9px] leading-[1.55]" style={{ borderColor: teal, background: pale }}><strong>Garantie contractuelle incluse :</strong> vos biens sont couverts à hauteur de 30 000 € selon les conditions contractuelles et la déclaration de valeur.</div>
      <div className="mt-7 flex justify-end pr-8 text-center"><div><div className="text-[10px] font-bold">La Direction</div><img src="/images/signature-direction.png" alt="Signature de la direction" className="mx-auto mt-1 h-24 w-40 object-contain" /></div></div>
      <Footer pageNumber={1} />
    </section>

    <section data-pdf-page style={{ ...page, padding: "10mm 12mm 18mm", pageBreakAfter: "auto" }}>
      <div className="absolute left-0 top-0 h-[297mm] w-[1.5mm]" style={{ background: "#b9d9d7" }} />
      <BrandHeader number={number} date={safeDate(new Date())} />
      <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-[14px] text-center text-[9px]" style={{ background: pale }}><div className="p-3"><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Formule</span><strong>{formulaName(data.serviceType)}</strong></div><div className="border-x p-3" style={{ borderColor: "#d6e8e7" }}><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Volume</span><strong>{data.volume} m³</strong></div><div className="p-3"><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Distance</span><strong>{data.distance} km</strong></div></div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        {[["Chargement", data.originPeriod || moveDate, data.originAddress, data.originAccess || "Accès à confirmer"], ["Déchargement", data.destinationPeriod || moveDate, data.destinationAddress, data.destinationAccess || "Accès à confirmer"]].map(([title, date, address, access]) => <div key={title} className="overflow-hidden rounded-[14px] border" style={{ borderColor: "#dce8ea" }}><div className="border-b px-4 py-3 text-[10px] font-black" style={{ background: pale, borderColor: "#dce8ea", color: navy }}>{title}</div><div className="space-y-3 p-4 text-[9px]"><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Période</span><strong>{date}</strong></div><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Adresse</span><strong>{address}</strong></div><div><span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400">Accès</span><span>{access}</span></div></div></div>)}
      </div>

      <div className="mt-5 overflow-hidden rounded-[16px] border" style={{ borderColor: "#dce8ea" }}>
        <div className="grid grid-cols-[1fr_28mm_37mm] border-b px-5 py-3 text-[8px] font-black uppercase tracking-widest" style={{ background: pale, borderColor: "#dce8ea", color: navy }}><span>Désignation</span><span className="text-center">Quantité</span><span className="text-right">Montant HT</span></div>
        <div className="grid min-h-[48mm] grid-cols-[1fr_28mm_37mm] px-5 py-5 text-[9px]"><div className="space-y-3 leading-[1.45]"><div><strong>Prestation de déménagement - {formulaName(data.serviceType)}</strong><p className="mt-1 text-slate-500">Protection, manutention, transport et remise en place du mobilier.</p></div><div className="border-t pt-3 text-slate-600" style={{ borderColor: "#edf1f2" }}>Démontage et remontage du mobilier selon la formule retenue</div><div className="border-t pt-3 text-slate-600" style={{ borderColor: "#edf1f2" }}>Livraison à la nouvelle adresse</div></div><div className="text-center font-bold">{data.volume} m³</div><div className="text-right text-[12px] font-black">{euros(totalHT)}</div></div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div className="flex-1 rounded-[14px] border p-4 text-[8px] leading-[1.5] text-slate-500" style={{ borderColor: "#dce8ea" }}><div className="mb-1 font-black uppercase tracking-widest" style={{ color: teal }}>Conditions particulières</div>{conditions}</div>
        <div className="w-[70mm] rounded-[14px] border p-5 text-[10px]" style={{ background: pale, borderColor: "#dce8ea", color: navy }}><div className="flex justify-between"><span className="text-slate-500">Total HT</span><span>{euros(totalHT)}</span></div><div className="mt-2 flex justify-between"><span className="text-slate-500">TVA 20 %</span><span>{euros(vat)}</span></div><div className="mt-3 flex items-end justify-between border-t pt-3" style={{ borderColor: "#cfdcdf" }}><strong>Total TTC</strong><strong className="text-[18px]" style={{ color: teal }}>{euros(totalTTC)}</strong></div></div>
      </div>

      <div className="mt-4 rounded-[14px] border p-4" style={{ borderColor: "#cfe1e2" }}><div className="text-[10px] font-black">Bon pour accord</div><div className="mt-1 text-[8px] leading-[1.5] text-slate-500">Pour acceptation, merci de nous retourner un exemplaire daté et signé, précédé de la mention « Lu et approuvé ».</div><div className="mt-3 grid grid-cols-2 gap-10 text-[9px]"><div className="text-center"><strong>Le client</strong><div className="mx-auto mt-2 h-[20mm] w-[72mm] rounded-lg border bg-white" style={{ borderColor: "#dce5e7" }} /></div><div className="text-center"><strong>La Direction</strong><img src="/images/signature-direction.png" alt="Signature de la direction" className="mx-auto -mt-1 h-24 w-40 object-contain" /></div></div></div>
      <div className="mt-2 text-center text-[8px] leading-[1.5] text-slate-500">Règlement : acompte de 30 % à l’acceptation du devis, solde de 70 % le jour du déchargement.</div>
      <Footer pageNumber={2} />
    </section>
  </div>
}
