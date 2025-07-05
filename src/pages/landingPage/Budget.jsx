import { Button, ButtonText, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape, ModalConfirm, ModalSm } from "@/components";
import { CheckCircle, Package, ToteSimple, File, Info, CaretRight, CaretDown, Minus, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { normalize } from "@/utils/normalize";
import { localStorageUtils } from "@/utils/localStorageUtils";
import { fetchCep } from "@/services/cep";

export function Budget() {
    const [isSimulated, setIsSimulated] = useState(false);
    const [data, setData] = useState("Dados do Formulario em JSON");
    const [showDetails, setShowDetails] = useState(false);
    const [packages, setPackages] = useState([]);
    const [normalizedCityList, setNormalizedCityList] = useState([]);
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
    const [isEmptyListModalVisible, setIsEmptyListModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [packageToDelete, setPackageToDelete] = useState(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/CS-PI-2025-Delinquentes/json-end/refs/heads/main/cities.json')
            .then(res => res.json())
            .then(citiesData => {
                setNormalizedCityList(citiesData.map((city) => normalize(city)));
            });
    }, []);

    useEffect(() => {
        const storedPackages = localStorageUtils.getItem("ordersList") || [];
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
        formState: { errors, touchedFields, isValid }
    } = useForm({
        resolver: zodResolver(generalSchema(normalizedCityList)),
        mode: "onBlur"
    });

    const handleSimulate = () => {
        if (packages.length === 0) {
            setIsEmptyListModalVisible(true);
            return;
        }

        const totalWeight = packages.reduce((acc, pkg) => acc + (pkg.weight || 0) * (pkg.amount || 1), 0);
        const randomValue = (totalWeight * Math.random() * 10 + 100).toFixed(2);

        setData({ budget: randomValue });
        setIsSimulated(true);
        setValue("budget", randomValue);
    };

    const handleSendOrder = () => {
        const ordersList = localStorageUtils.getItem("ordersList") || [];
        if (ordersList.length === 0) {
            setIsEmptyListModalVisible(true);
            return;
        }

        const lastPackage = ordersList[ordersList.length - 1];
        const finalJson = {
            addressOrigin: lastPackage.origin,
            addressDestiny: lastPackage.destination,
            listPackages: ordersList.map((pkg) => ({
                width: pkg.width || 0,
                height: pkg.height || 0,
                length: pkg.length || 0,
                weight: pkg.weight || 0,
                loadType: pkg.loadType,
                amount: pkg.amount || 1,
            })),
        };

        console.log("JSON enviado:", finalJson);
        localStorage.setItem("finalBudget", JSON.stringify(finalJson));
        localStorageUtils.removeItem("ordersList");
        setPackages([]);
        setTimeout(() => {
            window.location.href = "/login";
        }, 500);
    };

    const handleConfirmSend = () => {
        setIsConfirmationModalVisible(false);
        handleSendOrder();
    };

    const handleAddPackage = (e) => {
        e.preventDefault();
        if (!isValid) {
            setIsAlertModalVisible(true);
            return;
        }

        handleSubmit((formData) => {
            const currentOrders = localStorageUtils.getItem("ordersList") || [];
            const updatedOrders = [...currentOrders, formData];
            localStorageUtils.setItem("ordersList", updatedOrders);
            setPackages(updatedOrders);
        })();
    };

    const handleSend = (e) => {
        e.preventDefault();
        const ordersList = localStorageUtils.getItem("ordersList") || [];

        if (ordersList.length === 0) {
            setIsEmptyListModalVisible(true);
            return;
        }

        setIsConfirmationModalVisible(true);
    };

    const handleIncreaseAmount = (index) => {
        const updatedPackages = [...packages];
        updatedPackages[index].amount = (updatedPackages[index].amount || 1) + 1;
        setPackages(updatedPackages);
        localStorageUtils.setItem("ordersList", updatedPackages);
    };

    const handleDecreaseAmount = (index) => {
        const updatedPackages = [...packages];
        updatedPackages[index].amount = (updatedPackages[index].amount || 1) - 1;

        if (updatedPackages[index].amount < 1) {
            setPackageToDelete(index);
            setIsDeleteModalVisible(true);
        } else {
            setPackages(updatedPackages);
            localStorageUtils.setItem("ordersList", updatedPackages);
        }
    };

    const confirmDeletePackage = () => {
        const updatedPackages = [...packages];
        updatedPackages.splice(packageToDelete, 1);
        setPackages(updatedPackages);
        localStorageUtils.setItem("ordersList", updatedPackages);
        setIsDeleteModalVisible(false);
        setPackageToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalVisible(false);
        setPackageToDelete(null);
    };

    const resetPackageDimensions = () => {
        setValue("loadType", "");
        setValue("width", "");
        setValue("height", "");
        setValue("length", "");
        setValue("weight", "");
    };

    return (
        <>
            <Section id="budget" className="xl:grid grid-cols-2">
                <h2 className="pb-4 grid col-span-2">Simule um orçamento</h2>
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
                                                <input type="radio" value="caixa" {...register("loadType")} className="accent-red-tx" />
                                                <Package className="icon" />
                                                <p>Caixa</p>
                                            </label>
                                            <label className="flex gap-1">
                                                <input type="radio" value="envelope" {...register("loadType")} className="accent-red-tx" />
                                                <File className="icon" />
                                                <p>Envelope</p>
                                            </label>
                                            <label className="flex gap-1">
                                                <input type="radio" value="sacola" {...register("loadType")} className="accent-red-tx" />
                                                <ToteSimple className="icon" />
                                                <p>Sacola</p>
                                            </label>
                                        </div>
                                    </Shape>

                                    <div className="hidden lg:block">
                                        <div className="flex gap-3">
                                            <Info className="icon" />
                                            <p>Todos os pacotes serão enviados para o mesmo endereço informado acima.</p>
                                        </div>
                                        <Shape className="bg-gray-50">
                                            <PackageList
                                                packages={packages}
                                                onIncrease={handleIncreaseAmount}
                                                onDecrease={handleDecreaseAmount}
                                            />
                                        </Shape>
                                    </div>
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
                                <div className="grid grid-cols-2">
                                    <Button
                                        className="bg-blue-tx -col-start-2"
                                        onClick={handleAddPackage}
                                        type="button"
                                    >
                                        <ButtonText className="text-center text-white">
                                            Adicionar pacote
                                        </ButtonText>
                                    </Button>
                                </div>

                                <div className="lg:hidden">
                                    <div className="flex gap-3">
                                        <Info className="icon" />
                                        <p>Todos os pacotes serão enviados para o mesmo endereço informado acima.</p>
                                    </div>
                                    <Shape className="bg-gray-50">
                                        <PackageList
                                            packages={packages}
                                            onIncrease={handleIncreaseAmount}
                                            onDecrease={handleDecreaseAmount}
                                        />
                                    </Shape>
                                </div>

                                <div className="grid xs:grid-cols-2 gap-3 py-4 items-end xl:py-0">
                                    <div>
                                        <InputLabel>Valor aproximado</InputLabel>
                                        <InputRoot className="bg-gray-50 xs:col-span-1" >
                                            <InputField placeholder="R$" disabled value={watch("budget") ? `R$ ${watch("budget")}` : ""} />
                                        </InputRoot>
                                    </div>
                                    <Button className={"bg-red-tx xs:col-span-1"} type="button" onClick={handleSimulate}>
                                        <ButtonText className="text-center text-white">
                                            Simular
                                        </ButtonText>
                                    </Button>
                                    <Link to="/login" className={isSimulated ? "col-span-2" : "col-span-2 pointer-events-none"} onClick={handleSend} disabled={!isSimulated}>
                                        <Button className={isSimulated ? "bg-red-tx" : "bg-gray-50"} type="button">
                                            <ButtonText className={isSimulated ? "text-white text-center" : "text-gray-100 text-center"}>
                                                Enviar orçamento
                                            </ButtonText>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Section>

            <ModalSm open={isAlertModalVisible} onClose={() => setIsAlertModalVisible(false)} >
                <p className="mb-4 text-lg font-semibold">Preencha os campos obrigatórios!</p>
                <Button variant="secondary" onClick={() => setIsAlertModalVisible(false)}>
                    <ButtonText className="text-center">Fechar</ButtonText>
                </Button>
            </ModalSm>

            <ModalSm open={isEmptyListModalVisible} onClose={() => setIsEmptyListModalVisible(false)}>
                <p className="mb-4 text-lg font-semibold">Adicione no mínimo um pacote!</p>
                <Button variant="secondary" onClick={() => setIsEmptyListModalVisible(false)}>
                    <ButtonText className=" text-center">Fechar</ButtonText>
                </Button>
            </ModalSm>

            <ModalConfirm
                message="Deseja excluir este pacote da lista?"
                open={isDeleteModalVisible}
                options={["Não", "Sim"]}
                action={confirmDeletePackage}
                onClose={handleCancelDelete}
            />

            <ModalConfirm
                message="Deseja finalizar e realizar o pedido?"
                open={isConfirmationModalVisible}
                options={["Não", "Sim"]}
                good={true}
                action={handleConfirmSend}
                onClose={() => setIsConfirmationModalVisible(false)}
            />
        </>
    )
}

function PackageList({ packages, onIncrease, onDecrease }) {
    return (
        <div className="flex flex-col gap-2">
            {packages.length === 0 ? (
                <p className="text-gray-600 text-center">Nenhum pacote adicionado</p>
            ) : (
                packages.map((pkg, index) => (
                    <div key={index} className="flex gap-3 justify-between">
                        <div className="flex gap-2">
                            {pkg.loadType === "caixa" && <Package className="icon" />}
                            {pkg.loadType === "envelope" && <File className="icon" />}
                            {pkg.loadType === "sacola" && <ToteSimple className="icon" />}
                            <p>{pkg.loadType}</p>
                            <p>{`${pkg.width || 0}x${pkg.height || 0}x${pkg.length || 0}    ${pkg.weight || 0}kg`}</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Minus
                                className="icon cursor-pointer"
                                onClick={() => onDecrease(index)}
                            />
                            <p>{pkg.amount || 1}</p>
                            <Plus
                                className="icon cursor-pointer"
                                onClick={() => onIncrease(index)}
                            />
                        </div>
                    </div>
                ))
            )}
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
                title="CEP"
                placeholder="Digite seu CEP"
                error={errors.cep}
                dirty={touchedFields.cep}
                type="text"
                onChangeMask={(v) => maskInput(v, "cep")}
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

function addressSchema(normalizedCityList) {
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
                (val) => normalizedCityList.includes(val),
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

function generalSchema(normalizedCityList) {
    return z.object({
        origin: addressSchema(normalizedCityList),
        destination: addressSchema(normalizedCityList),
        loadType: z
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