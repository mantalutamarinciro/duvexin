
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Building, Globe, Store, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionTitle } from "@/components/section-title";


const enterpriseServices = [
    { title: "Planification et préparation", description: "Nous établissons un plan détaillé pour garantir une organisation optimale et une exécution sans accroc." },
    { title: "Emballage et protection", description: "Nous emballons vos équipements, meubles et documents de manière sécurisée pour éviter tout dommage." },
    { title: "Démontage et remontage", description: "Notre équipe s’occupe du démontage et remontage du mobilier pour une installation rapide et efficace." },
    { title: "Transport sécurisé et suivi", description: "Nous assurons le transport de vos biens dans des véhicules adaptés, avec un suivi en temps réel." },
    { title: "Installation des bureaux", description: "À votre arrivée, nous nous chargeons de l’aménagement et de l’installation de vos espaces." },
    { title: "Déménagement d’archives", description: "Nous déplaçons vos documents professionnels et archives en toute sécurité et confidentialité." },
];

const enterpriseTypes = [
    { icon: <Building className="h-8 w-8 text-primary"/>, title: "Bureaux et PME", description: "Déménagement rapide et discret pour tous types de bureaux." },
    { icon: <Globe className="h-8 w-8 text-primary"/>, title: "Entreprises multi-sites", description: "Nous organisons des déménagements complexes à l’échelle nationale ou internationale." },
    { icon: <Store className="h-8 w-8 text-primary"/>, title: "Commerces et boutiques", description: "Nous déménageons également des commerces, en veillant à ne pas perturber votre activité." },
    { icon: <Factory className="h-8 w-8 text-primary"/>, title: "Industrie et ateliers", description: "Services adaptés pour le déménagement de machines et d’équipements lourds." },
];

const faqItems = [
    {
        question: "Comment minimisez-vous l'impact sur notre activité ?",
        answer: "La planification est la clé. Nous travaillons avec vous pour établir un calendrier précis. Nous pouvons intervenir en dehors de vos heures de bureau, le soir, le week-end ou pendant les périodes creuses pour assurer une transition transparente, sans interruption pour vos équipes et vos clients."
    },
    {
        question: "Gérez-vous le déménagement de matériel informatique et de serveurs ?",
        answer: "Oui, c'est une de nos spécialités. Nous utilisons des emballages antistatiques, des caisses renforcées et des techniques de manutention spécifiques. Nous pouvons également nous coordonner avec votre service informatique pour débrancher et rebrancher le matériel, et assurer un redémarrage rapide de votre infrastructure."
    },
    {
        question: "Notre déménagement est-il assuré ?",
        answer: "Absolument. Tous nos déménagements d'entreprise sont couverts par une assurance responsabilité civile et une assurance marchandises. Nous pouvons également vous proposer des assurances complémentaires 'ad valorem' pour couvrir votre matériel à sa valeur réelle en cas de besoin."
    },
    {
        question: "Prenez-vous en charge le transfert d'archives confidentielles ?",
        answer: "Oui. Nous garantissons la confidentialité et la sécurité de vos archives. Nous utilisons des conteneurs scellés et un processus de suivi rigoureux du chargement à la livraison pour assurer l'intégrité de vos documents sensibles."
    }
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

export default function DemenagementEntreprisePage() {
    return (
        <div className="bg-background text-foreground">
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
            {/* Hero Section */}
            <section className="relative h-80 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/business-move/1920/500"
                    alt="Bannière pour déménagement d'entreprise"
                    fill
                    className="object-cover"
                    data-ai-hint="modern office building"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <SectionTitle as="h1" className="text-white">Déménagement d'<u>Entreprise</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Minimisez l'impact, maximisez l'efficacité. Votre transition professionnelle, gérée par des experts.</p>
                </div>
            </section>
            
            {/* Breadcrumb */}
            <div className="container py-3 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">&gt;</span>
                <Link href="/services" className="hover:text-primary">Services</Link>
                <span className="mx-2">&gt;</span>
                <span>Déménagement d'entreprise</span>
            </div>

            {/* Intro Section */}
            <section className="py-16">
                <div className="container grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <SectionTitle as="h2">Un déménagement pro, <u>sans interruption</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le transfert de vos locaux est une étape stratégique qui doit être exécutée avec précision pour ne pas affecter votre productivité. Chez Déménagement du Vexin, nous comprenons les enjeux uniques du déménagement d'entreprise : respect des délais, sécurité du matériel sensible, et confidentialité des données.
                        </p>
                         <p className="mt-4 text-muted-foreground">
                            Nous développons un plan d'action sur-mesure, en étroite collaboration avec vos équipes, pour assurer une transition fluide et une reprise d'activité dans les meilleurs délais.
                        </p>
                    </div>
                    <div>
                         <Image
                            src="https://picsum.photos/seed/office-planning/600/400"
                            alt="Planification d'un déménagement de bureaux"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="office relocation planning"
                        />
                    </div>
                </div>
            </section>

             {/* Why Choose Us */}
            <section className="py-16 bg-muted/50">
                 <div className="container grid lg:grid-cols-2 gap-12 items-center">
                      <div className="order-2 lg:order-1">
                        <Image
                            src="https://picsum.photos/seed/secure-transport/600/400"
                            alt="Transport sécurisé de matériel informatique"
                            width={600}
                            height={400}
                            className="rounded-lg shadow-lg"
                            data-ai-hint="secure equipment transport"
                        />
                    </div>
                    <div className="order-1 lg:order-2">
                        <SectionTitle as="h2">Notre expertise à <u>votre service</u></SectionTitle>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Planification rigoureuse</h4>
                                    <p className="text-muted-foreground">Un chef de projet dédié élabore avec vous un cahier des charges précis et un rétroplanning détaillé.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Flexibilité & Discrétion</h4>
                                    <p className="text-muted-foreground">Nous nous adaptons à vos contraintes en intervenant en horaires décalés, les week-ends ou la nuit pour minimiser l'impact sur votre activité.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Savoir-faire technique</h4>
                                    <p className="text-muted-foreground">Nos équipes sont formées pour l'emballage et le transport de matériel informatique, de serveurs, d'archives et de mobilier de bureau.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Enterprise Services Section */}
            <section id="services-entreprise" className="py-16">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Une prestation <u>complète</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Nous gérons chaque aspect de votre transfert pour vous permettre de rester concentré sur votre cœur de métier.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enterpriseServices.map((service, i) => (
                             <Card key={i} className="p-6 text-center">
                                <h3 className="text-xl font-semibold">{service.title}</h3>
                                <p className="mt-2 text-muted-foreground text-sm h-12">{service.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Enterprise Types Section */}
            <section id="types-entreprise" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <SectionTitle>Adapté à <u>tous les secteurs</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Que vous soyez une startup, une PME, un grand groupe ou un commerce, nous avons la solution.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {enterpriseTypes.map((type, i) => (
                            <Card key={i} className="text-center p-6">
                                {type.icon}
                                <h3 className="text-xl font-semibold mt-4">{type.title}</h3>
                                <p className="mt-2 text-muted-foreground text-sm">{type.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section id="faq-entreprise" className="py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="text-center">
                        <SectionTitle>Questions <u>fréquentes</u></SectionTitle>
                        <p className="mt-4 text-muted-foreground text-lg">Vos interrogations, nos réponses claires pour un transfert d'entreprise réussi.</p>
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
            <section id="contact-entreprise" className="py-16">
                <div className="container text-center">
                    <SectionTitle>Planifiez votre transfert <u>dès aujourd'hui</u></SectionTitle>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Contactez nos spécialistes du déménagement d'entreprise pour une étude personnalisée et un devis détaillé adapté à votre cahier des charges.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/demande-devis">Obtenir un devis professionnel</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
