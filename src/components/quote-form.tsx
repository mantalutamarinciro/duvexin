"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Loader2,
  Send,
  Calendar as CalendarIcon,
  RefreshCw,
  MapPin,
  Wand2,
} from "lucide-react"
import Link from "next/link"

import type { QuoteRequestFormData as QuotePayload } from "@/types/quote"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { getInventoryList } from "@/services/inventoryService"
import { getMoveDetails } from "@/ai/flows/move-details"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { serviceTypeLabels } from "@/lib/quote-constants"

export const quoteRequestSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().min(6, "Le numéro de téléphone est obligatoire."),
  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),
  distance: z.coerce.number().min(0).optional().default(0),
  moveDate: z.date().optional(),
  volume: z.coerce.number().min(0).optional().default(0),
  serviceType: z.enum(["basic", "full", "premium"]).optional().default("basic"),
  details: z.string().optional(),
})

export type QuoteFormValues = z.infer<typeof quoteRequestSchema>

interface QuoteFormProps {
  initialData?: Partial<QuotePayload> & { moveDate?: string }
  onSubmit: (values: QuotePayload) => Promise<void>
  submitButtonText: string
  isSaving: boolean
  isDashboard?: boolean
}

export function QuoteForm({
  initialData,
  onSubmit,
  submitButtonText,
  isSaving,
  isDashboard = false,
}: QuoteFormProps) {
  const [isSyncingVolume, setIsSyncingVolume] = useState(false)
  const [isAnalyzingAddress, setIsAnalyzingAddress] = useState(false)
  const [suggestions, setSuggestions] = useState<{ origin: string[]; destination: string[] }>({
    origin: [],
    destination: [],
  })
  const [activeSuggestionField, setActiveSuggestionField] = useState<"origin" | "destination" | null>(null)

  const analyzedAddresses = useRef({ origin: "", destination: "" })
  const { toast } = useToast()

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      clientName: initialData?.clientName ?? "",
      clientEmail: initialData?.clientEmail ?? "",
      clientPhone: initialData?.clientPhone ?? "",
      originAddress: initialData?.originAddress ?? "",
      destinationAddress: initialData?.destinationAddress ?? "",
      distance: initialData?.distance ?? 0,
      volume: initialData?.volume ?? 10,
      details: initialData?.details ?? "",
      moveDate: initialData?.moveDate ? new Date(initialData.moveDate) : undefined,
      serviceType:
        initialData?.serviceType === "full" || initialData?.serviceType === "premium"
          ? initialData.serviceType
          : "basic",
    },
  })

  const originAddress = form.watch("originAddress")
  const destinationAddress = form.watch("destinationAddress")

  const fetchSuggestions = async (query: string, field: "origin" | "destination") => {
    if (!query || query.length < 3) {
      setSuggestions((prev) => ({ ...prev, [field]: [] }))
      return
    }

    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`
      )

      if (!res.ok) {
        setSuggestions((prev) => ({ ...prev, [field]: [] }))
        return
      }

      const data = await res.json()
      const labels = data?.features?.map((f: any) => f.properties.label) || []
      setSuggestions((prev) => ({ ...prev, [field]: labels }))
    } catch {
      setSuggestions((prev) => ({ ...prev, [field]: [] }))
    }
  }

  const handleAddressAnalysis = async () => {
    const origin = form.getValues("originAddress")
    const destination = form.getValues("destinationAddress")

    if (!origin || origin.length < 5 || !destination || destination.length < 5 || isAnalyzingAddress) {
      return
    }

    if (
      origin === analyzedAddresses.current.origin &&
      destination === analyzedAddresses.current.destination
    ) {
      return
    }

    setIsAnalyzingAddress(true)
    try {
      const details = await getMoveDetails({
        originAddress: origin,
        destinationAddress: destination,
      })

      form.setValue("originAddress", details.formattedOriginAddress, { shouldValidate: true })
      form.setValue("destinationAddress", details.formattedDestinationAddress, { shouldValidate: true })
      form.setValue("distance", Math.round(details.distanceKm), { shouldValidate: true })

      analyzedAddresses.current = {
        origin: details.formattedOriginAddress,
        destination: details.formattedDestinationAddress,
      }

      toast({
        title: "Itinéraire calculé",
        description: `La distance est estimée à ${Math.round(details.distanceKm)} km.`,
      })
    } catch (error) {
      console.error("Erreur d'analyse d'adresse par IA:", error)
      if (isDashboard) {
        toast({
          variant: "destructive",
          title: "Erreur de calcul IA",
          description: "L'IA n'a pas pu calculer la distance. Vous pouvez la saisir manuellement.",
        })
      }
    } finally {
      setIsAnalyzingAddress(false)
    }
  }

  useEffect(() => {
    if (!isDashboard) return

    const handler = setTimeout(() => {
      void handleAddressAnalysis()
    }, 3000)

    return () => clearTimeout(handler)
  }, [originAddress, destinationAddress, isDashboard])

  const syncVolumeFromInventory = async () => {
    setIsSyncingVolume(true)
    try {
      const inventory = await getInventoryList()
      if (inventory && inventory.totalVolume > 0) {
        form.setValue("volume", parseFloat(inventory.totalVolume.toFixed(2)), {
          shouldValidate: true,
        })
        toast({
          title: "Volume synchronisé",
          description: `Le volume a été mis à jour à ${inventory.totalVolume.toFixed(2)} m³ depuis l'inventaire.`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Inventaire vide",
          description: (
            <p>
              Aucun volume trouvé.{" "}
              <Link href="/calculateur-volume" className="underline">
                Calculez-le ici.
              </Link>
            </p>
          ),
        })
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de récupérer le volume.",
      })
    } finally {
      setIsSyncingVolume(false)
    }
  }

  useEffect(() => {
    if (!initialData && isDashboard) {
      void syncVolumeFromInventory()
    }
  }, [initialData, isDashboard])

  const selectSuggestion = (val: string, field: "origin" | "destination") => {
    form.setValue(field === "origin" ? "originAddress" : "destinationAddress", val, {
      shouldValidate: true,
    })
    setSuggestions((prev) => ({ ...prev, [field]: [] }))
    setActiveSuggestionField(null)
    if (isDashboard) {
      void handleAddressAnalysis()
    }
  }

  const handleSubmitForm = async (values: QuoteFormValues) => {
    const payload: QuotePayload = {
      clientName: values.clientName,
      clientEmail: values.clientEmail,
      clientPhone: values.clientPhone,
      originAddress: values.originAddress,
      destinationAddress: values.destinationAddress,
      distance: values.distance ?? 0,
      volume: values.volume ?? 0,
      details: values.details,
      moveDate: values.moveDate ? values.moveDate.toISOString() : undefined,
      serviceType: values.serviceType,
    }

    await onSubmit(payload)
  }

  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-8">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-black">Vos coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" className="h-12 rounded-xl" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        className="h-12 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="h-12 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-black">Votre déménagement</CardTitle>
                  <CardDescription>Adresses de départ et d'arrivée</CardDescription>
                </div>

                {isDashboard && isAnalyzingAddress && (
                  <div className="animate-pulse text-xs font-bold text-primary flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Calcul de l&apos;itinéraire...
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="originAddress"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Adresse de départ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            placeholder="Ex: 9 Rue de Pontoise, Méry-sur-Oise"
                            className="h-12 rounded-xl pl-10"
                            {...field}
                            autoComplete="off"
                            onChange={(e) => {
                              field.onChange(e)
                              void fetchSuggestions(e.target.value, "origin")
                              setActiveSuggestionField("origin")
                            }}
                            onFocus={() => setActiveSuggestionField("origin")}
                          />
                        </div>
                      </FormControl>

                      {activeSuggestionField === "origin" && suggestions.origin.length > 0 && (
                        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-slate-100 bg-white p-1 shadow-2xl">
                          {suggestions.origin.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-slate-50"
                              onClick={() => selectSuggestion(s, "origin")}
                            >
                              <MapPin className="h-4 w-4 text-primary/60" />
                              {s}
                            </button>
                          ))}
                        </div>
                      )}

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Adresse d&apos;arrivée</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            placeholder="Ex: 22 Rue Isambard, Évreux"
                            className="h-12 rounded-xl pl-10"
                            {...field}
                            autoComplete="off"
                            onChange={(e) => {
                              field.onChange(e)
                              void fetchSuggestions(e.target.value, "destination")
                              setActiveSuggestionField("destination")
                            }}
                            onFocus={() => setActiveSuggestionField("destination")}
                          />
                        </div>
                      </FormControl>

                      {activeSuggestionField === "destination" &&
                        suggestions.destination.length > 0 && (
                          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-slate-100 bg-white p-1 shadow-2xl">
                            {suggestions.destination.map((s, i) => (
                              <button
                                key={i}
                                type="button"
                                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-slate-50"
                                onClick={() => selectSuggestion(s, "destination")}
                              >
                                <MapPin className="h-4 w-4 text-primary/60" />
                                {s}
                              </button>
                            ))}
                          </div>
                        )}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {isDashboard && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="moveDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date souhaitée</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-12 w-full rounded-xl pl-3 text-left font-normal",
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

                  <FormField
                    control={form.control}
                    name="distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          Distance estimée (km)
                          {originAddress.length > 5 &&
                            destinationAddress.length > 5 &&
                            !isAnalyzingAddress && (
                              <button
                                type="button"
                                onClick={() => void handleAddressAnalysis()}
                                className="flex items-center gap-1 text-[10px] font-black uppercase text-primary hover:underline"
                              >
                                <RefreshCw className="h-2.5 w-2.5" />
                                {field.value === 0 ? "Calculer" : "Recalculer"}
                              </button>
                            )}
                        </FormLabel>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="number"
                                  className="h-12 rounded-xl border-slate-200 bg-background pr-10 font-black text-primary"
                                  {...field}
                                />
                              </FormControl>
                              <Wand2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/40" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="flex items-center gap-2 font-bold">
                              <Wand2 className="h-4 w-4" />
                              Calculé par l&apos;IA ou saisie manuelle
                            </p>
                          </TooltipContent>
                        </Tooltip>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-black">Détails et volume</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              {isDashboard && (
                <>
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Volume (m³)</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="number"
                              step="1"
                              placeholder="ex: 20"
                              className="h-12 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => void syncVolumeFromInventory()}
                            disabled={isSyncingVolume}
                            className="h-12 w-12 rounded-xl"
                            title="Récupérer depuis le calculateur"
                          >
                            <RefreshCw
                              className={cn("h-4 w-4", isSyncingVolume && "animate-spin")}
                            />
                          </Button>
                        </div>
                        <FormMessage />
                        <p className="mt-1 text-xs italic text-muted-foreground">
                          Pas sûr ?{" "}
                          <Link
                            href="/calculateur-volume"
                            target="_blank"
                            className="font-bold text-primary hover:underline"
                          >
                            Utilisez notre calculateur
                          </Link>
                          .
                        </p>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formule souhaitée</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl">
                              <SelectValue placeholder="Sélectionnez..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">{serviceTypeLabels.basic}</SelectItem>
                            <SelectItem value="full">{serviceTypeLabels.full}</SelectItem>
                            <SelectItem value="premium">{serviceTypeLabels.premium}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Votre message ou inventaire rapide (facultatif)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre besoin : type de logement, étages, objets lourds (piano), accès particulier..."
                        className="min-h-[120px] rounded-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex flex-col items-end gap-2 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSaving}
              className="h-16 rounded-full bg-primary px-12 text-lg font-black text-white shadow-[0_20px_50px_-12px_rgba(0,169,157,0.5)] transition-all hover:scale-105 hover:bg-primary/90 active:scale-95 disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Send className="mr-2 h-5 w-5" />
              )}
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  )
}