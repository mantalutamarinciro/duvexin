
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Karim B.", text: "Super efficace pour mon déménagement à Saint-Denis. L'équipe a géré l'accès à l'immeuble et le stationnement comme des chefs. Rien à dire, c'était parfait.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Karim93` },
    { id: "fallback-2", name: "Stéphanie et Paul", text: "Nous étions stressés à l'idée de déménager à Montreuil, mais Déménagement du Vexin a rendu l'expérience très simple. Equipe ponctuelle, polie et très pro.", rating: 5, createTime: "il y a 6 mois", avatarUrl: `https://i.pravatar.cc/48?u=Stephanie93` },
    { id: "fallback-3", name: "Leila A.", text: "Service au top pour un petit volume à Aubervilliers. Le devis était compétitif et le service impeccable. Je les recommande sans hésitation.", rating: 5, createTime: "il y a 10 mois", avatarUrl: `https://i.pravatar.cc/48?u=Leila93` },
];

const seineSaintDenisCities = ["Saint-Denis", "Montreuil", "Aubervilliers", "Aulnay-sous-Bois", "Drancy", "Noisy-le-Grand", "Pantin", "Bondy", "Épinay-sur-Seine", "Bobigny", "Le Blanc-Mesnil", "Rosny-sous-Bois"];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Maîtrise de la logistique urbaine",
        description: "Nous connaissons les axes, les réglementations et les défis de chaque ville du 93 pour optimiser votre déménagement et éviter les imprévus."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes rapides et discrètes",
        description: "Nos déménageurs salariés sont formés pour travailler efficacement et avec le plus grand respect de votre voisinage dans les environnements denses."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Protection sans compromis",
        description: "Que ce soit pour un studio ou un pavillon, nous appliquons les mêmes standards élevés de protection pour tous vos biens, du plus petit au plus grand."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Devis juste et transparent",
        description: "Nous vous fournissons une estimation claire, détaillée et compétitive, sans frais cachés, adaptée à votre besoin réel dans le 93."
    }
];

const faqItems = [
    {
        question: "Est-il compliqué de déménager dans des villes denses comme Montreuil ou Saint-Denis ?",
        answer: "Cela peut l'être, mais c'est notre quotidien. Nous gérons en amont les demandes d'autorisation de stationnement, primordiales dans ces zones. Nous utilisons également des véhicules de tailles adaptées pour naviguer dans les rues potentiellement étroites et nous planifions nos interventions pour éviter les heures de forte affluence."
    },
    {
        question: "Vous occupez-vous des déménagements en étage élevé sans ascenseur ?",
        answer: "Oui, c'est une situation très fréquente en Seine-Saint-Denis. Nos équipes sont entraînées pour le portage en escalier. Si la configuration le permet et que c'est plus avantageux, nous pouvons également vous proposer l'utilisation d'un monte-meubles pour une efficacité et une sécurité accrues."
    },
    {
        question: "Déménagez-vous également les entreprises et les bureaux dans le 93 ?",
        answer: "Absolument. La Seine-Saint-Denis est un pôle économique majeur. Nous avons une grande expérience dans le transfert d'entreprises, de bureaux et d'archives. Nous planifions l'opération pour minimiser l'impact sur votre activité professionnelle."
    },
    {
        question: "Qu'est-ce qui différencie votre service dans le 93 ?",
        answer: "Notre engagement principal est de fournir un service de qualité réalisé à 100% par nos propres équipes salariées. Pas de sous-traitance. Cela garantit une fiabilité, une communication fluide et un niveau de soin constant, ce qui est particulièrement rassurant pour un déménagement dans un environnement aussi dynamique que la Seine-Saint-Denis."
    }
];


export default function SeineSaintDenisPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/seine-saint-denis/1920/500"
                    alt="Vue urbaine de la Seine-Saint-Denis"
                    fill
                    className="object-cover"
                    data-ai-hint="urban cityscape sunrise"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur de confiance en Seine-Saint-Denis</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Seine-Saint-Denis (93)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Efficacité, fiabilité et expertise locale pour votre déménagement à Saint-Denis, Montreuil et dans tout le 93.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Seine-Saint-Denis (93)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Le partenaire de votre mobilité en Seine-Saint-Denis</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager en Seine-Saint-Denis (93), au cœur du Grand Paris, demande une organisation rigoureuse et une logistique sans faille. Ce département, en pleine transformation, combine des zones résidentielles denses, des quartiers d'affaires dynamiques et d'importants axes de communication.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous mettons notre expertise à votre service pour relever ces défis. Nous maîtrisons les spécificités de chaque commune, de la gestion du stationnement à Saint-Denis à la planification des accès à Montreuil, pour vous garantir un déménagement rapide, sécurisé et sans le moindre stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/montreuil-moving/600/400"
                            alt="Camion de déménagement en action à Montreuil"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving truck urban street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-ssd" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Votre déménagement dans le 93 en toute confiance</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre approche est pensée pour vous apporter une tranquillité d'esprit totale.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUsItems.map((item, i) => (
                             <div key={i} className="text-center">
                                {item.icon}
                                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                                <p className="mt-2 text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Intervention Cities Section */}
             <section id="cities-ssd" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous intervenons sur toutes les communes du 93</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain couvre l'ensemble de la Seine-Saint-Denis.</p>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {seineSaintDenisCities.map((city) => (
                            <div key={city} className="bg-background border rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
             </section>

             {/* Services Section */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/saint-denis-packing/600/400"
                            alt="Déménageur protégeant du mobilier pour un déménagement à Saint-Denis"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés à la vie en Seine-Saint-Denis</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons des solutions sur-mesure pour chaque situation.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions optimisées pour les déménagements en immeuble, avec ou sans ascenseur.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la formule économique à la prestation tout confort, nous nous adaptons à votre budget.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Explorer tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-ssd" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Seine-Saint-Denis</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Les réponses à vos questions pour déménager l'esprit tranquille dans le 93.</p>
                    </div>
                    <Accordion type="single" collapsible className="w-full mt-12">
                        {faqItems.map((item, i) => (
                            <AccordionItem value={`item-${i}`} key={i}>
                                <AccordionTrigger className="text-lg text-left hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

             {/* CTA Section */}
            <section id="contact-ssd" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement en Seine-Saint-Denis</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous dès maintenant pour discuter de votre projet dans le 93 et recevez un devis gratuit, détaillé et sans engagement.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour la Seine-Saint-Denis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
