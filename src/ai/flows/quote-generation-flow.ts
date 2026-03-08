
'use server';
/**
 * @fileOverview A Genkit flow for generating a price quote for a move.
 *
 * - generateQuote - A function that takes move details and returns a calculated price.
 * - QuoteInput - The input type for the flow.
 * - QuoteOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuoteInputSchema = z.object({
  distance: z.number().describe("La distance du déménagement en kilomètres."),
  volume: z.number().describe("Le volume total des biens à déménager en mètres cubes (m³)."),
  serviceType: z.enum(["basic", "full", "premium"]).describe("Le type de formule choisi par le client (Économique, Standard, Confort)."),
  details: z.string().optional().describe("Toute information complémentaire fournie par le client (étages, ascenseur, objets lourds, accès difficile...)."),
});
export type QuoteInput = z.infer<typeof QuoteInputSchema>;

const QuoteOutputSchema = z.object({
  price: z.number().describe("Le prix final estimé pour la prestation de déménagement en euros."),
});
export type QuoteOutput = z.infer<typeof QuoteOutputSchema>;


export async function generateQuote(
  input: QuoteInput
): Promise<QuoteOutput> {
  return quoteGenerationFlow(input);
}


const quoteGenerationPrompt = ai.definePrompt({
  name: 'quoteGenerationPrompt',
  input: { schema: QuoteInputSchema },
  output: { schema: QuoteOutputSchema },
  prompt: `
    Vous êtes un expert en tarification pour une entreprise de déménagement. Votre rôle est de calculer un devis précis et juste en fonction des informations fournies.

    Voici la grille tarifaire de base :
    - Prix de base par mètre cube (m³) : 40€/m³
    - Prix par kilomètre (km) : 1.50€/km

    Coefficients multiplicateurs pour les formules :
    - Formule "basic" (Économique) : coefficient de 1.0 (le client fait les cartons)
    - Formule "full" (Standard) : coefficient de 1.2 (nous emballons/déballons le fragile)
    - Formule "premium" (Confort) : coefficient de 1.5 (nous nous occupons de tout)

    Analyse des détails pour ajustements (ajoutez un montant fixe au total si nécessaire) :
    - Mention d'objets lourds (piano, coffre-fort) : +150€ à +300€ selon la complexité.
    - Mention d'étages élevés sans ascenseur : +50€ par étage au-delà du 2ème.
    - Accès particulièrement difficile mentionné : +100€ à +200€.
    - Si aucun détail particulier n'est mentionné, n'ajoutez aucun coût supplémentaire.

    Calcul :
    1. Calculez le coût de base : (volume * 40) + (distance * 1.50)
    2. Appliquez le coefficient de la formule sur le coût de base.
    3. Analysez les 'details' et ajoutez les frais supplémentaires si nécessaire.
    4. Le résultat final doit être le prix total en euros.

    Informations pour le devis :
    - Distance : {{{distance}}} km
    - Volume : {{{volume}}} m³
    - Formule : {{{serviceType}}}
    - Détails fournis par le client : "{{{details}}}"

    Veuillez maintenant calculer le prix final et le retourner dans le champ 'price'.
  `,
});


const quoteGenerationFlow = ai.defineFlow(
  {
    name: 'quoteGenerationFlow',
    inputSchema: QuoteInputSchema,
    outputSchema: QuoteOutputSchema,
  },
  async (input) => {
    const { output } = await quoteGenerationPrompt(input);
    return output!;
  }
);
