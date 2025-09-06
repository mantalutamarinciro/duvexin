
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, ShieldCheck, Star, Users, Building, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";
import type { FormattedReview } from "@/app/api/reviews/route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-2", name: "Famille Petit", text: "Un grand merci pour notre déménagement à Boulogne-Billancourt. Équipe très soigneuse et professionnelle. Le monte-meubles a été une solution parfaite pour notre piano.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Petit92` },
    { id: "fallback-1", name: "Société HexaCorp", text: "Le transfert de nos bureaux à La Défense a été un succès total. L'équipe a été discrète, rapide et incroyablement organisée. Aucune interruption d'activité.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=HexaCorp92` },
    { id: "fallback-3", name: "Anne-Sophie V.", text: "Service impeccable pour mon appartement à Neuilly-sur-Seine. Le devis était clair et l'équipe a été ponctuelle et efficace. Je recommande chaudement.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=AnneSophie92` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Boulogne-Billancourt",
        description: "Du Pont de Sèvres à la Route de la Reine, nous connaissons chaque rue et ses contraintes pour une logistique sans faille."
    },
    {
        icon: <Users className="h-8 w-8 text-primary"/>,
        title: "Équipes habituées aux accès boulonnais",
        description: "Nos déménageurs sont formés pour les appartements haussmanniens comme pour les résidences modernes, avec discrétion et efficacité."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Solutions Monte-Meubles",
        description: "Indispensable à Boulogne, nous gérons l'installation et les autorisations pour un passage par fenêtre rapide et sécurisé."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Gestion des Autorisations",
        description: "Nous nous occupons des demandes de stationnement auprès de la mairie de Boulogne-Billancourt pour vous libérer de cette contrainte."
    }
];

const faqItems = [
    {
        question: "Comment se passe un déménagement dans une rue commerçante de Boulogne ?",
        answer: "Nous planifions l'intervention avec soin, souvent en dehors des heures de pointe. Nous gérons la demande d'autorisation de stationnement bien en amont pour garantir un emplacement réservé au camion, ce qui minimise la gêne pour les riverains et assure une efficacité maximale pour votre déménagement."
    },
    {
        question: "Le monte-meubles est-il vraiment nécessaire pour un appartement à Boulogne ?",
        answer: "C'est souvent la solution la plus sûre et la plus rapide, surtout pour les étages élevés ou dans les immeubles avec des cages d'escalier étroites. Cela protège vos meubles les plus volumineux (canapé, piano, etc.) et les parties communes de l'immeuble. Nous évaluons ce besoin lors de notre visite technique gratuite."
    },
    {
        question: "Déménagez-vous aussi des entreprises à Boulogne-Billancourt ?",
        answer: "Oui, Boulogne-Billancourt est un pôle économique majeur et nous avons une grande expérience dans le transfert de bureaux et de sièges sociaux. Nous proposons des services adaptés aux professionnels pour assurer une transition rapide et minimiser l'impact sur votre activité."
    },
    {
        question: "Quels sont vos délais d'intervention pour un déménagement à Boulogne ?",
        answer: "Grâce à notre forte présence dans les Hauts-de-Seine, nous sommes très réactifs. Nous recommandons de nous contacter 3 à 4 semaines à l'avance, mais nous pouvons souvent trouver des créneaux pour des besoins plus urgents. N'hésitez pas à nous appeler pour discuter de votre projet."
    }
];


export default function BoulogneBillancourtPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/boulogne/1920/500"
                    alt="Vue sur la ville de Boulogne-Billancourt"
                    fill
                    className="object-cover"
                    data-ai-hint="boulogne billancourt cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">L'expert de votre déménagement à Boulogne</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Boulogne-Billancourt</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution professionnelle et locale pour votre déménagement à Boulogne-Billancourt (92100).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-hauts-de-seine-92" className="hover:text-primary">Hauts-de-Seine (92)</Link>
                <span className="mx-2">&gt;</span>
                <span>Boulogne-Billancourt</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Votre déménagement à Boulogne-Billancourt, géré par des spécialistes</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Boulogne-Billancourt, ville dynamique et dense aux portes de Paris, demande une expertise particulière. Entre les avenues haussmanniennes, les résidences modernes et les rues commerçantes, les défis logistiques sont nombreux : stationnement, accès, étages élevés...
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous avons fait de Boulogne-Billancourt l'un de nos terrains d'intervention privilégiés. Nos équipes connaissent la ville, anticipent les contraintes et déploient des solutions sur-mesure (monte-meubles, gestion des autorisations) pour que votre déménagement soit une expérience simple et positive.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/boulogne-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Boulogne-Billancourt"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team urban"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-boulogne" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Votre déménageur de confiance à Boulogne-Billancourt</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Notre connaissance du terrain et notre organisation sont vos meilleurs atouts.</p>
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
                            src="https://picsum.photos/seed/boulogne-packing/600/400"
                            alt="Déménageur emballant de la vaisselle pour un déménagement à Boulogne"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="mover packing dishes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services sur-mesure pour votre projet boulonnais</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Du studio au grand appartement familial, nous adaptons notre logistique et nos équipes.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Formules adaptées à vos besoins</h4>
                                    <p className="text-muted-foreground">De la formule économique où vous participez, à la formule tout confort où nous gérons tout.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de bureaux</h4>
                                    <p className="text-muted-foreground">Un service efficace et discret pour les nombreuses entreprises de Boulogne.</p>
                                </div>
                            </li>
                        </ul>
                         <Button asChild className="mt-8" variant="outline">
                            <Link href="/services">Explorer tous nos services</Link>
                         </Button>
                    </div>
                </div>
            </section>
            
            <TestimonialsSection reviews={fallbackTestimonials} />
            
            {/* FAQ Section */}
            <section id="faq-boulogne" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Boulogne</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses à vos questions pour un déménagement réussi à Boulogne-Billancourt.</p>
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
            <section id="contact-boulogne" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Lancez votre projet de déménagement à Boulogne-Billancourt</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes locaux pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Boulogne-Billancourt</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
