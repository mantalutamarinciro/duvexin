
import { roomCategories } from "@/lib/predefined-items"
import { VolumeCalculatorClient } from "@/components/volume-calculator-client";
import { getInventoryList } from "@/services/inventoryService";

export default async function VolumeCalculatorPage() {
    
    // Fetch initial data on the server
    const initialInventory = await getInventoryList();

    return (
        <div className="container py-16">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                    <h1 className="font-headline text-3xl font-bold tracking-tight">Calculateur de volume</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                    Estimez le volume de votre déménagement avec précision. Naviguez par pièce, ajoutez vos objets, et laissez notre outil calculer le total pour vous.
                    </p>
                </div>
            </div>
      
            <VolumeCalculatorClient 
                roomCategories={roomCategories} 
                initialItems={initialInventory?.items || []}
            />
        </div>
    )
}
