
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, TreePine, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Petit", text: "Nous avons déménagé dans une maison près de la forêt de Rambouillet. L'équipe a été formidable, très prudente avec nos affaires et l'environnement. Un grand merci !", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Petit78` },
    { id: "fallback-2", name: "Vincent L.", text: "Service très professionnel pour mon appartement en centre-ville de Rambouillet. Ils ont géré les accès et le stationnement sans aucun souci. Je recommande.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=VincentL78` },
    { id: "fallback-3", name: "Catherine D.", text: "Efficacité, ponctualité et bonne humeur. Mon déménagement a été bien plus simple que je ne l'imaginais. Une entreprise sérieuse et fiable.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=CatherineD78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Rambouillet",
        description: "Du centre-ville aux hameaux en forêt, nous connaissons les accès et spécificités de Rambouillet et de son territoire."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Spécialiste des zones naturelles",
        description: "Nous intervenons avec un soin particulier pour respecter l'environnement privilégié de la forêt de Rambouillet lors de nos interventions."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique polyvalente",
        description: "Nous utilisons des véhicules adaptés aussi bien aux rues du centre historique qu'aux chemins plus isolés en lisière de forêt."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons les demandes d'autorisation de stationnement auprès de la mairie, une étape clé pour un déménagement en toute tranquillité."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans une maison avec un accès difficile en forêt de Rambouillet ?",
        answer: "C'est une situation que nous connaissons bien. Une visite technique est essentielle pour évaluer la situation. Nous pouvons utiliser des véhicules plus petits pour les derniers mètres si nécessaire, et nos équipes sont expertes en manutention sur de longues distances ou sur des terrains accidentés. La protection de la nature environnante est également une de nos priorités."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement en centre-ville de Rambouillet ?",
        answer: "Le centre-ville a ses contraintes, mais nous nous occupons de tout. Nous déposons la demande d'autorisation de stationnement auprès des services municipaux pour vous, afin de garantir un emplacement réservé le jour J. Cela fait partie intégrante de notre service."
    },
    {
        question: "Proposez-vous des formules pour les petits déménagements à Rambouillet ?",
        answer: "Oui, absolument. Nous avons des formules économiques et des solutions pour les petits volumes (studios, petits appartements) qui sont idéales si vous avez un budget maîtrisé mais que vous souhaitez quand même bénéficier de l'efficacité de professionnels pour la partie la plus physique."
    },
    {
        question: "Déménagez-vous depuis ou vers Rambouillet sur de longues distances ?",
        answer: "Oui. Bien que nous soyons des experts locaux, nous assurons des déménagements nationaux depuis Rambouillet vers toutes les régions de France, et inversement. Nous gérons la logistique longue distance avec le même soin et la même rigueur que pour un déménagement local."
    }
];


export default function RambouilletPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/rambouillet-foret/1920/500"
                    alt="La forêt de Rambouillet en automne"
                    fill
                    className="object-cover"
                    data-ai-hint="rambouillet forest autumn"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Rambouillet</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Rambouillet (78120)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte pour votre déménagement au cœur de la forêt et du patrimoine des Yvelines.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Rambouillet</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le cadre unique de Rambouillet</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Rambouillet, c'est choisir un cadre de vie exceptionnel, entre un centre-ville historique de caractère et un environnement naturel prestigieux avec sa forêt domaniale. Ce cadre unique demande une approche de déménagement qui soit à la fois respectueuse et efficace.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance approfondie de Rambouillet et de ses environs. Que vous emménagiez dans un appartement en centre-ville ou dans une maison en lisière de forêt, nous planifions chaque intervention avec soin pour garantir un service impeccable, qui préserve votre nouveau lieu de vie.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/rambouillet-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Rambouillet"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team forest house"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-rambouillet" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Rambouillet</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est votre meilleure garantie pour un déménagement serein.</p>
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
                            src="https://picsum.photos/seed/rambouillet-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Rambouillet"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations adaptées à votre projet à Rambouillet</h2>
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
                                    <p className="text-muted-foreground">Nous gérons les contraintes liées aux étages et aux accès en centre-ville, avec des solutions de monte-meubles si nécessaire.</p>
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
            <section id="faq-rambouillet" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Rambouillet</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Rambouillet.</p>
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
            <section id="contact-rambouillet" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Rambouillet</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis gratuit et adapté.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Rambouillet</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
