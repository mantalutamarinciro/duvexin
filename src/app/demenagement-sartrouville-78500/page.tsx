
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dufour", text: "Un grand merci pour notre déménagement à Sartrouville. L'équipe a été rapide, organisée et très sympathique. Une prestation sans faille.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dufour78` },
    { id: "fallback-2", name: "Karine P.", text: "Service au top pour mon appartement. Le devis était clair et l'équipe a fait preuve d'un grand professionnalisme le jour J. Je recommande chaudement.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=KarineP78` },
    { id: "fallback-3", name: "Entreprise Tech Solutions", text: "Le transfert de nos bureaux a été mené avec efficacité. Une équipe discrète qui a su respecter notre planning serré.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=TechSolutions78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance de Sartrouville",
        description: "Du centre-ville aux zones pavillonnaires du Plateau, nous connaissons les accès et spécificités de la deuxième ville des Yvelines."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons une grande expérience des déménagements de maisons avec jardin, très présentes à Sartrouville, en protégeant vos biens et vos accès."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter aussi bien aux avenues principales qu'aux rues plus résidentielles."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie, un souci en moins pour vous."
    }
];

const faqItems = [
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Sartrouville ?",
        answer: "Comme dans beaucoup de communes denses, cela demande de l'anticipation. Mais c'est notre métier de le gérer. Nous nous chargeons de la demande d'autorisation auprès de la mairie de Sartrouville pour réserver un emplacement, ce qui vous garantit la tranquillité le jour du déménagement."
    },
    {
        question: "Intervenez-vous dans le quartier du Plateau ?",
        answer: "Oui, nous connaissons très bien ce grand quartier pavillonnaire. Nos équipes sont habituées à manœuvrer dans des rues résidentielles et à protéger les maisons et leurs jardins pendant l'intervention."
    },
    {
        question: "J'ai un petit volume à déménager, proposez-vous des formules adaptées ?",
        answer: "Absolument. Nous proposons des formules flexibles, y compris pour les petits volumes (déménagement d'étudiant, studio...). Notre formule Économique, où nous nous chargeons du transport et de la manutention lourde, est souvent une excellente solution pour maîtriser son budget."
    },
    {
        question: "Comment se passe un déménagement longue distance depuis Sartrouville ?",
        answer: "Nous assurons des déménagements sur toutes les distances en France. Pour les longues distances, nous organisons des tournées optimisées pour vous offrir un tarif compétitif et un service de qualité, avec le même niveau de soin que pour un déménagement local."
    }
];


export default function SartrouvillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/sartrouville/1920/500"
                    alt="Vue sur les bords de Seine à Sartrouville"
                    fill
                    className="object-cover"
                    data-ai-hint="sartrouville cityscape seine"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Sartrouville</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Sartrouville (78500)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et locale pour les particuliers et les entreprises à Sartrouville.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Sartrouville</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les atouts de Sartrouville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Sartrouville, c'est choisir une ville dynamique et familiale aux portes de Paris et de La Défense. Avec ses nombreux quartiers pavillonnaires et ses bords de Seine, Sartrouville demande une approche de déménagement qui soit à la fois efficace et respectueuse de l'environnement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous mettons notre expertise locale à votre service. Nous connaissons les spécificités de chaque quartier et nous adaptons notre logistique pour garantir une prestation fluide, que vous emménagiez dans une maison avec jardin sur le Plateau ou un appartement en centre-ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/sartrouville-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Sartrouville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-sartrouville" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Sartrouville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain est la clé de votre tranquillité d'esprit.</p>
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
                            src="https://picsum.photos/seed/sartrouville-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Sartrouville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing suburb"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services pensés pour les habitants de Sartrouville</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec un soin apporté à la protection de vos biens et de votre propriété.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en immeuble, avec des solutions de monte-meubles si nécessaire.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules sur-mesure</h4>
                                    <p className="text-muted-foreground">De la prestation économique à la formule tout confort, nous nous adaptons à vos besoins précis.</p>
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
            <section id="faq-sartrouville" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Sartrouville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Sartrouville.</p>
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
            <section id="contact-sartrouville" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Sartrouville</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Sartrouville</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
