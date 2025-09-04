
'use server';
/**
 * @fileOverview A Genkit flow that generates a structured inventory list from a natural language description.
 *
 * - generateInventoryFromText - A function that takes a user's description of items and returns a structured list.
 * - InventoryFromTextInput - The input type for the flow.
 * - InventoryFromTextOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InventoryItemSchema = z.object({
  name: z.string().describe("Le nom de l'objet (par exemple, 'Canapé' ou 'Carton de livres')."),
  quantity: z.number().describe("La quantité de cet objet."),
  volume: z.number().describe("Le volume unitaire estimé de l'objet en mètres cubes (m³)."),
});

export const InventoryFromTextInputSchema = z.object({
  description: z
    .string()
    .describe("La description en langage naturel des objets à inclure dans l'inventaire."),
});
export type InventoryFromTextInput = z.infer<typeof InventoryFromTextInputSchema>;

export const InventoryFromTextOutputSchema = z.object({
  items: z.array(InventoryItemSchema).describe("La liste des objets d'inventaire structurés."),
});
export type InventoryFromTextOutput = z.infer<typeof InventoryFromTextOutputSchema>;

export async function generateInventoryFromText(
  input: InventoryFromTextInput
): Promise<InventoryFromTextOutput> {
  return generateInventoryFromTextFlow(input);
}

const inventoryGenerationPrompt = ai.definePrompt({
  name: 'inventoryGenerationPrompt',
  input: { schema: InventoryFromTextInputSchema },
  output: { schema: InventoryFromTextOutputSchema },
  prompt: `Vous êtes un assistant expert en déménagement. Votre rôle est de prendre une description textuelle fournie par un utilisateur et de la transformer en une liste d'objets structurée. Pour chaque objet identifié, vous devez déterminer son nom, la quantité, et estimer un volume unitaire réaliste en mètres cubes (m³).

  Par exemple :
  - "un grand canapé d'angle" -> { name: "Canapé d'angle", quantity: 1, volume: 2.5 }
  - "une table basse" -> { name: "Table basse", quantity: 1, volume: 0.3 }
  - "deux petites lampes" -> { name: "Lampe", quantity: 2, volume: 0.05 }
  - "une dizaine de cartons de taille moyenne" -> { name: "Carton moyen", quantity: 10, volume: 0.1 }
  - "une télé 55 pouces et son meuble" -> [{ name: "Télévision 55 pouces", quantity: 1, volume: 0.2 }, { name: "Meuble TV", quantity: 1, volume: 0.5 }]

  Soyez précis et essayez de regrouper les objets similaires. Utilisez des estimations de volume standards pour les objets ménagers courants.

  Description de l'utilisateur :
  {{{description}}}

  Veuillez maintenant générer la liste d'objets structurée.`,
});

const generateInventoryFromTextFlow = ai.defineFlow(
  {
    name: 'generateInventoryFromTextFlow',
    inputSchema: InventoryFromTextInputSchema,
    outputSchema: InventoryFromTextOutputSchema,
  },
  async (input) => {
    const { output } = await inventoryGenerationPrompt(input);
    return output!;
  }
);

    