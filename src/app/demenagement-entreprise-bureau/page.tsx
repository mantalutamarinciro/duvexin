
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CalendarDays, Package, Wrench, Truck, BriefcaseBusiness, FolderArchive, Building, Globe, Store, Factory } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const enterpriseServices = [
    { icon: <CalendarDays className="h-8 w-8 text-primary"/>, title: "Planification et préparation", description: "Nous établissons un plan détaillé pour garantir une organisation optimale et une exécution sans accroc." },
    { icon: <Package className="h-8 w-8 text-primary"/>, title: "Emballage et protection", description: "Nous emballons vos équipements, meubles et documents de manière sécurisée pour éviter tout dommage." },
    { icon: <Wrench className="h-8 w-8 text-primary"/>, title: "Démontage et remontage", description: "Notre équipe s’occupe du démontage et remontage du mobilier pour une installation rapide et efficace." },
    { icon: <Truck className="h-8 w-8 text-primary"/>, title: "Transport sécurisé et suivi", description: "Nous assurons le transport de vos biens dans des véhicules adaptés, avec un suivi en temps réel." },
    { icon: <BriefcaseBusiness className="h-8 w-8 text-primary"/>, title: "Installation des bureaux", description: "À votre arrivée, nous nous chargeons de l’aménagement et de l’installation de vos espaces." },
    { icon: <FolderArchive className="h-8 w-8 text-primary"/>, title: "Déménagement d’archives", description: "Nous déplaçons vos documents professionnels et archives en toute sécurité et confidentialité." },
];

const enterpriseTypes = [
    { icon: <Building className="h-8 w-8 text-primary"/>, title: "Bureaux et PME", description: "Déménagement rapide et discret pour tous types de bureaux." },
    { icon: <Globe className="h-8 w-8 text-primary"/>, title: "Entreprises multi-sites", description: "Nous organisons des déménagements complexes à l’échelle nationale ou internationale." },
    { icon: <Store className="h-8 w-8 text-primary"/>, title: "Commerces et boutiques", description: "Nous déménageons également des commerces, en veillant à ne pas perturber votre activité." },
    { icon: <Factory className="h-8 w-8 text-primary"/>, title: "Industrie et ateliers", description: "Services adaptés pour le déménagement de machines et d’équipements lourds." },
];

export default function DemenagementEntreprisePage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative h-64 flex items-center justify-center text-center text-white">
                <Image 
                    src="https://picsum.photos/seed/business-move/1920/400"
                    alt="Bannière pour déménagement d'entreprise"
                    fill
                    className="object-cover"
                    data-ai-hint="modern office building"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-headline font-bold">Déménagement d'Entreprise</h1>
                    <p className="mt-4 text-lg max-w-3xl mx-auto text-white/90">Simplifiez votre transition avec des professionnels.</p>
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
                        <h2 className="text-3xl font-bold">Un déménagement professionnel rapide, sécurisé et sans impact sur vos activités</h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                           Le déménagement d’une entreprise peut s’avérer complexe. Chez Déménagement du Vexin, nous offrons des services spécialement conçus pour les entreprises, assurant une transition fluide et rapide, avec un minimum de perturbation. Nous vous accompagnons dans chaque étape pour garantir une reprise efficace de vos activités.
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
                        <h2 className="text-3xl font-bold">Pourquoi nous choisir pour le déménagement de votre entreprise ?</h2>
                         <ul className="mt-6 space-y-4">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Expertise en déménagement d'entreprises</h4>
                                    <p className="text-muted-foreground">Nous avons une vaste expérience dans le déménagement de sociétés de toutes tailles.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Rapidité et flexibilité</h4>
                                    <p className="text-muted-foreground">Nous nous engageons à respecter vos délais et à nous adapter à vos contraintes horaires.</p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1"/>
                                <div>
                                    <h4 className="font-semibold">Minimisation des interruptions</h4>
                                    <p className="text-muted-foreground">Nous organisons le déménagement pour qu’il n’impacte pas vos activités quotidiennes.</p>
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
                        <h2 className="text-3xl font-bold">Nos services dédiés aux entreprises</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Nous proposons une gamme complète de services pour rendre le déménagement de votre entreprise aussi simple et rapide que possible.</p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enterpriseServices.map((service, i) => (
                            <div key={i} className="flex items-start gap-6">
                                {service.icon}
                                <div>
                                    <h3 className="text-xl font-semibold">{service.title}</h3>
                                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Enterprise Types Section */}
            <section id="types-entreprise" className="py-16 bg-muted/50">
                <div className="container">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold">Un service adapté à tous types d’entreprises</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Que vous soyez une PME ou une grande entreprise, nous avons la solution pour vous.</p>
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

             {/* CTA Section */}
            <section id="contact-entreprise" className="py-16">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold">Obtenez votre devis gratuit pour un déménagement d’entreprise</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">Prêt à déménager votre entreprise ? Demandez dès maintenant un devis gratuit et personnalisé. Nous vous fournirons une estimation détaillée et adaptée à vos besoins.</p>
                    <Button size="lg" className="mt-8" asChild>
                        <Link href="/dashboard/quote">Obtenir mon devis gratuit</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
