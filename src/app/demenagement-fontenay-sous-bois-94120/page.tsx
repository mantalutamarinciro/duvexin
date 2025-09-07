
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Building, TreePine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Laurent", text: "Notre déménagement à Fontenay s'est très bien passé. L'équipe a été efficace, soigneuse et très professionnelle. Nous recommandons sans hésiter.", rating: 5, createTime: "il y a 5 mois", avatarUrl: `https://i.pravatar.cc/48?u=Laurent94` },
    { id: "fallback-2", name: "Claire D.", text: "Très bonne expérience pour mon appartement près du bois. Devis clair et équipe ponctuelle. Un déménagement réalisé sans le moindre stress.", rating: 5, createTime: "il y a 9 mois", avatarUrl: `https://i.pravatar.cc/48?u=ClaireD94` },
    { id: "fallback-3", name: "M. Petit", text: "Un grand merci à l'équipe pour son professionnalisme. Ils ont géré les accès et le stationnement avec efficacité.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=Petit94FSB` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de Fontenay",
        description: "Des Rigollots au Val-de-Fontenay, nous connaissons les rues, les accès et les réglementations pour une logistique sans faille."
    },
    {
        icon: <TreePine className="h-8 w-8 text-primary"/>,
        title: "Proximité du Bois de Vincennes",
        description: "Nous avons l'habitude d'intervenir dans les quartiers résidentiels calmes et verdoyants en bordure du bois."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary"/>,
        title: "Logistique et Monte-Meubles",
        description: "Nous gérons les autorisations et déployons des solutions de levage pour un service efficace, même dans les rues étroites."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans les quartiers pavillonnaires de Fontenay ?",
        answer: "Nous sommes spécialisés dans le déménagement de pavillons. Nous effectuons une visite technique pour évaluer le volume et les accès. Le jour J, nous protégeons vos sols, vos murs et vos extérieurs, et nous utilisons des véhicules adaptés pour ne pas gêner le voisinage."
    },
    {
        question: "Intervenez-vous dans le quartier d'affaires du Val de Fontenay ?",
        answer: "Oui, nous avons une offre spécifique pour les professionnels. Nous réalisons des transferts de bureaux et d'entreprises en planifiant l'intervention pour minimiser l'impact sur votre activité, y compris en dehors des heures de bureau si nécessaire."
    },
    {
        question: "Est-il difficile d'obtenir une autorisation de stationnement à Fontenay-sous-Bois ?",
        answer: "Comme dans beaucoup de communes de la petite couronne, cela demande de l'anticipation. Nous nous en chargeons pour vous. Nous connaissons la procédure auprès de la mairie et nous assurons d'obtenir les autorisations à temps pour le jour de votre déménagement."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function FontenaySousBoisPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/fontenay/1920/500"
                    alt="Vue sur la ville de Fontenay-sous-Bois"
                    fill
                    className="object-cover"
                    data-ai-hint="fontenay sous bois cityscape"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement Fontenay-sous-Bois</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à Fontenay-sous-Bois (94120).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>Fontenay-sous-Bois</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur expert pour la ville de Fontenay-sous-Bois</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à Fontenay-sous-Bois, c'est s'installer dans une ville qui allie harmonieusement dynamisme urbain et proximité avec la nature, grâce au Bois de Vincennes. Son urbanisme varié, entre le pôle d'affaires du Val de Fontenay et les quartiers pavillonnaires calmes, demande une connaissance approfondie du terrain.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous emménagiez dans un appartement en centre-ville ou une maison avec jardin, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/fontenay-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à Fontenay-sous-Bois"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban street"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-fontenay" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à Fontenay</h2>
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
                            src="https://picsum.photos/seed/fontenay-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de Fontenay-sous-Bois</h2>
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
            <section id="faq-fontenay" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement Fontenay-sous-Bois</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nos réponses claires pour un déménagement réussi.</p>
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
            <section id="contact-fontenay" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à Fontenay-sous-Bois</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour Fontenay-sous-Bois</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
