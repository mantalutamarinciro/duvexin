
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        title: "Déménagement Local (Val-d'Oise)",
        description: "Un service rapide et efficace pour vos déménagements de proximité.",
        imageUrl: "https://picsum.photos/seed/local-move/600/400",
        aiHint: "local moving city",
        link: "/demenagement-val-d-oise-95"
    },
    {
        title: "Déménagement Régional (Île-de-France)",
        description: "Nous couvrons toute la région parisienne avec professionnalisme.",
        imageUrl: "https://picsum.photos/seed/regional-move/600/400",
        aiHint: "regional moving truck",
        link: "/zones-intervention"
    },
    {
        title: "Déménagement National (Vers toute la France)",
        description: "Peu importe votre destination en France, nous assurons un transport sécurisé.",
        imageUrl: "https://picsum.photos/seed/national-move/600/400",
        aiHint: "national moving highway",
        link: "/demenagement-national"
    },
    {
        title: "Déménagement International (Europe)",
        description: "Votre déménagement en Europe, géré de A à Z par nos experts.",
        imageUrl: "https://picsum.photos/seed/international-move/600/400",
        aiHint: "international moving map",
        link: "#"
    },
    {
        title: "Stockage et Garde-Meubles",
        description: "Des solutions de stockage flexibles et sécurisées pour vos biens.",
        imageUrl: "https://picsum.photos/seed/storage-unit/600/400",
        aiHint: "storage unit boxes",
        link: "/demenagement-garde-meubles"
    },
    {
        title: "Déménagement d'Œuvres d'Art",
        description: "Un savoir-faire unique pour le transport de vos objets les plus précieux.",
        imageUrl: "https://picsum.photos/seed/art-moving/600/400",
        aiHint: "art moving painting",
        link: "/demenagement-oeuvres-art"
    },
    {
        title: "Déménagement d'Entreprise",
        description: "Minimisez l'impact sur votre activité avec notre service pro.",
        imageUrl: "https://picsum.photos/seed/business-move/600/400",
        aiHint: "office moving empty",
        link: "/demenagement-entreprise-bureau"
    },
    {
        title: "Transport d'Objets Lourds",
        description: "Pianos, coffres-forts... Aucun objet ne nous résiste.",
        imageUrl: "https://picsum.photos/seed/heavy-moving/600/400",
        aiHint: "moving heavy piano",
        link: "/demenagement-objets-lourds"
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image
                    src="https://picsum.photos/seed/service-banner/1920/400"
                    alt="Bannière des services de déménagement"
                    fill
                    className="object-cover"
                    data-ai-hint="moving services banner"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Nos Services de Déménagement</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Sûrs, Rapides et Personnalisés.</p>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <span>Services</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold">Un déménagement serein, quel que soit votre besoin.</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Chez Déménagement du Vexin, nous comprenons que chaque déménagement est unique. C’est pourquoi nous proposons une gamme de services sur mesure, pour répondre à vos besoins spécifiques, que vous soyez un particulier ou une entreprise. Nos équipes professionnelles sont là pour rendre cette expérience aussi fluide et agréable que possible.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-muted/50">
                <div className="container grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="overflow-hidden group flex flex-col">
                            <Image
                                src={service.imageUrl}
                                alt={`Image pour ${service.title}`}
                                width={600}
                                height={400}
                                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                data-ai-hint={service.aiHint}
                            />
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button variant="link" className="p-0" asChild>
                                    <Link href={service.link}>
                                        En savoir plus <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Prêt à déménager ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Quel que soit votre projet, nous avons une solution adaptée à vos besoins. Demandez un devis gratuit dès maintenant et découvrez comment notre équipe peut rendre votre déménagement simple et sans stress.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis gratuit</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
