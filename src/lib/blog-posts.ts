
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
    imageUrl: 'https://picsum.photos/seed/blog-stress-free/800/600',
    aiHint: 'calm person planning',
    link: '#',
  },
  {
    id: '2',
    title: 'Comment choisir la bonne formule de déménagement ?',
    description: 'Économique, Standard ou Confort ? Chaque formule a ses avantages. Nous vous aidons à choisir celle qui correspond le mieux à vos besoins, votre budget et votre niveau d\'implication souhaité.',
    imageUrl: 'https://picsum.photos/seed/blog-formula/800/600',
    aiHint: 'checklist comparison',
    link: '#',
  },
  {
    id: '3',
    title: 'Le guide ultime pour emballer vos objets fragiles',
    description: 'La vaisselle, les miroirs, les œuvres d\'art... l\'emballage des objets fragiles est une source de stress. Suivez notre guide pas à pas pour protéger vos biens les plus précieux comme un professionnel.',
    imageUrl: 'https://picsum.photos/seed/blog-fragile/800/600',
    aiHint: 'packing fragile items',
    link: '#',
  },
   {
    id: '4',
    title: 'Déménager avec des enfants : nos conseils pour une transition en douceur',
    description: 'Impliquer les enfants dans le déménagement peut transformer une expérience stressante en une aventure familiale. Découvrez nos astuces pour les préparer et les aider à s\'adapter à leur nouvel environnement.',
    imageUrl: 'https://picsum.photos/seed/blog-kids/800/600',
    aiHint: 'children playing boxes',
    link: '#',
  },
];
