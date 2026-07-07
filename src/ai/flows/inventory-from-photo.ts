'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InventoryFromPhotoInputSchema = z.object({
  imageBase64: z.string().describe("L'image encodée en base64 (sans préfixe data:image/jpeg;base64,)"),
  mimeType: z.string().describe("Le type MIME de l'image (ex: image/jpeg, image/png)"),
});

export type InventoryFromPhotoInput = z.infer<typeof InventoryFromPhotoInputSchema>;

const InventoryFromPhotoOutputSchema = z.object({
  items: z.array(z.object({
    name: z.string().describe("Le nom en français de l'objet identifié (ex: Canapé 3 places, Table basse, Téléviseur, Plante)"),
    volume: z.number().describe("Le volume unitaire estimé en m³ de l'objet (ex: 1.5, 0.4)"),
    quantity: z.number().describe("La quantité visible ou estimée de cet objet"),
    category: z.string().describe("La catégorie de pièce logique (Salon, Chambre, Cuisine, Autre)"),
  })).describe("La liste des objets identifiés dans la pièce"),
  totalVolume: z.number().describe("Le volume total estimé pour l'ensemble des objets de l'image"),
});

export type InventoryFromPhotoOutput = z.infer<typeof InventoryFromPhotoOutputSchema>;

export async function analyzeRoomPhoto(input: InventoryFromPhotoInput): Promise<InventoryFromPhotoOutput> {
  return inventoryFromPhotoFlow(input);
}

const inventoryFromPhotoFlow = ai.defineFlow(
  {
    name: 'inventoryFromPhotoFlow',
    inputSchema: InventoryFromPhotoInputSchema,
    outputSchema: InventoryFromPhotoOutputSchema,
  },
  async (input) => {
    try {
      const response = await ai.generate({
        prompt: [
          { text: `Vous êtes un expert déménageur et estimateur de volumes (m³). 
          Analysez cette photo ou vidéo de pièce et listez TOUS les meubles et cartons visibles.
          Pour chaque meuble, donnez son nom usuel en français, estimez sa quantité et son volume en m³ (soyez réaliste, ex: un canapé 3 places fait environ 1.5 à 2 m³, une table basse 0.3 m³, une chaise 0.2 m³, un carton 0.1 m³).
          Catégorisez chaque objet (ex: Salon, Chambre, Cuisine, Bureau, Autre).
          Calculez également le volume total de tous ces objets.` },
          {
            media: {
              url: `data:${input.mimeType};base64,${input.imageBase64}`,
            }
          }
        ],
        output: { schema: InventoryFromPhotoOutputSchema }
      });

      if (!response.output) {
        throw new Error("L'IA n'a pas pu structurer la réponse.");
      }

      return response.output;
    } catch (error) {
      console.error("Error in inventoryFromPhotoFlow:", error);
      throw error;
    }
  }
);
