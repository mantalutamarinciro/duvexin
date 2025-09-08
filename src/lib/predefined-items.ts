
import { Sofa, Table, Armchair, Bed, Tv, Box, Lamp, Refrigerator, CaseUpper, Microwave, Book, Shirt, Monitor, Dumbbell, WashingMachine, ShowerHead, LayoutGrid, CookingPot, Utensils, Warehouse, Wine, Bike, ToyBrick, Layers, Piano, Baby, Briefcase, Printer, Square, Truck } from 'lucide-react';

export interface PredefinedItem {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    volume: number; // in cubic meters (m³)
}

export interface RoomCategory {
    id: string;
    name: string;
    items: PredefinedItem[];
}

export const roomCategories: RoomCategory[] = [
    {
        id: 'living_room',
        name: 'Salon',
        items: [
            { id: 'sofa', name: 'Canapé 2-3 places', icon: Sofa, volume: 1.5 },
            { id: 'corner_sofa', name: 'Canapé d\'angle', icon: Sofa, volume: 2.5 },
            { id: 'armchair', name: 'Fauteuil', icon: Armchair, volume: 0.8 },
            { id: 'coffee_table', name: 'Table basse', icon: Table, volume: 0.3 },
            { id: 'tv_stand', name: 'Meuble TV', icon: CaseUpper, volume: 0.5 },
            { id: 'tv', name: 'Télévision', icon: Tv, volume: 0.2 },
            { id: 'bookshelf', name: 'Bibliothèque', icon: Book, volume: 1.0 },
            { id: 'lamp', name: 'Lampadaire', icon: Lamp, volume: 0.15 },
            { id: 'rug', name: 'Tapis', icon: LayoutGrid, volume: 0.2 },
            { id: 'side_table', name: 'Table d\'appoint', icon: Table, volume: 0.1 },
            { id: 'plant_large', name: 'Grande plante', icon: Lamp, volume: 0.4 },
            { id: 'box_generic', name: 'Carton (divers)', icon: Box, volume: 0.1 },
        ]
    },
    {
        id: 'kitchen',
        name: 'Cuisine',
        items: [
            { id: 'dining_table', name: 'Table à manger', icon: Table, volume: 1.2 },
            { id: 'chair', name: 'Chaise', icon: Armchair, volume: 0.15 },
            { id: 'refrigerator', name: 'Réfrigérateur', icon: Refrigerator, volume: 1.0 },
            { id: 'freezer', name: 'Congélateur', icon: Refrigerator, volume: 0.8 },
            { id: 'microwave', name: 'Micro-ondes', icon: Microwave, volume: 0.08 },
            { id: 'oven', name: 'Four', icon: CookingPot, volume: 0.15 },
            { id: 'dishwasher', name: 'Lave-vaisselle', icon: WashingMachine, volume: 0.4 },
            { id: 'kitchen_island', name: 'Îlot de cuisine', icon: CaseUpper, volume: 1.2 },
            { id: 'stool', name: 'Tabouret de bar', icon: CookingPot, volume: 0.1 },
            { id: 'trash_can', name: 'Poubelle', icon: Trash2, volume: 0.1 },
            { id: 'box_dishes', name: 'Carton vaisselle', icon: CookingPot, volume: 0.12 },
            { id: 'box_utensils', name: 'Carton ustensiles', icon: Utensils, volume: 0.08 },
        ]
    },
    {
        id: 'bedroom',
        name: 'Chambre',
        items: [
            { id: 'bed_single', name: 'Lit simple', icon: Bed, volume: 1.2 },
            { id: 'bed_double', name: 'Lit double', icon: BedDouble, volume: 2.0 },
            { id: 'mattress_single', name: 'Matelas simple', icon: Bed, volume: 0.4 },
            { id: 'mattress_double', name: 'Matelas double', icon: BedDouble, volume: 0.7 },
            { id: 'wardrobe', name: 'Armoire', icon: CaseUpper, volume: 1.8 },
            { id: 'chest_of_drawers', name: 'Commode', icon: CaseUpper, volume: 0.6 },
            { id: 'bedside_table', name: 'Table de chevet', icon: Table, volume: 0.1 },
            { id: 'desk', name: 'Bureau', icon: Monitor, volume: 0.9 },
            { id: 'office_chair', name: 'Chaise de bureau', icon: Armchair, volume: 0.3 },
            { id: 'mirror', name: 'Miroir sur pied', icon: Square, volume: 0.15 },
            { id: 'suitcase', name: 'Valise', icon: Luggage, volume: 0.1 },
            { id: 'box_clothes', name: 'Carton vêtements', icon: Shirt, volume: 0.1 },
            { id: 'box_books', name: 'Carton livres', icon: Book, volume: 0.08 },
        ]
    },
    {
        id: 'children_room',
        name: 'Enfants',
        items: [
            { id: 'crib', name: 'Lit bébé', icon: Bed, volume: 0.8 },
            { id: 'changing_table', name: 'Table à langer', icon: CaseUpper, volume: 0.5 },
            { id: 'toy_box', name: 'Coffre à jouets', icon: ToyBrick, volume: 0.3 },
            { id: 'stroller', name: 'Poussette', icon: Baby, volume: 0.4 },
            { id: 'high_chair', name: 'Chaise haute', icon: Armchair, volume: 0.2 },
            { id: 'box_toys', name: 'Carton de jouets', icon: ToyBrick, volume: 0.1 },
        ]
    },
     {
        id: 'bathroom',
        name: 'Salle de bain',
        items: [
            { id: 'washing_machine', name: 'Lave-linge', icon: WashingMachine, volume: 0.4 },
            { id: 'dryer', name: 'Sèche-linge', icon: Layers, volume: 0.4 },
            { id: 'bathroom_cabinet', name: 'Armoire de SDB', icon: ShowerHead, volume: 0.3 },
            { id: 'laundry_basket', name: 'Panier à linge', icon: Box, volume: 0.1 },
            { id: 'box_toiletries', name: 'Carton produits', icon: Box, volume: 0.05 },
        ]
    },
     {
        id: 'office',
        name: 'Bureau',
        items: [
            { id: 'desk_large', name: 'Grand bureau', icon: Monitor, volume: 1.2 },
            { id: 'ergonomic_chair', name: 'Fauteuil de bureau', icon: Armchair, volume: 0.4 },
            { id: 'filing_cabinet', name: 'Caisson à tiroirs', icon: CaseUpper, volume: 0.3 },
            { id: 'printer', name: 'Imprimante', icon: Printer, volume: 0.1 },
            { id: 'box_documents', name: 'Carton archives', icon: Briefcase, volume: 0.07 },
        ]
    },
    {
        id: 'cellar_garage',
        name: 'Cave & Garage',
        items: [
            { id: 'storage_shelf', name: 'Étagère de rangement', icon: Layers, volume: 0.7 },
            { id: 'bicycle', name: 'Vélo', icon: Bike, volume: 0.5 },
            { id: 'tool_box', name: 'Caisse à outils', icon: Box, volume: 0.06 },
            { id: 'wine_rack', name: 'Casier à vin', icon: Wine, volume: 0.4 },
            { id: 'lawn_mower', name: 'Tondeuse', icon: Truck, volume: 0.5 },
            { id: 'tires', name: 'Pneus', icon: Dumbbell, volume: 0.15 },
        ]
    },
    {
        id: 'other',
        name: 'Autres',
        items: [
            { id: 'piano', name: 'Piano droit', icon: Piano, volume: 1.5 },
            { id: 'box_small', name: 'Petit carton', icon: Box, volume: 0.05 },
            { id: 'box_medium', name: 'Carton moyen', icon: Box, volume: 0.1 },
            { id: 'box_large', name: 'Grand carton', icon: Box, volume: 0.15 },
            { id: 'wardrobe_box', name: 'Carton penderie', icon: Shirt, volume: 0.3 },
            { id: 'storage_box', name: 'Malle/Caisse', icon: Warehouse, volume: 0.2 },
        ]
    }
];
