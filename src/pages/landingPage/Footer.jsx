import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, Section, Shape } from "@/components";
import { ArrowSquareOut, EnvelopeSimple, Phone, WhatsappLogo } from "phosphor-react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <>
            <div className="bg-blue-tx">
                <Section className="py-4 sm:py-6 md:py-8 lg:py-8" id="footer">
                    <h4 className="text-white">Contato</h4>
                    <div className="xl:py-4 xl:grid xl:grid-cols-3">
                        <Link to="https://wa.me/5544999965596" target="_blank">
                            <div className="flex text-white xl:gap-4 xl:justify-start xs:gap-2 xs:justify-center">
                                <WhatsappLogo className="icon xs:justify-start" />
                                <p className="xs:justify-center" >(44) 99996-5596</p>
                                <ArrowSquareOut className="icon xs:justify-end" />
                            </div>
                        </Link>
                        <Link to="https://wa.me/5544920001842" target="_blank">
                            <div className="flex text-white xl:gap-4 xl:justify-center xs:py-2 xs:gap-2 xs:justify-center">
                                <WhatsappLogo className="icon xs:justify-start" />
                                <p className="xs:justify-center" >(44) 92000-1842</p>
                                <ArrowSquareOut className="icon xs:justify-end" />
                            </div>
                        </Link>
                        <Link to="mailto:teruelexpress.servicos@gmail.com" target="_blank">
                            <div className="flex text-white xl:gap-4 xl:justify-end xs:gap-2 xs:justify-center">
                                <EnvelopeSimple className="icon xs:justify-start" />
                                <p className="xs:justify-center" >Enviar email</p>
                                <ArrowSquareOut className="icon xs:justify-end" />
                            </div>
                        </Link>
                    </div>
                    <p className="pt-6 font-bold text-white text-center">teruelexpress.servicos@gmail.com</p>
                    <p className="pt-1 text-white text-center">Todos os direitos reservados</p>
                </Section>
            </div>
        </>
    )
}