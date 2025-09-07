
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Dubois", text: "Étant de Méry-sur-Oise, nous avons fait appel à l'entreprise locale et nous n'avons pas été déçus ! Une équipe formidable, professionnelle et très efficace.", rating: 5, createTime: "il y a 2 mois", avatarUrl: `https://i.pravatar.cc/48?u=Dubois95540` },
    { id: "fallback-2", name: "Sophie G.", text: "Déménagement sans stress grâce à une équipe au top. Tout était parfaitement organisé. Je recommande vivement Déménagement du Vexin.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG95540` },
    { id: "fallback-3", name: "Marc T.", text: "Le service est impeccable. Devis clair, équipe ponctuelle et matériel de qualité. Une vraie entreprise de confiance à côté de chez soi.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95540` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Notre fief, notre expertise",
        description: "Étant basés à Méry-sur-Oise, nous avons une connaissance inégalée de la ville et de ses environs, garantissant une logistique parfaite."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du déménagement local",
        description: "Nous sommes les experts pour déménager les maisons, pavillons et appartements de Méry et des communes avoisinantes."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Réactivité maximale",
        description: "Notre proximité nous permet une grande flexibilité et une réactivité optimale pour organiser des visites techniques et planifier votre projet."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Une équipe de vos voisins",
        description: "Nos déménageurs sont des professionnels de la région, fiers de servir leur communauté avec un service de qualité."
    }
];

const faqItems = [
    {
        question: "Pourquoi choisir une entreprise basée à Méry-sur-Oise pour mon déménagement ?",
        answer: "Choisir un acteur local, c'est opter pour la réactivité, la flexibilité et une connaissance parfaite du terrain. Nous connaissons les rues, les réglementations locales et pouvons plus facilement organiser une visite technique gratuite. C'est un gage de sérénité et d'efficacité."
    },
    {
        question: "Déménagez-vous aussi sur de longues distances depuis Méry-sur-Oise ?",
        answer: "Oui, bien sûr. Notre ancrage local est une force, mais nous assurons des déménagements sur toutes les distances, partout en France et en Europe. Que vous partiez pour le sud de la France ou un pays voisin, nous gérons votre projet de A à Z."
    },
    {
        question: "Quelles sont vos formules pour un petit appartement à Méry-sur-Oise ?",
        answer: "Nous proposons des formules adaptées à tous les besoins. Notre formule 'Économique' est parfaite pour les petits volumes. Vous emballez vos affaires, et nos professionnels s'occupent de la manutention et du transport sécurisé. C'est une solution idéale pour maîtriser son budget."
    },
    {
        question: "Comment protégez-vous les maisons avec jardin lors du déménagement ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété. Nous utilisons des tapis de protection pour les sols intérieurs et, si nécessaire, des plaques de roulage pour protéger votre pelouse. Le respect de votre lieu de vie est au cœur de nos priorités."
    }
];


export default function MerySurOisePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/mery-sur-oise/1920/500"
                    alt="Vue sur la ville de Méry-sur-Oise et l'Oise"
                    fill
                    className="object-cover"
                    data-ai-hint="mery sur oise cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Votre déménageur local et de confiance</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Méry-sur-Oise</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">L'expertise de votre voisin pour un déménagement réussi à Méry-sur-Oise (95540).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Méry-sur-Oise</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Déménager à Méry-sur-Oise avec l'expert local</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           En tant qu'entreprise basée à Méry-sur-Oise, nous avons une fierté et une connaissance toute particulière de notre ville. Déménager ici, c'est choisir un cadre de vie privilégié, entre le château, les bords de l'Oise et la forêt.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Faire appel à Déménagement du Vexin pour votre projet à Méry-sur-Oise, c'est faire confiance à vos voisins. Nous connaissons chaque rue, chaque résidence, chaque accès. Cette proximité est le gage d'une réactivité sans égale et d'un service véritablement personnalisé pour un déménagement en toute confiance.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/mery-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Méry-sur-Oise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team local town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-mery" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Notre engagement pour notre ville, Méry-sur-Oise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Plus qu'une zone d'intervention, c'est notre maison. Et nous en prenons soin.</p>
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
                            src="https://picsum.photos/seed/mery-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux Mérysiens</h2>
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
            <section id="faq-mery" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Méry-sur-Oise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Méry-sur-Oise.</p>
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
            <section id="contact-mery" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Méry-sur-Oise</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez vos déménageurs locaux pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Méry-sur-Oise</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
