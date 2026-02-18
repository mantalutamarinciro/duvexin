import { Button } from "@/components/ui/button";
import { Award, ShieldCheck, Heart, Truck, Users, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FormattedReview } from "@/app/api/reviews/route"; // Assurez-vous que ce chemin est correct
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Composant Shadcn optionnel, sinon remplacer par une div stylisée

// --- DONNÉES STATIQUES ---

const keyStats = [
    { label: "Années d'expérience", value: "15+", icon: Award },
    { label: "Déménagements réalisés", value: "2500+", icon: Truck },
    { label: "Clients satisfaits", value: "98%", icon: Heart },
    { label: "Zones couvertes", value: "France/Europe", icon: MapPin },
];

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
    { name: "Marin", role: "CEO / Fondateur", imageUrl: "https://picsum.photos/seed/marin/400/500", description: "Fondateur et âme de Déménagement du Vexin, Marin supervise chaque projet avec une passion intacte.", aiHint: "company founder portrait" },
    { name: "Vitalie", role: "Chef d’équipe", imageUrl: "https://picsum.photos/seed/vitalie/400/500", description: "Leader sur le terrain, Vitalie assure une organisation sans faille et une rigueur exemplaire.", aiHint: "team leader portrait" },
    { name: "Gheorghe", role: "Conducteur Expert", imageUrl: "https://picsum.photos/seed/gheorghe/400/500", description: "Pilier de l'équipe, il allie expertise de la conduite poids lourd et management d'équipe.", aiHint: "truck driver portrait" },
    { name: "Andrei", role: "Déménageur Expert", imageUrl: "https://picsum.photos/seed/andrei/400/500", description: "Spécialiste de la manutention délicate, il assure la sécurité de vos biens les plus précieux.", aiHint: "mover portrait" },
];

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground flex flex-col min-h-screen">

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
                <Image 
                    src="https://picsum.photos/seed/about-us-banner/1920/1080"
                    alt="Équipe Déménagement du Vexin devant un camion"
                    fill
                    priority // Crucial pour le LCP (Core Web Vitals)
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    data-ai-hint="moving team smiling professional"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                
                <div className="relative z-10 container px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium bg-primary/90 text-primary-foreground hover:bg-primary">
                        Entreprise Familiale
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight mb-6 drop-shadow-lg">
                        Votre partenaire de confiance
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90 leading-relaxed font-light">
                        Plus qu'un simple transport, nous vous offrons la sérénité d'un nouveau départ géré par une équipe d'experts passionnés.
                    </p>
                </div>
            </section>
            
            {/* --- BREADCRUMB --- */}
            <div className="border-b bg-muted/20">
                <div className="container py-3 text-sm text-muted-foreground flex items-center gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                    <span className="text-xs">/</span>
                    <span className="font-medium text-foreground">À propos</span>
                </div>
            </div>

            {/* --- STORY & MISSION --- */}
            <section className="py-20 bg-background">
                <div className="container grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                                Notre histoire, votre sérénité
                            </h2>
                            <div className="h-1 w-20 bg-primary rounded-full"/>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                           Fondée sur des valeurs familiales fortes, <strong>Déménagement du Vexin</strong> est née d'une ambition simple : transformer une étape souvent stressante en une expérience positive et humaine.
                        </p>
                        <ul className="space-y-3 mt-4">
                            {[
                                "Une équipe 100% salariée (pas de sous-traitance opaque)",
                                "Un matériel moderne et adapté à tous les volumes",
                                "Une expertise reconnue dans le Vexin et toute la France"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-foreground font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group">
                         {/* Effet décoratif arrière-plan */}
                        <div className="absolute -inset-4 bg-primary/10 rounded-xl rotate-2 group-hover:rotate-1 transition-transform duration-300" />
                        <Image
                            src="https://picsum.photos/seed/company-history/800/600"
                            alt="Equipe de déménageurs travaillant ensemble"
                            width={800}
                            height={600}
                            className="relative rounded-lg shadow-2xl object-cover aspect-[4/3] group-hover:scale-[1.01] transition-transform duration-500"
                            data-ai-hint="moving team working together"
                        />
                    </div>
                </div>
            </section>

            {/* --- KEY STATS (NOUVEAU) --- */}
            <section className="py-12 bg-primary text-primary-foreground">
                <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {keyStats.map((stat, idx) => (
                        <div key={idx} className="space-y-2 p-4 rounded-lg bg-primary-foreground/5 backdrop-blur-sm">
                            <stat.icon className="h-8 w-8 mx-auto opacity-80" />
                            <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                            <div className="text-sm md:text-base font-medium opacity-90">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

             {/* --- VALUES SECTION --- */}
            <section className="py-24 bg-muted/30">
                 <div className="container">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-headline font-bold">Nos Piliers de Qualité</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Ce qui nous guide au quotidien pour garantir l'excellence.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Carte 1 */}
                        <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <Award className="h-8 w-8 text-primary"/>
                                </div>
                                <CardTitle className="text-xl">Excellence & Formation</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Nos équipes sont formées en continu aux techniques d'emballage et de portage. Le savoir-faire est notre première garantie.
                            </CardContent>
                        </Card>

                        {/* Carte 2 */}
                        <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                             {/* Petit badge "Populaire" ou highlight visuel */}
                             <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <ShieldCheck className="h-8 w-8 text-primary"/>
                                </div>
                                <CardTitle className="text-xl">Transparence Totale</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Des devis clairs, détaillés et sans surprise. Nous respectons nos délais et nos engagements financiers.
                            </CardContent>
                        </Card>

                        {/* Carte 3 */}
                        <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <CardHeader className="text-center pb-2">
                                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                    <Heart className="h-8 w-8 text-primary"/>
                                </div>
                                <CardTitle className="text-xl">Bienveillance</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Nous prenons soin de vos objets comme s'ils étaient les nôtres. L'humain est au cœur de notre démarche.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* --- TEAM SECTION --- */}
            <section className="py-24">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-headline font-bold">Rencontrez l'équipe</h2>
                            <p className="mt-4 text-muted-foreground text-lg">
                                Derrière chaque carton soulevé, il y a des professionnels dédiés. 
                                Chez nous, pas d'intérimaires anonymes, mais une équipe soudée.
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/contact">Rejoindre notre équipe</Link>
                        </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member) => (
                             <Card key={member.name} className="overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image 
                                        src={member.imageUrl} 
                                        alt={`Portrait de ${member.name}`} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                        data-ai-hint={member.aiHint}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-sm font-medium">{member.description}</p>
                                    </div>
                                </div>
                                <CardContent className="p-5 pt-4">
                                     <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{member.name}</h3>
                                     <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{member.role}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             <TestimonialsSection reviews={fallbackTestimonials} />

             {/* --- CTA SECTION OPTIMISÉE --- */}
            <section id="contact" className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
                {/* Éléments de fond abstraits */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"/>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"/>
                
                <div className="container text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Prêt à démarrer votre nouvelle vie ?</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-primary-foreground/90 mb-10">
                        Obtenez une estimation gratuite en moins de 2 minutes ou appelez-nous directement pour discuter de votre projet.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 h-14 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1" asChild>
                            <Link href="/demande-devis">Demander mon devis gratuit</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold text-lg px-8 h-14" asChild>
                            <Link href="/contact">Nous contacter</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}