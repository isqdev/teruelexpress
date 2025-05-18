import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { ArrowArcRight, ArrowClockwise, ArrowFatLeft, ArrowLineRight, ArrowRight, ArrowsInSimple, ArrowSquareRight, FlowArrow, NavigationArrow, Truck } from "phosphor-react";

function FormField({ title, placeholder, message, ...props }) {
    return (
        <>
            <InputLabel className="pt-4">{title}</InputLabel>
            <InputRoot>
                <InputField placeholder={placeholder} />
            </InputRoot>
            <InputMessage>{message}</InputMessage>
        </>
    );
}

function SetForms({ ...props }) {
    return (
        <>
            <FormField title="CEP" placeholder="Digite seu CEP" message="CEP invalido" />
            <FormField title="Estado" placeholder="Digite seu Estado" message="Estado invalido" />
            <FormField title="Cidade" placeholder="Digite sua Cidade" message="Cidade invalida" />
            <FormField title="Bairro" placeholder="Digite seu Bairro" message="Bairro invalido" />
            <FormField title="Rua" placeholder="Digite sua Rua" message="Rua invalida" />
            <FormField title="Número" placeholder="Digite seu Número" message="Número invalido" />
        </>
    );
}

export function Budget() {
    return (
        <>
            <Section>
                <h2 className="pb-4">Simule um orçamento</h2>
                <div className="flex flex-col gap-8">
                    <Shape className="border">
                        <h3 className="pb-4">Endereço origem</h3>
                        <SetForms/>
                    </Shape>

                    <Shape className="border">
                        <h3 className="pb-4">Endereço destino</h3>
                        <SetForms />
                    </Shape>

                    <Shape className="border">
                        <h3 className="pb-4">Dimensões da carga</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputLabel>Largura</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Digite seu CEP" />
                                </InputRoot>
                                <InputMessage>Largura Invalida</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Altura</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Digite seu Estado" />
                                </InputRoot>
                                <InputMessage>Altura invalida</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Comprimento</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Digite sua Cidade" />
                                </InputRoot>
                                <InputMessage>Comprimento invalido</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Peso</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Digite seu Bairro" />
                                </InputRoot>
                                <InputMessage>Peso invalido</InputMessage>
                            </div>
                        </div>
                    </Shape>
                </div>

                <div className="grid grid-cols-2 gap-6 py-8 items-end">
                    <div>
                        <InputLabel>Orçamento aproximado</InputLabel>
                        <InputRoot>
                            <InputField placeholder="R$" />
                        </InputRoot>
                    </div>
                    <Button className="bg-red-tx">
                        <ButtonText className="text-center text-white">
                            Simular
                        </ButtonText>
                    </Button>
                </div>

                <Button className="bg-gray-50">
                    <ButtonText className="text-left text-gray-100">
                        Enviar orçamento
                    </ButtonText>
                    <ArrowRight className="icon text-gray-100" />
                </Button>

                <Button className="bg-red-tx">
                    <ButtonText className="text-left text-white">
                        Enviar orçamento
                    </ButtonText>
                    <ArrowRight className="icon text-white" />
                </Button>
            </Section>
        </>
    )
}