import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { ArrowRight, CheckCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cities from "@/assets/cities.json";
import { normalize } from "../../lib/utils";

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
            <Section id="budget">
                <h2 className="pb-4">Simule um orçamento</h2>
                <div className="flex flex-col gap-8">
                    <Shape className="border border-black">
                        <h3 className="pb-4">Endereço origem</h3>
                        <AddressForm />
                    </Shape>

                    <Shape className="border border-black">
                        <h3 className="pb-4">Endereço destino</h3>
                        <AddressForm />
                    </Shape>

                    <Shape className="border border-black">
                        <h3 className="pb-4">Dimensões da carga</h3>
                        <div >
                            <MeasuresForms />
                        </div>
                    </Shape>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 py-8 items-end">
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

                <Button className={isSimulated ? "bg-red-tx" : "bg-gray-50 pointer-events-none" } onClick={postForm}>
                    <ButtonText className={isSimulated ? "text-white" : "text-gray-100"}>
                        Enviar orçamento
                    </ButtonText>
                    <ArrowRight className={isSimulated ? "icon text-white" : "icon text-gray-100"} />
                </Button>

            </Section>
        </>
    )
}

function FormField({ title, placeholder, register, name, error, dirty }) {
    let status;
    if (dirty) {
        status = error ? "error" : "validated"
    }

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

function AddressForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, dirtyFields },
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

                    setValue("street", data.logradouro, { shouldDirty: true, shouldValidate: true });
                    setValue("neighborhood", data.bairro, { shouldDirty: true, shouldValidate: true });
                    setValue("city", data.localidade, { shouldDirty: true, shouldValidate: true });
                    setValue("state", data.estado, { shouldDirty: true, shouldValidate: true });
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
                    dirty={dirtyFields.cep}
                />
                <FormField
                    register={register}
                    name="state"
                    title="Estado"
                    placeholder="Digite seu Estado"
                    error={errors.state}
                    dirty={dirtyFields.state}
                />
                <FormField
                    register={register}
                    name="city"
                    title="Cidade"
                    placeholder="Digite sua Cidade"
                    error={errors.city}
                    dirty={dirtyFields.city}
                />
                <FormField
                    register={register}
                    name="neighborhood"
                    title="Bairro"
                    placeholder="Digite seu Bairro"
                    error={errors.neighborhood}
                    dirty={dirtyFields.neighborhood}
                />
                <FormField
                    register={register}
                    name="street"
                    title="Rua"
                    placeholder="Digite sua Rua"
                    error={errors.street}
                    dirty={dirtyFields.street}
                />
                <FormField
                    register={register}
                    name="number"
                    title="Número"
                    placeholder="Digite seu Número"
                    error={errors.number}
                    dirty={dirtyFields.number}
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
        formState: { errors, dirtyFields },
    } = useForm({
        resolver: zodResolver(addressSchema),
        mode: "onBlur"
    });

    return (
        <>
            <form onSubmit={handleSubmit()} className="grid grid-cols-1 xs:grid-cols-2 gap-6">
                <div>
                    <FormField
                        register={register}
                        name="width"
                        title="Largura"
                        placeholder="Largura"
                        error={errors.width}
                        dirty={dirtyFields.width}
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="height"
                        title="Altura"
                        placeholder="Altura"
                        error={errors.height}
                        dirty={dirtyFields.height}
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="length"
                        title="Comprimento"
                        placeholder="Comprimento"
                        error={errors.length}
                        dirty={dirtyFields.length}
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="weight"
                        title="Peso"
                        placeholder="Peso"
                        error={errors.weight}
                        dirty={dirtyFields.weight}
                    />
                </div>

            </form>
        </>
    )
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

    width: z
        .string()
        .nonempty("Campo obrigatório")
        .transform((val) => Number(val.replace(",", ".")))
        .refine((val) => !isNaN(val) && val > 0, { message: "Informe um número válido" }),

    height: z
        .string()
        .nonempty("Campo obrigatório")
        .transform((val) => Number(val.replace(",", ".")))
        .refine((val) => !isNaN(val) && val > 0, { message: "Informe um número válido" }),

    length: z
        .string()
        .nonempty("Campo obrigatório")
        .transform((val) => Number(val.replace(",", ".")))
        .refine((val) => !isNaN(val) && val > 0, { message: "Informe um número válido" }),

    weight: z
        .string()
        .nonempty("Campo obrigatório")
        .transform((val) => Number(val.replace(",", ".")))
        .refine((val) => !isNaN(val) && val > 0, { message: "Informe um número válido" }),
});