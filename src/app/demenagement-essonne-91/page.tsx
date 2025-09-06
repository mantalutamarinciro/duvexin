
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, Microscope, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Hélène G.", text: "Un déménagement sans accroc de Paris à Évry. L'équipe était très professionnelle, ponctuelle et efficace. Je recommande vivement leurs services.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Helene91` },
    { id: "fallback-2", name: "Thomas L.", text: "Prestation de qualité pour notre pavillon à Corbeil-Essonnes. Le conseiller a bien évalué nos besoins et l'équipe sur place a été très soigneuse. Top !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Thomas91` },
    { id: "fallback-3", name: "Laboratoire Innov'Science", text: "Le transfert de notre matériel sensible sur le plateau de Saclay a été géré avec une rigueur exemplaire. Emballages spécifiques, transport sécurisé, tout était parfait.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=InnovScience91` },
];

const essonneCities = ["Évry-Courcouronnes", "Corbeil-Essonnes", "Massy", "Savigny-sur-Orge", "Sainte-Geneviève-des-Bois", "Palaiseau", "Athis-Mons", "Vigneux-sur-Seine", "Draveil", "Grigny", "Brétigny-sur-Orge", "Étampes"];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Logistique Bimodale",
        description: "Nous maîtrisons aussi bien la densité urbaine du nord de l'Essonne que les accès plus ruraux du sud du département pour une efficacité constante."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes polyvalentes",
        description: "Nos déménageurs sont formés pour gérer le déménagement de pavillons familiaux, d'appartements en résidence et de matériel professionnel."
    },
    {
        icon: <Microscope className="h-8 w-8 text-primary"/>,
        title: "Expertise Pôles Scientifiques",
        description: "Nous avons une expérience spécifique dans le transfert de matériel pour les laboratoires et entreprises des pôles de Saclay et Évry."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Service de Proximité",
        description: "Un interlocuteur unique vous accompagne pour un service personnalisé et réactif, quel que soit votre projet en Essonne."
    }
];

const faqItems = [
    {
        question: "Est-ce que vous intervenez sur le plateau de Paris-Saclay ?",
        answer: "Oui, nous avons une grande expérience des déménagements de particuliers (chercheurs, étudiants, familles) et de professionnels (laboratoires, start-ups) sur l'ensemble du plateau de Saclay, incluant des villes comme Palaiseau, Orsay, Gif-sur-Yvette et Massy. Nous connaissons les contraintes d'accès des différents campus et zones d'activités."
    },
    {
        question: "Comment se passe un déménagement dans une grande ville comme Évry-Courcouronnes ?",
        answer: "Pour les grandes villes de l'Essonne, notre priorité est la planification. Nous effectuons les demandes d'autorisation de stationnement nécessaires et planifions nos itinéraires pour éviter les congestions. Pour les immeubles de grande hauteur, nous évaluons la nécessité d'un monte-meubles pour garantir un service rapide et sécurisé."
    },
    {
        question: "Déménagez-vous les maisons avec des accès compliqués dans le sud de l'Essonne ?",
        answer: "Absolument. Nous sommes équipés de véhicules de différentes tailles pour nous adapter aux accès parfois plus étroits ou difficiles des zones rurales ou des centres-villes anciens du sud de l'Essonne. Une visite technique préalable nous permet de définir la meilleure logistique pour votre domicile."
    },
    {
        question: "Proposez-vous des formules de déménagement adaptées aux étudiants de l'Université d'Évry ou de Paris-Saclay ?",
        answer: "Oui, nous proposons des formules économiques et des solutions pour les petits volumes qui sont parfaitement adaptées aux besoins et au budget des étudiants. N'hésitez pas à nous contacter pour un devis personnalisé pour votre studio ou votre T1."
    }
];


export default function EssonnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/essonne-saclay/1920/500"
                    alt="Pôle scientifique de Paris-Saclay en Essonne (91)"
                    fill
                    className="object-cover"
                    data-ai-hint="modern university campus"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert en Essonne</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Essonne (91)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre déménagement à Évry, Corbeil-Essonnes, Saclay et dans toute l'Essonne.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Essonne (91)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un expert pour votre déménagement en Essonne, territoire d'innovation et de contrastes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager en Essonne (91), c'est composer avec un territoire aux multiples visages : des pôles urbains et économiques majeurs comme Évry et Massy, le cluster scientifique mondial de Paris-Saclay, et de vastes zones pavillonnaires et rurales plus au sud.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous comprenons cette diversité. Notre expertise nous permet d'apporter une réponse logistique précise et adaptée à chaque situation. Que vous soyez un chercheur s'installant près de Saclay, une famille emménageant dans un pavillon à Corbeil, ou une entreprise transférant ses bureaux, nous avons le savoir-faire pour faire de votre déménagement une réussite.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/evry-moving/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Évry-Courcouronnes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban setting"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-essonne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'avantage d'un professionnel pour votre projet dans le 91</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain et notre polyvalence sont vos meilleurs atouts.</p>
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
             <section id="cities-essonne" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous intervenons sur l'ensemble de l'Essonne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes couvrent la totalité du département, des portes de Paris au sud de l'Île-de-France.</p>
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                        {essonneCities.map((city) => (
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
                            src="https://picsum.photos/seed/essonne-pavillon/600/400"
                            alt="Déménagement d'une maison pavillonnaire en Essonne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="suburban house moving"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux spécificités de l'Essonne</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nos prestations répondent à la diversité des besoins de déménagement dans le 91.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de pavillons et résidences</h4>
                                    <p className="text-muted-foreground">Nous sommes spécialisés dans le déménagement de maisons individuelles avec des volumes importants.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions efficaces pour les déménagements en appartements, avec gestion des accès et des étages.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert d'entreprises et laboratoires</h4>
                                    <p className="text-muted-foreground">Un service rigoureux pour les professionnels, avec un soin particulier pour le matériel sensible.</p>
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
            <section id="faq-essonne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Essonne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 91.</p>
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
            <section id="contact-essonne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement en Essonne en toute confiance</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez-nous dès maintenant pour une analyse de vos besoins et recevez un devis gratuit et personnalisé pour votre projet dans le 91.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour l'Essonne</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
