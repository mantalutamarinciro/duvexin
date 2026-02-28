"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Wand2, Send, Calendar as CalendarIcon, RefreshCw, MapPin } from "lucide-react"
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
import { getInventoryList } from "@/services/inventoryService"
import { getMoveDetails } from "@/ai/flows/move-details"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const quoteRequestSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().optional(),

  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),
  distance: z.coerce.number().min(0),

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

interface QuoteFormProps {
  initialData?: Partial<QuoteRequestFormData> & { moveDate?: string };
  onSubmit: (values: QuoteRequestFormData) => Promise<void>;
  submitButtonText: string;
  isSaving: boolean;
}

export function QuoteForm({ initialData, onSubmit, submitButtonText, isSaving }: QuoteFormProps) {
  const [isSyncingVolume, setIsSyncingVolume] = useState(false)
  const [isAnalyzingAddress, setIsAnalyzingAddress] = useState(false);
  const [suggestions, setSuggestions] = useState<{ origin: string[], destination: string[] }>({ origin: [], destination: [] });
  const [activeSuggestionField, setActiveSuggestionField] = useState<'origin' | 'destination' | null>(null);
  
  const analyzedAddresses = useRef({ origin: "", destination: "" });
  const { toast } = useToast()

  const form = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      originAddress: "",
      destinationAddress: "",
      distance: 0,
      volume: 10,
      serviceType: "basic",
      details: "",
      ...initialData,
      moveDate: initialData?.moveDate ? new Date(initialData.moveDate) : undefined,
    },
  })
  
  const originAddress = form.watch("originAddress");
  const destinationAddress = form.watch("destinationAddress");

  // --- AUTOCOMPLETE LOGIC ---
  const fetchSuggestions = async (query: string, field: 'origin' | 'destination') => {
    if (!query || query.length < 3) {
      setSuggestions(prev => ({ ...prev, [field]: [] }));
      return;
    }

    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`);
      
      // On échoue silencieusement si l'API ne répond pas
      if (!res.ok) {
        setSuggestions(prev => ({ ...prev, [field]: [] }));
        return;
      }

      const data = await res.json();
      
      // Vérification de sécurité sur data.features
      const labels = data?.features?.map((f: any) => f.properties.label) || [];
      setSuggestions(prev => ({ ...prev, [field]: labels }));
    } catch (error) {
      // On vide les suggestions en cas d'erreur réseau sans bloquer le formulaire
      setSuggestions(prev => ({ ...prev, [field]: [] }));
    }
  }

  // --- AI ANALYSIS LOGIC ---
  const handleAddressAnalysis = async () => {
    const origin = form.getValues("originAddress");
    const destination = form.getValues("destinationAddress");

    if (!origin || origin.length < 5 || !destination || destination.length < 5 || isAnalyzingAddress) {
        return;
    }
    
    if (origin === analyzedAddresses.current.origin && destination === analyzedAddresses.current.destination) {
      return;
    }

    setIsAnalyzingAddress(true);
    try {
      const details = await getMoveDetails({ originAddress: origin, destinationAddress: destination });
      form.setValue("originAddress", details.formattedOriginAddress, { shouldValidate: true });
      form.setValue("destinationAddress", details.formattedDestinationAddress, { shouldValidate: true });
      form.setValue("distance", Math.round(details.distanceKm), { shouldValidate: true });
      
      analyzedAddresses.current = { origin: details.formattedOriginAddress, destination: details.formattedDestinationAddress };

      toast({
        title: "Analyse terminée",
        description: `Distance calculée : ${Math.round(details.distanceKm)} km.`,
      });
    } catch (error) {
      console.error("Erreur d'analyse d'adresse par IA:", error);
    } finally {
      setIsAnalyzingAddress(false);
    }
  }
  
  useEffect(() => {
    const handler = setTimeout(() => {
        handleAddressAnalysis();
    }, 3000);

    return () => {
        clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          title: "Inventaire vide",
          description: (<p>Aucun volume trouvé. <Link href="/calculateur-volume" className="underline">Calculez-le ici.</Link></p>),
        })
      }
    } catch (error) {
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
    if (!initialData) {
        syncVolumeFromInventory()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectSuggestion = (val: string, field: 'origin' | 'destination') => {
    form.setValue(field === 'origin' ? 'originAddress' : 'destinationAddress', val, { shouldValidate: true });
    setSuggestions(prev => ({ ...prev, [field]: [] }));
    setActiveSuggestionField(null);
    handleAddressAnalysis();
  }
  
  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      <FormControl><Input placeholder="Jean Dupont" className="rounded-xl h-12" {...field} /></FormControl>
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
                      <FormControl><Input type="email" placeholder="jean.dupont@email.com" className="rounded-xl h-12" {...field} /></FormControl>
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
                      <FormControl><Input type="tel" placeholder="06 12 34 56 78" className="rounded-xl h-12" {...field} /></FormControl>
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
                      {isAnalyzingAddress && (
                        <div className="flex items-center gap-2 text-xs text-primary font-bold animate-pulse">
                          <Wand2 className="h-3.5 w-3.5" />
                          Calcul de l'itinéraire...
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
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input 
                            placeholder="Ex: 9 Rue de Pontoise, Méry-sur-Oise" 
                            className="rounded-xl h-12 pl-10"
                            {...field} 
                            autoComplete="off" 
                            onChange={(e) => {
                              field.onChange(e);
                              fetchSuggestions(e.target.value, 'origin');
                              setActiveSuggestionField('origin');
                            }}
                            onFocus={() => setActiveSuggestionField('origin')}
                          />
                        </div>
                      </FormControl>
                      {activeSuggestionField === 'origin' && suggestions.origin.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-60 overflow-auto p-1">
                          {suggestions.origin.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors rounded-xl font-medium"
                              onClick={() => selectSuggestion(s, 'origin')}
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
                      <FormLabel>Adresse d'arrivée</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input 
                            placeholder="Ex: 22 Rue Isambard, Évreux" 
                            className="rounded-xl h-12 pl-10"
                            {...field} 
                            autoComplete="off" 
                            onChange={(e) => {
                              field.onChange(e);
                              fetchSuggestions(e.target.value, 'destination');
                              setActiveSuggestionField('destination');
                            }}
                            onFocus={() => setActiveSuggestionField('destination')}
                          />
                        </div>
                      </FormControl>
                      {activeSuggestionField === 'destination' && suggestions.destination.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-60 overflow-auto p-1">
                          {suggestions.destination.map((s, i) => (
                            <button
                              key={i}
                              type="button"
                              className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 flex items-center gap-3 transition-colors rounded-xl font-medium"
                              onClick={() => selectSuggestion(s, 'destination')}
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
                                  variant={"outline"}
                                  className={cn(
                                      "w-full h-12 pl-3 text-left font-normal rounded-xl",
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
                  <FormField
                      control={form.control}
                      name="distance"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Distance estimée (km)</FormLabel>
                          <Tooltip>
                              <TooltipTrigger asChild>
                                  <FormControl>
                                      <Input type="number" readOnly {...field} className="h-12 rounded-xl bg-slate-50 cursor-default font-black text-primary border-slate-200"/>
                                  </FormControl>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p className="flex items-center gap-2 font-bold"><Wand2 className="h-4 w-4"/> Calculé automatiquement par l'IA</p>
                              </TooltipContent>
                          </Tooltip>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
              </div>
              </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 shadow-sm">
              <CardHeader>
                  <CardTitle className="text-xl font-black">Volume et Prestations</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
              <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Volume (m³)</FormLabel>
                      <div className="flex items-center gap-2">
                      <FormControl><Input type="number" step="1" placeholder="ex: 20" className="rounded-xl h-12" {...field} /></FormControl>
                      <Button type="button" variant="outline" size="icon" onClick={syncVolumeFromInventory} disabled={isSyncingVolume} className="h-12 w-12 rounded-xl" title="Récupérer depuis le calculateur">
                          <RefreshCw className={cn("h-4 w-4", isSyncingVolume && "animate-spin")} />
                      </Button>
                      </div>
                      <FormMessage />
                      <p className="text-xs text-muted-foreground italic mt-1">Pas sûr ? <Link href="/calculateur-volume" target="_blank" className="text-primary font-bold hover:underline">Utilisez notre calculateur</Link>.</p>
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
                          <SelectTrigger className="rounded-xl h-12">
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
                          <Textarea placeholder="Objets fragiles, piano, accès difficile (étages, ascenseur...), besoin de cartons ?" className="rounded-2xl min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                  />
              </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
              <Button type="submit" size="lg" disabled={isSaving} className="h-16 px-12 rounded-full text-lg font-black bg-primary text-white hover:bg-primary/90 shadow-[0_20px_50px_-12px_rgba(0,169,157,0.5)] transition-all hover:scale-105 active:scale-95">
                  {isSaving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5"/>}
                  {submitButtonText}
              </Button>
          </div>
        </form>
      </Form>
    </TooltipProvider>
  )
}
