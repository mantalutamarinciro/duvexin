
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Ship, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Bernard", text: "Notre déménagement à Conflans a été une vraie réussite. L'équipe a été très professionnelle et a su s'adapter aux accès parfois étroits du centre. Un grand merci !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Bernard78` },
    { id: "fallback-2", name: "Nathalie D.", text: "Un service de grande qualité. Devis clair, équipe ponctuelle et matériel adapté. Déménager près des quais de Seine a été bien plus simple que je ne l'imaginais.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=NathalieD78` },
    { id: "fallback-3", name: "Marc T.", text: "Efficacité et bonne humeur, je recommande Déménagement du Vexin pour tout projet à Conflans-Sainte-Honorine. Des vrais pros !", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT78` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Conflans",
        description: "Du Pointil aux quais de Seine, en passant par les hauteurs, nous connaissons les accès et spécificités de la capitale de la batellerie."
    },
    {
        icon: <Ship className="h-8 w-8 text-primary"/>,
        title: "Gestion des Quais",
        description: "Nous avons l'habitude de gérer les déménagements le long des quais, avec des solutions adaptées aux contraintes de circulation et de stationnement."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique Adaptée",
        description: "Nous gérons les autorisations et déployons si nécessaire des monte-meubles pour les appartements en étage donnant sur les quais ou en centre-ville."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes fiables et soignées",
        description: "Nos déménageurs salariés sont formés pour travailler avec soin et efficacité, en respectant vos biens et votre voisinage."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre ancien de Conflans ?",
        answer: "Nous connaissons bien les défis du centre-ville, avec ses rues parfois étroites. Nous effectuons une analyse préalable pour choisir le véhicule le plus adapté. Nous nous chargeons également de la réservation de stationnement pour garantir un emplacement au plus près de votre domicile."
    },
    {
        question: "Déménager près des quais de Seine à Conflans pose-t-il un problème ?",
        answer: "Non, c'est une zone que nous maîtrisons. Nous sommes conscients des contraintes de circulation et de stationnement sur les quais. Nous planifions nos interventions pour être les plus efficaces possible, souvent en évitant les heures de pointe et en sécurisant notre zone de travail."
    },
    {
        question: "Proposez-vous des formules de déménagement pour les petites surfaces ?",
        answer: "Oui, absolument. Nous avons des formules économiques et des solutions pour les petits volumes (studios, T1) qui sont idéales pour les jeunes actifs ou les étudiants. N'hésitez pas à nous demander un devis, il est gratuit et sans engagement."
    },
    {
        question: "Comment sont protégés mes meubles pendant un déménagement à Conflans ?",
        answer: "La protection de vos biens est notre priorité. Tous vos meubles sont systématiquement protégés sous des couvertures de déménagement épaisses. Les éléments plus fragiles (matelas, canapés) sont placés dans des housses spécifiques. Nous utilisons également du film à bulles et des cartons spéciaux pour la vaisselle ou les objets de valeur."
    }
];


export default function ConflansPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/conflans/1920/500"
                    alt="Vue sur les quais de Seine à Conflans-Sainte-Honorine"
                    fill
                    className="object-cover"
                    data-ai-hint="conflans sainte honorine seine river"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Conflans</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Conflans-Sainte-Honorine</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre déménagement dans la capitale de la batellerie (78700).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-yvelines-78" className="hover:text-primary">Yvelines (78)</Link>
                <span className="mx-2">&gt;</span>
                <span>Conflans-Sainte-Honorine</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît les charmes et les défis de Conflans</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Conflans-Sainte-Honorine, c'est choisir une ville au caractère unique, marquée par son histoire fluviale. Cette spécificité, avec ses quais animés, ses rues charmantes et parfois étroites, demande une approche logistique flexible et une excellente connaissance du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise locale. Que vous emménagiez dans un appartement avec vue sur la Seine, une maison sur les hauteurs ou même une péniche, nous vous garantissons un déménagement serein, efficace et parfaitement adapté à votre nouvelle vie à Conflans.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/conflans-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Conflans-Sainte-Honorine"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team river city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-conflans" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Conflans</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre expertise locale est votre meilleur atout pour un déménagement réussi.</p>
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
                            src="https://picsum.photos/seed/conflans-packing/600/400"
                            alt="Déménageur emballant avec soin des objets fragiles à Conflans"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover fragile packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Conflans</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques.</p>
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
            <section id="faq-conflans" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Conflans</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Conflans-Sainte-Honorine.</p>
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
            <section id="contact-conflans" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Conflans</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Conflans</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
