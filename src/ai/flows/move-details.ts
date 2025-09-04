
'use server';
/**
 * @fileOverview A Genkit flow that analyzes origin and destination addresses to provide formatted addresses and calculate the distance.
 *
 * - getMoveDetails - A function that takes two addresses and returns their formatted versions and the estimated distance between them.
 * - MoveDetailsInput - The input type for the flow.
 * - MoveDetailsOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const MoveDetailsInputSchema = z.object({
  originAddress: z.string().describe("L'adresse de départ, même approximative."),
  destinationAddress: z.string().describe("L'adresse de destination, même approximative."),
});
export type MoveDetailsInput = z.infer<typeof MoveDetailsInputSchema>;

const MoveDetailsOutputSchema = z.object({
  formattedOriginAddress: z.string().describe("L'adresse de départ complète et formatée."),
  formattedDestinationAddress: z.string().describe("L'adresse de destination complète et formatée."),
  distanceKm: z.number().describe("La distance routière estimée entre les deux adresses, en kilomètres."),
});
export type MoveDetailsOutput = z.infer<typeof MoveDetailsOutputSchema>;

export async function getMoveDetails(input: MoveDetailsInput): Promise<MoveDetailsOutput> {
  return getMoveDetailsFlow(input);
}

const moveDetailsPrompt = ai.definePrompt({
  name: 'moveDetailsPrompt',
  input: { schema: MoveDetailsInputSchema },
  output: { schema: MoveDetailsOutputSchema },
  prompt: `Vous êtes un assistant logistique expert. Votre rôle est de prendre une adresse de départ et une adresse d'arrivée, de les nettoyer pour en faire des adresses complètes et valides, puis de calculer la distance routière la plus probable entre elles en kilomètres.

  Adresse de départ : {{{originAddress}}}
  Adresse d'arrivée : {{{destinationAddress}}}

  Veuillez fournir les adresses formatées et la distance estimée.
  Par exemple, si on vous donne "10 rue grande, paris" et "la canebière marseille", vous devriez retourner quelque chose comme :
  - formattedOriginAddress: "10 Rue de la Grande Armée, 75017 Paris, France"
  - formattedDestinationAddress: "La Canebière, 13001 Marseille, France"
  - distanceKm: 775

  Soyez aussi précis que possible. Retournez uniquement le JSON structuré.`,
});

const getMoveDetailsFlow = ai.defineFlow(
  {
    name: 'getMoveDetailsFlow',
    inputSchema: MoveDetailsInputSchema,
    outputSchema: MoveDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await moveDetailsPrompt(input);
    return output!;
  }
);
