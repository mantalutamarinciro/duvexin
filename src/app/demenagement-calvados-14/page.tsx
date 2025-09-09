
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefebvre", text: "Le déménagement de notre maison de Paris à Caen a été une vraie réussite. L'équipe a été très professionnelle et a parfaitement géré la longue distance. Bravo !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefebvre14` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client au top et une équipe de déménageurs très efficace pour mon appartement à Deauville. Je recommande vivement Déménagement du Vexin.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG14` },
    { id: "fallback-3", name: "Marc D.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Mon déménagement s'est déroulé sans stress grâce à leur organisation.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcD14` },
];

const calvadosCities = [
    { name: "Caen", link: "/demenagement-caen-14000"},
    { name: "Lisieux", link: "/demenagement-lisieux-14100"},
    { name: "Hérouville-Saint-Clair", link: "/demenagement-herouville-saint-clair-14200"},
    { name: "Bayeux", link: "/demenagement-bayeux-14400"},
    { name: "Vire", link: "/demenagement-vire-14500"},
    { name: "Ifs", link: "#"},
    { name: "Mondeville", link: "#"},
    { name: "Ouistreham", link: "#"},
    { name: "Falaise", link: "#"},
    { name: "Honfleur", link: "#"},
    { name: "Deauville", link: "#"},
    { name: "Trouville-sur-Mer", link: "#"}
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de la Normandie",
        description: "De Caen à la Côte Fleurie, notre agence d'Évreux nous offre une connaissance approfondie de tout le Calvados pour une logistique parfaite."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes Normandes Expérimentées",
        description: "Nos équipes locales sont réactives et connaissent la région, garantissant un service de proximité de haute qualité."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Soin et Protection Renforcés",
        description: "Que vous déménagiez un appartement à Caen ou une villa sur la côte, nous protégeons vos biens avec le plus grand soin."
    },
    {
        icon: <Star className="h-8 w-8 text-primary"/>,
        title: "Qualité et Fiabilité",
        description: "Un interlocuteur unique, un devis transparent et un service client à votre écoute pour un déménagement maîtrisé."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement depuis Paris vers la Côte Fleurie (Deauville, Trouville) ?",
        answer: "C'est un trajet que nous faisons régulièrement. Nous planifions l'intervention, souvent sur deux jours pour plus de confort, avec un chargement à Paris le premier jour et la livraison sur la côte le lendemain. Nous gérons toutes les autorisations de stationnement, qui peuvent être complexes en saison."
    },
    {
        question: "Assurez-vous les déménagements dans le centre ancien de Caen ?",
        answer: "Oui, nous connaissons bien les défis du centre de Caen. Une visite technique nous permet de choisir le véhicule le plus adapté aux rues parfois étroites. La réservation de stationnement, que nous gérons, est également indispensable pour une intervention efficace."
    },
    {
        question: "Intervenez-vous dans le bocage normand ou les zones plus rurales du Calvados ?",
        answer: "Absolument. Notre expertise ne se limite pas aux grandes villes. Nous sommes équipés pour intervenir dans toute la campagne normande, en adaptant notre logistique aux chemins plus étroits et aux accès spécifiques des propriétés rurales."
    },
    {
        question: "Quels sont les avantages de votre agence d'Évreux pour un déménagement dans le Calvados ?",
        answer: "Notre agence d'Évreux est notre base pour toute la Normandie. Sa position centrale nous permet d'être très réactifs pour organiser des visites techniques dans le Calvados, de planifier efficacement la logistique et de vous offrir un service de proximité par des équipes qui connaissent votre future région."
    }
];


export default function CalvadosPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/calvados/1920/500"
                    alt="Les planches de Deauville dans le Calvados (14)"
                    fill
                    className="object-cover"
                    data-ai-hint="deauville beach"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur expert en Normandie</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Calvados (14)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">De Caen à Deauville, Déménagement du Vexin vous accompagne pour votre projet dans tout le Calvados.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/zones-intervention" className="hover:text-primary">Zones d'intervention</Link>
                <span className="mx-2">&gt;</span>
                <span>Calvados (14)</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement dans le Calvados, entre terre et mer</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le Calvados (14), avec ses plages du Débarquement, ses stations balnéaires réputées comme Deauville et sa dynamique capitale, Caen, est un département plein d'attraits. Déménager ici demande une connaissance aussi bien des contraintes urbaines que des spécificités du littoral.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre solide ancrage en Normandie, nous vous offrons un service de proximité et une expertise fine du territoire. Que vous soyez un particulier ou une entreprise, nous avons la solution pour un déménagement réussi dans le Calvados.
                        </p>
                         <Button asChild className="mt-6">
                            <Link href="/demenagement-du-vexin-evreux">Découvrir notre agence normande</Link>
                         </Button>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/caen-moving/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Caen"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team city historic"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-calvados" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">L'expert normand pour votre projet dans le 14</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous sommes un acteur local et nous connaissons votre région.</p>
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
             <section id="cities-calvados" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Nous couvrons l'ensemble du Calvados</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos équipes interviennent sur toutes les communes du département.</p>
                    </div>
                     <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {calvadosCities.map((city) => (
                            <Button asChild variant={city.link === '#' ? 'outline' : 'default'} className="justify-start" key={city.name}>
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
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/honfleur-packing/600/400"
                            alt="Déménageur protégeant un meuble avec soin"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover protecting furniture"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Nos services pour votre projet dans le Calvados</h2>
                         <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de prestations pour répondre à tous vos besoins.</p>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement pour particuliers</h4>
                                    <p className="text-muted-foreground">Des formules sur-mesure pour s'adapter à votre budget et à vos besoins spécifiques.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'entreprise</h4>
                                    <p className="text-muted-foreground">Nous organisons le transfert de vos bureaux pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Garde-meubles près de chez vous</h4>
                                    <p className="text-muted-foreground">Besoin d'une solution de stockage ? Nous proposons des box sécurisés pour de courtes ou longues durées.</p>
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
            <section id="faq-calvados" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Calvados</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un projet dans le 14.</p>
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
            <section id="contact-calvados" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre déménagement dans le Calvados !</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez notre agence normande pour une étude personnalisée et recevez un devis gratuit pour votre projet dans le 14.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Mon devis pour le Calvados</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
