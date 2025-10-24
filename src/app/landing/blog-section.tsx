
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/section-title";
import { blogPosts } from "@/lib/blog-posts";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BlogSection() {
    return (
        <section id="blog" className="py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <SectionTitle>Nos derniers <u>conseils</u></SectionTitle>
                    <p className="mt-4 text-muted-foreground text-lg">
                        Retrouvez nos astuces et guides pour un déménagement réussi et serein.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {blogPosts.slice(0, 3).map((post) => (
                        <Card key={post.id} className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                            <Link href={post.link} className="block relative h-56">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    data-ai-hint={post.aiHint}
                                />
                            </Link>
                            <CardHeader>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col">
                                <p className="text-muted-foreground text-sm flex-grow">{post.description}</p>
                                <Button variant="link" asChild className="p-0 mt-4 self-start">
                                    <Link href={post.link}>
                                        Lire la suite <ArrowRight className="ml-2 h-4 w-4"/>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg" variant="outline">
                         <Link href="/blog">Voir tous nos articles</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
