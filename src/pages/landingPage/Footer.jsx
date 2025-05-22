import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { ArrowSquareOut, EnvelopeSimple, Phone, WhatsappLogo } from "phosphor-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <>
            <div className="bg-blue-tx">
                <Section className="py-4 sm:py-6 md:py-8 lg:py-8" id="footer">
                    <h4 className="text-white">Contato</h4>
                    <div className="xl:grid xl:grid-cols-3 xl:gap-x-3">
                        <Link to="https://wa.me/5544999965596" target="_blank">
                            <Button className="bg-white mt-2">
                                <WhatsappLogo className="icon" />
                                <ButtonText className="font-normal text-black">
                                    (44) 99996-5596
                                </ButtonText>
                                <ArrowSquareOut className="icon" />
                            </Button>
                        </Link>
                        <Link to="https://wa.me/5544920001842" target="_blank">
                            <Button className="bg-white mt-2">
                                <WhatsappLogo className="icon" />
                                <ButtonText className="font-normal text-black">
                                    (44) 92000-1842
                                </ButtonText>
                                <ArrowSquareOut className="icon" />
                            </Button>
                        </Link>
                        <Link to="mailto:teruelexpress.servicos@gmail.com" target="_blank">
                            <Button className="bg-white mt-2">
                                <EnvelopeSimple className="icon" />
                                <ButtonText className="font-normal text-black">
                                    Enviar email
                                </ButtonText>
                                <ArrowSquareOut className="icon" />
                            </Button>
                        </Link>
                    </div>
                    <p className="pt-6 font-bold text-white text-center">teruelexpress.servicos@gmail.com</p>
                    <p className="pt-1 text-white text-center">Todos os direitos reservados</p>
                </Section>
            </div>
        </>
    )
}