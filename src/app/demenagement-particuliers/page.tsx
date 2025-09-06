
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, Truck, Package, Phone, FileText, Gift, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";

const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Clotilde Duran", text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Clotilde` },
    { id: "fallback-2", name: "Jean-michel Marot", text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.", rating: 5, createTime: "il y a 2 ans", avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel` },
    { id: "fallback-3", name: "Robert GALAND", text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI", rating: 5, createTime: "il y a 19 jours", avatarUrl: `https://i.pravatar.cc/48?u=Robert` },
];

const formulas = [
    {
        icon: <Gift className="h-10 w-10 text-primary"/>,
        title: "Formule Économique",
        description: "La solution idéale pour les petits budgets. Vous emballez, nous transportons.",
        features: ["Chargement du camion par nos soins", "Transport sécurisé", "Déchargement à l'adresse d'arrivée"],
        priceIndication: "Idéal pour maîtriser votre budget"
    },
    {
        icon: <Package className="h-10 w-10 text-primary"/>,
        title: "Formule Standard",
        description: "Le meilleur rapport qualité-prix pour un déménagement sans souci.",
        features: ["Fourniture du matériel d'emballage", "Emballage/Déballage du fragile", "Démontage/Remontage des meubles", "Transport et manutention"],
        priceIndication: "La plus populaire"
    },
    {
        icon: <Sparkles className="h-10 w-10 text-primary"/>,
        title: "Formule Confort (Luxe)",
        description: "Déléguez tout, nous nous occupons de tout. La tranquillité d'esprit absolue.",
        features: ["Emballage complet de tous vos biens", "Déballage et rangement", "Nettoyage du logement de départ", "Installation complète et mise en service"],
        priceIndication: "Pour une sérénité totale"
    }
];

const processSteps = [
    {
        step: 1,
        title: "Prise de contact et devis",
        description: "Contactez-nous via notre formulaire ou par téléphone. Nous évaluons vos besoins et vous proposons un devis gratuit, détaillé et transparent, sans engagement."
    },
    {
        step: 2,
        title: "Visite technique (optionnelle)",
        description: "Pour les volumes importants, nous pouvons organiser une visite technique gratuite pour estimer précisément le volume, évaluer les accès et planifier la logistique."
    },
    {
        step: 3,
        title: "Planification et préparation",
        description: "Une fois le devis accepté, nous fixons la date et vous livrons le matériel d'emballage si nécessaire. Nous vous donnons tous les conseils pour préparer sereinement le jour J."
    },
    {
        step: 4,
        title: "Le jour du déménagement",
        description: "Notre équipe de professionnels arrive à l'heure convenue, protège vos biens et les lieux, puis procède au chargement selon la formule choisie."
    },
    {
        step: 5,
        title: "Transport et livraison",
        description: "Vos biens sont transportés en toute sécurité dans nos camions capitonnés. Nous vous tenons informé de l'heure d'arrivée à votre nouveau domicile."
    },
    {
        step: 6,
        title: "Installation et finalisation",
        description: "Nous déchargeons, déballons et remontons votre mobilier selon les termes de votre contrat. Nous nous assurons que tout est à votre convenance avant de repartir."
    }
];


export default function DemenagementParticuliersPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/family-moving/1920/500"
                    alt="Famille heureuse emménageant dans sa nouvelle maison"
                    fill
                    className="object-cover"
                    data-ai-hint="happy family moving new house"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Service sur mesure pour vous</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement pour Particuliers</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Parce que chaque déménagement est unique, nous vous offrons une expérience personnalisée, sereine et sécurisée.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Déménagement de particuliers</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement, notre priorité : un service humain et professionnel</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Changer de domicile est une étape importante de la vie. C'est un projet rempli d'émotions, de souvenirs et d'attentes. Chez Déménagement du Vexin, nous comprenons parfaitement les enjeux d'un déménagement de particulier. C'est pourquoi nous mettons un point d'honneur à vous offrir bien plus qu'un simple transport de meubles. Nous vous proposons un accompagnement complet, basé sur l'écoute, la confiance et le savoir-faire de nos équipes 100% salariées. Notre mission est de transformer cette transition, souvent perçue comme stressante, en une expérience positive et fluide.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Que vous déménagiez un petit studio ou une grande maison familiale, localement ou à l'autre bout de la France, nous adaptons nos services à vos besoins et à votre budget, avec la même exigence de qualité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/packing-boxes/600/400"
                            alt="Personne souriante emballant des cartons de déménagement"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="person packing moving boxes"
                        />
                    </div>
                </div>
            </section>

             {/* Formulas Section */}
            <section id="formulas" className="py-16 bg-muted/50">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos Formules de Déménagement : à chaque besoin sa solution</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous avons conçu trois formules claires et flexibles pour s'adapter parfaitement à vos attentes et à votre budget. Choisissez celle qui vous convient le mieux.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
                        {formulas.map((formula, index) => (
                            <Card key={index} className="flex flex-col text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                 <CardHeader className="items-center">
                                    {formula.icon}
                                    <CardTitle className="mt-4 text-2xl">{formula.title}</CardTitle>
                                    <CardDescription>{formula.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3 text-left">
                                        {formula.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0"/>
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <div className="p-6 pt-0">
                                     <p className="text-sm font-bold text-primary">{formula.priceIndication}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* Process Section */}
             <section className="py-16">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le déroulement de votre déménagement, étape par étape</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous suivons un processus rigoureux pour garantir une organisation parfaite et une exécution sans faille de votre projet.</p>
                    </div>
                    <div className="mt-12 max-w-4xl mx-auto relative">
                        <div className="absolute left-4 md:left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true" />
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative pl-12 md:pl-0 mb-12">
                                <div className="md:flex items-center">
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:text-right'}`}>
                                        <div className="absolute -left-0 md:left-1/2 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold -translate-x-1/2">
                                            {step.step}
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Security Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                      <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/secure-wrapping/600/400"
                            alt="Déménageur emballant soigneusement un meuble avec une couverture de protection"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover wrapping furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">La sécurité de vos biens, notre obsession</h2>
                         <p className="mt-4 text-muted-foreground">Vos meubles, votre vaisselle, vos souvenirs... chaque objet a une valeur. Nous en sommes conscients et nous les traitons avec le plus grand soin.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Matériel de protection professionnel</h4>
                                    <p className="text-muted-foreground">Nous utilisons des couvertures de déménagement, des housses spécifiques pour matelas et canapés, du film à bulles et des cartons renforcés pour une protection maximale.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <Truck className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Véhicules modernes et capitonnés</h4>
                                    <p className="text-muted-foreground">Notre flotte de camions est spécialement aménagée pour le transport de mobilier, avec des parois capitonnées et des barres d'arrimage pour maintenir vos biens en place.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <Star className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Assurance et garantie</h4>
                                    <p className="text-muted-foreground">Votre déménagement est couvert par notre assurance. Nous vous présentons clairement les garanties incluses dans votre contrat pour une totale tranquillité.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />

             {/* CTA Section */}
            <section id="contact-particuliers" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Prêt à déménager en toute sérénité ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Faites le premier pas vers votre nouveau chez-vous. Contactez-nous dès aujourd'hui pour une discussion sans engagement et recevez votre devis personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis gratuit</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
