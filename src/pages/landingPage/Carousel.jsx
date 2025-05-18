import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  const carImg = [
    "./src/assets/car01.webp",
    "./src/assets/car02.webp",
    "./src/assets/car03.jpg",
    "./src/assets/car04.jpg",
    "./src/assets/car05.jpg",
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className=" w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      
      
      <CarouselContent>
        {carImg.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1 ">
              <Card className="px-0 py-0 gap-6 ">
                <CardContent className="flex items-center justify-center py-0 px-0  " >
                  <Image src={src} className=" aspect-[16/9] object-cover w-full h-full "/>
                  
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
