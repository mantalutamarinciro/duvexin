'use server';
/**
 * @fileOverview Flux Genkit d'IA pour générer un e-mail de relance commercial personnalisé.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FollowUpEmailInputSchema = z.object({
  clientName: z.string().describe("Le nom du client."),
  volume: z.number().describe("Le volume total estimé en m³."),
  originAddress: z.string().describe("L'adresse de départ."),
  destinationAddress: z.string().describe("L'adresse d'arrivée."),
  price: z.number().describe("Le montant total du devis en euros."),
  serviceType: z.string().describe("Le type de formule choisi (basic, full, premium)."),
});
export type FollowUpEmailInput = z.infer<typeof FollowUpEmailInputSchema>;

const FollowUpEmailOutputSchema = z.object({
  subject: z.string().describe("L'objet de l'e-mail (court, accrocheur et professionnel)."),
  body: z.string().describe("Le corps de l'e-mail formaté en HTML, incluant des salutations, des arguments de confiance et une relance subtile."),
});
export type FollowUpEmailOutput = z.infer<typeof FollowUpEmailOutputSchema>;

export async function generateFollowUpEmail(
  input: FollowUpEmailInput
): Promise<FollowUpEmailOutput> {
  return generateFollowUpEmailFlow(input);
}

const followUpPrompt = ai.definePrompt({
  name: 'followUpEmailPrompt',
  input: { schema: FollowUpEmailInputSchema },
  output: { schema: FollowUpEmailOutputSchema },
  prompt: `
    Vous êtes un chargé de relation client d'élite pour l'entreprise "Déménagement du Vexin".
    Votre mission est de générer un e-mail de relance personnalisé, chaleureux et persuasif pour un prospect qui a reçu un devis il y a quelques jours mais n'a pas encore validé sa réservation.

    Voici les informations sur le devis :
    - Nom du client : {{{clientName}}}
    - Volume à déménager : {{{volume}}} m³
    - Trajet : de {{{originAddress}}} vers {{{destinationAddress}}}
    - Formule demandée : {{{serviceType}}}
    - Tarif proposé : {{{price}}} € TTC

    Directives de rédaction :
    - Ton : Très professionnel, poli, familial, chaleureux et rassurant.
    - Évitez le ton commercial agressif. Mettez en avant le service, l'accompagnement personnalisé et le soin apporté à leurs biens.
    - Rappelez brièvement les détails du projet pour montrer que l'on se souvient d'eux.
    - Mentionnez que nos équipes sont 100% salariées, sans aucune sous-traitance (gage de confiance).
    - Proposez un appel téléphonique rapide pour ajuster le devis, répondre à des questions logistiques ou bloquer une date dans le planning avant qu'il ne soit complet.
    - Le corps du texte doit être au format HTML, aéré avec des paragraphes clairs et des listes à puces si nécessaire, sans CSS inline complexe.
    - Signez par "L'équipe Déménagement du Vexin".

    Générez un objet d'email captivant et le corps de l'email en HTML.
  `,
});

const generateFollowUpEmailFlow = ai.defineFlow(
  {
    name: 'generateFollowUpEmailFlow',
    inputSchema: FollowUpEmailInputSchema,
    outputSchema: FollowUpEmailOutputSchema,
  },
  async (input) => {
    const { output } = await followUpPrompt(input);
    if (!output) throw new Error("Impossible de générer l'e-mail de relance.");
    return output;
  }
);
