
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Hospital, Microscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Dr. Lemoine", text: "Déménagement de mon appartement près de l'IGR. Équipe très professionnelle, ponctuelle et discrète. Tout a été géré avec un grand soin. Je recommande.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lemoine94` },
    { id: "fallback-2", name: "Famille Martin", text: "Très bonne expérience. Devis clair et service efficace. Un déménagement sans stress à Villejuif.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MartinVJ` },
    { id: "fallback-3", name: "Société BioTech", text: "Le transfert de notre laboratoire s'est déroulé sans accroc. Une équipe qui comprend les contraintes du matériel sensible.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=BioTech94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Villejuif",
        description: "Du centre-ville aux quartiers résidentiels et aux zones d'activités, nous connaissons les accès et réglementations de la ville."
    },
    {
        icon: <Hospital className="h-8 w-8 text-primary"/>,
        title: "Proximité des Pôles Santé",
        description: "Nous avons l'habitude d'intervenir pour le personnel et les activités liées à l'Institut Gustave Roussy et aux autres centres de santé."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement à Villejuif."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement près de l'IGR ou d'un autre hôpital ?",
        answer: "Nous sommes particulièrement attentifs à ne pas perturber l'environnement et la circulation autour des pôles de santé. Nous planifions nos interventions à des heures creuses si possible et nous nous assurons que nos équipes travaillent avec la plus grande discrétion et efficacité. La réservation de stationnement est ici cruciale."
    },
    {
        question: "Déménagez-vous des équipements professionnels ou de laboratoire ?",
        answer: "Oui, nous avons une expertise dans le transfert de matériel sensible. Nous utilisons des emballages spécifiques et des techniques de manutention adaptées pour garantir la sécurité de vos équipements professionnels, qu'ils soient informatiques ou scientifiques."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Villejuif ?",
        answer: "Comme dans beaucoup de villes de la petite couronne, cela demande de l'anticipation. Nous nous en chargeons pour vous. Nous connaissons bien la procédure auprès de la mairie et nous nous assurons que tout est en ordre pour le jour J, ce qui vous libère d'un souci administratif."
    },
    {
        question: "Proposez-vous des formules pour les étudiants ou les jeunes chercheurs ?",
        answer: "Absolument. Nos formules flexibles, notamment la formule Économique, sont parfaitement adaptées aux budgets plus serrés et aux petits volumes, fréquents chez les étudiants et les jeunes actifs. N'hésitez pas à nous demander un devis."
    }
];


export default function VillejuifPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/villejuif/1920/500"
                    alt="Vue sur la ville de Villejuif"
                    fill
                    className="object-cover"
                    data-ai-hint="villejuif cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Villejuif (94800)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Villejuif, pôle d'excellence et d'innovation.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Villejuif</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Villejuif</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Villejuif, c'est s'installer dans une ville dynamique, reconnue pour ses pôles d'excellence dans la santé et la recherche, comme l'Institut Gustave Roussy. Ce dynamisme et sa proximité avec Paris en font une ville aux défis logistiques variés.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous soyez un particulier, un professionnel de santé ou une entreprise, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/villejuif-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Villejuif"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-villejuif" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Villejuif</h2>
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
                            src="https://picsum.photos/seed/villejuif-packing/600/400"
                            alt="Déménageur emballant avec soin du matériel de bureau"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing office"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Villejuif</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Transfert de bureaux et laboratoires</h4>
                                    <p className="text-muted-foreground">Un service efficace pour les entreprises et les centres de recherche, planifié pour minimiser l'impact sur votre activité.</p>
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
            <section id="faq-villejuif" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Villejuif</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Villejuif.</p>
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
            <section id="contact-villejuif" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Villejuif</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Villejuif</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
