
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Moreau", text: "Déménagement de notre appartement à Alfortville très bien géré. L'équipe a été rapide, professionnelle et très soigneuse. Un service de qualité que je recommande.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Moreau94` },
    { id: "fallback-2", name: "David L.", text: "Très bonne expérience. Ils ont su s'adapter aux contraintes de stationnement. Équipe efficace et sympathique.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=DavidL94` },
    { id: "fallback-3", name: "Mme. Petit", text: "Je suis ravie de la prestation. Tout s'est déroulé comme prévu, sans stress et sans surprise. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=PetitA` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise d'Alfortville",
        description: "Du centre-ville aux bords de Seine, nous connaissons les rues, les accès et les réglementations de stationnement."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Spécialiste Bords de Seine",
        description: "Nous avons l'habitude de gérer les déménagements le long des quais, avec des solutions adaptées aux contraintes spécifiques."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des solutions de levage pour un service efficace et sécurisé en toutes circonstances."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement apaisé."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans les rues parfois étroites d'Alfortville ?",
        answer: "C'est une situation que nous anticipons. Grâce à une visite technique ou une analyse à distance, nous choisissons le véhicule le plus adapté. La réservation de stationnement, que nous prenons en charge, est cruciale pour nous garantir un accès optimal et minimiser la gêne."
    },
    {
        question: "Proposez-vous des formules pour les petits appartements à Alfortville ?",
        answer: "Oui, absolument. Nous avons des formules économiques qui sont idéales pour les plus petits volumes, comme les studios ou les T2. Elles vous permettent de bénéficier de notre savoir-faire professionnel pour la manutention et le transport tout en maîtrisant votre budget."
    },
    {
        question: "Est-ce difficile d'obtenir une autorisation de stationnement à Alfortville ?",
        answer: "Comme dans beaucoup de communes de la petite couronne, cela demande une bonne anticipation. Nous nous en chargeons pour vous. Nous connaissons bien la procédure auprès de la mairie et nous nous assurons que tout est en ordre pour le jour J."
    },
    {
        question: "Quelles protections utilisez-vous pour les biens fragiles et les parties communes ?",
        answer: "La protection de vos biens et des lieux est notre priorité absolue. Nous utilisons des couvertures épaisses, des housses spécifiques pour la literie et les canapés, et du film à bulles pour les objets fragiles. Nous protégeons également les parties communes (ascenseurs, couloirs) pour ne laisser aucune trace de notre passage."
    }
];


export default function AlfortvillePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/alfortville/1920/500"
                    alt="Vue sur Alfortville au confluent de la Seine et de la Marne"
                    fill
                    className="object-cover"
                    data-ai-hint="alfortville confluence seine marne"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Alfortville (94140)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Alfortville, au cœur de la confluence.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Alfortville</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville d'Alfortville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Alfortville, c'est s'installer dans une ville dynamique et idéalement située au confluent de la Seine et de la Marne. Son urbanisme, qui mêle habitat ancien et constructions modernes, demande une connaissance fine du terrain pour une logistique sans faille.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous emménagiez dans un appartement en centre-ville ou dans les quartiers plus résidentiels, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/alfortville-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Alfortville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban riverside"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-alfortville" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Alfortville</h2>
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
                            src="https://picsum.photos/seed/alfortville-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Alfortville"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants d'Alfortville</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée de vos biens et des parties communes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons</h4>
                                    <p className="text-muted-foreground">Nous gérons les déménagements de maisons avec le plus grand soin pour vos biens et votre propriété.</p>
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
            <section id="faq-alfortville" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Alfortville</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Alfortville.</p>
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
            <section id="contact-alfortville" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Alfortville</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Alfortville</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
