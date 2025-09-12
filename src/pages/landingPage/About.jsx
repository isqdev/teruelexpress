import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { CarouselPlugin } from "./Carousel";

export function About () {
    return (
        <>  
            <div id="about" className="bg-red-tx ">
                <Section>
                    <CarouselPlugin />
                    <h2 className="q pt-1 lg:pt-2 text-white mt-4">Sobre</h2>
                    <p className="text-xs text-white">A Teruel Express é uma empresa especializada em serviços de entregas que atua em grande parte da região Noroeste do Paraná.
                        Nosso propósito é oferecer soluções logísticas com rapidez, qualidade e segurança, sempre alinhando excelência no atendimento com os melhores preços do mercado.
                        Com uma equipe dedicada e foco em resultados, buscamos atender às necessidades de nossos clientes com eficiência, garantindo agilidade e confiança em cada entrega.
                    </p>
                </Section>

            </div>
        </>
            
    )
}

