import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { CarouselPlugin } from "./Carousel";

export function About () {
    return (
        <>  
            <div className="bg-red-tx">
                <CarouselPlugin/>
                <Section id="about">
                    <h2 className="text-white">Sobre</h2>
                </Section>

            </div>
        </>
            
    )
}

