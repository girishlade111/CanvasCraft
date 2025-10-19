"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface EditorCarouselProps {
  images: { src: string; alt: string }[];
}

export default function EditorCarousel({ images }: EditorCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="relative aspect-video">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
