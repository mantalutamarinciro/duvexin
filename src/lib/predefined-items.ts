import { Sofa, Table, Armchair, Bed, Tv, Box, Lamp, Refrigerator, CaseUpper, Microwave, Book, Shirt, Monitor } from 'lucide-react';

export interface PredefinedItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    volume: number; // in cubic meters (m³)
}

export const predefinedItems: PredefinedItem[] = [
    { id: 'sofa', name: 'Canapé', icon: Sofa, volume: 1.5 },
    { id: 'table', name: 'Table', icon: Table, volume: 1.2 },
    { id: 'armchair', name: 'Fauteuil', icon: Armchair, volume: 0.8 },
    { id: 'bed', name: 'Lit', icon: Bed, volume: 2.0 },
    { id: 'tv', name: 'Télévision', icon: Tv, volume: 0.2 },
    { id: 'box', name: 'Carton', icon: Box, volume: 0.1 },
    { id: 'lamp', name: 'Lampe', icon: Lamp, volume: 0.05 },
    { id: 'refrigerator', name: 'Réfrigérateur', icon: Refrigerator, volume: 1.0 },
    { id: 'desk', name: 'Bureau', icon: CaseUpper, volume: 0.9 },
    { id: 'microwave', name: 'Micro-ondes', icon: Microwave, volume: 0.08 },
    { id: 'books', name: 'Livres (caisse)', icon: Book, volume: 0.05 },
    { id: 'clothes', name: 'Vêtements (caisse)', icon: Shirt, volume: 0.1 },
    { id: 'computer', name: 'Ordinateur', icon: Monitor, volume: 0.1 },
];
