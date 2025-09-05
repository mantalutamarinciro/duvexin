
'use server';
/**
 * @fileOverview A Genkit flow for optimizing a route with multiple stops.
 *
 * - optimizeRoute - A function that takes a start/end point and a list of stops and returns the most efficient order.
 * - RouteOptimizationInput - The input type for the flow.
 * - RouteOptimizationOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const RouteOptimizationInputSchema = z.object({
  depotAddress: z.string().describe("L'adresse de départ et de retour (le dépôt)."),
  stopAddresses: z.array(z.string()).min(2, "Au moins deux arrêts sont requis pour l'optimisation."),
});
export type RouteOptimizationInput = z.infer<typeof RouteOptimizationInputSchema>;

const OptimizedStopSchema = z.object({
  address: z.string().describe("L'adresse de l'arrêt."),
  order: z.number().describe("L'ordre de visite dans la tournée optimisée (1, 2, 3, etc.)."),
});

const RouteOptimizationOutputSchema = z.object({
  optimizedRoute: z.array(OptimizedStopSchema).describe("La liste des arrêts dans l'ordre de visite optimal."),
  totalDistanceKm: z.number().describe("La distance totale estimée pour la tournée optimisée, en kilomètres."),
});
export type RouteOptimizationOutput = z.infer<typeof RouteOptimizationOutputSchema>;

export async function optimizeRoute(input: RouteOptimizationInput): Promise<RouteOptimizationOutput> {
  return routeOptimizationFlow(input);
}

const routeOptimizationPrompt = ai.definePrompt({
  name: 'routeOptimizationPrompt',
  input: { schema: RouteOptimizationInputSchema },
  output: { schema: RouteOptimizationOutputSchema },
  prompt: `Vous êtes un expert en logistique et en optimisation de tournées. Votre rôle est de résoudre le Problème du Voyageur de Commerce (TSP) pour une série d'arrêts donnés.

  Vous devez déterminer l'ordre le plus efficace pour visiter une liste d'adresses en partant d'un dépôt et en y revenant à la fin de la tournée. L'objectif est de minimiser la distance totale parcourue.

  Informations sur la tournée :
  - Dépôt (départ et arrivée) : {{{depotAddress}}}
  - Adresses à visiter :
  {{#each stopAddresses}}
  - {{{this}}}
  {{/each}}

  Votre tâche :
  1.  Calculez la matrice des distances entre toutes les paires de points (dépôt et arrêts).
  2.  Déterminez la séquence de visite des arrêts qui minimise la distance totale, en commençant au dépôt et en terminant au dépôt.
  3.  Structurez la sortie pour lister les arrêts dans leur ordre de visite optimisé (de 1 au nombre total d'arrêts).
  4.  Calculez la distance totale de la tournée optimisée en kilomètres.

  Exemple de sortie pour 3 arrêts :
  - optimizedRoute: [{ address: "Adresse C", order: 1 }, { address: "Adresse A", order: 2 }, { address: "Adresse B", order: 3 }]
  - totalDistanceKm: 123

  Veuillez maintenant fournir l'itinéraire optimisé et la distance totale.`,
});

const routeOptimizationFlow = ai.defineFlow(
  {
    name: 'routeOptimizationFlow',
    inputSchema: RouteOptimizationInputSchema,
    outputSchema: RouteOptimizationOutputSchema,
  },
  async (input) => {
    const { output } = await routeOptimizationPrompt(input);
    return output!;
  }
);
