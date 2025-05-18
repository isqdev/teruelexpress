import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { CarouselPlugin } from "./Carousel";

export function About () {
    return (
        <>  
            <div className="bg-red-tx ">
                <CarouselPlugin />
                <Section>
                    <h2 className="text-white">Sobre</h2>
                    <p className="text-xs text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                </Section>

            </div>
        </>
            
    )
}

