
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Garnier", text: "Déménagement de notre maison au Perreux géré avec un soin et un professionnalisme remarquables. L'équipe a été attentive à chaque détail. Un vrai service premium.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Garnier94` },
    { id: "fallback-2", name: "Isabelle L.", text: "Très satisfaite de la prestation. Ils ont géré les accès sur les bords de Marne avec une grande efficacité. Je recommande cette entreprise sérieuse et fiable.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=IsabelleL94` },
    { id: "fallback-3", name: "M. et Mme Bernard", text: "Ponctualité, efficacité et une équipe très respectueuse. Notre déménagement a été une expérience positive du début à la fin.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Bernard94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise du Perreux",
        description: "Nous connaissons chaque quartier, des Joncs-Marins au centre-ville, pour une logistique parfaitement huilée."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Belles Demeures",
        description: "Nous intervenons avec un soin infini dans les maisons de caractère et les résidences de standing, en protégeant les lieux et vos biens."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Marne",
        description: "Nous maîtrisons les accès parfois étroits et les contraintes spécifiques liées à la proximité de la rivière."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager en toute tranquillité."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une rue étroite du Perreux ?",
        answer: "C'est une situation fréquente que nous maîtrisons. Une visite technique nous permet de choisir le véhicule le plus adapté. La réservation de stationnement, que nous prenons en charge, est essentielle pour garantir une place et une intervention efficace, en minimisant la gêne pour le voisinage."
    },
    {
        question: "Déménagez-vous les maisons avec des objets de valeur ?",
        answer: "Oui, c'est l'une de nos spécialités. Nous proposons un service d'emballage professionnel pour vos biens les plus fragiles (vaisselle, œuvres d'art, etc.) et nos équipes sont formées pour manipuler les meubles de valeur avec le plus grand soin. Des assurances complémentaires peuvent aussi être souscrites."
    },
    {
        question: "Est-il difficile d'obtenir une autorisation de stationnement au Perreux-sur-Marne ?",
        answer: "Le stationnement peut y être réglementé. C'est pourquoi nous incluons la gestion de cette démarche dans nos prestations. Nous nous occupons des formalités auprès de la mairie pour vous garantir un emplacement réservé, ce qui est un gage de sérénité et d'efficacité."
    },
    {
        question: "Quelles sont vos formules pour un appartement ?",
        answer: "Nous proposons des formules flexibles pour tous les volumes. Pour les appartements, notamment dans les étages sans ascenseur, nous évaluons l'utilité d'un monte-meubles. De la formule Économique à la formule Confort où nous nous occupons de tout, nous avons la solution qui vous convient."
    }
];


export default function LePerreuxSurMarnePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/le-perreux/1920/500"
                    alt="Bords de Marne au Perreux-sur-Marne"
                    fill
                    className="object-cover"
                    data-ai-hint="le perreux sur marne riverside"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement au Perreux</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Le Perreux-sur-Marne</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'excellence pour un déménagement à la hauteur de la perle de l'Est parisien (94170).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Le Perreux-sur-Marne</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le cadre de vie du Perreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager au Perreux-sur-Marne, c'est choisir un cadre de vie privilégié, réputé pour son charme, ses belles demeures et ses bords de Marne. Ce caractère résidentiel et prestigieux demande un service de déménagement à la hauteur, alliant efficacité, soin et discrétion.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons une connaissance approfondie du Perreux. Que vous emménagiez dans une maison meulière, un appartement de standing ou une résidence moderne, nous planifions chaque détail pour préserver votre patrimoine et vous garantir une installation en toute sérénité.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/le-perreux-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant au Perreux-sur-Marne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team luxury suburb"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-le-perreux" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager au Perreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise est votre meilleure garantie pour un déménagement sans fausse note.</p>
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
                            src="https://picsum.photos/seed/le-perreux-packing/600/400"
                            alt="Déménageur emballant avec soin de la vaisselle de valeur"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fragile items"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet perreuxien</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons de caractère</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets précieux et encombrants.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de standing</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout : emballage intégral, déballage, remontage et installation pour votre confort absolu.</p>
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
            <section id="faq-le-perreux" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Le Perreux</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi au Perreux-sur-Marne.</p>
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
            <section id="contact-le-perreux" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement au Perreux-sur-Marne</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Le Perreux</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
