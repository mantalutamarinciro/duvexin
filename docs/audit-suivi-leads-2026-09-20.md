# Audit du suivi des leads — 20 septembre 2026

Périmètre : lecture du code au commit 33d4861 et du rapport GA4 « Acquisition de leads », propriété 539287528. Aucun envoi de lead, changement de statut CRM, réglage Ads ou suppression de données. Base de production non interrogée ; pas de rapprochement individuel effectué.

## Rapport observé

Période affichée : 1–20 septembre 2026, mois en cours donc incomplet. Le rapport combine le groupe de canaux du premier utilisateur et Source/Support de la session : ce ne sont pas deux dimensions d'attribution équivalentes.

| Ligne affichée | Nouveaux leads | Qualifiés | Convertis |
| --- | ---: | ---: | ---: |
| Paid Search / google / cpc | 2 | 0 | 0 |
| Organic Search / google / organic | 6 | 1 | 1 |
| Direct / (direct) / (none) | 8 | 1 | 0 |
| Total | 16 | 2 | 1 |

Ces compteurs ne prouvent pas 16 demandes commerciales distinctes ni un contrat organique réel. Plusieurs tests ont été effectués pendant cette période. Le lead converti n'a pas été rapproché d'un dossier client authentique. Ne pas calculer un ROI ou déduire le chiffre d'affaires de ces seuls nombres.

## Constats vérifiés dans le code

1. **Pas de distinction explicite test/réel dans le circuit inspecté.** Ni le schéma public, ni les événements navigateur, ni le filtre de cycle de vie serveur ne comportent de marqueur de test. Ne pas classer rétroactivement un dossier comme test sur son nom ou son montant seulement.
2. **Attribution CRM incomplète.** `analytics.ts` conserve UTM, gclid, page d'entrée et identifiants GA ; l'API les enregistre dans `analyticsAttribution`. Elle ne capture pas le référent externe. Sans UTM, les champs source/support CRM peuvent rester absents, même lorsque GA4 attribue la session à Organic Search. `getRequests()` et `MoveRequest` ne renvoient pas cette attribution à l'interface.
3. **Événement initial insuffisamment lié à la demande.** `generate_lead` reçoit le nom du formulaire, pas l'identifiant de demande. Le tracker peut recréer l'événement à partir du seul paramètre `lead=submitted` dans l'URL. La présence de ce paramètre n'est pas une preuve serveur de soumission.
4. **Consentement à harmoniser.** Le chargement de la balise est conditionné à l'acceptation, mais `getLeadAttribution()` appelle la capture au moment de la soumission sans vérifier cette acceptation. Le suivi serveur vérifie un clientId, pas un état explicite de consentement. Il s'agit d'un constat technique, pas d'un audit juridique.
5. **Sens métier des événements.** `qualify_lead` est déclenché à la création du devis ou au statut « Converti en visite ». `close_convert_lead` est déclenché à l'acceptation du devis ou à sa conversion en réservation, avec sa valeur. Un devis accepté n'est pas un paiement encaissé.
6. **Limites du suivi serveur.** Déduplication par type d'événement et demande ; un marqueur `sending` laissé par une interruption peut bloquer les essais ultérieurs. Une réponse HTTP réussie est enregistrée comme `sent` mais ne prouve pas que GA4 a validé et affiché l'événement. Les événements commerciaux tardifs ne garantissent pas l'attribution à la session initiale simplement en réutilisant son sessionId.
7. **Résilience du formulaire.** Lecture JSON et stockage de session non protégés : un stockage indisponible ou un JSON corrompu peut interrompre `getLeadAttribution()` avant l'envoi du formulaire. Le suivi ne doit pas empêcher une demande commerciale.

## Correctif proposé, à mettre en œuvre par lots

1. Sécuriser la soumission : attribution facultative et tolérante aux erreurs ; émission initiale liée à une soumission réussie, pas au seul paramètre d'URL ; tests automatisés sans envoi GA4 réel.
2. Définir un mode test explicite pour les futurs essais, propagé jusqu'au CRM et exclu de tous les événements commerciaux ; conserver les dossiers sans les supprimer. Faire confirmer les références des tests passés avant reclassement. Ne pas prétendre effacer rétroactivement les événements GA4 par un simple changement CRM.
3. Exposer la provenance dans le CRM avec un état « inconnue » plutôt que d'inventer du trafic direct/organique ; distinguer provenance observée à l'entrée et attribution GA4. Respecter le consentement et ne pas enregistrer d'URL contenant des données personnelles inutiles.
4. Rapprocher les vrais dossiers, qualifications et devis acceptés ; ne pas utiliser les seuls compteurs GA4 comme registre commercial. Vérifier ensuite l'attribution des événements tardifs et la reprise des envois interrompus.

## Lot 1 préparé localement après l’audit

- Lecture/écriture du stockage et appels gtag protégés ; attribution facultative dans le formulaire.
- Consentement vérifié avant capture et émission, puis à nouveau après récupération asynchrone des identifiants.
- Page d’entrée limitée à origine + chemin (pas de query string ni de fragment).
- Marqueur temporaire créé après réponse API réussie avec référence de demande, expiration à 30 minutes ; suppression avant émission, protection contre les effets répétés et rechargements ordinaires.
- Le paramètre `lead=submitted` ne crée plus d’événement. Le tracker consomme uniquement le marqueur issu du formulaire. Ce mécanisme navigateur n’est pas une preuve cryptographique contre la falsification volontaire du stockage.
- En cas d’exception à l’envoi, pas de réémission automatique : priorité à l’absence de doublon ; un appel gtag réussi ne prouve toujours pas la réception dans GA4. Si le stockage est bloqué, le secours en mémoire ne survit pas à un rechargement complet.
- Douze tests automatisés isolés, sans réseau, couvrent ces comportements. Les anciens événements GA4 ne sont pas modifiés.

Mode test explicite, provenance visible dans le CRM et corrections de cycle de vie serveur restent hors de ce premier lot. Aucun commit ni déploiement de ce lot à ce stade.

## Lot 2 préparé localement — demandes CRM

- Base existante confirmée par l’utilisateur : `(default)`, édition Standard, région europe-west9. Aucune migration ni écriture de dossier exécutée pendant le développement.
- Actions `getRequests`, `updateRequestStatus`, `updateRequestVolume`, `setRequestTest` protégées par vérification Admin SDK du jeton avec contrôle de révocation, e-mail vérifié et allowlist. Préférence serveur `SUPER_ADMIN_EMAILS`, puis configuration existante `NEXT_PUBLIC_SUPER_ADMIN_EMAILS`, puis administrateur historique. Une liste configurée vide refuse tout accès. Aucun jeton journalisé.
- Appels clients adaptés dans demandes, devis, visites et calculateur interne. La création historique WordPress vérifie sa clé à la frontière de l’action et filtre ses champs ; l’API publique du formulaire reste distincte et inchangée.
- Classification réversible « Test », confirmation explicite, auteur/date enregistrés ; filtre « Hors tests identifiés » (ne prétend pas certifier tous les autres prospects).
- Un dossier marqué test est exclu des futurs événements `qualify_lead` et `close_convert_lead`. Un envoi déjà en cours empêche temporairement le reclassement. Aucune annulation rétroactive GA4 et aucune réémission au retrait du marquage. Le mode de test avant soumission initiale reste à concevoir : le marquage CRM ne retire pas `generate_lead` déjà envoyé.
- Provenance minimale affichée : UTM ou présence de gclid ; inconnue sinon. Pas de clientId/sessionId/gclid brut transmis par la projection de liste. Ne reconstitue pas l’organique historique absent des champs CRM.
- Tests unitaires avec SDK simulé : refus avant accès base, vérification de révocation, compte non autorisé/non vérifié, validation des entrées, classification et exclusion des événements futurs. Pas de test d’intrusion ni d’écriture en production.

Limites : ce correctif concerne uniquement le service des demandes. Les autres services CRM et les règles d’accès direct Firestore ne sont pas couverts par cette validation. L’interface et la connexion réelle devront être vérifiées avant publication. Un compte administrateur dont l’e-mail n’est pas vérifié sera refusé. Aucun commit ni déploiement de ces lots à ce stade.

## Validation CRM réelle — complément du 20 septembre

Les constats suivants remplacent les réserves de validation de connexion ci-dessus :

- Connexion administrateur et lecture des 401 demandes vérifiées dans le CRM local connecté à la base réelle. La lecture de liste ne réécrit plus les anciens statuts ; un test de non-régression supplémentaire porte le total à 40 tests.
- Après identification explicite par l’utilisateur, seuls les dossiers Hachour du 12 septembre à 10:51 et Mantaluta Marin du 2 septembre à 14:13 ont été marqués Test dans la base réelle. Aucun dossier supprimé et aucun statut commercial modifié.
- Sur Hachour : ajout du marquage, visibilité dans le filtre des tests, retrait, disparition du filtre et restauration vérifiés. Mantaluta marqué ensuite ; le filtre final affiche exactement ces deux dossiers sur 401.
- Les autres correspondances de nom ou d’adresse e-mail n’ont pas été reclassées pendant cette validation ciblée.
- Les changements de code restent locaux, sans commit ni déploiement à ce stade. L’exclusion des futurs événements sur le serveur de production nécessite leur déploiement ; les événements GA4 passés restent inchangés.

## Extension du classement après confirmation explicite

L’utilisateur a ensuite confirmé que toutes les demandes Hachour / Amar Hachour et toutes celles associées à son adresse manager sont des tests. Classement effectué depuis l’interface CRM : 11 demandes Hachour et 19 demandes de l’adresse confirmée, soit 30 tests au total (28 marquages supplémentaires). Les recherches combinées au filtre « Hors tests identifiés » ne retournent plus aucune demande pour chacun de ces deux critères. Après réinitialisation de la recherche, « Tests identifiés uniquement » affiche 30 / 401. Aucun dossier supprimé ni statut commercial modifié ; aucune modification rétroactive de GA4. Code toujours non déployé à ce stade.

## Sources officielles

Validation initiale des lots 1 et 2 : 39 tests réussis, `tsc --noEmit` réussi, `next build` terminé avec 193 pages générées. Avertissements de dépendances Genkit/OpenTelemetry/Handlebars pendant le build ; pas d’échec. Le test supplémentaire de lecture sans écriture et la validation réelle de connexion/interface ont été effectués ensuite, comme indiqué ci-dessus.

- https://firebase.google.com/docs/auth/admin/verify-id-tokens : validation serveur des jetons Firebase.

- https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events : le protocole de collecte ne retourne pas nécessairement d'erreur HTTP pour un événement malformé ; utiliser le serveur de validation, dont les événements n'apparaissent pas dans les rapports.
- https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events : identifiants, envoi des événements et limites temporelles du rapprochement avec les événements navigateur.
