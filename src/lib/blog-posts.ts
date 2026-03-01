
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
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800',
    aiHint: 'person moving boxes',
    link: '/blog/5-astuces-pour-un-demenagement-sans-stress',
    date: '2026-03-01',
    category: 'Organisation',
    readingTime: 8
  },
  {
    id: '2',
    title: 'Comment choisir la bonne formule de déménagement ?',
    description: 'Économique, Standard ou Confort ? Chaque formule a ses avantages. Nous vous aidons à choisir celle qui correspond le mieux à vos besoins et votre budget.',
    imageUrl: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1581578731522-aa069009cf01?q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798ccc1380?q=80&w=800',
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
    imageUrl: 'https://picsum.photos/seed/blog-pack/800/500',
    aiHint: 'boxes packing',
    link: '/blog/checklist-demenagement',
    date: '2026-03-01',
    category: 'Checklist',
    readingTime: 10
  },
];
