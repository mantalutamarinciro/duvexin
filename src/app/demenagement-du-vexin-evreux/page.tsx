
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LandingPageClient } from "@/app/landing/client-page";
import type { FormattedReview } from "@/app/api/reviews/route";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const services = [
    { title: "Déménagement Local", description: "Nous vous accompagnons dans toutes les étapes de votre déménagement à Évreux et dans ses environs." },
    { title: "Déménagement National", description: "Que vous partiez vers Paris, Lyon, ou d’autres régions de France, nous vous garantissons un déménagement rapide et sécurisé." },
    { title: "Services de Stockage", description: "Nous proposons des solutions de stockage temporaire pour vos biens pendant la période de transition." },
    { title: "Déménagement d'Entreprises", description: "Notre équipe gère les déménagements d’entreprises, en respectant vos délais et en minimisant les interruptions." },
    { title: "Transport d'Objets Lourds", description: "Nous gérons le transport d’objets encombrants comme les pianos, coffres-forts, ou meubles volumineux." },
    { title: "Déménagement International", description: "Vous déménagez à l’étranger ? Nous assurons votre déménagement dans toute l’Europe et au-delà." },
    { title: "Déménagement d'Œuvres d'Art", description: "Pour vos objets précieux, nous offrons un service spécialisé garantissant une sécurité maximale." },
];

const locations = ["Évreux", "Rouen", "Le Havre", "Caen", "Vernon", "Dieppe", "Lisieux", "Alençon", "Coutances", "Cherbourg-en-Cotentin"];

export default function EvreuxPage() {
    return (
        <div className="bg-background text-foreground">
             {/* Hero Section */}
            <section className="bg-muted/50 py-20 md:py-32 text-center">
                 <div className="container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Déménagement du Vexin : Votre partenaire local à Évreux</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">Bienvenue à notre agence de déménagement située à Évreux, au cœur de l’Eure et de la Normandie.</p>
                     <div className="mt-8 flex justify-center items-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="#contact-evreux">Demandez un devis pour la Normandie</Link>
                        </Button>
                    </div>
                 </div>
            </section>

             {/* Agency Info */}
            <section id="agency-info" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Notre agence à Évreux</h2>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
                        Spécialistes du déménagement local, régional, national et international, nous mettons à votre service une équipe professionnelle et qualifiée pour vous accompagner dans toutes vos démarches de déménagement.
                    </p>
                    <Card className="max-w-md mx-auto mt-8 text-left">
                        <CardHeader>
                            <CardTitle>Contact Agence Évreux</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-1"/>
                                <span>22 Rue Isambard, 27000 Évreux, Normandie</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary"/>
                                <span>(+33) 3 74 47 44 77</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary"/>
                                <span>demenagementduvexin@evreux.fr</span>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            
            {/* Services Section */}
            <section id="services-evreux" className="py-16 bg-muted/50">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos Services à Évreux et en Normandie</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre agence offre une gamme complète de services pour répondre à toutes vos attentes.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                         <Button asChild>
                            <Link href="/#services">Voir tous nos services en détail</Link>
                         </Button>
                    </div>
                </div>
            </section>

             {/* Why Choose Us */}
            <section className="py-16">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Pourquoi Choisir Notre Agence à Évreux ?</h2>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Proximité et expertise locale</h4>
                                    <p className="text-muted-foreground">Nous connaissons parfaitement la région d’Évreux, de l’Eure et de la Normandie.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Service personnalisé</h4>
                                    <p className="text-muted-foreground">Chaque déménagement est unique, nous offrons un service qui répond à vos besoins spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Équipe qualifiée et expérimentée</h4>
                                    <p className="text-muted-foreground">Nos déménageurs sont spécialement formés pour le transport d’objets lourds et fragiles.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <Image
                            src="https://picsum.photos/seed/mover-evreux/600/400"
                            alt="Notre déménageur Gheorghe à l'œuvre lors d'un déménagement effectué récemment à Evreux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover working"
                        />
                    </div>
                </div>
            </section>

             {/* Intervention Zone */}
             <section id="zone-evreux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Intervention dans l’Eure, la Normandie et l’Ouest</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre agence à Évreux couvre une large zone. Voici les villes principales où nous intervenons :</p>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {locations.map((loc) => (
                            <div key={loc} className="bg-background border rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                                {loc}
                            </div>
                        ))}
                    </div>
                </div>
             </section>

              {/* Testimonials */}
             <LandingPageClient reviews={fallbackTestimonials} />
            
             {/* CTA Section */}
            <section id="contact-evreux" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Prêt pour votre déménagement en Normandie ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez notre agence d'Évreux et obtenez votre estimation personnalisée.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

