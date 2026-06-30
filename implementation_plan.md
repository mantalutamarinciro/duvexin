# Plan d'Implémentation : Digitalisation Avancée du Vexin

Ce plan détaille la mise en œuvre des 6 suggestions validées pour rendre le quotidien de la secrétaire ultra-efficace. Étant donné l'ampleur des fonctionnalités, plusieurs décisions techniques nécessitent votre validation, notamment concernant les services tiers (Paiement, SMS, Tâches planifiées).

## User Review Required

> [!IMPORTANT]
> **Paiements en ligne (Acompte)**
> Pour la signature et le paiement de l'acompte (30%), nous devons intégrer **Stripe**.
> **Question :** Souhaitez-vous que j'intègre Stripe en "Mode Test" (qui nécessite que vous créiez un compte Stripe et me fournissiez les clés API de test `pk_test` et `sk_test`), ou préférez-vous que je crée une **simulation complète de paiement** (un faux terminal de paiement) pour la démonstration à votre client, afin de ne pas vous bloquer avec la création de comptes ?

> [!WARNING]
> **Envoi de SMS (Clients et Équipes)**
> L'envoi de SMS (rappel client J-2, feuille de route équipe) nécessite un prestataire payant comme Twilio ou Brevo.
> **Question :** Dois-je intégrer l'API Twilio (nécessite un compte de votre part), ou dois-je créer un simulateur de SMS dans le tableau de bord (qui affiche une notification "SMS Envoyé à 06..." pour la démo) ?

> [!TIP]
> **Automatisations (Relances Devis)**
> Habituellement, les relances automatiques à J+3 nécessitent un serveur permanent (cron job ou Firebase Functions). 
> **Question :** Pour rester sur une architecture légère et gratuite pour le moment, êtes-vous d'accord pour que je crée un "Moteur d'automatisation" dans le Dashboard ? Ce serait un bouton ou une vérification automatique chaque fois que vous vous connectez, qui détecte les devis expirés et propose/envoie les relances d'un clic.

## Proposed Changes

---

### 1. Signature et Paiement en Ligne (Portail Client)

Création d'un portail client sécurisé (sans mot de passe, accès via lien unique envoyé par email).
#### [NEW] `src/app/quote/[quoteId]/page.tsx`
- Page publique pour le client.
- Affichage du devis détaillé.
- Bouton "Signer et payer l'acompte (30%)".
- Intégration du composant de paiement (Stripe ou Mock).
#### [MODIFY] `src/app/api/quotes/route.ts` & `src/services/quoteService.ts`
- Mise à jour du statut à `Accepté` post-paiement.

---

### 2. Algorithme de Chiffrage Rapide

#### [MODIFY] `src/components/quote-form.tsx`
- Ajout d'un bouton "Baguette magique / Calcul auto".
- Algorithme : Prix = (Volume * Prix de base) + (Distance * Coût km) + (Étage * Majoration).
- Génération instantanée du montant suggéré, modifiable à la main.

---

### 3. Planification Intelligente & Anti-Surbooking

#### [MODIFY] `src/app/dashboard/planning/page.tsx`
- Refonte de la vue calendrier.
- Vérification : Si `Date X` a déjà `Y` déménagements planifiés dépassant le nombre total de véhicules/équipes, blocage ou alerte rouge lors de la conversion d'un devis.
#### [MODIFY] `src/services/teamService.ts`
- Utilisation des données existantes (membres et camions) pour calculer la capacité maximale par jour.

---

### 4. Feuille de Route Numérique & SMS

#### [NEW] `src/app/dashboard/planning/[bookingId]/roadmap/page.tsx`
- Génération d'une feuille de route mobile-friendly pour les déménageurs (Adresses cliquables vers Waze/Maps, contacts, volume).
#### [MODIFY] `src/app/dashboard/planning/page.tsx`
- Bouton "Envoyer la feuille de route à l'équipe" (via SMS/Email).
- Bouton "Envoyer rappel SMS au client".

---

### 5. Automatisation des Relances

#### [NEW] `src/app/dashboard/automations/page.tsx`
- Nouveau centre de contrôle des actions en attente.
- Liste les devis envoyés depuis plus de 3 jours sans réponse.
- Bouton "Lancer les relances automatiques".

## Verification Plan

### Manual Verification
1. Je créerai un devis depuis le Dashboard.
2. J'utiliserai le bouton d'auto-chiffrage pour vérifier le calcul de rentabilité.
3. Je simulerai l'ouverture du lien client, la signature et le paiement.
4. Je vérifierai que le paiement bascule le devis en "Accepté" et bloque la date sur le planning.
5. Je testerai la détection de surbooking en essayant de placer 3 déménagements le même jour alors que nous n'avons que 2 camions.
