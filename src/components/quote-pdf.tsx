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

function getFormulaDetails(type: string) {
    if (type === "premium" || type === "comfort") {
        return {
            client: ["Rien à faire, détendez-vous !"],
            movers: [
                "Emballage et déballage intégral (fragile et non fragile)",
                "Démontage et remontage de tout le mobilier",
                "Mise en penderie des vêtements sur cintres",
                "Protection sous couvertures de tout le mobilier",
                "Manutention, transport et mise en place dans les pièces"
            ]
        }
    } else if (type === "full" || type === "standard") {
        return {
            client: [
                "Emballage et déballage des objets non fragiles (livres, vêtements, linge...)",
                "Débranchement des appareils électriques"
            ],
            movers: [
                "Emballage et déballage du fragile (vaisselle, verrerie, TV)",
                "Démontage et remontage du mobilier",
                "Protection sous couvertures du mobilier",
                "Mise en penderie des vêtements sur cintres",
                "Manutention, transport et mise en place"
            ]
        }
    } else {
        // basic / eco
        return {
            client: [
                "Emballage et déballage intégral (fragile et non fragile)",
                "Démontage et remontage du mobilier",
                "Débranchement des appareils"
            ],
            movers: [
                "Protection sous couvertures du mobilier",
                "Protection spéciale de la literie et canapés",
                "Manutention, transport et mise en place dans les pièces selon vos instructions"
            ]
        }
    }
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

  const formulaDetails = getFormulaDetails(data.serviceType || "basic");

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
      <div
        className="bg-white text-slate-800"
        style={{
            width: "210mm",
            height: "297mm",
            padding: "8mm 10mm",
            boxSizing: "border-box",
            fontFamily: "Arial, Helvetica, sans-serif",
            overflow: "hidden",
            position: "relative",
            pageBreakAfter: "always"
        }}
        >
        {children}
      </div>
  )

  return (
    <div>
        {/* PAGE 1 : LE DEVIS */}
        <PageWrapper>
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
                    <div className="inline-flex items-center justify-center rounded-full bg-slate-100 border border-slate-200 px-3 py-1 font-bold uppercase text-slate-600">
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
                <section className="mt-3 rounded-[18px] bg-slate-50 border border-slate-200 p-4 text-slate-800">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div>
                    <div className="text-[9px] font-bold uppercase text-[#00ad9f]">
                        Départ
                    </div>
                    <div className="mt-1 text-[11px] font-medium leading-[1.35]">
                        {data.originAddress}
                    </div>
                    </div>

                    <div className="text-center text-[14px] font-bold text-[#00ad9f]">
                    ➔
                    </div>

                    <div className="text-right">
                    <div className="text-[9px] font-bold uppercase text-[#00ad9f]">
                        Arrivée
                    </div>
                    <div className="mt-1 text-[11px] font-medium leading-[1.35]">
                        {data.destinationAddress}
                    </div>
                    </div>
                </div>
                </section>

                {/* PRESTATION ET FORMULE */}
                <section className="mt-3 flex-1">
                    <div className="mb-1.5 text-[9px] font-bold uppercase text-[#00ad9f]">
                        Détail de la prestation
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <div className="grid grid-cols-[1fr_130px] bg-slate-50">
                        <div className="p-2.5 text-[10px] font-bold uppercase">
                            Description des services ({serviceLabel})
                        </div>
                        <div className="p-2.5 text-right text-[10px] font-bold uppercase">
                            Montant
                        </div>
                        </div>

                        <div className="grid grid-cols-[1fr_130px] border-t border-slate-200">
                        <div className="p-3">
                            <div className="text-[10px] leading-[1.45] text-slate-600 mb-3">
                            Prestation incluant la mise à disposition d&apos;une équipe de
                            professionnels, un véhicule adapté d&apos;environ {data.volume} m³,
                            le matériel de protection nécessaire, la manutention, le transport
                            et l&apos;assurance contractuelle pour un trajet estimé à {data.distance} km.
                            </div>

                            {/* DETAILS CLIENT / DEMENAGEURS */}
                            <div className="grid grid-cols-2 gap-3 text-[9px] leading-[1.3]">
                                <div>
                                    <span className="font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 inline-block w-full">À la charge du client :</span>
                                    <ul className="list-disc pl-3 text-slate-600 space-y-0.5">
                                        {formulaDetails.client.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <span className="font-bold text-[#00ad9f] border-b border-slate-200 pb-0.5 mb-1.5 inline-block w-full">À la charge de nos équipes :</span>
                                    <ul className="list-disc pl-3 text-slate-600 space-y-0.5">
                                        {formulaDetails.movers.map((item, i) => <li key={i}>{item}</li>)}
                                    </ul>
                                </div>
                            </div>

                            {data.details && (
                            <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 p-2 text-[10px] leading-[1.4] text-amber-800">
                                <strong>Notes / Inventaire Rapide :</strong> {data.details}
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

                <div className="mt-4 border-2 border-dashed border-slate-200 rounded-xl p-3 text-[10px] text-slate-500">
                    <div className="font-bold text-slate-900 mb-2">Bon pour Accord</div>
                    <div className="flex justify-between">
                        <div>
                            Fait le : <br/><br/>
                            Signature du client (précédée de la mention "Lu et approuvé") :
                        </div>
                        <div className="w-48 h-16 border border-slate-200 bg-slate-50 rounded-lg"></div>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="mt-4 border-t border-slate-200 pt-3 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-4 text-[9px] leading-[1.35] text-slate-500">
                    <div>
                    <div className="mb-1 font-bold text-slate-700">Mentions légales</div>
                    <p>
                        Ce devis est établi sous réserve de visite technique et de validation
                        des accès. Il est valable 30 jours calendaires à compter de sa date
                        d&apos;émission. En signant ce devis, le client accepte les CGV jointes en annexe.
                    </p>
                    </div>

                    <div className="text-right">
                    <div className="mb-1 font-bold text-slate-900">DÉMÉNAGEMENT DU VEXIN</div>
                    <p>SARL au capital de 10 000€</p>
                    <p>SIRET : 123 456 789 00012</p>
                    <p>Licence transport n° 2024/11/0000123</p>
                    </div>
                </div>
                <div className="text-center text-[8px] font-bold text-slate-400 mt-2">Page 1 / 3</div>
                </footer>
            </div>
        </PageWrapper>

        {/* PAGE 2 : CGV 1/2 */}
        <PageWrapper>
            <div className="flex flex-col h-full text-[9px] leading-[1.5] text-slate-600 text-justify">
                <header className="border-b border-slate-200 pb-2 mb-4">
                    <h2 className="text-lg font-black text-slate-900 uppercase">Conditions Générales de Vente</h2>
                    <p className="text-[#00ad9f] font-bold mt-1">Déménagement du Vexin - Applicable aux contrats de déménagement national</p>
                </header>

                <div className="columns-2 gap-6 flex-1">
                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 1 - INFORMATIONS GÉNÉRALES</h3>
                        <p className="mb-2">Le présent contrat est régi par les dispositions du Code civil et de la réglementation spécifique au transport routier de marchandises. L'entreprise de déménagement s'engage à réaliser les prestations décrites dans le devis conformément aux règles de l'art.</p>
                        <p>Les présentes conditions générales sont obligatoirement remises au client préalablement à la signature du contrat. Toute commande implique l'adhésion sans réserve à ces conditions.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 2 - ÉTABLISSEMENT DU DEVIS</h3>
                        <p className="mb-2">Le devis est établi en fonction des informations fournies par le client (volume, adresses, accès, particularités). En cas d'inexactitude des informations ayant servi de base au chiffrage, l'entreprise se réserve le droit de réviser le tarif ou de refuser d'exécuter la prestation.</p>
                        <p>Sauf mention contraire, le devis est valable 30 jours à compter de sa date d'émission.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 3 - PRIX ET MODALITÉS DE PAIEMENT</h3>
                        <p className="mb-2">Les prix fixés au contrat sont fermes et définitifs. Un acompte de 30% du montant global (TTC) est exigé à la signature du devis pour bloquer la date de l'intervention.</p>
                        <p>Le solde de 70% est exigible à la fin des opérations de déménagement, à la remise de la lettre de voiture. Aucun escompte n'est accordé pour paiement anticipé. En cas de retard de paiement, des pénalités de retard calculées sur la base de 3 fois le taux d'intérêt légal seront exigibles.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 4 - ASSURANCE ET RESPONSABILITÉ</h3>
                        <p className="mb-2">L'entreprise est responsable des meubles et objets qui lui sont confiés, sauf cas de force majeure, vice propre du bien ou faute du client. En cas de dommage, la responsabilité de l'entreprise est limitée aux montants fixés dans la déclaration de valeur remplie par le client.</p>
                        <p>La déclaration de valeur doit impérativement être retournée signée à l'entreprise au moins 5 jours ouvrés avant l'exécution du déménagement.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 5 - OBLIGATIONS DU CLIENT</h3>
                        <p className="mb-2">Le client s'engage à effectuer toutes les démarches administratives nécessaires au déménagement (réservation de stationnement, autorisations diverses). Il doit s'assurer que les accès (portes, escaliers, ascenseurs) permettent le passage des meubles.</p>
                        <p>Le client ou son mandataire doit être présent au chargement et au déchargement pour diriger les équipes et vérifier l'état du mobilier.</p>
                    </div>
                </div>
                
                <footer className="mt-auto border-t border-slate-200 pt-2 flex justify-between items-center text-[8px] text-slate-400">
                    <span>Paraphe du client : ..............................</span>
                    <span className="font-bold">Page 2 / 3</span>
                </footer>
            </div>
        </PageWrapper>

        {/* PAGE 3 : CGV 2/2 */}
        <PageWrapper>
            <div className="flex flex-col h-full text-[9px] leading-[1.5] text-slate-600 text-justify">
                <header className="border-b border-slate-200 pb-2 mb-4">
                    <h2 className="text-lg font-black text-slate-900 uppercase">Conditions Générales de Vente</h2>
                    <p className="text-[#00ad9f] font-bold mt-1">Déménagement du Vexin - Applicable aux contrats de déménagement national</p>
                </header>

                <div className="columns-2 gap-6 flex-1">
                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 6 - RÉSILIATION ET ANNULATION</h3>
                        <p className="mb-2">Conformément à la loi, en cas d'annulation par le client moins de 14 jours avant la date prévue, l'acompte de 30% restera acquis à l'entreprise à titre d'indemnité compensatrice.</p>
                        <p>Si l'annulation intervient moins de 48 heures avant la prestation, l'intégralité du devis pourra être réclamée.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 7 - FORMALITÉS À LA LIVRAISON (LIVRAISON ET RÉSERVES)</h3>
                        <p className="mb-2">À la fin du déménagement, le client doit signer la lettre de voiture (bulletin de livraison). En cas d'avarie constatée sur les biens, le client doit impérativement émettre des réserves précises et détaillées sur la lettre de voiture.</p>
                        <p>Ces réserves doivent être confirmées par lettre recommandée avec accusé de réception adressée à l'entreprise de déménagement dans les 10 jours calendaires suivant la livraison (article L133-3 du Code de commerce).</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 8 - PROTECTION DES DONNÉES (RGPD)</h3>
                        <p className="mb-2">Les informations recueillies sont nécessaires pour le traitement de votre demande de déménagement. Elles sont destinées à la direction et ne seront en aucun cas cédées à des tiers à des fins commerciales.</p>
                        <p>Conformément à la loi informatique et libertés, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-slate-900 text-[10px] mb-1">ARTICLE 9 - LITIGES ET MÉDIATION</h3>
                        <p className="mb-2">En cas de litige, le client s'adressera en priorité à l'entreprise pour trouver une solution amiable. À défaut d'accord, le client a la possibilité de recourir gratuitement à un médiateur de la consommation (selon les conditions du Code de la consommation).</p>
                        <p>Tout litige non résolu à l'amiable sera soumis à la compétence exclusive du tribunal de commerce compétent du siège de l'entreprise de déménagement.</p>
                    </div>

                    <div className="mb-4 mt-8 bg-slate-50 border border-slate-200 p-4 rounded-xl">
                        <h3 className="font-bold text-[#00ad9f] text-[10px] mb-2 uppercase text-center">Engagement Déménagement du Vexin</h3>
                        <p className="text-center italic text-slate-500">
                            "Nous mettons un point d'honneur à traiter vos effets personnels avec le plus grand soin. Notre équipe est formée pour garantir la sécurité de vos biens durant l'intégralité du transport."
                        </p>
                    </div>
                </div>

                <footer className="mt-auto border-t border-slate-200 pt-2 flex justify-between items-center text-[8px] text-slate-400">
                    <span>Paraphe du client : ..............................</span>
                    <span className="font-bold">Page 3 / 3</span>
                </footer>
            </div>
        </PageWrapper>
    </div>
  )
}