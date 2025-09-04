
'use server';
/**
 * @fileOverview A Genkit flow for generating a reminder email for a move.
 *
 * - generateReminderEmail - A function that takes booking details and generates an email.
 * - ReminderEmailInput - The input type for the flow.
 * - ReminderEmailOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ReminderEmailInputSchema = z.object({
  clientName: z.string().describe("Le nom du client."),
  moveDate: z.string().describe("La date du déménagement au format ISO."),
  originAddress: z.string().describe("L'adresse de départ."),
  destinationAddress: z.string().describe("L'adresse de destination."),
  assignedTeam: z.string().describe("Le nom de l'équipe assignée."),
});
export type ReminderEmailInput = z.infer<typeof ReminderEmailInputSchema>;

const ReminderEmailOutputSchema = z.object({
  subject: z.string().describe("L'objet de l'e-mail, qui doit être clair et concis."),
  body: z.string().describe("Le corps de l'e-mail, rédigé de manière professionnelle et amicale."),
});
export type ReminderEmailOutput = z.infer<typeof ReminderEmailOutputSchema>;


export async function generateReminderEmail(
  input: ReminderEmailInput
): Promise<ReminderEmailOutput> {
  return generateReminderEmailFlow(input);
}


const reminderPrompt = ai.definePrompt({
  name: 'reminderEmailPrompt',
  input: { schema: ReminderEmailInputSchema },
  output: { schema: ReminderEmailOutputSchema },
  prompt: `
    Vous êtes un assistant de communication pour une entreprise de déménagement appelée "DemDuVexin".
    Votre tâche est de générer un e-mail de rappel amical et professionnel pour un client la veille de son déménagement.

    Utilisez un ton courtois et rassurant. N'oubliez pas d'inclure toutes les informations importantes.

    Informations sur le déménagement :
    - Nom du client : {{{clientName}}}
    - Date du déménagement : {{{moveDate}}}
    - Adresse de départ : {{{originAddress}}}
    - Adresse d'arrivée : {{{destinationAddress}}}
    - Équipe assignée : {{{assignedTeam}}}

    Structure de l'e-mail :
    1.  **Objet** : Doit être clair, par exemple : "Rappel de votre déménagement avec DemDuVexin demain".
    2.  **Corps de l'e-mail** :
        - Salutation personnalisée (ex: "Cher/Chère {{{clientName}}},").
        - Rappel de la date et de l'heure approximative d'arrivée de l'équipe.
        - Confirmation des adresses de départ et d'arrivée.
        - Mention de l'équipe qui interviendra ({{{assignedTeam}}}).
        - Quelques conseils pratiques de dernière minute (ex: s'assurer que les accès sont dégagés, garder les objets importants à portée de main).
        - Une formule de politesse pour conclure, en indiquant que l'équipe est impatiente de l'aider.
        - Signature de l'entreprise ("L'équipe DemDuVexin").

    Veuillez générer l'objet et le corps de l'e-mail.
  `,
});


const generateReminderEmailFlow = ai.defineFlow(
  {
    name: 'generateReminderEmailFlow',
    inputSchema: ReminderEmailInputSchema,
    outputSchema: ReminderEmailOutputSchema,
  },
  async (input) => {
    const { output } = await reminderPrompt(input);
    return output!;
  }
);
