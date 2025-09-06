
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Le Goff", text: "Notre déménagement dans le quartier des Vallées à Colombes a été parfait. L'équipe était professionnelle, efficace et très sympathique. Nous les recommandons chaudement.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=LeGoff92` },
    { id: "fallback-2", name: "Amélie N.", text: "Un grand merci pour la gestion de mon déménagement à la Petite Garenne. Devis clair, équipe ponctuelle et matériel de qualité. Tout s'est déroulé sans stress.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=AmelieN92` },
    { id: "fallback-3", name: "Jonathan C.", text: "Service impeccable pour mon appartement près du centre-ville. Ils ont géré les accès et le stationnement de manière très pro. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=JonathanC92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Connaissance de Colombes",
        description: "Des Vallées à l'Arc Sportif, nous connaissons les rues, les accès et les réglementations de chaque quartier de Colombes."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons une grande expérience des déménagements de maisons, très présentes à Colombes, en protégeant vos accès et jardins."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées pour nous adapter aussi bien aux grandes avenues qu'aux rues plus résidentielles."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement auprès de la mairie de Colombes, un souci en moins."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier pavillonnaire de Colombes ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété. Nous utilisons des tapis de protection pour les sols et les pelouses si nécessaire. La taille de nos camions est adaptée pour ne pas bloquer les rues résidentielles, et la planification se fait en concertation avec vous pour minimiser la gêne pour le voisinage."
    },
    {
        question: "Intervenez-vous dans les nouveaux quartiers comme l'Arc Sportif ?",
        answer: "Oui, nous suivons de près le développement de Colombes. Nous intervenons régulièrement dans les résidences neuves et connaissons les standards d'accès de ces constructions. Nous pouvons organiser des visites techniques pour nous coordonner avec les syndics si nécessaire."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Colombes ?",
        answer: "Comme dans beaucoup de communes denses, cela demande de l'anticipation. Mais ne vous inquiétez pas, nous nous en chargeons. Nous avons l'habitude des démarches auprès des services de la mairie de Colombes et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "J'ai un petit volume à déménager depuis ou vers Colombes, avez-vous des formules adaptées ?",
        answer: "Absolument. Nous proposons des formules flexibles, y compris pour les petits volumes (déménagement d'étudiant, studio...). Notre formule Économique, où nous nous chargeons du transport et de la manutention lourde, est souvent une excellente solution pour maîtriser son budget."
    }
];


export default function ColombesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/colombes/1920/500"
                    alt="Vue sur un quartier de Colombes"
                    fill
                    className="object-cover"
                    data-ai-hint="colombes cityscape suburb"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Colombes</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Colombes (92700)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution fiable et locale pour les particuliers et les entreprises à Colombes.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Colombes</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Déménager à Colombes : l'expertise d'un professionnel local</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Colombes, avec sa mosaïque de quartiers, des zones pavillonnaires tranquilles comme La Garenne-Colombes aux projets urbains modernes, demande une approche flexible et une bonne connaissance du terrain. Déménager dans cette ville en pleine expansion requiert un partenaire de confiance.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous mettons notre expertise locale à votre service. Nous connaissons les spécificités de chaque quartier de Colombes et nous adaptons notre logistique pour garantir une prestation fluide et efficace, que vous emménagiez dans une maison avec jardin ou un appartement en centre-ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/colombes-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Colombes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-colombes" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Colombes</h2>
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
                            src="https://picsum.photos/seed/colombes-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Colombes"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover careful packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services pensés pour les habitants de Colombes</h2>
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
                                    <p className="text-muted-foreground">De la simple location de camion avec chauffeur à la prestation clé en main, vous choisissez le niveau de service qui vous convient.</p>
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
            <section id="faq-colombes" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Colombes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Colombes.</p>
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
            <section id="contact-colombes" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Colombes</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Colombes</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
