
"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Wand2, Send } from "lucide-react"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { saveQuote } from "@/services/quoteService"
import { getInventoryList } from "@/services/inventoryService"
import { getMoveDetails } from "@/ai/flows/move-details"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Calendar as CalendarIcon, RefreshCw, CheckCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const quoteRequestSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().optional(),

  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),

  moveDate: z.date({
    required_error: "Une date pour le déménagement est requise.",
  }),
  volume: z.coerce.number().min(1, "Veuillez estimer un volume ou utiliser notre calculateur."),
  serviceType: z.enum(["basic", "full", "premium"], { required_error: "Veuillez choisir une formule."}),
  details: z.string().optional(),
})

export const serviceTypeLabels = {
  basic: "Formule Économique",
  full: "Formule Standard",
  premium: "Formule Confort",
}

export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>

export default function PublicQuotePage() {
  const [saving, setSaving] = useState(false)
  const [quoteId, setQuoteId] = useState<string | null>(null)
  const [isSyncingVolume, setIsSyncingVolume] = useState(false)
  const [isAnalyzingAddress, setIsAnalyzingAddress] = useState(false);

  const { toast } = useToast()

  const form = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      originAddress: "",
      destinationAddress: "",
      volume: 10,
      serviceType: "basic",
      details: "",
    },
  })
  
  const originAddress = form.watch("originAddress");
  const destinationAddress = form.watch("destinationAddress");

  const handleAddressAnalysis = async () => {
    const origin = form.getValues("originAddress");
    const destination = form.getValues("destinationAddress");

    if (!origin || origin.length < 5 || !destination || destination.length < 5) {
      return;
    }

    setIsAnalyzingAddress(true);
    try {
      const details = await getMoveDetails({ originAddress: origin, destinationAddress: destination });
      form.setValue("originAddress", details.formattedOriginAddress, { shouldValidate: true });
      form.setValue("destinationAddress", details.formattedDestinationAddress, { shouldValidate: true });
      toast({
        title: "Analyse IA terminée",
        description: `Adresses mises à jour pour plus de précision.`,
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

  useEffect(() => {
    const handler = setTimeout(() => {
        handleAddressAnalysis();
    }, 2000); // 2 seconds debounce

    return () => {
        clearTimeout(handler);
    };
  }, [originAddress, destinationAddress]);


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
          title: "Inventaire vide ou indisponible",
          description: (<p>Aucun volume à synchroniser. <Link href="/calculateur-volume" className="underline">Calculez votre volume ici.</Link></p>),
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
  

  async function onSubmit(values: QuoteRequestFormData) {
    setSaving(true);
    setQuoteId(null);
    try {
      // We send a dummy distance and quote, they will be calculated by the admin in the dashboard
      const result = await saveQuote({
        ...values,
        moveDate: values.moveDate.toISOString(),
        distance: 1, 
        quote: 0, 
        status: 'pending',
      });
      setQuoteId(result.id);
      toast({
        title: "Demande de devis envoyée !",
        description: "Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du devis:", error);
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: "Impossible d'envoyer votre demande de devis. Veuillez réessayer.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container py-16">
        <div className="max-w-2xl mx-auto">

            <div className="text-center mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight">Demande de devis gratuit</h1>
                <p className="text-muted-foreground mt-2">
                Remplissez ce formulaire pour recevoir une estimation personnalisée pour votre déménagement. C'est rapide, simple et sans engagement.
                </p>
            </div>
      
            {quoteId ? (
                <Alert variant="default" className="border-green-500 bg-green-50/50">
                    <CheckCircle className="h-4 w-4 text-green-600"/>
                    <AlertTitle className="text-green-800">Demande envoyée avec succès !</AlertTitle>
                    <AlertDescription className="text-green-700">
                    Merci ! Votre demande a bien été enregistrée avec le numéro de référence <span className="font-mono text-sm bg-green-200/50 px-1 py-0.5 rounded">{quoteId}</span>. Nous vous recontacterons très prochainement.
                    <div className="mt-4">
                        <Button onClick={() => setQuoteId(null)}>Faire une nouvelle demande</Button>
                    </div>
                    </AlertDescription>
                </Alert>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                        <CardTitle>Vos coordonnées</CardTitle>
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
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Votre déménagement</CardTitle>
                                    <CardDescription>Où et quand ?</CardDescription>
                                </div>
                                {isAnalyzingAddress && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                            </div>
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
                                <FormLabel>Date souhaitée du déménagement</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[280px] pl-3 text-left font-normal",
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
                                        disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
                            <CardTitle>Volume et Prestations</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="volume"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Volume estimé (m³)</FormLabel>
                                <div className="flex items-center gap-2">
                                <FormControl><Input type="number" step="1" placeholder="ex: 20" {...field} /></FormControl>
                                <Button type="button" variant="ghost" size="icon" onClick={syncVolumeFromInventory} disabled={isSyncingVolume} title="Synchroniser depuis l'inventaire">
                                    <RefreshCw className={cn("h-4 w-4", isSyncingVolume && "animate-spin")} />
                                </Button>
                                </div>
                                <FormMessage />
                                <p className="text-xs text-muted-foreground">Pas sûr ? <Link href="/calculateur-volume" target="_blank" className="underline">Utilisez notre calculateur</Link>.</p>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="serviceType"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Formule souhaitée</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                <FormLabel>Informations complémentaires (facultatif)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Précisez ici tout élément important : objets fragiles, accès difficile, besoin de stationnement, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </CardContent>
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={saving}>
                            {saving ? <Loader2 className="mr-2 animate-spin" /> : <Send className="mr-2"/>}
                            Envoyer ma demande
                        </Button>
                    </div>

                    </form>
                </Form>
            )}
        </div>
    </div>
  )
}
    
