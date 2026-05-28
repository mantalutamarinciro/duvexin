import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { serviceTypeLabels } from "@/lib/quote-constants"
import type { QuoteRequestFormData } from "@/types/quote"

interface QuotePDFProps {
  data: QuoteRequestFormData
  quote: number
}

function safeFormatDate(value?: string | Date | null, pattern = "dd/MM/yyyy") {
  if (!value) return "-"
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return "-"
  return format(date, pattern, { locale: fr })
}

function money(value: number) {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

function buildQuoteNumber(clientName: string) {
  const now = new Date()
  const prefix = clientName?.trim()?.slice(0, 3)?.toUpperCase() || "CLI"
  return `Q-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${prefix}`
}

export function QuotePDF({ data, quote }: QuotePDFProps) {
  const today = new Date()
  const expiryDate = new Date()
  expiryDate.setDate(today.getDate() + 30)

  const quoteNumber = buildQuoteNumber(data.clientName)
  const totalHT = quote / 1.2
  const vat = quote - totalHT

  const serviceLabel =
    serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels] ||
    data.serviceType ||
    "Prestation de déménagement"

  return (
    <div
      className="bg-white text-slate-800"
      style={{
        width: "210mm",
        height: "297mm",
        padding: "8mm 10mm",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <header className="flex items-start justify-between border-b-2 border-[#00ad9f] pb-3">
          <div className="max-w-[48%]">
            <img
              src="/images/logo.png"
              alt="Logo Déménagement du Vexin"
              style={{ height: "46px", width: "auto", objectFit: "contain" }}
            />
            <div className="mt-1.5 text-[10px] leading-[1.35] text-slate-600">
              <div className="font-bold uppercase text-[#00ad9f]">
                Artisans de votre mobilité
              </div>
              <div className="mt-0.5">9 Rue de Pontoise</div>
              <div>95540 Méry-sur-Oise</div>
              <div>01 30 75 12 35</div>
              <div>contact@demenagementduvexin.fr</div>
            </div>
          </div>

          <div className="text-right text-[10px] leading-[1.35]">
            <div className="inline-block rounded-full bg-[#0f172a] px-3 py-1 font-bold uppercase text-white">
              Devis
            </div>
            <div className="mt-1.5 font-bold text-slate-900">N° {quoteNumber}</div>
            <div className="mt-0.5 text-slate-500">
              Date : {safeFormatDate(today, "d MMMM yyyy")}
            </div>
            <div className="font-bold text-[#00ad9f]">
              Valable jusqu&apos;au : {safeFormatDate(expiryDate, "d MMMM yyyy")}
            </div>
          </div>
        </header>

        {/* CLIENT + PROJET */}
        <section className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1.5 text-[9px] font-bold uppercase text-[#00ad9f]">
              Destinataire
            </div>
            <div className="text-[13px] font-bold text-slate-900">{data.clientName}</div>
            <div className="mt-0.5 text-[11px]">{data.clientEmail}</div>
            <div className="text-[11px]">
              {data.clientPhone || "Téléphone non renseigné"}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="mb-1.5 text-[9px] font-bold uppercase text-[#00ad9f]">
              Votre projet
            </div>
            <div className="space-y-0.5 text-[11px] leading-[1.35]">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Date prévue</span>
                <span className="text-right font-bold">
                  {safeFormatDate(data.moveDate, "d MMMM yyyy")}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Volume estimé</span>
                <span className="font-bold">{data.volume} m³</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Distance</span>
                <span className="font-bold">{data.distance} km</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">Formule</span>
                <span className="max-w-[60%] text-right font-bold">{serviceLabel}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ADRESSES */}
        <section className="mt-3 rounded-[18px] bg-[#0f172a] p-4 text-white">
          <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
            <div>
              <div className="text-[9px] font-bold uppercase text-[#00ad9f]">
                Départ
              </div>
              <div className="mt-1.5 text-[11px] leading-[1.35]">
                {data.originAddress}
              </div>
            </div>

            <div className="pt-4 text-center text-[10px] font-bold text-[#00ad9f]">
              →
            </div>

            <div className="text-right">
              <div className="text-[9px] font-bold uppercase text-[#00ad9f]">
                Arrivée
              </div>
              <div className="mt-1.5 text-[11px] leading-[1.35]">
                {data.destinationAddress}
              </div>
            </div>
          </div>
        </section>

        {/* PRESTATION */}
        <section className="mt-3">
          <div className="mb-1.5 text-[9px] font-bold uppercase text-[#00ad9f]">
            Détail de la prestation
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-[1fr_130px] bg-slate-50">
              <div className="p-2.5 text-[10px] font-bold uppercase">
                Description des services
              </div>
              <div className="p-2.5 text-right text-[10px] font-bold uppercase">
                Montant
              </div>
            </div>

            <div className="grid grid-cols-[1fr_130px] border-t border-slate-200">
              <div className="p-3">
                <div className="text-[13px] font-bold text-slate-900">{serviceLabel}</div>
                <div className="mt-1.5 text-[10px] leading-[1.45] text-slate-600">
                  Prestation incluant la mise à disposition d&apos;une équipe de
                  professionnels, un véhicule adapté d&apos;environ {data.volume} m³,
                  le matériel de protection nécessaire, la manutention, le transport
                  et l&apos;assurance contractuelle pour un trajet estimé à {data.distance} km.
                </div>

                {data.details && (
                  <div className="mt-2 rounded-xl border border-amber-100 bg-amber-50 p-2.5 text-[10px] leading-[1.4] text-amber-800">
                    <strong>Notes particulières :</strong> {data.details}
                  </div>
                )}
              </div>

              <div className="p-3 text-right">
                <div className="text-[17px] font-bold text-slate-900">{money(quote)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CHIFFRAGE */}
        <section className="mt-3 flex justify-end">
          <div className="w-[250px] rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">Total HT</span>
              <span className="font-medium">{money(totalHT)}</span>
            </div>
            <div className="mt-1.5 flex justify-between text-[11px]">
              <span className="text-slate-500">TVA (20%)</span>
              <span className="font-medium">{money(vat)}</span>
            </div>
            <div className="mt-2 flex items-end justify-between border-t border-slate-200 pt-2">
              <span className="text-[11px] font-bold uppercase">Total TTC</span>
              <span className="text-[19px] font-bold text-[#00ad9f]">{money(quote)}</span>
            </div>
          </div>
        </section>

        {/* FOOTER - compact et collé en bas */}
        <footer className="mt-auto border-t border-slate-200 pt-3">
          <div className="grid grid-cols-2 gap-4 text-[9px] leading-[1.35] text-slate-500">
            <div>
              <div className="mb-1 font-bold text-slate-700">Mentions légales</div>
              <p>
                Ce devis est établi sous réserve de visite technique et de validation
                des accès. Il est valable 30 jours calendaires à compter de sa date
                d&apos;émission. Assurance contractuelle incluse.
              </p>
            </div>

            <div className="text-right">
              <div className="mb-1 font-bold text-slate-900">DÉMÉNAGEMENT DU VEXIN</div>
              <p>SARL au capital de 10 000€</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>Licence transport n° 2024/11/0000123</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}