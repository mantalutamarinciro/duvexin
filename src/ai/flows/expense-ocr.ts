'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExpenseOcrInputSchema = z.object({
  imageBase64: z.string().describe("L'image encodée en base64 (sans préfixe data:image/jpeg;base64,)"),
  mimeType: z.string().describe("Le type MIME de l'image (ex: image/jpeg, image/png)"),
});

export type ExpenseOcrInput = z.infer<typeof ExpenseOcrInputSchema>;

const ExpenseOcrOutputSchema = z.object({
  description: z.string().describe("Description claire et courte de la dépense, incluant le nom du commerçant (ex: Total Carburant, Castorama Achat Outillage, Assurance Camion)"),
  amount: z.number().describe("Le montant total TTC de la dépense en Euros"),
  date: z.string().describe("La date d'émission de la facture/reçu au format AAAA-MM-JJ. Si introuvable, retourner la date d'aujourd'hui."),
  category: z.enum(['Carburant', 'Matériel', 'Salaires', 'Assurance', 'Marketing', 'Autre']).describe("La catégorie la plus correspondante"),
});

export type ExpenseOcrOutput = z.infer<typeof ExpenseOcrOutputSchema>;

export async function analyzeExpenseReceipt(input: ExpenseOcrInput): Promise<ExpenseOcrOutput> {
  return expenseOcrFlow(input);
}

const expenseOcrFlow = ai.defineFlow(
  {
    name: 'expenseOcrFlow',
    inputSchema: ExpenseOcrInputSchema,
    outputSchema: ExpenseOcrOutputSchema,
  },
  async (input) => {
    try {
      const response = await ai.generate({
        prompt: [
          { text: `Vous êtes un assistant comptable intelligent pour une entreprise de déménagement.
          Analysez cette photo de reçu, ticket de caisse ou facture pour en extraire les informations comptables structurées.
          
          Veuillez extraire avec précision :
          1. Le montant total TTC (toutes taxes comprises) payé.
          2. La date de facturation (convertie au format ISO standard AAAA-MM-JJ, par exemple 2026-07-06).
          3. Une description concise qui commence par le nom de l'enseigne/commerçant suivi de l'objet principal de l'achat (ex: "Castorama - Cartons et adhésifs").
          4. La catégorie la plus adéquate parmi les 6 catégories autorisées :
             - 'Carburant' : Pour l'essence, le gazole, péages routiers.
             - 'Matériel' : Pour les fournitures de déménagement, cartons, sangles, diables, outils.
             - 'Salaires' : Pour les fiches de paie, primes, cotisations.
             - 'Assurance' : Assurances locaux, véhicules, RC Pro.
             - 'Marketing' : Publicités, flyers, adwords, logo.
             - 'Autre' : Si aucune des catégories ci-dessus ne correspond.
             
          Si des informations sont illisibles ou manquantes, donnez les meilleures estimations possibles basées sur les indices du reçu.` },
          {
            media: {
              url: `data:${input.mimeType};base64,${input.imageBase64}`,
            }
          }
        ],
        output: { schema: ExpenseOcrOutputSchema }
      });

      if (!response.output) {
        throw new Error("L'IA n'a pas pu structurer les données extraites du reçu.");
      }

      return response.output;
    } catch (error) {
      console.error("Error in expenseOcrFlow:", error);
      throw error;
    }
  }
);
