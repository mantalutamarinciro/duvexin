import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { serviceTypeLabels } from "@/lib/quote-constants"
import type { QuoteRequestFormData } from "@/types/quote"

interface QuotePDFProps { data: QuoteRequestFormData; quote: number }
const teal = "#0098a8"

function safeDate(value?: string | Date | null) {
  if (!value) return "À CONFIRMER"
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? "À CONFIRMER" : format(date, "dd/MM/yyyy", { locale: fr })
}
function euros(value: number) { return `${value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €` }
function historicalNumber(data: QuoteRequestFormData) {
  if (data.quoteNumber?.trim()) return data.quoteNumber.trim()
  const seed = `${data.clientName}|${data.originAddress}|${data.destinationAddress}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 1000000
  return String(hash).padStart(6, "0")
}
function formulaName(value: string) {
  return (serviceTypeLabels[value as keyof typeof serviceTypeLabels] || value || "Économique").replace(/^Formule\s+/i, "").toUpperCase()
}
function serviceLists(type: string) {
  if (type === "premium") return { included: ["Mise à disposition de personnel qualifié", "Emballage complet des effets fragiles et non fragiles", "Démontage et remontage des meubles", "Chargement, transport, déchargement et remise en place"], client: ["Débranchement et rebranchement des appareils électriques", "Transport des objets personnels et valeurs"] }
  if (type === "full") return { included: ["Mise à disposition de personnel qualifié", "Emballage des meubles sous couvertures, film à bulle et film", "Emballage de la vaisselle et des objets fragiles", "Démontage et remontage des meubles", "Chargement, transport et mise en place du mobilier"], client: ["Emballage du linge, vêtements, livres et objets non fragiles en cartons", "Débranchement des appareils électriques"] }
  return { included: ["Mise à disposition de personnel qualifié", "Emballage des meubles sous couvertures, film à bulle et film", "Emballage de la literie sous housses plastiques", "Chargement en véhicule capitonné", "Déchargement et mise en place du mobilier", "Mise à disposition des cartons standards"], client: ["Emballage du linge, vêtements, livres et objets non fragiles en cartons", "Emballage des objets fragiles et de la vaisselle", "Déballage des cartons", "Débranchement des appareils"] }
}
const pageStyle: React.CSSProperties = { width: "210mm", height: "297mm", boxSizing: "border-box", background: "white", color: "#171717", fontFamily: "Arial, Helvetica, sans-serif", position: "relative", overflow: "hidden", pageBreakAfter: "always" }

export function QuotePDF({ data, quote }: QuotePDFProps) {
  const number = historicalNumber(data)
  const clientAddress = data.clientAddress || data.originAddress
  const totalTTC = Number(quote || 0), totalHT = totalTTC / 1.2, vat = totalTTC - totalHT
  const lists = serviceLists(data.serviceType)
  const period = data.moveDate ? safeDate(data.moveDate) : "À CONFIRMER"
  const specialConditions = data.specialConditions || "Sous réserve des accès et stationnement"
  return <div className="bg-white">
    <section data-pdf-page style={{ ...pageStyle, padding: "4mm", border: `2px solid ${teal}` }}>
      <div className="relative h-[72mm] pt-5">
        <div className="absolute left-0 top-[17mm] w-[56mm] rounded-[18px] border bg-white/95 p-4 italic leading-[1.45]" style={{ borderColor: teal, color: teal, fontFamily: "Georgia, serif", fontSize: "12px" }}><div className="font-bold">DEVIS N° {number}</div><div>Date : {safeDate(new Date())}</div><div>Code client : {data.clientCode || "À CRÉER"}</div><div>Devis valable 1 mois</div></div>
        <div className="absolute left-1/2 top-0 w-[96mm] -translate-x-1/2 text-center"><img src="/images/logo.png" alt="Déménagement du Vexin" style={{ width: "96mm", height: "auto", margin: "0 auto" }} /><div className="mt-1 flex justify-center gap-8 text-left text-[9px] font-bold" style={{ color: teal }}><span>9 rue de Pontoise<br />95540 MERY-SUR-OISE</span><span>TEL : 01 30 75 12 35<br />MOB : 07 68 31 33 10</span></div></div>
        <div className="absolute right-0 top-[17mm] w-[62mm] rounded-[18px] border bg-white/95 p-4 text-center italic leading-[1.45]" style={{ borderColor: teal, color: teal, fontFamily: "Georgia, serif", fontSize: "12px" }}><div className="underline">Adresse du Client</div><div>{data.clientName}</div><div>{clientAddress}</div></div>
      </div>
      <div className="px-9 pt-8 text-[11px] leading-[1.62]">
        <p>Nous faisons suite à votre demande et vous adressons le devis concernant votre prochain déménagement, établi selon les informations que vous nous avez communiquées.</p><p className="mt-4">Nous nous engageons à réaliser les prestations suivantes :</p>
        <ul className="mt-4 italic">{lists.included.map(item => <li key={item}>- {item}</li>)}</ul><p className="mt-5 italic">Les prestations restant à votre charge sont :</p><ul className="mt-4 italic">{lists.client.map(item => <li key={item}>- {item}</li>)}</ul>
        <p className="mt-6">En espérant avoir répondu à vos attentes, nous restons à votre disposition pour tout complément d’information.</p><p className="mt-5 font-bold">Le présent devis inclut une garantie d’assurance contractuelle à hauteur de 30 000€ de mobilier.</p><p className="mt-5">Nous vous prions d’agréer, l’expression de nos salutations distinguées.</p>
        <div className="mt-8 flex justify-end pr-20 text-center"><div><div className="text-[13px] font-bold">La Direction</div><img src="/images/signature-direction.png" alt="Signature de la direction" className="mt-1 h-16 w-28 object-contain" /></div></div>
      </div>
      <div className="absolute bottom-[31mm] left-0 right-0 text-center text-[9px] italic" style={{ color: "#66c1cf" }}>SASU DEMENAGEMENT DU VEXIN AU CAPITAL DE 27 000€ SIRET 895 250 579 00011 RCS PONTOISE <strong>CODE APE 4942Z</strong></div>
      <div className="absolute bottom-[10mm] left-0 right-0 text-center text-[10px] italic leading-[1.45]">Conditions de règlement : &nbsp; - Chèque 30 % d’acompte à l’acceptation du devis (non encaissé)<br /><span className="pl-32">- Chèque 70% le jour de déchargement</span></div>
    </section>
    <section data-pdf-page style={{ ...pageStyle, padding: "7mm 8mm 4mm", border: `2px solid ${teal}`, pageBreakAfter: "auto" }}>
      <div className="grid grid-cols-[1fr_66mm] items-start gap-8"><img src="/images/logo.png" alt="Déménagement du Vexin" style={{ width: "92mm", height: "auto" }} /><div className="mt-5 rounded-[18px] border p-4 text-center text-[12px] italic leading-[1.45]" style={{ borderColor: teal, color: teal, fontFamily: "Georgia, serif" }}><div className="underline">Adresse du Client</div><div>{data.clientName}</div><div>{clientAddress}</div></div></div>
      <div className="mt-5 grid grid-cols-3 border text-center text-[10px] italic"><div>Catégorie : {formulaName(data.serviceType)}</div><div>Volume : {data.volume}m³</div><div>Distance : {data.distance}km</div></div>
      <div className="mt-4 grid grid-cols-2 text-[10px] italic">{[["CHARGEMENT", data.originPeriod || period, data.originAddress, data.originAccess || "À confirmer"], ["DECHARGEMENT", data.destinationPeriod || period, data.destinationAddress, data.destinationAccess || "À confirmer"]].map(([title, date, address, access]) => <div key={title} className="border border-r-0 last:border-r"><div className="border-b bg-slate-50 py-1 text-center not-italic">{title}</div><div className="grid min-h-[47mm] grid-cols-[18mm_1fr] gap-y-4 p-1"><strong>PERIODE</strong><span>{String(date).toUpperCase()}</span><strong>ADRESSE</strong><span>{address}</span><strong>ACCÈS</strong><span>{access}</span><span /><span>{specialConditions}</span></div></div>)}</div>
      <div className="border border-t-0 text-center text-[10px] font-bold tracking-[0.35em]">DÉTAIL DU PRIX (EN EUROS)</div>
      <table className="w-full table-fixed border-collapse text-[10px]"><thead><tr><th className="w-[51%] border p-1">Désignation</th><th className="w-[15%] border p-1">Quantité</th><th className="w-[19%] border p-1">Prix unitaire</th><th className="w-[15%] border p-1">Total HT</th></tr></thead><tbody><tr className="h-[54mm] align-top italic"><td className="border p-2 leading-[1.5]">Chargement de l’ensemble des objets, mobiliers, appareils et mise à disposition du matériel<br /><br />Démontage et remontage des meubles<br /><br />Livraison à la nouvelle adresse<br /><br />Déchargement de l’ensemble des objets, mobiliers, appareils</td><td className="border p-2 text-center">{data.volume}m³<br /><br /><br /><br /><br /><br />{data.volume}m³</td><td className="border p-2" /><td className="border p-2 text-right">{euros(totalHT)}</td></tr></tbody></table>
      <div className="mt-3 flex items-start justify-between text-[10px] italic"><div className="max-w-[105mm]"><div>CONDITIONS PARTICULIERES</div><div className="mt-5 bg-slate-100 font-bold underline">Pour acceptation, nous retourner un exemplaire signé du devis.</div></div><div className="w-[74mm] rounded-[14px] border p-3 text-[12px] leading-[1.5]"><div className="flex justify-between"><span>Total HT:</span><span>{euros(totalHT)}</span></div><div className="flex justify-between"><span>TVA 20 %:</span><span>{euros(vat)}</span></div><div className="flex justify-between font-bold"><span>Total TTC:</span><span>{euros(totalTTC)}</span></div></div></div>
      <div className="mt-12 flex justify-around text-center font-serif text-[12px] font-bold italic"><span>Le client : <small>(lu et approuvé)</small></span><span>La Direction :<img src="/images/signature-direction.png" alt="Signature de la direction" className="mx-auto mt-1 h-16 w-28 object-contain" /></span></div>
      <div className="absolute bottom-[10mm] left-0 right-0 text-center text-[10px] italic leading-[1.45]">Conditions de règlement : &nbsp; - Chèque 30 % d’acompte à l’acceptation du devis (non encaissé)<br /><span className="pl-32">- Chèque 70% le jour de déchargement</span></div>
    </section>
  </div>
}
