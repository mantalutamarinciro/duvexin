
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Eye, Rocket, Users, ShieldCheck, Heart, Leaf, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FormattedReview } from "@/app/api/reviews/route";


const fallbackTestimonials: FormattedReview[] = [
    {
        id: "fallback-1",
        name: "Clotilde Duran",
        text: "Une équipe très réactive et très professionnelle, vraiment rien à dire, du très bon travail! Les affaires ont été emballées avec le plus grand soin. Nous conseillons les yeux fermés!",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Clotilde`
    },
    {
        id: "fallback-2",
        name: "Jean-michel Marot",
        text: "Un déménagement en Bretagne parfaitement réalisé. Professionnel du début jusqu'à la livraison finale. Très bon contact. Équipe efficace, rapide, et sympathique. Travail de qualité.",
        rating: 5,
        createTime: "il y a 2 ans",
        avatarUrl: `https://i.pravatar.cc/48?u=Jean-michel`
    },
     {
        id: "fallback-3",
        name: "Robert GALAND",
        text: "Une interlocutrice réactive, une équipe ultra efficace, des affaires très bien protégées. Rapidité, professionnalisme. On voit le côté 'familial' sans prestataire ou intérimaire. Sincèrement je suis bluffé. Je recommande totalement. MERCI",
        rating: 5,
        createTime: "il y a 19 jours",
        avatarUrl: `https://i.pravatar.cc/48?u=Robert`
    },
    {
        id: "fallback-4",
        name: "Nadine Mirlier",
        text: "Un très grand merci à toute l'équipe. Ravie d'avoir fait appel à eux. Tout était parfait. Tout était bien emballé et protéger.L'équipe très professionnelle. Très bon rapport qualité prix.Je recommande à 200 %.",
        rating: 5,
        createTime: "il y a environ un mois",
        avatarUrl: `https://i.pravatar.cc/48?u=Nadine`
    }
];


const teamMembers = [
    { name: "Marin", role: "CEO / Fondateur", imageUrl: "https://picsum.photos/seed/marin/200", description: "Fondateur et CEO de Déménagement du Vexin, Marin est l’âme de notre entreprise. Fort de nombreuses années d’expérience dans le secteur, il supervise l’ensemble des opérations et garantit la qualité du service pour tous nos clients.", aiHint: "company founder portrait" },
    { name: "Vitalie", role: "Chef d’équipe / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/vitalie/200", description: "Vitalie est responsable de la gestion des équipes de déménageurs. Son expertise et son leadership assurent une organisation sans faille, en veillant à ce que chaque déménagement se déroule de manière fluide et efficace.", aiHint: "team leader portrait" },
    { name: "Gheorghe", role: "Chef d’équipe / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/gheorghe/200", description: "Gheorghe est un pilier de notre équipe, apportant une grande expérience dans la conduite de poids lourds et dans la gestion des déménagements complexes. Sa rigueur et son attention aux détails font de lui un leader respecté.", aiHint: "truck driver portrait" },
    { name: "Andrei", role: "Déménageur / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/andrei/200", description: "Andrei assure la conduite des poids lourds et participe activement à l’organisation des déménagements. Sa connaissance approfondie du terrain et sa capacité à résoudre rapidement les imprévus sont des atouts majeurs pour nos clients.", aiHint: "mover portrait" },
    { name: "Serghei", role: "Déménageur / Conducteur véhicules légers", imageUrl: "https://picsum.photos/seed/serghei/200", description: "Serghei est un membre clé de notre équipe, responsable de la conduite des véhicules légers et de la gestion des déménagements de moindre envergure. Son efficacité et sa ponctualité font de lui un professionnel apprécié.", aiHint: "driver portrait" },
    { name: "Alexndr", role: "Chef d’équipe / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/alexndr/200", description: "Alexndr est un autre de nos chefs d'équipe expérimentés, alliant compétences de conduite et management sur le terrain pour garantir le succès de votre déménagement.", aiHint: "professional man portrait" }
];


export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">

            {/* Hero Section */}
             <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/happy-couple/1920/400"
                    alt="Couple heureux dans leur nouvelle maison après le déménagement"
                    fill
                    className="object-cover"
                    data-ai-hint="happy couple new home"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménagement du Vexin</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">À propos de notre entreprise</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Votre partenaire de confiance pour un déménagement serein et professionnel.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <span>A propos</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Une entreprise familiale, spécialisée dans les déménagements locaux, nationaux et internationaux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménagement du Vexin est une entreprise familiale, fièrement implantée dans le Val-d’Oise. Nous mettons à votre disposition notre expertise et notre équipe de professionnels pour gérer votre déménagement avec soin, efficacité et sécurité. Que vous soyez un particulier ou une entreprise, nous offrons des solutions personnalisées pour tous vos besoins de déménagement.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/team-work/600/400"
                            alt="Equipe de déménageurs de la société Déménagement Du Vexin"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team working"
                        />
                    </div>
                </div>
            </section>

             {/* Mission & Vision */}
            <section className="py-16 bg-muted/50">
                <div className="container grid md:grid-cols-2 gap-12">
                    <div className="flex items-start gap-6">
                        <Rocket className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold">Notre Mission</h3>
                            <p className="mt-2 text-muted-foreground">Notre mission est de rendre chaque déménagement aussi simple, rapide et sécurisé que possible, tout en offrant un service de qualité, professionnel et adapté aux besoins de chaque client. Nous sommes engagés à fournir un service personnalisé qui garantit un déménagement sans stress, que vous soyez à la recherche d’une solution locale, nationale ou internationale.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-6">
                        <Eye className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold">Notre Vision</h3>
                            <p className="mt-2 text-muted-foreground">Notre vision est d’être reconnus comme le leader du déménagement dans la région du Val-d’Oise, avec un service qui se distingue par son excellence. Nous nous engageons à fournir à nos clients une expérience de déménagement exceptionnelle, grâce à une équipe professionnelle, une planification minutieuse et une approche respectueuse des biens à transporter.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nos Valeurs</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Chez Déménagement du Vexin, nous croyons que chaque déménagement mérite une attention particulière. Voici les valeurs qui guident notre travail au quotidien :</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <Award className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Professionnalisme</h4>
                            <p className="mt-2 text-muted-foreground">Chaque membre de notre équipe est formé pour offrir un service irréprochable et garantir la sécurité de vos biens.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <ShieldCheck className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Fiabilité</h4>
                            <p className="mt-2 text-muted-foreground">Nous respectons nos engagements, du devis jusqu’à l’installation dans votre nouveau chez-vous.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                            <Heart className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Satisfaction client</h4>
                            <p className="mt-2 text-muted-foreground">Nous faisons de la satisfaction de nos clients notre priorité absolue.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-16 bg-muted/50">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                     <div className="order-2 lg:order-1">
                         <Image
                            src="https://picsum.photos/seed/truck-loading/600/400"
                            alt="3 déménageurs de la société Déménagement Du Vexin s'affairent à charger les biens d'un clients dans leur camion"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="movers loading truck"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Notre Histoire</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Fondée il y a plusieurs années par une équipe passionnée et dédiée, Déménagement du Vexin a rapidement su se faire une place sur le marché du déménagement dans le Val-d’Oise. Au fil des années, nous avons étendu nos services pour inclure des déménagements à l’échelle nationale et internationale. Aujourd’hui, notre entreprise familiale est synonyme de fiabilité, de professionnalisme et de qualité de service.
                        </p>
                    </div>
                </div>
            </section>

             {/* Why Choose Us */}
            <section className="py-16">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Pourquoi Choisir Déménagement du Vexin ?</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Voici quelques raisons pour lesquelles nos clients nous choisissent pour leur déménagement :</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Équipe expérimentée</h4>
                                    <p className="text-muted-foreground">Une équipe professionnelle qui prend soin de vos biens comme si c’était les nôtres.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Solutions personnalisées</h4>
                                    <p className="text-muted-foreground">Des solutions de déménagement adaptées à vos besoins spécifiques, qu’il s’agisse de déménagements locaux, nationaux ou internationaux.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Prix compétitifs</h4>
                                    <p className="text-muted-foreground">Des tarifs justes sans compromis sur la qualité du service.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Gestion complète</h4>
                                    <p className="text-muted-foreground">Nous pouvons prendre en charge l'emballage, le transport, l'installation et le déballage.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                     <div>
                        <Image
                            src="https://picsum.photos/seed/packing-dishes/600/400"
                            alt="Un déménageur Du Vexin en train d'emballer la vaisselle dans la cuisine d'un client"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing dishes"
                        />
                    </div>
                </div>
            </section>
            
            {/* Team Section */}
            <section className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Rencontrez Notre Équipe</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Des professionnels passionnés et expérimentés pour vous accompagner à chaque étape de votre déménagement. Chez Déménagement du Vexin, chaque membre de notre équipe joue un rôle clé pour garantir le succès de votre déménagement.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {teamMembers.map(member => (
                             <Card key={member.name} className="text-center overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <Image src={member.imageUrl} alt={`Portrait de ${member.name}`} width={200} height={200} className="h-48 w-full object-cover" data-ai-hint={member.aiHint}/>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className="text-primary font-semibold">{member.role}</p>
                                    <p className="mt-2 text-sm text-muted-foreground">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <TestimonialsSection reviews={fallbackTestimonials} />


             {/* CTA Section */}
            <section id="contact" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Demandez un devis gratuit pour votre déménagement</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Obtenez une estimation personnalisée en quelques minutes. Nous vous répondons rapidement !</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

    