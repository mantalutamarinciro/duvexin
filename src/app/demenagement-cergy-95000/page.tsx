
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Home, Users, Building, Truck, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Lefevre", text: "Déménagement de notre maison dans un des villages de Cergy. L'équipe a été très professionnelle, efficace et a su s'adapter à la configuration des lieux. Nous recommandons !", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Lefevre95` },
    { id: "fallback-2", name: "Mathieu, étudiant ESSEC", text: "Service impeccable pour mon studio à Cergy-Port. La formule économique était parfaite et l'équipe a été rapide et très sympa. Idéal pour les étudiants.", rating: 5, createTime: "il y a 7 mois", avatarUrl: `https://i.pravatar.cc/48?u=MathieuE` },
    { id: "fallback-3", name: "Entreprise Innov+", text: "Le transfert de nos bureaux à Cergy-Préfecture a été géré de manière très professionnelle. Une planification rigoureuse et une exécution sans faille.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Innov95` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Cergy-Pontoise",
        description: "De l'Axe-Majeur aux étangs de Neuville, nous connaissons les 13 communes de l'agglomération pour une logistique sans faille."
    },
    {
        icon: <Building className="h-8 w-8 text-primary"/>,
        title: "Gestion des immeubles neufs et anciens",
        description: "Nos équipes sont habituées aux contraintes des résidences modernes comme à celles des bâtiments plus anciens."
    },
    {
        icon: <GraduationCap className="h-8 w-8 text-primary"/>,
        title: "Solutions pour les étudiants",
        description: "Nous proposons des formules adaptées (petits volumes, groupage) pour les étudiants de l'université et des grandes écoles de Cergy."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour un déménagement apaisé."
    }
];

const faqItems = [
    {
        question: "Je suis étudiant à CY Cergy Paris Université, proposez-vous des tarifs spéciaux ?",
        answer: "Oui, nous avons une grande expérience des déménagements étudiants à Cergy. Nous proposons des formules Économiques pour les petits volumes (studios) et pouvons organiser des déménagements groupés pour réduire les coûts. N'hésitez pas à nous contacter pour un devis personnalisé."
    },
    {
        question: "Comment se déroule un déménagement dans le Grand Centre de Cergy ?",
        answer: "C'est une zone dense que nous maîtrisons. Nous planifions l'intervention en amont, en demandant les autorisations de stationnement nécessaires. Pour les étages élevés, fréquents dans le centre, nous pouvons déployer un monte-meubles pour garantir une intervention rapide et sécurisée."
    },
    {
        question: "Déménagez-vous aussi les entreprises du parc d'activités de Saint-Christophe ?",
        answer: "Absolument. Nous avons une offre dédiée aux professionnels pour le transfert de bureaux, d'ateliers ou de stocks. Nous planifions l'opération avec vous pour minimiser l'impact sur votre activité, en intervenant si besoin en dehors des heures de bureau."
    },
    {
        question: "Quelles protections utilisez-vous pour les biens fragiles ?",
        answer: "La protection de vos affaires est notre priorité. Nous utilisons des couvertures de protection épaisses, des housses spéciales pour la literie et les canapés, et du film à bulles ou des cartons renforcés pour tous vos objets délicats comme la vaisselle, les cadres ou les écrans."
    }
];


export default function CergyPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/cergy-axe-majeur/1920/500"
                    alt="L'Axe Majeur de Cergy-Pontoise"
                    fill
                    className="object-cover"
                    data-ai-hint="cergy pontoise cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement à Cergy</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Cergy (95000)</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution experte et locale pour votre projet à Cergy et dans toute l'agglomération de Cergy-Pontoise.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-d-oise-95" className="hover:text-primary">Val-d'Oise (95)</Link>
                <span className="mx-2">&gt;</span>
                <span>Cergy</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le cœur du Val-d'Oise</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Cergy, ville centre de l'agglomération de Cergy-Pontoise, c'est s'installer dans un bassin de vie dynamique, mêlant un pôle économique et universitaire de premier plan à un cadre de vie verdoyant. Cette diversité demande une approche logistique rigoureuse.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous sommes fiers de notre parfaite maîtrise de Cergy et de ses environs. Que vous soyez un étudiant rejoignant le campus, une famille s'installant dans un pavillon ou une entreprise intégrant un parc d'activités, nous vous garantissons un déménagement serein et efficace.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/cergy-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Cergy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team modern city"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-cergy" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Cergy</h2>
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
                            src="https://picsum.photos/seed/cergy-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à Cergy"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux particuliers et professionnels de Cergy</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements et maisons</h4>
                                    <p className="text-muted-foreground">Une expertise pour tous types de logements, avec des solutions de monte-meubles si nécessaire.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement Étudiant</h4>
                                    <p className="text-muted-foreground">Des formules économiques et rapides pour les étudiants de CY Cergy Paris Université et des grandes écoles.</p>
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
            <section id="faq-cergy" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Cergy</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi à Cergy.</p>
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
            <section id="contact-cergy" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Cergy</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Cergy</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
