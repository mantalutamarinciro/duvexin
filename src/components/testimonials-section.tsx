"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { FormattedReview } from "@/app/api/reviews/route";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className={i < rating ? "" : "text-gray-300"} />
            ))}
        </div>
    );
}

export function TestimonialsSection({ reviews }: { reviews: FormattedReview[] }) {
    const autoplayPlugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
         <section className="py-16 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold">Nos clients nous recommandent</h2>
                     <p className="mt-4 text-muted-foreground text-lg">La satisfaction de nos clients est notre meilleure publicité. Voici ce qu'ils disent de nous.</p>
                </div>
                 <Carousel
                    plugins={[autoplayPlugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto mt-12"
                    >
                    <CarouselContent>
                        {reviews && reviews.map((review) => (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                 <Card className="h-full p-6 flex flex-col sm:flex-row gap-6">
                                    <Avatar className="h-12 w-12 hidden sm:block">
                                        <AvatarImage src={review.avatarUrl} alt={review.name} />
                                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <StarRating rating={review.rating} />
                                        <p className="italic text-muted-foreground mt-2 line-clamp-4">"{review.text}"</p>
                                        <p className="mt-4 font-semibold text-sm">{review.name}</p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="text-center mt-12">
                    <Button variant="outline" asChild>
                        <Link href="https://www.google.com/maps/place/Demenagement+du+Vexin/@49.0633959,2.1832366,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66194b9a53be1:0x619ea9289f231032!8m2!3d49.0633924!4d2.1858115!16s%2Fg%2F11g0dgf3v_?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D" target="_blank">Voir tous nos avis sur Google</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
