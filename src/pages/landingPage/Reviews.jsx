import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";

export function Reviews () {
    
    return (
        <>
            <div className="bg-blue-tx">
                <Section id="reviews">
                    <h2 className="text-white ">Avaliações</h2>
                    <CarouselSize/>
                </Section>
            </div>
        </>
    )
}

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, UserCircle } from "phosphor-react";

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <UserCircle className="icon w-16 h-16 text-gray-100 "/>
                    <div className="flex flex-col">
                      <p className="font-bold">Nome Cliente</p>
                      <div className="flex flex-row">
                        <StarFull></StarFull>
                        <StarFull></StarFull>
                        <StarFull></StarFull>
                        <StarFull></StarFull>
                        <StarFull></StarFull>
                      </div>
                    </div>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                  </div>
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

function StarFull() {
  return (
    <div className="relative w-6 h-7">
      <Star className="absolute inset-0 text-star w-6 h-6" weight="fill" />
      <Star className="absolute inset-0 text-star-border w-6 h-6" weight="regular"/>
    </div>
  )
}

{/* <div class="img-reviewer"><img src="img/user.png" alt="Imagem de um avaliador"></div>
    <div class="reviewer-details">
        <p class="name-reviewer">Gráfica ExpressPrint</p>
        <div class="stars">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-half"></i>
        </div>
    </div>
</div>
<div class="txt-review">
    <p>Entregas feitas com segurança e responsabilidade. O custo-benefício é ótimo e o
        atendimento é ágil. Apenas sugerimos ampliar os horários de coleta.
    </p>
</div>*/}
