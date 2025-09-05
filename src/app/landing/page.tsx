
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, ShieldCheck, Star, Map, Globe, Building, Paintbrush, CheckCircle, Rocket, Users, Handshake, Briefcase } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "./contact-form";

const services = [
    {
        icon: <Map className="h-10 w-10 text-primary" />,
        title: "Déménagement Local",
        description: "Déménagez rapidement et sereinement dans le Val-d’Oise avec des experts locaux."
    },
    {
        icon: <Globe className="h-10 w-10 text-primary" />,
        title: "Déménagement National",
        description: "Un déménagement rapide et sécurisé, où que vous soyez en France."
    },
    {
        icon: <Building className="h-10 w-10 text-primary" />,
        title: "Déménagement d'Entreprise",
        description: "Simplifiez le déménagement de votre entreprise avec un service adapté."
    },
     {
        icon: <Rocket className="h-10 w-10 text-primary" />,
        title: "Déménagement International",
        description: "Déménagez partout en Europe avec des experts du transport international."
    },
    {
        icon: <Paintbrush className="h-10 w-10 text-primary" />,
        title: "Déménagement d'Œuvres d'Art",
        description: "Protégez vos œuvres précieuses avec des déménageurs spécialisés."
    },
     {
        icon: <Briefcase className="h-10 w-10 text-primary" />,
        title: "Déménagement Régional",
        description: "Déménagez en toute tranquillité à travers l’Île-de-France."
    },
];

const testimonials = [
    {
        name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        time: "2 ans"
    },
    {
        name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        time: "2 ans"
    },
     {
        name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        time: "19 jours"
    },
]

export default function LandingPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center text-center text-white py-20">
                <Image 
                    src="https://picsum.photos/1920/1080"
                    alt="Équipe de déménageurs chargeant un camion"
                    fill
                    className="object-cover"
                    data-ai-hint="moving team truck"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="font-semibold text-primary">Déménagements dans le Val-d’Oise (95), l’Oise (60), l’Eure (27), les Yvelines (78)...</p>
                    <h1 className="text-4xl md:text-6xl font-headline font-bold mt-2">Déménagez en toute sérénité</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Déménagement 100 % réalisé par nos équipes, sans sous-traitance ni intérim.</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/dashboard/quote">Demandez un devis maintenant</Link>
                        </Button>
                         <Button size="lg" variant="outline" className="bg-background/20 border-white text-white hover:bg-background/30" asChild>
                            <Link href="/dashboard/inventory">Calculez le volume à déménager</Link>
                        </Button>
                    </div>
                </div>
            </section>

             {/* Value Propositions */}
            <section className="py-12 bg-background">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <CheckCircle className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Devis rapide et déplacement gratuit</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <Users className="h-6 w-6 text-primary"/>
                            <span className="font-semibold">Une équipe dédiée, sans intermédiaire</span>
                        </div>
                         <div className="flex items-center justify-center gap-3">
                            <div className="flex items-center gap-1 text-amber-400">
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                                <Star size={16} fill="currentColor"/>
                            </div>
                            <div>
                                <span className="font-bold">4.9</span>
                                <span className="text-muted-foreground"> / 5 sur 231 avis Google</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* About Section */}
            <section id="about" className="py-16 md:py-24">
                <div className="container text-center max-w-4xl mx-auto">
                     <h2 className="text-3xl font-bold">Votre partenaire de confiance pour un déménagement sans stress</h2>
                     <p className="mt-4 text-muted-foreground text-lg">
                        Basée dans le Val-d’Oise (95), notre entreprise familiale de déménagement intervient également dans l’Oise (60), l’Eure (27), les Yvelines (78), Paris (75) et les Hauts-de-Seine (92). Que vous soyez un particulier ou une entreprise, nous vous accompagnons dans tous vos projets de déménagement, en Île-de-France, partout en France et même à l’international.
                     </p>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos services de déménagement adaptés à vos besoins</h2>
                        <p className="mt-4 text-muted-foreground">Découvrez nos solutions de déménagement sur mesure, adaptées à toutes vos demandes.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                             <Card key={i} className="text-center p-6 flex flex-col">
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h3 className="text-xl font-semibold">{service.title}</h3>
                                <p className="mt-2 text-muted-foreground flex-grow">{service.description}</p>
                                <Button variant="link" className="mt-4">Voir ce service →</Button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
             <section className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos clients témoignent de leur expérience</h2>
                         <p className="mt-4 text-muted-foreground">La satisfaction de nos clients est notre meilleure publicité.</p>
                    </div>
                    <div className="mt-12 grid lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                             <Card key={i} className="p-6">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-1 text-amber-400 mb-2">
                                    <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                                    </div>
                                    <p className="italic text-sm">"{testimonial.text}"</p>
                                    <p className="mt-4 font-semibold text-sm">- {testimonial.name}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Notre processus en 4 étapes simples</h2>
                         <p className="mt-4 text-muted-foreground">Nous simplifions votre déménagement en suivant un processus clair et efficace pour garantir une expérience sans stress.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                <Handshake className="h-8 w-8"/>
                            </div>
                            <h3 className="font-semibold">1. Consultation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous discutons de vos besoins et planifions ensemble votre déménagement.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                <Package className="h-8 w-8"/>
                            </div>
                            <h3 className="font-semibold">2. Préparation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous vous fournissons le matériel et les conseils pour un emballage réussi.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                <Truck className="h-8 w-8"/>
                            </div>
                            <h3 className="font-semibold">3. Réalisation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nos équipes expertes prennent en charge le jour J avec soin et efficacité.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4">
                                <ShieldCheck className="h-8 w-8"/>
                            </div>
                            <h3 className="font-semibold">4. Installation</h3>
                            <p className="text-sm text-muted-foreground mt-1">Nous déposons vos biens dans les pièces de votre choix pour une réinstallation facile.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Formulas Section */}
             <section className="py-16 md:py-24">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Découvrez nos formules de déménagement</h2>
                         <p className="mt-4 text-muted-foreground">Trouvez celle qui s’adapte à vos besoins, de la plus simple à la plus complète.</p>
                    </div>
                    <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card><CardHeader><CardTitle>Économique</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Vous gérez l'emballage, nous assurons le transport sécurisé de vos biens.</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Standard</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Un compromis parfait : nous emballons les objets fragiles et démontons les meubles.</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Clé en Main</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Nous prenons en charge l'emballage, le déballage et le démontage/remontage.</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Total Confort</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Une prise en charge complète, incluant le débranchement des appareils, pour une tranquillité totale.</p></CardContent></Card>
                    </div>
                </div>
             </section>


            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Prêt à déménager ? Contactez-nous.</h2>
                        <p className="mt-4 text-muted-foreground">Nos experts sont à votre disposition pour planifier votre déménagement sans stress. Remplissez ce formulaire et obtenez votre devis gratuit en 24H.</p>
                         <div className="mt-8 space-y-4 text-muted-foreground">
                             <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Une équipe expérimentée et professionnelle.</span>
                             </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Des solutions personnalisées.</span>
                             </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-primary" />
                                <span>Des tarifs compétitifs sans compromis sur la qualité.</span>
                             </div>
                        </div>
                    </div>
                    <div>
                        <Card>
                             <CardHeader>
                                <CardTitle>Demandez votre devis gratuit</CardTitle>
                                <CardDescription>Notre équipe vous recontactera dans les plus brefs délais.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </section>
        </>
    );
}
