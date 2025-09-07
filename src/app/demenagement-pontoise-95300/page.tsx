
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Moreau", text: "Déménagement dans le centre ancien de Pontoise. L'équipe a été très pro pour gérer les rues étroites. Un grand bravo pour leur organisation !", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Moreau95` },
    { id: "fallback-2", name: "Sophie G.", text: "Un service client à l'écoute et une équipe de déménageurs très efficace pour mon appartement. Je recommande Déménagement du Vexin sans hésiter.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=SophieG95` },
    { id: "fallback-3", name: "Marc T.", text: "Devis clair, équipe ponctuelle et matériel de qualité. Mon déménagement à Pontoise a été bien plus simple que je ne l'imaginais grâce à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=MarcT95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Pontoise",
        description: "Du quartier de l'Hermitage au centre-ville, nous connaissons les particularités de la ville d'Art et d'Histoire pour une logistique fluide."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Centre Ancien",
        description: "Nous avons l'habitude des accès difficiles, des rues pavées et de la manutention délicate dans les immeubles de caractère."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique sur mesure",
        description: "Nous utilisons des véhicules de tailles variées et des monte-meubles pour nous adapter à toutes les situations à Pontoise."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, un souci en moins pour un déménagement en centre-ville."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans le centre historique de Pontoise ?",
        answer: "C'est un défi que nous aimons relever ! Nous réalisons une visite technique en amont pour évaluer les accès et choisir le véhicule le plus adapté. Nous nous chargeons de la réservation de stationnement auprès de la mairie, ce qui est crucial pour garantir un emplacement et travailler efficacement."
    },
    {
        question: "Déménagez-vous aussi dans les nouveaux quartiers ou les communes alentours ?",
        answer: "Oui, notre connaissance de l'agglomération de Cergy-Pontoise est complète. Nous intervenons dans tous les quartiers de Pontoise et dans les villes voisines avec la même efficacité et le même professionnalisme."
    },
    {
        question: "Proposez-vous des formules pour les étudiants de Pontoise ?",
        answer: "Oui, absolument. Nous avons des formules économiques et des solutions pour les petits volumes (studios, T1) qui sont idéales pour les étudiants, notamment ceux de l'université de Cergy-Pontoise. N'hésitez pas à nous contacter pour un devis adapté."
    },
    {
        question: "Comment protégez-vous mes meubles fragiles ?",
        answer: "La protection est notre priorité. Tous vos meubles sont protégés sous des couvertures de déménagement épaisses. Les éléments plus fragiles (matelas, canapés) sont placés dans des housses spécifiques. Pour la vaisselle et les objets d'art, nous utilisons des cartons renforcés et du papier bulle."
    }
];


export default function PontoisePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/pontoise/1920/500"
                    alt="Vue sur la cathédrale Saint-Maclou de Pontoise"
                    fill
                    className="object-cover"
                    data-ai-hint="pontoise cathedral cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Pontoise</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Pontoise (95300)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet dans la ville d'Art et d'Histoire.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Pontoise</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît l'histoire et les défis de Pontoise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Pontoise, ville au riche passé médiéval et au charme préservé, demande une approche respectueuse et une logistique précise. Le centre historique, avec ses rues pavées et ses accès parfois étroits, est un défi que seuls des professionnels locaux peuvent relever avec succès.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre expertise sur Pontoise. Que vous emménagiez dans un appartement de caractère, une maison de ville ou un quartier plus récent, nous vous garantissons un déménagement serein, efficace et qui respecte le patrimoine unique de la ville.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/pontoise-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Pontoise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team historic town"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-pontoise" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Pontoise</h2>
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
                            src="https://picsum.photos/seed/pontoise-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Pontoise"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Pontoise</h2>
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
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec jardin et accès spécifiques, avec le plus grand soin.</p>
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
            <section id="faq-pontoise" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Pontoise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Pontoise.</p>
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
            <section id="contact-pontoise" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Pontoise</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Pontoise</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
