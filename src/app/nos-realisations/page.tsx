
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Building, Piano, Gem, Users, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const caseStudies = [
    {
        title: "Transfert de bureaux high-tech à La Défense",
        category: "Déménagement d'Entreprise",
        imageUrl: "https://picsum.photos/seed/defense-office/800/600",
        aiHint: "modern office moving computers",
        description: "Planification millimétrée pour le transfert d'un siège social de 150 postes, incluant la migration sécurisée d'une salle de serveurs. L'opération a été réalisée sur un week-end pour garantir une continuité d'activité totale dès le lundi matin.",
        challenges: [
            "Logistique complexe en Immeuble de Grande Hauteur (IGH).",
            "Manutention de matériel informatique et serveurs sensibles.",
            "Respect d'un planning et d'un cahier des charges très stricts."
        ]
    },
    {
        title: "Villa de Maître en bord de Seine",
        category: "Déménagement Prestige",
        imageUrl: "https://picsum.photos/seed/seine-villa/800/600",
        aiHint: "luxury house riverside",
        description: "Déménagement complet d'une propriété de 500m² à Saint-Germain-en-Laye, incluant une collection d'art et du mobilier de designer. Un soin extrême a été apporté à la protection des biens et des parquets anciens.",
        challenges: [
            "Emballage sur-mesure pour des œuvres d'art et objets fragiles.",
            "Accès difficile nécessitant une planification logistique précise.",
            "Discrétion et respect de la confidentialité du client."
        ]
    },
    {
        title: "Piano à queue dans un appartement haussmannien",
        category: "Objet Lourd & Fragile",
        imageUrl: "https://picsum.photos/seed/piano-move/800/600",
        aiHint: "moving grand piano",
        description: "Le passage d'un piano à queue par une fenêtre au 4ème étage d'un immeuble parisien sans ascenseur. L'opération a nécessité l'utilisation d'un monte-meubles puissant et le savoir-faire de nos équipes spécialisées.",
        challenges: [
            "Obtention des autorisations de stationnement dans une rue étroite.",
            "Manipulation d'un objet extrêmement lourd et de grande valeur.",
            "Sécurisation de la zone d'intervention en milieu urbain dense."
        ]
    },
];

export default function NosRealisationsPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/realisations-banner/1920/400"
                    alt="Bannière de la page réalisations"
                    fill
                    className="object-cover"
                    data-ai-hint="professional movers working"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Nos Réalisations</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La preuve de notre savoir-faire par l'exemple.</p>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">À propos</Link>
                <span className="mx-2">&gt;</span>
                <span>Nos réalisations</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold">Quand l'expertise rencontre le défi</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Chaque déménagement est une histoire unique. Certains sont de véritables défis logistiques qui mettent à l'épreuve notre savoir-faire. Nous sommes fiers de vous présenter quelques exemples de missions complexes que nous avons menées à bien, illustrant notre capacité à nous adapter à toutes les situations.
                    </p>
                </div>
            </section>
            
            {/* Case Studies */}
            <div className="container space-y-16 py-16">
                {caseStudies.map((study, index) => (
                     <Card key={index} className="grid lg:grid-cols-2 overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                        <div className="relative min-h-[300px] lg:min-h-0">
                             <Image 
                                src={study.imageUrl}
                                alt={`Image pour ${study.title}`}
                                fill
                                className="object-cover"
                                data-ai-hint={study.aiHint}
                            />
                        </div>
                        <div className="p-8 flex flex-col">
                            <p className="text-sm font-semibold text-primary uppercase">{study.category}</p>
                            <h3 className="text-2xl font-bold mt-2">{study.title}</h3>
                            <p className="mt-4 text-muted-foreground">{study.description}</p>
                            <h4 className="font-semibold mt-6 mb-3">Défis relevés :</h4>
                            <ul className="space-y-2 text-sm">
                                {study.challenges.map((challenge, i) => (
                                     <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/>
                                        <span className="text-muted-foreground">{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                ))}
            </div>


            {/* CTA Section */}
            <section id="contact-realisations" className="py-16 bg-muted/50">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Vous avez un projet complexe ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">C'est notre spécialité. Contactez-nous pour une étude personnalisée et découvrez comment nous pouvons transformer votre défi en réussite.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Obtenir mon devis sur-mesure</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
