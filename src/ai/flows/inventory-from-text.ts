'use server';
/**
 * @fileOverview Génère une liste d'inventaire structurée à partir
 * d'une description en langage naturel.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const InventoryItemSchema = z.object({
  name: z
    .string()
    .describe("Le nom de l'objet (par exemple, 'Canapé' ou 'Carton de livres')."),
  quantity: z.number().describe("La quantité de cet objet."),
  volume: z
    .number()
    .describe("Le volume unitaire estimé de l'objet en mètres cubes (m³)."),
});

const InventoryFromTextInputSchema = z.object({
  description: z
    .string()
    .describe("La description en langage naturel des objets à inclure dans l'inventaire."),
});

export type InventoryFromTextInput = z.infer<typeof InventoryFromTextInputSchema>;

const InventoryFromTextOutputSchema = z.object({
  items: z
    .array(InventoryItemSchema)
    .describe("La liste des objets d'inventaire structurés."),
});

export type InventoryFromTextOutput = z.infer<typeof InventoryFromTextOutputSchema>;

export async function generateInventoryFromText(
  input: InventoryFromTextInput
): Promise<InventoryFromTextOutput> {
  return generateInventoryFromTextFlow(input);
}

const buildPrompt = (description: string) => `
Vous êtes un assistant expert en déménagement.

Votre rôle est de prendre une description textuelle fournie par un utilisateur
et de la transformer en une liste d'objets structurée.

Pour chaque objet identifié, vous devez déterminer :
- son nom
- la quantité
- un volume unitaire réaliste en mètres cubes (m³)

Exemples :
- "un grand canapé d'angle" -> { "name": "Canapé d'angle", "quantity": 1, "volume": 2.5 }
- "une table basse" -> { "name": "Table basse", "quantity": 1, "volume": 0.3 }
- "deux petites lampes" -> { "name": "Lampe", "quantity": 2, "volume": 0.05 }
- "une dizaine de cartons de taille moyenne" -> { "name": "Carton moyen", "quantity": 10, "volume": 0.1 }
- "une télé 55 pouces et son meuble" ->
  [
    { "name": "Télévision 55 pouces", "quantity": 1, "volume": 0.2 },
    { "name": "Meuble TV", "quantity": 1, "volume": 0.5 }
  ]

Soyez précis.
Regroupez les objets similaires.
Utilisez des estimations réalistes pour les objets ménagers courants.

Description de l'utilisateur :
${description}
`;

const generateInventoryFromTextFlow = ai.defineFlow(
  {
    name: 'generateInventoryFromTextFlow',
    inputSchema: InventoryFromTextInputSchema,
    outputSchema: InventoryFromTextOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
      prompt: buildPrompt(input.description),
      output: { schema: InventoryFromTextOutputSchema },
    });

    if (!output) {
      throw new Error("La réponse du modèle n'a pas respecté le schéma attendu.");
    }

    return output;
  }
);
