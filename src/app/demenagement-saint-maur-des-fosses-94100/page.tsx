
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, Waves, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Gauthier", text: "Un déménagement géré de main de maître à Saint-Maur. L'équipe a été d'un grand professionnalisme et d'une précaution extrême avec nos meubles de famille. Nous les recommandons chaudement.", rating: 5, createTime: "il y a 4 mois", avatarUrl: `https://i.pravatar.cc/48?u=Gauthier94` },
    { id: "fallback-2", name: "Hélène B.", text: "Le service était impeccable. Ils ont su gérer les accès pas évidents de ma rue et protéger les parties communes avec beaucoup de soin. Une entreprise très sérieuse.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=HeleneB94` },
    { id: "fallback-3", name: "Dr. Marchand", text: "Ponctualité, efficacité et discrétion. Le déménagement de mon cabinet s'est déroulé sans le moindre souci. Je ferai de nouveau appel à eux.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Marchand94` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Saint-Maur",
        description: "De La Varenne au Parc, nous connaissons chaque quartier, chaque pont, et chaque particularité de la boucle de la Marne."
    },
    {
        icon: <Gem className="h-8 w-8 text-primary"/>,
        title: "Respect des Demeures de Prestige",
        description: "Nous intervenons avec un soin infini dans les maisons de maître et les appartements de standing, protégeant parquets, moulures et jardins."
    },
    {
        icon: <Waves className="h-8 w-8 text-primary"/>,
        title: "Logistique des Bords de Marne",
        description: "Nous maîtrisons les accès parfois étroits et les contraintes spécifiques liées à la proximité de la rivière."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous nous chargeons des demandes d'autorisation de stationnement, une démarche indispensable dans de nombreuses rues de Saint-Maur."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans une maison avec jardin à La Varenne Saint-Hilaire ?",
        answer: "Nous avons une grande expérience de ces déménagements. Une visite technique est réalisée pour évaluer les accès et les protections nécessaires (sols, pelouse...). Nous utilisons du matériel adapté pour la manutention afin de protéger votre propriété et de garantir la sécurité de vos biens les plus lourds."
    },
    {
        question: "Est-il difficile d'obtenir une autorisation de stationnement à Saint-Maur-des-Fossés ?",
        answer: "Le stationnement peut être complexe dans certaines rues. C'est pourquoi nous intégrons systématiquement cette prestation dans nos formules. Nous gérons la demande auprès de la mairie pour vous assurer un emplacement au plus près le jour J, ce qui est essentiel pour une opération efficace."
    },
    {
        question: "Déménagez-vous les pianos et autres objets d'art ?",
        answer: "Oui, c'est l'une de nos spécialités. Saint-Maur abrite de belles demeures avec des objets de valeur. Nos équipes sont formées et équipées pour l'emballage et le transport sécurisé de pianos, de tableaux ou de mobilier fragile. Nous pouvons proposer des assurances complémentaires sur mesure."
    },
    {
        question: "Quelles sont vos formules pour un appartement en centre-ville ?",
        answer: "Nous proposons des formules adaptées à tous les volumes. Pour les appartements, notamment dans les étages sans ascenseur, nous évaluons l'utilité d'un monte-meubles. De la formule Économique à la formule Confort, nous avons la solution qui correspond à vos besoins et à votre budget."
    }
];


export default function SaintMaurPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/saint-maur/1920/500"
                    alt="Bords de Marne à Saint-Maur-des-Fossés"
                    fill
                    className="object-cover"
                    data-ai-hint="saint maur des fosses marne river"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Saint-Maur</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Saint-Maur-des-Fossés</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Un service d'exception pour un déménagement à la hauteur de votre adresse à Saint-Maur-des-Fossés (94100).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Saint-Maur-des-Fossés</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui comprend le prestige de Saint-Maur</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Saint-Maur-des-Fossés, ville-jardin prisée pour sa qualité de vie exceptionnelle, demande un savoir-faire et une attention de tous les instants. Ses belles demeures, ses appartements de standing et ses accès spécifiques sur la boucle de la Marne requièrent l'intervention de véritables professionnels.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons développé une expertise pointue pour ce type d'environnement. Nous planifions chaque déménagement avec une rigueur et un soin extrêmes pour préserver votre patrimoine et vous garantir une expérience fluide, discrète et à la hauteur de vos exigences.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/saint-maur-move/600/400"
                            alt="Équipe de déménagement professionnelle intervenant à Saint-Maur-des-Fossés"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team luxury house"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-saint-maur" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire privilégié pour déménager à Saint-Maur</h2>
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
                            src="https://picsum.photos/seed/saint-maur-packing/600/400"
                            alt="Déménageur emballant avec soin une vaisselle de valeur"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing fine china"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des prestations sur-mesure pour votre projet saint-maurien</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons de maître et villas</h4>
                                    <p className="text-muted-foreground">Une logistique adaptée aux grands volumes et à la manipulation d'objets précieux et encombrants.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements de standing</h4>
                                    <p className="text-muted-foreground">Une expertise pointue pour la protection de vos biens et des parties communes prestigieuses.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formule "Prestige" clé en main</h4>
                                    <p className="text-muted-foreground">Nous nous occupons de tout : emballage intégral de vos biens, déballage, remontage et installation pour votre confort absolu.</p>
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
            <section id="faq-saint-maur" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Saint-Maur</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Saint-Maur-des-Fossés.</p>
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
            <section id="contact-saint-maur" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Saint-Maur-des-Fossés</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos conseillers pour une étude personnalisée de votre projet et obtenez un devis à la hauteur de vos attentes.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Saint-Maur-des-Fossés</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
