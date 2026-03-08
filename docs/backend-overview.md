# Architecture Backend - Déménagement Du Vexin

Ce document récapitule la structure et les fonctionnalités du backend de l'application.

## 1. Base de données (Firebase Firestore)

L'application repose sur une structure NoSQL organisée en plusieurs collections :

- **`quotes`** : Stocke les demandes de devis (provenance directe ou API). Statuts : `pending`, `accepted`, `refused`, `converted`.
- **`bookings`** : Réservations confirmées (issues de la conversion d'un devis). Gère l'assignation des équipes et des véhicules.
- **`teams`** : Gestion des équipes de déménageurs (noms et membres).
- **`vehicles`** : Gestion de la flotte (marque, immatriculation, volume utile).
- **`expenses`** : Suivi financier des dépenses (carburant, salaires, etc.).
- **`inventories`** : Listes d'objets détaillées liées aux estimations de volume.
- **`storage_contracts`** : Suivi des entrées et sorties du garde-meubles.
- **`visits`** : Planning des visites techniques commerciales.

## 2. Services et Logique Métier (`src/services/`)

La logique est centralisée dans des "Server Actions" pour une sécurité maximale :

- **`quoteService.ts`** : Création de devis et envoi des notifications e-mail (Admin + Client) via **Resend**.
- **`bookingService.ts`** : Conversion des devis en réservations et mise à jour des statuts en temps réel pour le suivi client.
- **`planningService.ts`** : Agrégation des données pour la vue calendrier unifiée.
- **`storageService.ts`** : Gestion des flux de stockage (entrée/sortie).

## 3. Intelligence Artificielle (Genkit)

L'IA est intégrée via plusieurs "flows" spécialisés :

- **Inventory extraction** : Transforme une description textuelle en liste d'objets avec volumes.
- **Quote generation** : Calcule un prix juste en fonction du volume, de la distance et de la formule.
- **Route optimization** : Calcule l'itinéraire le plus efficace pour les tournées multi-arrêts.
- **Address analysis** : Nettoie les adresses et calcule la distance kilométrique exacte.

## 4. Notifications et Intégrations

- **E-mails** : Utilisation de **Resend API** pour l'envoi de confirmations et de notifications admin (configuré dans `quoteService.ts`).
- **Webhooks** : Route `/api/quotes` permettant de recevoir des demandes de devis depuis un site WordPress externe (sécurisé par clé API).
- **Avis Clients** : Route `/api/reviews` pour synchroniser les avis Google My Business avec le site vitrine.

## 5. Sécurité

- **Firestore Rules** : Accès contrôlé aux documents.
- **Security Headers** : Content Security Policy (CSP), HSTS et protection anti-clickjacking configurés dans `next.config.ts`.
