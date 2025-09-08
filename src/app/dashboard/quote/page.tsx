
"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon, Download, Loader2, Save, RefreshCw, Wand2 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { QuotePDF } from "@/components/quote-pdf"
import { saveQuote } from "@/services/quoteService"
import { getInventoryList } from "@/services/inventoryService"
import { getMoveDetails } from "@/ai/flows/move-details"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const quoteSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().optional(),

  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),

  moveDate: z.date({
    required_error: "Une date pour le déménagement est requise.",
  }),
  distance: z.coerce.number().min(1, "La distance doit être d'au moins 1 km."),
  volume: z.coerce.number().min(1, "Le volume doit être d'au moins 1 m³."),
  serviceType: z.enum(["basic", "full", "premium"]),
})

export const serviceTypeCosts = {
  basic: 1.0,
  full: 1.5,
  premium: 2.0,
}

export const serviceTypeLabels = {
  basic: "Basique (transport uniquement)",
  full: "Complet (emballage & transport)",
  premium: "Premium (emballage, transport & installation)",
}

export type QuoteFormData = z.infer<typeof quoteSchema>

export default function QuotePage() {
  const [quote, setQuote] = useState<number | null>(null)
  const [formData, setFormData] = useState<QuoteFormData | null>(null)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const [isSyncingVolume, setIsSyncingVolume] = useState(false)
  const [isAnalyzingAddress, setIsAnalyzingAddress] = useState(false);

  const { toast } = useToast()
  const pdfRef = useRef<HTMLDivElement>(null)


  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      originAddress: "",
      destinationAddress: "",
      distance: 50,
      volume: 20,
      serviceType: "basic",
    },
  })

  const syncVolumeFromInventory = async () => {
    setIsSyncingVolume(true)
    try {
      const inventory = await getInventoryList()
      if (inventory && inventory.totalVolume > 0) {
        form.setValue("volume", parseFloat(inventory.totalVolume.toFixed(2)), { shouldValidate: true })
        toast({
          title: "Volume synchronisé",
          description: `Le volume a été mis à jour à ${inventory.totalVolume.toFixed(2)} m³ depuis l'inventaire.`,
        })
      } else {
         toast({
          variant: "destructive",
          title: "Inventaire vide",
          description: "Aucun volume à synchroniser depuis l'inventaire.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de synchronisation",
        description: "Impossible de récupérer le volume de l'inventaire.",
      })
    } finally {
      setIsSyncingVolume(false)
    }
  }

  useEffect(() => {
    syncVolumeFromInventory()
  }, [])
  
  const handleAddressAnalysis = async () => {
    const origin = form.getValues("originAddress");
    const destination = form.getValues("destinationAddress");

    if (!origin || !destination) {
      toast({
        variant: "destructive",
        title: "Adresses manquantes",
        description: "Veuillez saisir les adresses de départ et d'arrivée.",
      });
      return;
    }

    setIsAnalyzingAddress(true);
    try {
      const details = await getMoveDetails({ originAddress: origin, destinationAddress: destination });
      form.setValue("originAddress", details.formattedOriginAddress, { shouldValidate: true });
      form.setValue("destinationAddress", details.formattedDestinationAddress, { shouldValidate: true });
      form.setValue("distance", Math.round(details.distanceKm), { shouldValidate: true });
      toast({
        title: "Analyse IA terminée",
        description: `Adresses mises à jour et distance estimée à ${Math.round(details.distanceKm)} km.`,
      });
    } catch (error) {
      console.error("Erreur d'analyse d'adresse par IA:", error);
      toast({
        variant: "destructive",
        title: "Erreur de l'IA",
        description: "Impossible d'analyser les adresses. Veuillez les vérifier et réessayer.",
      });
    } finally {
      setIsAnalyzingAddress(false);
    }
  }


  function onSubmit(values: QuoteFormData) {
    const distanceCost = values.distance * 1.2; // 1.2€ par km
    const volumeCost = values.volume * 25; // 25€ par m³
    const serviceMultiplier = serviceTypeCosts[values.serviceType];
    const baseCost = 250; // Coût de base fixe
    const totalQuote = baseCost + (distanceCost + volumeCost) * serviceMultiplier;
    setQuote(totalQuote);
    setFormData(values);
    setQuoteId(null); // Reset saved state when new quote is generated
  }
  
  async function handleSaveQuote() {
    if (!formData || !quote) return;
    setSaving(true);
    try {
      const result = await saveQuote({
        ...formData,
        moveDate: formData.moveDate.toISOString(),
        quote,
        status: 'pending',
      });
      setQuoteId(result.id);
      toast({
        title: "Devis enregistré",
        description: "Le devis a été sauvegardé avec succès dans la base de données.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du devis:", error);
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible d'enregistrer le devis.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function downloadPdf() {
    setPdfLoading(true);
    const input = pdfRef.current;
    if (!input) {
      setPdfLoading(false);
      return;
    }

    try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("devis-DemDuVexin.pdf");

        toast({
            title: "PDF téléchargé",
            description: "Le devis a été téléchargé avec succès.",
        });
    } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        toast({
            variant: "destructive",
            title: "Erreur PDF",
            description: "Impossible de générer le devis en PDF.",
        });
    } finally {
        setPdfLoading(false);
    }
  }


  return (
    <div className="flex flex-col gap-6">
       {formData && (
        <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
            <div ref={pdfRef} className="w-[210mm]">
                <QuotePDF data={formData} quote={quote!} />
            </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Éditeur de devis</h1>
        <Button asChild variant="outline">
            <Link href="/calculateur-volume" target="_blank">
                Ouvrir le calculateur
            </Link>
        </Button>
      </div>
      
      {quoteId && (
          <Alert variant="default" className="border-green-500">
            <AlertTitle className="text-green-700">Devis enregistré !</AlertTitle>
            <AlertDescription>
              Le devis a bien été sauvegardé. Vous pouvez le consulter dans la liste des devis.
              <Button asChild variant="link" className="p-0 h-auto ml-2">
                  <Link href="/dashboard/quotes">Voir les devis</Link>
              </Button>
            </AlertDescription>
          </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Détails du client</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl><Input placeholder="Jean Dupont" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="jean.dupont@email.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone (facultatif)</FormLabel>
                        <FormControl><Input type="tel" placeholder="06 12 34 56 78" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Informations sur le déménagement</CardTitle>
                    <CardDescription>Saisissez les adresses puis cliquez sur le bouton IA pour l'analyse.</CardDescription>
                  </div>
                  <Button type="button" size="sm" onClick={handleAddressAnalysis} disabled={isAnalyzingAddress}>
                    {isAnalyzingAddress ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Analyser
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="originAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse de départ</FormLabel>
                          <FormControl><Input placeholder="123 Rue du Départ, 75001 Paris" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="destinationAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse d'arrivée</FormLabel>
                          <FormControl><Input placeholder="456 Avenue de l'Arrivée, 13001 Marseille" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <FormField
                      control={form.control}
                      name="moveDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date du déménagement</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: fr })
                                  ) : (
                                    <span>Choisissez une date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle>Prestations et volume</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <FormControl><Input type="number" placeholder="ex: 50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (m³)</FormLabel>
                        <div className="flex items-center gap-2">
                           <FormControl><Input type="number" step="0.01" placeholder="ex: 20" {...field} /></FormControl>
                           <Button type="button" variant="ghost" size="icon" onClick={syncVolumeFromInventory} disabled={isSyncingVolume} title="Synchroniser depuis l'inventaire">
                              <RefreshCw className={cn("h-4 w-4", isSyncingVolume && "animate-spin")} />
                           </Button>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">{serviceTypeLabels.basic}</SelectItem>
                            <SelectItem value="full">{serviceTypeLabels.full}</SelectItem>
                            <SelectItem value="premium">{serviceTypeLabels.premium}</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" size="lg">Générer le devis</Button>

            </div>

            <div className="lg:col-span-1">
              {quote !== null && (
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Devis estimé</CardTitle>
                    <CardDescription>Basé sur les détails fournis.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-4xl font-bold text-primary">
                      {quote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <Separator />
                    <p className="text-sm text-muted-foreground">Ceci est une estimation. Le prix final peut varier. Vérifiez tous les détails avant d'envoyer le devis au client.</p>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 items-stretch">
                      <Button onClick={handleSaveQuote} className="w-full" disabled={saving || !!quoteId}>
                        {saving ? <Loader2 className="mr-2 animate-spin" /> : <Save className="mr-2"/>}
                        {quoteId ? "Devis enregistré" : "Enregistrer le devis"}
                      </Button>
                      <Button onClick={downloadPdf} className="w-full" variant="secondary" disabled={pdfLoading}>
                        {pdfLoading ? <Loader2 className="mr-2 animate-spin" /> : <Download className="mr-2"/>}
                        Télécharger le PDF
                      </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
    
