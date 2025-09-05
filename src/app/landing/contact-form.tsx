"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { saveQuote } from "@/services/quoteService";
import { useRouter } from "next/navigation";

const contactSchema = z.object({
  clientName: z.string().min(2, "Le nom est requis."),
  clientEmail: z.string().email("L'adresse e-mail est invalide."),
  clientPhone: z.string().optional(),
  originAddress: z.string().min(5, "L'adresse de départ est requise."),
  destinationAddress: z.string().min(5, "L'adresse de destination est requise."),
  details: z.string().min(10, "Veuillez donner quelques détails."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        originAddress: "",
        destinationAddress: "",
        details: ""
    }
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
        // This is a placeholder submission. We create a quote with dummy financial data
        // as the main goal is to capture the lead in the system.
        await saveQuote({
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhone: data.clientPhone,
            originAddress: data.originAddress,
            destinationAddress: data.destinationAddress,
            // These are placeholder values:
            moveDate: new Date().toISOString(),
            distance: 1,
            volume: 1,
            serviceType: "basic",
            quote: 0,
            status: "pending",
        });

      toast({
        title: "Demande de devis envoyée !",
        description: "Nous avons bien reçu votre demande. Notre équipe vous recontactera très prochainement.",
      });
      form.reset();
      // Redirect to a thank you page or a relevant section
      // router.push("/dashboard/quotes");

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="clientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom Complet</FormLabel>
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
              <FormControl><Input type="email" placeholder="votre@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="originAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de départ</FormLabel>
              <FormControl><Input placeholder="Ville de départ" {...field} /></FormControl>
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
              <FormControl><Input placeholder="Ville d'arrivée" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Détails sur votre projet</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex: Déménagement d'un appartement T3, besoin d'emballer la vaisselle..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Envoyer ma demande
        </Button>
      </form>
    </Form>
  );
}
