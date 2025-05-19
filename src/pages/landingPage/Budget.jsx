import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { ArrowRight, CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cities from "@/assets/cities.json";

function normalize(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

const addressSchema = z.object({
    cep: z
        .string()
        .nullable()
        .transform((val) => val.replace(/\D/g, ""))
        .refine((val) => val.length === 8, { message: "CEP inválido" }),

    state: z
        .string()
        .nonempty("Campo obrigatório")
        .transform(normalize)
        .refine(
            (val) => ["parana", "pr"].includes(val),
            { message: "Só atendemos o Paraná no momento." }
        ),

    city: z
        .string()
        .nonempty("Campo obrigatório")
        .transform(normalize)
        .refine(
            (val) => cities.includes(val),
            { message: "Cidade não atendida." }
        ),

    neighborhood: z
        .string()
        .nonempty("Campo obrigatório"),

    street: z
        .string()
        .nonempty("Campo obrigatório"),

    number: z
        .string()
        .nonempty("Campo obrigatório"),
});

function FormField({ title, placeholder, register, name, error, status }) {
    status = error ?? "default"
    if (status !== "default") status = error ? "error" : "validated";
        console.log(status);

    return (
        <>
            <InputLabel className="pt-4">{title}</InputLabel>
            <InputRoot status={status}>
                <InputField placeholder={placeholder} {...register(name)} />
                {status === "validated" && (
                    <InputIcon>
                        <CheckCircle size={32} className="text-success-base" />
                    </InputIcon>
                )}
            </InputRoot>
            <InputMessage className="text-danger-base">{error?.message}</InputMessage>
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
    } = useForm({
        resolver: zodResolver(addressSchema),
        mode: "onBlur"
    });

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
                <FormField
                    register={register}
                    name="cep"
                    title="CEP"
                    placeholder="Digite seu CEP"
                    error={errors.cep}
                    status="default"
                />
                <FormField
                    register={register}
                    name="state"
                    title="Estado"
                    placeholder="Digite seu Estado"
                    error={errors.state}
                    status="default"
                />
                <FormField
                    register={register}
                    name="city"
                    title="Cidade"
                    placeholder="Digite sua Cidade"
                    error={errors.city}
                    status="default"
                />
                <FormField
                    register={register}
                    name="neighborhood"
                    title="Bairro"
                    placeholder="Digite seu Bairro"
                    error={errors.neighborhood}
                    status="default"
                />
                <FormField
                    register={register}
                    name="street"
                    title="Rua"
                    placeholder="Digite sua Rua"
                    error={errors.street}
                    status="default"
                />
                <FormField
                    register={register}
                    name="number"
                    title="Número"
                    placeholder="Digite seu Número"
                    error={errors.number}
                    status="default"
                />
            </form>
        </>
    );
}

function MeasuresForms() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    return (
        <>
            <div>
                <FormField id="width" name="width" title="Largura" placeholder="Largura" error={errors.cep} register={register} />
            </div>
            <div>
                <FormField id="height" name="height" title="Altura" placeholder="Altura" error={errors.cep} register={register} />
            </div>
            <div>
                <FormField id="length" name="length" title="Comprimento" placeholder="Comprimento" error={errors.cep} register={register} />
            </div>
            <div>
                <FormField id="weight" name="weight" title="Peso" placeholder="Peso" error={errors.cep} register={register} />
            </div>
        </>
    )
}

export function Budget() {
    const [isSimulated, setIsSimulated] = useState(false);
    const [data, setData] = useState("Dados do Formulario em JSON");

    const handleSimulate = () => {
        console.log("RODANDO SIMULACAO")
        setIsSimulated(true);
    };

    const postForm = () => {
        console.log(data)
    };

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
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                            <MeasuresForms />
                        </div>
                    </Shape>
                </div>

                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 py-8 items-end">
                    <div>
                        <InputLabel>Orçamento aproximado</InputLabel>
                        <InputRoot className="bg-gray-50" >
                            <InputField placeholder="R$" disabled />
                        </InputRoot>
                    </div>
                    <Button className="bg-red-tx" onClick={handleSimulate}>
                        <ButtonText className="text-center text-white">
                            Simular
                        </ButtonText>
                    </Button>
                </div>

                <Button className={isSimulated ? "bg-red-tx" : "bg-gray-50"} disabled={!isSimulated} onClick={postForm}>
                    <ButtonText className={isSimulated ? "text-white" : "text-gray-100"}>
                        Enviar orçamento
                    </ButtonText>
                    <ArrowRight className={isSimulated ? "icon text-white" : "icon text-gray-100"} />
                </Button>

            </Section>
        </>
    )
}