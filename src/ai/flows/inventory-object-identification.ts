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
      'A description of the object, including its type, materials, and any notable features.'
    ),
});

export type InventoryObjectIdentificationInput =
  z.infer<typeof InventoryObjectIdentificationInputSchema>;

const InventoryObjectIdentificationOutputSchema = z.object({
  objectType: z.string().describe('The identified type of the object.'),
  estimatedDimensions: z
    .string()
    .describe('Estimated dimensions of the object (e.g., length x width x height in cm).'),
  estimatedWeightKg: z.number().describe('Estimated weight of the object in kilograms.'),
  fragility: z
    .string()
    .describe(
      'A qualitative assessment of the object fragility (e.g., fragile, sturdy, etc.).'
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
  prompt: `You are an AI assistant designed to help users identify household objects based on provided characteristics and guess the object's dimensions, weight, and fragility.

  Based on the following characteristics:
  {{objectCharacteristics}}

  Please provide your best guess for the following properties:
  - objectType: The type of the object.
  - estimatedDimensions: Estimated dimensions of the object (e.g., length x width x height in cm).
  - estimatedWeightKg: Estimated weight of the object in kilograms.
  - fragility: A qualitative assessment of the object fragility (e.g., fragile, sturdy, etc.).

  Return the object properties in JSON format.
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
