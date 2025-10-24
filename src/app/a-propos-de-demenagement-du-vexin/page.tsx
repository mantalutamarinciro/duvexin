
import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FormattedReview } from "@/app/api/reviews/route";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";


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
    { name: "Marin", role: "CEO / Fondateur", imageUrl: "https://picsum.photos/seed/marin/400/500", description: "Fondateur et âme de Déménagement du Vexin, Marin supervise chaque projet avec une passion intacte. Son expérience est la garantie d'un service qui frôle la perfection.", aiHint: "company founder portrait" },
    { name: "Vitalie", role: "Chef d’équipe / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/vitalie/400/500", description: "Leader sur le terrain, Vitalie assure une organisation sans faille. Sa rigueur et son calme sont des atouts précieux pour nos déménagements les plus complexes.", aiHint: "team leader portrait" },
    { name: "Gheorghe", role: "Chef d’équipe / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/gheorghe/400/500", description: "Pilier de l'équipe, Gheorghe allie expertise de la conduite et management d'équipe pour garantir la sécurité et l'efficacité de chaque intervention.", aiHint: "truck driver portrait" },
    { name: "Andrei", role: "Déménageur / Conducteur poids lourd", imageUrl: "https://picsum.photos/seed/andrei/400/500", description: "Spécialiste de la manutention et de la logistique, Andrei est un maillon essentiel qui assure le bon déroulement de votre déménagement, du premier au dernier carton.", aiHint: "mover portrait" },
];


export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">

            {/* Hero Section */}
             <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/about-us-banner/1920/500"
                    alt="Bannière de la page À Propos"
                    fill
                    className="object-cover"
                    data-ai-hint="moving team smiling"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Déménagement du Vexin</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Votre partenaire de confiance</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Plus qu'un déménageur, une équipe familiale dédiée à la réussite de votre projet.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <span>À propos</span>
            </div>

            {/* Intro Section : Story and Mission */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-headline font-bold">Notre histoire, votre sérénité</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Fondée sur des valeurs familiales, Déménagement du Vexin est née d'une ambition simple : rendre chaque déménagement une expérience positive et humaine. Forts de plusieurs années d'expérience, nous avons su grandir tout en conservant cette proximité qui fait notre force.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                           Notre mission est de vous accompagner avec professionnalisme et bienveillance, en apportant des solutions sur-mesure, que votre projet vous mène au coin de la rue ou à l'autre bout de la France.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/company-history/600/400"
                            alt="Equipe de déménageurs travaillant ensemble"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team working together"
                        />
                    </div>
                </div>
            </section>

             {/* Values Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold">Nos Valeurs Fondamentales</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Ce qui nous guide au quotidien et garantit la qualité de notre service.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <Award className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Professionnalisme</h4>
                            <p className="mt-2 text-muted-foreground text-sm">Une équipe 100% salariée, formée et expérimentée pour un service irréprochable.</p>
                        </div>
                        <div className="text-center p-6">
                            <ShieldCheck className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Fiabilité</h4>
                            <p className="mt-2 text-muted-foreground text-sm">Respect des engagements, des délais et de votre devis. Aucune mauvaise surprise.</p>
                        </div>
                        <div className="text-center p-6">
                            <Heart className="h-10 w-10 text-primary mx-auto"/>
                            <h4 className="text-xl font-semibold mt-4">Satisfaction Client</h4>
                            <p className="mt-2 text-muted-foreground text-sm">Votre tranquillité d'esprit est notre plus grande récompense. Nous sommes à votre écoute à chaque étape.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Team Section */}
            <section className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-headline font-bold">L'équipe qui fait la différence</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Derrière chaque déménagement réussi, il y a des visages, des expertises et une passion commune pour le travail bien fait.</p>
                    </div>
                    <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member) => (
                             <Card key={member.name} className="text-center overflow-hidden">
                                <div className="relative aspect-[4/5]">
                                    <Image src={member.imageUrl} alt={`Portrait de ${member.name}`} fill className="object-cover" data-ai-hint={member.aiHint}/>
                                </div>
                                <CardContent className="p-6">
                                     <h3 className="text-xl font-bold">{member.name}</h3>
                                     <p className="font-semibold text-primary text-sm">{member.role}</p>
                                    <p className="mt-2 text-muted-foreground text-xs">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <TestimonialsSection reviews={fallbackTestimonials} />

             {/* CTA Section */}
            <section id="contact" className="py-24">
                <div className="container text-center">
                    <h2 className="text-3xl font-headline font-bold">Prêt à démarrer votre projet avec nous ?</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous pour un devis gratuit et personnalisé. Faisons connaissance !</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Obtenir mon devis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
