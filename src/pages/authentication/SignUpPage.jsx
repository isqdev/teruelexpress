import { SectionBox } from "@/components"
import { Button, ButtonText, Image, InputRoot, InputField, InputIcon, InputLabel, InputMessage, Section, Shape } from "@/components";
import { Eye, EyeSlash, UserList, Phone, EnvelopeSimple, LockSimpleOpen, CheckCircle, HouseLine } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox"
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function SignUpPage() {
  const [data, setData] = useState("Dados do Formulario em JSON");
  const [isBusiness, setIsBusiness] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showAllertModal, setShowAllertModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid }
  } = useForm({
    resolver: zodResolver(generalSchema),
    mode: "onBlur"
  });

  const handleChangedPerson = (business) => {
    if (isBusiness !== business) {
      setIsBusiness(business);
    }
  }

  const postForm = (formData) => {
    setData({ ...formData });
    console.log("JSON enviado:", formData);
    setShowSuccessModal(true);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!isValid) {
      setShowAllertModal(true);
      return;
    }
    handleSubmit(postForm)();
  };

  const handleTermsModal = () => {
    setShowTermsModal(true);
  }

  return (
    <>
      <SectionBox>
        <Image src="src\assets\logo.jpg" className="w-48 justify-self-center" />
        <h3 className="justify-self-center">Crie sua conta!</h3>
        <div className="grid grid-cols-2 gap-4 py-6">
          <p className="font-bold col-span-2">Escolha uma opção</p>
          <Button className={isBusiness ? "bg-white border border-gray-600" : "bg-blue-tx"} onClick={() => handleChangedPerson(false)}>
            <ButtonText className={isBusiness ? "text-gray-600 text-center" : "text-white text-center"}>
              Pessoa Física
            </ButtonText>
          </Button>
          <Button className={isBusiness ? "bg-blue-tx" : "bg-white border border-gray-600"} onClick={() => handleChangedPerson(true)}>
            <ButtonText className={isBusiness ? "text-white text-center" : "text-gray-600 text-center"}>
              Empresa
            </ButtonText>
          </Button>
        </div>
        <form>
          <FormField
            register={register}
            name="name"
            title={isBusiness ? "Digite o nome da empresa" : "Seu nome"}
            placeholder={isBusiness ? "Digite o nome da empresa" : "Digite seu nome"}
            error={errors.name}
            dirty={touchedFields.name}
            icon={UserList}
          />

          <FormField
            register={register}
            name="document"
            title={isBusiness ? "CNPJ" : "CPF"}
            placeholder={isBusiness ? "Digite seu CNPJ" : "Digite seu CPF"}
            error={errors.document}
            dirty={touchedFields.document}
            type="number"
            icon={UserList}
          />

          <FormField
            register={register}
            name="email"
            title="Email"
            placeholder="Digite seu email"
            error={errors.email}
            dirty={touchedFields.email}
            icon={EnvelopeSimple}
          />

          <FormField
            register={register}
            name="phone"
            title="Telefone"
            placeholder="Digite seu telefone"
            error={errors.phone}
            dirty={touchedFields.phone}
            type="number"
            icon={Phone}
          />

          <FormField
            register={register}
            name="password"
            title="Senha"
            placeholder="Crie uma senha"
            error={errors.password}
            dirty={touchedFields.password}
            type="password"
            icon={LockSimpleOpen}
          />

          <FormField
            register={register}
            name="confirmPassword"
            title="Confirmar senha"
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
            dirty={touchedFields.confirmPassword}
            type="password"
            icon={LockSimpleOpen}
          />

          <div className="flex items-center gap-2 py-4">
            <Checkbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />
            <p onClick={handleTermsModal} className="cursor-pointer">Aceitar os termos e condições</p>
          </div>

          <div className="pt-2">
            <Button className="bg-red-tx" type="button" onClick={handleCreateAccount}>
              <ButtonText className="text-center text-white">
                Criar conta
              </ButtonText>
            </Button>
          </div>
        </form>

        <div className="justify-items-center pt-6">
          <p className="text-center">Já possui uma conta Teruel Exepress?</p>
          <Link to="/login" className="text-red-tx font-bold">
            Entre aqui
          </Link>
        </div>
      </SectionBox>

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
          <Shape className="z-2 border border-gray-600 bg-white flex flex-col items-center max-w-xs gap-4">
            <CheckCircle className="icon size-24 text-success-light justify-self-center" weight="fill" />
            <h3 className="text-center text-lg font-semibold ">Conta criada</h3>
            <Link to="/home">
              <Button className="bg-white border border-gray-600">
                <HouseLine className="icon text-black" />
                <ButtonText className="text-black">Entrar</ButtonText>
              </Button>
            </Link>
          </Shape>
          <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
        </div>
      )}

      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-3">
          <Shape className="z-2 w-full min-h-screen sm:min-h-0 sm:max-w-lg sm:mx-auto sm:my-20 bg-white sm:rounded-2xl sm:h-fit overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-center text-lg font-semibold ">Termos e condições</h3>
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button className="bg-white border border-gray-600" onClick={() => setShowTermsModal(false)}>
                <ButtonText className="text-black text-center">Fechar termos</ButtonText>
              </Button>
            </div>
          </Shape>
          <div className="fixed bg-black opacity-70 z-1 h-lvh w-lvw" />
        </div>
      )}
    </>
  )
}

function FormField({ title, placeholder, register, name, error, dirty, type = "text", icon: Icon }) {
  let status;
  if (dirty) {
    status = error ? "error" : "validated"
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputLabel>{title}</InputLabel>
      <InputRoot status={status}>
        <InputIcon>
          {Icon && <Icon className="icon" />}
        </InputIcon>
        <InputField
          placeholder={placeholder}
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          {...register(name)}
        />
        {type === "password" && (
          <InputIcon onClick={() => setShowPassword((v) => !v)} className="cursor-pointer">
            {showPassword ? <Eye className="icon" /> : <EyeSlash className="icon" />}
          </InputIcon>
        )}
        {status === "validated" && (
          <InputIcon>
            <CheckCircle size={32} className="text-success-base" />
          </InputIcon>
        )}
      </InputRoot>
      <InputMessage className="text-danger-base">{error?.message}</InputMessage>
    </>
  )
}

const generalSchema = z.object({
  name: z
    .string()
    .nonempty("Campo obrigatório"),

  document: z
    .string()
    .nonempty("Campo obrigatório")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => {
      if (val.length === 14) return cnpj.isValid(val);
      if (val.length === 11) return cpf.isValid(val);
      return false;
    }, { message: "Documento inválido" }),

  email: z
    .string()
    .nonempty("Campo obrigatório")
    .email("Email inválido"),

  phone: z
    .string()
    .nonempty("Campo obrigatório")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 10 || val.length === 11, { message: "Telefone inválido" }),

  password: z
    .string()
    .nonempty("Campo obrigatório")
    .max(8, "Máximo de 8 caracteres")
    .refine((val) => /[A-Z]/.test(val), { message: "Deve conter ao menos 1 letra maiúscula" })
    .refine((val) => /[0-9]/.test(val), { message: "Deve conter ao menos 1 número" })
    .refine((val) => /[@#$?]/.test(val), { message: "Deve conter ao menos 1 caractere especial (@, #, $, ?)" }),

  confirmPassword: z
    .string()
    .nonempty("Campo obrigatório")
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });