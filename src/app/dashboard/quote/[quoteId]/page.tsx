
'use client';

import { useEffect, useState, useRef } from "react"
import { notFound, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Loader2, Wand2, Calendar as CalendarIcon, FileText, ArrowLeft, Info } from "lucide-react"

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
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { getQuoteById, updateQuote, Quote } from "@/services/quoteService"
import { getMoveDetails } from "@/ai/flows/move-details"
import { Skeleton } from "@/components/ui/skeleton"
import { serviceTypeLabels } from "../page"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { generateQuote, QuoteInput } from "@/ai/flows/quote-generation-flow"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { QuotePDF } from "@/components/quote-pdf"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export const quoteFormSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail n'est pas valide."),
  clientPhone: z.string().optional(),
  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),
  moveDate: z.date({ required_error: "Une date pour le déménagement est requise."}),
  distance: z.coerce.number().min(1, "La distance doit être calculée."),
  volume: z.coerce.number().min(1, "Le volume doit être supérieur à 0."),
  serviceType: z.enum(["basic", "full", "premium"]),
  details: z.string().optional(),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function QuoteDetailsPage({ params }: { params: { quoteId: string } }) {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isGeneratingQuote, setIsGeneratingQuote] = useState(false);
    const [generatedQuote, setGeneratedQuote] = useState<number | null>(null);
    const [pdfLoading, setPdfLoading] = useState<boolean>(false);
    const pdfRef = useRef<HTMLDivElement>(null);

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<QuoteFormData>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            clientName: "",
            clientEmail: "",
            clientPhone: "",
            originAddress: "",
            destinationAddress: "",
            distance: 0,
            volume: 1,
            serviceType: "basic",
            details: "",
        },
    });

    const originAddress = form.watch("originAddress");
    const destinationAddress = form.watch("destinationAddress");

    useEffect(() => {
        if (params.quoteId) {
            getQuoteById(params.quoteId)
                .then(data => {
                    if (!data) {
                        toast({ variant: 'destructive', title: "Devis introuvable" });
                        notFound();
                    } else {
                        setQuote(data);
                        form.reset({
                            ...data,
                            moveDate: new Date(data.moveDate),
                        });
                        if (data.quote) {
                            setGeneratedQuote(data.quote);
                        }
                    }
                })
                .catch(() => {
                    toast({ variant: 'destructive', title: "Erreur", description: "Impossible de charger le devis." });
                })
                .finally(() => setLoading(false));
        }
    }, [params.quoteId, form, toast]);

    const handleAddressAnalysis = async () => {
        const origin = form.getValues("originAddress");
        const destination = form.getValues("destinationAddress");

        if (!origin || !destination) return;
        
        setIsAnalyzing(true);
        try {
            const details = await getMoveDetails({ originAddress: origin, destinationAddress: destination });
            form.setValue("originAddress", details.formattedOriginAddress, { shouldValidate: true });
            form.setValue("destinationAddress", details.formattedDestinationAddress, { shouldValidate: true });
            form.setValue("distance", Math.round(details.distanceKm), { shouldValidate: true });
            toast({ title: "Analyse d'adresse réussie", description: "Les adresses et la distance ont été mises à jour automatiquement." });
        } catch (error) {
            toast({ variant: "destructive", title: "Erreur d'analyse", description: "Impossible d'analyser les adresses via l'IA. Veuillez vérifier et réessayer, ou saisir la distance manuellement si le problème persiste." });
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    useEffect(() => {
        const handler = setTimeout(() => {
            if (originAddress && destinationAddress && (originAddress !== quote?.originAddress || destinationAddress !== quote?.destinationAddress)) {
                handleAddressAnalysis();
            }
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }, [originAddress, destinationAddress, quote]);


    const handleGenerateQuote = async () => {
        const values = form.getValues();
        const quoteInput: QuoteInput = {
            distance: values.distance,
            volume: values.volume,
            serviceType: values.serviceType,
            details: values.details,
        };

        setIsGeneratingQuote(true);
        try {
            const result = await generateQuote(quoteInput);
            setGeneratedQuote(result.price);
            toast({ title: "Devis généré", description: `Le montant est de ${result.price} €.`})
        } catch (error) {
             toast({ variant: "destructive", title: "Erreur de l'IA", description: "Impossible de générer un prix." });
        } finally {
            setIsGeneratingQuote(false);
        }
    }
    
    const prepareAndDownloadPdf = () => {
        if (!generatedQuote) return;
        setPdfLoading(true);
        // La génération effective se fait dans le useEffect qui observe pdfRef.current
    };

    useEffect(() => {
        const generatePdf = async () => {
            if (!pdfLoading || !pdfRef.current || !generatedQuote) return;

            const input = pdfRef.current;
            try {
                const canvas = await html2canvas(input, { scale: 2 });
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`devis-${params.quoteId}.pdf`);

                toast({ title: "PDF téléchargé", description: "Le devis a été téléchargé avec succès." });
            } catch (error) {
                toast({ variant: "destructive", title: "Erreur PDF", description: "Impossible de générer le document." });
            } finally {
                setPdfLoading(false);
            }
        };

        generatePdf();
    }, [pdfLoading, generatedQuote, params.quoteId, toast]);


    async function onSubmit(values: QuoteFormData) {
        if (!quote) return;
        setIsSaving(true);
        try {
            const updatedData = {
                ...values,
                moveDate: values.moveDate.toISOString(),
                quote: generatedQuote || quote.quote,
            };
            await updateQuote(quote.id, updatedData);
            toast({ title: "Devis sauvegardé", description: "Les modifications ont été enregistrées." });
            router.push('/dashboard/quotes');
        } catch (error) {
            toast({ variant: "destructive", title: "Erreur", description: "Impossible de sauvegarder les modifications." });
        } finally {
            setIsSaving(false);
        }
    }

    if (loading) {
        return <div className="space-y-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
        </div>
    }

    return (
        <TooltipProvider>
        <div className="flex flex-col gap-6">
            {pdfLoading && generatedQuote && (
                <div className="absolute -z-10 -left-[9999px] -top-[9999px]">
                    <div ref={pdfRef} className="w-[210mm]">
                       <QuotePDF data={form.getValues()} quote={generatedQuote} />
                    </div>
                </div>
            )}
            <div>
                 <Button variant="link" className="p-0 mb-2" asChild><Link href="/dashboard/quotes">&larr; Retour à la liste des devis</Link></Button>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Détails du devis</h1>
                <p className="text-muted-foreground">ID: {quote?.id}</p>
            </div>

             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <Card>
                        <CardHeader><CardTitle>Informations Client</CardTitle></CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                             <FormField control={form.control} name="clientName" render={({ field }) => (
                                <FormItem><FormLabel>Nom complet</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                             )}/>
                             <FormField control={form.control} name="clientEmail" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                             )}/>
                             <FormField control={form.control} name="clientPhone" render={({ field }) => (
                                <FormItem><FormLabel>Téléphone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                             )}/>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Trajet et Dates</CardTitle>
                                {isAnalyzing && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField control={form.control} name="originAddress" render={({ field }) => (
                                    <FormItem><FormLabel>Adresse de départ</FormLabel><FormControl><Input {...field} autoComplete="off"/></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="destinationAddress" render={({ field }) => (
                                    <FormItem><FormLabel>Adresse d'arrivée</FormLabel><FormControl><Input {...field} autoComplete="off" /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                             <div className="grid gap-4 sm:grid-cols-2">
                                <FormField control={form.control} name="moveDate" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date du déménagement</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Choisir une date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date("1900-01-01")} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="distance" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Distance (km)</FormLabel>
                                         <Tooltip>
                                            <TooltipTrigger className="w-full">
                                                <FormControl>
                                                    <Input type="number" readOnly {...field} className="bg-muted cursor-not-allowed"/>
                                                </FormControl>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="flex items-center gap-2"><Wand2 className="h-4 w-4"/> Distance calculée automatiquement par l'IA</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Détails de la prestation</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField control={form.control} name="volume" render={({ field }) => (
                                    <FormItem><FormLabel>Volume (m³)</FormLabel><FormControl><Input type="number" step="1" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="serviceType" render={({ field }) => (
                                    <FormItem><FormLabel>Formule</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="basic">{serviceTypeLabels.basic}</SelectItem>
                                                <SelectItem value="full">{serviceTypeLabels.full}</SelectItem>
                                                <SelectItem value="premium">{serviceTypeLabels.premium}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}/>
                            </div>
                              <FormField control={form.control} name="details" render={({ field }) => (
                                <FormItem><FormLabel>Détails / Notes</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                             )}/>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Génération du Devis</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                            <Button type="button" onClick={handleGenerateQuote} disabled={isGeneratingQuote} size="lg">
                                {isGeneratingQuote ? <Loader2 className="mr-2 animate-spin"/> : <Wand2 className="mr-2"/>}
                                Générer/Mettre à jour le prix (IA)
                            </Button>
                            {generatedQuote !== null && (
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-lg">Montant du devis : <span className="font-bold text-2xl text-primary">{generatedQuote.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span></p>
                                </div>
                            )}
                        </CardContent>
                        {generatedQuote !== null && (
                            <CardFooter>
                                <Button type="button" onClick={prepareAndDownloadPdf} variant="secondary" disabled={pdfLoading}>
                                     {pdfLoading ? <Loader2 className="mr-2 animate-spin"/> : <FileText className="mr-2"/>}
                                    Télécharger le Devis en PDF
                                </Button>
                            </CardFooter>
                        )}
                    </Card>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 animate-spin"/>}
                            Enregistrer les modifications
                        </Button>
                    </div>
                </form>
             </Form>

        </div>
        </TooltipProvider>
    )
}
