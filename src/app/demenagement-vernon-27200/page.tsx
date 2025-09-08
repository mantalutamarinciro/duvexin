
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck, Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Roussel", text: "Notre déménagement à Vernon s'est déroulé sans le moindre accroc. L'équipe a été très professionnelle et a pris grand soin de nos affaires. Un grand merci !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Roussel27` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour mon appartement en centre-ville. Ils ont géré les accès étroits avec une grande facilité. Une entreprise sérieuse que je recommande.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD27` },
    { id: "fallback-3", name: "Sophie Lambert", text: "Efficacité, ponctualité et une équipe sympathique. Mon déménagement a été bien plus simple que je l'imaginais.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Lambert27` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Vernon",
        description: "Du centre médiéval aux quartiers plus récents, nous connaissons les accès et spécificités de la ville et de ses bords de Seine."
    },
    {
        icon: <Palette className="h-8 w-8 text-primary"/>,
        title: "Proximité de Giverny",
        description: "Nous avons l'habitude d'intervenir dans ce secteur touristique et protégé, avec le plus grand respect pour l'environnement."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous utilisons des véhicules de tailles variées et des monte-meubles pour nous adapter à toutes les configurations."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement à Vernon."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre ancien de Vernon ?",
        answer: "C'est une zone que nous connaissons bien. Une visite technique nous permet d'évaluer les accès, souvent étroits. Nous choisissons le véhicule le plus adapté et nous nous chargeons de la réservation de stationnement pour garantir une intervention efficace et minimiser la gêne."
    },
    {
        question: "Assurez-vous les déménagements longue distance depuis ou vers Vernon ?",
        answer: "Oui, notre agence d'Évreux est notre base pour toute la Normandie mais nous assurons des déménagements sur toutes les distances en France. Que vous arriviez de Paris ou partiez pour la Bretagne, nous gérons votre projet de A à Z."
    },
    {
        question: "Je déménage dans une maison avec un accès difficile, comment faites-vous ?",
        answer: "C'est une situation fréquente. Nous disposons de plusieurs tailles de véhicules et nos équipes sont expertes en manutention. Si nécessaire, nous pouvons organiser un transbordement avec un véhicule plus petit pour les derniers mètres."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function VernonPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/vernon/1920/500"
                    alt="Vue sur le Vieux Moulin de Vernon sur la Seine"
                    fill
                    className="object-cover"
                    data-ai-hint="Vernon old mill Seine"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Vernon</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Vernon (27200)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Vernon, aux portes de la Normandie.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-eure-27" className="hover:text-primary">Eure (27)</Link>
                <span className="mx-2">&gt;</span>
                <span>Vernon</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les charmes de Vernon</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Vernon, c'est choisir une ville d'art et d'histoire, appréciée pour son cadre de vie paisible au bord de la Seine et sa proximité avec Giverny. Son centre ancien et ses quartiers résidentiels demandent une approche du déménagement qui soit à la fois efficace et respectueuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Grâce à notre agence d'Évreux, Déménagement du Vexin est votre expert local. Que vous emménagiez dans une maison normande, un appartement en centre-ville ou un pavillon moderne, nous vous garantissons un déménagement serein, sécurisé et parfaitement adapté à votre nouvelle vie.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/vernon-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Vernon"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team normandy town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-vernon" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Vernon</h2>
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
                            src="https://picsum.photos/seed/vernon-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Vernon"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Vernon</h2>
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
                                    <h4 className="font-semibold">Formules flexibles</h4>
                                    <p className="text-muted-foreground">De la prestation économique au service tout confort, nous nous adaptons à vos attentes et votre budget.</p>
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
            <section id="faq-vernon" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Vernon</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Vernon.</p>
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
            <section id="contact-vernon" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Vernon</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Vernon</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
