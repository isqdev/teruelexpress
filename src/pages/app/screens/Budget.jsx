import { Button, ButtonText, InputRoot, InputField, InputIcon, InputLabel, InputMessage, AppHeader, SectionApp, Shape } from "@/components";
import { CheckCircle, Package, HouseLine, ToteSimple, File, CaretRight, CaretDown, Plus, Minus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { normalize } from "@/utils/normalize";
import { fetchCep } from "@/services/cep";

export function Budget() {
    const [data, setData] = useState("Dados do Formulario em JSON");
    const [showAllertModal, setShowAllertModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [normalizedCities, setNormalizedCities] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showEmptyListModal, setShowEmptyListModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/CS-PI-2025-Delinquentes/json-end/refs/heads/main/cities.json')
            .then(res => res.json())
            .then(citiesData => {
                setCities(citiesData);
                setNormalizedCities(citiesData.map((city) => normalize(city)));
            });
    }, []);

    useEffect(() => {
        const storedPackages = JSON.parse(localStorage.getItem("ordersList")) || [];
        setPackages(storedPackages);
    }, []);

    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        clearErrors,
        reset,
        formState: { errors, touchedFields, isValid }
    } = useForm({
        resolver: zodResolver(generalSchema(normalizedCities)),
        mode: "onBlur"
    });

    const postForm = (formData) => {
        setData({ ...formData });
        console.log("JSON enviado:", formData);
        setShowSuccessModal(true);

        const currentOrders = JSON.parse(localStorage.getItem("ordersList")) || [];
        const updatedOrders = [...currentOrders, formData];

        localStorage.setItem("ordersList", JSON.stringify(updatedOrders));
    };

    const onAddPackageClick = (e) => {
        e.preventDefault();
        if (!isValid) {
            setShowAllertModal(true);
            return;
        }
        handleSubmit((formData) => {
            const currentOrders = JSON.parse(localStorage.getItem("ordersList")) || [];
            const updatedOrders = [...currentOrders, formData];
            localStorage.setItem("ordersList", JSON.stringify(updatedOrders));
            setPackages(updatedOrders);
        })();
        reset();
    };

    const onSendClick = (e) => {
        e.preventDefault();
        const ordersList = JSON.parse(localStorage.getItem("ordersList")) || [];

        if (ordersList.length === 0) {
            setShowEmptyListModal(true);
            return;
        }

        setShowConfirmationModal(true);
    };

    const confirmSend = () => {
        const ordersList = JSON.parse(localStorage.getItem("ordersList")) || [];
        postForm(ordersList);
        localStorage.removeItem("ordersList");
        setShowConfirmationModal(false);
    };

    return (
        <>
            <SectionApp className="xl:grid grid-cols-2">
                <AppHeader screenTitle="Orçamento" />
                <p className="pb-4 grid col-span-2 pt-4">Preencha o formulário a seguir para solicitar um orçamento para seu frete.</p>
                <form className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:col-span-2">
                    <Shape className="border border-gray-600">
                        <h4 className="pb-2">Endereço origem</h4>
                        <AddressForm
                            register={register}
                            errors={errors.origin || {}}
                            touchedFields={touchedFields.origin || {}}
                            watch={watch}
                            setValue={setValue}
                            setError={setError}
                            clearErrors={clearErrors}
                            prefix="origin."
                        />
                    </Shape>
                    <Shape className="border border-gray-600">
                        <h4 className="pb-2">Endereço destino</h4>
                        <AddressForm
                            register={register}
                            errors={errors.destination || {}}
                            touchedFields={touchedFields.destination || {}}
                            watch={watch}
                            setValue={setValue}
                            setError={setError}
                            clearErrors={clearErrors}
                            prefix="destination."
                        />
                    </Shape>
                    <div className="col-span-2">
                        <div className="lg:grid lg:grid-cols-2 col-span-2 grid gap-6">
                            <div>
                                <div className="flex flex-col gap-4">
                                    <Shape className="border border-gray-600">
                                        <h4 className="pb-2">Tipo da carga*</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            <label className="flex gap-1">
                                                <input type="radio" value="caixa" {...register("tipoCarga")} className="accent-red-tx" />
                                                <Package className="icon" />
                                                <p>Caixa</p>
                                            </label>
                                            <label className="flex gap-1">
                                                <input type="radio" value="envelope" {...register("tipoCarga")} className="accent-red-tx" />
                                                <File className="icon" />
                                                <p>Envelope</p>
                                            </label>
                                            <label className="flex gap-1">
                                                <input type="radio" value="sacola" {...register("tipoCarga")} className="accent-red-tx" />
                                                <ToteSimple className="icon" />
                                                <p>Sacola</p>
                                            </label>
                                        </div>
                                    </Shape>

                                    <Shape className="bg-gray-50 hidden lg:block">
                                        <PackageList packages={packages} />
                                    </Shape>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button className="bg-white p-0 m-0" type="button" onClick={toggleDetails}>
                                    {showDetails ? <CaretDown className="icon" /> : <CaretRight className="icon" />}
                                    <ButtonText>
                                        Mais detalhes sobre a carga
                                    </ButtonText>
                                </Button>

                                {showDetails && (
                                    <Shape className="border border-gray-600 xl:col-span-3">
                                        <h4 className="pb-2">Dimensões da carga</h4>
                                        <div>
                                            <MeasuresForms
                                                register={register}
                                                errors={errors}
                                                touchedFields={touchedFields}
                                            />
                                        </div>
                                    </Shape>
                                )}

                                <Shape className="bg-gray-50 lg:hidden">
                                    <PackageList packages={packages} />
                                </Shape>

                                <div className="grid xs:grid-cols-2 gap-3 py-4 items-end xl:py-0">
                                    <Button
                                        className="bg-blue-tx xs:col-span-2 md:col-span-1 md:row-start-1 md:col-start-1"
                                        onClick={onAddPackageClick}
                                        type="button"
                                    >
                                        <ButtonText className="text-center text-white">
                                            Adicionar pacote
                                        </ButtonText>
                                    </Button>
                                    <Button
                                        className="bg-red-tx xs:col-span-2 md:col-span-1 md:row-start-1 md:col-start-2"
                                        onClick={onSendClick}
                                        type="button"
                                    >
                                        <ButtonText className="text-white text-center">
                                            Enviar
                                        </ButtonText>
                                    </Button>
                                    <Link
                                        to="/app/home"
                                        className="xs:col-span-2 md:col-span-1 md:row-start-2 md:col-start-2"
                                    >
                                        <Button className="bg-gray-50" type="button">
                                            <ButtonText className="text-black text-center">
                                                Cancelar
                                            </ButtonText>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </SectionApp>

            {showAllertModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-3">
                        <Shape className="z-2 border border-gray-600 bg-white flex flex-col items-center max-w-sm">
                            <p className="mb-4 text-lg font-semibold">Por favor preencher todos os campos!</p>
                            <Button className="bg-red-tx" onClick={() => setShowAllertModal(false)}>
                                <ButtonText className="text-white text-center">Fechar</ButtonText>
                            </Button>
                        </Shape>
                        <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
                    </div>
                </>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center z-3">
                    <Shape className="z-2 w-full min-h-screen sm:min-h-0 sm:max-w-lg sm:mx-auto sm:my-20 bg-white sm:rounded-2xl sm:h-fit overflow-hidden p-6 sm:p-8">
                        <CheckCircle className="icon size-48 text-success-light justify-self-center" weight="fill" />
                        <h3 className="text-center text-lg font-semibold ">Solicitação enviada!</h3>
                        <p className="text-center mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div className="flex flex-col gap-2">
                            <Button className="bg-red-tx" onClick={() => {
                                setShowSuccessModal(false);
                                reset();
                                window.scrollTo({ top: 0, left: 0 });
                            }} >
                                <Package className="icon text-white" />
                                <ButtonText className="text-white">Solicitar outro orçamento</ButtonText>
                            </Button>
                            <Link to="/home">
                                <Button className="bg-white border border-gray-600">
                                    <HouseLine className="icon text-red-tx" />
                                    <ButtonText className="text-black">Ir para tela inicial</ButtonText>
                                </Button>
                            </Link>
                        </div>
                    </Shape>
                    <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
                </div>
            )}

            {showEmptyListModal && (
                <div className="fixed inset-0 flex items-center justify-center z-3">
                    <Shape className="z-2 border border-gray-600 bg-white flex flex-col items-center max-w-sm">
                        <p className="mb-4 text-lg font-semibold">Adicione no mínimo um pacote para realizar o envio!</p>
                        <Button className="bg-red-tx" onClick={() => setShowEmptyListModal(false)}>
                            <ButtonText className="text-white text-center">Fechar</ButtonText>
                        </Button>
                    </Shape>
                    <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
                </div>
            )}

            {showConfirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center z-3">
                    <Shape className="z-2 border border-gray-600 bg-white flex flex-col items-center max-w-sm">
                        <p className="mb-4 text-lg font-semibold">Deseja finalizar e realizar os pedidos?</p>
                        <div className="flex gap-4">
                            <Button className="bg-red-tx" onClick={() => setShowConfirmationModal(false)}>
                                <ButtonText className="text-white text-center">Não</ButtonText>
                            </Button>
                            <Button className="bg-success-light" onClick={confirmSend}>
                                <ButtonText className="text-white text-center">Sim</ButtonText>
                            </Button>
                        </div>
                    </Shape>
                    <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
                </div>
            )}
        </>
    )
}

function PackageList({ packages }) {
    return (
        <div className="flex flex-col gap-2">
            {packages.map((pkg, index) => (
                <div key={index} className="flex gap-3 justify-between">
                    <div className="flex gap-2">
                        {pkg.tipoCarga === "caixa" && <Package className="icon" />}
                        {pkg.tipoCarga === "envelope" && <File className="icon" />}
                        {pkg.tipoCarga === "sacola" && <ToteSimple className="icon" />}
                        <p>{pkg.tipoCarga}</p>
                        <p>{`${pkg.width || 0}x${pkg.height || 0}x${pkg.length || 0}`}</p>
                    </div>
                    <div className="flex gap-2">
                        <Plus className="icon cursor-pointer" />
                        <p>{pkg.quantity || 1}</p>
                        <Minus className="icon cursor-pointer" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function FormField({ title, placeholder, register, name, error, dirty, type = "text", onChangeMask }) {
    let status;
    if (dirty) {
        status = error ? "error" : "validated"
    }

    return (
        <>
            <InputLabel className="pt-4">{title}</InputLabel>
            <InputRoot status={status}>
                <InputField
                    placeholder={placeholder}
                    type={type}
                    {...register(name, onChangeMask ? {
                        onChange: (e) => {
                            e.target.value = onChangeMask(e.target.value);
                        }
                    } : {})}
                />
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

function AddressForm({ register, errors, touchedFields, watch, setValue, setError, clearErrors, prefix }) {
    const cep = watch(`${prefix}cep`);

    useEffect(() => {
        const fetchAddress = async () => {
            const cleanedCep = cep?.replace(/\D/g, "");
            if (cleanedCep?.length === 8) {
                try {
                    const data = await fetchCep(cleanedCep);
                    if (data.erro) {
                        setError(`${prefix}cep`, { type: "manual", message: "CEP inválido" });
                        return;
                    }
                    clearErrors(`${prefix}cep`);
                    setValue(`${prefix}street`, data.logradouro, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}neighborhood`, data.bairro, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}city`, data.localidade, { shouldTouch: true, shouldValidate: true });
                    setValue(`${prefix}state`, data.uf, { shouldTouch: true, shouldValidate: true });
                } catch (error) {
                    setError(`${prefix}cep`, { type: "manual", message: "Erro ao buscar o CEP" });
                }
            }
        };
        fetchAddress();
    }, [cep, setValue, setError, clearErrors, prefix]);

    return (
        <>
            <FormField
                register={register}
                name={`${prefix}cep`}
                title="CEP*"
                placeholder="Digite seu CEP"
                error={errors.cep}
                dirty={touchedFields.cep}
                type="text"
                onChangeMask={(v) => maskInput(v, "cep")}
            />
            <FormField
                register={register}
                name={`${prefix}state`}
                title="Estado*"
                placeholder="Digite seu Estado"
                error={errors.state}
                dirty={touchedFields.state}
            />
            <FormField
                register={register}
                name={`${prefix}city`}
                title="Cidade*"
                placeholder="Digite sua Cidade"
                error={errors.city}
                dirty={touchedFields.city}
            />
            <FormField
                register={register}
                name={`${prefix}neighborhood`}
                title="Bairro*"
                placeholder="Digite seu Bairro"
                error={errors.neighborhood}
                dirty={touchedFields.neighborhood}
            />
            <FormField
                register={register}
                name={`${prefix}street`}
                title="Rua*"
                placeholder="Digite sua Rua"
                error={errors.street}
                dirty={touchedFields.street}
            />
            <FormField
                register={register}
                name={`${prefix}number`}
                title="Número*"
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
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 lg:grid-cols-2">
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

function addressSchema(normalizedCities) {
    return z.object({
        cep: z
            .string()
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
}

function generalSchema(normalizedCities) {
    return z.object({
        origin: addressSchema(normalizedCities),
        destination: addressSchema(normalizedCities),
        tipoCarga: z
            .string()
            .nonempty("Selecione o tipo de carga"),
        width: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val.replace(",", ".")) : undefined))
            .refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Informe um número válido" }),
        height: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val.replace(",", ".")) : undefined))
            .refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Informe um número válido" }),
        length: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val.replace(",", ".")) : undefined))
            .refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Informe um número válido" }),
        weight: z
            .string()
            .optional()
            .transform((val) => (val ? Number(val.replace(",", ".")) : undefined))
            .refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Informe um número válido" }),
    });
}

function maskInput(value, field) {
    const onlyDigits = value.replace(/\D/g, '');

    if (field === "cep") {
        // CEP: 99999-999
        return onlyDigits.replace(/^(\d{5})(\d{0,3})/, (match, p1, p2) => {
            if (p2) return `${p1}-${p2}`;
            return p1;
        }).slice(0, 9);
    }

    return value;
}