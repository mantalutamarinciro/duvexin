
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, ArrowRight, ShieldCheck, Users, Globe, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const topDestinations = [
    { name: "Lyon", link: "/demenagement-ile-de-france-lyon" },
    { name: "Marseille", link: "/demenagement-ile-de-france-marseille" },
    { name: "Bordeaux", link: "/demenagement-ile-de-france-bordeaux" },
    { name: "Lille", link: "/demenagement-ile-de-france-lille" },
    { name: "Nantes", link: "/demenagement-ile-de-france-nantes" },
    { name: "Toulouse", link: "/demenagement-ile-de-france-toulouse" },
    { name: "Strasbourg", link: "#" },
    { name: "Nice", link: "#" },
];

export default function DemenagementNationalPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/france-highway/1920/400"
                    alt="Camion de déménagement sur une autoroute française"
                    fill
                    className="object-cover"
                    data-ai-hint="moving truck highway france"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Déménagement National Longue Distance</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Où que la vie vous mène en France, nous vous y accompagnons en toute sérénité.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Déménagement National</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre projet de vie, partout en France</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Quitter sa région pour une nouvelle aventure est une étape importante. Un déménagement longue distance demande une organisation sans faille, une logistique optimisée et un partenaire de confiance pour garantir que tous vos biens arrivent à destination en parfait état.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes spécialisés dans les déménagements nationaux au départ de l'Île-de-France. Grâce à nos tournées régulières et à notre parfaite maîtrise des longs trajets, nous vous offrons une solution à la fois économique, fiable et sécurisée.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/france-map-planning/600/400"
                            alt="Planification d'un déménagement longue distance sur une carte de France"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="map france planning"
                        />
                    </div>
                </div>
            </section>
            
            {/* Destinations Section */}
            <section id="destinations" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos destinations phares</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous desservons l'ensemble du territoire, avec des liaisons fréquentes vers les plus grandes métropoles françaises.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {topDestinations.map((city) => (
                            <Button asChild variant={city.link === '#' ? 'outline' : 'default'} className="justify-start text-base p-6" key={city.name}>
                                <Link href={city.link}>
                                    {city.name}
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
             </section>

             {/* Services Section */}
            <section className="py-16">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/long-distance-packing/600/400"
                            alt="Déménageur protégeant un meuble pour un transport longue distance"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing long distance"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Un service adapté à la longue distance</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Voyages optimisés</h4>
                                    <p className="text-muted-foreground">Nous organisons nos tournées pour vous proposer des tarifs compétitifs et des délais respectés.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagements groupés</h4>
                                    <p className="text-muted-foreground">Pour les petits volumes, le groupage est une solution économique et écologique que nous maîtrisons.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Protection renforcée</h4>
                                    <p className="text-muted-foreground">L'emballage et le calage dans le camion font l'objet d'une attention particulière pour les longs trajets.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <TestimonialsSection reviews={fallbackTestimonials} />

             {/* CTA Section */}
            <section id="contact-national" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre projet national dès aujourd'hui</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous pour une étude gratuite de votre déménagement longue distance et recevez un devis détaillé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis national</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
