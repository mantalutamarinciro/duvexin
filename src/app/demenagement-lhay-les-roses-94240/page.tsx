
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FormattedReview } from "@/app/api/reviews/route";
import { CheckCircle, MapPin, ShieldCheck, Truck, Users, Leaf, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TestimonialsSection } from "@/components/testimonials-section";


const fallbackTestimonials: FormattedReview[] = [
    { id: "fallback-1", name: "Famille Giraud", text: "Déménagement de notre pavillon à L'Haÿ-les-Roses géré avec un grand professionnalisme. L'équipe a été très soigneuse avec nos plantes et notre jardin, nous avons beaucoup apprécié.", rating: 5, createTime: "il y a 3 mois", avatarUrl: `https://i.pravatar.cc/48?u=Giraud94` },
    { id: "fallback-2", name: "Marc D.", text: "Très bonne expérience pour mon appartement. Devis clair et équipe ponctuelle et efficace. Un déménagement réalisé sans le moindre stress.", rating: 5, createTime: "il y a 8 mois", avatarUrl: `https://i.pravatar.cc/48?u=MarcD94` },
    { id: "fallback-3", name: "Mme. Petit", text: "Un grand merci à l'équipe pour son efficacité et sa bonne humeur. Ils ont géré les accès et le stationnement de manière très pro.", rating: 5, createTime: "il y a 1 an", avatarUrl: `https://i.pravatar.cc/48?u=PetitLHR` },
];

const whyChooseUsItems = [
    {
        icon: <MapPin className="h-8 w-8 text-primary"/>,
        title: "Expertise de L'Haÿ-les-Roses",
        description: "Nous connaissons les quartiers pavillonnaires et résidentiels de la ville pour une logistique parfaitement adaptée."
    },
    {
        icon: <Leaf className="h-8 w-8 text-primary"/>,
        title: "Respect des Espaces Verts",
        description: "Nous intervenons avec un soin particulier pour respecter votre jardin et l'environnement verdoyant de la ville, célèbre pour sa Roseraie."
    },
    {
        icon: <Home className="h-8 w-8 text-primary"/>,
        title: "Spécialiste du Pavillonnaire",
        description: "Nous avons une grande expérience des déménagements de maisons avec jardin, en protégeant vos biens et vos accès."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary"/>,
        title: "Sérénité Administrative",
        description: "Nous gérons pour vous les demandes d'autorisation de stationnement, une démarche clé pour déménager sereinement."
    }
];

const faqItems = [
    {
        question: "Comment se déroule un déménagement dans un quartier pavillonnaire de L'Haÿ-les-Roses ?",
        answer: "Nous portons une attention particulière à la protection de votre propriété et de votre voisinage. Nous utilisons des véhicules de taille adaptée pour ne pas encombrer les rues et planifions l'intervention pour minimiser toute gêne. Une visite technique préalable nous permet d'anticiper toutes les spécificités."
    },
    {
        question: "La proximité de la Roseraie du Val-de-Marne implique-t-elle des contraintes ?",
        answer: "Les abords de la Roseraie sont des zones que nous respectons particulièrement. Nous nous assurons que notre intervention (stationnement, manutention) préserve la tranquillité et la propreté des lieux. Notre connaissance du secteur nous permet de planifier au mieux."
    },
    {
        question: "Est-il difficile d'obtenir une autorisation de stationnement à L'Haÿ-les-Roses ?",
        answer: "Comme dans beaucoup de communes de la petite couronne, cela demande de l'anticipation. Mais ne vous inquiétez pas, nous nous en chargeons. Nous avons l'habitude des démarches auprès des services de la mairie et nous nous assurons d'avoir les autorisations à temps pour le jour J."
    },
    {
        question: "Quelles sont vos formules pour un petit budget ?",
        answer: "Nous proposons des formules flexibles. Notre formule 'Économique' est une excellente solution pour maîtriser votre budget : vous vous chargez de l'emballage et du déballage, et nos professionnels assurent la manutention lourde et le transport sécurisé de vos biens."
    }
];


export default function LhayLesRosesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-72 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/lhay-les-roses/1920/500"
                    alt="La Roseraie du Val-de-Marne à L'Haÿ-les-Roses"
                    fill
                    className="object-cover"
                    data-ai-hint="lhay les roses roseraie"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <p className="text-sm font-semibold text-primary">Le spécialiste de votre déménagement</p>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">Déménagement L'Haÿ-les-Roses</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">La solution efficace et locale pour votre projet à L'Haÿ-les-Roses (94240).</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/demenagement-val-de-marne-94" className="hover:text-primary">Val-de-Marne (94)</Link>
                <span className="mx-2">&gt;</span>
                <span>L'Haÿ-les-Roses</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Un déménageur qui connaît le charme de L'Haÿ-les-Roses</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Déménager à L'Haÿ-les-Roses, c'est s'installer dans une ville au cadre de vie réputé, célèbre pour sa magnifique roseraie. Principalement résidentielle et pavillonnaire, la ville demande une approche du déménagement qui allie soin, discrétion et respect de l'environnement.
                        </p>
                        <p className="mt-4 text-muted-foreground">
                           Chez Déménagement du Vexin, nous maîtrisons ces spécificités. Que vous emménagiez dans une maison avec jardin ou un appartement dans une résidence calme, nous planifions chaque détail pour garantir un déménagement rapide, efficace et sans stress.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/lhay-les-roses-move/600/400"
                            alt="Équipe de déménagement professionnelle en intervention à L'Haÿ-les-Roses"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="moving team suburban garden"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us Section */}
            <section id="why-us-lhay-les-roses" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Le partenaire de confiance pour déménager à L'Haÿ-les-Roses</h2>
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
                            src="https://picsum.photos/seed/lhay-les-roses-packing/600/400"
                            alt="Déménageur emballant avec soin des objets pour un déménagement à L'Haÿ-les-Roses"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="careful mover packing boxes"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold">Des services adaptés aux habitants de L'Haÿ-les-Roses</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement de maisons et pavillons</h4>
                                    <p className="text-muted-foreground">Une expertise particulière pour les déménagements de maisons avec jardin, avec le plus grand soin.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Déménagement d'appartements</h4>
                                    <p className="text-muted-foreground">Solutions avec monte-meubles pour les étages élevés et protection soignée des parties communes.</p>
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
            <section id="faq-lhay-les-roses" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Questions fréquentes - Déménagement L'Haÿ-les-Roses</h2>
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
            <section id="contact-lhay-les-roses" className="py-16 bg-primary/5">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Organisez votre déménagement à L'Haÿ-les-Roses</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes pour une analyse précise de votre projet et obtenez un devis gratuit et personnalisé.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Devis gratuit pour L'Haÿ-les-Roses</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
