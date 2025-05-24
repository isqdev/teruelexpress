import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { ArrowRight, CheckCircle, Package, X, ArrowUp, ArrowLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import cities from "@/assets/cities.json";
import { normalize } from "@/lib/utils.ts";
import { Link } from "react-router-dom";

const normalizedCities = cities.map((city) => normalize(city));

export function Budget() {
    const [data, setData] = useState("Dados do Formulario em JSON");
    const [showAllertModal, setShowAllertModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, touchedFields, isValid }
    } = useForm({
        resolver: zodResolver(generalSchema),
        mode: "onBlur"
    });

    const postForm = () => {
        setData({ ...formData });
        console.log("JSON enviado:", data);
        setShowSuccessModal(true);
    };

    const onSimulateClick = (e) => {
        e.preventDefault();
        if (!isValid) {
            setShowAllertModal(true);
            return;
        }
        handleSubmit(postForm)();
    };

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, left: 0 });
    }

    return (
        <>
            <Section className="xl:grid grid-cols-2">
                <div className="xl:col-span-2 flex items-center">
                    <Link to="/home">
                        <ArrowLeft className="text-black size-8 icon" />
                    </Link>
                    <div className="text-2xl font-semibold text-center flex-auto">
                        Orçamento
                    </div>
                </div>
                <p className="pb-4 grid col-span-2">Preencha o formulário a seguir para solicitar um orçamento para seu frete.</p>
                <form className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:col-span-2">
                    <Shape className="border border-black">
                        <h3 className="pb-2">Endereço origem</h3>
                        <AddressForm
                            register={register}
                            errors={errors.origin || {}}
                            touchedFields={touchedFields.origin || {}}
                            watch={watch}
                            setValue={setValue}
                            prefix="origin."
                        />
                    </Shape>
                    <Shape className="border border-black">
                        <h3 className="pb-2">Endereço destino</h3>
                        <AddressForm
                            register={register}
                            errors={errors.destination || {}}
                            touchedFields={touchedFields.destination || {}}
                            watch={watch}
                            setValue={setValue}
                            prefix="destination."
                        />
                    </Shape>
                    <div className="xl:grid xl:grid-cols-4 col-span-2 gap-6">
                        <Shape className="border border-black xl:col-span-3">
                            <h3 className="pb-2">Dimensões da carga</h3>
                            <div>
                                <MeasuresForms
                                    register={register}
                                    errors={errors}
                                    touchedFields={touchedFields}
                                />
                            </div>
                        </Shape>
                        <div className="xl:col-span-1">
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 py-4 items-end xl:grid-cols-1 xl:gap-2 xl:py-0 md:grid-cols-2">
                                <Button className={"bg-red-tx xs:col-span-2 xl:col-span-1 md:col-span-1"} onClick={onSimulateClick} type="button">
                                    <Package className="icon text-white" />
                                    <ButtonText className={"text-white"}>
                                        Solicitar orçamento
                                    </ButtonText>
                                    <ArrowRight className="icon text-white" />
                                </Button>
                                <Button className={"bg-blue-tx xs:col-span-2 xl:col-span-1 md:col-span-1"} onClick={handleScrollTop} type="button">
                                    <ArrowUp className="icon text-white" />
                                    <ButtonText className={"text-white"}>
                                        Ir para o topo
                                    </ButtonText>
                                </Button>
                                <Link to="/home" className="xs:col-span-2 xl:col-span-1 md:col-span-1">
                                    <Button className={"bg-white border border-red-tx"} type="button">
                                        <X className="icon text-red-tx" />
                                        <ButtonText className={"text-red-tx"}>
                                            Cancelar orçamento
                                        </ButtonText>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </Section>

            {showAllertModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-3">
                        <Shape className=" z-2 border border-black bg-white shadow-lg flex flex-col items-center max-w-sm">
                            <p className="mb-4 text-lg font-semibold">Por favor preencher todos os campos!</p>
                            <Button className="bg-red-tx" onClick={() => setShowAllertModal(false)}>
                                <ButtonText className="text-white text-center">Fechar</ButtonText>
                            </Button>
                        </Shape>
                        <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw " />
                    </div>
                </>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <Shape className="border border-black bg-white shadow-lg flex flex-col items-center max-w-sm">
                        <p className="mb-4 text-lg font-semibold">Solicitação enviada com sucesso!</p>
                        <Button className="bg-success-light" onClick={() => setShowSuccessModal(false)}>
                            <ButtonText className="text-white text-center">Ok</ButtonText>
                        </Button>
                    </Shape>
                </div>
            )}
        </>
    )
}

function FormField({ title, placeholder, register, name, error, dirty, type = "text" }) {
    let status;
    if (dirty) {
        status = error ? "error" : "validated"
    }

    return (
        <>
            <InputLabel className="pt-4">{title}</InputLabel>
            <InputRoot status={status}>
                <InputField placeholder={placeholder} type={type} {...register(name)} />
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

function AddressForm({ register, errors, touchedFields, watch, setValue, prefix }) {
    const cep = watch(`${prefix}cep`);

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
                    setValue(`${prefix}street`, data.logradouro, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}neighborhood`, data.bairro, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}city`, data.localidade, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}state`, data.uf, { shouldTouch: true, shouldValidate: true });
                } catch (error) {
                    console.error("Erro ao buscar o CEP ", error);
                }
            }
        };
        fetchAddress();
    }, [cep, setValue, prefix]);

    return (
        <>
            <FormField
                register={register}
                name={`${prefix}cep`}
                title="CEP"
                placeholder="Digite seu CEP"
                error={errors.cep}
                dirty={touchedFields.cep}
                type="number"
            />
            <FormField
                register={register}
                name={`${prefix}state`}
                title="Estado"
                placeholder="Digite seu Estado"
                error={errors.state}
                dirty={touchedFields.state}
            />
            <FormField
                register={register}
                name={`${prefix}city`}
                title="Cidade"
                placeholder="Digite sua Cidade"
                error={errors.city}
                dirty={touchedFields.city}
            />
            <FormField
                register={register}
                name={`${prefix}neighborhood`}
                title="Bairro"
                placeholder="Digite seu Bairro"
                error={errors.neighborhood}
                dirty={touchedFields.neighborhood}
            />
            <FormField
                register={register}
                name={`${prefix}street`}
                title="Rua"
                placeholder="Digite sua Rua"
                error={errors.street}
                dirty={touchedFields.street}
            />
            <FormField
                register={register}
                name={`${prefix}number`}
                title="Número"
                placeholder="Digite seu Número"
                error={errors.number}
                dirty={touchedFields.number}
            />
        </>
    );
}

function MeasuresForms({ register, errors, touchedFields }) {
    return (
        <>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 lg:grid-cols-4">
                <div>
                    <FormField
                        register={register}
                        name="width"
                        title="Largura (cm)"
                        placeholder="cm"
                        error={errors.width}
                        dirty={touchedFields.width}
                        type="number"
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="height"
                        title="Altura (cm)"
                        placeholder="cm"
                        error={errors.height}
                        dirty={touchedFields.height}
                        type="number"
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="length"
                        title="Comprimento (cm)"
                        placeholder="cm"
                        error={errors.length}
                        dirty={touchedFields.length}
                        type="number"
                    />
                </div>
                <div>
                    <FormField
                        register={register}
                        name="weight"
                        title="Peso (kg)"
                        placeholder="kg"
                        error={errors.weight}
                        dirty={touchedFields.weight}
                        type="number"
                    />
                </div>
            </div>
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
            (val) => normalizedCities.includes(val),
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

const generalSchema = z.object({
    origin: addressSchema,
    destination: addressSchema,
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