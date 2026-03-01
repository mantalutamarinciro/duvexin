export interface BlogPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 astuces pour un déménagement sans stress',
    description: 'Le jour J approche ? Découvrez nos conseils de pro pour une organisation parfaite et une journée sans accroc. De la gestion des cartons à la coordination le jour même, devenez un expert du déménagement.',
    imageUrl: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=800',
    aiHint: 'person moving boxes',
    link: '/blog/5-astuces-pour-un-demenagement-sans-stress',
  },
  {
    id: '2',
    title: 'Comment choisir la bonne formule de déménagement ?',
    description: 'Économique, Standard ou Confort ? Chaque formule a ses avantages. Nous vous aidons à choisir celle qui correspond le mieux à vos besoins, votre budget et votre niveau d\'implication souhaité.',
    imageUrl: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=800',
    aiHint: 'moving boxes',
    link: '/blog/comment-choisir-la-bonne-formule-de-demenagement',
  },
  {
    id: '3',
    title: 'Le guide ultime pour emballer vos objets fragiles',
    description: 'La vaisselle, les miroirs, les œuvres d\'art... l\'emballage des objets fragiles est une source de stress. Suivez notre guide pas à pas pour protéger vos biens les plus précieux comme un professionnel.',
    imageUrl: 'https://images.unsplash.com/photo-1581578731522-aa069009cf01?q=80&w=800',
    aiHint: 'fragile packing',
    link: '/blog/le-guide-ultime-pour-emballer-vos-objets-fragiles',
  },
  {
    id: '4',
    title: 'Déménager avec des enfants : nos conseils pour une transition en douceur',
    description: 'Impliquer les enfants dans le déménagement peut transformer une expérience stressante en une aventure familiale. Découvrez nos astuces pour les préparer et les aider à s\'adapter à leur nouvel environnement.',
    imageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800',
    aiHint: 'happy kids',
    link: '/blog/demenager-avec-des-enfants-nos-conseils-pour-une-transition-en-douceur',
  },
  {
    id: '5',
    title: 'Déménagement sans ascenseur : comment éviter la galère ?',
    description: '5ème étage sans ascenseur ? Découvrez comment réussir votre déménagement en étage élevé : portage sécurisé, monte-meubles, calcul du coût et erreurs à éviter.',
    imageUrl: 'https://images.unsplash.com/photo-1512418490979-92798ccc1380?q=80&w=800',
    aiHint: 'moving team',
    link: '/blog/demenagement-sans-ascenseur',
  },
];
