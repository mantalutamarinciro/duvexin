
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const galleryImages = [
    { src: "https://picsum.photos/seed/team-photo-1/800/600", alt: "Notre équipe de déménageurs professionnels", aiHint: "moving team portrait" },
    { src: "https://picsum.photos/seed/truck-clean/800/600", alt: "Camion de déménagement propre et moderne", aiHint: "clean moving truck" },
    { src: "https://picsum.photos/seed/careful-packing/800/600", alt: "Emballage soigné d'objets fragiles", aiHint: "careful packing fragile items" },
    { src: "https://picsum.photos/seed/furniture-lift/800/600", alt: "Utilisation d'un monte-meubles sur une façade", aiHint: "furniture lift building" },
    { src: "https://picsum.photos/seed/loading-truck/800/600", alt: "Chargement organisé du camion de déménagement", aiHint: "loading moving truck" },
    { src: "https://picsum.photos/seed/happy-client/800/600", alt: "Client satisfait après son déménagement", aiHint: "happy client moving" },
    { src: "https://picsum.photos/seed/office-move-gallery/800/600", alt: "Déménagement de bureaux d'une entreprise", aiHint: "office moving" },
    { src: "https://picsum.photos/seed/protective-covers/800/600", alt: "Meubles protégés par des couvertures de déménagement", aiHint: "furniture protective covers" },
    { src: "https://picsum.photos/seed/team-working/800/600", alt: "L'équipe Déménagement du Vexin en pleine action", aiHint: "moving team working" },
];

export default function GalleryPage() {
  return (
    <div className="bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative h-64 flex items-center justify-center text-center text-white">
            <Image 
                src="https://picsum.photos/seed/gallery-banner/1920/400"
                alt="Bannière de la galerie photo"
                fill
                className="object-cover"
                data-ai-hint="professional mover portrait"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container">
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Galerie</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Découvrez notre savoir-faire en images.</p>
            </div>
        </section>

        {/* Breadcrumb */}
        <div className="container py-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">À propos</Link>
            <span className="mx-2">&gt;</span>
            <span>Galerie</span>
        </div>

        {/* Gallery Grid */}
        <section className="py-16">
            <div className="container">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="group relative aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.aiHint}
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="absolute bottom-0 left-0 p-4 text-white font-semibold">{image.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section id="contact-gallery" className="py-16 bg-muted/50">
            <div className="container text-center">
                <h2 className="text-3xl font-bold">Convaincu par notre professionnalisme ?</h2>
                <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Passez à l'étape suivante et demandez votre devis gratuit. C'est simple, rapide et sans engagement.</p>
                <Button size="lg" className="mt-8" asChild>
                    <Link href="/demande-devis">Obtenir mon devis gratuit</Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
