
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  link: string;
  date: string;
  category: string;
  readingTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 astuces pour un déménagement sans stress',
    description: 'Le jour J approche ? Découvrez nos conseils de pro pour une organisation parfaite et une journée sans accroc. De la gestion des cartons à la coordination le jour même.',
    imageUrl: '/images/blog/preparation-cartons-demenagement.webp',
    aiHint: 'boxes packing',
    link: '/blog/5-astuces-pour-un-demenagement-sans-stress',
    date: '2026-03-01',
    category: 'Organisation',
    readingTime: 8
  },
  {
    id: '2',
    title: 'Comment choisir la bonne formule de déménagement ?',
    description: 'Économique, Standard ou Confort ? Chaque formule a ses avantages. Nous vous aidons à choisir celle qui correspond le mieux à vos besoins et votre budget.',
    imageUrl: '/images/blog/formules-demenagement.webp',
    aiHint: 'moving boxes',
    link: '/blog/comment-choisir-la-bonne-formule-de-demenagement',
    date: '2026-03-01',
    category: 'Conseils',
    readingTime: 7
  },
  {
    id: '3',
    title: 'Le guide ultime pour emballer vos objets fragiles',
    description: 'La vaisselle, les miroirs, les œuvres d\'art... l\'emballage des objets fragiles est une source de stress. Suivez notre guide pas à pas pour protéger vos biens.',
    imageUrl: '/images/blog/emballage-objets-fragiles.webp',
    aiHint: 'fragile packing',
    link: '/blog/le-guide-ultime-pour-emballer-vos-objets-fragiles',
    date: '2026-03-01',
    category: 'Protection',
    readingTime: 9
  },
  {
    id: '4',
    title: 'Déménager avec des enfants : nos conseils pour une transition en douceur',
    description: 'Impliquer les enfants dans le déménagement peut transformer une expérience stressante en une aventure familiale. Découvrez nos astuces pour les préparer.',
    imageUrl: '/images/blog/demenagement-avec-enfants.webp',
    aiHint: 'happy kids',
    link: '/blog/demenager-avec-des-enfants-nos-conseils-pour-une-transition-en-douceur',
    date: '2026-03-01',
    category: 'Famille',
    readingTime: 8
  },
  {
    id: '5',
    title: 'Déménagement sans ascenseur : comment éviter la galère ?',
    description: '5ème étage sans ascenseur ? Découvrez comment réussir votre déménagement en étage élevé : portage sécurisé, monte-meubles et calcul du coût.',
    imageUrl: '/images/blog/demenageurs-du-vexin.webp',
    aiHint: 'moving team',
    link: '/blog/demenagement-sans-ascenseur',
    date: '2026-03-01',
    category: 'Logistique',
    readingTime: 8
  },
  {
    id: '6',
    title: 'Checklist déménagement : la liste complète',
    description: 'La checklist déménagement la plus simple : quoi faire 30 jours, 7 jours, 48h avant et le jour J. Démarches, cartons, accès et kit de survie.',
    imageUrl: '/images/blog/demenagement-planification.webp',
    aiHint: 'calendar plan',
    link: '/blog/checklist-demenagement',
    date: '2026-03-01',
    category: 'Checklist',
    readingTime: 10
  },
];
