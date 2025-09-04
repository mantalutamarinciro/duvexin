'use server';

/**
 * @fileOverview This file defines a Genkit flow for intelligent object identification during inventory data input.
 *
 * It uses a language model to estimate dimensions, weight, and fragility of household objects based on a few characteristics provided by the user.
 *
 * @module inventory-object-identification
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InventoryObjectIdentificationInputSchema = z.object({
  objectCharacteristics: z
    .string()
    .describe(
      "Une description de l'objet, incluant son type, ses matériaux et toute caractéristique notable."
    ),
});

export type InventoryObjectIdentificationInput =
  z.infer<typeof InventoryObjectIdentificationInputSchema>;

const InventoryObjectIdentificationOutputSchema = z.object({
  objectType: z.string().describe("Le type identifié de l'objet."),
  estimatedDimensions: z
    .string()
    .describe("Dimensions estimées de l'objet (par exemple, longueur x largeur x hauteur en cm)."),
  estimatedWeightKg: z.number().describe("Poids estimé de l'objet en kilogrammes."),
  fragility: z
    .string()
    .describe(
      "Une évaluation qualitative de la fragilité de l'objet (par exemple, fragile, robuste, etc.)."
    ),
});

export type InventoryObjectIdentificationOutput =
  z.infer<typeof InventoryObjectIdentificationOutputSchema>;

export async function identifyInventoryObject(
  input: InventoryObjectIdentificationInput
): Promise<InventoryObjectIdentificationOutput> {
  return inventoryObjectIdentificationFlow(input);
}

const inventoryObjectIdentificationPrompt = ai.definePrompt({
  name: 'inventoryObjectIdentificationPrompt',
  input: {schema: InventoryObjectIdentificationInputSchema},
  output: {schema: InventoryObjectIdentificationOutputSchema},
  prompt: `Vous êtes un assistant IA conçu pour aider les utilisateurs à identifier des objets ménagers en fonction des caractéristiques fournies et à deviner les dimensions, le poids et la fragilité de l'objet.

  En fonction des caractéristiques suivantes:
  {{objectCharacteristics}}

  Veuillez fournir votre meilleure estimation pour les propriétés suivantes:
  - objectType: Le type de l'objet.
  - estimatedDimensions: Dimensions estimées de l'objet (par exemple, longueur x largeur x hauteur en cm).
  - estimatedWeightKg: Poids estimé de l'objet en kilogrammes.
  - fragility: Une évaluation qualitative de la fragilité de l'objet (par exemple, fragile, robuste, etc.).

  Retournez les propriétés de l'objet au format JSON.
  `,
});

const inventoryObjectIdentificationFlow = ai.defineFlow(
  {
    name: 'inventoryObjectIdentificationFlow',
    inputSchema: InventoryObjectIdentificationInputSchema,
    outputSchema: InventoryObjectIdentificationOutputSchema,
  },
  async input => {
    const {output} = await inventoryObjectIdentificationPrompt(input);
    return output!;
  }
);
