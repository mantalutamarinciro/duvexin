
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Train } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Laurent", text: "Déménagement de notre maison à Montigny-le-Bretonneux sans aucun problème. L'équipe était professionnelle, efficace et très sympathique. Nous les recommandons vivement.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Laurent78` },
    { id: "fallback-2", name: "Société InnovTech", text: "Le transfert de nos bureaux à Saint-Quentin-en-Yvelines a été géré de manière exemplaire. Une planification rigoureuse et une exécution rapide. Des pros.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=InnovTech78` },
    { id: "fallback-3", name: "Sophie C.", text: "Très bonne expérience pour mon appartement. De la prise de contact au jour J, tout a été fluide et sans stress. Je recommande.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=SophieC78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Montigny",
        description: "Nous connaissons les différents quartiers de la ville, du Pas du Lac au Village, pour une logistique parfaitement adaptée."
    },
    {
        icon: <Train className="h-8 w-8 text-primary"/>,
        title: "Au cœur de Saint-Quentin-en-Yvelines",
        description: "Notre connaissance du pôle de SQY est un atout majeur pour les déménagements de particuliers et d'entreprises."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique polyvalente",
        description: "Que vous soyez en appartement ou en pavillon, nous avons les véhicules et le matériel pour répondre à toutes les situations."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité et sécurité",
        description: "Nous assurons la protection de vos biens avec le plus grand soin et gérons les démarches administratives pour vous."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un des villages de Montigny ?",
        answer: "Nous connaissons bien l'urbanisme spécifique de Montigny. Nous planifions l'intervention en amont, en choisissant le véhicule le plus adapté pour ne pas gêner la circulation et en protégeant les abords de votre domicile. Nos équipes sont habituées à travailler avec soin dans ces environnements résidentiels."
    },
    {
        question: "Déménagez-vous les entreprises du pôle de Saint-Quentin-en-Yvelines ?",
        answer: "Oui, c'est une part importante de notre activité. Nous proposons des services sur-mesure pour les transferts de bureaux. Nous travaillons avec vous pour établir un planning précis, souvent en dehors des heures de bureau, afin de minimiser l'impact sur votre productivité."
    },
    {
        question: "Je suis étudiant à l'UVSQ, avez-vous des formules adaptées ?",
        answer: "Absolument. Nous proposons des formules économiques et des groupages pour les petits volumes, ce qui est idéal pour les étudiants. N'hésitez pas à nous contacter pour un devis, nous trouverons la solution la plus adaptée à votre budget."
    },
    {
        question: "Comment sont protégés mes meubles fragiles ?",
        answer: "La protection de vos biens est notre priorité. Nous utilisons des couvertures épaisses, des housses spéciales pour les matelas et canapés, et du film à bulles ou des cartons renforcés pour les objets les plus délicats comme la vaisselle, les cadres ou les miroirs."
    }
];


export default function MontignyLeBretonneuxPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/montigny/1920/500"
                    alt="Vue de Montigny-le-Bretonneux"
                    fill
                    className="object-cover"
                    data-ai-hint="modern cityscape suburban"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Montigny-le-Bretonneux</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre projet à Montigny-le-Bretonneux (78180).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Montigny-le-Bretonneux</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la capitale de Saint-Quentin-en-Yvelines</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Montigny-le-Bretonneux, c'est choisir le cœur battant de l'agglomération de Saint-Quentin-en-Yvelines. Ville nouvelle, Montigny allie quartiers résidentiels aérés, pôle économique et universitaire majeur, et de nombreux espaces verts.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous comprenons parfaitement la configuration de la ville. Que vous soyez un particulier emménageant dans un pavillon, un étudiant près de l'UVSQ ou une entreprise s'installant dans la zone d'activités, nous vous offrons un service sur-mesure, fluide et efficace.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/montigny-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Montigny-le-Bretonneux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-montigny" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Montigny-le-Bretonneux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est votre meilleure garantie de sérénité.</p>
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
            
             {/* Services Section */}
            <section className="py-16">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/montigny-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing office items"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprises</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour le déménagement de votre société au sein du pôle de Saint-Quentin-en-Yvelines.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de toutes tailles, avec le plus grand soin pour vos biens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules personnalisées</h4>
                                    <p className="text-muted-foreground">De la prestation économique au service tout confort, nous nous adaptons à vos attentes.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Découvrir tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-montigny" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Montigny-le-Bretonneux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi.</p>
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
            <section id="contact-montigny" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Montigny-le-Bretonneux</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Montigny-le-Bretonneux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
