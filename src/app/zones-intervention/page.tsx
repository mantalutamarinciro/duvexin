
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const ileDeFranceDepartments = [
    { name: "Val-d'Oise (95)", description: "Notre siège et notre cœur d'activité, nous couvrons l'ensemble du département.", link: "/demenagement-val-d-oise-95" },
    { name: "Yvelines (78)", description: "Versailles, Saint-Germain-en-Laye... Nous connaissons parfaitement le secteur.", link: "/demenagement-yvelines-78" },
    { name: "Hauts-de-Seine (92)", description: "Nous maîtrisons les spécificités des déménagements dans ce département dense.", link: "/demenagement-hauts-de-seine-92" },
    { name: "Paris (75)", description: "Experts des déménagements parisiens, des accès difficiles aux autorisations de stationnement.", link: "/demenagement-paris-75" },
    { name: "Seine-Saint-Denis (93)", description: "De Montreuil à Saint-Denis, nous sommes à vos côtés.", link: "/demenagement-seine-saint-denis-93" },
    { name: "Val-de-Marne (94)", description: "Nous intervenons dans tout le Val-de-Marne pour vos projets.", link: "/demenagement-val-de-marne-94" },
    { name: "Essonne (91)", description: "Une couverture complète du nord au sud du département.", link: "/demenagement-essonne-91" },
    { name: "Seine-et-Marne (77)", description: "Même dans le plus grand département d'IDF, nous sommes là pour vous.", link: "/demenagement-seine-et-marne-77" },
];

const normandieDepartments = [
    { name: "Eure (27)", description: "Avec notre agence à Évreux, nous sommes au plus proche de vous.", link: "/demenagement-du-vexin-evreux" },
    { name: "Seine-Maritime (76)", description: "De Rouen au Havre, nous assurons vos déménagements.", link: "#" },
    { name: "Calvados (14)", description: "Nous vous accompagnons pour vos projets à Caen et sur la côte.", link: "#" },
    { name: "Orne (61)", description: "Une présence régulière pour vos déménagements dans l'Orne.", link: "#" },
    { name: "Manche (50)", description: "Nous couvrons également le département de la Manche.", link: "#" },
];

export default function InterventionZonePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/map-france/1920/400"
                    alt="Carte de France mettant en avant l'Île-de-France et la Normandie"
                    fill
                    className="object-cover"
                    data-ai-hint="France map region"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Nos Zones d'Intervention</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Proches de vous en Île-de-France et Normandie, et partout en France.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/a-propos-de-demenagement-du-vexin" className="hover:text-primary">À propos</Link>
                <span className="mx-2">&gt;</span>
                <span>Zones d'intervention</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un service de proximité pour vos déménagements locaux, et un réseau national pour vos projets plus lointains</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménagement du Vexin combine la force d'un acteur local, profondément ancré en Île-de-France et en Normandie, avec la capacité d'intervenir sur l'ensemble du territoire français et même à l'international. Notre connaissance parfaite du terrain dans nos zones de proximité est un atout majeur pour garantir l'efficacité et la fluidité de votre déménagement.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/truck-highway/600/400"
                            alt="Camion de Déménagement du Vexin sur l'autoroute"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving truck highway"
                        />
                    </div>
                </div>
            </section>

             {/* Ile-de-France Section */}
            <section id="idf" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Île-de-France : notre cœur historique</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Basés dans le Val-d'Oise, nous couvrons l'intégralité de la région parisienne. Notre expérience nous permet d'anticiper les défis logistiques propres à chaque département.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {ileDeFranceDepartments.map(dept => (
                            <Card key={dept.name} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/>{dept.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">{dept.description}</p>
                                </CardContent>
                                <div className="p-6 pt-0">
                                     <Button variant="link" className="p-0 text-primary" asChild>
                                        <Link href={dept.link}>
                                            En savoir plus <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* Normandie Section */}
            <section id="normandie" className="py-16">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Normandie : notre deuxième maison</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Grâce à notre agence à Évreux, nous avons développé une forte présence en Normandie pour accompagner tous vos projets dans la région.</p>
                         <Button variant="outline" asChild className="mt-4">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence d'Évreux</Link>
                        </Button>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {normandieDepartments.map(dept => (
                            <Card key={dept.name} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary"/>{dept.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm">{dept.description}</p>
                                </CardContent>
                                <div className="p-6 pt-0">
                                     <Button variant="link" className="p-0 text-primary" asChild>
                                        <Link href={dept.link}>
                                            En savoir plus <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* National & International */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/france-map/600/400"
                            alt="Carte de France montrant des destinations de déménagement"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="France map destinations"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Et partout ailleurs en France et en Europe</h2>
                         <p className="mt-4 text-muted-foreground">Votre projet vous emmène plus loin ? Nous organisons régulièrement des déménagements longue distance.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagements Nationaux</h4>
                                    <p className="text-muted-foreground">Nous assurons des liaisons régulières vers toutes les grandes villes de France : Lyon, Marseille, Bordeaux, Lille, etc.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagements Internationaux</h4>
                                    <p className="text-muted-foreground">Nous organisons vos déménagements vers les pays frontaliers (Belgique, Suisse, Luxembourg, etc.) et dans toute l'Europe.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

             <TestimonialsSection reviews={fallbackTestimonials} />

             {/* CTA Section */}
            <section id="contact-zone" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Votre destination n'est pas listée ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Pas de problème ! Contactez-nous pour discuter de votre projet. Nous trouvons toujours une solution.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis personnalisé</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
