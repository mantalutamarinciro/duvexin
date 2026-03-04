
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
        <div className="flex items-center gap-1 text-amber-500">
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
         <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Nos clients nous recommandent</h2>
                     <p className="mt-4 text-slate-700 dark:text-slate-400 text-lg font-light leading-relaxed">La satisfaction de nos clients est notre meilleure publicité. Voici ce qu&apos;ils disent de nous.</p>
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
                                 <Card className="h-full p-6 flex flex-col gap-6 rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10 border border-slate-100">
                                            <AvatarImage src={review.avatarUrl} alt={review.name} />
                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">{review.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold text-sm text-slate-900 dark:text-white leading-none">{review.name}</p>
                                            <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">{review.createTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <StarRating rating={review.rating} />
                                        <p className="italic text-slate-600 dark:text-slate-400 mt-4 text-sm leading-relaxed line-clamp-4">"{review.text}"</p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-12 border-slate-200 text-slate-400 hover:text-primary" />
                        <CarouselNext className="-right-12 border-slate-200 text-slate-400 hover:text-primary" />
                    </div>
                </Carousel>
                <div className="text-center mt-12">
                    <Button variant="outline" className="rounded-full font-bold border-slate-200" asChild>
                        <Link href="https://www.google.com/maps/place/Demenagement+du+Vexin/@49.0633959,2.1832366,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66194b9a53be1:0x619ea9289f231032!8m2!3d49.0633924!4d2.1858115!16s%2Fg%2F11g0dgf3v_?entry=ttu" target="_blank">Voir tous nos avis sur Google</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
