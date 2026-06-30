import type { Metadata } from "next";

const BASE_URL = "https://demenagementduvexin.fr";

export type OiseLocationKind = "department" | "city";

export type OiseLocationId =
  | "oise"
  | "beauvais"
  | "compiegne"
  | "creil"
  | "nogent-sur-oise"
  | "senlis"
  | "crepy-en-valois"
  | "montataire"
  | "meru"
  | "noyon"
  | "pont-sainte-maxence"
  | "chantilly"
  | "clermont"
  | "chambly"
  | "lamorlaye"
  | "gouvieux";

export type OiseFaq = {
  question: string;
  answer: string;
};

export type OiseLocation = {
  id: OiseLocationId;
  kind: OiseLocationKind;
  name: string;
  route: string;
  postalCode?: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroLead: string;
  introTitle: string;
  intro: string[];
  localProof: string;
  accessTitle: string;
  accessPoints: string[];
  conversionTitle: string;
  conversionText: string;
  nearby: OiseLocationId[];
  faqs: OiseFaq[];
};

const commonFaqs = {
  quote: {
    question: "Comment obtenir un devis de déménagement dans l'Oise ?",
    answer:
      "Vous pouvez demander un devis en ligne en quelques minutes. Nous analysons le volume, les accès, la distance, les contraintes de stationnement et la formule souhaitée afin de vous transmettre une estimation claire, personnalisée et exploitable sous 24h ouvrées.",
  },
  parking: {
    question: "Pouvez-vous gérer les accès et le stationnement ?",
    answer:
      "Oui. Lorsque le contexte l'exige, nous anticipons les autorisations de stationnement, les zones de livraison, les rues étroites, les étages sans ascenseur et l'usage éventuel d'un monte-meubles pour sécuriser l'intervention.",
  },
  services: {
    question: "Intervenez-vous pour les particuliers et les entreprises ?",
    answer:
      "Oui. Nos équipes prennent en charge les déménagements de logements, maisons, appartements, bureaux, archives, mobilier professionnel et petits volumes, avec une formule ajustée au niveau d'accompagnement souhaité.",
  },
};

export const OISE_LOCATIONS: OiseLocation[] = [
  {
    id: "oise",
    kind: "department",
    name: "Oise",
    route: "/demenagement-oise-60",
    postalCode: "60",
    title: "Déménagement Oise (60) | Déménageur local, devis gratuit en 24h",
    description:
      "Déménagement du Vexin accompagne particuliers et entreprises dans l'Oise (60) : Beauvais, Compiègne, Creil, Senlis, Chantilly, Méru, Noyon et tout le département. Devis gratuit en 24h.",
    eyebrow: "Département 60",
    h1: "Déménagement dans l'Oise (60)",
    heroLead:
      "Une organisation locale et fiable pour déménager dans l'Oise, entre Beauvaisis, Compiégnois, Creillois, Valois, Clermontois et sud de l'Oise.",
    introTitle: "Un département stratégique entre Hauts-de-France et Île-de-France",
    intro: [
      "L'Oise concentre des profils de déménagement très différents : appartements en centre-ville à Beauvais ou Compiègne, maisons familiales autour de Senlis et Chantilly, logements collectifs dans le bassin creillois, pavillons du Pays de Valois, résidences proches des gares et mutations professionnelles vers Paris.",
      "Cette diversité impose une vraie préparation : étude des accès, choix du camion, protection des parties communes, créneau de stationnement, gestion des volumes et anticipation des trajets sur l'A1, l'A16, la N31, la D1016 ou les axes de la vallée de l'Oise.",
    ],
    localProof:
      "Nous construisons chaque intervention comme une opération locale : visite ou analyse technique, protection adaptée au bâti, équipe salariée, planning clair et interlocuteur unique jusqu'à la livraison.",
    accessTitle: "Nos priorités logistiques dans le 60",
    accessPoints: [
      "Centres anciens : rues étroites, stationnement à réserver, portage maîtrisé.",
      "Résidences et copropriétés : ascenseurs, protections, horaires autorisés.",
      "Maisons et pavillons : accès camion, allées, portails, jardins, volumes lourds.",
      "Entreprises : transfert de bureaux, archives, informatique, intervention en horaires adaptés.",
    ],
    conversionTitle: "Un devis Oise conçu pour décider vite",
    conversionText:
      "Votre devis précise la formule, les moyens humains, le volume, les protections prévues et les options utiles : monte-meubles, emballage du fragile, démontage, garde-meubles ou groupage longue distance.",
    nearby: [
      "beauvais",
      "compiegne",
      "creil",
      "senlis",
      "chantilly",
      "meru",
      "noyon",
      "clermont",
    ],
    faqs: [
      commonFaqs.quote,
      commonFaqs.parking,
      {
        question: "Quelles villes de l'Oise couvrez-vous en priorité ?",
        answer:
          "Nous ciblons en priorité Beauvais, Compiègne, Creil, Nogent-sur-Oise, Senlis, Crépy-en-Valois, Montataire, Méru, Noyon, Pont-Sainte-Maxence, Chantilly, Clermont, Chambly, Lamorlaye et Gouvieux, tout en pouvant organiser un déménagement ailleurs dans le département.",
      },
      commonFaqs.services,
    ],
  },
  {
    id: "beauvais",
    kind: "city",
    name: "Beauvais",
    route: "/demenagement-beauvais-60000",
    postalCode: "60000",
    title: "Déménagement Beauvais (60000) | Déménageur Oise, devis gratuit",
    description:
      "Déménageur à Beauvais (60000) pour appartements, maisons et entreprises. Organisation locale, stationnement, protection du mobilier et devis gratuit en 24h.",
    eyebrow: "Préfecture de l'Oise",
    h1: "Déménagement à Beauvais",
    heroLead:
      "Une solution fiable pour déménager à Beauvais, du centre-ville aux quartiers Saint-Jean, Argentine, Voisinlieu, Marissel ou aux communes du Beauvaisis.",
    introTitle: "Beauvais demande une logistique souple et très préparée",
    intro: [
      "À Beauvais, un déménagement peut vite changer de nature selon le quartier : centre ancien autour de la cathédrale, immeubles collectifs, zones pavillonnaires, résidences récentes ou locaux professionnels du Beauvaisis.",
      "Nous adaptons l'équipe, le camion et les protections à vos contraintes : accès, étage, ascenseur, volume, fragiles, stationnement et trajet vers votre nouvelle adresse.",
    ],
    localProof:
      "Notre approche privilégie l'anticipation : repérage des accès, protection des parties communes, emballage du fragile et coordination précise du jour J.",
    accessTitle: "Points sensibles à Beauvais",
    accessPoints: [
      "Centre-ville : rues contraintes et zones de stationnement à anticiper.",
      "Quartiers résidentiels : accès camion, allées, portails, mobilier volumineux.",
      "Bureaux et commerces : transfert planifié pour limiter l'interruption d'activité.",
      "Départs longue distance : optimisation du chargement et des trajets depuis l'A16.",
    ],
    conversionTitle: "Un devis clair pour Beauvais",
    conversionText:
      "Nous dimensionnons votre devis selon le volume réel, les accès et la formule choisie : économique, standard, confort ou prise en charge complète.",
    nearby: ["meru", "clermont", "compiegne", "creil"],
    faqs: [
      commonFaqs.quote,
      commonFaqs.parking,
      {
        question: "Faut-il prévoir un monte-meubles à Beauvais ?",
        answer:
          "Il est utile lorsque l'escalier est étroit, que l'ascenseur est absent ou que certains meubles ne passent pas par les accès intérieurs. Nous l'évaluons dès l'analyse technique.",
      },
      commonFaqs.services,
    ],
  },
  {
    id: "compiegne",
    kind: "city",
    name: "Compiègne",
    route: "/demenagement-compiegne-60200",
    postalCode: "60200",
    title: "Déménagement Compiègne (60200) | Particuliers, bureaux, devis 24h",
    description:
      "Déménageur à Compiègne (60200) : centre historique, résidences, maisons, entreprises, mutations et déménagements longue distance. Devis gratuit en 24h.",
    eyebrow: "Compiégnois",
    h1: "Déménagement à Compiègne",
    heroLead:
      "Une organisation précise pour déménager à Compiègne, entre centre historique, quartiers résidentiels, forêt, gare, zones d'activités et communes voisines.",
    introTitle: "Une ville patrimoniale où l'accès se prépare",
    intro: [
      "Compiègne combine habitat ancien, appartements en étage, maisons familiales, résidences proches de la gare et bureaux. Le succès du déménagement repose sur l'anticipation du stationnement, des horaires et des circulations.",
      "Nous accompagnons les familles, les actifs en mutation et les entreprises avec une méthode simple : évaluer les accès, protéger les biens, charger proprement, livrer au bon endroit et au bon rythme.",
    ],
    localProof:
      "Notre équipe prépare les interventions autour de Compiègne, Margny-lès-Compiègne, Venette, Jaux et les communes du Compiégnois.",
    accessTitle: "Contraintes fréquentes à Compiègne",
    accessPoints: [
      "Centre historique : rues étroites et stationnement à réserver.",
      "Gare et résidences : ascenseurs, parties communes et créneaux d'accès.",
      "Maisons : accès jardin, caves, greniers et mobilier lourd.",
      "Entreprises : transfert d'archives, mobilier et postes informatiques.",
    ],
    conversionTitle: "Une estimation détaillée avant le jour J",
    conversionText:
      "Nous clarifions le volume, les moyens nécessaires, les protections et les options utiles afin de sécuriser votre budget avant validation.",
    nearby: ["noyon", "pont-sainte-maxence", "crepy-en-valois", "beauvais"],
    faqs: [
      commonFaqs.quote,
      commonFaqs.parking,
      {
        question: "Intervenez-vous autour de Compiègne ?",
        answer:
          "Oui, nous couvrons Compiègne et les communes proches comme Margny-lès-Compiègne, Venette, Jaux, Choisy-au-Bac et les secteurs résidentiels du Compiégnois.",
      },
      commonFaqs.services,
    ],
  },
  {
    id: "creil",
    kind: "city",
    name: "Creil",
    route: "/demenagement-creil-60100",
    postalCode: "60100",
    title: "Déménagement Creil (60100) | Déménageur Creil Sud Oise",
    description:
      "Déménageur à Creil (60100) : appartements, maisons, bureaux, monte-meubles, accès urbains et devis gratuit sous 24h dans Creil Sud Oise.",
    eyebrow: "Bassin creillois",
    h1: "Déménagement à Creil",
    heroLead:
      "Un déménagement maîtrisé dans un secteur dense : résidences, stationnement, étages, bords de l'Oise, centre-ville et zones d'activités.",
    introTitle: "À Creil, la logistique urbaine fait la différence",
    intro: [
      "Creil concentre des accès variés : immeubles collectifs, appartements en étage, rues fréquentées, copropriétés, locaux professionnels et quartiers résidentiels proches de Nogent-sur-Oise, Montataire ou Saint-Maximin.",
      "Nous préparons chaque intervention pour limiter le portage inutile, protéger les parties communes et fluidifier le chargement même lorsque le stationnement est complexe.",
    ],
    localProof:
      "Notre méthode est adaptée aux environnements urbains : repérage, protection, équipe dimensionnée et possibilité de monte-meubles si l'accès intérieur n'est pas optimal.",
    accessTitle: "Points sensibles à Creil",
    accessPoints: [
      "Immeubles : ascenseur, escalier, couloirs, caves et local encombrants.",
      "Rues denses : stationnement et sécurité du camion.",
      "Bords de l'Oise : accès, ponts, horaires et circulation.",
      "Zones professionnelles : transfert rapide de mobilier et archives.",
    ],
    conversionTitle: "Un devis pensé pour les accès difficiles",
    conversionText:
      "Votre devis prend en compte la manutention réelle : étage, distance de portage, volume, fragiles et moyens techniques nécessaires.",
    nearby: ["nogent-sur-oise", "montataire", "chantilly", "senlis"],
    faqs: [
      commonFaqs.quote,
      {
        question: "Pouvez-vous déménager un appartement sans ascenseur à Creil ?",
        answer:
          "Oui. Nous évaluons l'escalier, le nombre d'étages, les meubles volumineux et l'intérêt d'un monte-meubles pour sécuriser et accélérer l'intervention.",
      },
      commonFaqs.parking,
      commonFaqs.services,
    ],
  },
  {
    id: "nogent-sur-oise",
    kind: "city",
    name: "Nogent-sur-Oise",
    route: "/demenagement-nogent-sur-oise-60180",
    postalCode: "60180",
    title: "Déménagement Nogent-sur-Oise (60180) | Devis gratuit 24h",
    description:
      "Déménageur à Nogent-sur-Oise (60180), dans Creil Sud Oise : appartements, maisons, bureaux, protection mobilier et devis gratuit.",
    eyebrow: "Creil Sud Oise",
    h1: "Déménagement à Nogent-sur-Oise",
    heroLead:
      "Une organisation locale pour déménager à Nogent-sur-Oise, entre quartiers résidentiels, immeubles, maisons familiales et proximité immédiate de Creil.",
    introTitle: "Une commune résidentielle où chaque accès compte",
    intro: [
      "Nogent-sur-Oise alterne logements collectifs, rues pavillonnaires et proximité avec les grands axes du bassin creillois. Un bon déménagement repose sur la coordination du stationnement, des volumes et des horaires.",
      "Nous anticipons les parties communes, les cages d'escalier, les accès camion et les besoins de protection pour garantir une manutention propre.",
    ],
    localProof:
      "La proximité avec Creil, Montataire et Villers-Saint-Paul permet d'organiser des interventions rapides et bien calibrées.",
    accessTitle: "À prévoir à Nogent-sur-Oise",
    accessPoints: [
      "Copropriétés : protections et créneaux de passage.",
      "Maisons : accès allée, garage, cave, mobilier lourd.",
      "Stationnement : réservation utile selon rue et distance de portage.",
      "Trajets régionaux : coordination vers Paris, Val-d'Oise, Somme ou Aisne.",
    ],
    conversionTitle: "Un devis sans zone floue",
    conversionText:
      "Nous détaillons les moyens prévus, la formule, les protections et les conditions d'accès pour éviter les mauvaises surprises le jour J.",
    nearby: ["creil", "montataire", "pont-sainte-maxence", "chantilly"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "senlis",
    kind: "city",
    name: "Senlis",
    route: "/demenagement-senlis-60300",
    postalCode: "60300",
    title: "Déménagement Senlis (60300) | Centre ancien, maisons, devis 24h",
    description:
      "Déménageur à Senlis (60300) : centre médiéval, maisons, appartements, mobilier fragile, accès difficiles et devis gratuit sous 24h.",
    eyebrow: "Sud de l'Oise",
    h1: "Déménagement à Senlis",
    heroLead:
      "Une prestation soignée pour déménager à Senlis, avec une attention particulière aux accès du centre historique et aux biens de valeur.",
    introTitle: "Senlis exige soin, discrétion et précision",
    intro: [
      "Le centre historique de Senlis impose une vraie préparation : rues anciennes, stationnement limité, bâti sensible et portage parfois technique. Les quartiers résidentiels demandent aussi une protection rigoureuse des sols, escaliers et extérieurs.",
      "Nos équipes adaptent les emballages, le camion et la manutention au niveau d'exigence du logement, qu'il s'agisse d'un appartement, d'une maison familiale ou d'un transfert professionnel.",
    ],
    localProof:
      "Nous intervenons dans le sud de l'Oise avec une logique premium : anticipation, protection renforcée, équipe stable et planning maîtrisé.",
    accessTitle: "Points sensibles à Senlis",
    accessPoints: [
      "Centre médiéval : accès étroits et stationnement à prévoir.",
      "Maisons anciennes : sols, murs, escaliers et mobilier fragile.",
      "Objets de valeur : emballage renforcé et manutention dédiée.",
      "A1 et trajets IDF : organisation efficace pour les mutations.",
    ],
    conversionTitle: "Un devis calibré pour un déménagement soigné",
    conversionText:
      "Nous intégrons les besoins de protection, les contraintes de voirie et le niveau de service attendu pour vous proposer une solution fiable.",
    nearby: ["chantilly", "creil", "pont-sainte-maxence", "lamorlaye"],
    faqs: [
      commonFaqs.quote,
      {
        question: "Le centre ancien de Senlis pose-t-il un problème ?",
        answer:
          "Non, mais il doit être anticipé. Nous évaluons l'accès camion, le portage, les protections et les autorisations utiles avant de confirmer le dispositif.",
      },
      commonFaqs.parking,
      commonFaqs.services,
    ],
  },
  {
    id: "crepy-en-valois",
    kind: "city",
    name: "Crépy-en-Valois",
    route: "/demenagement-crepy-en-valois-60800",
    postalCode: "60800",
    title: "Déménagement Crépy-en-Valois (60800) | Pays de Valois",
    description:
      "Déménageur à Crépy-en-Valois (60800) : maisons, appartements, départs vers l'Île-de-France ou l'Oise, devis gratuit sous 24h.",
    eyebrow: "Pays de Valois",
    h1: "Déménagement à Crépy-en-Valois",
    heroLead:
      "Une solution locale pour déménager à Crépy-en-Valois, dans le Pays de Valois, entre maisons familiales, centre ancien et trajets vers l'Île-de-France.",
    introTitle: "Un secteur idéal pour une logistique bien préparée",
    intro: [
      "Crépy-en-Valois attire des familles, actifs et entreprises qui recherchent une localisation connectée à l'Oise, à l'Aisne et à l'Île-de-France. Les volumes sont souvent familiaux, avec caves, garages et mobilier complet.",
      "Nous préparons les accès, les protections et le chargement afin de réduire la durée d'intervention et sécuriser le transport.",
    ],
    localProof:
      "Notre maillage Oise permet de relier Crépy-en-Valois à Compiègne, Senlis, Nanteuil-le-Haudouin, Paris ou aux communes du Valois.",
    accessTitle: "À anticiper à Crépy-en-Valois",
    accessPoints: [
      "Maisons familiales : volume, garage, extérieur et mobilier lourd.",
      "Centre ancien : stationnement, rues plus étroites, portage.",
      "Trajets IDF : optimisation du chargement et des horaires.",
      "Entreprises locales : transfert de mobilier et archives.",
    ],
    conversionTitle: "Un devis précis pour votre volume réel",
    conversionText:
      "Nous évaluons votre inventaire, vos contraintes de départ et d'arrivée, puis nous proposons une formule adaptée à votre budget.",
    nearby: ["compiegne", "senlis", "pont-sainte-maxence", "noyon"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "montataire",
    kind: "city",
    name: "Montataire",
    route: "/demenagement-montataire-60160",
    postalCode: "60160",
    title: "Déménagement Montataire (60160) | Bassin creillois, devis gratuit",
    description:
      "Déménageur à Montataire (60160) : appartements, maisons, zones d'activités, transfert professionnel et devis gratuit sous 24h.",
    eyebrow: "Creil Sud Oise",
    h1: "Déménagement à Montataire",
    heroLead:
      "Une organisation efficace pour déménager à Montataire, entre logements collectifs, maisons, zones d'activités et proximité de Creil.",
    introTitle: "Une logistique adaptée au bassin industriel et résidentiel",
    intro: [
      "Montataire combine résidences, quartiers pavillonnaires et activité économique. Cette diversité impose de bien anticiper les accès, les horaires et la nature des biens à transporter.",
      "Nos équipes prennent en charge les déménagements de logements et les transferts professionnels avec la même rigueur : protection, inventaire, chargement et livraison contrôlée.",
    ],
    localProof:
      "La proximité avec Creil, Nogent-sur-Oise et Saint-Maximin permet des interventions rapides et bien coordonnées.",
    accessTitle: "Contraintes courantes à Montataire",
    accessPoints: [
      "Logements collectifs : escaliers, ascenseurs, caves, parties communes.",
      "Maisons : accès camion, portage, mobilier lourd.",
      "Professionnels : archives, mobilier, équipements sensibles.",
      "Axes du bassin creillois : horaires et circulation à optimiser.",
    ],
    conversionTitle: "Un devis ajusté à la réalité terrain",
    conversionText:
      "Nous précisons le volume, les accès, le nombre de déménageurs et les protections incluses pour cadrer le budget avant validation.",
    nearby: ["creil", "nogent-sur-oise", "chantilly", "senlis"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "meru",
    kind: "city",
    name: "Méru",
    route: "/demenagement-meru-60110",
    postalCode: "60110",
    title: "Déménagement Méru (60110) | Déménageur Oise, devis 24h",
    description:
      "Déménageur à Méru (60110) : maisons, appartements, mutations vers Paris, accès A16, emballage, protection et devis gratuit en 24h.",
    eyebrow: "Pays des Sablons",
    h1: "Déménagement à Méru",
    heroLead:
      "Une solution pratique pour déménager à Méru, sur l'axe A16, entre Oise, Val-d'Oise et Île-de-France.",
    introTitle: "Méru, une ville de passage et d'installation familiale",
    intro: [
      "Méru est un secteur stratégique pour les familles et actifs qui cherchent un équilibre entre Oise et région parisienne. Les déménagements y concernent souvent maisons, appartements et changements professionnels.",
      "Nous adaptons l'organisation au volume, au stationnement, aux escaliers et au trajet, notamment pour les départs ou arrivées depuis le Val-d'Oise, Paris ou le Beauvaisis.",
    ],
    localProof:
      "Nous savons optimiser les tournées sur l'A16, le sud de l'Oise et les communes voisines du Pays des Sablons.",
    accessTitle: "À prévoir à Méru",
    accessPoints: [
      "Pavillons : accès, garage, cave, mobilier familial.",
      "Résidences : ascenseur, protections, créneaux d'intervention.",
      "Trajets vers l'IDF : horaires et temps de route.",
      "Petits volumes : solution adaptée et économique.",
    ],
    conversionTitle: "Un devis rapide et exploitable",
    conversionText:
      "Nous construisons une estimation claire pour comparer facilement les formules et réserver une date avec visibilité.",
    nearby: ["beauvais", "chambly", "lamorlaye", "creil"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "noyon",
    kind: "city",
    name: "Noyon",
    route: "/demenagement-noyon-60400",
    postalCode: "60400",
    title: "Déménagement Noyon (60400) | Déménageur Oise, devis gratuit",
    description:
      "Déménageur à Noyon (60400) : centre historique, maisons, appartements, départs longue distance et devis gratuit sous 24h.",
    eyebrow: "Pays Noyonnais",
    h1: "Déménagement à Noyon",
    heroLead:
      "Une prestation organisée pour déménager à Noyon, entre centre historique, quartiers résidentiels, villages proches et trajets vers Compiègne.",
    introTitle: "Noyon demande une préparation fine des accès",
    intro: [
      "Le centre historique, les rues autour de la cathédrale, les maisons anciennes et les quartiers résidentiels demandent une vraie vigilance sur le stationnement et les protections.",
      "Nous organisons votre déménagement en tenant compte du volume, des escaliers, des caves, des extérieurs et de la destination finale.",
    ],
    localProof:
      "Notre maillage dans l'Oise permet de relier Noyon à Compiègne, Chauny, Roye, l'Aisne ou l'Île-de-France selon votre projet.",
    accessTitle: "Points sensibles à Noyon",
    accessPoints: [
      "Centre ancien : stationnement et portage à anticiper.",
      "Maisons : mobilier complet, garage, cave, dépendances.",
      "Longue distance : chargement sécurisé et planning précis.",
      "Petits volumes : solution souple et économique.",
    ],
    conversionTitle: "Une estimation claire avant validation",
    conversionText:
      "Nous définissons les moyens nécessaires pour une prestation fiable, sans option inutile, mais avec les protections indispensables.",
    nearby: ["compiegne", "crepy-en-valois", "pont-sainte-maxence", "beauvais"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "pont-sainte-maxence",
    kind: "city",
    name: "Pont-Sainte-Maxence",
    route: "/demenagement-pont-sainte-maxence-60700",
    postalCode: "60700",
    title: "Déménagement Pont-Sainte-Maxence (60700) | Devis gratuit",
    description:
      "Déménageur à Pont-Sainte-Maxence (60700), vallée de l'Oise : maisons, appartements, accès, monte-meubles et devis gratuit sous 24h.",
    eyebrow: "Vallée de l'Oise",
    h1: "Déménagement à Pont-Sainte-Maxence",
    heroLead:
      "Une logistique maîtrisée dans la vallée de l'Oise, entre ponts, gare, maisons familiales et proximité de Senlis, Creil et Compiègne.",
    introTitle: "Un secteur où les trajets et accès comptent",
    intro: [
      "Pont-Sainte-Maxence est un point de passage important entre le sud de l'Oise et le Compiégnois. Les interventions demandent d'anticiper les franchissements, le stationnement et les horaires de circulation.",
      "Nous préparons votre déménagement selon votre logement : appartement, maison, résidence proche gare, local professionnel ou départ longue distance.",
    ],
    localProof:
      "Notre organisation couvre Pont-Sainte-Maxence, Les Ageux, Brenouille, Verneuil-en-Halatte et les communes proches.",
    accessTitle: "À anticiper à Pont-Sainte-Maxence",
    accessPoints: [
      "Vallée de l'Oise : circulation et horaires de passage.",
      "Maisons : accès camion, mobilier lourd, jardin.",
      "Résidences : protection des parties communes.",
      "Trajets régionaux : Senlis, Creil, Compiègne, Paris.",
    ],
    conversionTitle: "Un devis adapté à votre trajet",
    conversionText:
      "Nous prenons en compte le point de départ, l'arrivée, les accès et la formule pour construire un prix cohérent.",
    nearby: ["senlis", "creil", "compiegne", "chantilly"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "chantilly",
    kind: "city",
    name: "Chantilly",
    route: "/demenagement-chantilly-60500",
    postalCode: "60500",
    title: "Déménagement Chantilly (60500) | Mobilier fragile, devis premium",
    description:
      "Déménageur à Chantilly (60500) : maisons, appartements, objets fragiles, mobilier de valeur, accès soignés et devis gratuit en 24h.",
    eyebrow: "Aire cantilienne",
    h1: "Déménagement à Chantilly",
    heroLead:
      "Une prestation soignée pour déménager à Chantilly, avec une attention particulière au mobilier fragile, aux biens de valeur et aux accès résidentiels.",
    introTitle: "Chantilly appelle une approche hautement soignée",
    intro: [
      "Entre patrimoine, appartements de centre-ville, maisons familiales et propriétés résidentielles, Chantilly demande une manutention précise, discrète et protectrice.",
      "Nous renforçons les emballages, adaptons les moyens humains et sécurisons les accès pour protéger le mobilier, les oeuvres, les miroirs, les luminaires et les objets délicats.",
    ],
    localProof:
      "Nous intervenons dans l'aire cantilienne avec une logique de service premium et une préparation très détaillée.",
    accessTitle: "Points sensibles à Chantilly",
    accessPoints: [
      "Mobilier de valeur : emballage renforcé et manutention dédiée.",
      "Centre-ville : stationnement, portage, horaires.",
      "Maisons : sols, escaliers, extérieurs, objets lourds.",
      "Trajets IDF : coordination depuis ou vers Paris et Val-d'Oise.",
    ],
    conversionTitle: "Un devis qui valorise la protection",
    conversionText:
      "Nous intégrons les protections indispensables et les options utiles pour éviter les risques, pas seulement pour déplacer vite.",
    nearby: ["lamorlaye", "gouvieux", "senlis", "creil"],
    faqs: [
      commonFaqs.quote,
      {
        question: "Prenez-vous en charge les objets fragiles à Chantilly ?",
        answer:
          "Oui. Nous proposons l'emballage du fragile, les protections renforcées et une manutention dédiée pour tableaux, miroirs, luminaires, vaisselle, mobilier ancien ou objets de valeur.",
      },
      commonFaqs.parking,
      commonFaqs.services,
    ],
  },
  {
    id: "clermont",
    kind: "city",
    name: "Clermont",
    route: "/demenagement-clermont-60600",
    postalCode: "60600",
    title: "Déménagement Clermont (60600) | Clermontois, devis 24h",
    description:
      "Déménageur à Clermont (60600), dans l'Oise : maisons, appartements, accès vallonnés, protection mobilier et devis gratuit.",
    eyebrow: "Clermontois",
    h1: "Déménagement à Clermont",
    heroLead:
      "Une organisation locale pour déménager à Clermont, entre centre vallonné, gare, maisons familiales et communes du Clermontois.",
    introTitle: "Clermont demande une bonne lecture du terrain",
    intro: [
      "À Clermont, les accès peuvent varier fortement selon les rues, les dénivelés, les stationnements possibles et la configuration des maisons ou appartements.",
      "Nous construisons l'intervention autour de ces contraintes : choix du véhicule, portage, protections, équipe dimensionnée et planning réaliste.",
    ],
    localProof:
      "Notre approche couvre Clermont et le Clermontois avec une préparation simple, claire et orientée sécurité.",
    accessTitle: "À anticiper à Clermont",
    accessPoints: [
      "Rues vallonnées : stationnement et distances de portage.",
      "Maisons : cave, garage, combles, mobilier volumineux.",
      "Résidences : protection des parties communes.",
      "Gare et mutations : trajets vers Beauvais, Creil, Paris.",
    ],
    conversionTitle: "Un devis stable et lisible",
    conversionText:
      "Nous détaillons la formule, le volume, les moyens techniques et les protections pour vous permettre d'arbitrer sereinement.",
    nearby: ["beauvais", "creil", "pont-sainte-maxence", "meru"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "chambly",
    kind: "city",
    name: "Chambly",
    route: "/demenagement-chambly-60230",
    postalCode: "60230",
    title: "Déménagement Chambly (60230) | Sud Oise, Val-d'Oise, devis 24h",
    description:
      "Déménageur à Chambly (60230) : sud de l'Oise, accès A16, maisons, appartements, départs vers Val-d'Oise ou Paris. Devis gratuit.",
    eyebrow: "Sud de l'Oise",
    h1: "Déménagement à Chambly",
    heroLead:
      "Une solution efficace pour déménager à Chambly, ville charnière entre Oise, Val-d'Oise et Île-de-France.",
    introTitle: "Chambly, un secteur stratégique pour les actifs mobiles",
    intro: [
      "Chambly bénéficie d'une position très recherchée : proximité de l'A16, du Val-d'Oise, de Paris et des communes résidentielles du sud de l'Oise.",
      "Les projets concernent souvent des maisons familiales, appartements, mutations professionnelles ou départs longue distance nécessitant un planning précis.",
    ],
    localProof:
      "Nous savons optimiser les trajets entre Chambly, Méru, Persan, L'Isle-Adam, Beauvais et Paris.",
    accessTitle: "À prévoir à Chambly",
    accessPoints: [
      "Maisons familiales : volume complet et mobilier lourd.",
      "Accès A16 : horaires de circulation à optimiser.",
      "Déménagements vers IDF : coordination fine du trajet.",
      "Petits volumes : formules souples et rapides.",
    ],
    conversionTitle: "Un devis pensé pour le sud Oise",
    conversionText:
      "Nous intégrons les distances réelles, les accès et votre niveau d'accompagnement pour une estimation fiable.",
    nearby: ["meru", "lamorlaye", "beauvais", "chantilly"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "lamorlaye",
    kind: "city",
    name: "Lamorlaye",
    route: "/demenagement-lamorlaye-60260",
    postalCode: "60260",
    title: "Déménagement Lamorlaye (60260) | Service soigné, devis 24h",
    description:
      "Déménageur à Lamorlaye (60260) : maisons, propriétés, mobilier fragile, objets de valeur, transfert vers Paris ou Oise. Devis gratuit.",
    eyebrow: "Aire cantilienne",
    h1: "Déménagement à Lamorlaye",
    heroLead:
      "Une prestation soignée pour déménager à Lamorlaye, avec une attention particulière aux maisons, propriétés et biens fragiles.",
    introTitle: "Lamorlaye demande une organisation premium",
    intro: [
      "Lamorlaye présente souvent des volumes familiaux importants, des accès de propriété, du mobilier de qualité et des objets fragiles qui exigent une manutention experte.",
      "Nous préparons le chargement, les protections et l'équipe pour travailler proprement, limiter les risques et respecter les lieux.",
    ],
    localProof:
      "Notre logique d'intervention privilégie le soin : emballage, protection des sols, manutention contrôlée et planning confortable.",
    accessTitle: "À anticiper à Lamorlaye",
    accessPoints: [
      "Propriétés : accès portail, allée, stationnement camion.",
      "Mobilier fragile : emballage renforcé, couvertures, housses.",
      "Objets lourds : pianos, bibliothèques, armoires, électroménager.",
      "Trajets IDF/Oise : coordination des horaires.",
    ],
    conversionTitle: "Un devis orienté protection",
    conversionText:
      "Nous chiffrons la prestation selon le niveau de soin requis, la formule choisie et les protections nécessaires.",
    nearby: ["chantilly", "gouvieux", "senlis", "chambly"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
  {
    id: "gouvieux",
    kind: "city",
    name: "Gouvieux",
    route: "/demenagement-gouvieux-60270",
    postalCode: "60270",
    title: "Déménagement Gouvieux (60270) | Aire cantilienne, devis gratuit",
    description:
      "Déménageur à Gouvieux (60270) : maisons, appartements, mobilier fragile, accès résidentiels et devis gratuit sous 24h.",
    eyebrow: "Aire cantilienne",
    h1: "Déménagement à Gouvieux",
    heroLead:
      "Une organisation soignée pour déménager à Gouvieux, entre cadre résidentiel, proximité de Chantilly et accès vers l'Île-de-France.",
    introTitle: "Gouvieux privilégie le soin et l'anticipation",
    intro: [
      "À Gouvieux, les projets concernent souvent des maisons, appartements familiaux, biens fragiles et trajets vers Paris, le Val-d'Oise ou d'autres communes de l'Oise.",
      "Nous adaptons les protections, le véhicule et l'équipe à la configuration du logement pour garantir une intervention propre et efficace.",
    ],
    localProof:
      "Notre proximité avec Chantilly, Lamorlaye, Senlis et Creil facilite la préparation de vos trajets locaux ou longue distance.",
    accessTitle: "À prévoir à Gouvieux",
    accessPoints: [
      "Maisons : accès, extérieurs, mobilier familial.",
      "Objets fragiles : emballage et manutention renforcés.",
      "Résidences : parties communes et horaires.",
      "Trajets vers Paris : planning et optimisation du chargement.",
    ],
    conversionTitle: "Un devis simple, précis et rassurant",
    conversionText:
      "Nous clarifions les moyens, la formule, les protections et le planning pour une décision rapide.",
    nearby: ["chantilly", "lamorlaye", "senlis", "creil"],
    faqs: [commonFaqs.quote, commonFaqs.parking, commonFaqs.services],
  },
];

export const OISE_LOCATION_BY_ID = Object.fromEntries(
  OISE_LOCATIONS.map((location) => [location.id, location])
) as Record<OiseLocationId, OiseLocation>;

export const OISE_DEPARTMENT_LOCATION = OISE_LOCATION_BY_ID.oise;

export const OISE_CITY_LOCATIONS = OISE_LOCATIONS.filter(
  (location) => location.kind === "city"
);

export const OISE_LOCATION_ROUTES = OISE_LOCATIONS.map((location) => location.route);

export function getOiseLocation(id: OiseLocationId): OiseLocation {
  return OISE_LOCATION_BY_ID[id];
}

export function getOiseMetadata(id: OiseLocationId): Metadata {
  const location = getOiseLocation(id);

  return {
    title: location.title,
    description: location.description,
    alternates: {
      canonical: `${BASE_URL}${location.route}`,
    },
    openGraph: {
      title: location.title,
      description: location.description,
      url: `${BASE_URL}${location.route}`,
      type: "website",
    },
  };
}

export function getOiseNearbyLocations(location: OiseLocation): OiseLocation[] {
  return location.nearby.map((id) => getOiseLocation(id));
}
