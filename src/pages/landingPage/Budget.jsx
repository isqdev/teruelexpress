import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { ArrowArcRight, ArrowClockwise, ArrowFatLeft, ArrowLineRight, ArrowRight, ArrowsInSimple, ArrowSquareRight, FlowArrow, NavigationArrow, Truck } from "phosphor-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormField({ title, placeholder, register, name, error, ...props }) {
    return (
        <>
            <InputLabel className="pt-4">{title}</InputLabel>
            <InputRoot>
                <InputField placeholder={placeholder} {...register(name)}/>
            </InputRoot>
            <InputMessage>{error?.message}</InputMessage>
        </>
    );
}

function AddressForms() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const cep = watch("cep");

    useEffect(() => {
        const fetchAddress = async () => {
            const cleanedCep = cep?.replace(/\D/g, "");

            if (cleanedCep?.length === 8) {
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
                    const data = await response.json();

                    if (data.erro) {
                        console.error("CEP invalido");
                        return;
                    }

                    setValue("street", data.logradouro);
                    setValue("neighborhood", data.bairro);
                    setValue("city", data.localidade);
                    setValue("state", data.uf);
                } catch (error) {
                    console.error("Erro ao buscar o CEP ", error);
                }
            }
        };
        fetchAddress();
    }, [cep, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit()}>
                <FormField id="cep" name="cep" title="CEP" placeholder="Digite seu CEP" error={errors.cep} register={register} />
                <FormField id="state" name="state" title="Estado" placeholder="Digite seu Estado" error={errors.state} register={register} />
                <FormField id="city" name="city" title="Cidade" placeholder="Digite sua Cidade" error={errors.city} register={register} />
                <FormField id="neighborhood" name="neighborhood" title="Bairro" placeholder="Digite seu Bairro" error={errors.neighborhood} register={register} />
                <FormField id="street" name="street" title="Rua" placeholder="Digite sua Rua" error={errors.street} register={register} />
                <FormField id="number" name="number" title="Número" placeholder="Digite seu Número" error={errors.number} register={register} />
            </form>
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
                        <AddressForms />
                    </Shape>

                    <Shape className="border">
                        <h3 className="pb-4">Endereço destino</h3>
                        <AddressForms />
                    </Shape>

                    <Shape className="border">
                        <h3 className="pb-4">Dimensões da carga</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <InputLabel>Largura</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Largura" />
                                </InputRoot>
                                <InputMessage>Largura Invalida</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Altura</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Altura" />
                                </InputRoot>
                                <InputMessage>Altura invalida</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Comprimento</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Comprimento" />
                                </InputRoot>
                                <InputMessage>Comprimento invalido</InputMessage>
                            </div>
                            <div>
                                <InputLabel>Peso</InputLabel>
                                <InputRoot>
                                    <InputField placeholder="Peso" />
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

            </Section>
        </>
    )
}